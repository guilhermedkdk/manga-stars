import { Category, Manga } from "@prisma/client";
import { Binoculars, MagnifyingGlass } from "phosphor-react";
import React, { useState } from "react";

import { FilterButton } from "@/components/FilterButton";
import PopularCard from "@/components/PopularCard";
import { SearchInput } from "@/components/SearchInput";
import { prisma } from "@/libs/prisma";

import Template from "../template";
import {
  CardsContainer,
  CenterContainer,
  FilterContainer,
  Title,
} from "./styles";

interface MangaWithRatingAndCategories extends Manga {
  rating: number;
  categories: Category[];
}

export interface ExploreProps {
  categories: Category[];
  mangas: MangaWithRatingAndCategories[];
}

export default function Explore({ categories, mangas }: ExploreProps) {
  const [categorySelected, setCategorySelected] = useState<string | null>(null);

  return (
    <Template>
      <Title>
        <Binoculars size={32} />
        <h2>Explorar</h2>
        <SearchInput placeholder="Buscar mangá ou autor">
          <MagnifyingGlass size={20} />
        </SearchInput>
      </Title>

      <CenterContainer>
        <FilterContainer>
          <FilterButton
            selected={!categorySelected}
            onClick={() => setCategorySelected(null)}
          >
            Todos
          </FilterButton>

          {categories.map((category) => (
            <FilterButton
              key={category.id}
              selected={categorySelected === category.id}
              onClick={() => setCategorySelected(category.id)}
            >
              {category.name}
            </FilterButton>
          ))}
        </FilterContainer>
        <CardsContainer>
          {mangas.map((manga) => (
            <PopularCard
              key={manga.id}
              size="lg"
              author={manga.author}
              name={manga.name}
              cover={manga.cover_url}
              rating={manga.rating}
            />
          ))}
        </CardsContainer>
      </CenterContainer>
    </Template>
  );
}
export async function getStaticProps() {
  const categories = await prisma.category.findMany();
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

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      mangas: JSON.parse(JSON.stringify(mangasWithRating)),
    },
    revalidate: 60 * 60 * 24 * 1, // 1 day
  };
}
