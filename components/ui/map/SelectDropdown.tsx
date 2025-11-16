"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownProps<T extends string> {
  label?: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export default function SelectDropdown<T extends string>({
   label,
   options,
   value,
   onChange,
   className = "",
 }: DropdownProps<T>) {
  const [open, setOpen] = useState(false);

  const formatLabel = (text: string) => text.replace(/-/g, " ");

  return (
    <div className={`relative w-full ${className}`}>
      {label && <p className="mb-1 text-sm font-medium">{label}</p>}

      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 bg-white border border-gray-100 rounded-md flex justify-between items-center shadow-sm"
      >
        <span>{formatLabel(value) || "Pilih kategori"}</span>
        <ChevronDown className={`transition ${open ? "rotate-180" : ""}`} size={18} />
      </button>

      {/* Options */}
      {open && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-40 max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                value === opt ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {formatLabel(opt)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
