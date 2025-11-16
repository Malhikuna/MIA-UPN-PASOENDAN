import { useMemo } from "react";
import { UmkmItem } from "@/types/umkm";

export function useUmkmFilter(data: UmkmItem[], subCategory: string, searchQuery: string) {
  return useMemo(() => {
    return data.filter((umkm) => {
      const matchSubCategory = subCategory === "all" || umkm.subCategory === subCategory;
      const matchSearch =
        umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        umkm.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        umkm.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchSubCategory && matchSearch;
    });
  }, [data, subCategory, searchQuery]);
}
