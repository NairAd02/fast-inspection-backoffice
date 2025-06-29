import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "./lib/services/auth";

interface CredentialsType {
  username: string;
  password: string;
}

const isProduction = process.env.AUTH_MODE === "prod";
const useSecureCookies = isProduction;
const cookiePrefix = useSecureCookies ? "__Secure-" : "";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "string" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as CredentialsType;
        const res = await login({
          nombreUsuario: username,
          contrasena: password,
        });

        if (!res.response || res.error) {
          return null;
        }
        const user = res.response;
        return {
          id: user.payload.id,
          rol: user.payload.rol,
          accessToken: user.accessToken,
        };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.rol = user.rol;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      session.user.rol = token.rol as string;
      session.user.email = token.email as string;
      return session;
    },
  },
  trustHost: !isProduction,

  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        domain: process.env.NEXTAUTH_COOKIE_DOMAIN || undefined,
      },
    },
  },
});
