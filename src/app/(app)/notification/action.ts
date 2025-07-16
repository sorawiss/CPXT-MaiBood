"use server";

import { prismaDB } from "@/lib/prisma-client";
import { revalidateTag } from "next/cache";

export async function acceptNotification(notificationId: string) {
    try {
        await prismaDB.notification.update({
            where: { id: notificationId },
            data: { isAccepted: true },
        });
        revalidateTag("notifications");
        return { success: true };
    } catch (error) {
        console.error("Failed to accept notification:", error);
        return { error: "Failed to accept notification" };
    }
}

export async function declineNotification(notificationId: string) {
    try {
        await prismaDB.notification.delete({
            where: { id: notificationId },
        });
        revalidateTag("notifications");
        return { success: true };
    } catch (error) {
        console.error("Failed to decline notification:", error);
        return { error: "Failed to decline notification" };
    }
} 