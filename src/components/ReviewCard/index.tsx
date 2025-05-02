import Image from "next/image";

import { RatingWithUserAndManga } from "@/pages/home/index.page";
import { getDateFormattedAndRelative } from "@/utils/timeFormatter";

import StarsRating from "../StarsRating";
import {
  CardHeader,
  Container,
  Infos,
  InfosWrapper,
  ReadNotice,
  UserImageWrapper,
} from "./styles";

interface ReviewCardProps {
  rating: RatingWithUserAndManga;
}

export default function ReviewCard({ rating }: ReviewCardProps) {
  const { dateFormatted, dateRelativeToNow, dateString } =
    getDateFormattedAndRelative(rating.created_at);

  return (
    <Container>
      <CardHeader>
        <UserImageWrapper href={`/profile/${rating.user.id}`}>
          <Image
            width={40}
            height={40}
            src={`${rating.user.avatar_url}`}
            alt=""
            style={{
              objectFit: "cover",
              overflow: "hidden",
              borderRadius: "50%",
            }}
          />
        </UserImageWrapper>

        <Infos>
          <strong>{rating.user.name}</strong>
          <time title={dateFormatted} dateTime={dateString}>
            {dateRelativeToNow}
          </time>
        </Infos>

        <StarsRating rating={rating.rate} />
      </CardHeader>

      <InfosWrapper>
        {rating.alreadyRead && (
          <ReadNotice>
            <p>LIDO</p>
          </ReadNotice>
        )}
        <Image
          width={108}
          height={152}
          src={`/${rating.manga.cover_url}`}
          alt=""
        />
        <Infos>
          <strong>{rating.manga.name}</strong>
          <span>{rating.manga.author}</span>
          <p>{rating.description}</p>
        </Infos>
      </InfosWrapper>
    </Container>
  );
}
