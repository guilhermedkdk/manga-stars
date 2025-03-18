import Image from "next/image";
import { Star } from "phosphor-react";

import bookImg from "@/../public/mangas/onepiece-cover.jpg";

import { CardHeader, CardInfos, Container, Infos, Rating } from "./styles";

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
          <Rating>
            <Star size={16} weight="fill" />
            <Star size={16} weight="fill" />
            <Star size={16} weight="fill" />
            <Star size={16} weight="fill" />
            <Star size={16} />
          </Rating>
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
