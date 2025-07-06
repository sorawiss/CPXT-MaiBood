"use server"

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


const key = new TextEncoder().encode(process.env.JWT_KEY)


const cookie = {
    name: "user-session",
    duration: 60 * 60 * 24 * 30, // 30 days
    options: {
        httpOnly: true,
        secure: true,
        sameSite: "lax" as const,
        path: "/",
    }
}


interface SessionPayload {
    userId: string;
    [key: string]: unknown;
}

// Encrypt
export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1h")
        .setIssuedAt()
        .sign(key);
}


// Decrypt
export async function decrypt(session: string) {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ["HS256"]
        });
        return payload;
    } catch (error) {
        console.error(error);
        return null;
    }
}


// Create a session for the user
//--------------------------------
export async function createSession(userId: string) {
    const session = await encrypt({ userId });
    const expire = new Date(Date.now() + cookie.duration)

    const cookieStore = await cookies()
    cookieStore.set(cookie.name, session, { ...cookie.options, expires: expire })

    redirect("/")
}


// Verify the session
//--------------------------------
export async function verifySession() {
    const cookieStore = await cookies()
    const session = cookieStore.get(cookie.name)?.value

    if (!session) {
        redirect("/login")
    }

    const user = await decrypt(session)

    if (!user) {
        redirect("/login")
    }

    return user
}


// Delete the session
//--------------------------------
export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete(cookie.name)
    redirect("/login")
}




