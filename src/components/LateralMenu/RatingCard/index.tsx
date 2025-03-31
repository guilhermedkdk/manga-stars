import Image from "next/image";

import avatar from "@/../public/images/users/alexandre.jpg";
import { StarsRating } from "@/components/StarsRating";

import { Container, Header, User } from "./styles";

export function RatingCard() {
  return (
    <Container>
      <Header>
        <User>
          <Image src={avatar} alt="" width="40" height="40" />
          <div>
            <h5>Alexandre Morais</h5>
            <time>Hoje</time>
          </div>
        </User>
        <StarsRating rating={4.5} />
      </Header>
      <p>Os arcos finais são os melhores</p>
    </Container>
  );
}
