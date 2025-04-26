// Retorna TODOS os mangás
// /api/mangas

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { prisma } from "@/libs/prisma";

import { buildNextAuthOptions } from "../auth/[...nextauth].api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  let categoriesQuery;

  if (req.query.category) {
    const categoryId = String(req.query.category);
    categoriesQuery = {
      some: {
        category_id: categoryId,
      },
    };
  }

  const mangas = await prisma.manga.findMany({
    where: {
      categories: categoriesQuery,
    },
    include: {
      ratings: {
        select: {
          rate: true,
        },
      },
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  const mangasFixedRelationWithCategory = mangas.map((manga) => {
    return {
      ...manga,
      categories: manga.categories.map((category) => category.category),
    };
  });

  let userMangasIds: string[] = [];

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
            user_id: String(session?.user?.id),
          },
        },
      },
    });

    userMangasIds = userMangas?.map((x) => x?.id);
  }

  const mangasWithRating = mangasFixedRelationWithCategory.map((manga) => {
    const avgRate =
      manga.ratings.reduce((sum, rateObj) => {
        return sum + rateObj.rate;
      }, 0) / manga.ratings.length;

    return {
      ...manga,
      rating: avgRate,
      alreadyRead: userMangasIds.includes(manga.id),
    };
  });

  return res.json({ mangasWithRating });
}
