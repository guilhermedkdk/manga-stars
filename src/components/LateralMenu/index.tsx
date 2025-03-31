import { X } from "phosphor-react";

import { MangaCard } from "./MangaCard";
import { RatingCard } from "./RatingCard";
import { CloseButton, Container, SideMenu, Title } from "./styles";

interface MangaReviewsSidebarProps {
  handleCloseMenu(): void;
}

export function LateralMenu({ handleCloseMenu }: MangaReviewsSidebarProps) {
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
        <MangaCard />
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
