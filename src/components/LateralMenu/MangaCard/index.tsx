import Image from "next/image";
import { BookmarkSimple, BookOpen } from "phosphor-react";

import mangaImg from "@/../public/images/mangas/bleach-cover.jpg";
import { StarsRating } from "@/components/StarsRating";

import {
  Container,
  Footer,
  Info,
  MangaContainer,
  MangaNumber,
  Number,
} from "./styles";

export function MangaCard() {
  return (
    <Container>
      <MangaContainer>
        <Image src={mangaImg} alt="" width="171" height="242" />
        <Info>
          <div>
            <h3>Bleach</h3>
            <h4>Tite Kubo</h4>
          </div>
          <div>
            <StarsRating />
            <Number>5 avaliações</Number>
          </div>
        </Info>
      </MangaContainer>
      <Footer>
        <MangaNumber>
          <BookmarkSimple size={32} />
          <div>
            <h5>Categoria</h5>
            <span>Ação, Sobrenatural</span>
          </div>
        </MangaNumber>
        <MangaNumber>
          <BookOpen size={32} />
          <div>
            <h5>Volumes</h5>
            <span>74</span>
          </div>
        </MangaNumber>
      </Footer>
    </Container>
  );
}
