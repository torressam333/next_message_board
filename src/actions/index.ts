"use server";
import * as auth from "@/auth";

/**
 * File meant to house needed server actions for authentication
 * via GitHub as the provider
 */
export async function signIn() {
  return auth.signIn("github");
}

export async function signOut() {
  return auth.signOut({
    redirectTo: "/"
  });
}
