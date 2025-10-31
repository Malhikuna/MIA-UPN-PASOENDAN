"use client";

import dynamic from "next/dynamic";
import {UmkmItem} from "@/types/umkm";

const DetailUmkmMap = dynamic(() => import("./leaflet/DetailLocationLeaflet"), {
  ssr: false,
});

const NearbyUmkmMap = dynamic(() => import("./leaflet/NearbyLocationLeaflet"), {
  ssr: false,
});

interface LocationMapProps {
  mode: string
  umkm?: UmkmItem;
  listUmkm?: UmkmItem[];
}

const LocationMap: React.FC<LocationMapProps> = ({mode, umkm}) => {
  return (
    <>
      {mode === "list" ? (
        <NearbyUmkmMap />
      ) : (
        <DetailUmkmMap umkm={umkm!} />
      )}
    </>
  );
};

export default LocationMap;