import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db"; // adapte le chemin si besoin
import { adminLoginSchema } from "../validations/schemas";

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const validation = adminLoginSchema.safeParse(credentials);
          if (!validation.success) {
            return null;
          }

          // Prisma : recherche l'admin par email
          const admin = await prisma.admin.findUnique({
            where: { email: credentials.email },
          });

          if (!admin) {
            return null;
          }

          // Compare le mot de passe hashé
          const isValid = await bcrypt.compare(
            credentials.password,
            admin.password
          );
          if (!isValid) {
            return null;
          }

          return {
            id: admin.id,
            email: admin.email,
          };
        } catch (error) {
          console.error("Erreur authentification:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
