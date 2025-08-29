import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '../mongodb';
import { Admin } from '../models/Admin';
import { adminLoginSchema } from '../validations/schemas';

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
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

          await dbConnect();
          const admin = await Admin.findOne({ email: credentials.email });

          if (!admin) {
            return null;
          }

          const isValid = await admin.comparePassword(credentials.password);
          if (!isValid) {
            return null;
          }

          return {
            id: admin._id.toString(),
            email: admin.email,
          };
        } catch (error) {
          console.error('Erreur authentification:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};