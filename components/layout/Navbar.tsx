import React from "react";
import Input from "../ui/Input";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-25 p-2">
      <h1 className="font-bold">CariKita</h1>
      <ul className="flex gap-3 items-center">
        <li>Home</li>
        <li>About</li>
        <li>
          <ThemeToggle />
        </li>
        <li>
          <Input />
        </li>
      </ul>
    </nav>
  );
}
