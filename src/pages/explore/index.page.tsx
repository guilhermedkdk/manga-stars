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

export interface ExploreProps {
  categories: Category[];
  mangas: Manga[];
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
              rating={4}
            />
          ))}
        </CardsContainer>
      </CenterContainer>
    </Template>
  );
}
export async function getStaticProps() {
  const categories = await prisma.category.findMany();
  const mangas = await prisma.manga.findMany();

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      mangas: JSON.parse(JSON.stringify(mangas)),
    },
    revalidate: 60 * 60 * 24 * 1, // 1 day
  };
}
