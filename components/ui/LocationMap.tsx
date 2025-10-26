import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
});

interface LocationMapProps {
  umkmName: string;
}

const LocationMap: React.FC<LocationMapProps> = ({umkmName}) => {
  return <LeafletMap umkmName={umkmName} />;
};

export default LocationMap;