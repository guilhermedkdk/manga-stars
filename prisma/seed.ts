import { PrismaClient } from "@prisma/client";

import { categories } from "./constants/categories";
import { mangas } from "./constants/mangas";
import { ratings } from "./constants/ratings";
import { users } from "./constants/users";
const prisma = new PrismaClient();

async function main() {
  await prisma.rating.deleteMany();
  await prisma.user.deleteMany();
  await prisma.categoriesOnMangas.deleteMany();
  await prisma.category.deleteMany();
  await prisma.manga.deleteMany();

  const usersSeed = users.map((user) => {
    return prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        avatar_url: user.avatar_url,
      },
    });
  });

  const categoriesSeed = categories.map((category) => {
    return prisma.category.create({
      data: {
        name: category.name,
        id: category.id,
      },
    });
  });

  const mangasSeed = mangas.map((manga) => {
    return prisma.manga.create({
      data: {
        id: manga.id,
        name: manga.name,
        author: manga.author,
        summary: manga.summary,
        cover_url: manga.cover_url,
        total_volumes: manga.total_volumes,
        categories: {
          create: [
            ...manga.categories.map((category) => {
              return {
                category: {
                  connect: {
                    id: category.id,
                  },
                },
              };
            }),
          ],
        },
      },
    });
  });

  const ratingsSeed = ratings.map((rating) => {
    return prisma.rating.create({
      data: {
        id: rating.id,
        rate: rating.rate,
        description: rating.description,
        user: {
          connect: { id: rating.user_id },
        },
        manga: {
          connect: { id: rating.manga_id },
        },
      },
    });
  });

  await prisma.$transaction([
    ...categoriesSeed,
    ...mangasSeed,
    ...usersSeed,
    ...ratingsSeed,
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
