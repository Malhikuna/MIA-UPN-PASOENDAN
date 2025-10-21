"use client";

import {useEffect, useRef, useState} from "react";
import Image from 'next/image';
import { X } from 'lucide-react';
import { gsap } from "gsap";

const ProductListCard = () => {
  const [isShowProduct, setIsShowProduct] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    if (modalRef.current && overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.inOut",
      });

      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => setIsShowProduct(false),
      });
    } else {
      setIsShowProduct(false);
    }
  };

  useEffect(() => {
    if (isShowProduct && modalRef.current && overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, [isShowProduct]);

  return (
    <>
      <div className="card bg-white text-black h-auto w-70 shadow-sm cursor-pointer"
           onClick={() => setIsShowProduct(true)}>
        <div className="relative w-full h-[200px]">
          <Image
            src="/images/umkm1-gallery1.jpg"
            alt="Shoes"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="card-body p-4">
          <h2 className="card-title">Nasi Goreng</h2>
          <p>Rp1.000,00</p>
        </div>
      </div>

      {
        isShowProduct && (
          <>
            <div
              ref={overlayRef}
              className="fixed inset-0 bg-black/50 z-10"
              onClick={handleClose}
            />

            <div
              ref={modalRef}
              className="flex flex-col md:flex-row fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto h-[500px] z-20 bg-black rounded-lg overflow-hidden">
              <div className="relative w-[700px] h-full">
                <Image
                  src="/images/umkm1-gallery1.jpg"
                  alt="Shoes"
                  fill
                  className="object-cover rounded-l-lg"
                />
              </div>

              <div className="relative w-full md:w-100 h-full bg-white">
                <button className="absolute top-3 right-3 w-10 h-10 bg-red-100 flex justify-center items-center rounded-full hover:bg-red-200 transition cursor-pointer" onClick={() => handleClose()}>
                  <X/>
                </button>
              </div>
            </div>
          </>
        )
      }
    </>
  );
};

export default ProductListCard;