"use client";
import { useEffect, useState } from 'react';

export function useTheme() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const savedCategory = localStorage.getItem("selectedMainCategory");
      const theme = savedCategory === "jasa" ? "jasa-theme" : "fnb-theme";
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [isClient]);

  return isClient;
}