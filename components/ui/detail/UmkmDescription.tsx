import React from 'react';
import {CircleArrowRight} from "lucide-react";

interface UmkmDescriptionProps {
  title: string;
  description: string;
  handleBackToProfile: () => void;
}

const UmkmDescription: React.FC<UmkmDescriptionProps> = ({title, description, handleBackToProfile}) => {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/70 w-full lg:w-2/3 h-auto rounded-2xl py-10 px-5 lg:px-20">
      <button
        className="cursor-pointer flex justify-center items-center rounded-full ring-2 ring-primary-content w-7 h-7 transition mb-10"
        onClick={handleBackToProfile}
      >
        <CircleArrowRight size={20} className="rotate-180 text-primary-content animate-float-slow"/>
      </button>

      <h1 className="text-2xl lg:text-4xl text-primary-content-dark font-bold mb-10">{title}</h1>

      <div className="flex justify-between">
        <div className="flex flex-col gap-5">
          <h1 className="text-primary-content-dark font-semibold lg:text-4xl">Deskripsi</h1>
          <p>{description}</p>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-primary-content-dark font-semibold lg:text-4xl">Jam Operasional</h1>
          <p>Senin - Jumat: 08.00 - 21.00</p>
          <p>Sabtu: 09.00 - 22.00</p>
          <p>Minggu: 10.00 - 20.00</p>
        </div>
      </div>
    </div>
  );
};

export default UmkmDescription;