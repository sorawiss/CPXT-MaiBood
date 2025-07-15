import { verifySession } from "@/utils/session";
import { prismaDB } from "@/lib/prisma-client";

export async function getUserData() {
    const session = await verifySession();
    if (!session?.userId) return null;
    return prismaDB.user.findUnique({
        where: { id: session.userId as string },
        select: { id: true, name: true, latitude: true, longitude: true, post_code: true }
    });
} 