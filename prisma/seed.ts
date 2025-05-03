import { PrismaClient } from "@prisma/client";

import { categories } from "./constants/categories";
import { mangas } from "./constants/mangas";
const prisma = new PrismaClient();

async function main() {
  await prisma.categoriesOnMangas.deleteMany();
  await prisma.category.deleteMany();
  await prisma.manga.deleteMany();

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

  await prisma.$transaction([...categoriesSeed, ...mangasSeed]);
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
