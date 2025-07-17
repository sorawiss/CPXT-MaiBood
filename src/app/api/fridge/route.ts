import { NextResponse } from "next/server";
import { getCurrentUser } from "@/utils/user";
import { 
    getFridgeItems, 
    increaseAmount, 
    decreaseAmount, 
    deleteItem,
    updateStatus,
    StatusType,
    countItemsByCategory
} from "@/utils/DALs";

// GET - Fetch all fridge items for the current user
export async function GET() {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const [items, categoryCounts] = await Promise.all([
            getFridgeItems(user.id),
            countItemsByCategory(user.id)
        ]);

        return NextResponse.json({ items, categoryCounts });
    } catch (error) {
        console.error("Failed to get fridge items:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// POST - Increase or decrease item amount
export async function POST(request: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { action, id } = await request.json();
        
        if (action === "increase") {
            await increaseAmount(id);
        } else if (action === "decrease") {
            await decreaseAmount(id);
        } else {
            return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }
        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Failed to update amount:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// DELETE - Delete a fridge item
export async function DELETE(request: Request) {
     try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { id } = await request.json();
        await deleteItem(id);
        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Failed to delete item:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// PUT - Update item status
export async function PUT(request: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { id, status } = await request.json();
        await updateStatus(id, status as StatusType);
        return NextResponse.json({ success: true });
        
    } catch (error) {
        console.error("Failed to update status:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
} 