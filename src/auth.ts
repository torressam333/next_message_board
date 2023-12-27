import NextAuth from "next-auth";
import GitHubProvier from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET)
  throw new Error("Missing GitHub oauth credentials");

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvier({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET
    })
  ]
});
