// Retorna as Infos detalhadas do Mangá em questão
// /api/mangas/mangaId

import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mangaId = String(req.query.manga_id);

  const manga = await prisma.manga.findUnique({
    where: {
      id: mangaId,
    },
    include: {
      ratings: {
        include: {
          user: true,
        },
      },
    },
  });

  return res.json({ manga });
}
