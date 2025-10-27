import dynamic from "next/dynamic";
import {images} from "next/dist/build/webpack/config/blocks/images";
import {UmkmItem} from "@/types/umkm";
import { usePathname } from "next/navigation";

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