'use client';

import React, {useState} from 'react';
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({images, title}) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      {/* Foto Besar */}
      <div className="relative w-full h-96 rounded-lg overflow-hidden border-2 border-green-800">
        <Image
          src={selectedImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Foto Kecil */}
      <div className="grid grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className={`relative h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
              selectedImage === img
                ? "border-white scale-105"
                : "border-green-800 hover:border-white"
            }`}
            onClick={() => setSelectedImage(img)}
          >
            <Image
              src={img}
              alt={`Gallery ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;