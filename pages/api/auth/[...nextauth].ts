import { compare } from 'bcrypt';
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  //@ts-ignore
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Hasło", type: "password", placeholder: "hasło" },
      },
      async authorize(credentials: any) {
        if (!credentials.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );
        
        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.id,
        };
      },
    }),
  ],
  // callbacks: {
  //   session: ({ session, token }) => {
  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         id: token.id,
  //         role: token.role,
  //       }
  //     }
  //   },
  //   jwt: ({ token, user }) => {
  //     if (user) {
  //       const u = user as unknown as any
  //       return {
  //         ...token,
  //         id: u.id,
  //         role: u.role,
  //       }
  //     }
  //     return token
  //   }
  // }
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
