import Image from "next/image";
import { Star } from "phosphor-react";

import bookImg from "@/../public/mangas/bleach-cover.jpg";
import userImg from "@/../public/user.svg";

import {
  CardHeader,
  Container,
  Infos,
  InfosWrapper,
  Rating,
  UserImageWrapper,
} from "./styles";

export default function ReviewCard() {
  return (
    <Container>
      <CardHeader>
        <UserImageWrapper>
          <Image width={40} height={40} src={userImg} alt="" />
        </UserImageWrapper>

        <Infos>
          <>Jaxson Dias</>
          <span>Hoje</span>
        </Infos>

        <Rating>
          <Star size={16} weight="fill" />
          <Star size={16} weight="fill" />
          <Star size={16} weight="fill" />
          <Star size={16} weight="fill" />
          <Star size={16} />
        </Rating>
      </CardHeader>

      <InfosWrapper>
        <Image
          width={108}
          height={152}
          src={bookImg}
          alt=""
          style={{ borderRadius: "4px" }}
        />
        <Infos>
          <strong>Bleach</strong>
          <span>Tite Kubo</span>
          <p>
            Semper et sapien proin vitae nisi. Feugiat neque integer donec et
            aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo
            a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed
            vulputate massa velit nibh...
          </p>
        </Infos>
      </InfosWrapper>
    </Container>
  );
}
