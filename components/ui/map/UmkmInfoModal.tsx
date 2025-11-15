import Image from "next/image";
import {Clock, Footprints, LandPlot, MapPinned, Smile} from "lucide-react";
import React from "react";
import Link from "next/link";
import {formatDistance} from "@/utils/formatDistance";
import {getDistance} from "@/utils/getDistance";

interface location {
  lat: number;
  lng: number;
}

interface UmkmInfoModalProps {
  pageName: string;
  userLocation?: location | null;
  umkmLocation: location | null;
  umkmId: string;
  umkmName: string;
  umkmCategory: string;
  umkmImageUrl: string;
}

const UmkmInfoModal: React.FC<UmkmInfoModalProps> = ({pageName, userLocation, umkmLocation, umkmName, umkmCategory, umkmId, umkmImageUrl}) => {
  return (
    <div className="w-[280px] p-2 max-h-none">
      <div className="relative flex items-center gap-5 popup-header">
        <div className="relative w-15 h-15 rounded-full shadow-md border-1 border-gray-500">
          <Image
            src={umkmImageUrl}
            alt="poto profil umkm"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="text-gray-700 text-sm">
          {/*<span className="h-2 w-2 bg-blue-100 px-2 rounded-md font-semibold text-blue-700">F&B</span>
          <span className="ml-2 h-2 w-2 bg-red-100 px-2 rounded-md font-semibold text-red-700">New</span>
          <br/>*/}
          {umkmName.slice(0, 18) + (umkmName.length > 18 ? "..." : "")}
          <br/>
          <span className={`h-2 w-2 px-2 rounded-md font-semibold ${umkmCategory === "fnb" ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{umkmCategory === "fnb" ? 'F&B' : 'Jasa'}
          </span> • <span
          className="text-primary-content-dark font-bold">Buka 08:00 WIB</span>
        </div>

        <Link href={`https://www.google.com/maps?q=${umkmLocation?.lat},${umkmLocation?.lng}`} target="_blank">
          <button
            className="btn absolute top-0 right-0 w-5 h-5 p-1 shadow border-1 border-gray-500 rounded-full bg-primary-content-bright">
            <Image
              src="/images/logo/google-map.webp"
              alt="google map"
              height="80"
              width="80"
              className="object-cover"
              priority
            />
          </button>
        </Link>
      </div>

      <div
        className="flex items-center justify-evenly mt-4 w-full h-8 rounded-md bg-primary-content-bright ring-2 ring-primary-content">
        <p className="flex items-center gap-1"><Smile size={20}/> 10 </p>
        <p className="flex items-center gap-1"><Clock size={20}/> 08:00 WIB </p>
        <p className="flex items-center gap-1"><LandPlot size={20}/>{
          userLocation && umkmLocation ? formatDistance(getDistance(umkmLocation.lat, umkmLocation.lng, userLocation.lat, userLocation.lng))
            : '0m'
        }</p>
      </div>

      {
        pageName === "home" && (
          <>
            <div className="popup-body">
              <p className="popup-desc">Bakso legendaris dengan kuah gurih, tersedia juga mie ayam spesial.</p>
            </div>


            <Link href={`/umkm/${umkmId}`}>
              <button className="btn w-full p-5 rounded-xl bg-primary-content-bright ring-2 ring-primary-content hover:bg-primary-content-bright/50 text-green-700">
                Lihat Detail
              </button>
            </Link>
          </>
        )
      }
    </div>
  );
};

export default UmkmInfoModal;