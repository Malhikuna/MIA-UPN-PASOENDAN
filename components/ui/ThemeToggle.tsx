"use client";
import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [selected, setSelected] = useState<"FnB" | "Jasa">("FnB");
  const [theme, setTheme] = useState<"FnB" | "Jasa">(selected);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "FnB" | "Jasa" | null;

    if (savedTheme) {
      setTheme(savedTheme);
      setSelected(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", selected);
    }
  }, []);

  const toggleTheme = (newTheme: "FnB" | "Jasa") => {
    setTheme(newTheme);
    setSelected(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="relative  bg-white rounded-full border-4 border-secondary p-3 cursor-pointer">
        {/* Sliding background */}
        <div
          className={`absolute top-2 h-[calc(100%-14px)] w-[calc(50%-12px)] bg-primary rounded-full transition-all duration-300 ease-in-out ${
            selected === "FnB" ? "left-1" : "left-[calc(50%+9px)]"
          }`}
        />

        {/* Buttons */}
        <div className="relative z-10 flex gap-10 h-full">
          <button
            onClick={() => toggleTheme("FnB")}
            className={`flex-1 flex items-center justify-center font-bold transition-colors duration-300 `}
          >
            F&B
          </button>
          <button
            onClick={() => toggleTheme("Jasa")}
            className={`flex-1 flex items-center justify-center font-bold transition-colors duration-300 `}
          >
            Jasa
          </button>
        </div>
      </div>
    </div>
  );
}
