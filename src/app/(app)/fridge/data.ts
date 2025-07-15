import { verifySession } from "@/utils/session"
import { getFridgeItems, getUser, countFridgeItems } from "@/utils/DALs"
import { unstable_cache } from "next/cache"


export async function getFridgeItemsData() {
    const session = await verifySession()
    if (!session?.userId) {
        return { items: [], count: 0 }
    }

    const cachedGetFridgeItems = unstable_cache(
        async (userId: string) => getFridgeItems(userId),
        ['fridge-items'],
        { tags: ['fridge-items'] }
    )

    const cachedCountFridgeItems = unstable_cache(
        async (userId: string) => countFridgeItems(userId),
        ['fridge-count'],
        { tags: ['fridge-items'] }
    )

    try {
        const [items, count] = await Promise.all([
            cachedGetFridgeItems(session.userId as string),
            cachedCountFridgeItems(session.userId as string)
        ])
        return { items, count }
    } catch (error) {
        console.error("Failed to get fridge items:", error);
        return { items: [], count: 0 };
    }
}

export async function getUserData() {
    const session = await verifySession()
    if (!session?.userId) {
        return { userName: null }
    }

    try {
        const userName = await getUser(session.userId as string)
        return { userName }
    } catch (error) {
        console.error("Failed to get user:", error);
        return { userName: null };
    }
} 