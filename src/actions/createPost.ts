"use server";
import { z } from "zod";
import { type Post } from "@prisma/client";
import { prisma } from "@/db";
import { redirect } from "next/navigation";
import paths from "@/paths";
import { revalidatePath } from "next/cache";

// Create zod schema to compare against
const createPostSchema = z.object({
  title: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Must be lowercase letters or dashes without spaces"
    }),
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
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  // Grab form values and validate against zod schema
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content")
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    };
  }

  let post: Post;

  try {
    // Insert topic into DB via prisma orm
    post = await prisma.post.create({
      data: {
        title: result.data.title,
        content: result.data.content
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
  revalidatePath(paths.home());

  // Send user to topic show page
  redirect(paths.postShow(post.slug, post.id));
}
