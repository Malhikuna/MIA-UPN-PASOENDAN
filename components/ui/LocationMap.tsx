import dynamic from "next/dynamic";
import {images} from "next/dist/build/webpack/config/blocks/images";
import {UmkmItem} from "@/types/umkm";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
});

interface LocationMapProps {
  umkm: UmkmItem;
}

const LocationMap: React.FC<LocationMapProps> = ({umkm}) => {
  return <LeafletMap umkm={umkm} />;
};

export default LocationMap;