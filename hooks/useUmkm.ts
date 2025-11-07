import { useUmkmStore } from "@/store/useUmkmStore";
import { UmkmItem } from "@/types/umkm";
import { useEffect, useState } from "react";

export const useUmkm = () => {
  const { selectedMainCategory, selectedSubCategory, searchQuery } = useUmkmStore();
  const [umkmList, setUmkmList] = useState<UmkmItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUmkm() {
      try {
        console.log(selectedSubCategory);
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/umkm?mainCategory=${selectedMainCategory}&${searchQuery}}`);

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
};

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
};

export const useNewestUmkm = () => {
  const { selectedMainCategory, selectedSubCategory } = useUmkmStore();
  const [newestUmkmList, setNewestUmkmList] = useState<UmkmItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUmkm() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/umkm/newest?mainCategory=${selectedMainCategory}&${
            selectedSubCategory ? `subCategory=${selectedSubCategory}` : ""
          }`
        );

        console.log(response);

        if (!response.ok) throw new Error("Gagal fetch data UMKM");

        const dataUmkm = await response.json();
        setNewestUmkmList(dataUmkm);
      } catch (err: any) {
        console.error(err);
        setError("Gagal memuat data UMKM");
      } finally {
        setLoading(false);
      }
    }

    fetchUmkm();
  }, [selectedMainCategory, selectedSubCategory]);

  return { newestUmkmList, loading, error };
};

export const useNearbyUmkm = () => {
  const { selectedMainCategory, selectedSubCategory } = useUmkmStore();
  const [nearbyUmkmList, setNearbyUmkmList] = useState<UmkmItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUmkm() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/umkm/nearby?mainCategory=${selectedMainCategory}&${
            selectedSubCategory ? `subCategory=${selectedSubCategory}` : ""
          }`
        );

        console.log(response);

        if (!response.ok) throw new Error("Gagal fetch data UMKM");

        const dataUmkm = await response.json();
        setNearbyUmkmList(dataUmkm);
      } catch (err: any) {
        console.error(err);
        setError("Gagal memuat data UMKM");
      } finally {
        setLoading(false);
      }
    }

    fetchUmkm();
  }, [selectedMainCategory, selectedSubCategory]);

  return { nearbyUmkmList, loading, error };
};
