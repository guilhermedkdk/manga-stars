import { ReactNode } from "react";

import MobileMenu from "@/components/MobileMenu";
import Sidebar from "@/components/Sidebar";

import { Container } from "./styles";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <Container>
      <Sidebar />
      <MobileMenu />
      <main>{children}</main>
    </Container>
  );
}
