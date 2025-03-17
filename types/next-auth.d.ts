import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      hasConsented?: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    hasConsented?: boolean;
  }
}
