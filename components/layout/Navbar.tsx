"use client";
import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import Image from 'next/image';
import { usePathname } from "next/navigation";
import Link from "next/link";

const navbarConfig = [
  { path: "/umkm", transparent: true, text: "black" },
  { path: "/", transparent: true, text: "white" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentConfig =
    navbarConfig.find((cfg) => pathname.startsWith(cfg.path)) ??
    { transparent: false, text: "black" };

  const baseClasses =
    "fixed left-0 top-0 w-full z-50 py-3 transition-all duration-300";

  const navClass = `
    ${baseClasses}
    ${
    isScrolled
      ? "glass shadow-md"
      : currentConfig.transparent
        ? "bg-transparent"
        : "bg-white"
  }
  `;

  const textColor =
    currentConfig.text === "white" ? "text-white" : "text-gray-800";

  return (
    <nav
      className={navClass}
    >
      {/*<Image
      src="/images/logo.jpg"
      alt="logo"
      width={50}
      height={50}
    />*/}
      <div className="container flex mx-auto justify-between items-center px-6 lg:px-12">
        <h1 className={`font-bold text-lg ${textColor}`}>CariKita</h1>
        <ul className={`flex gap-7 items-center ${textColor}`}>
          <li>
            <Link href={`/`}>
              Home
            </Link>
          </li>
          <li>
            <Link href={`/`}>
              About Us
            </Link>
          </li>
          <li>
            {/*<input type="search" className="w-100 h-10 bg-white rounded-full" />*/}
            <Input className={'flex-1 outline-none text-sm text-white'}/>
          </li>
        </ul>
      </div>
    </nav>
  );
}
