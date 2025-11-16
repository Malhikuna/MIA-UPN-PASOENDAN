import { MapPin, Maximize2 } from "lucide-react";
import SearchInput from "@/components/ui/SearchInput";
import Image from "next/image";
import React, {useRef, useState} from "react";
import {UmkmCategory, UmkmItem} from "@/types/umkm";
import SelectDropdown from "@/components/ui/map/SelectDropdown";
import {useUmkmStore} from "@/store/useUmkmStore";
import {formatDistance} from "@/utils/formatDistance";
import {getDistance} from "@/utils/getDistance";
import {useUserLocationStore} from "@/store/useUserLocationStore";
import {useUmkmLogic} from "@/hooks/useUmkmLogic";

interface MainInfoPanelProps {
  isShowMaximumMap: boolean;
  handleShowMaximumMap: (isShow: boolean) => void;
  umkm: UmkmItem[];
  onSelectUMKM: (id: string) => void;
  umkmImageUrl: string;
}

const MainInfoPanel: React.FC<MainInfoPanelProps> = ({ isShowMaximumMap, handleShowMaximumMap, umkm, onSelectUMKM, umkmImageUrl}) => {
  const { searchQuery, setSearchQuery } = useUmkmStore();
  const { userLocation } = useUserLocationStore();
  const { currentSubCategories } = useUmkmLogic();
  const { selectedMainCategory, setSelectedMainCategory, selectedSubCategory, setSelectedSubCategory } = useUmkmStore();

  const subCategory = currentSubCategories.map(v => v.label) as UmkmCategory[];

  return (
    <div
      className={`flex flex-col md:gap-5 justify-between bg-white shadow-[4px_0_10px_rgba(0,0,0,0.2)] md:border-r-1 border-gray-400 px-5 pt-5 pb-2 hidden lg:block ${
        isShowMaximumMap ? "h-auto z-50" : "relative h-auto md:h-full w-auto"
      }`}
    >
      <div className="flex flex-col gap-4 h-full pb-2">
        <p className="text-gray-600 flex font-medium items-center gap-2">
          <MapPin/>{umkm.length} umkm <span className="text-primary-content">terdeteksi</span>
        </p>

        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          labelClassName="w-full h-12 px-4 rounded-full"
          placeholder="Cari nama UMKM atau alamat..."
          className="flex-1 outline-none text-sm text-gray-600 w-full placeholder-gray-400"
          bgColor={"bg-black/10"}
        />

        {
          isShowMaximumMap && (
            <div className="flex gap-2">
              <SelectDropdown
                label="Jenis UMKM"
                options={["fnb", "jasa"] as const}
                value={selectedMainCategory}
                onChange={setSelectedMainCategory}
              />

              <SelectDropdown
                label="Sub Kategori"
                options={subCategory}
                value={selectedSubCategory}
                onChange={setSelectedSubCategory}
              />
            </div>
          )
        }

        <div className={`flex flex-col gap-2 w-full overflow-y-auto pb-5 ${isShowMaximumMap ? "w-100 h-100" : "h-35"}`}>
          {umkm.map((value, i) => (
            <div
              key={i}
              onClick={() => onSelectUMKM(value.id)}
              className="popup-header cursor-pointer flex gap-2 items-center p-2 bg-white border-1 border-gray-200 rounded-xl shadow rounded-md hover:bg-gray-100 hover:py-4 transition duration-200">
              <div className="relative w-15 h-15 rounded-full shadow-md border-1 border-gray-400">
                <Image
                  src={umkmImageUrl}
                  alt="poto profil umkm"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="text-gray-700 text-sm">
                <span className={`h-2 w-2 px-2 rounded-md font-semibold ${value.mainCategory === 'fnb' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{value.mainCategory === 'fnb' ? 'F&B' : 'Jasa'}</span>
                <span className="ml-2 h-2 w-2 bg-red-100 px-2 rounded-md font-semibold text-red-700">New</span>
                <br/>
                {value.name}
                <br/>
                {value.subCategory.replaceAll("-", " ")} • <span className="text-primary-content-dark font-bold">Buka 08:00 WIB</span>
                <br/>
                {userLocation && value.lat && value.lng ? formatDistance(getDistance(value.lat, value.lng, userLocation.lat, userLocation.lng))
                  : '0m'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {!isShowMaximumMap && (
        <button
          className="flex-center absolute w-10 h-10 bg-white border-2 border-primary-content top-2 right-2 cursor-pointer rounded-xl transition duration-300 hover:bg-primary-content/30"
          onClick={() => handleShowMaximumMap(true)}
        >
          <Maximize2 className="text-primary-content" />
        </button>
      )}
    </div>
  );
};

export default MainInfoPanel;
