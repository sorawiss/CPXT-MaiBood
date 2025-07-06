"use client"

interface FridgeItem {
    id: string;
    name: string;
}

interface FridgeItems {
    items: FridgeItem[];
    error?: string;
}

function FridgeList({ fridgeItems }: { fridgeItems: FridgeItems }) {
    console.log("fridgeItems", fridgeItems)
    return (
        <div>
            {fridgeItems.items.map((item: FridgeItem) => (
                <div key={item.id}>{item.name}</div>
            ))}

            {fridgeItems.error && <div>{fridgeItems.error}</div>}
        </div>
    )
}
export default FridgeList