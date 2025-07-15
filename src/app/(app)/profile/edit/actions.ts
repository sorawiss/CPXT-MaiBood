"use server";

import { updateUser as updateUserDAL } from "@/utils/DALs";
import { revalidatePath } from "next/cache";




export type State = {
  message?: string | null;
};

export async function updateUser(userId: string, prevState: State, formData: FormData) {
  const validatedFields = {
    name: formData.get("name"),
    phone_number: formData.get("phone_number"),
    line: formData.get("line"),
    facebook: formData.get("facebook"),
    instagram: formData.get("instagram"),
    post_code: formData.get("post_code"),
  };

  try {
    await updateUserDAL(userId, validatedFields);
  } catch (e) {
    return {
      message: "Database Error: Failed to Update User.",
    };
  }

  revalidatePath("/profile");
  revalidatePath("/profile/edit");
  return {
    message: "Updated User.",
  };
} 