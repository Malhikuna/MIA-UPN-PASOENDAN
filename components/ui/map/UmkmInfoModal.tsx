import Image from "next/image";
import {Clock, Footprints, MapPinned, Smile} from "lucide-react";
import React from "react";
import Link from "next/link";

interface UmkmInfoModalProps {
  pageName: string;
}

const UmkmInfoModal: React.FC<UmkmInfoModalProps> = ({pageName}) => {
  return (
    <div className="w-[280px] p-2 max-h-none">
      <div className="relative popup-header">
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
          Bakso Pak Dedi <br/>
          F&B • <span className="text-primary-content-dark font-bold">Buka 08:00 WIB</span>
        </div>

        <Link href={"https://www.google.com/maps?q=-6.864548,107.593379"} target="_blank">
          <button className="btn absolute top-0 right-0 w-auto h-auto p-1 ring-2 rounded-full bg-primary-content-bright">
            <MapPinned color="red" />
          </button>
        </Link>
      </div>

      <div
        className="flex items-center justify-evenly mt-4 w-full h-8 rounded-md bg-primary-content-bright ring-2 ring-primary-content">
        <p className="flex items-center gap-1"><Smile size={20}/> 10 </p>
        <p className="flex items-center gap-1"><Clock size={20}/> 08:00 WIB </p>
        <p className="flex items-center gap-1"><Footprints size={20}/> 10ml </p>
      </div>

      {
        pageName === "home" && (
          <>
            <div className="popup-body">
              <p className="popup-desc">Bakso legendaris dengan kuah gurih, tersedia juga mie ayam spesial.</p>
            </div>


            <Link href={"/umkm/1"}>
              <button className="btn w-full p-5 rounded-xl bg-primary-content-bright ring-2 ring-primary-content">Lihat
                Detail
              </button>
            </Link>
          </>
        )
      }
    </div>
  );
};

export default UmkmInfoModal;