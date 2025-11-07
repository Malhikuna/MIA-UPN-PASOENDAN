"use client";
import React, { useEffect, useRef, useState } from "react";
import Input from "../ui/Input";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useUmkmStore } from "@/store/useUmkmStore";
import { Menu, X } from "lucide-react";

const navbarConfig = [
  { path: "/umkm", transparent: true, text: "black" },
  { path: "/about", transparent: false, text: "black" },
  { path: "/", transparent: true, text: "white" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTextChanged, setIsTextChanged] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useUmkmStore();

  const currentConfig = navbarConfig.find((cfg) => pathname.startsWith(cfg.path)) ?? {
    transparent: false,
    text: "black",
  };

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.9;

      if (pathname.startsWith("/")) setIsTextChanged(window.scrollY > threshold);

      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsScrolled(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const baseClasses = "fixed left-0 top-0 w-full z-50 py-3 transition-all duration-300";

  const navClass = `
    ${baseClasses}
    ${
    isScrolled
      ? pathname.startsWith("/")
        ? "text-primary-content-dark glass shadow-md"
        : "glass shadow-md"
      : currentConfig.transparent
        ? "bg-transparent"
        : "bg-white"
  }
  `;

  const textColor = currentConfig.text === "white" ? "text-white" : "text-primary-content";

  const isHome = pathname === "/";
  const logoSrc = isHome
    ? isTextChanged
      ? "/images/logo/carikita-black.webp"
      : "/images/logo/carikita-white.webp"
    : "/images/logo/carikita-black.webp";

  const searchParams = useSearchParams();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const focus = searchParams.get("focus");

  useEffect(() => {
    if (pathname.startsWith("/umkm") && focus === "true" && inputRef.current) {
      inputRef.current.focus();
      const url = new URL(window.location.href);
      url.searchParams.delete("focus");
      router.replace(url.pathname);
    }
  }, [pathname, focus, router]);

  return (
    <>
      <nav className={`flex justify-center h-16 ${navClass} ${isTextChanged ? "bg-white/80 shadow-md" : ""}`}>
        <div className="container flex mx-auto justify-between items-center px-8 md:px-12 gap-4">
          <Link href={`/`}>
            <Image src={logoSrc} alt="CariKita" height={100} width={100} />
          </Link>

          {/* Search Input - Desktop & Mobile */}
          <div className="flex-1 md:mx-8">
            {pathname.startsWith("/umkm") ? (
              <Input
                ref={inputRef}
                placeholder="Cari nama UMKM"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-sm text-white"
                labelClassName="w-full md:w-[40vw]"
                bgColor={`bg-black/20`}
              />
            ) : !pathname.startsWith("/about") ? (
              <Link href={`/umkm?focus=true`} className="w-fit block">
                <Input
                  placeholder="Cari nama UMKM"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 outline-none text-sm text-white"
                  labelClassName="w-full md:w-[40vw]"
                  bgColor={`${isTextChanged ? "bg-black/20" : 'bg-white/30'}`}
                />
              </Link>
            ) : null}
          </div>

          {/* Desktop Menu */}
          <ul
            className={`hidden md:flex gap-7 items-center font-semibold ${isTextChanged ? "text-primary-content" : textColor}`}
          >
            <li>
              <Link 
                href={`/`} 
                className={`relative hover:text-primary-content transition-colors pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-current after:origin-left after:transition-transform after:duration-300 ${
                  pathname === "/" 
                    ? "after:scale-x-100" 
                    : "after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link 
                href={`/umkm`} 
                className={`relative hover:text-primary-content transition-colors pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-current after:origin-left after:transition-transform after:duration-300 ${
                  pathname.startsWith("/umkm") 
                    ? "after:scale-x-100" 
                    : "after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                UMKM
              </Link>
            </li>
            <li>
              <Link 
                href={`/about`} 
                className={`relative hover:text-primary-content transition-colors pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-current after:origin-left after:transition-transform after:duration-300 ${
                  pathname.startsWith("/about") 
                    ? "after:scale-x-100" 
                    : "after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                ABOUT US
              </Link>
            </li>
          </ul>

          {/* Mobile Hamburger Button */}
          <button
            className={`md:hidden z-50 relative ${isTextChanged ? "text-primary-content" : textColor}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Fullscreen */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-white/70 backdrop-blur-md transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      >
        <div className="flex items-center justify-center h-full">
          {/* Mobile Navigation Links */}
          <ul className="flex flex-col gap-8 font-bold text-primary-content text-3xl text-center">
            <li
              className={`transform transition-all duration-500 ease-out ${
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: isMobileMenuOpen ? "100ms" : "0ms" }}
            >
              <Link 
                href={`/`} 
                className={`block py-3 text-primary-content hover:text-green-600 transition-colors relative after:content-[''] after:absolute after:bottom-2 after:left-0 after:w-full after:h-1 after:bg-green-600 after:origin-left after:transition-transform after:duration-300 ${
                  pathname === "/" 
                    ? "after:scale-x-100" 
                    : "after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                HOME
              </Link>
            </li>
            <li
              className={`transform transition-all duration-500 ease-out ${
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: isMobileMenuOpen ? "200ms" : "0ms" }}
            >
              <Link 
                href={`/umkm`} 
                className={`block py-3 text-primary-content hover:text-green-600 transition-colors relative after:content-[''] after:absolute after:bottom-2 after:left-0 after:w-full after:h-1 after:bg-green-600 after:origin-left after:transition-transform after:duration-300 ${
                  pathname.startsWith("/umkm") 
                    ? "after:scale-x-100" 
                    : "after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                UMKM
              </Link>
            </li>
            <li
              className={`transform transition-all duration-500 ease-out ${
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
            >
              <Link 
                href={`/about`} 
                className={`block py-3 text-primary-content hover:text-green-600 transition-colors relative after:content-[''] after:absolute after:bottom-2 after:left-0 after:w-full after:h-1 after:bg-green-600 after:origin-left after:transition-transform after:duration-300 ${
                  pathname.startsWith("/about") 
                    ? "after:scale-x-100" 
                    : "after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                ABOUT US
              </Link>
            </li>
          </ul>
        </div>
      </div>

    </>
  );
}
