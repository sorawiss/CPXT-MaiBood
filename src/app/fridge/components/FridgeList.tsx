"use client"


function FridgeList({ fridgeItems }: { fridgeItems: any }) {
    console.log("fridgeItems", fridgeItems)
    return (
        <div>
            {fridgeItems.items.map((item: any) => (
                <div key={item.id}>{item.name}</div>
            ))}

            {fridgeItems.error && <div>{fridgeItems.error}</div>}
        </div>
    )
}
export default FridgeList