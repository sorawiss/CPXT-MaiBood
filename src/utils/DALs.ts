import { prismaDB } from "@/lib/prisma-client"
import { unstable_cache } from "next/cache"


export enum StatusType {
    fresh = "fresh",
    selling = "selling",
    sold = "sold",
    expired = "expired",
    eat = "eat"
}




// User DALs
//--------------------------------
// Get user name
export const getUser = unstable_cache(
    async (userId: string) => {
        console.log(`(Re)validating user ${userId}`)
        const user = await prismaDB.user.findUnique({
            where: { id: userId },
            select: { name: true }
        })
        return user
    },
    ['user'],
    {
        tags: ['user'],
        revalidate: 3600 // Cache for 1 hour
    }
)

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
export const getFridgeItems = unstable_cache(
    async (userId: string) => {
        console.log(`(Re)validating fridge items for ${userId}`)
        return prismaDB.fridge.findMany({
            where: {
                user_id: userId,
                status: {
                    in: [StatusType.fresh, StatusType.selling]
                }
            },
            orderBy: { exp_date: "asc" }
        })
    },
    ['fridge-items'],
    {
        tags: ['fridge-items'],
        revalidate: 60 // Cache for 1 minute
    }
)

// Count fridge items
export const countFridgeItems = unstable_cache(
    async (userId: string) => {
        console.log(`(Re)validating fridge item count for ${userId}`)
        return prismaDB.fridge.count({
            where: {
                user_id: userId,
                status: {
                    in: [StatusType.fresh, StatusType.selling]
                }
            }
        })
    },
    ['fridge-items-count'],
    {
        tags: ['fridge-items'], // Use the same tag so it revalidates with the list
        revalidate: 60 // Cache for 1 minute
    }
)


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


// Delete item
export async function deleteItem(id: string) {
    await prismaDB.fridge.delete({
        where: {
            id: id
        }
    })
}


// Update status
export async function updateStatus(id: string, status: StatusType) {
    await prismaDB.fridge.update({
        where: {
            id: id
        },
        data: {
            status: status
        }
    })
}



// User DALs
//--------------------------------
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