import { Manga, Rating, User as UserPrisma } from "@prisma/client";
import Image from "next/image";

import { getDateFormattedAndRelative } from "@/utils/timeFormatter";

import StarsRating from "../StarsRating";
import {
  CardHeader,
  Container,
  Infos,
  InfosWrapper,
  UserImageWrapper,
} from "./styles";

export interface CardProps {
  user: UserPrisma;
  manga: Manga;
  rating: Rating;
}

export default function ReviewCard({ user, manga, rating }: CardProps) {
  const { dateFormatted, dateRelativeToNow, dateString } =
    getDateFormattedAndRelative(rating.created_at);

  return (
    <Container>
      <CardHeader>
        <UserImageWrapper>
          <Image
            width={40}
            height={40}
            src={`/${user.avatar_url}`}
            alt=""
            style={{
              objectFit: "cover",
              overflow: "hidden",
              borderRadius: "50%",
            }}
          />
        </UserImageWrapper>

        <Infos>
          <strong>{user?.name}</strong>
          <time title={dateFormatted} dateTime={dateString}>
            {dateRelativeToNow}
          </time>
        </Infos>

        <StarsRating rating={rating.rate} />
      </CardHeader>

      <InfosWrapper>
        <Image
          width={108}
          height={152}
          src={`/${manga.cover_url}`}
          alt=""
          style={{ borderRadius: "4px" }}
        />
        <Infos>
          <strong>{manga.name}</strong>
          <span>{manga.author}</span>
          <p>{rating.description}</p>
        </Infos>
      </InfosWrapper>
    </Container>
  );
}
