"use client";
import React, {useEffect, useState} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {UmkmItem} from "@/types/umkm";
import {Minimize2, UserRound} from "lucide-react";
import Link from "next/link";
import { FeatureCollection } from "geojson";
import Image from "next/image";
import ReactDOMServer from "react-dom/server";
import UmkmInfoModal from "@/components/ui/map/UmkmInfoModal";
import MainInfoPanel from "@/components/ui/map/info_panel/MainInfoPanel";
import {createDivIcon} from "@/utils/map/createDivIcon";
import {initMap} from "@/utils/map/initMap";

interface LeafletMapProps {
  umkm: UmkmItem[];
}

const dataUMKM: FeatureCollection = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "nama": "Bakso Pak Dedi",
        "jenis": "F&B"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [107.59258037945818, -6.864548192578693]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nama": "Warung Kopi Mal",
        "jenis": "F&B"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [107.59358672918238, -6.864757563617405]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nama": "Bakso Pak Dedi",
        "jenis": "F&B"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [107.5933793366201, -6.864548192578693]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nama": "Bakso Pak Dedi",
        "jenis": "F&B"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [107.59364060772961, -6.864648144183463]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nama": "Bakso Pak Dedi",
        "jenis": "F&B"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [107.593790897819, -6.8647892179892365]
      }
    }
  ]
};

const NearbyLocationLeaflet = () => {
  const [isShowMaximumMap, setIsShowMaximumMap] = useState(false);

  const handleShowMaximumMap = (isShow: boolean) => {
    setIsShowMaximumMap(isShow);
    document.body.style.overflow = isShow ? "hidden" : "";
  }

  useEffect(() => {
    const center: L.LatLngExpression = [-6.864548192578693, 107.5933793366201];
    const map = initMap(isShowMaximumMap ? "mapFull" : "mapSmall", center);

    /* UMKM Icon */
    const iconUMKM = createDivIcon(
      <div className="relative w-8 h-8 bg-white rounded-full ring-2 ring-black">
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

    /* User Icon */
    const iconUser = createDivIcon(
      <div className="flex-center w-8 h-8 bg-red-200 rounded-full ring-2 ring-black">
        <UserRound />
      </div>,
      [0, 0],
      [20, 20],
      [-3, 5]
    );

    /* User Marker */
    const popupUser = ReactDOMServer.renderToString(
      <div className="w-auto h-auto p-2">
        <div className="relative popup-header">
          <div className="flex-center w-8 h-8 bg-red-200 rounded-full ring-2 ring-black">
            <UserRound/>
          </div>
          <p>
            Lokasi Anda Saat Ini
          </p>
        </div>
      </div>);

    L.marker([-6.864588459094727, 107.59323072566325], {icon: iconUser})
      .bindPopup(popupUser)
      .addTo(map);

    /* User Radius */
    L.circle([-6.864588459094727, 107.59323072566325], {
      radius: 100,
      color: "#31725C",
      fillColor: "#31725C",
      fillOpacity: 0.3,
      interactive: false,
    }).addTo(map);

    /* UMKM Marker */
    L.geoJSON(dataUMKM, {
      pointToLayer: (_, latlng) => L.marker(latlng, { icon: iconUMKM }),
      onEachFeature: (_, layer) => {
        const popupHtml = ReactDOMServer.renderToString(<UmkmInfoModal pageName="home" />);
        layer.bindPopup(popupHtml);
      },
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [isShowMaximumMap]);

  return (
    <>
      <div className="h-120 md:h-70 w-full mb-10 grid grid-cols-1 md:grid-cols-3 border-2 border-primary-content">
        <MainInfoPanel
          isShowMaximumMap={isShowMaximumMap}
          handleShowMaximumMap={handleShowMaximumMap}
        />
        <div
          id="mapSmall"
          className="z-10 md:col-span-2 h-full md:h-full"
        />
      </div>

      {
        isShowMaximumMap && (
          <div className="container w-screen h-screen bg-black/50 p-5 fixed inset-0 z-50">
            <div className="relative flex w-full h-full bg-black border-2 border-primary-content">
              <MainInfoPanel
                isShowMaximumMap={isShowMaximumMap}
                handleShowMaximumMap={handleShowMaximumMap}
              />

              <div
                id="mapFull"
                className="z-10 w-full h-full"
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

export default NearbyLocationLeaflet;
