"use client";
import { useUmkmStore } from "@/store/useUmkmStore";
import { useEffect, useState } from "react";

export function useTheme() {
  const { selectedMainCategory } = useUmkmStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const savedCategory = selectedMainCategory;
      const theme = savedCategory === "jasa" ? "jasa-theme" : "fnb-theme";
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [isClient]);

  return isClient;
}
