import { Category, Manga, Rating, User } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import { CaretRight, ChartLineUp } from "phosphor-react";

import EmptyCard from "@/components/EmptyCard";
import PopularCard from "@/components/PopularCard";
import RecentReadCard from "@/components/RecentReadCard";
import ReviewCard from "@/components/ReviewCard";
import { prisma } from "@/libs/prisma";

import { buildNextAuthOptions } from "../api/auth/[...nextauth].api";
import Template from "../template";
import {
  CenterContainer,
  HomeContainer,
  RightContainer,
  Subtitle,
  Title,
} from "./styles";

export interface MangaWithRatingAndCategories extends Manga {
  categories: Category[];
  rating: number;
  ratings: Rating[];
  alreadyRead: boolean;
}

export interface RatingWithUserAndManga extends Rating {
  user: User;
  manga: Manga;
  alreadyRead: boolean;
}

interface HomeProps {
  ratings: RatingWithUserAndManga[];
  mangas: MangaWithRatingAndCategories[];
  userLastRating: RatingWithUserAndManga;
}

export default function Home({ ratings, mangas, userLastRating }: HomeProps) {
  const session = useSession();

  return (
    <>
      <NextSeo title="Início | Manga Stars" />

      <Template>
        <Title>
          <ChartLineUp size={32} />
          <h2>Início</h2>
        </Title>

        <HomeContainer>
          <CenterContainer>
            {session.data?.user && (
              <>
                {userLastRating ? (
                  <>
                    <Subtitle>
                      <span>Sua última leitura</span>
                      <Link href={`/profile/${session.data.user.id}`}>
                        Ver todas
                        <CaretRight size={16} />
                      </Link>
                    </Subtitle>
                    <RecentReadCard
                      key={userLastRating.id}
                      rating={userLastRating}
                      manga={userLastRating.manga}
                    />
                  </>
                ) : (
                  <>
                    <Subtitle>
                      <span>Sua última leitura</span>
                    </Subtitle>
                    <EmptyCard />
                  </>
                )}
              </>
            )}

            <Subtitle>
              <span>Avaliações mais recentes</span>
            </Subtitle>

            {ratings.map((rating) => (
              <ReviewCard key={rating.id} rating={rating} />
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
                alreadyRead={manga.alreadyRead}
              />
            ))}
          </RightContainer>
        </HomeContainer>
      </Template>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  // Buscando a última avaliação do usuário, caso exista
  let userLastRating = null;

  if (session?.user) {
    userLastRating = await prisma.rating.findFirst({
      where: {
        user_id: session.user.id as string,
      },
      include: {
        user: true,
        manga: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  // Buscando e filtrando os 4 mangas mais populares
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

  // Retornando os mangas com a categoria
  const mangasWithCategory = mangas.map((manga) => {
    return {
      ...manga,
      categories: manga.categories.map((category) => category.category),
    };
  });

  // Verificando se um livro foi lido pelo usuário logado
  let userMangasIds: string[] = [];

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

  // Retornando os mangas com a categoria + nota média + verificação de leitura
  const mangasWithRating = mangasWithCategory.map((manga) => {
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

  // Retornando as 4 avaliações mais recentes (que não seja a última avaliação do usuário)
  const ratings = await prisma.rating.findMany({
    where: {
      NOT: {
        id: userLastRating?.id,
      },
    },
    include: {
      user: true,
      manga: true,
    },
    take: 4,
    orderBy: {
      created_at: "desc",
    },
  });

  // Retornando as 4 avaliações mais recentes com a verificação de leitura
  const ratingWithReadStatus = ratings.map((rating) => {
    return {
      ...rating,
      alreadyRead: userMangasIds.includes(rating.manga.id),
    };
  });

  // Retorno final dos Livros(livros|categoria|nota média|verificação de leitura) + Últimas 4 Avaliações(com verificação de leitura) + Última avaliação do Usuário
  return {
    props: {
      mangas: JSON.parse(JSON.stringify(mangasWithRating)),
      ratings: JSON.parse(JSON.stringify(ratingWithReadStatus)),
      userLastRating: JSON.parse(JSON.stringify(userLastRating)),
    },
  };
};
