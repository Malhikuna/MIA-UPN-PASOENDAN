export type UmkmItem = {
  id: number;
  title: string;
  address: string;
  description: string;
  images: string[];
  category: "makanan" | "minuman" | "jasa";
};