"use server"
import { prismaDB } from "@/lib/prisma-client";
import bcrypt from "bcryptjs";
import { createSession } from "@/utils/session";



export async function handleLogin(formData: FormData) {
    const phone_number = formData.get("phone_number") as string;
    const password = formData.get("password") as string;

    const user = await prismaDB.user.findUnique({
        where: { phone_number }
    })
    if (!user) {
        return { error: "User not found" }
    }


    const isPasswordValid = await bcrypt.compare(password, user.hashed_password)
    if (!isPasswordValid) {
        return { error: "Invalid password" }
    }

    await createSession(user.id)
    return user


}