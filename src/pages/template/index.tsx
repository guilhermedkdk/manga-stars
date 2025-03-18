import { ReactNode } from "react";

import Sidebar from "@/components/Sidebar";

import { Container } from "./styles";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <Container>
      <Sidebar />
      <main>{children}</main>
    </Container>
  );
}
