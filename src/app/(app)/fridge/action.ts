"use server"
import { increaseAmount, decreaseAmount, deleteItem, updateStatus, StatusType } from "@/utils/DALs"
import { revalidateTag } from "next/cache"

// Update item amout
export async function handleIncreaseAmount(id: string) {
    try {
        await increaseAmount(id)
        revalidateTag("fridge-items")
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
        revalidateTag("fridge-items")
        console.log("Amount decreased")
        return { success: "Amount decreased" }
    } catch (error) {
        console.log("Error decrease amount", error)
        return { error: { message: "Failed to decrease amount", error } }
    }
}


// Delete item
export async function handleDeleteItem(id: string) {
    try {
        await deleteItem(id)
        revalidateTag("fridge-items")
        console.log("Item deleted")
        return { success: "Item deleted" }
    } catch (error) {
        console.log("Error delete item", error)
        return { error: { message: "Failed to delete item", error } }
    }
}

// Update status
export async function handleUpdateStatus(id: string, status: StatusType) {
    try {
        await updateStatus(id, status)
        revalidateTag("fridge-items")
        console.log("Status updated")
        return { success: "Status updated" }
    } catch (error) {
        console.log("Error updating status", error)
        return { error: { message: "Failed to update status", error } }
    }
}