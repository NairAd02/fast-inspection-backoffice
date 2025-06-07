import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken: string;
    id: string;
    rol?: string
  }

  interface Session {
    accessToken: string;
    payload: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
  }
}