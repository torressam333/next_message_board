"use server";
import { z } from "zod";

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

  // TODO: revalidate homepage cache

  // No errors? Return empty errors object to maintain
  // exprected TS return type shape
  return {
    errors: {}
  };
}
