"use client";
import { useUmkmLogic } from "@/hooks/useUmkmLogic";
import { ChevronDown, MapPin } from "lucide-react";
import { useRef } from "react";
import { useUmkmStore } from "@/store/useUmkmStore";
import { useUserLocationStore } from "@/store/useUserLocationStore";
import Image from "next/image";
import AllUmkmSection from "@/components/section/AllUmkmSection";

export default function UmkmPage() {
  const { userLocation, fetchUserLocation } = useUserLocationStore();
  const { currentSubCategories, handleSubCategoryChange, currentFilter, handleCurrentFilterChange } = useUmkmLogic();
  const categoryDropdownRef = useRef<HTMLDetailsElement>(null);
  const filterDropdownRef = useRef<HTMLDetailsElement>(null);

  const { selectedMainCategory } = useUmkmStore();
  // Animasi saat ganti halaman

  const closeDropdown = (ref: React.RefObject<HTMLDetailsElement | null>) => {
    if (ref.current) {
      ref.current.open = false;
    }
  };

  const handleFilterClick = (value: string) => {
    handleCurrentFilterChange(value);
    closeDropdown(filterDropdownRef);
  };

  const handleCategoryClick = (value: string) => {
    handleSubCategoryChange(value);
    closeDropdown(categoryDropdownRef);
  };

  return (
    <div className="container mx-auto py-5 md:py-10 px-4 md:px-8 lg:px-12 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mb-6 md:mb-8 mt-12 md:mt-12 gap-4">
        <h1 className="font-bold text-2xl md:text-3xl">
          Semua Umkm <span className="text-primary-content">{(selectedMainCategory as string).toUpperCase()}</span>
        </h1>

        <div className="flex justify-start md:justify-between items-center gap-2 md:gap-7">
          <details ref={filterDropdownRef} className="dropdown w-30">
            <summary className="bg-primary-content/90 text-white btn btn-sm md:btn-md m-0 md:m-1 text-xs md:text-sm rounded-[10px] w-full justify-between">
              <span>Filter</span>
              <ChevronDown className="w-4 h-4" />
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-full min-w-0 p-2 shadow-sm">
              <li
                className="p-1.5 hover:bg-primary-content/10 hover:text-primary-content rounded-lg cursor-pointer transition-all duration-200"
                onClick={() => handleFilterClick("newest")}
              >
                Terbaru
              </li>
              <li
                className="p-1.5 hover:bg-primary-content/10 hover:text-primary-content rounded-lg cursor-pointer transition-all duration-200"
                onClick={() => handleFilterClick("nearest")}
              >
                Terdekat
              </li>
            </ul>
          </details>
          <details ref={categoryDropdownRef} className="dropdown w-34">
            <summary className="bg-primary-content/90 text-white btn btn-sm md:btn-md m-0 md:m-1 text-xs md:text-sm rounded-[10px] w-full justify-between">
              <span>Category</span>
              <ChevronDown className="w-4 h-4" />
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-full min-w-0 p-2 shadow-sm">
              {currentSubCategories.map((subcat) => {
                return (
                  <li
                    key={subcat.value}
                    className="p-1.5 hover:bg-primary-content/10 hover:text-primary-content rounded-lg cursor-pointer transition-all duration-200"
                    onClick={() => handleCategoryClick(subcat.value)}
                  >
                    {subcat.label}
                  </li>
                );
              })}
            </ul>
          </details>
        </div>
      </div>

      {!userLocation && currentFilter === "nearby" && (
        <div className="h-[280px] w-full flex flex-col justify-center items-center bg-gray-100 rounded-xl">
          <Image src="/images/enable-location.webp" alt="Enable Location" width={250} height={250} className="" />
          <p className=" font-medium mb-3">Aktifkan lokasi untuk melihat UMKM terdekat di sekitar Anda.</p>
          <button
            onClick={fetchUserLocation}
            className="p-3 bg-primary-content/90 text-primary-content-bright rounded-2xl flex items-center gap-2 transition-colors"
          >
            <MapPin /> Aktifkan Lokasi
          </button>
        </div>
      )}

      {userLocation && currentFilter === "nearby" && <AllUmkmSection />}

      {currentFilter === "newest" && <AllUmkmSection />}
    </div>
  );
}
