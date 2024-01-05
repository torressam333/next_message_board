"use server";
import { z } from "zod";
import { type Topic } from "@prisma/client";
import { prisma } from "@/db";
import { redirect } from "next/navigation";
import paths from "@/paths";
import { revalidatePath } from "next/cache";

// Create zod schema to compare against
const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Must be lowercase letters or dashes without spaces"
    }),
  description: z.string().min(10)
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  // Grab form values and validate against zod schema
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description")
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    };
  }

  let topic: Topic;

  try {
    // Insert topic into DB via prisma orm
    topic = await prisma.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description
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
  redirect(paths.topicShow(topic.slug));
}
