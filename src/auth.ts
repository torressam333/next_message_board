import NextAuth from "next-auth";
import GitHubProvier from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET)
  throw new Error("Missing GitHub oauth credentials");

// @see NextAuth constructor for all destructurable properties
export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvier({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET
    })
  ],
  callbacks: {
    // Bug for next-auth
    async session({ session, user }: any) {
      if (session && user) session.user.id = user.id;

      return session;
    }
  }
});
