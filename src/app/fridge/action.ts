"use server"
import { verifySession } from "@/utils/session"
import { getFridgeItems, getUser, countFridgeItems, increaseAmount, decreaseAmount } from "@/utils/DALs"
import { revalidatePath } from "next/cache"


// Get fridge items and user name
//--------------------------------
export async function handleGetFridgeItems() {
    const session = await verifySession()
    if (!session?.userId) {
        return { error: "Unauthorized" }
    }

    try {
        const [items, count] = await Promise.all([
            getFridgeItems(session.userId as string),
            countFridgeItems(session.userId as string)
        ])
        return { success: "Fridge items fetched", items, count }
    } catch (error) {
        return { error: { message: "Failed to get fridge items", error } }
    }
}

export async function handleGetUser() {
    const session = await verifySession()
    if (!session?.userId) {
        return { error: "Unauthorized" }
    }

    try {
        const userName = await getUser(session.userId as string)
        return { success: "User fetched", userName }
    } catch (error) {
        return { error: { message: "Failed to get user", error } }
    }
}


// Update item amout
export async function handleIncreaseAmount(id: string) {
    try {
        await increaseAmount(id)
        revalidatePath("/fridge")
        console.log("Amount increased")
        return { success: "Amount increased" }
    } catch (error) {
        console.log("Error increase amount", error)
        return { error: { message: "Failed to increase amount", error } }
    }
}

export async function handleDecreaseAmount(id: string) {
    try {
        await decreaseAmount(id)
        revalidatePath("/fridge")
        console.log("Amount decreased")
        return { success: "Amount decreased" }
    } catch (error) {
        console.log("Error decrease amount", error)
        return { error: { message: "Failed to decrease amount", error } }
    }
}