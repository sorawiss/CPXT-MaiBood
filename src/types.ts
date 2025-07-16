import { Fridge, User } from "@prisma/client";

export type PostWithUser = Fridge & {
    user: User
} 