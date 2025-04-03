import { Manga, Rating } from "@prisma/client";
import Image from "next/image";

import { getDateFormattedAndRelative } from "@/utils/timeFormatter";

import StarsRating from "../StarsRating";
import {
  CardInfos,
  CardWrapper,
  Container,
  Description,
  Infos,
  InfosWrapper,
  ReadNotice,
} from "./styles";

interface ProfileCardProps {
  manga: Manga;
  rating: Rating;
}

export default function ProfileCard({ manga, rating }: ProfileCardProps) {
  const { dateFormatted, dateRelativeToNow, dateString } =
    getDateFormattedAndRelative(rating.created_at);

  const isFinished = true;
  return (
    <Container>
      <time title={dateFormatted} dateTime={dateString}>
        {dateRelativeToNow}
      </time>
      <CardWrapper>
        <CardInfos>
          <Image
            width={108}
            height={152}
            src={`/${manga.cover_url}`}
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
              <strong>{manga.name}</strong>
              <span>{manga.author}</span>
            </Infos>

            <StarsRating rating={rating.rate} />
          </InfosWrapper>
        </CardInfos>
        <Description>{rating.description}</Description>
      </CardWrapper>
    </Container>
  );
}
