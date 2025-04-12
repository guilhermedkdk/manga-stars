import Image from "next/image";
import { signIn } from "next-auth/react";
import { X } from "phosphor-react";

import github from "@/../public/svgs/github.svg";
import google from "@/../public/svgs/google.svg";

import { Portal } from "../Portal";
import { CloseButton, ModalButton, ModalWrapper } from "./styles";

interface LoginModalProps {
  onClose: () => void;
}

export function LoginModal({ onClose }: LoginModalProps) {
  async function handleSignIn(provider: string) {
    if (provider === "google") {
      await signIn("google", { callbackUrl: "/home" });
    } else if (provider === "github") {
      await signIn("github", { callbackUrl: "/home" });
    }
  }

  return (
    <Portal>
      <ModalWrapper>
        <CloseButton
          title="Fechar Tela de Login"
          type="button"
          onClick={onClose}
        >
          <X size={24} />
        </CloseButton>

        <h4>Faça login para deixar sua avaliação</h4>

        <ModalButton onClick={() => handleSignIn("google")}>
          <Image src={google} height={32} priority alt="Logotipo do Google" />
          Entrar com o Google
        </ModalButton>

        <ModalButton onClick={() => handleSignIn("github")}>
          <Image src={github} height={32} priority alt="Logotipo do GitHub" />
          Entrar com o GitHub
        </ModalButton>
      </ModalWrapper>
    </Portal>
  );
}
