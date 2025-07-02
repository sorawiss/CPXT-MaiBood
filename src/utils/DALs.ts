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