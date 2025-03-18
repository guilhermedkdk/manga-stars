import Image from "next/image";
import { Star } from "phosphor-react";

import bookImg from "@/../public/mangas/hunterxhunter-cover.jpg";

import {
  Container,
  Infos,
  InfosWrapper,
  Rating,
  ReadNotification,
} from "./styles";

interface CardSizeProps {
  size?: "sm" | "lg";
  isFinished?: boolean;
}

export default function PopularCard({ size, isFinished }: CardSizeProps) {
  return (
    <Container>
      {size === "sm" ? (
        <Image
          width={64}
          height={94}
          src={bookImg}
          alt=""
          style={{ borderRadius: "4px" }}
        />
      ) : (
        <Image
          width={108}
          height={152}
          src={bookImg}
          alt=""
          style={{ borderRadius: "4px" }}
        />
      )}

      <InfosWrapper>
        {isFinished && (
          <ReadNotification>
            <p>LIDO</p>
          </ReadNotification>
        )}

        <Infos>
          <strong>Hunter X Hunter</strong>
          <span>Yoshihiro Togashi</span>
        </Infos>

        <Rating>
          <Star size={16} weight="fill" />
          <Star size={16} weight="fill" />
          <Star size={16} weight="fill" />
          <Star size={16} weight="fill" />
          <Star size={16} />
        </Rating>
      </InfosWrapper>
    </Container>
  );
}
