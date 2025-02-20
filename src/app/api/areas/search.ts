// src/api/areas/search.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust this path if needed

export async function GET(req: Request) {
  //const { query } = new URL(req.url).searchParams;

  try {
    const areas = await prisma.area.findMany({
      where: {
        name: {
         // contains: query,
          mode: "insensitive",
        },
      },
      select: {
        name: true,
      },
    });

    const areaNames = areas.map((area) => area.name);
    return NextResponse.json(areaNames);
  } catch (error) {
    return NextResponse.json({ error: "Failed to search areas" }, { status: 500 });
  }
}
