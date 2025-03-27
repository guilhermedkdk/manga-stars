import Image from "next/image";

import bookImg from "../../../public/mangas/jujutsu-cover.jpg";
import { StarsRating } from "../StarsRating";
import {
  CardInfos,
  CardWrapper,
  Container,
  Description,
  Infos,
  InfosWrapper,
  ReadNotice,
} from "./styles";

export default function ProfileCard() {
  const isFinished = true;
  return (
    <Container>
      <time>há X dias</time>
      <CardWrapper>
        <CardInfos>
          <Image
            width={108}
            height={152}
            src={bookImg}
            alt=""
            style={{ borderRadius: "4px" }}
          />

          <InfosWrapper>
            {isFinished && (
              <ReadNotice>
                <p>LIDO</p>
              </ReadNotice>
            )}

            <Infos>
              <strong>Jujutsu Kaisen</strong>
              <span>Gege Akutami</span>
            </Infos>

            <StarsRating rating={3} />
          </InfosWrapper>
        </CardInfos>
        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
          elit.
        </Description>
      </CardWrapper>
    </Container>
  );
}
