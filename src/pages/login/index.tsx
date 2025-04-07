import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { RocketLaunch } from "phosphor-react";

import github from "@/../public/svgs/github.svg";
import google from "@/../public/svgs/google.svg";
import loginBackgroundImg from "@/../public/svgs/login-background.svg";
import logoImg from "@/../public/svgs/logo.svg";

import {
  Button,
  ButtonsWrapper,
  Container,
  Hero,
  LogoFull,
  LogoWrapper,
} from "./styles";

export default function Login() {
  const session = useSession();

  return (
    <>
      <Container>
        <LogoFull>
          <Image
            src={loginBackgroundImg}
            className={"image"}
            quality={100}
            priority
            fill
            alt="Logotipo com a imagem de fundo sendo uma ilustração do manga One Piece"
          />
        </LogoFull>

        <LogoWrapper>
          <Image
            src={logoImg}
            width={250}
            className={"logoImage"}
            quality={100}
            priority
            alt="Logotipo"
          />
        </LogoWrapper>

        <Hero>
          <h2>Boas vindas!</h2>

          <h4>Faça seu login ou acesse como visitante</h4>

          <ButtonsWrapper>
            <Button onClick={() => signIn("google")}>
              <Image src={google} height={32} alt="Logotipo do Google" />
              Entrar com o Google
            </Button>

            <Button>
              <Image src={github} height={32} alt="Logotipo do GitHub" />
              Entrar com o GitHub
            </Button>

            <Link href={"/home"}>
              <Button>
                <RocketLaunch size={32} weight="bold" />
                Acessar como visitante
              </Button>
            </Link>
          </ButtonsWrapper>
        </Hero>
      </Container>
    </>
  );
}
