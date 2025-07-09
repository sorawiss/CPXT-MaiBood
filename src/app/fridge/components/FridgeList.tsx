"use client"

interface FridgeItem {
    id: string;
    name: string;
    amount: number;
    status: 'fresh' | 'selling' | 'sold' | 'expired';
    user_id: string;
    created_at: Date;
    updated_at: Date;
    exp_date: Date;
}

interface FridgeItems {
    success?: string;
    items?: FridgeItem[];
    error?: string | { message: string; error: unknown };
}

function FridgeList({ fridgeItems, count }: { fridgeItems: FridgeItems, count: number }) {
    console.log("fridgeItems", fridgeItems)
    return (
        <div className="FridgeListContainer w-full flex flex-col gap-[1rem] " >
            {/* HeaderInfo */}
            <p className="text-textprimary " >อาหารในตู้เย็น {count} รายการ</p>
            {fridgeItems.items && fridgeItems.items.map((item: FridgeItem) => (
                <div className="FridgeItem w-full bg-backgroundsecondary rounded-2xl px-[1.5rem] 
                    h-[4.5rem] flex items-center justify-between " key={item.id}>
                    <div className="ItemInfo">
                        <p className="text-textprimary " >{item.name}</p>
                        <p className="p4 text-textsecondary " >หมดอายุ {item.exp_date.toLocaleDateString()} </p>
                    </div>

                    {/* Amount */}
                    <div className="Amount flex gap-[0.5rem] " >
                        <button className="text-textprimary " >-</button>
                        <p className=" text-textsecondary " >{item.amount}</p>
                        <button className="text-textprimary " >+</button>
                    </div>

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