import { NextResponse } from "next/server";
import { getCurrentUser } from "@/utils/user";
import { getUser } from "@/utils/DALs";

export async function GET() {
    try {
        const user = await getCurrentUser();
        if (!user || !user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userData = await getUser(user.id);
        if (!userData) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(userData);

    } catch (error) {
        console.error("Failed to get user data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
} 