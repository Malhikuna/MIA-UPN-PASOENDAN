import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const lat = parseFloat(searchParams.get("lat") || "0");
    const lng = parseFloat(searchParams.get("lng") || "0");
    const radius = parseFloat(searchParams.get("radius") || "100");
    const mainCategory = searchParams.get("mainCategory");
    const subCategory = searchParams.get("subCategory");

    let filters = ``;

    if (mainCategory)
      filters += `AND "mainCategory" = '${mainCategory}'`;

    if (subCategory && subCategory !== "all")
      filters += ` AND "subCategory" = '${subCategory}'`;

    const data = await prisma.$queryRawUnsafe(`
      SELECT
        id,
        name,
        address,
        "mainCategory",
        "subCategory",
        description,
        "imageUrl",
        "whatsApp",
        lat,
        lng,
        "createdAt",
        ST_Distance(
          geom,
          ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)
        ) AS distance   
      FROM "Umkm"
      WHERE
        ST_DWithin(
          geom,
          ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326),
          ${radius}
        )
        ${filters}
      ORDER BY distance ASC
        LIMIT 100
    `);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed", details: String(error) },
      { status: 500 }
    );
  }
}
