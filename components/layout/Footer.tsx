import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-neutral-900 text-white py-16 px-8 md:px-12">
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
            Kami hadir untuk menjadi jembatan antara pelaku UMKM dan masyarakat
            luas. Dengan menampilkan berbagai usaha lokal dari seluruh penjuru
            negeri, kami ingin menumbuhkan semangat dukung produk dalam negeri
            serta memperkuat ekonomi masyarakat. Setiap UMKM memiliki cerita dan
            perjuangan, dan kami ingin membantu mereka agar lebih dikenal serta
            dihargai melalui teknologi dan kolaborasi digital.
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
