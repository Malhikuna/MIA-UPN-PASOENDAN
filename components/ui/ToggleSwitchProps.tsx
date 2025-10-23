// "use client";

// import { useEffect } from "react";

// interface Option {
//   value: string;
//   label: string;
// }

// interface ToggleSwitchProps {
//   options: Option[];
//   selected: string;
//   onChange: (value: string) => void;
// }

// export default function ToggleSwitch({ options, selected, onChange }: ToggleSwitchProps) {
//   const toggleTheme = (option: Option) => {
//     onChange(option.value);
//     document.documentElement.setAttribute("data-theme", option.label);
//     localStorage.setItem("theme", option.label);
//   };

//   // useEffect(() => {
//   //   const currentTheme = localStorage.getItem("theme");
//   //   console.log(currentTheme);
//   //   if (!currentTheme) {
//   //     localStorage.setItem("theme", "FnB");
//   //   }
//   //   // document.documentElement.setAttribute("data-theme", option.label);
//   // });

//   return (
//     <div className="inline-flex rounded-full bg-gray-200 p-1">
//       {options.map((option) => (
//         <button
//           key={option.value}
//           onClick={() => toggleTheme(option)}
//           className={`px-8 py-2 rounded-full font-semibold transition-all ${
//             selected === option.value ? "bg-secondary text-white shadow-md" : "text-gray-600 hover:text-gray-800"
//           }`}
//         >
//           {option.label}
//         </button>
//       ))}
//     </div>
//   );
// }


"use client";

interface Option {
  value: string;
  label: string;
}

interface ToggleSwitchProps {
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
}

export default function ToggleSwitch({ options, selected, onChange }: ToggleSwitchProps) {
  return (
    <div className="inline-flex rounded-full bg-gray-200 p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-8 py-2 rounded-full font-semibold transition-all ${
            selected === option.value 
              ? "bg-secondary text-white shadow-md" 
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}