import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="flex flex-col justify-between items-center bg-base-content text-base-100 h-[30vh] sm:h-[50vh] overflow-hidden ">
      <div className="flex p-7 w-full">
        <div className="">
          <h4 className="font-bold tracking-tight text-background">SITEMAP</h4>
          <Link href="/">Home</Link>
        </div>
      </div>
      <div>
        <h1 className="text-[15vw] tracking-tight font-semi-bold mt-[150px]">CARIKITA</h1>
      </div>
    </div>
  );
}
