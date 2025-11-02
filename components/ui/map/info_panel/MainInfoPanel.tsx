import { MapPin, Maximize2 } from "lucide-react";
import Input from "@/components/ui/Input";
import Image from "next/image";
import React from "react";
import {UmkmItem} from "@/types/umkm";

interface MainInfoPanelProps {
  isShowMaximumMap: boolean;
  handleShowMaximumMap: (isShow: boolean) => void;
  umkm: UmkmItem[];
}

const MainInfoPanel: React.FC<MainInfoPanelProps> = ({ isShowMaximumMap, handleShowMaximumMap, umkm}) => {
  return (
    <div
      className={`flex flex-col md:gap-5 justify-between bg-white md:border-r-2 border-primary-content px-5 pt-5 pb-2 hidden lg:block ${
        isShowMaximumMap ? "h-auto z-50" : "relative h-auto md:h-full w-auto"
      }`}
    >
      <div className="flex flex-col gap-4">
        <p className="text-gray-600 flex font-medium items-center gap-2">
          <MapPin />{umkm.length} umkm <span className="text-primary-content">terdeteksi</span>
        </p>

        <Input
          labelClassName="w-full h-12 px-4 rounded-full"
          placeholder="Cari nama UMKM atau alamat..."
          className="flex-1 outline-none text-sm text-white w-full"
          bgColor={"bg-black/30"}
        />

        <div className={`flex flex-col gap-2 w-full ${isShowMaximumMap ? "h-full" : "h-35"} overflow-y-auto`}>
          {umkm.map((value, i) => (
              <div key={i} className="popup-header cursor-pointer flex gap-2 items-center p-2 bg-white rounded-md">
                <div className="relative w-15 h-15 rounded-full ring-2 ring-black">
                  <Image
                    src="/images/umkm/default-umkm-profile.webp"
                    alt="poto profil umkm"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div>
                  {value.name} <br />
                  F&B • <span className="text-primary-content-dark font-bold">Buka 08:00 WIB</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {!isShowMaximumMap && (
        <button
          className="flex-center absolute w-10 h-10 bg-white border-2 border-primary-content top-2 right-2 cursor-pointer"
          onClick={() => handleShowMaximumMap(true)}
        >
          <Maximize2 className="text-primary-content" />
        </button>
      )}
    </div>
  );
};

export default MainInfoPanel;
