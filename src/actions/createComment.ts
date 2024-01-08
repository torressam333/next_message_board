"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/db";
import paths from "@/paths";

const createCommentSchema = z.object({
  content: z.string().min(3)
});

interface CreateCommentFormState {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}

interface PostMetaData {
  postId: string;
  parentId?: string;
}

export async function createComment(
  { postId, parentId }: PostMetaData,
  formState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const result = createCommentSchema.safeParse({
    content: formData.get("content")
  });

  if (!result.success)
    return {
      errors: result.error.flatten().fieldErrors
    };

  const session = await auth();
  if (!session || !session.user)
    return {
      errors: {
        _form: ["You must sign in to do this."]
      }
    };

  try {
    await prisma.comment.create({
      data: {
        content: result.data.content,
        postId: postId,
        parentId: parentId,
        userId: session.user.id
      }
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message]
        }
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong..."]
        }
      };
    }
  }

  const topic = await prisma.topic.findFirst({
    where: { posts: { some: { id: postId } } }
  });

  if (!topic) {
    return {
      errors: {
        _form: ["Failed to revalidate topic"]
      }
    };
  }

  revalidatePath(paths.postShow(topic.slug, postId));

  return {
    errors: {},
    success: true
  };
}
