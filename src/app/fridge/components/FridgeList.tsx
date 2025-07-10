"use client"
import { handleDecreaseAmount, handleIncreaseAmount, handleDeleteItem } from "../action";
import { useTransition, useState } from "react";


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

function FridgeList({ item }: { item: FridgeItem }) {
    const [isPending, startTransition] = useTransition()
    const [amount, setAmount] = useState(item.amount)
    const [isGone, setIsGone] = useState(false)
    const willExpire = new Date(item.exp_date) <= new Date(new Date().setDate(new Date().getDate() + 3))


    // Increase amount
    function increase() {
        setAmount((amount) => amount + 1)
        startTransition(async () => {
            const result = await handleIncreaseAmount(item.id)
            if (result.error) {
                setAmount((amount) => amount - 1)
            }
        })
    }

    // Decrease amount
    function decrease() {
        if (amount <= 1) {
            setIsGone(true)
            startTransition(async () => {
                const result = await handleDeleteItem(item.id)
                if (result.error) {
                    setIsGone(false)
                }
            })
        }
        else {
            setAmount((amount) => amount - 1)
            startTransition(async () => {
                const result = await handleDecreaseAmount(item.id)
                if (result.error) {
                    setAmount((amount) => amount + 1)
                }
            })
        }
    }

    // Status
    function setStatus() {
        if (willExpire) {
            return "🤢 จะบูด"
        }
    }


    // Delete item
    if (isGone) {
        return null
    }



    // Render
    return (

        <div className={`FridgeItem w-ful rounded-2xl px-[1.5rem] 
                    h-[4.5rem] flex items-center justify-between
                    ${willExpire ? "border border-makro " : "border border-textsecondary"}
                    `} key={item.id}>
            <div className="ItemInfo flex flex-col  ">
                <p className={`text-textprimary`} >{item.name}</p>
                <p className={`p4 text-textsecondary  `} >หมดอายุ {item.exp_date.toLocaleDateString()} </p>
            </div>

            {/* Status */}
            <div className="Status">
                <p className={`text-textsecondary`} >{setStatus()}</p>
            </div>

            {/* Amount */}
            <div className="Amount flex gap-[0.5rem] " >
                <button className={` text-makro"} cursor-pointer `}
                    onClick={decrease}
                >-</button>
                <p className={`text-textsecondary`} >{amount}</p>
                <button className={`text-textprimary cursor-pointer `}
                    onClick={increase}
                >+</button>
            </div>

        </div>




    )
}
export default FridgeList