import { Warning } from "phosphor-react";

import { CardWrapper, Container, Description } from "./styles";

export default function EmptyCard() {
  return (
    <Container>
      <CardWrapper>
        <Warning size={100} weight="light" />
        <Description>
          <span>Ooops!</span>
          <p>Parece que ainda não há nenhum livro para exibir aqui!</p>
        </Description>
      </CardWrapper>
    </Container>
  );
}
