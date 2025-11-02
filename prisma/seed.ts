import { PrismaClient, Prisma } from "@/app/generated/prisma/client";
const prisma = new PrismaClient();

const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://localhost:3000";

const umkmData: Prisma.UmkmCreateInput[] = [
  {
    name: "MAB Copy Shop",
    address:
      "Gg. H. Ridho No.56, Gegerkalong, Kec. Sukasari, Kota Bandung, Jawa Barat 40153",
    description: "toko fotokopi",
    imageUrl: [
      "/images/umkm/jasa/fotokopi/mab-copyshop-1.webp",
      "/images/umkm/jasa/fotokopi/mab-copyshop-2.webp",
      "/images/umkm/jasa/fotokopi/mab-copyshop-3.webp",
    ],
    mainCategory: "jasa",
    subCategory: "fotokopi",
    lat: -6.867196345788327,
    lng: 107.59219021165673,
  },
  {
    name: "Satria Fotocopy",
    address:
      "Jl. Gegerkalong Girang No.49, Gegerkalong, Kec. Sukasari, Kota Bandung, Jawa Barat 40154",
    description: "Tempat untuk print dan fotokopi",
    whatsApp: "082119398944",
    imageUrl: [
      "/images/umkm/jasa/fotokopi/satria-fotocopy-1.webp",
      "/images/umkm/jasa/fotokopi/satria-fotocopy-2.webp",
      "/images/umkm/jasa/fotokopi/satria-fotocopy-3.webp",
    ],
    mainCategory: "jasa",
    subCategory: "fotokopi",
    lat: -6.86420114071302,
    lng: 107.59112852235272,
  },
  {
    name: "Kembang Laundry",
    address:
      "Jl. Kapten Abdul Hamid No.85, Hegarmanah, Kec. Cidadap, Kota Bandung, Jawa Barat 40141",
    description: "Jasa laundry",
    whatsApp: "081321114235",
    imageUrl: [
      // `${IMAGE_BASE}/images/umkm/umkmWarung.jpg`,
      "/images/umkm/jasa/laundry/laundry-1.webp",
      "/images/umkm/jasa/laundry/laundry-2.webp",
    ],
    mainCategory: "jasa",
    subCategory: "laundry",
    lat: -6.8654549492783055,
    lng: 107.59621481929396,
  },
  {
    name: "Sigma Barbershop",
    address:
      "Jl. Gegerkalong Tengah 7 Gang tembusan ke KPAD, Gegerkalong, Kec. Sukasari, Kota Bandung, Jawa Barat 40153",
    description: "Tempat untuk potong rambut khus orang sigma",
    whatsApp: "085711010406",
    imageUrl: [
      "/images/umkm/jasa/barbershop/sigma-barbershop-1.webp",
      "/images/umkm/jasa/barbershop/sigma-barbershop-2.webp",
    ],
    mainCategory: "jasa",
    subCategory: "barbershop",
    lat: -6.866962847159214,
    lng: 107.59145218219896,
  },
  {
    name: "Tako Takoyaki",
    address:
      "Jl. Gegerkalong Girang No.31, Gegerkalong, Kec. Sukasari, Kota Bandung, Jawa Barat 40153",
    description: "Jajanan takoyaki",
    whatsApp: "085224409982",
    imageUrl: [
      "/images/umkm/fnb/japanese-food/tako-takoyaki-1.webp",
      "/images/umkm/fnb/japanese-food/tako-takoyaki-2.webp",
      "/images/umkm/fnb/japanese-food/tako-takoyaki-3.webp",
    ],
    mainCategory: "fnb",
    subCategory: "japanese-food",
    lat: -6.864459678413984,
    lng: 107.59207164229896,
  },
  {
    name: "KBR 86",
    address:
      "Pujasera, Jl. Gegerkalong Tengah Gg. H. Ridho, Gegerkalong, Kec. Sukasari, Kota Bandung, Jawa Barat 40153",
    description: "Tempat makan dan nongkrong kekinian",
    whatsApp: "083169203544",
    imageUrl: [
      "/images/umkm/fnb/soto/kbr84-1.webp",
      "/images/umkm/fnb/soto/kbr84-2.webp",
      "/images/umkm/fnb/soto/kbr84-3.webp",
    ],
    mainCategory: "fnb",
    subCategory: "soto-sate",
    lat: -6.867051469983948,
    lng: 107.59219560575777,
  },
  {
    name: "Warung Nasi Padang 88 Uni Angel",
    address:
      "Jl. Gegerkalong Girang, Isola, Kec. Sukasari, Kota Bandung, Jawa Barat 40154",
    description: "Masakan ala padang",
    imageUrl: [
      "/images/umkm/fnb/nasi-padang/nasdang-88-1.webp",
      "/images/umkm/fnb/nasi-padang/nasdang-88-2.webp",
      "/images/umkm/fnb/nasi-padang/nasdang-88-3.webp",
    ],
    mainCategory: "fnb",
    subCategory: "nasdang",
    lat: -6.86429392018968,
    lng: 107.59215769325377,
  },
  {
    name: "Nasi Goreng Rono",
    address:
      "Jl. Kapten Abdul Hamid No.35, Hegarmanah, Kec. Cidadap, Kota Bandung, Jawa Barat 40141",
    description: "Tempat makan nasi goreng berbagai varian",
    whatsApp: "087730300304",
    imageUrl: [
      "/images/umkm/fnb/nasi-goreng/nasi-goreng-rono-1.webp",
      "/images/umkm/fnb/nasi-goreng/nasi-goreng-rono-2.webp",
      "/images/umkm/fnb/nasi-goreng/nasi-goreng-rono-3.webp",
    ],
    mainCategory: "fnb",
    subCategory: "nasi-goreng",
    lat: -6.865267827359692,
    lng: 107.595791853936,
  },
  {
    name: "Daang Food & Drink",
    address:
      "Jl. Kapten Abdul Hamid, Hegarmanah, Kec. Cidadap, Kota Bandung, Jawa Barat 40141",
    description: "Tempat makan dan nongkrong kekinian",
    whatsApp: "085294135424",
    imageUrl: [
      "/images/umkm/fnb/coffee/daang-1.webp",
      "/images/umkm/fnb/coffee/daang-2.webp",
      "/images/umkm/fnb/coffee/daang-3.webp",
    ],
    mainCategory: "fnb",
    subCategory: "coffee",
    lat: -6.86520398502498,
    lng: 107.59443446494434,
  },
  {
    name: "Warnas 94",
    address:
      "Jl. Kapten Abdul Hamid No.87, Ledeng, Kec. Cidadap, Kota Bandung, Jawa Barat 40141",
    description: "Warung Nasi legendaris sejak 1994",
    imageUrl: [
      "/images/umkm/fnb/warnas/warnas-94-1.webp",
      "/images/umkm/fnb/warnas/warnas-94-2.webp",
      "/images/umkm/fnb/warnas/warnas-94-3.webp",
    ],
    mainCategory: "fnb",
    subCategory: "warnas",
    lat: -6.865886508202573,
    lng: 107.59668356792778,
  },
  {
    name: "Toko Panorama 54",
    address:
      "Jl. Kapten Abdul Hamid No.35, Hegarmanah, Kec. Cidadap, Kota Bandung, Jawa Barat 40141",
    description: "Toko kenlontong jln panorama",
    whatsApp: "089538429008",
    imageUrl: [
      "/images/umkm/fnb/kelontong/toko-panorama54-1.webp",
      "/images/umkm/fnb/kelontong/toko-panorama54-2.webp",
      "/images/umkm/fnb/kelontong/toko-panorama54-3.webp",
    ],
    mainCategory: "fnb",
    subCategory: "toko-kelontong",
    lat: -6.865317872223803,
    lng: 107.59574234776755,
  },
];

export async function main() {
  console.log("🌱 Mulai seeding data UMKM...");

  for (const u of umkmData) {
    await prisma.umkm.create({ data: u });
  }

  console.log("✅ Seeding selesai!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
