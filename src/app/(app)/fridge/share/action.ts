"use server";
import { verifySession } from "@/utils/session";
import { revalidatePath, revalidateTag } from "next/cache";
import { shareFridge, createSellingItem } from "@/utils/DALs";
import { redirect } from "next/navigation";
import { deleteFileFromSupabase, uploadFileToSupabase } from "@/utils/file-upload";
import { compressImage } from "@/utils/image-compression";

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
  const imageFile = formData.get("image") as File;
  
  let imageUrl = "";

  try {
    if (imageFile && imageFile.size > 0) {
        const compressedImage = await compressImage(imageFile);
        const uploadedUrl = await uploadFileToSupabase(compressedImage, "cpaxt-maibood-bucket");
        if (uploadedUrl) {
            imageUrl = uploadedUrl;
        } else {
            throw new Error("Image upload failed");
        }
    }

    if (id && id.trim() !== "") {
      await shareFridge({
        id,
        price,
        name,
        description,
        category,
        exp_date,
        image: imageUrl,
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
        image: imageUrl,
      });
    }
  } catch (error) {
    console.error("Failed to share item:", error);
    if (imageUrl) {
      await deleteFileFromSupabase(imageUrl, "cpaxt-maibood-bucket");
    }
    // Optionally, you can return an error message to the client
    return { error: "Failed to share item. Please try again." };
  }

  revalidateTag("fridge-items");
  revalidateTag("selling-fridge-items");
  revalidateTag("post");
  revalidatePath("/");
  revalidatePath("/fridge");
  redirect("/fridge");
}



