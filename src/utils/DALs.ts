"use server"

import { prismaDB } from "@/lib/prisma-client"



// User DALs
//--------------------------------
// Get user name
export async function getUser(userId: string) {
    const user = await prismaDB.user.findUnique({
        where: {
            id: userId as string
        },
        select: {
            name: true
        }
    })
    return user
}




// Fridge DALs
//--------------------------------
export async function addToFridge(item: string, amount: number, expiry_date: Date, userId: string) {
    const addToFridge = await prismaDB.fridge.create({
        data: {
            name: item as string,
            amount: amount,
            exp_date: expiry_date,
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
        },
        orderBy: {
            exp_date: "asc"
        }
    })

    return fridgeItems
}

// Count fridge items
export async function countFridgeItems(userId: string) {
    const count = await prismaDB.fridge.count({
        where: {
            user_id: userId
        }
    })

    return count
}


// Increase amount
export async function increaseAmount(id: string) {
    await prismaDB.fridge.update({
        where: {
            id: id
        },
        data: {
            amount: {
                increment: 1
            }
        }
    })
}


// Decrease amount
export async function decreaseAmount(id: string) {
    await prismaDB.fridge.update({
        where: {
            id: id
        },
        data: {
            amount: {
                decrement: 1
            }
        }
    })
}



// User DALs
export async function addLocation(latitude: number, longitude: number, userId: string) {
    const addLocation = await prismaDB.user.update({
        where: {
            id: userId as string
        },
        data: {
            latitude: latitude,
            longitude: longitude
        }
    })
    return addLocation
}