"use client";
import React, {useEffect, useRef, useState} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {UmkmItem} from "@/types/umkm";
import {LocateFixed, Minimize2} from "lucide-react";
import Image from "next/image";
import ReactDOMServer from "react-dom/server";
import UmkmInfoModal from "@/components/ui/map/UmkmInfoModal";
import DetailInfoPanel from "@/components/ui/map/info_panel/DetailInfoPanel";
import {initMap} from "@/utils/map/initMap";
import {createDivIcon} from "@/utils/map/createDivIcon";
import {useUserLocationStore} from "@/store/useUserLocationStore";
import {useUmkmStore} from "@/store/useUmkmStore";
import MainInfoPanel from "@/components/ui/map/info_panel/MainInfoPanel";
import MapSlider from "@/components/ui/map/MapSlider";

interface LeafletMapProps {
  umkm: UmkmItem;
}

const DEFAULT_CENTER = { lat: -6.86507099703059, lng: 107.59368327596205 };

const DetailLocationLeaflet: React.FC<LeafletMapProps> = ({umkm}) => {
  const { userLocation, fetchUserLocation, clearUserLocation, isLoading, error, userRadius, setUserRadius } = useUserLocationStore();

  const { umkmImageUrl } = useUmkmStore();

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
    const mapId = "map";
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
        umkmId={umkm.id}
        umkmName={umkm.name}
        umkmCategory={umkm.mainCategory}
        userLocation={userLocation}
        umkmLocation={{lat: umkm.lat, lng: umkm.lng}}
        umkmImageUrl={umkmImageUrl}
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
    <div className={`${isShowMaximumMap ? 'container w-screen h-screen bg-black/50 p-5 fixed inset-0 z-50' : ''}`}>
      <div
        className={`relative overflow-hidden w-full mb-10 grid shadow-md rounded-2xl ${isShowMaximumMap ? 'flex h-full md:grid-cols-1' : 'overflow-hidden md:grid-cols-3 h-120 md:h-70 grid-cols-1'}`}>

        {/* Info Panel (Left) */}
        <DetailInfoPanel
          isShowMaximumMap={isShowMaximumMap}
          umkm={umkm}
          handleShowMaximumMap={handleShowMaximumMap}
        />

        {/* Map Panel (Right) */}
        <div className="col-span-2 relative h-full h-full bg-red-100">
          {isLoading ? (
            <div className="flex-center z-10 md:col-span-2 h-full md:h-full bg-gray-300">
              <p className="text-gray-700">Mendeteksi Lokasi...</p>
            </div>
          ) : error ? (
            <div className="flex-center z-10 md:col-span-2 h-full md:h-full bg-gray-300">
              <p className="text-gray-700">Gagal Mendeteksi Lokasi</p>
            </div>
          ) : (
            <div id="map" className="z-10 h-full h-full"/>
          )}

          {/* Detect Location Button */}
          <button
            className={`flex-center absolute w-10 h-10 border-2 border-primary-content top-2 cursor-pointer bg-white/70 z-20 rounded-xl transition duration-300 hover:bg-primary-content/30 ${isShowMaximumMap ? 'right-14' : 'right-2'}`}
            onClick={fetchUserLocation}
          >
            <LocateFixed className="text-primary-content"/>
          </button>

          {/* Minimize Button */}
          <button
            className={`flex-center absolute w-10 h-10 border-2 border-primary-content top-2 right-2 cursor-pointer bg-white/70 z-20 rounded-xl transition duration-300 hover:bg-primary-content/30 ${isShowMaximumMap ? '' : 'hidden'}`}
            onClick={() => handleShowMaximumMap(false)}
          >
            <Minimize2 className="text-primary-content"/>
          </button>

          {/* Map Slider */}
          {
            userLocation && (
              <MapSlider
                radius={userRadius}
                onRadiusChange={setUserRadius}
              />
            )
          }

          <div className={`absolute left-5 flex flex-col z-30 bottom-5`}>
            <button
              onClick={() => mapRef.current?.zoomIn()}
              className="w-10 h-10 bg-white rounded-t-xl flex items-center justify-center shadow-xl hover:bg-gray-200"
            >
              <span className="text-xl font-bold text-primary-content">+</span>
            </button>

            <button
              onClick={() => mapRef.current?.zoomOut()}
              className="w-10 h-10 bg-white rounded-b-xl flex items-center justify-center shadow-xl hover:bg-gray-200"
            >
              <span className="text-xl font-bold text-primary-content">−</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailLocationLeaflet;
