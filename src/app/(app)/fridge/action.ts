"use server"
import { increaseAmount, decreaseAmount, deleteItem, updateStatus, StatusType, getFridgeItem } from "@/utils/DALs"
import { revalidateTag } from "next/cache"
import { deleteFileFromSupabase } from "@/utils/file-upload";

// Update item amout
export async function handleIncreaseAmount(id: string) {
    try {
        await increaseAmount(id)
        revalidateTag("fridge-items")
        revalidateTag("selling-fridge-items")
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
        revalidateTag("selling-fridge-items")
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
        const item = await getFridgeItem(id);
        if (item?.image) {
            await deleteFileFromSupabase(item.image, "cpaxt-maibood-bucket");
        }
        await deleteItem(id)
        revalidateTag("fridge-items")
        revalidateTag("selling-fridge-items")
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
        if (status === StatusType.eat || status === StatusType.sold) {
            const item = await getFridgeItem(id);
            if (item?.image) {
                await deleteFileFromSupabase(item.image, "cpaxt-maibood-bucket");
            }
        }
        await updateStatus(id, status)
        revalidateTag("fridge-items")
        revalidateTag("selling-fridge-items")
        revalidateTag("sold-items-count")
        revalidateTag("free-items-count")
        console.log("Status updated")
        return { success: "Status updated" }
    } catch (error) {
        console.log("Error updating status", error)
        return { error: { message: "Failed to update status", error } }
    }
}