"use client";

import React, { useEffect, useRef, useState } from "react";
import ImageGallery from "@/components/ui/detail/ImageGallery";
import UmkmInfo from "@/components/ui/detail/UmkmInfo";
import { UmkmItem } from "@/types/umkm";
import { gsap } from "gsap";
import UmkmDescription from "@/components/ui/detail/UmkmDescription";

type UmkmProfileProps = {
  umkm: UmkmItem;
};

const UmkmProfile: React.FC<UmkmProfileProps> = ({ umkm }) => {
  const [isShowDescription, setIsShowDescription] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const showDesktopDesc = isShowDescription && !isMobile;

  const handleShowDescription = (view = "desktop") => {
    if (isMobile) {
      setIsShowDescription(true);
      document.body.style.overflow = "hidden";
    }

    if (!modalRef.current || isMobile) return;

    gsap.to(modalRef.current, {
      opacity: 0,
      x: 200,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => setIsShowDescription(true),
    });
  };

  const handleBackToProfile = () => {
    if (isMobile) document.body.style.overflow = "";

    if (!descriptionRef.current) return;

    gsap.to(descriptionRef.current, {
      opacity: 0,
      x: -200,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => setIsShowDescription(false),
    });
  };

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Show Description Animation */
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
    } else if (!isMobile && !isShowDescription && modalRef.current) {
      gsap.fromTo(modalRef.current, { opacity: 0, x: 200 }, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" });
    }
  }, [isShowDescription, isMounted]);

  return (
    <>
      <div
        ref={showDesktopDesc ? descriptionRef : modalRef}
        className={`relative grid grid-cols-1 lg:grid-cols-2 ${showDesktopDesc ? "gap-8" : "gap-15"}`}
      >
        {/* UMKM Gallery */}
        <div className={showDesktopDesc ? "opacity-0" : ""}>
          <ImageGallery images={umkm.imageUrl} title={umkm.name} />
        </div>
        {showDesktopDesc ? (
          /* UMKM Description */
          <UmkmDescription title={umkm.name} description={umkm.description} handleBackToProfile={handleBackToProfile} />
        ) : (
          /* UMKM Information */
          <UmkmInfo
            category={umkm.subCategory}
            title={umkm.name}
            address={umkm.address}
            handleShowDescription={handleShowDescription}
          />
        )}
      </div>

      {/* Description on Mobile */}
      {isShowDescription && isMobile && (
        <div
          ref={descriptionRef}
          className="fixed inset-0 flex items-center justify-center w-full h-[100vh] bg-white z-30"
        >
          {/* UMKM Description */}
          <UmkmDescription title={umkm.name} description={umkm.description} handleBackToProfile={handleBackToProfile} />
        </div>
      )}
    </>
  );
};

export default UmkmProfile;
