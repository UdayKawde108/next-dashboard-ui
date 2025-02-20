import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, mobile, class: className, time, role,present } = req.body;

    if (!name || !mobile || !className || !time || !role|| !present) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const attendance = await prisma.attendance.create({
      data: {
        name,
        mobile,
        class: className,
        time,
        role,
        present
      },
    });

    return res.status(201).json({ message: "Attendance recorded successfully", attendance });
  } catch (error) {
    console.error("Error saving attendance:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
  
}
