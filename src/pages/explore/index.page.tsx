import { Category } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { NextSeo } from "next-seo";
import NProgress from "nprogress";
import { Binoculars, MagnifyingGlass } from "phosphor-react";
import React, { useState } from "react";

import FilterButton from "@/components/FilterButton";
import LateralMenu from "@/components/LateralMenu";
import PopularCard from "@/components/PopularCard";
import { SearchInput } from "@/components/SearchInput";
import { api } from "@/libs/axios";
import { prisma } from "@/libs/prisma";

import { buildNextAuthOptions } from "../api/auth/[...nextauth].api";
import { MangaWithRatingAndCategories } from "../home/index.page";
import Template from "../template";
import {
  CardsContainer,
  CenterContainer,
  FilterContainer,
  Title,
} from "./styles";

export interface ExploreProps {
  categories: Category[];
  mangas: MangaWithRatingAndCategories[];
}

export default function Explore({ categories, mangas }: ExploreProps) {
  // Carregamento de todos os mangas
  const [mangasList, setMangasList] =
    useState<MangaWithRatingAndCategories[]>(mangas);

  // Filtragem dos mangas pela categoria no FilterButton
  const [categorySelected, setCategorySelected] = useState<string | null>(null);

  async function selectCategory(categoryId: string | null) {
    NProgress.start();
    try {
      const query = categoryId ? `?category=${categoryId}` : "";
      const response = await api.get(`/mangas${query}`);

      if (response.data.mangasWithRating) {
        setMangasList(response.data.mangasWithRating);
      }
      setCategorySelected(categoryId);
    } finally {
      NProgress.done();
    }
  }

  // Filtragem pelo nome dos mangas/autores no SearchInput
  const [search, setSearch] = useState("");
  const filteredMangas = mangasList?.filter((manga) => {
    return (
      manga.name
        .toLowerCase()
        .includes(search.toLowerCase().replace(/( )+/g, " ")) ||
      manga.author
        .toLowerCase()
        .includes(search.toLowerCase().replace(/( )+/g, " "))
    );
  });

  // Abertura do LateralMenu ao selecionar um manga
  const [selectedManga, setSelectedManga] =
    useState<MangaWithRatingAndCategories | null>(null);
  const sidebarShouldBeOpen = !!selectedManga;

  function selectManga(manga: MangaWithRatingAndCategories) {
    setSelectedManga(manga);
  }

  function deselectManga() {
    setSelectedManga(null);
  }

  return (
    <>
      <NextSeo title="Explorar | Manga Stars" />

      <Template>
        {sidebarShouldBeOpen && (
          <LateralMenu handleCloseMenu={deselectManga} manga={selectedManga} />
        )}

        <Title>
          <div className="title">
            <Binoculars size={32} />
            <h2>Explorar</h2>
          </div>
          <SearchInput
            placeholder="Buscar mangá ou autor"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          >
            <MagnifyingGlass size={20} />
          </SearchInput>
        </Title>

        <CenterContainer>
          <FilterContainer>
            <FilterButton
              selected={!categorySelected}
              onClick={() => selectCategory(null)}
            >
              Todos
            </FilterButton>

            {categories.map((category) => (
              <FilterButton
                key={category.id}
                selected={categorySelected === category.id}
                onClick={() => selectCategory(category.id)}
              >
                {category.name}
              </FilterButton>
            ))}
          </FilterContainer>
          <CardsContainer>
            {filteredMangas.map((manga) => (
              <PopularCard
                key={manga.id}
                size="lg"
                author={manga.author}
                name={manga.name}
                cover={manga.cover_url}
                rating={manga.rating}
                onClick={() => selectManga(manga)}
                alreadyRead={manga.alreadyRead}
              />
            ))}
          </CardsContainer>
        </CenterContainer>
      </Template>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // Capturando as infos da Sessão
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  // Buscando as Categorias
  const categories = await prisma.category.findMany();

  // Buscando os mangas com as notas e categorias
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

  // Retornando os mangas com a categoria para poder filtrar
  const mangasFixedRelationWithCategory = mangas.map((manga) => {
    return {
      ...manga,
      categories: manga.categories.map((category) => category.category),
    };
  });

  // Verificando se um manga foi lido pelo usuário logado
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

  // Retorno final dos mangas(mangas|categoria|nota média|verificação de leitura) + categorias(para os botões de filtragem)
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      mangas: JSON.parse(JSON.stringify(mangasWithRating)),
    },
  };
};
