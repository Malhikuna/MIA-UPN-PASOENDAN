// import React from "react";

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   className?: string;
// }

// export default function Input({ className, ...props }: InputProps) {
//   return (
//     <label className="input">
//       <svg
//         className="h-[1em] opacity-50"
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 24 24"
//       >
//         <g
//           strokeLinejoin="round"
//           strokeLinecap="round"
//           strokeWidth="2.5"
//           fill="none"
//           stroke="currentColor"
//         >
//           <circle cx="11" cy="11" r="8"></circle>
//           <path d="m21 21-4.3-4.3"></path>
//         </g>
//       </svg>
//       <input type="search" required placeholder="Search" className={className} {...props} />
//     </label>
//   );
// }


import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({ className = '', ...props }: InputProps) {
  return (
    <label className="relative flex items-center">
      <svg
        className="absolute left-4 h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input
        type="search"
        placeholder="Search"
        className={`w-full pl-12 pr-4 py-2 rounded-full bg-white/10 border-none outline-none focus:ring-1 focus:ring-[#f8fcf9] shadow-md ${className} text-white`}
        {...props}
      />
    </label>
  );
}