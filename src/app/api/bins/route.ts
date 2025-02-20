import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust import path if needed

// Fetch all bins
export async function GET() {
  try {
    const bins = await prisma.bin.findMany({
      include: {
        area: true, // Include related area if needed
        smaster: true, // Include related smaster if needed
        sworkers: true, // Include related sworker if needed
      }
    });
    return NextResponse.json(bins);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch bins" }, { status: 500 });
  }
}

// Create a new bin
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { location, latitude, longitude, level, threshold, areaId, smasterId } = body;

    // Create a new bin in the database
    const newBin = await prisma.bin.create({
      data: {
        location,
        latitude,
        longitude,
        level,
        threshold,
        areaId,
        smasterId
      }
    });

    return NextResponse.json(newBin);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create bin" }, { status: 500 });
  }
}
