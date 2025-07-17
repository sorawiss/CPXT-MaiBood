"use server";
import { verifySession } from "@/utils/session";
import { revalidatePath, revalidateTag } from "next/cache";
import { shareFridge, createSellingItem } from "@/utils/DALs";
import { redirect } from "next/navigation";

export async function handleShare(formData: FormData) {
  const session = await verifySession();
  if (!session?.userId) {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id") as string;
  const price = Number(formData.get("price")) || 0;
  const name = formData.get("item") as string;
  const description = formData.get("description") as string || "";
  const category = formData.get("category") as string || "";
  const exp_date = formData.get("expiry_date") as string;
  const amount = Number(formData.get("amount")) || 1;
  const image_url = formData.get("image_url") as string;


  if (id && id.trim() !== "") {
    await shareFridge({
      id,
      price,
      name,
      description,
      category,
      exp_date,
      image: image_url,
    });
  } else {
    await createSellingItem({
      name,
      amount,
      exp_date,
      userId: session.userId as string,
      category,
      price,
      description,
      image: image_url,
    });
  }

  revalidateTag("fridge-items");
  revalidateTag("selling-fridge-items");
  revalidateTag("post");
  revalidatePath("/");
  revalidatePath("/fridge");
  redirect("/fridge");
}



