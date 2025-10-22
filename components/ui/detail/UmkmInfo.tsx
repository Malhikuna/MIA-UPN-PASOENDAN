import React from 'react';
import {CircleArrowRight , BadgeInfo, MapPin, MessageCircle} from "lucide-react";

interface UmkmInfoProps {
  category: string;
  title: string;
  address: string;
  handleShowDescription: () => void;
}

const UmkmInfo: React.FC<UmkmInfoProps> = ({category, title, address, handleShowDescription}) => {
  return (
    <div className="flex flex-col justify-center gap-5 space-y-6">
      <div className="flex items-center gap-2">
        <span className="px-4 py-2 bg-primary-content-bright text-green-900 rounded-full text-sm font-semibold">
          {category}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <h1 className="text-4xl text-primary-content-dark font-bold mb-2">{title}</h1>
          <p className="text-gray-600 flex font-medium items-center gap-2">
            <MapPin/>
            {address}
          </p>
        </div>

        <div className="flex items-center gap-5">
          <h2 className="text-2xl font-semibold">Deskripsi</h2>

          <button
            className="cursor-pointer flex justify-center items-center rounded-full ring-2 ring-primary-content w-7 h-7 transition mt-1"
            onClick={handleShowDescription}
          >
              <CircleArrowRight size={20} className="text-primary-content animate-float-slow"/>
          </button>
          {/*<p className="text-gray-700 leading-relaxed">{umkm.description}</p>*/}
        </div>
      </div>

      <div className="flex gap-2 justify-between w-full h-10">
        <div className="flex gap-2">
          {/*<button className="btn btn-primary rounded-xl">
                    Ikuti
                  </button>*/}

          <button className="btn btn-neutral rounded-xl">
            Hubungi Kami Lewat <MessageCircle size={20}/>
          </button>
        </div>

        <div className="flex gap-2">
          {/*<button className="flex justify-center items-center gap-2 cursor-pointer">
                    <Heart/> <span>Favorite</span>
                  </button>

                  <button className="flex justify-center items-center gap-2 cursor-pointer">
                    <Share2/> <span>Share</span>
                  </button>*/}
        </div>
      </div>
    </div>
  );
};

export default UmkmInfo;