import { prismaDB } from "@/lib/prisma-client"
import { unstable_cache } from "next/cache"
import { StatusType } from "@prisma/client";
import { safeDate } from "./date-formate";


export { StatusType };
// User DALs
//--------------------------------
// Get user name
export const getUser = unstable_cache(
    async (userId: string) => {
        console.log(`(Re)validating user ${userId}`)
        const user = await prismaDB.user.findUnique({
            where: { id: userId },
            select: { name: true, profile_picture: true, phone_number: true, line: true, instagram: true, facebook: true }
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
        revalidate: 300
    }
)


// Get fridge item image for delete
export async function getFridgeItem(id: string) {
    return prismaDB.fridge.findUnique({
        where: { id },
        select: { image: true },
    });
}


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
            exp_date: safeDate(exp_date),
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
            exp_date: safeDate(exp_date),
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
            select: {
                id: true,
                name: true,
                price: true,
                category: true,
                exp_date: true,
                image: true
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
        revalidate: 300
    }
)


// Count free items
export const countFreeItems = unstable_cache(
    async (userId: string) => {
        return prismaDB.fridge.count({
            where: {
                user_id: userId,
                status: StatusType.free
            }
        })
    },
    ['free-items-count'],
    {
        tags: ['free-items-count'],
        revalidate: 300
    }
)




// Post DALs
//--------------------------------
export const getPost = unstable_cache(
    async (id: string, userId?: string) => {
        console.log(`(Re)validating post ${id}`)
        const post = await prismaDB.fridge.findUnique({
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
                image: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        latitude: true,
                        longitude: true,
                        facebook: true,
                        line: true,
                        instagram: true,
                        phone_number: true,

                    }
                }
            }
        })

        if (!post || !userId) {
            return { ...post, hasSentRequest: false };
        }

        const notification = await prismaDB.notification.findFirst({
            where: {
                senderId: userId,
                fridge_id: id,
            },
        });

        return { ...post, hasSentRequest: !!notification };
    },
    ['post'],
    {
        tags: ['post'],
        revalidate: 300 // Cache for 5 minutes
    }
)

export const createNotification = async (recipientId: string, senderId: string, fridgeId: string) => {
    try {
        const notification = await prismaDB.notification.create({
            data: {
                recipientId,
                senderId,
                fridge_id: fridgeId,
            },
        });
        return notification;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create notification");
    }
};

// Notification DALs
//--------------------------------
export const getNotifications = unstable_cache(
    async (userId: string) => {
        console.log(`(Re)validating notifications for ${userId}`);
        return prismaDB.notification.findMany({
            where: {
                recipientId: userId,
            },
            include: {
                sender: {
                    select: {
                        name: true,
                        profile_picture: true,
                        id: true,
                    },
                },
                fridge: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                created_at: "desc",
            },
        });
    },
    ["notifications"],
    {
        tags: ["notifications"],
        revalidate: 60, // Cache for 1 minute
    }
);