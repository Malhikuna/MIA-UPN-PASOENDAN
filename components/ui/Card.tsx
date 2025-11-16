import { CardProps } from "@/types/card";
import { MapPin } from "lucide-react";
import React from "react";

export default function Card({ title, description, image, address, className = '' }: CardProps) {
  return (
   <div
      className={`relative rounded-lg shadow-md overflow-hidden h-64 group cursor-pointer ${className}`}
    >
      {/* Background Image Full */}
      {image && (
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

 
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
        {title && (
          <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{title}</h3>
        )}
        {address && (
          <div className="flex items-center gap-1 md:gap-2">
            <MapPin size={14} className="md:w-4 md:h-4 flex-shrink-0" />
            <p className="text-xs md:text-sm text-gray-200 line-clamp-1">{address ? address.slice(0, 30) + (address.length > 30 ? "..." : "") : "No address"}</p>
          </div>
        )}
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
    </div>
  );
}
