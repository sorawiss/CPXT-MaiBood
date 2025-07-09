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
        <div className="w-full flex flex-col gap-[1rem] " >
            {fridgeItems.items && fridgeItems.items.map((item: FridgeItem) => (
                <div className="w-full bg-backgroundsecondary rounded-2xl px-[1rem] 
                    py-[0.5rem] " key={item.id}>
                    <p className="text-textprimary " >{item.name}</p>
                </div>
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