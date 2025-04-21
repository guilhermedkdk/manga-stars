import { Manga, Rating } from "@prisma/client";
import Image from "next/image";

import { getDateFormattedAndRelative } from "@/utils/timeFormatter";

import StarsRating from "../StarsRating";
import { CardHeader, CardInfos, Container, Infos } from "./styles";

interface RecentReadCardProps {
  manga: Manga;
  rating: Rating;
}

export default function RecentReadCard({ manga, rating }: RecentReadCardProps) {
  const { dateFormatted, dateRelativeToNow, dateString } =
    getDateFormattedAndRelative(rating.created_at);

  return (
    <Container>
      <Image
        width={108}
        height={152}
        src={`/${manga.cover_url}`}
        alt=""
        style={{ borderRadius: "4px" }}
      />

      <CardInfos>
        <CardHeader>
          <Infos>
            <time title={dateFormatted} dateTime={dateString}>
              {dateRelativeToNow}
            </time>
          </Infos>
          <StarsRating rating={rating.rate} />
        </CardHeader>

        <Infos>
          <strong>{manga.name}</strong>
          <span>{manga.author}</span>
          <p>{rating.description}</p>
        </Infos>
      </CardInfos>
    </Container>
  );
}
