import { UmkmCategory } from "@/types/umkm";
import Image from "next/image";

type CategoryProps = {
  selectedSubCategory: string;
  setSelectedSubCategory: (value: UmkmCategory | "all") => void;
  subCat: {
    value: string;
    label: string;
    image: string;
  };
  setShowAll: (value: boolean) => void;
};

export default function Category({ selectedSubCategory, setSelectedSubCategory, subCat, setShowAll }: CategoryProps) {
  return (
    <button
      className={`rounded-full transform transition-all hover:scale-108 ${
        selectedSubCategory === subCat.value
          ? "bg-primary text-white shadow-lg scale-108"
          : "bg-primary-muted text-black hover:bg-primary"
      }`}
      onClick={() => {
        setSelectedSubCategory(subCat.value as UmkmCategory | "all");
        setShowAll(false); 
      }}
    >
      {/* Image */}
      <div className="relative w-25 h-25 rounded-full overflow-hidden bg-transparent">
        {subCat.image ? (
          <Image src={subCat.image} alt={subCat.label} fill className="object-cover" />
        ) : (
          <div className="w-25 h-25 flex  justify-center items-center ">
            <span className="text-sm font-semibold px-2 text-foreground">{subCat.label}</span>
          </div>
        )}
      </div>
    </button>
  );
}
