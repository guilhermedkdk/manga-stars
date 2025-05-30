// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface User {
    id: string | number;
    name: string;
    email: string;
    avatar_url: string;
  }

  interface Session {
    user: User;
  }
}
