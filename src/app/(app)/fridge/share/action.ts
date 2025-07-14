"use server";
import { verifySession } from "@/utils/session";
import { revalidateTag } from "next/cache";
import { shareFridge } from "@/utils/DALs";
import { redirect } from "next/navigation";

export async function handleShare(formData: FormData) {
  const session = await verifySession();
  if (!session?.userId) {
    throw new Error("Unauthorized");
  }

  await shareFridge({
    id: formData.get("id") as string,
    price: Number(formData.get("price")),
    name: formData.get("item") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    exp_date: formData.get("expiry_date") as string,
  });

  revalidateTag("fridge-items")
  revalidateTag("selling-fridge-items")
  redirect("/fridge")
}


