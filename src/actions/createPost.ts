"use server";
import { z } from "zod";
import { type Post, type Topic } from "@prisma/client";
import { prisma } from "@/db";
import { redirect } from "next/navigation";
import paths from "@/paths";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

// Create zod schema to compare against
const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10)
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  // Grab form values and validate against zod schema
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content")
  });

  if (!result.success)
    return {
      errors: result.error.flatten().fieldErrors
    };

  const session = await auth();
  const topic = await getTopic(slug);

  if (!session || !session.user)
    return { errors: { _form: ["You must be signed in to do this"] } };

  if (!topic || "error" in topic)
    return {
      errors: {
        _form: ["Cannot find related topic"]
      }
    };

  let post: Post;
  try {
    // Insert post into DB via prisma orm
    post = await prisma.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id
      }
    });
  } catch (err: unknown) {
    // Make error available to the client via _form property
    return err instanceof Error
      ? {
          errors: {
            _form: [err.message] // Prisma/Db specific error
          }
        }
      : {
          errors: {
            _form: ["An unexpected error has occurred"]
          }
        };
  }

  // Ensure user sees new topic
  revalidatePath(paths.topicShow(slug));

  // Send user to topic show page
  redirect(paths.postShow(post.title, post.id));
}

/**
 *
 * @param slug
 * @returns
 */
const getTopic = async (slug: string) => {
  let topic;
  try {
    topic = await prisma.topic.findFirst({
      where: { slug }
    });
  } catch (error) {
    return { error };
  }

  return topic;
};
