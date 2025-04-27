// Retorna o Perfil do Usuário em questão
// /api/profile/userId

import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/libs/prisma";
import { getMostFrequentString } from "@/utils/getMostFrequentString";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  const userId = String(req.query.userId);
  const profile = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      ratings: {
        include: {
          manga: {
            include: {
              categories: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      },
    },
  });

  if (!profile) {
    return res.status(404).json({ message: "User does not exist." });
  }

  if (profile) {
    const readPages = profile.ratings.reduce(
      (acc, rating) => acc + rating.manga.total_volumes,
      0
    );
    const ratedMangas = profile.ratings.length;
    const readAuthors = profile.ratings.reduce((acc, rating) => {
      if (!acc.includes(rating.manga.author)) {
        acc.push(rating.manga.author);
      }
      return acc;
    }, [] as string[]);

    const categories = profile.ratings?.flatMap((rating) =>
      rating?.manga?.categories?.flatMap((category) => category?.category?.name)
    );

    const mostReadCategory = categories
      ? getMostFrequentString(categories)
      : null;

    const profileData = {
      user: {
        avatar_url: profile.avatar_url,
        name: profile.name,
        createdAt: profile.created_at,
      },
      ratings: profile.ratings,
      readPages,
      ratedMangas,
      readAuthors: readAuthors?.length,
      mostReadCategory,
    };
    return res.json({ profile: profileData });
  }
}
