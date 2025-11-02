"use client";
import React, {useEffect, useRef, useState} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {UmkmItem} from "@/types/umkm";
import {Minimize2} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ReactDOMServer from "react-dom/server";
import UmkmInfoModal from "@/components/ui/map/UmkmInfoModal";
import DetailInfoPanel from "@/components/ui/map/info_panel/DetailInfoPanel";
import {initMap} from "@/utils/map/initMap";
import {createDivIcon} from "@/utils/map/createDivIcon";
import {useUserLocationStore} from "@/store/useUserLocationStore";

interface LeafletMapProps {
  umkm: UmkmItem;
}

const DEFAULT_CENTER = { lat: -6.86507099703059, lng: 107.59368327596205 };

const DetailLocationLeaflet: React.FC<LeafletMapProps> = ({umkm}) => {
  const { userLocation, fetchUserLocation, clearUserLocation, isLoading, error } = useUserLocationStore();

  const [isShowMaximumMap, setIsShowMaximumMap] = useState(false);

  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    return () => {
      clearUserLocation();
    };
  }, []);

  /** -------------------------------
   *  INITIALIZE MAP
   * -------------------------------- */
  useEffect(() => {
    const mapId = isShowMaximumMap ? "mapFull" : "mapSmall";
    let center: L.LatLngExpression = [umkm.lat, umkm.lng];

    const map = initMap(mapId, center);
    mapRef.current = map;

    return () => {
      map.off();
      map.remove();
      mapRef.current = null;
    };
  }, [isShowMaximumMap, userLocation]);

  /** -------------------------------
   *  UPDATE MARKER
   * -------------------------------- */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Hapus marker lama
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Circle || layer instanceof L.GeoJSON) {
        map.removeLayer(layer);
      }
    });

    /* UMKM Icon */
    const iconUMKM = createDivIcon(
      <div className={`relative w-8 h-8 bg-white rounded-full ring-2 ring-black z-10 ${isLoading ? 'hidden' : 'block'}`}>
        <Image
          src="/images/umkm/default-umkm-profile.webp"
          alt="poto profil umkm"
          fill
          className="object-cover"
          priority
        />
      </div>,
      [0, 0],
      [31, 20],
      [-14, 5]
    );

    const popupHtml = ReactDOMServer.renderToString(
      <UmkmInfoModal
        pageName="detail"
        userLocation={userLocation}
        umkmLocation={{lat: umkm.lat, lng: umkm.lng}}
      />
    );

    L.marker([umkm.lat, umkm.lng], {icon: iconUMKM}).bindPopup(popupHtml).addTo(map);
  }, [isLoading, isShowMaximumMap, userLocation]);

  /** -------------------------------
   *  HANDLER
   * -------------------------------- */
  const handleShowMaximumMap = (isShow: boolean) => {
    setIsShowMaximumMap(isShow);
    document.body.style.overflow = isShow ? "hidden" : "";
  }

  return (
    <>
      <div className="h-120 md:h-70 w-full mb-10 grid grid-cols-1 md:grid-cols-3 border-2 border-primary-content">
        <DetailInfoPanel
          isShowMaximumMap={isShowMaximumMap}
          umkm={umkm}
          handleShowMaximumMap={handleShowMaximumMap}
        />
        {
          isLoading ? (
            <div
              className="flex-center z-10 md:col-span-2 h-full md:h-full bg-gray-300"
            >
              <p className="text-gray-700">Mendeteksi Lokasi...</p>
            </div>
          ) : error ? (
            <div
              className="flex-center z-10 md:col-span-2 h-full md:h-full bg-gray-300"
            >
              <p className="text-gray-700">Gagal Mendeteksi Lokasi</p>
            </div>
          ) : (
            <div
              id="mapSmall"
              className="z-10 md:col-span-2 h-full md:h-full"
            />
          )
        }
      </div>

      {
        isShowMaximumMap && (
          <div className="container w-screen h-screen bg-black/50 p-5 fixed inset-0 z-50">
            <div className="relative flex flex-col w-full h-full bg-black border-2 border-primary-content">
              {
                isLoading ? (
                  <div
                    className="flex-center z-10 md:col-span-2 h-full md:h-full bg-gray-300"
                  >
                    <p className="text-gray-700">Mendeteksi Lokasi...</p>
                  </div>
                ) : error ? (
                  <div
                    className="flex-center z-10 md:col-span-2 h-full md:h-full bg-gray-300"
                  >
                    <p className="text-gray-700">Gagal Mendeteksi Lokasi</p>
                  </div>
                ) : (
                  <div
                    id="mapFull"
                    className="z-10 md:col-span-2 h-full md:h-full"
                  />
                )
              }

              <DetailInfoPanel
                isShowMaximumMap={isShowMaximumMap}
                umkm={umkm}
                handleShowMaximumMap={handleShowMaximumMap}
              />

              <button
                className="flex-center absolute w-10 h-10 border-2 border-primary-content top-2 right-2 cursor-pointer bg-white z-50"
                onClick={() => handleShowMaximumMap(false)}
              >
                <Minimize2 className="text-primary-content"/>
              </button>
            </div>
          </div>
        )
      }
    </>
  );
};

export default DetailLocationLeaflet;
