"use client"

interface FridgeItem {
    id: string;
    name: string;
    amount: number;
    status: 'fresh' | 'selling' | 'sold' | 'expired';
    user_id: string;
    created_at: Date;
    updated_at: Date;
}

interface FridgeItems {
    success?: string;
    items?: FridgeItem[];
    error?: string | { message: string; error: unknown };
}

function FridgeList({ fridgeItems }: { fridgeItems: FridgeItems }) {
    console.log("fridgeItems", fridgeItems)
    return (
        <div>
            {fridgeItems.items && fridgeItems.items.map((item: FridgeItem) => (
                <div key={item.id}>{item.name}</div>
            ))}

            {fridgeItems.error && (
                <div>
                    {typeof fridgeItems.error === 'string' 
                        ? fridgeItems.error 
                        : fridgeItems.error.message
                    }
                </div>
            )}
        </div>
    )
}
export default FridgeList