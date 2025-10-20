import { CardProps } from "@/types/card";
import React from "react";

export default function Card({ title, description, image, address, className = '' }: CardProps) {
  return (
    <div
      className={`bg-slate-500 rounded-lg shadow-md overflow-hidden ${className}`}
    >
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-6">
        {address && <p className="text-gray-600 mb-4">{address}</p>}
        {title && <h3 className="text-xl font-bold mb-2">{title}</h3>}
        {description && <p className="text-gray-600 mb-4">{description}</p>}
      </div>
    </div>
  );
}
