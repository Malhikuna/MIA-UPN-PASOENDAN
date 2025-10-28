"use client";

import dynamic from "next/dynamic";
import {UmkmItem} from "@/types/umkm";

const NearbyUmkmMap = dynamic(() => import("./NearbyLocationLeaflet"), {
  ssr: false,
});

/*interface LocationMapProps {
  umkm: UmkmItem[];
}*/

const NearbyLocationMap = () => {
  return <NearbyUmkmMap />;
};

export default NearbyLocationMap;