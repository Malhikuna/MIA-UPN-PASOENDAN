import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 flex flex-col justify-center items-center">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Calling All UMKMs
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non magni in
          voluptatem dolor delectus rem ipsam dolores commodi cupiditate quaerat
          ducimus iste dolorum, nam, saepe deserunt veritatis? Quis, dolorem
          minima!
        </p>
      </div>

    <div className="mb-10">
      <Image src="/images/footer/about2.webp" alt="" width={800} height={500} className="object-cover" />
    </div>

      {/* Accordion Section */}
      <div className="flex flex-col md:w-[60%]">
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold">
            Apa itu CariKita?
          </div>
          <div className="collapse-content text-sm">
            CariKita adalah platform yang menghubungkan kamu dengan UMKM terdekat, agar dukungan kecilmu berarti besar bagi mereka.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Bagaimana saya bisa berpartisipasi?
          </div>
          <div className="collapse-content text-sm">
            Anda bisa berpartisipasi dengan menjadi mitra CariKita atau menjadi donatur.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Bagaimana saya bisa mendukung UMKM?
          </div>
          <div className="collapse-content text-sm">
              Anda bisa mendukung UMKM dengan menjadi mitra CariKita atau menjadi donatur.
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
