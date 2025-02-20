import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const bins = await prisma.bin.findMany({}); // ✅ Fetch all bins

    console.log("🔥 Bins fetched from DB:", bins); // ✅ Debugging log

    if (!bins || bins.length === 0) {
      return res.status(200).json([]); // ✅ Return empty array instead of 404
    }

    res.status(200).json(bins);
  } catch (error) {
    console.error("❌ Error fetching bins:", error);
    res.status(500).json({ message: "Error fetching bins", error });
  }
}
