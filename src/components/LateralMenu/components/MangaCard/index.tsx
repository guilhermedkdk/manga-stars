import Image from "next/image";
import { BookmarkSimple, BookOpen } from "phosphor-react";

import StarsRating from "@/components/StarsRating";
import { MangaWithRatingAndCategories } from "@/pages/home/index.page";

import {
  Container,
  Footer,
  Info,
  MangaContainer,
  MangaNumber,
  Number,
} from "./styles";

interface MangaCardProps {
  manga: MangaWithRatingAndCategories;
}

export default function MangaCard({ manga }: MangaCardProps) {
  let numberOfReviews: string;

  if (manga.ratings.length === 1) {
    numberOfReviews = "avaliação";
  } else {
    numberOfReviews = "avaliações";
  }

  return (
    <Container>
      <MangaContainer>
        <Image src={`/${manga.cover_url}`} alt="" width="171" height="242" />
        <Info>
          <div>
            <h3>{manga.name}</h3>
            <h4>{manga.author}</h4>
          </div>
          <div>
            <StarsRating rating={manga.rating} />
            <Number>
              {manga.ratings.length} {numberOfReviews}
            </Number>
          </div>
        </Info>
      </MangaContainer>
      <Footer>
        <MangaNumber>
          <BookmarkSimple size={32} />
          <div>
            <h5>Categoria</h5>
            {manga.categories?.map((category, index) => (
              <span key={category.id}>
                {(index ? ", " : "") + category.name}
              </span>
            ))}
          </div>
        </MangaNumber>
        <MangaNumber>
          <BookOpen size={32} />
          <div>
            <h5>Volumes</h5>
            <span>{manga.total_volumes}</span>
          </div>
        </MangaNumber>
      </Footer>
    </Container>
  );
}
