import NextAuth from "next-auth";
import GitHubProvier from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvier({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ]
});
