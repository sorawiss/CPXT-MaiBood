"use server"

import { revalidatePath, revalidateTag } from "next/cache";
import { createNotification } from "@/utils/DALs";
import { getCurrentUser } from "@/utils/user";


export const sendNotification = async (postOwnerId: string, foodId: string) => {
    // Check if user is logged in
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return {
            error: "Please login to send notification",
        };
    }

    try {
        await createNotification(postOwnerId, currentUser.id, foodId);
        revalidatePath("/notification");
        revalidateTag('post');
        return {
            success: "Notification sent successfully",
        };
    } catch (error) {
        return {
            error: "Failed to send notification",
        };
    }
}; 