"use client";
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {LocateFixed, Minimize2, SlidersHorizontal, UserRound} from "lucide-react";
import { FeatureCollection } from "geojson";
import Image from "next/image";
import ReactDOMServer from "react-dom/server";
import UmkmInfoModal from "@/components/ui/map/UmkmInfoModal";
import MainInfoPanel from "@/components/ui/map/info_panel/MainInfoPanel";
import { createDivIcon } from "@/utils/map/createDivIcon";
import { initMap } from "@/utils/map/initMap";
import { getDistance } from "@/utils/getDistance";
import { useUserLocationStore } from "@/store/useUserLocationStore";
import { useUmkmLogic } from "@/hooks/useUmkmLogic";
import { UmkmItem } from "@/types/umkm";
import MapSlider from "@/components/ui/map/MapSlider";
import FilterPanel from "@/components/ui/map/FilterPanel";
import {useUmkmStore} from "@/store/useUmkmStore";
import {useUmkm} from "@/hooks/useUmkm";

const DEFAULT_CENTER = { lat: -6.86507099703059, lng: 107.59368327596205 };

/** -------------------------------
 *  GEOJSON
 * -------------------------------- */
const dataUMKM = (nearbyUMKM: UmkmItem[]): FeatureCollection => ({
  type: "FeatureCollection",
  features: nearbyUMKM.map((v) => ({
    type: "Feature",
    properties: {
      id: v.id,
      name: v.name,
      category: v.mainCategory,
    },
    geometry: {
      type: "Point",
      coordinates: [v.lng, v.lat],
    },
  })),
});

const NearbyLocationLeaflet = ({}) => {
  /** -------------------------------
   *  STATE & DATA INITIALIZATION
   * -------------------------------- */
  const { userLocation, fetchUserLocation, clearUserLocation, isLoading, error } = useUserLocationStore();
  const { umkmImageUrl, selectedMainCategory } = useUmkmStore();
  const [nearbyUMKM, setNearbyUMKM] = useState<any[]>([]);
  const [radius, setRadius] = useState(100);
  const [isShowMaximumMap, setIsShowMaximumMap] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const { umkmList } = useUmkm();

  /** -------------------------------
   *  NEAREST UMKM FILTER
   * -------------------------------- */
  useEffect(() => {
    const base = userLocation ?? DEFAULT_CENTER;

    const filtered = umkmList
      .map((u) => ({
        ...u,
        distance: getDistance(base.lat, base.lng, u.lat, u.lng),
      }))
      .filter((u) => u.distance <= radius)
      .sort((a, b) => a.distance - b.distance);

    setNearbyUMKM(filtered);
  }, [radius, umkmList]);

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
    let center: L.LatLngExpression;
    if (userLocation) center = [userLocation.lat, userLocation.lng];
    else center = [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng];

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
      <div
        className={`relative w-8 h-8 bg-white rounded-full shadow-md border-1 border-gray-500 z-10 ${isLoading ? "hidden" : "block"}`}
      >
        <Image
          src={umkmImageUrl}
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

    /* User Icon */
    const iconUser = createDivIcon(
      <div className="flex-center w-8 h-8 bg-red-200 rounded-full ring-2 ring-black z-50">
        <UserRound />
      </div>,
      [0, 0],
      [20, 20],
      [-3, 5]
    );

    if (userLocation) {
      const popupUser = ReactDOMServer.renderToString(
        <div className="w-auto h-auto p-2 z-20">
          <div className="relative popup-header">
            <div className="flex-center w-8 h-8 bg-red-200 rounded-full ring-2 ring-black">
              <UserRound />
            </div>
            <p>Lokasi Anda Saat Ini</p>
          </div>
        </div>
      );

      /* User Marker */
      L.marker([userLocation.lat, userLocation.lng], { icon: iconUser, zIndexOffset: 1000 })
        .bindPopup(popupUser)
        .addTo(map);

      /* User Radius */
      L.circle([userLocation.lat, userLocation.lng], {
        radius,
        color: "#31725C",
        fillColor: "#31725C",
        fillOpacity: 0.3,
        interactive: false,
      }).addTo(map);
    }

    /* UMKM Marker */
    if (nearbyUMKM.length > 0) {
      const umkmGeoJSON = dataUMKM(nearbyUMKM);
      L.geoJSON(umkmGeoJSON, {
        pointToLayer: (_, latlng) => L.marker(latlng, { icon: iconUMKM }),
        onEachFeature: (feature, layer) => {
          const [lng, lat] = (feature.geometry as GeoJSON.Point).coordinates;
          const { id, name, category } = feature.properties as { id: string, name: string, category: string };

          const popupHtml = ReactDOMServer.renderToString(
            <UmkmInfoModal
              pageName="home"
              umkmId={id}
              umkmName={name}
              umkmCategory={category}
              userLocation={userLocation}
              umkmLocation={{ lat, lng }}
              umkmImageUrl={umkmImageUrl}
            />
          );

          layer.bindPopup(popupHtml);

          markersRef.current[id] = layer as L.Marker;

          layer.on("click", () => {
            map.setView([lat, lng], map.getZoom(), {
              animate: true,
              duration: 0.4,
            });

            map.panTo({lat, lng}, { animate: true });

            setTimeout(() => {
              map.panBy([0, -125]);
            }, 200);
          });
        },

      }).addTo(map);
    }
  }, [isLoading, userLocation, nearbyUMKM, isShowMaximumMap, umkmImageUrl]);

  /** -------------------------------
   *  HANDLER
   * -------------------------------- */
  const handleShowMaximumMap = (isShow: boolean) => {
    setIsShowMaximumMap(isShow);
    document.body.style.overflow = isShow ? "hidden" : "";
  };

  const focusToUMKM = (id: string) => {
    const map = mapRef.current;
    if (!map) return;

    const marker = markersRef.current[id];
    if (!marker) return;

    const { lat, lng } = marker.getLatLng();

    map.setView([lat, lng], map.getZoom(), {
      animate: true,
      duration: 0.4,
    });

    map.panTo({lat, lng}, { animate: true });

    setTimeout(() => {
      map.panBy([0, 0]);
    }, 200);

    marker.openPopup();
  };


  return (
    <div className={`${isShowMaximumMap ? 'container w-screen h-screen bg-black/50 p-5 fixed inset-0 z-50' : ''}`}>
      <div
        className={`relative overflow-hidden w-full mb-10 grid md:grid-cols-3 shadow-md rounded-2xl ${isShowMaximumMap ? 'flex h-full grid-cols-2' : 'overflow-hidden h-120 md:h-70 grid-cols-1'}`}>

        {/* Info Panel (Left) */}
        <MainInfoPanel
          isShowMaximumMap={isShowMaximumMap}
          umkm={nearbyUMKM}
          handleShowMaximumMap={handleShowMaximumMap}
          onSelectUMKM={focusToUMKM}
          umkmImageUrl={umkmImageUrl}
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
                radius={radius}
                onRadiusChange={setRadius}
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

export default NearbyLocationLeaflet;