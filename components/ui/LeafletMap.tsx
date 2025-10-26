"use client";
import React, {useEffect, useState} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {UmkmItem} from "@/types/umkm";
import {Footprints, MapPin, Maximize2, Minimize2, Motorbike} from "lucide-react";
import Link from "next/link";

interface LeafletMapProps {
  umkm: UmkmItem;
}

const LeafletMap: React.FC<LeafletMapProps> = ({umkm}) => {
  const [isShowMaximumMap, setIsShowMaximumMap] = useState(false);

  useEffect(() => {
    const map = L.map(isShowMaximumMap ? "mapFull" : "mapSmall").setView([-6.864548192578693, 107.5933793366201], 20);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const iconUMKM = L.icon({
      iconUrl: "/images/map-pin.png",
      iconSize: [120, 80],
      iconAnchor: [60, 70],
    });

    const marker = L.marker([-6.864548192578693, 107.5933793366201], { icon: iconUMKM }).addTo(map);

    const popupContent = `
      <div class="popup-card">
        <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400" 
             alt="Nasi Goreng Pak Joko"
             class="popup-image"/>
        <h3 class="popup-title">${umkm.title}</h3>
<!--        <p class="popup-desc">Buka setiap hari 17.00–23.00</p>-->
        <a href="https://www.google.com/maps?q=-6.864548,107.593379" 
           target="_blank" 
           class="popup-button">
           📍 Lihat di Google Maps
        </a>
      </div>
    `;

    const popup = L.popup({
      className: "custom-popup",
      closeButton: true,
      offset: L.point(0, -10),
    }).setContent(popupContent);

    marker.on("mouseover", function (e) {
      popup.setLatLng(e.latlng).openOn(map);
    });

    /*marker.on("mouseout", function () {
      map.closePopup(popup);
    });*/

    /*marker.bindPopup(popupContent, {
      className: "custom-popup",
      closeButton: true,
      offset: L.point(0, -10),
    }).openPopup();*/

    /*marker
      // .bindPopup(`<div>${umkmName ?? 'Lokasi Saya'}</div>`)
      .openPopup();*/

    return () => {
      map.remove();
    };
  }, [isShowMaximumMap]);

  const infoPanel = (
    <div className={`flex flex-col md:gap-5 justify-between bg-white md:border-r-2 border-primary-content p-5 ${isShowMaximumMap ? 'absolute left-2 bottom-2 w-150 h-auto border-2 z-50' : 'relative h-auto md:h-full w-auto'}`}>
      <div className="flex flex-col gap-4">
        <p className="text-gray-600 flex font-medium items-center gap-2">
          <MapPin/>
          {umkm.address}
        </p>

        <p className="text-gray-600 flex font-medium items-center gap-2">
          <Footprints />
          100m
        </p>

        <p className="text-gray-600 flex font-medium items-center gap-2">
          <Motorbike />
          100m
        </p>
      </div>

      <Link href={"https://www.google.com/maps?q=-6.864548,107.593379"}>
        <button className={`btn ${isShowMaximumMap ? 'w-50' : 'w-full'} bg-primary-content text-white rounded-md`}>
          Tampilkan di Google Map
        </button>
      </Link>
    <button className={`btn ${isShowMaximumMap ? 'w-50' : 'w-full'} bg-blue-500 text-white rounded-md`}>Tampilkan Lokasi Kamu</button>

    {
      !isShowMaximumMap && (
        <button
          className="flex-center absolute w-10 h-10 bg-white border-2 border-primary-content top-2 right-2 cursor-pointer"
          onClick={() => {setIsShowMaximumMap(true)}}
        >
          <Maximize2 className="text-primary-content" />
        </button>
      )
    }
    </div>
  )

  return (
    <>
      <div className="h-120 md:h-70 w-full mb-10 grid grid-cols-1 md:grid-cols-3 border-2 border-primary-content">
        {infoPanel}
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

              {infoPanel}

              <button
                className="flex-center absolute w-10 h-10 border-2 border-primary-content top-2 right-2 cursor-pointer bg-white z-50"
                onClick={() => {
                  setIsShowMaximumMap(false)
                }}
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

export default LeafletMap;
