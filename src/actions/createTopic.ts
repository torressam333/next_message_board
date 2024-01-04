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

export async function createTopic(formData: FormData) {
  // Grab form values and validate against zod schema
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description")
  });

  if (!result.success) console.log(result.error.flatten().fieldErrors);

  // TODO: revalidate homepage cache
}
