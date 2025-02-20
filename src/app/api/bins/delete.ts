import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ensure correct import path

export async function DELETE(req: NextRequest) {
    try {
        const { binId } = await req.json(); // Get binId from request body

        if (!binId) {
            return NextResponse.json({ error: "Bin ID is required" }, { status: 400 });
        }

        // Delete related entries in BinSworker first due to foreign key constraints
        await prisma.binSworker.deleteMany({
            where: { binId },
        });

        // Now, delete the Bin
        await prisma.bin.delete({
            where: { id: binId },
        });

        return NextResponse.json({ message: "Bin deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting bin:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
