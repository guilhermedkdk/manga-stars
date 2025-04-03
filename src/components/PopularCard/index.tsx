import Image from "next/image";

import StarsRating from "../StarsRating";
import { Container, Infos, InfosWrapper, ReadNotification } from "./styles";

interface CardSizeProps {
  size?: "sm" | "lg";
  isFinished?: boolean;
  cover: string;
  name: string;
  author: string;
  rating: number;
  onClick?: (e: any) => void;
}

export default function PopularCard({
  size = "sm",
  isFinished,
  cover,
  name,
  author,
  rating,
  ...rest
}: CardSizeProps) {
  return (
    <Container {...rest}>
      {size === "sm" ? (
        <Image
          width={64}
          height={94}
          src={`/${cover}`}
          alt=""
          style={{ borderRadius: "4px" }}
        />
      ) : (
        <Image
          width={108}
          height={152}
          src={`/${cover}`}
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
          <strong>{name}</strong>
          <span>{author}</span>
        </Infos>

        <StarsRating rating={rating} />
      </InfosWrapper>
    </Container>
  );
}
