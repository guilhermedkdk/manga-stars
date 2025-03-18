import { ChartLineUp, MagnifyingGlass } from "phosphor-react";
import React, { useState } from "react";

import { ButtonFilter } from "@/components/FilterButton";
import PopularCard from "@/components/PopularCard";
import { SearchInput } from "@/components/SearchInput";

import Template from "../template";
import {
  CardsContainer,
  CenterContainer,
  FilterContainer,
  Title,
} from "./styles";

export default function Explore() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  // Fazer a busca de categorias no banco de dados
  const categorySelectorTypes = {
    todos: {
      label: "Todos",
    },
    computacao: {
      label: "Ação",
    },
    educacao: {
      label: "Comédia",
    },
    fantasia: {
      label: "Esporte",
    },
    ficcao: {
      label: "Mistério",
    },
    horror: {
      label: "Romance",
    },
    hqs: {
      label: "Mecha",
    },
    suspense: {
      label: "Sobrenatural",
    },
  };

  return (
    <Template>
      <Title>
        <ChartLineUp size={32} />
        <h2>Explorar</h2>
        <SearchInput placeholder="Buscar livro ou autor">
          <MagnifyingGlass size={20} />
        </SearchInput>
      </Title>

      <CenterContainer>
        <FilterContainer>
          {Object.entries(categorySelectorTypes).map(([key, { label }]) => (
            <ButtonFilter
              key={label}
              id={key}
              title={label}
              value={key}
              selected={activeFilter === label}
              onClick={(e: React.MouseEvent) => {
                const el = e.target as HTMLElement;
                if (el.textContent?.toLowerCase() !== activeFilter) {
                  setActiveFilter(label);
                } else {
                  setActiveFilter("");
                }
              }}
            />
          ))}
        </FilterContainer>
        <CardsContainer>
          <PopularCard isFinished />
          <PopularCard />
          <PopularCard isFinished />
          <PopularCard />
          <PopularCard isFinished />
          <PopularCard />
          <PopularCard isFinished />
          <PopularCard isFinished />
          <PopularCard />
          <PopularCard />
          <PopularCard />
          <PopularCard />
          <PopularCard />
          <PopularCard />
          <PopularCard />
          <PopularCard />
          <PopularCard />
          <PopularCard />
          <PopularCard />
          <PopularCard />
          <PopularCard />
          <PopularCard />
        </CardsContainer>
      </CenterContainer>
    </Template>
  );
}
