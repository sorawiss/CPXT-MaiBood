import { verifySession } from "@/utils/session";
import { prismaDB } from "@/lib/prisma-client";
import { unstable_cache } from "next/cache";

export async function getUserData() {
    const session = await verifySession();
    if (!session?.userId) return null;
    
    const cachedGetUserData = unstable_cache(
        async (userId: string) => {
            console.log(`(Re)validating user data for ${userId}`)
            return prismaDB.user.findUnique({
                where: { id: userId },
                select: { id: true, name: true, latitude: true, longitude: true, post_code: true }
            });
        },
        ['user-data'],
        {
            tags: ['user-data'],
            revalidate: 300 // Cache for 5 minutes
        }
    );
    
    return cachedGetUserData(session.userId as string);
} 