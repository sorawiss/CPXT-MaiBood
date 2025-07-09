"use client"
import { handleDecreaseAmount, handleIncreaseAmount } from "../action";
import { useTransition, useState } from "react";


interface FridgeItem {
    id: string;
    name: string;
    amount: number;
    status: 'fresh' | 'selling' | 'sold' | 'expired';
    user_id: string;
    created_at: Date;
    updated_at: Date;
}

function FridgeList({ item, exp_date }: { item: FridgeItem, exp_date: any }) {
    const [isPending, startTransition] = useTransition()
    const [amount, setAmount] = useState(item.amount)


    // Increase amount
    function increase() {
        setAmount((amount) => amount + 1)
        startTransition(async () => {
            await handleIncreaseAmount(item.id)
        })
    }

    // Decrease amount
    function decrease() {
        setAmount((amount) => amount - 1)
        startTransition(async () => {
            await handleDecreaseAmount(item.id)
        })
    }


    // Render
    return (
        
            <div className="FridgeItem w-full bg-backgroundsecondary rounded-2xl px-[1.5rem] 
                    h-[4.5rem] flex items-center justify-between " key={item.id}>
                <div className="ItemInfo">
                    <p className="text-textprimary " >{item.name}</p>
                    <p className="p4 text-textsecondary " >หมดอายุ {exp_date} </p>
                </div>

                {/* Amount */}
                <div className="Amount flex gap-[0.5rem] " >
                    <button className="text-makro cursor-pointer "
                        onClick={decrease}
                    >-</button>
                    <p className=" text-textsecondary " >{amount}</p>
                    <button className="text-textprimary cursor-pointer "
                        onClick={increase}
                    >+</button>
                </div>

            </div>



        
    )
}
export default FridgeList