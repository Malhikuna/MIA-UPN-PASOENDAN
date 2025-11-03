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
