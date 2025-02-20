import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const bins = await prisma.bin.findMany();
    res.status(200).json(bins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bins", error });
  }
}
