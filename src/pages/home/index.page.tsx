import { Category, Manga, Rating, User } from "@prisma/client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CaretRight, ChartLineUp } from "phosphor-react";

import PopularCard from "@/components/PopularCard";
import RecentReadCard from "@/components/RecentReadCard";
import ReviewCard from "@/components/ReviewCard";
import { prisma } from "@/libs/prisma";

import Template from "../template";
import {
  CenterContainer,
  HomeContainer,
  RightContainer,
  Subtitle,
  Title,
} from "./styles";

interface MangaWithRatingAndCategories extends Manga {
  rating: number;
  categories: Category[];
}

export interface RatingWithUserAndManga extends Rating {
  user: User;
  manga: Manga;
}

interface HomeProps {
  ratings: RatingWithUserAndManga[];
  mangas: MangaWithRatingAndCategories[];
}

export default function Home({ ratings, mangas }: HomeProps) {
  const session = useSession();

  return (
    <Template>
      <Title>
        <ChartLineUp size={32} />
        <h2>Início</h2>
      </Title>

      <HomeContainer>
        <CenterContainer>
          {session.status === "authenticated" && (
            <>
              <Subtitle>
                <span>Sua última leitura</span>
                <Link href={"/"}>
                  Ver todas
                  <CaretRight size={16} />
                </Link>
              </Subtitle>
              <RecentReadCard />
            </>
          )}

          <Subtitle>
            <span>Avaliações mais recentes</span>
          </Subtitle>

          {ratings.map((rating) => (
            <ReviewCard
              key={rating.id}
              user={rating.user}
              manga={rating.manga}
              rating={rating}
            />
          ))}
        </CenterContainer>

        <RightContainer>
          <Subtitle>
            <span>Mangás Populares</span>
            <Link href={"/explore"}>
              Ver todos
              <CaretRight size={16} />
            </Link>
          </Subtitle>

          {mangas.map((manga) => (
            <PopularCard
              key={manga.id}
              size="sm"
              author={manga.author}
              name={manga.name}
              cover={manga.cover_url}
              rating={manga.rating}
            />
          ))}
        </RightContainer>
      </HomeContainer>
    </Template>
  );
}

export async function getStaticProps() {
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

    take: 4,
    orderBy: {
      ratings: {
        _count: "desc",
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

  const ratings = await prisma.rating.findMany({
    include: {
      user: true,
      manga: true,
    },
    take: 3,
    orderBy: {
      created_at: "desc",
    },
  });

  return {
    props: {
      mangas: JSON.parse(JSON.stringify(mangasWithRating)),
      ratings: JSON.parse(JSON.stringify(ratings)),
    },
    revalidate: 60 * 60 * 24 * 1, // 1 day
  };
}
