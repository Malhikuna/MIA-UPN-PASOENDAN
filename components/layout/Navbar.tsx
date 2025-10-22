"use client";
import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navbarConfig = [
  { path: "/umkm", transparent: true, text: "black" },
  { path: "/", transparent: true, text: "white" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTextchanged, setIsTextchanged] = useState(false);

  const currentConfig = navbarConfig.find((cfg) => pathname.startsWith(cfg.path)) ?? {
    transparent: false,
    text: "black",
  };

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.9;

      if(pathname.startsWith('/')) setIsTextchanged(window.scrollY > threshold)

      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsScrolled(false);
  }, [pathname]);

  const baseClasses = "fixed left-0 top-0 w-full z-50 py-3 transition-all duration-300";

  const navClass = `
    ${baseClasses}
    ${isScrolled 
      ?  (pathname.startsWith('/') ? "text-primary-content glass shadow-md" : "glass shadow-md") : currentConfig.transparent ? "bg-transparent" : "bg-white"}
  `;

  const textColor = currentConfig.text === "white" ? "text-white" : "text-gray-800";

  const isHome = pathname === '/';
  const logoSrc = isHome
    ? isTextchanged
      ? '/images/CariKitaBlack.png'
      : '/images/CariKitaWhite.png'
    : '/images/CariKitaBlack.png';

  return (
    <nav className={navClass}>
      <div className="container flex mx-auto justify-between items-center px-6 lg:px-12">
        <Image
          src={logoSrc}
          alt="CariKita"
          height={100}
          width={100}
        />
        <ul className={`flex gap-7 items-center font-semibold ${isTextchanged ? 'text-primary-content' : textColor}`}>
          <li>
            <Link href={`/`}>Home</Link>
          </li>
          <li>
            <Link href={`/`}>About Us</Link>
          </li>
          <li>
            {/*<input type="search" className="w-100 h-10 bg-white rounded-full" />*/}
            <Input className={"flex-1 outline-none text-sm text-white"} />
          </li>
        </ul>
      </div>
    </nav>
  );
}
