import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 flex flex-col justify-center items-center">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 ">
          Temukan dan Dukung UMKM Terdekat
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          CariKita menjadi jembatan antara pelaku UMKM dan masyarakat. Kami
          membantu usaha kecil agar lebih terlihat dan dikenal luas. Setiap
          produk lokal memiliki cerita dan nilai yang berarti. Bersama, kita
          bangun ekosistem UMKM yang kuat dan berkelanjutan.
        </p>
      </div>

      <div className="mb-10">
        <Image
          src="/images/footer/about2.webp"
          alt=""
          width={800}
          height={500}
          className="object-cover"
        />
      </div>

      {/* Accordion Section */}
      <div className="flex flex-col md:w-[60%]">
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold">Apa itu CariKita?</div>
          <div className="collapse-content text-sm">
            CariKita adalah platform digital yang membantu masyarakat menemukan
            berbagai UMKM lokal di seluruh Indonesia. Melalui CariKita, pelaku
            usaha dapat mempromosikan produk mereka agar lebih mudah dikenal dan
            dijangkau oleh pelanggan.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Siapa saja yang bisa bergabung di CariKita?
          </div>
          <div className="collapse-content text-sm">
            Semua pelaku UMKM, baik individu maupun kelompok usaha, dapat
            bergabung di CariKita. Kami terbuka untuk berbagai bidang usaha
            mulai dari kuliner, fashion, kerajinan, hingga jasa.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Apa manfaat bergabung di CariKita?
          </div>
          <div className="collapse-content text-sm">
            Dengan bergabung, usaha kamu bisa lebih dikenal masyarakat luas,
            meningkatkan peluang penjualan, dan membangun citra digital yang
            profesional. CariKita juga membantu menghubungkan pelaku UMKM dengan
            pelanggan potensial di seluruh Indonesia.
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
