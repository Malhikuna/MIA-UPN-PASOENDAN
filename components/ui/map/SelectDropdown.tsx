"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function SelectDropdown({
 label,
 options,
 value,
 onChange,
 className = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative w-full ${className}`}>
      {label && <p className="mb-1 text-sm font-medium">{label}</p>}

      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 bg-white border border-gray-100 rounded-md flex justify-between items-center shadow-sm"
      >
        <span>{value || "Pilih kategori"}</span>
        <ChevronDown className={`transition ${open ? "rotate-180" : ""}`} size={18} />
      </button>

      {/* Options */}
      {open && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-40 max-h-60 overflow-y-auto">
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                value === opt ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
