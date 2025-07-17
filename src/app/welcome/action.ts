"use server";

import { prismaDB } from "@/lib/prisma-client";
import { createSession } from "@/utils/session";
import { redirect } from "next/navigation";

export async function handleGuestLogin() {
    const phone_number = "0611607708";

    const user = await prismaDB.user.findUnique({
        where: { phone_number }
    });

    if (!user) {
        throw new Error("Demo user not found in database.");
    }

    await createSession(user.id);
    redirect('/');
} 