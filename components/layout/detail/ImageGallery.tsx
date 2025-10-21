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
      <div className="relative w-full h-96 rounded-lg overflow-hidden border-2 border-gray-300">
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
                ? "border-pink-500 scale-105"
                : "border-gray-300 hover:border-pink-300"
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