import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;

    const umkm = await prisma.umkm.findUnique({
      where: { id },
    });

    if (!umkm) {
      return NextResponse.json(
        { message: "UMKM tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(umkm);
  } catch (error) {
    console.error("Error fetching UMKM by ID:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
