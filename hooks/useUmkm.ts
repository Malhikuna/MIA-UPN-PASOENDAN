import { useUmkmStore } from "@/store/useUmkmStore";
import { UmkmItem } from "@/types/umkm";
import { useEffect, useState } from "react";

export function useUmkm() {
  const { selectedMainCategory } = useUmkmStore();
  const [umkmList, setUmkmList] = useState<UmkmItem[]>([]);

  useEffect(() => {
    async function fetchUmkm() {
      const response = await fetch(`/api/umkm?mainCategory=${selectedMainCategory}`);
      const dataUmkm = await response.json();
      setUmkmList(dataUmkm);
    }

    fetchUmkm();
  }, [selectedMainCategory]);

  return umkmList;
}
