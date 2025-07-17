"use server"

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { unstable_cache } from "next/cache";


const key = new TextEncoder().encode(process.env.JWT_KEY)


const cookie = {
    name: "user-session",
    duration: 60 * 60 * 24 * 30,
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
        .setExpirationTime("30d")
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
    const expire = new Date(Date.now() + cookie.duration * 1000)

    const cookieStore = await cookies()
    cookieStore.set(cookie.name, session, { ...cookie.options, expires: expire })

    redirect("/")
}


// Cached session verification to avoid repeated JWT decryption
const cachedVerifySession = unstable_cache(
    async (sessionToken: string) => {
        console.log('(Re)validating session token')
        const user = await decrypt(sessionToken);
        if (!user) {
            return null;
        }
        return user;
    },
    ['session-verification'],
    {
        tags: ['session'],
        revalidate: 300 
    }
);

// Verify the session
//--------------------------------
export async function verifySession() {
    console.log('Verifying session')
    const cookieStore = await cookies()
    const session = cookieStore.get(cookie.name)?.value

    if (!session) {
        redirect("/welcome")
    }

    const user = await cachedVerifySession(session);

    if (!user) {
        redirect("/welcome")
    }

    return user
}


// Get session without redirecting
//--------------------------------
export async function getSession() {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get(cookie.name)?.value

    if (!sessionToken) {
        redirect("/welcome")
    }
    return await cachedVerifySession(sessionToken);
}


// Delete the session
//--------------------------------
export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete(cookie.name)
    redirect("/welcome")
}




