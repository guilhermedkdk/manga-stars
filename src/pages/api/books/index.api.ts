import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/libs/prisma";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const book = await prisma.manga.findMany();

  return res.json({ book });
}
