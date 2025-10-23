import { useMemo } from 'react';
import { UmkmItem } from '@/types/umkm';

export function useUmkmFilter(
  data: UmkmItem[],
  mainCategory: string,
  subCategory: string,
  searchQuery: string
) {
  return useMemo(() => {
    return data.filter((umkm) => {
      const matchMainCategory = umkm.mainCategory === mainCategory;
      const matchSubCategory = subCategory === "all" || umkm.category === subCategory;
      const matchSearch =
        umkm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        umkm.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        umkm.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchMainCategory && matchSubCategory && matchSearch;
    });
  }, [data, mainCategory, subCategory, searchQuery]);
}