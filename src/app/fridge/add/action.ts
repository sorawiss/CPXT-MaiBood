"use server";
import { verifySession } from "@/utils/session";
import { addToFridge } from "@/utils/DALs";
import { revalidatePath } from "next/cache";

export async function handleAddToFridge(formData: FormData) {
  const session = await verifySession();
  if (!session?.userId) {
    throw new Error("Unauthorized");
  }
  const item = formData.get("item");
  const amount = formData.get("amount");
  const expiry_date = formData.get("expiry_date");

  if (!item || !amount || !expiry_date) {
    throw new Error("Missing fields");
  }

  await addToFridge(
    item as string,
    Number(amount),
    new Date(expiry_date as string),
    session.userId as string
  );

  revalidatePath("/fridge")
}


