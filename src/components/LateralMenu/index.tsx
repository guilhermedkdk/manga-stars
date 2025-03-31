import { X } from "phosphor-react";

import { MangaWithRatingAndCategories } from "@/pages/explore/index.page";

import { MangaCard } from "./MangaCard";
import { RatingCard } from "./RatingCard";
import { CloseButton, Container, SideMenu, Title } from "./styles";
interface MangaReviewsSidebarProps {
  handleCloseMenu(): void;
}

interface MangaReviewsSidebarProps {
  handleCloseMenu(): void;
  manga: MangaWithRatingAndCategories;
}

export function LateralMenu({
  handleCloseMenu,
  manga,
}: MangaReviewsSidebarProps) {
  return (
    <Container onClick={handleCloseMenu}>
      <CloseButton
        title="Fechar menu lateral"
        type="button"
        onClick={handleCloseMenu}
      >
        <X size={24} />
      </CloseButton>
      <SideMenu>
        <MangaCard manga={manga} />
        <Title>
          <span>Avaliações</span>
          <a href="">Avaliar</a>
        </Title>
        <RatingCard />
        <RatingCard />
        <RatingCard />
        <RatingCard />
        <RatingCard />
      </SideMenu>
    </Container>
  );
}
