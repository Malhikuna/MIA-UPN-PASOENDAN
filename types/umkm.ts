export type UmkmCategory =
  | "nasi-goreng"
  | "ayam-geprek"
  | "bakso"
  | "soto-sate"
  | "jahit-pakaian"
  | "salon"
  | "bengkel";

export type UmkmMainCategory = "fnb" | "jasa";

export type UmkmItem = {
  id: string;
  name: string;
  address: string;
  mainCategory: UmkmMainCategory;
  subCategory: UmkmCategory;
  description: string;
  imageUrl: string[];
  lat: number;
  lng: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CurrentFilter = "newest" | "nearby";

export type UmkmListType = {
  useUmkm: (userLat: number, userLng: number, radius: number) => {
    umkmList: UmkmItem[];
    loading: boolean;
    error: string | null;
  };
};
