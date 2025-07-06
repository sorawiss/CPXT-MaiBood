"use server"
import bcrypt from "bcryptjs";
import { prismaDB } from "@/lib/prisma-client";
import { createSession } from "@/utils/session";


export async function handleRegister(formData: FormData) {
    const name = formData.get("name") as string;
    const phone_number = formData.get("phone_number") as string;
    const password = formData.get("password") as string;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prismaDB.user.findUnique({
        where: {
            phone_number
        }
    })
    if (existingUser) {
        console.log("User already exists");
        return { error: "User already exists" }
    }


    const user = await prismaDB.user.create({
        data: {
            name,
            phone_number,
            hashed_password: hashedPassword
        }
    })

    if (user) {
        await createSession(user.id);
    }

    console.log("user created successfully", user);
}