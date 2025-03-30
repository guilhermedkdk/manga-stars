import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/libs/prisma";

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
