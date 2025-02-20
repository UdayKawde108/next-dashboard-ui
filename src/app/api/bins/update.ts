import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  
    console.log("Received Data:", req.body); // ✅ Debugging
  
    const { id, level } = req.body; // Receiving bin ID and level from NodeMCU
  
    if (!id || typeof level !== "number") {
      console.log("Invalid data received:", req.body); // ✅ Log invalid data
      return res.status(400).json({ message: "Invalid data" });
    }
  
    try {
      const bin = await prisma.bin.findUnique({
        where: { id },
        select: { threshold: true },
      });
  
      if (!bin) {
        console.log("Bin not found for ID:", id);
        return res.status(404).json({ message: "Bin not found" });
      }
  
      const status = level >= bin.threshold ? "FULL" : "NORMAL";
  
      const updatedBin = await prisma.bin.update({
        where: { id },
        data: { level, status },
      });
  
      console.log("Updated Bin:", updatedBin); // ✅ Log bin update
  
      res.status(200).json({ message: "Bin updated successfully", bin: updatedBin, status });
    } catch (error) {
      console.error("Error updating bin:", error);
      res.status(500).json({ message: "Error updating bin", error });
    }
  }
  