// Rota de Criação de Novas Avaliações
// /api/ratings/mangaId

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { prisma } from "@/libs/prisma";

import { buildNextAuthOptions } from "../../auth/[...nextauth].api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  if (!session) {
    return res.status(401).end();
  }

  const mangaId = String(req.query.manga_id);

  const manga = await prisma.manga.findUnique({
    where: {
      id: mangaId,
    },
  });

  if (!manga) {
    return res.status(400).json({ message: "Manga does not exist." });
  }

  const createRatingbody = z.object({
    description: z.string(),
    manga_id: z.string(),
    user_id: z.string(),
    rate: z.number(),
  });

  const { description, manga_id, user_id, rate } = createRatingbody.parse({
    manga_id: mangaId,
    user_id: session.user?.id,
    ...req.body,
  });

  const rating = await prisma.rating.create({
    data: {
      description,
      manga_id,
      user_id,
      rate,
    },
    include: {
      user: true,
    },
  });

  return res.status(201).json(rating);
}
