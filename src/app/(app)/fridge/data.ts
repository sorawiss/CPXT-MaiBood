import { verifySession } from "@/utils/session"
import { getFridgeItems, getUser, countFridgeItems } from "@/utils/DALs"


export async function getFridgeItemsData() {
    const session = await verifySession()
    if (!session?.userId) {
        return { items: [], count: 0 }
    }

    try {
        const [items, count] = await Promise.all([
            getFridgeItems(session.userId as string),
            countFridgeItems(session.userId as string)
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