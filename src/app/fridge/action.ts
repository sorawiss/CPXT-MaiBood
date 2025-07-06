"use server"
import { verifySession } from "@/utils/session"
import { addToFridge, getFridgeItems } from "@/utils/DALs"


// Add to fridge
//--------------------------------
export async function handleAddToFridge(formData: FormData) {
    const session = await verifySession()
    if (!session?.userId) {
        return { error: "Unauthorized" }
    }
    const item = formData.get('item')

    if (!item) {
        return { error: "No item" }
    }

    try {
        const result = await addToFridge(item as string, session.userId as string)
        return { success: "Item added to fridge", result }
    } catch (error) {
        return { error: { message: "Failed to add item to fridge", error } }
    }
}


// Get fridge items
//--------------------------------
export async function handleGetFridgeItems() {
    const session = await verifySession()
    if (!session?.userId) {
        return { error: "Unauthorized" }
    }

    try {
        const items = await getFridgeItems(session.userId as string)
        return { success: "Fridge items fetched", items }
    } catch (error) {
        return { error: { message: "Failed to get fridge items", error } }
    }
}