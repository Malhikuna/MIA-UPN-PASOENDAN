import ToggleSwitch from "@/components/ui/ToggleSwitchProps";
import Category from "@/components/ui/Category";

interface CategorySectionProps {
  selectedMainCategory: string;
  selectedSubCategory: string;
  onMainCategoryChange: (value: string) => void;
  onSubCategoryChange: (value: string) => void;
  setShowAll: (value: boolean) => void;
  mainCategories: { value: string; label: string }[];
  currentSubCategories: any[];
}

export default function CategorySection({
  selectedMainCategory,
  selectedSubCategory,
  onMainCategoryChange,
  onSubCategoryChange,
  setShowAll,
  mainCategories,
  currentSubCategories,
}: CategorySectionProps) {
  return (
    <div className="container mx-auto md:py-10 px-12">
      <div className="flex flex-col gap-4 mb-5">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-4xl">Pilih Kategori</h1>
          <ToggleSwitch
            options={mainCategories}
            selected={selectedMainCategory}
            onChange={onMainCategoryChange}
          />
        </div>
        <p className="md:w-[513px]">
          Jelajahi berbagai UMKM terdekat dari kuliner, jasa, hingga produk lokal yang siap memenuhi kebutuhan Anda.
        </p>
      </div>

      <div className="flex flex-wrap gap-6">
        {currentSubCategories.map((subCat) => (
          <div className="flex flex-col items-center gap-3" key={subCat.value}>
            <Category
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={onSubCategoryChange}
              subCat={subCat}
              setShowAll={setShowAll}
            />
            <span className="font-semibold text-sm text-center">{subCat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}