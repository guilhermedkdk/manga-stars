/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CategoriesOnMangas,
  Category,
  Manga,
  Rating,
  User as UserPrisma,
} from "@prisma/client";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import {
  BookmarkSimple,
  BookOpen,
  Books,
  CaretLeft,
  MagnifyingGlass,
  User,
  UserList,
} from "phosphor-react";
import { useState } from "react";

import EmptyCard from "@/components/EmptyCard";
import ProfileCard from "@/components/ProfileCard";
import { SearchInput } from "@/components/SearchInput";
import { prisma } from "@/libs/prisma";
import { RatingWithUserAndManga } from "@/pages/home/index.page";
import Template from "@/pages/template";
import { getDateFormattedAndRelative } from "@/utils/timeFormatter";

import {
  CardsContainer,
  CardWrapper,
  CenterContainer,
  ImageWrapper,
  Line,
  MainContainer,
  RightContainer,
  Title,
  UserNumber,
  UserStats,
} from "./styles";

interface ProfileProps {
  infos: {
    pages: number;
    mangasCount: number;
    authorsCount: number;
    bestGenre: Category;
  };

  user: UserPrisma & {
    ratings: (RatingWithUserAndManga & {
      manga: Manga & {
        categories: (CategoriesOnMangas & {
          category: Category;
        })[];
      };
    })[];
  };

  ratings: (Rating & {
    alreadyRead: boolean;
    user: UserPrisma;
    manga: Manga & {
      categories: (CategoriesOnMangas & {
        category: Category;
      })[];
    };
  })[];
}

export default function Profile({ infos, ratings, user }: ProfileProps) {
  const session = useSession();

  const { dateFormatted, dateRelativeToNow, dateString } =
    getDateFormattedAndRelative(user.created_at);

  const [search, setSearch] = useState("");

  const filteredMangas = ratings?.filter((rating) => {
    return (
      rating.manga.name
        .toLowerCase()
        .includes(search.toLowerCase().replace(/( )+/g, " ")) ||
      rating.manga.author
        .toLowerCase()
        .includes(search.toLowerCase().replace(/( )+/g, " "))
    );
  });

  return (
    <>
      <NextSeo title="Perfil | Manga Stars" />

      <Template>
        <Title>
          {session.data?.user.id === user.id ? (
            <>
              <User size={32} />
              <h2>Perfil</h2>
            </>
          ) : (
            <Link href={"/home"}>
              <CaretLeft size={20} />
              <h4>Voltar</h4>
            </Link>
          )}
        </Title>

        <MainContainer>
          <CenterContainer>
            <SearchInput
              placeholder="Buscar mangá ou autor"
              size="md"
              value={search}
              onChange={(e: unknown) =>
                setSearch((e as { target: { value: string } }).target.value)
              }
            >
              <MagnifyingGlass size={20} />
            </SearchInput>

            <CardsContainer>
              {filteredMangas.length > 0 ? (
                <CardWrapper>
                  {filteredMangas.map((rating) => (
                    <ProfileCard
                      key={rating.id}
                      manga={rating.manga}
                      rating={rating}
                    />
                  ))}
                </CardWrapper>
              ) : (
                <CardWrapper>
                  <EmptyCard />
                </CardWrapper>
              )}
            </CardsContainer>
          </CenterContainer>

          <RightContainer>
            <ImageWrapper>
              <Image
                width={70}
                height={70}
                src={`${user.avatar_url}`}
                alt=""
                style={{
                  objectFit: "cover",
                  overflow: "hidden",
                  borderRadius: "50%",
                }}
              />
            </ImageWrapper>
            <p>{user.name}</p>
            <time title={dateFormatted} dateTime={dateString}>
              membro(a) {dateRelativeToNow}
            </time>

            <Line />

            <UserStats>
              <UserNumber>
                <BookOpen size={32} />
                <div>
                  <h5>{infos.pages}</h5>
                  <span>Volumes lidas </span>
                </div>
              </UserNumber>
              <UserNumber>
                <Books size={32} />
                <div>
                  <h5>{infos.mangasCount}</h5>
                  <span>Mangás avaliados </span>
                </div>
              </UserNumber>
              <UserNumber>
                <UserList size={32} />
                <div>
                  <h5>{infos.authorsCount}</h5>
                  <span>Autores lidos </span>
                </div>
              </UserNumber>
              {infos.bestGenre && (
                <UserNumber>
                  <BookmarkSimple size={32} />
                  <div>
                    <h5>{infos.bestGenre.name}</h5>
                    <span>Categoria mais lida </span>
                  </div>
                </UserNumber>
              )}
            </UserStats>
          </RightContainer>
        </MainContainer>
      </Template>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const userId = String(params?.user_id);

  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: userId,
      },
      include: {
        ratings: {
          orderBy: {
            created_at: "desc",
          },
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
        },
      },
    });

    const pages = user.ratings.reduce((acc, rating) => {
      return (acc += rating.manga.total_volumes);
    }, 0);

    const mangas = user.ratings.map((rating) => rating.manga);

    const authors = user.ratings.map((rating) => rating.manga.author);

    const uniqueAuthors = authors.filter(
      (value, index, array) => array.indexOf(value) === index
    );

    const genres = mangas
      .map((manga) => manga.categories.map((category) => category.category))
      .flat();

    const genreNumbers = genres
      .reduce((acc: any, genre) => {
        const qtd = genres.filter((i: any) => i.id === genre.id).length;
        return [
          ...acc,
          {
            ...genre,
            qtd,
          },
        ];
      }, [])
      .sort((a: any, b: any) => b.qtd - a.qtd);

    const infos = {
      pages,
      mangasCount: mangas.length,
      authorsCount: uniqueAuthors.length,
      bestGenre: genreNumbers[0] ? genreNumbers[0] : null,
    };

    return {
      props: {
        ratings: JSON.parse(JSON.stringify(user.ratings)),
        user: JSON.parse(JSON.stringify(user)),
        infos,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
