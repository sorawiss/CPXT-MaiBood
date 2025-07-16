"use server";

import { prismaDB } from "@/lib/prisma-client";
import { revalidateTag } from "next/cache";
import { StatusType } from "@/utils/DALs";

export async function acceptNotification(notificationId: string) {
    try {
        await prismaDB.$transaction(async (prisma) => {
            const notification = await prisma.notification.findUnique({
                where: { id: notificationId },
                select: { fridge_id: true }
            });

            if (!notification) {
                throw new Error("Notification not found");
            }

            const fridgeItem = await prisma.fridge.findUnique({
                where: { id: notification.fridge_id },
                select: { price: true }
            });

            if (!fridgeItem) {
                throw new Error("Fridge item not found");
            }

            const newStatus = (fridgeItem.price ?? 0) > 0 ? StatusType.sold : StatusType.free;

            await prisma.fridge.update({
                where: { id: notification.fridge_id },
                data: { status: newStatus },
            });

            await prisma.notification.update({
                where: { id: notificationId },
                data: { isAccepted: true },
            });
        });

        revalidateTag("notifications");
        revalidateTag("fridge-items");
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