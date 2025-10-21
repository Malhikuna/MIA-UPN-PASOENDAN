import React from "react";
import Input from "../ui/Input";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-25 p-2 glass fixed w-full z-50">
      <h1 className="font-bold">CariKita</h1>
      <ul className="flex gap-3 items-center">
        <li>Home</li>
        <li>About</li>
        <li>
          <Input />
        </li>
      </ul>
    </nav>
  );
}
