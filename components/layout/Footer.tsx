import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ArrowDownRight, Copyright } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-base-100 h-auto overflow rounded-tl-3xl rounded-tr-3xl">
      <div className="container mx-auto flex flex-col justify-between gap-15 pt-15 pb-10 px-6 lg:px-12">
        {/* About */}
        <section className="flex flex-col gap-5">
          <h1>About Us</h1>

          <p className="text-3xl">
            Kami ingin setiap usaha lokal bisa tersenyum. CariKita menghubungkan kamu dengan UMKM terdekat, agar
            dukungan kecilmu berarti besar bagi mereka.
          </p>
        </section>

        {/* CTA */}
        <div className="justify-end flex items-center gap-5 mr-10">
          <span>Learn More</span>
          <button className="cursor-pointer flex justify-center items-center rounded-full ring-1 w-15 h-15 hover:ring-blue-200 transition">
            <ArrowDownRight className="rotate-270 animate-float" />
          </button>
        </div>

        {/* Footer Images */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative col-span-2 w-full lg:h-90 2xl:h-100 aspect-[3/2]">
            <Image
              src="/images/footer/footer1.png"
              alt="Penjual di warung"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>
          <div className="relative w-full lg:h-90 2xl:h-100 aspect-[3/2]">
            <Image
              src="/images/footer/footer2.png"
              alt="Barista di kafe"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="relative w-full lg:h-90 2xl:h-100 aspect-[3/2]">
            <Image
              src="/images/footer/footer3.png"
              alt="Penjahit dengan kain batik"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </section>

        <h1 className="text-3xl text-center tracking-tight">
          Kita Cari, Kita Dukung
          <br />
          Bareng
        </h1>

        <Image src="/images/CariKita.png" alt="CariKita" height={250} width={250} className="mx-auto" />

        {/* Footer Links */}
        <section className="flex justify-center gap-20 text-center">
          <div className="flex flex-col gap-5">
            <h1 className="font-bold">Page</h1>
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/" className="hover:underline">
              About
            </Link>
          </div>

          <div className="flex flex-col gap-5">
            <h1 className="font-bold">Social</h1>
            <Link href="/" className="hover:underline">
              Instagram
            </Link>
            <Link href="/" className="hover:underline">
              Tiktok
            </Link>
            <Link href="/" className="hover:underline">
              Facebook
            </Link>
          </div>
        </section>

        {/* Copyright */}
        <section className="flex justify-between">
          <p className="flex items-center gap-2">
            <Copyright size={15} /> 2025 CariKita. All right reserve.
          </p>
          <p>Cari Kita, Kita Dukung</p>
        </section>
      </div>
    </footer>
  );
}
