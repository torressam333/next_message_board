"use server";

export async function createTopic(formData: FormData) {
  // Grab form values
  const name = formData.get("name");
  const description = formData.get("description");

  // Add form validation on the server

  console.log(name, description);
  // TODO: revalidate homepage cache
}
