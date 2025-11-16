import React from 'react';
import {CircleArrowRight, BadgeInfo, MapPin, MessageCircle, Heart, Share2} from "lucide-react";
import Image from "next/image";
import {useUmkmStore} from "@/store/useUmkmStore";
import Link from "next/link";

interface UmkmInfoProps {
  category: string;
  title: string;
  address: string;
  whatsApp: string
  handleShowDescription: () => void;
}

const UmkmInfo: React.FC<UmkmInfoProps> = ({category, title, address, handleShowDescription, whatsApp}) => {
  const { umkmImageUrl } = useUmkmStore();
  const cleanedWa = whatsApp ? whatsApp.replace(/^0/, "") : "85156818587";
  return (
    <div className="flex flex-col justify-center gap-5 space-y-6">
      <div className="flex items-center gap-2">
        <span className="px-4 py-2 bg-primary-content-bright text-green-900 rounded-full text-sm font-semibold">
          {category}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <div className="flex items-center gap-5 mb-5">
            <div className="hidden md:block relative w-15 h-15 rounded-full shadow-md border-1 border-gray-500">
              <Image
                src={umkmImageUrl}
                alt="poto profil umkm"
                fill
                className="object-cover"
                priority
              />
            </div>
            <h1 className="text-4xl text-primary-content-dark font-bold">{title}</h1>
          </div>
          <p className="text-gray-600 flex font-medium items-center gap-2">
          <MapPin/>
            {address}
          </p>
        </div>

        <div className="flex items-center gap-5">
          <h2 className="text-2xl font-semibold">Deskripsi</h2>

          {/* Show Description Button */}
          <button
            className="cursor-pointer flex justify-center items-center rounded-full ring-2 ring-primary-content w-7 h-7 transition mt-1"
            onClick={handleShowDescription}
          >
            <CircleArrowRight size={20} className="text-primary-content animate-float-slow"/>
          </button>
        </div>
      </div>

      <div className="flex gap-2 justify-between w-full h-10">
        <div className="flex gap-2">
          {/*<button className="btn btn-primary rounded-xl">
                    Ikuti
                  </button>*/}

          <Link
            href={`https://wa.me/62${cleanedWa}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success rounded-xl text-white flex items-center gap-2"
          >
            Hubungi Kami Lewat <MessageCircle size={20} />
          </Link>
        </div>

        {/*<div className="flex gap-2 w-auto h-auto py-2 px-5 bg-white rounded-full shadow-sm">
          <button className="flex justify-center items-center gap-2 cursor-pointer">
            <MessageCircle/> <span>Favorite</span>
          </button>

          <button className="flex justify-center items-center gap-2 cursor-pointer">
            <Heart/> <span>Favorite</span>
          </button>

          <button className="flex justify-center items-center gap-2 cursor-pointer">
            <Share2/> <span>Share</span>
          </button>
        </div>*/}
      </div>
    </div>
  );
};

export default UmkmInfo;