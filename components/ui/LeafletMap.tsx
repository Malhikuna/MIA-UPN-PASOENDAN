"use client";
import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LeafletMapProps {
  umkmName?: string;
}

const LeafletMap: React.FC<LeafletMapProps> = ({umkmName}) => {
  useEffect(() => {
    const map = L.map("map").setView([-6.864548192578693, 107.5933793366201], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const iconUMKM = L.icon({
      iconUrl: "/images/map-pin.png", // pastikan file ini ada di folder /public/images
      iconSize: [120, 80],
      iconAnchor: [60, 70],
    });

    const marker = L.marker([-6.864548192578693, 107.5933793366201], { icon: iconUMKM }).addTo(map);

    marker
      // .bindPopup(`<div>${umkmName ?? 'Lokasi Saya'}</div>`)
      .openPopup();

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      id="map"
      style={{ height: "300px", borderRadius: "1rem" }}
      className="mb-10 border-2 border-[#31725C] z-10"
    />
  );
};

export default LeafletMap;
