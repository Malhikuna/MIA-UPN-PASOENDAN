import Image from "next/image";

export default function Category() {
  return (
    <div className="flex justify-center items-center h-[150px] w-[150px] rounded-full bg-primary bg">
      <Image src="/images/category/category_jahit.svg" alt="category_jahit" width={115} height={125} />
    </div>
  );
}
