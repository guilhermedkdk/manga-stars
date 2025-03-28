import Image from "next/image";

import bookImg from "@/../public/images/mangas/hunterxhunter-cover.jpg";

import { StarsRating } from "../StarsRating";
import { Container, Infos, InfosWrapper, ReadNotification } from "./styles";

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

        <StarsRating rating={2} />
      </InfosWrapper>
    </Container>
  );
}
