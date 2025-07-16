import { prismaDB } from "@/lib/prisma-client";
import { getSession } from "./session";
import { unstable_cache } from "next/cache";

const getCachedUserById = unstable_cache(
    async (userId: string) => {
        if (!userId) return null;

        const user = await prismaDB.user.findUnique({
            where: { id: userId },
        });
        return user;
    },
    ['user-by-id'],
    {
        tags: ['user'],
        revalidate: 3600,
    }
);

export const getCurrentUser = async () => {
    const session = await getSession();
    if (!session?.userId) {
        return null;
    }

    return getCachedUserById(session.userId as string);
}; 