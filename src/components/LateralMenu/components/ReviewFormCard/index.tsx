import Image from "next/image";
import { useSession } from "next-auth/react";
import { Check, Star, X } from "phosphor-react";
import { ChangeEvent, useState } from "react";
import { Rating } from "react-simple-star-rating";

import avatarPlaceholder from "@/../public/svgs/user.svg";

import {
  ActionButton,
  ButtonsContainer,
  CharacterCounter,
  Container,
  Header,
  ReviewForm,
  ReviewFormContainer,
  User,
} from "./styles";

interface ReviewFormCardProps {
  onClose: () => void;
}

export function ReviewFormCard({ onClose }: ReviewFormCardProps) {
  const [characterCount, setCharacterCount] = useState(0);

  function changeCharacterCount(event: ChangeEvent<HTMLTextAreaElement>) {
    setCharacterCount(event.target.value.length);
  }

  const [rating, setRating] = useState(0);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const session = useSession();

  return (
    <Container>
      <Header>
        <User>
          <Image
            src={session.data?.user?.image || avatarPlaceholder}
            alt=""
            width="40"
            height="40"
            style={{
              objectFit: "cover",
            }}
          />
          <div>
            <h5>{session.data?.user?.name}</h5>
          </div>
        </User>

        <Rating
          onClick={handleRating}
          emptyIcon={<Star size={24} />}
          fillIcon={<Star weight="fill" size={24} />}
          emptyColor="#8381D9"
          fillColor="#8381D9"
        />
      </Header>

      <ReviewFormContainer>
        <ReviewForm
          placeholder="Escreva sua avaliação"
          maxLength={450}
          onChange={changeCharacterCount}
        />
        <CharacterCounter>{characterCount}/450</CharacterCounter>
      </ReviewFormContainer>

      <ButtonsContainer>
        <ActionButton
          title="Fechar formulário de avaliação"
          type="button"
          onClick={onClose}
        >
          <X size={24} color="#50B2C0" />
        </ActionButton>

        <ActionButton
          title="Enviar avaliação"
          type="button"
          /* onClick={} */
        >
          <Check size={24} color="#8381D9" />
        </ActionButton>
      </ButtonsContainer>
    </Container>
  );
}
