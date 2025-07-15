"use server";
import { verifySession } from "@/utils/session";
import { addToFridge } from "@/utils/DALs";
import { revalidateTag } from "next/cache";

type FormState = {
  error?: string;
  success?: string;
};

export async function handleAddToFridge(prevState: FormState, formData: FormData): Promise<FormState> {
  const session = await verifySession();
  if (!session?.userId) {
    return { error: "Unauthorized" };
  }
  
  const item = formData.get("item");
  const amount = formData.get("amount");
  const expiry_date = formData.get("expiry_date");
  const category = formData.get("category");

  if (!item || !amount || !expiry_date) {
    return { error: "Missing required fields" };
  }

  try {
    await addToFridge(
      item as string,
      Number(amount),
      new Date(expiry_date as string),
      session.userId as string,
      category && category !== "" ? category as string : null
    );

    revalidateTag("fridge-items")
    return { success: "Item added successfully" };
  } catch (error) {
    return { error: "Failed to add item" };
  }
}


