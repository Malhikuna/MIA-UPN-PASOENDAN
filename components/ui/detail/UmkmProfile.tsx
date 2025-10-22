"use client";

import React, {useEffect, useRef, useState} from 'react';
import ImageGallery from "@/components/ui/detail/ImageGallery";
import UmkmInfo from "@/components/ui/detail/UmkmInfo";
import {UmkmItem} from "@/types/umkm";
import {gsap} from "gsap";
import {CircleArrowRight} from "lucide-react";
import UmkmDescription from "@/components/ui/detail/UmkmDescription";

type UmkmProfileProps = {
  umkm: UmkmItem;
};

const UmkmProfile: React.FC<UmkmProfileProps> = ({umkm}) => {
  const [isShowDescription, setIsShowDescription] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleShowDescription = () => {
    if (!modalRef.current) return;

    gsap.to(modalRef.current, {
      opacity: 0,
      x: 200,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => setIsShowDescription(true),
    });
  };

  const handleBackToProfile = () => {
    if (!descriptionRef.current) return;

    gsap.to(descriptionRef.current, {
      opacity: 0,
      x: -200,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => setIsShowDescription(false),
    });
  };

  /* Animasi muncul deskripsi */
  useEffect(() => {
    if (!isMounted) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isShowDescription && descriptionRef.current) {
      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, x: -200 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      );
    } else if (!isShowDescription && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, x: 200 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [isShowDescription, isMounted]);


  return (
    <>
      {
        isShowDescription ? (
          <div
            ref={descriptionRef}
            className="relative grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="opacity-0">
              <ImageGallery images={umkm.images} title={umkm.title}/>
            </div>

            <UmkmDescription
              title={umkm.title}
              description={umkm.description}
              handleBackToProfile={handleBackToProfile}
            />
          </div>
        ) : (
          <div
            ref={modalRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-15"
          >
            {/* Image Gallery - Kiri */}
            <ImageGallery images={umkm.images} title={umkm.title}/>

            {/* Informasi Toko */}
            <UmkmInfo
              category={umkm.category}
              title={umkm.title}
              address={umkm.address}
              handleShowDescription={handleShowDescription}
            />
          </div>
        )
      }
    </>
)
  ;
};

export default UmkmProfile;