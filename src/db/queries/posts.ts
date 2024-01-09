import { type Post } from "@prisma/client";
import { prisma } from "@/db";

export type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

/**
 *
 * @param slug
 * @returns
 */
export function fetchPostsByTopicSlug(slug: string): Promise<PostWithData[]> {
  return prisma.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: {
        select: { comments: true }
      }
    }
  });
}
