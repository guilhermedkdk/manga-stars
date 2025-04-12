import { Rating as RatingInfo, User as UserPrisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { X } from "phosphor-react";
import { useEffect, useState } from "react";

import { api } from "@/libs/axios";
import { MangaWithRatingAndCategories } from "@/pages/explore/index.page";

import { LoginModal } from "../LoginModal";
import MangaCard from "./components/MangaCard";
import RatingCard from "./components/RatingCard";
import { ReviewFormCard } from "./components/ReviewFormCard";
import {
  CloseButton,
  Container,
  ContainerOverlay,
  LoginButton,
  SideMenu,
  Title,
} from "./styles";

interface MangaReviewsSidebarProps {
  handleCloseMenu(): void;
  manga: MangaWithRatingAndCategories;
}

type RatingProps = RatingInfo & {
  user: UserPrisma;
};

export default function LateralMenu({
  handleCloseMenu,
  manga,
}: MangaReviewsSidebarProps) {
  const session = useSession();

  const [ratings, setRatings] = useState<RatingProps[] | null>(null);

  useEffect(() => {
    async function loadRatings() {
      const response = await api.get(`/mangas/${manga.id}`);
      if (response.data) {
        setRatings(response.data.manga.ratings);
      }
    }
    loadRatings();
  }, [manga.id]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  async function openModal() {
    setIsModalOpen(true);
  }

  async function closeModal() {
    setIsModalOpen(false);
  }

  const [reviewFormIsVisible, setReviewFormIsVisible] = useState(false);

  async function handleChangeReviewFormVisibility() {
    setReviewFormIsVisible((state) => !state);
  }

  return (
    <Container>
      {isModalOpen && <LoginModal onClose={closeModal} />}

      <ContainerOverlay onClick={handleCloseMenu} />

      <SideMenu>
        <CloseButton
          title="Fechar menu lateral"
          type="button"
          onClick={handleCloseMenu}
        >
          <X size={24} />
        </CloseButton>
        <MangaCard manga={manga} />

        <Title>
          <span>Avaliações</span>
          <LoginButton
            onClick={
              session.status === "authenticated"
                ? handleChangeReviewFormVisibility
                : openModal
            }
          >
            <strong>Avaliar</strong>
          </LoginButton>
        </Title>

        {reviewFormIsVisible && (
          <ReviewFormCard onClose={handleChangeReviewFormVisibility} />
        )}

        {ratings?.map((rating) => (
          <RatingCard
            key={rating.id}
            avatar={`/${rating.user.avatar_url}`}
            name={rating.user.name}
            date={rating.created_at}
            rate={rating.rate}
            rating={rating}
            description={rating.description}
          />
        ))}
      </SideMenu>
    </Container>
  );
}
