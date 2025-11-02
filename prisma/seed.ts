import { PrismaClient, Prisma } from "../app/generated/prisma/client";
const prisma = new PrismaClient();

const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://localhost:3000";

const umkmData: Prisma.UmkmCreateInput[] = [
  {
    name: "Nasi Goreng Pak Joko",
    address: "Jl. Nasi Goreng No.1",
    description: "Nasi goreng spesial dengan bumbu rahasia",
    imageUrl: [
      // `${IMAGE_BASE}/images/umkm/umkmWarung.jpg`,
      "/images/umkm/umkmWarung.jpg",
      "/images/nasgor1-2.jpg",
      "/images/nasgor1-3.jpg",
    ],
    mainCategory: "fnb",
    subCategory: "nasi-goreng",
    lat: -6.864548192578693,
    lng: 107.59258037945818,
  },
  {
    name: "Ayam Geprek Bensu",
    address: "Jl. Geprek No.2",
    description: "Ayam geprek dengan level pedas bisa request",
    imageUrl: [
      "/images/umkm/umkm1-gallery3.jpg",
      "/images/geprek1-2.jpg",
      "/images/geprek1-3.jpg",
    ],
    mainCategory: "fnb",
    subCategory: "ayam-geprek",
    lat: -6.864757563617405,
    lng: 107.59358672918238,
  },
  {
    name: "Bakso Mas Adi",
    address: "Jl. Bakso No.3",
    description: "Bakso sapi asli dengan kuah yang gurih",
    imageUrl: [
      "/images/bakso1.jpg",
      "/images/bakso1-2.jpg",
      "/images/bakso1-3.jpg",
    ],
    mainCategory: "fnb",
    subCategory: "bakso",
    lat: -6.864548192578693,
    lng: 107.5933793366201,
  },
  {
    name: "Sate & Soto Pak Haji",
    address: "Jl. Sate No.4",
    description: "Sate ayam dan soto ayam yang lezat",
    imageUrl: [
      "/images/sate1.jpg",
      "/images/sate1-2.jpg",
      "/images/sate1-3.jpg",
    ],
    mainCategory: "fnb",
    subCategory: "soto-sate",
    lat: -6.864648144183463,
    lng: 107.59364060772961,
  },
  {
    name: "Jahit Pakaian Berkah",
    address: "Jl. Jahit No.1",
    description: "Jasa jahit pakaian profesional",
    imageUrl: [
      "/images/jahit1.jpg",
      "/images/jahit1-2.jpg",
      "/images/jahit1-3.jpg",
    ],
    mainCategory: "jasa",
    subCategory: "jahit-pakaian",
    lat: -6.8647892179892365,
    lng: 107.593790897819,
  },
  {
    name: "Kembang Laundry",
    address:
      "Jl. Kapten Abdul Hamid No.85, Hegarmanah, Kec. Cidadap, Kota Bandung, Jawa Barat 40141",
    description: "Jasa laundry",
    imageUrl: [
      "/images/jahit1.jpg",
      "/images/jahit1-2.jpg",
      "/images/jahit1-3.jpg",
    ],
    mainCategory: "jasa",
    subCategory: "jahit-pakaian",
    lat: -6.8654549492783055,
    lng: 107.59621481929396,
  },
  {
    name: "Bakso Mas Bandi",
    address:
      "JL. Kapten Hamid Panorama III, No. 65/1672, Setiabudi, Hegarmanah, Kec. Cidadap, Kota Bandung, Jawa Barat 40141",
    description: "Bakso dengan cita rasa khas dan kuah gurih",
    imageUrl: [
      "/images/jahit1.jpg",
      "/images/jahit1-2.jpg",
      "/images/jahit1-3.jpg",
    ],
    mainCategory: "fnb",
    subCategory: "bakso",
    lat: -6.8655315098447405,
    lng: 107.59609143768147,
  },
  {
    name: "RM Panorama",
    address:
      "Jl. Kapten Abdul Hamid No.3, Hegarmanah, Kec. Cidadap, Kota Bandung, Jawa Barat 40141",
    description: "Rumah makan masakan padang panorama",
    imageUrl: [
      "/images/jahit1.jpg",
      "/images/jahit1-2.jpg",
      "/images/jahit1-3.jpg",
    ],
    mainCategory: "fnb",
    subCategory: "padang",
    lat: -6.864977233710673,
    lng: 107.59446126742243,
  },
  {
    name: "Warung Imas",
    address:
      "Jl. Kapten Abdul Hamid No.53, Hegarmanah, Kec. Cidadap, Kota Bandung, Jawa Barat 40141",
    description: "Warung kelontong sederhana dan ramah",
    imageUrl: [
      "/images/umkm/umkm1-gallery3.jpg",
      "/images/geprek1-2.jpg",
      "/images/geprek1-3.jpg",
    ],
    mainCategory: "fnb",
    subCategory: "kelontong",
    lat: -6.86589225063404,
    lng: 107.59640015606905,
  },
  {
    name: "Warnas 94",
    address:
      "Jl. Kapten Abdul Hamid No.87, Ledeng, Kec. Cidadap, Kota Bandung, Jawa Barat 40141",
    description: "Warung Nasi legendaris sejak 1994",
    imageUrl: [
      "/images/umkm/umkm1-gallery3.jpg",
      "/images/geprek1-2.jpg",
      "/images/geprek1-3.jpg",
    ],
    mainCategory: "fnb",
    subCategory: "warung-nasi",
    lat: -6.865886508202573,
    lng: 107.59668356792778,
  },
  {
    name: "Sate Ayam Kambing Cak Kumis 1",
    address:
      "Panorama II, Jl. Kapten Abdul Hamid No.36, Hegarmanah, Cidadap, Bandung City, West Java 40141",
    description: "Menjual sate ayam dan kambing yang lezat",
    imageUrl: [
      "/images/umkm/umkm1-gallery3.jpg",
      "/images/geprek1-2.jpg",
      "/images/geprek1-3.jpg",
    ],
    mainCategory: "fnb",
    subCategory: "sate",
    lat: -6.8651836333695435,
    lng: 107.59570145908933,
  },
  {
    name: "Salon Berkah",
    address:
      "4HPR+5X9, Jl. Gegerkalong Girang, Gegerkalong, Kec. Sukasari, Kota Bandung, Jawa Barat 40153",
    description: "Salon kecantikan dan perawatan rambut",
    imageUrl: [
      "/images/umkm/umkm1-gallery3.jpg",
      "/images/geprek1-2.jpg",
      "/images/geprek1-3.jpg",
    ],
    mainCategory: "jasa",
    subCategory: "salon",
    lat: -6.864587611952869,
    lng: 107.59245231383,
  },
  {
    name: "Mie Ayam dan Baso Bakar Panorama",
    address:
      "4HMW+V2F, Hegarmanah, Cidadap, Bandung City, West Java 40141",
    description: "Mie ayam dan bakso bakar khas Bandung",
    imageUrl: [
      "/images/umkm/umkm1-gallery3.jpg",
      "/images/geprek1-2.jpg",
      "/images/geprek1-3.jpg",
    ],
    mainCategory: "fnb",
    subCategory: "mie-ayam",
    lat: -6.865297806129939,
    lng: 107.59505585950293,
  },
  {
    name: "Nasi Kuning dan Nasi Uduk Teh Nyai",
    address:
      "Jl. Kapten Abdul Hamid Panorama II, Hegarmanah, Kec. Cidadap, Kota Bandung, Jawa Barat 40141",
    description: "Nasi kuning dan nasi uduk khas rumahan",
    imageUrl: [
      "/images/umkm/umkm1-gallery3.jpg",
      "/images/geprek1-2.jpg",
      "/images/geprek1-3.jpg",
    ],
    mainCategory: "fnb",
    subCategory: "nasi-uduk",
    lat: -6.865353728651366,
    lng: 107.59523556750656,
  },
  {
    name: "Jahit Pakaian Berkah",
    address: "Jl. Jahit No.1",
    description: "Jasa jahit pakaian profesional",
    imageUrl: [
      "/images/jahit1.jpg",
      "/images/jahit1-2.jpg",
      "/images/jahit1-3.jpg",
    ],
    mainCategory: "jasa",
    subCategory: "jahit-pakaian",
    lat: -6.86556676676889,
    lng: 107.59614885967902
  },
  {
    name: "Chicken Cobek Berkah",
    address: "Jl. Jahit No.1",
    description: "Ayam geprek sambal cobek khas rumahan",
    imageUrl: [
      "/images/jahit1.jpg",
      "/images/jahit1-2.jpg",
      "/images/jahit1-3.jpg",
    ],
    mainCategory: "fnb",
    subCategory: "ayam-cobek",
    lat: -6.865154719934496,
    lng: 107.59423598147809,
  },
  {
    name: "Daang Food & Drink",
    address:
      "Jl. Kapten Abdul Hamid, Hegarmanah, Kec. Cidadap, Kota Bandung, Jawa Barat 40141",
    description: "Tempat makan dan nongkrong kekinian",
    imageUrl: [
      "/images/jahit1.jpg",
      "/images/jahit1-2.jpg",
      "/images/jahit1-3.jpg",
    ],
    mainCategory: "fnb",
    subCategory: "cafe",
    lat: -6.86520398502498,
    lng: 107.59443446494434,
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
