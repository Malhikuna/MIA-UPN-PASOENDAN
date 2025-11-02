"use client";
import React, { useEffect, useRef, useState } from "react";
import Input from "../ui/Input";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useUmkmStore } from "@/store/useUmkmStore";

const navbarConfig = [
  { path: "/umkm", transparent: true, text: "black" },
  { path: "/", transparent: true, text: "white" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTextChanged, setIsTextChanged] = useState(false);
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

  console.log(focus);

  useEffect(() => {
    if (pathname.startsWith("/umkm") && focus === "true" && inputRef.current) {
      inputRef.current.focus();
      const url = new URL(window.location.href);
      url.searchParams.delete("focus");
      router.replace(url.pathname);
    }
  }, [pathname, focus, router]);

  return (
    <nav className={`flex justify-center h-16 ${navClass} ${pathname.startsWith("/umkm") || isTextChanged ? "bg-white/80 shadow-md" : ""}`}>
      <div className="container flex mx-auto justify-between items-center px-8 md:px-12">
        <Link href={`/`}>
          <Image src={logoSrc} alt="CariKita" height={100} width={100} />
        </Link>

        {pathname.startsWith("/umkm") ? (
          <Input
            ref={inputRef}
            placeholder="Cari nama UMKM"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none text-sm text-white"
            labelClassName="w-[40vw]"
            bgColor={`bg-black/20`}
          />
        ) : (
          <Link href={`/umkm?focus=true`} className="w-fit">
            <Input
              placeholder="Cari nama UMKM"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-sm text-white"
              labelClassName="w-[40vw]"
              bgColor={`${isTextChanged ? "bg-black/20" : 'bg-white/30'}`}
            />
          </Link>
        )}

        <ul
          className={`flex gap-7 items-center font-semibold ${isTextChanged ? "text-primary-content" : textColor}`}
        >
          <li>
            <Link href={`/`}>Home</Link>
          </li>
          <li>
            <Link href={`/umkm`}>Umkm</Link>
          </li>
          <li>
            <Link href={`/about`}>About Us</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
