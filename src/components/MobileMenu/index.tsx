import { Divide as Hamburger } from "hamburger-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { Binoculars, ChartLineUp, SignIn, SignOut, User } from "phosphor-react";
import { useState } from "react";

import logoImg from "@/../public/svgs/logo.svg";
import avatarPlaceholder from "@/../public/svgs/user.svg";

import { LoginModal } from "../LoginModal";
import {
  Container,
  HamburgerWrapper,
  ImageWrapper,
  InfosWrapper,
  LoginButton,
  MobileMenuWrapper,
  NavButton,
  NavigationWrapper,
} from "./styles";

export default function MobileMenu() {
  const session = useSession();
  const router = useRouter();
  const currentRoute = router.pathname;

  const [isOpen, setOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  async function openModal() {
    setIsModalOpen(true);
  }

  async function closeModal() {
    setIsModalOpen(false);
  }

  async function handleLogout() {
    signOut({ callbackUrl: "/" });
  }

  return (
    <Container>
      {isModalOpen && <LoginModal onClose={closeModal} />}

      <MobileMenuWrapper>
        <HamburgerWrapper>
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </HamburgerWrapper>

        <div>
          <Link href={"/home"}>
            <Image src={logoImg} alt="" className="logo" />
          </Link>
        </div>

        {isOpen && (
          <NavigationWrapper>
            <div>
              <NavButton href="/home" active={currentRoute === "/home"}>
                <ChartLineUp size={24} /> Início
              </NavButton>

              <NavButton href="/explore" active={currentRoute === "/explore"}>
                <Binoculars size={24} /> Explorar
              </NavButton>

              {session.status === "authenticated" && (
                <NavButton
                  href={`/profile/`}
                  active={currentRoute.includes("profile")}
                >
                  <User size={24} />
                  Perfil
                </NavButton>
              )}
            </div>

            {session.status === "authenticated" ? (
              <InfosWrapper>
                <ImageWrapper>
                  <Image
                    src={session.data.user?.avatar_url || avatarPlaceholder}
                    alt=""
                    width={32}
                    height={32}
                  />
                </ImageWrapper>
                <p>{String(session.data.user?.name).split(" ")[0]}</p>
                <LoginButton>
                  <SignOut size={20} color="#F75A68" onClick={handleLogout} />
                </LoginButton>
              </InfosWrapper>
            ) : (
              <LoginButton onClick={openModal}>
                <strong>Fazer login</strong>
                <SignIn size={20} weight="fill" color="#50B2C0" />
              </LoginButton>
            )}
          </NavigationWrapper>
        )}
      </MobileMenuWrapper>
    </Container>
  );
}
