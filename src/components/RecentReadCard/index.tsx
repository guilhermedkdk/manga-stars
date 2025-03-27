import Image from "next/image";

import bookImg from "@/../public/mangas/onepiece-cover.jpg";

import { StarsRating } from "../StarsRating";
import { CardHeader, CardInfos, Container, Infos } from "./styles";

export default function RecentReadCard() {
  return (
    <Container>
      <Image
        width={108}
        height={152}
        src={bookImg}
        alt=""
        style={{ borderRadius: "4px" }}
      />

      <CardInfos>
        <CardHeader>
          <Infos>
            <span>Há 2 dias</span>
          </Infos>
          <StarsRating rating={1.5} />
        </CardHeader>

        <Infos>
          <strong>One Piece</strong>
          <span>Eiichiro Oda</span>
          <p>
            Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis.
            Penatibus id vestibulum imperdiet a at imperdiet lectu...
          </p>
        </Infos>
      </CardInfos>
    </Container>
  );
}
