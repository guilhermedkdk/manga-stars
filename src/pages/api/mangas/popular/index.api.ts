// Retorna os 4 Mangás mais Populares (com mais avaliações)
// /api/mangas/popular

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { prisma } from "@/libs/prisma";

import { buildNextAuthOptions } from "../../auth/[...nextauth].api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  const mangas = await prisma.manga.findMany({
    orderBy: {
      ratings: {
        _count: "desc",
      },
    },
    include: {
      ratings: true,
    },
    take: 4,
  });

  const mangasAvgRating = await prisma.rating.groupBy({
    by: ["manga_id"],
    where: {
      manga_id: {
        in: mangas.map((manga) => manga.id),
      },
    },
    _avg: {
      rate: true,
    },
  });

  let userMangasId: string[] = [];

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  if (session) {
    const userMangas = await prisma.manga.findMany({
      where: {
        ratings: {
          some: {
            user_id: String(session.user.id),
          },
        },
      },
    });

    userMangasId = userMangas.map((manga) => manga.id);
  }

  const mangasWithAvgRating = mangas.map((manga) => {
    const mangaAvgRating = mangasAvgRating.find(
      (avgRating) => avgRating.manga_id === manga.id
    );
    const { ratings, ...mangaInfo } = manga;
    return {
      ...mangaInfo,
      avgRating: mangaAvgRating?._avg.rate,
      alreadyRead: userMangasId.includes(manga.id),
    };
  });

  return res.json({ mangas: mangasWithAvgRating });
}
