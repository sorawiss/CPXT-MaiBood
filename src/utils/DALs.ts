"use server"

import { prismaDB } from "@/lib/prisma-client"


// Fridge DALs
//--------------------------------
export async function addToFridge(item: string, userId: string) {
    const addToFridge = await prismaDB.fridge.create({
        data: {
            name: item as string,
            user_id: userId as string
        }
    })
    return addToFridge
}


// Get fridge items
export async function getFridgeItems(userId: string) {
    const fridgeItems = await prismaDB.fridge.findMany({
        where: {
            user_id: userId as string
        }
    })

    return fridgeItems
}