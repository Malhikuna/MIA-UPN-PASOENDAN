"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserLocation {
  lat: number;
  lng: number;
}

interface UserLocationState {
  userLocation: UserLocation | null;
  userRadius: number;
  isLoading: boolean;
  error: string | null;
  setUserLocation: (location: UserLocation) => void;
  setUserRadius: (radius: number) => void;
  fetchUserLocation: () => void;
  clearUserLocation: () => void;
  getDistanceFromUser: (lat: number, lng: number) => number | null;
}

const storage = typeof window !== "undefined" ? createJSONStorage(() => sessionStorage) : undefined;

export const useUserLocationStore = create<UserLocationState>()(
  persist(
    (set, get) => ({
      userLocation: null,
      userRadius: 100,
      isLoading: false,
      error: null,

      setUserLocation: (location) => set({ userLocation: location }),

      setUserRadius: (radius: number) => set({ userRadius: radius }),

      fetchUserLocation: () => {
        set({ isLoading: true, error: null });
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            set({
              userLocation: { lat: latitude, lng: longitude },
              isLoading: false,
            });
          },
          (err) => {
            console.error("Gagal mendeteksi lokasi:", err);
            set({
              error: "Gagal mendeteksi lokasi. Pastikan izin lokasi aktif.",
              isLoading: false,
            });
          }
        );
      },

      getDistanceFromUser: (lat: number, lng: number) => {
        const userLoc = get().userLocation;
        if (!userLoc) return null;

        const R = 6371;
        const dLat = ((lat - userLoc.lat) * Math.PI) / 180;
        const dLng = ((lng - userLoc.lng) * Math.PI) / 180;

        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos((userLoc.lat * Math.PI) / 180) * Math.cos((lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return parseFloat(distance.toFixed(2));
      },

      clearUserLocation: () => {
        set({ userLocation: null });
        // localStorage.removeItem("user-location-storage");
      },
    }),
    {
      name: "user-location-storage",
      storage,
      skipHydration: true,
    }
  )
);
