import React from 'react';
import {Footprints, MapPin, Maximize2, Motorbike} from "lucide-react";
import Link from "next/link";
import {UmkmItem} from "@/types/umkm";

interface DetailInfoPanelProps {
  isShowMaximumMap: boolean;
  handleShowMaximumMap: (isShow: boolean) => void;
  umkm: UmkmItem;
}

const DetailInfoPanel: React.FC<DetailInfoPanelProps> = ({isShowMaximumMap, handleShowMaximumMap, umkm}) => {
  return (
    <div
      className={`flex flex-col md:gap-5 justify-between bg-white md:border-r-2 border-primary-content p-5 ${isShowMaximumMap ? 'absolute left-2 bottom-2 w-auto h-auto border-2 z-50' : 'relative h-auto md:h-full w-auto'}`}>
      <div className="flex flex-col gap-4">
        <p className="text-gray-600 flex font-medium items-center gap-2">
          <MapPin/>
          {umkm.address}
        </p>

        <p className="text-gray-600 flex font-medium items-center gap-2">
          <Footprints/>
          100m
        </p>

        <p className="text-gray-600 flex font-medium items-center gap-2">
          <Motorbike/>
          100m
        </p>
      </div>

      <Link href={"https://www.google.com/maps?q=-6.864548,107.593379"} target="_blank">
        <button className={`btn ${isShowMaximumMap ? 'w-50' : 'w-full'} bg-primary-content text-white rounded-md`}>
          Tampilkan di Google Map
        </button>
      </Link>
      <button className={`btn ${isShowMaximumMap ? 'w-50' : 'w-full'} bg-blue-500 text-white rounded-md`}>
        Tampilkan Lokasi Kamu
      </button>

      {
        !isShowMaximumMap && (
          <button
            className="flex-center absolute w-10 h-10 bg-white border-2 border-primary-content top-2 right-2 cursor-pointer"
            onClick={() => handleShowMaximumMap(true)}
          >
            <Maximize2 className="text-primary-content"/>
          </button>
        )
      }
    </div>
  );
};

export default DetailInfoPanel;