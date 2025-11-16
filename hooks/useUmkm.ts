import { useUmkmStore } from "@/store/useUmkmStore";
import { UmkmItem } from "@/types/umkm";
import { useEffect, useState } from "react";

export const useUmkm = () => {
  /** -------------------------------
   *  STATE & DATA INITIALIZATION
   * -------------------------------- */
  const { selectedMainCategory, selectedSubCategory, searchQuery, currentFilter } = useUmkmStore();
  const [umkmList, setUmkmList] = useState<UmkmItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUmkm() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/umkm?mainCategory=${selectedMainCategory}${
            searchQuery ? `&searchQuery=${encodeURIComponent(searchQuery)}` : ""
          }&filter=${currentFilter}`
        );

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
  }, [selectedMainCategory, selectedSubCategory, searchQuery, currentFilter]);

  return { umkmList, loading, error };
};

export const useUmkmById = (id?: string) => {
  /** -------------------------------
   *  STATE & DATA INITIALIZATION
   * -------------------------------- */
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
  /** -------------------------------
   *  STATE & DATA INITIALIZATION
   * -------------------------------- */
  const { selectedMainCategory, selectedSubCategory } = useUmkmStore();
  const [umkmList, setUmkmList] = useState<UmkmItem[]>([]);
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
  }, [selectedMainCategory, selectedSubCategory]);

  return { umkmList, loading, error };
};

export const useNearestUmkm = (userLat: number, userLng: number, radius: number) => {
  /** -------------------------------
   *  STATE & DATA INITIALIZATION
   * -------------------------------- */
  const { selectedMainCategory, selectedSubCategory } = useUmkmStore();
  const [umkmList, setUmkmList] = useState<UmkmItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUmkm() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/umkm/nearest?mainCategory=${selectedMainCategory}&${
            selectedSubCategory ? `subCategory=${selectedSubCategory}` : ""
          }&lat=${userLat}&lng=${userLng}&radius=${radius}`
        );

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
  }, [selectedMainCategory, selectedSubCategory, userLat, userLng, radius]);

  return { umkmList, loading, error };
};
