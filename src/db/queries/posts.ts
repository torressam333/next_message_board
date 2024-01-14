import { type Post } from "@prisma/client";
import { prisma } from "@/db";

export type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

// Another way to declare above type
// export type PostWithData = Awaited<
//   ReturnType<typeof fetchPostsByTopicSlug>
// >[number];

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

/**
 *
 * @param slug
 * @returns
 */
export function fetchTopPosts(): Promise<PostWithData[]> {
  return prisma.post.findMany({
    orderBy: [
      {
        comments: {
          _count: "desc"
        }
      }
    ],
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: {
        select: { comments: true }
      }
    },
    take: 5
  });
}
