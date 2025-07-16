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

export async function updateUser(userId: string, data: any) {
  return prismaDB.user.update({
    where: { id: userId },
    data,
  });
}

// Fridge DALs
//--------------------------------
export async function addToFridge(item: string, amount: number, expiry_date: Date, userId: string, category: string | null) {
    const addToFridge = await prismaDB.fridge.create({
        data: {
            name: item,
            amount: amount,
            exp_date: expiry_date,
            user_id: userId,
            category: category
        }
    })
    return addToFridge;
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


// Create new item directly for sharing
export async function createSellingItem({ 
  name, 
  amount, 
  exp_date, 
  userId, 
  category, 
  price, 
  description,
  image
}: { 
  name: string, 
  amount: number, 
  exp_date: string, 
  userId: string, 
  category: string, 
  price: number, 
  description: string,
  image?: string
}) {
    return await prismaDB.fridge.create({
        data: {
            name: name,
            amount: amount,
            exp_date: new Date(exp_date),
            user_id: userId,
            category: category,
            price: price,
            description: description,
            status: StatusType.selling,
            image: image
        }
    });
}

// Update existing item
export async function shareFridge({ id, price, name, description, category, exp_date, image }: { id: string, price: number, name: string, description: string, category: string, exp_date: string, image?: string }) {
    await prismaDB.fridge.update({
        where: {
            id: id
        },
        data: {
            price: price,
            status: StatusType.selling,
            name: name,
            description: description,
            category: category,
            exp_date: new Date(exp_date),
            image: image
        }
    })
}


export const getSellingFridgeItems = unstable_cache(
    async () => {
        return prismaDB.fridge.findMany({
            where: {
                status: StatusType.selling
            },
            orderBy: { exp_date: "asc" }
        });
    },
    ['selling-fridge-items'],
    {
        tags: ['fridge-items', 'selling-fridge-items'], // Add both tags for consistency
        revalidate: 30 // Cache for 30 seconds
    }
);


// User DALs
//--------------------------------
export async function addLocation(latitude: number, longitude: number, userId: string, post_code?: string) {
    const data: any = {
        latitude: latitude,
        longitude: longitude
    };
    if (post_code) {
        data.post_code = post_code;
    }
    const addLocation = await prismaDB.user.update({
        where: {
            id: userId as string
        },
        data
    })
    return addLocation
}


// Cout sold items
export const countSoldItems = unstable_cache(
    async (userId: string) => {
    return prismaDB.fridge.count({
        where: {
            user_id: userId,
            status: StatusType.sold
        }
    })
},
    ['sold-items-count'],
    {
        tags: ['sold-items-count'],
        revalidate: 60
    }
)




// Post DALs
//--------------------------------
export const getPost = unstable_cache(
    async (id: string) => {
        console.log(`(Re)validating post ${id}`)
        return prismaDB.fridge.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                category: true,
                created_at: true,
                exp_date: true,
                updated_at: true,
                user: {
                    select: {
                        name: true,
                        latitude: true,
                        longitude: true
                    }
                }
            }
        })
    },
    ['post'],
    {
        tags: ['post'],
        revalidate: 300 // Cache for 5 minutes
    }
)