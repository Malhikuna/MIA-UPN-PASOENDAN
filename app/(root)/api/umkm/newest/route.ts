import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const mainCategory = searchParams.get("mainCategory");
    const subCategory = searchParams.get("subCategory");

    const where = {};

    if (mainCategory) {
      (where as any).mainCategory = mainCategory;
    }

    if (subCategory && subCategory !== "all") {
      (where as any).subCategory = subCategory;
    }

    console.log("Fetching UMKM with mainCategory:", mainCategory);

    const umkmList = await prisma.umkm.findMany({
      where,

      take: 6,
      orderBy: { createdAt: "desc" },
    });

    console.log("Found UMKM:", umkmList.length);

    return NextResponse.json(umkmList);
  } catch (error) {
    console.error("Error fetching UMKM:", error);
    return NextResponse.json(
      { error: "Failed to fetch UMKM data", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
