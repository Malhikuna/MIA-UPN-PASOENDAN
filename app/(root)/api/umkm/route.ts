import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const mainCategory = searchParams.get("mainCategory");
  const umkmList = await prisma.umkm.findMany({
    where: {
      mainCategory,
    },
  });
  return NextResponse.json(umkmList);
}
