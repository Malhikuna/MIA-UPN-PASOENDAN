import dynamic from "next/dynamic";
import {images} from "next/dist/build/webpack/config/blocks/images";
import {UmkmItem} from "@/types/umkm";
import { usePathname } from "next/navigation";

const DetailUmkmMap = dynamic(() => import("./DetailLocationLeaflet"), {
  ssr: false,
});

const NearbyUmkmMap = dynamic(() => import("./NearbyLocationLeaflet"), {
  ssr: false,
});

interface LocationMapProps {
  umkm: UmkmItem;
}

const DetailLocationMap: React.FC<LocationMapProps> = ({umkm}) => {
  const pathname = usePathname();

  return (
    <>
      {
        pathname.startsWith('/umkm') ? (
          <DetailUmkmMap umkm={umkm} />
        ): (
          <NearbyUmkmMap umkm={umkm} />
        )
      }
    </>
  )
};

export default DetailLocationMap;