import { prisma } from "..";
import { type Comment } from "@prisma/client";

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
};

/**
 *
 * @param postId
 * @returns
 */
export function fetchCommentsByPostId(
  postId: string
): Promise<CommentWithAuthor[]> {
  return prisma.comment.findMany({
    where: { postId },
    include: {
      user: { select: { name: true, image: true } }
    }
  });
}
