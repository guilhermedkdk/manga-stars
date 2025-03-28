import Image from "next/image";

import bookImg from "@/../public/images/mangas/bleach-cover.jpg";
import userImg from "@/../public/svgs/user.svg";

import { StarsRating } from "../StarsRating";
import {
  CardHeader,
  Container,
  Infos,
  InfosWrapper,
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

        <StarsRating />
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
