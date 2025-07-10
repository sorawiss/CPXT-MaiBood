"use server"
import { increaseAmount, decreaseAmount } from "@/utils/DALs"
import { revalidatePath } from "next/cache"

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