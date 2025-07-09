"use server"
import { verifySession } from "@/utils/session"
import { getFridgeItems, getUser } from "@/utils/DALs"





// Get fridge items and user name
//--------------------------------
export async function handleGetFridgeItemsAndUserName() {
    const session = await verifySession()
    if (!session?.userId) {
        return { error: "Unauthorized" }
    }

    try {
        const [items, userName] = await Promise.all([
            getFridgeItems(session.userId as string),
            getUser(session.userId as string)
        ])
        return { success: "Fridge items fetched", items, userName }
    } catch (error) {
        return { error: { message: "Failed to get fridge items", error } }
    }
}