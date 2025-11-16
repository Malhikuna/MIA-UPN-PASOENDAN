# MIA - UPN PASOENDAN

Dokumentasi proyek web front-end Next.js + Prisma untuk menampilkan data UMKM lokal.

## Ringkasan

Proyek ini merupakan aplikasi Next.js (App Router) yang menggunakan React dan Prisma untuk model data. Aplikasi menampilkan daftar UMKM, detail tiap UMKM, peta lokasi (Leaflet), serta daftar produk. Terdapat juga seed dan migrasi Prisma untuk inisialisasi database.

Teknologi utama:

- Next.js 15 (App Router)
- React 19
- Prisma 6
- Tailwind CSS + DaisyUI
- Leaflet untuk peta
- Zustand untuk state management (store)
- GSAP untuk animasi

## Fitur

- Daftar UMKM dengan pengelompokan kategori
- Detail UMKM (profil, galeri gambar, produk, ulasan)
- Peta lokasi dan panel info
- Paginasi dan filter
- Seed data contoh (file `prisma/seed.ts` dan `data/umkm.json`)

## Persiapan & Instalasi (lokal)

1. Clone repository dan masuk ke folder:

```bash
git clone <repo-url>
cd MIA-UPN-PASOENDAN
```

2. Pasang dependensi (direkomendasikan pnpm):

```bash
pnpm install
```

3. Buat file environment (contoh minimal):

```env
# .env
DATABASE_URL="postgresql://user:pass@localhost:5432/dbname?schema=public"
```

Untuk development, Anda bisa menggunakan Postgres lokal atau provider serverless seperti Neon (paket `@neondatabase/serverless` sudah ada di dependency).

4. Generate Prisma Client dan jalankan migrasi/seed (opsional jika migrasi sudah ada):

```bash
pnpm prisma generate
pnpm prisma migrate dev    # untuk environment development
pnpm prisma db seed        # menjalankan script seed yang ada
```

Catatan: terdapat script `db:seed` di `package.json` yang menjalankan `npx prisma generate && npx prisma db seed`.

## Script penting (dari package.json)

- `pnpm dev` — jalankan development server Next.js (menggunakan turbopack)
- `pnpm build` — jalankan `prisma generate` lalu build Next.js untuk produksi
- `pnpm start` — jalankan server produksi
- `pnpm db:seed` — generate client dan jalankan seed DB

Jalankan dev server:

```bash
pnpm dev
```

Build untuk produksi:

```bash
pnpm build
pnpm start
```

## Struktur proyek (singkat)

- `app/` – folder App Router Next.js: halaman, API route, dan layout
  - `(root)/` – halaman utama dan subhalaman
  - `api/umkm/route.ts` – API route untuk UMKM (server)
- `components/` – tata letak dan UI components (Navbar, Footer, section, ui)
- `lib/prisma.ts` – helper untuk Prisma Client
- `prisma/schema.prisma` – definisi model database
- `prisma/seed.ts` – script seed untuk inisialisasi data
- `public/images/` – aset gambar
- `data/` – data statis / JSON (mis. `umkm.json`)
- `store/` dan `hooks/` – state management & custom hooks

Lebih detail: lihat folder `components/ui/detail` untuk komponen detail UMKM (galeri, review, product card) dan `components/ui/map` untuk integrasi peta.

## Model Database (ringkasan dari `prisma/schema.prisma`)

- User: id (UUID), name, email (unique), password, relation ke Session
- Session: token session, userId, expires
- Umkm: id (UUID), name, address, mainCategory, subCategory, description, imageUrl (array), lat, lng, relation ke Product
- Product: id (UUID), name, description, price, relation ke Umkm

Generator Prisma menaruh client pada `app/generated/prisma/client` (lihat konfigurasi `prisma/schema.prisma`). Datasource menggunakan provider `postgresql` dan membaca `DATABASE_URL` dari environment.

## Catatan pengembangan

- Gunakan Node versi yang kompatibel dengan Next.js 15 dan React 19.
- Tailwind sudah dikonfigurasi (lihat `postcss.config.mjs` dan `tailwind.config` bila ada).
- Untuk peta, Leaflet dan tipe `@types/leaflet` termasuk di devDependencies.

## Menjalankan test / quality checks

Proyek ini tidak memiliki test otomatis di repo (tidak ditemukan folder `test` atau script `test` di `package.json`). Untuk quick lint/build check:

```bash
pnpm build   # menjalankan prisma generate lalu produksi build
```

## Contributing

- Buat branch baru untuk fitur atau perbaikan: `git checkout -b feature/your-feature`
- Buka PR ke branch utama setelah selesai.

## Lisensi

Lisensi tidak disebutkan di repository; tambahkan file `LICENSE` jika perlu.

## Kontak / Referensi

- Jika butuh bantuan setup environment (mis. database), sertakan detail provider DB (host, port, schema) atau gunakan Docker/Postgres lokal.

---

Jika Anda ingin, saya dapat:

- menambahkan file `.env.example` otomatis;
- menambahkan badge CI / deployment;
- membuat instruksi Docker untuk Postgres.

Beritahu mana yang Anda inginkan berikutnya.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
