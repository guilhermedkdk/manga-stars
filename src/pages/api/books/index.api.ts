import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mangas = await prisma.manga.findMany({
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

  const mangasWithRating = mangasFixedRelationWithCategory.map((manga) => {
    const avgRate =
      manga.ratings.reduce((sum, rateObj) => {
        return sum + rateObj.rate;
      }, 0) / manga.ratings.length;

    return {
      ...manga,
      rating: avgRate,
    };
  });

  return res.json({ mangasWithRating });
}
