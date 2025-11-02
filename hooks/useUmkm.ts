import { useUmkmStore } from "@/store/useUmkmStore";
import { UmkmItem } from "@/types/umkm";
import { useEffect, useState } from "react";

export const useUmkm = () => {
  const { selectedMainCategory } = useUmkmStore();
  const [umkmList, setUmkmList] = useState<UmkmItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUmkm() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/umkm?mainCategory=${selectedMainCategory}`);

        if (!response.ok) throw new Error("Gagal fetch data UMKM");

        const dataUmkm = await response.json();
        setUmkmList(dataUmkm);
      } catch (err: any) {
        console.error(err);
        setError("Gagal memuat data UMKM");
      } finally {
        setLoading(false);
      }
    }

    fetchUmkm();
  }, [selectedMainCategory]);

  return { umkmList, loading, error };
}

export const useUmkmById = (id?: string) => {
  const [umkm, setUmkm] = useState<UmkmItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchUmkmById() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/umkm/${id}`);
        if (!response.ok) throw new Error("Gagal fetch data UMKM");

        const data = await response.json();
        setUmkm(data);
      } catch (err: any) {
        console.error(err);
        setError("Gagal memuat detail UMKM");
      } finally {
        setLoading(false);
      }
    }

    fetchUmkmById();
  }, [id]);

  return { umkm, loading, error };
}