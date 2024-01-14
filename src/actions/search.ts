"use server";

import { redirect } from "next/navigation";

export async function search(formData: FormData) {
  const term = formData.get("term");

  typeof term !== "string" || !term
    ? redirect("/")
    : redirect(`/search?term=${term}`);
}
