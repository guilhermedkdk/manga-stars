import Image from "next/image";
import {
  BookmarkSimple,
  BookOpen,
  Books,
  MagnifyingGlass,
  User,
  UserList,
} from "phosphor-react";

import userImg from "@/../public/images/users/guilherme.jpg";
import ProfileCard from "@/components/ProfileCard";
import { SearchInput } from "@/components/SearchInput";

import Template from "../template";
import {
  CardsContainer,
  CardWrapper,
  CenterContainer,
  ImageWrapper,
  Line,
  MainContainer,
  RightContainer,
  Title,
  UserNumber,
  UserStats,
} from "./styles";

export default function Profile() {
  const bestGenre = true;

  return (
    <Template>
      <Title>
        <User size={32} />
        <h2>Perfil</h2>
      </Title>

      <MainContainer>
        <CenterContainer>
          <SearchInput placeholder="Buscar livro ou autor" size={"md"}>
            <MagnifyingGlass size={20} />
          </SearchInput>

          <CardsContainer>
            <CardWrapper>
              <ProfileCard />
            </CardWrapper>
            <CardWrapper>
              <ProfileCard />
            </CardWrapper>
            <CardWrapper>
              <ProfileCard />
            </CardWrapper>
          </CardsContainer>
        </CenterContainer>

        <RightContainer>
          <ImageWrapper>
            <Image
              width={68}
              height={68}
              src={userImg}
              alt=""
              style={{ borderRadius: "50%" }}
            />
          </ImageWrapper>
          <p>Guilherme Peres</p>
          <span>membro desde 2025</span>
          <Line />
          <UserStats>
            <UserNumber>
              <BookOpen size={32} />
              <div>
                <h5>3853</h5>
                <span>Volumes lidas </span>
              </div>
            </UserNumber>
            <UserNumber>
              <Books size={32} />
              <div>
                <h5>10</h5>
                <span>Mangás avaliados </span>
              </div>
            </UserNumber>
            <UserNumber>
              <UserList size={32} />
              <div>
                <h5>8</h5>
                <span>Autores lidos </span>
              </div>
            </UserNumber>
            {bestGenre && (
              <UserNumber>
                <BookmarkSimple size={32} />
                <div>
                  <h5>Ação</h5>
                  <span>Categoria mais lida </span>
                </div>
              </UserNumber>
            )}
          </UserStats>
        </RightContainer>
      </MainContainer>
    </Template>
  );
}
