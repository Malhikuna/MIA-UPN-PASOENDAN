import { useUmkmStore } from "@/store/useUmkmStore";
import { UmkmItem } from "@/types/umkm";
import { useEffect, useState } from "react";

export function useUmkm() {
  const { selectedMainCategory } = useUmkmStore();
  const [umkmList, setUmkmList] = useState<UmkmItem[]>([]);

  useEffect(() => {
    async function fetchUmkm() {
      try {
        const response = await fetch(`/api/umkm?mainCategory=${selectedMainCategory}`);
        
        if (!response.ok) {
          console.error("API response not OK:", response.status, response.statusText);
          const text = await response.text();
          console.error("Response body:", text);
          return;
        }
        
        const dataUmkm = await response.json();
        setUmkmList(dataUmkm);
      } catch (error) {
        console.error("Error fetching UMKM:", error);
      }
    }

    fetchUmkm();
  }, [selectedMainCategory]);

  return umkmList;
}
