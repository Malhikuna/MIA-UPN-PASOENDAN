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
  id: number;
  title: string;
  address: string;
  description: string;
  images: string[];
  mainCategory: UmkmMainCategory;
  category: UmkmCategory;
  /*lat: number;
  lng: number;*/
};