// "use client";

// import Link from "next/link";
// import React from "react";
// import Image from "next/image";
// import { ArrowDownRight, Copyright } from "lucide-react";
// import {useTheme} from "@/hooks/useTheme";

// export default function Footer() {
//   useTheme();
//   return (
//     <footer className="bg-secondary text-base-100 h-auto overflow rounded-tl-3xl rounded-tr-3xl">
//       <div className="container mx-auto flex flex-col justify-between gap-15 pt-15 pb-1 md:pb-10 px-6 lg:px-12">

//         {/* Footer Images */}
//         {/* <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="relative col-span-2 w-full lg:h-90 2xl:h-100 aspect-[3/2]">
//             <Image
//               src="/images/footer/footer1.png"
//               alt="Penjual di warung"
//               fill
//               className="object-cover border-1 border-white"
//               sizes="(max-width: 768px) 100vw, 33vw"
//               priority
//             />
//           </div>
//           <div className="relative w-full h-70 lg:h-90 2xl:h-100 aspect-[3/2]">
//             <Image
//               src="/images/footer/footer2.png"
//               alt="Barista di kafe"
//               fill
//               className="object-cover border-1 border-white"
//               sizes="(max-width: 768px) 100vw, 33vw"
//             />
//           </div>
//           <div className="relative w-full h-70 lg:h-90 2xl:h-100 aspect-[3/2]">
//             <Image
//               src="/images/footer/footer3.png"
//               alt="Penjahit dengan kain batik"
//               fill
//               className="object-cover border-1 border-white"
//               sizes="(max-width: 768px) 100vw, 33vw"
//             />
//           </div>
//         </section> */}

//         <h1 className="text-3xl text-center tracking-tight">
//           Kita Cari, Kita Dukung
//           <br />
//           Bareng
//         </h1>

//         <Image src="/images/CariKitaWhite.png" alt="CariKita" height={250} width={250} className="mx-auto" />

//         {/* Footer Links */}
//         <section className="flex flex-col md:flex-row justify-center gap-10 md:gap-20 text-center">
//           <div className="flex flex-col gap-5">
//             <h1 className="font-bold text-2xl">Page</h1>
//             <Link href="/" className="hover:underline">
//               Home
//             </Link>
//             <Link href="/" className="hover:underline">
//               About
//             </Link>
//           </div>

//           <div className="flex flex-col gap-5">
//             <h1 className="font-bold text-2xl">Social</h1>
//             <Link href="/" className="hover:underline">
//               Instagram
//             </Link>
//             <Link href="/" className="hover:underline">
//               Tiktok
//             </Link>
//             <Link href="/" className="hover:underline">
//               Facebook
//             </Link>
//           </div>
//         </section>

//         {/* Copyright */}
//         <section className="flex justify-between">
//           <p className="text-sm md:text-base flex items-center gap-2">
//             <Copyright size={15} /> 2025 CariKita. All right reserve.
//           </p>
//           <p className="text-sm md:text-base">Kita Cari, Kita Dukung</p>
//         </section>
//       </div>
//     </footer>
//   );
// }

import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Linkedin, href: "#", label: "Pinterest" },
  ];

  return (
    <footer className="bg-neutral-900 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Social Media Icons */}
        <div className="flex justify-center gap-8 mb-12">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="hover:opacity-70 transition-opacity"
              >
                <Icon size={32} className="text-white" />
              </a>
            );
          })}
        </div>

        {/* Description Text */}
        <div className="text-center mb-12">
          <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            obcaecati id facilis consequatur deserunt eius beatae voluptatibus
            explicabo est sed, delectus, sequi dicta perspiciatis praesentium?
            Quaerat vero soluta blanditiis tenetur quo similique sit aut quis
            omnis nulla molestiae nihil rerum laborum numquam ab, corporis
            beatae quia nisi illum praesentium veritatis.
          </p>
        </div>

        {/* Logo */}
        <div className="text-center mb-12">
          {/* <h2 className="text-5xl font-bold italic text-white tracking-wide">
            CariKita
          </h2> */}
          <Image
            src="/images/CariKitaWhite.png"
            alt="CariKita"
            height={250}
            width={250}
            className="mx-auto"
          />
        </div>

        {/* Location and Currency */}
        <div className="text-center border-t border-neutral-700 pt-8">
          <p className="text-neutral-400 text-sm">
            2025 CariKita. All right reserve.
          </p>
        </div>
      </div>
    </footer>
  );
}
