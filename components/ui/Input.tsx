

import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  labelClassName?: string;
  bgColor?: string;
}



const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", labelClassName = "", bgColor, ...props }, ref) => {
    return (
      <label className={`flex items-center gap-2 h-10 ${bgColor} ${labelClassName} rounded-full px-4`}>
        <svg className="w-5 h-5 text-primary-content" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input ref={ref} type="search" required placeholder="Search" className={className} {...props} />
      </label>
    );
  }
);

export default Input;
