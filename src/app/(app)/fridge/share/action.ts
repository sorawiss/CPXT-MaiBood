"use server";
import { verifySession } from "@/utils/session";
import { revalidatePath, revalidateTag } from "next/cache";
import { shareFridge, createSellingItem } from "@/utils/DALs";
import { redirect } from "next/navigation";
import { deleteFileFromSupabase, uploadFileToSupabase } from "@/utils/file-upload";
import { compressImage } from "@/utils/image-compression";

export async function handleShare(formData: FormData) {
  let imageUrl = "";
  try {
    const session = await verifySession();
    if (!session?.userId) {
      return { error: "กรุณาเข้าสู่ระบบก่อนใช้งาน" };
    }

    const id = formData.get("id") as string;
    const price = Number(formData.get("price")) || 0;
    const name = formData.get("item") as string;
    const description = formData.get("description") as string || "";
    const category = formData.get("category") as string || "";
    const exp_date = formData.get("expiry_date") as string;
    const amount = Number(formData.get("amount")) || 1;
    const imageFile = formData.get("image") as File;
    
    // Validate required fields
    if (!name || name.trim() === "") {
      return { error: "กรุณาใส่ชื่ออาหาร" };
    }
    
    if (!exp_date) {
      return { error: "กรุณาใส่วันหมดอายุ" };
    }
    
    if (!amount || amount <= 0) {
      return { error: "กรุณาใส่จำนวนที่ถูกต้อง" };
    }
    
    if (!imageFile || imageFile.size === 0) {
      return { error: "กรุณาเพิ่มรูปภาพ" };
    }
    
    if (imageFile && imageFile.size > 0) {
        const compressedImage = await compressImage(imageFile);
        const uploadedUrl = await uploadFileToSupabase(compressedImage, "cpaxt-maibood-bucket");
        if (uploadedUrl) {
            imageUrl = uploadedUrl;
        } else {
            return { error: "การอัปโหลดรูปภาพล้มเหลว กรุณาลองใหม่อีกครั้ง " };
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
    
    // Revalidate cache
    revalidateTag("fridge-items");
    revalidateTag("selling-fridge-items");
    revalidateTag("post");
    revalidatePath("/");
    revalidatePath("/fridge");

    return { success: true };
      
  } catch (error) {
    console.error("Failed to share item:", error);
    if (imageUrl) {
      // Attempt to clean up the uploaded image if the database operation fails
      await deleteFileFromSupabase(imageUrl, "cpaxt-maibood-bucket");
    }
    return { error: "เกิดข้อผิดพลาดในการแบ่งปันอาหาร กรุณาลองใหม่อีกครั้ง" };
  }
}



