import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { decrypt } from "@/utils/session"


// Check if route is protected
export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    const protectedRoutes = ["/fridge"]
    const isProtectedRoute = protectedRoutes.includes(pathname)

    if (isProtectedRoute) {
        const cookieStore = (await cookies()).get("user-session")?.value
        const session = await decrypt(cookieStore)
        if (!session) {
            return NextResponse.redirect(new URL("/login", req.url))
        }
    }

    return NextResponse.next()
}


export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}


