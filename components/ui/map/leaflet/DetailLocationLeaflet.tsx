"use client";
import React, {useEffect, useState} from "react";
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

interface LeafletMapProps {
  umkm: UmkmItem;
}

const DetailLocationLeaflet: React.FC<LeafletMapProps> = ({umkm}) => {
  const [isShowMaximumMap, setIsShowMaximumMap] = useState(false);

  const handleShowMaximumMap = (isShow: boolean) => {
    setIsShowMaximumMap(isShow);
    document.body.style.overflow = isShow ? "hidden" : "";
  }

  useEffect(() => {
    const center: L.LatLngExpression = [-6.864598796216134, 107.59336857083889];
    const map = initMap(isShowMaximumMap ? "mapFull" : "mapSmall", center);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      minZoom: 19
    }).addTo(map);

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

    const popupHtml = ReactDOMServer.renderToString(<UmkmInfoModal pageName="detail"/>);

    L.marker([-6.864548192578693, 107.5933793366201], {icon: iconUMKM}).bindPopup(popupHtml).addTo(map);

    return () => {
      map.remove();
    };
  }, [isShowMaximumMap]);

  return (
    <>
      <div className="h-120 md:h-70 w-full mb-10 grid grid-cols-1 md:grid-cols-3 border-2 border-primary-content">
        <DetailInfoPanel
          isShowMaximumMap={isShowMaximumMap}
          umkm={umkm}
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
            <div className="relative flex flex-col w-full h-full bg-black border-2 border-primary-content">
              <div
                id="mapFull"
                className="z-10 col-span-2 h-full"
              />

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
