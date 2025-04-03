import { HTMLAttributes, ReactNode } from "react";

import { ButtonContainer } from "./styles";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  selected?: boolean;
}

export default function FilterButton({
  children,
  selected,
  ...rest
}: ButtonProps) {
  return (
    <ButtonContainer selected={selected} {...rest}>
      {children}
    </ButtonContainer>
  );
}
