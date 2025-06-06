// Retorna todas as avaliações
// /api/ratings

import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  const ratings = await prisma.rating.findMany({
    include: {
      manga: {
        select: {
          cover_url: true,
          name: true,
          author: true,
        },
      },
      user: {
        select: {
          id: true,
          avatar_url: true,
          name: true,
        },
      },
    },
  });

  const ratingsOutput = ratings.map((rating) => ({
    id: rating.id,
    createdAt: rating.created_at,
    rate: rating.rate,
    description: rating.description,
    manga: {
      coverURL: rating.manga.cover_url,
      name: rating.manga.name,
      author: rating.manga.author,
    },
    user: {
      id: rating.user.id,
      avatarURL: rating.user.avatar_url,
      name: rating.user.name,
    },
  }));

  return res.status(200).json(ratingsOutput);
}
