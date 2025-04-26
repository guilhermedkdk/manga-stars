// Retorna as Categorias
// /api/categories

import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  const categories = await prisma.category.findMany();

  return res.json({ categories });
}
