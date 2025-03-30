import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/libs/prisma";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const categories = await prisma.category.findMany();

  return res.json({ categories });
}
