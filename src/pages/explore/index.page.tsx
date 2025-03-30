import { Category, Manga } from "@prisma/client";
import { Binoculars, MagnifyingGlass } from "phosphor-react";
import React, { useState } from "react";

import { ButtonFilter } from "@/components/FilterButton";
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

interface MangaWithRating extends Manga {
  rating: number;
}

export interface ExploreProps {
  categories: Category[];
  mangas: MangaWithRating[];
}

export default function Explore({ categories, mangas }: ExploreProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

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
          <ButtonFilter
            title={"Todos"}
            selected={activeFilter === null}
            onClick={() => setActiveFilter(null)}
          />

          {categories.map((category) => (
            <ButtonFilter
              key={category.id}
              title={category.name}
              selected={activeFilter === category.id}
              onClick={() => setActiveFilter(category.id)}
            />
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
    },
  });

  const mangasWithRating = mangas.map((manga) => {
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
