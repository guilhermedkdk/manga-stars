import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Binoculars, ChartLineUp, SignIn, SignOut, User } from "phosphor-react";

import logoImg from "@/../public/svgs/logo.svg";
import sidebarBackground from "@/../public/svgs/sidebar.svg";

import {
  ImageWrapper,
  LoginButton,
  NavButton,
  NavigationWrapper,
  SidebarContainer,
  TopContainer,
} from "./styles";

export default function Sidebar() {
  const session = "authenticated";

  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <SidebarContainer>
      <Image
        src={sidebarBackground}
        fill={true}
        alt={""}
        style={{
          objectFit: "cover",
          overflow: "hidden",
          borderRadius: 12,
          zIndex: -1,
        }}
      />

      <TopContainer>
        <Link href={"/home"}>
          <Image src={logoImg} alt="" width={136} height={32} />
        </Link>

        <NavigationWrapper>
          <NavButton href="/home" active={currentRoute === "/home"}>
            <ChartLineUp size={24} /> Início
          </NavButton>

          <NavButton href="/explore" active={currentRoute === "/explore"}>
            <Binoculars size={24} /> Explorar
          </NavButton>

          {session === "authenticated" && (
            <NavButton href="/profile" active={currentRoute === "/profile"}>
              <User size={24} />
              Perfil
            </NavButton>
          )}
        </NavigationWrapper>
      </TopContainer>

      {session === "authenticated" ? (
        <LoginButton href={"/"}>
          <ImageWrapper>
            <User size={24} />
          </ImageWrapper>
          Guilherme
          <SignOut size={20} color="#F75A68" />
        </LoginButton>
      ) : (
        <LoginButton href={"/"}>
          <strong>Fazer login</strong>
          <SignIn size={20} weight="fill" color="#50B2C0" />
        </LoginButton>
      )}
    </SidebarContainer>
  );
}
