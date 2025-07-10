"use client"
import { handleDecreaseAmount, handleIncreaseAmount, handleDeleteItem, handleUpdateStatus } from "../action";
import { useTransition, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import Button from "@/components/Button";
import { StatusType, updateStatus } from "@/utils/DALs";

interface FridgeItem {
    id: string;
    name: string;
    amount: number;
    status: 'fresh' | 'selling' | 'sold' | 'expired' | 'eat';
    user_id: string;
    created_at: Date | string; // Allow string
    updated_at: Date | string; // Allow string
    exp_date: Date | string; // Allow string
}





function FridgeList({ item }: { item: FridgeItem }) {
    const [isPending, startTransition] = useTransition()
    const [amount, setAmount] = useState(item.amount)
    const [isGone, setIsGone] = useState(false)
    const expDate = new Date(item.exp_date); // Create a new Date object from the string or Date
    const createdAtDate = new Date(item.created_at);
    const willExpire = expDate <= new Date(new Date().setDate(new Date().getDate() + 3))
    let status: string = item.status

    const buttonMenu = [
        {
            id: 1,
            text: "🤝 แบ่งปัน",
            className: "bg-textprimary text-background ",
            function: () => {
                handleUpdateStatus(item.id, StatusType.selling)
            }
        },
        {
            id: 2,
            text: "😋 กินหมด",
            className: "bg-transparent border border-textprimary !text-textprimary ",
            function: async () => {
                setIsGone(true)
                const result = await handleUpdateStatus(item.id, StatusType.eat)
                if (result.error) {
                    setIsGone(false)
                }
            }
        },
        {
            id: 3,
            text: "🗑 ลบ",
            className: "bg-transparent border border-makro !text-makro ",
            function: async () => {
                setIsGone(true)
                const result = await handleDeleteItem(item.id)
                if (result.error) {
                    setIsGone(false)
                }
            }
        }
    ]


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
            status = "🤢 จะบูด"
        }
        if (item.status === StatusType.selling) {
            status = "กำลังแบ่งปัน..."
        }
    }
    setStatus()


    // Delete item
    if (isGone) {
        return null
    }



    // Render
    return (

        <Dialog>
            <DialogTrigger asChild>
                <div className={`cursor-pointer FridgeItem w-ful rounded-2xl px-[1.5rem] 
                    h-[4.5rem] flex items-center justify-between
                    ${willExpire ? "border border-makro " : "border border-textsecondary"}
                     ${status === "กำลังแบ่งปัน..." ? "bg-backgroundsecondary border-none " : ""}
                     `} key={item.id}>
                    <div className="ItemInfo flex flex-col  ">
                        <p className={`text-textprimary w-fit `} >{item.name}</p>
                        <p className={`p4 text-textsecondary  `} >
  หมดอายุ {expDate.getFullYear()}/{String(expDate.getMonth() + 1).padStart(2, '0')}/{String(expDate.getDate()).padStart(2, '0')}
</p>
                    </div>

                    {/* Status */}
                    <div className="Status">
                        <p className={`text-textsecondary`} >{status}</p>
                    </div>

                    {/* Amount */}
                    <div className="Amount flex gap-[0.5rem] " >
                        <button className={` text-makro cursor-pointer `}
                            onClick={decrease}
                        >-</button>
                        <p className={`text-textsecondary`} >{amount}</p>
                        <button className={`text-textprimary cursor-pointer `}
                            onClick={increase}
                        >+</button>
                    </div>

                </div>

            </DialogTrigger>

            <DialogContent className="bottom-0 translate-y-0 rounded-t-2xl w-full border border-textsecondary 
                data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom 
                duration-300 ease-in-out flex flex-col items-center h-[25rem] "
                showCloseButton={false}
            >
                <div className="Info flex flex-col gap-[0.5rem] items-center ">
                    <h3 className="text-textprimary " >{item.name}</h3>
                    <div className="Detail flex flex-col items-center ">
                        <p className="p3 text-textsecondary " >เข้าตู้เย็นเมื่อ {createdAtDate.toLocaleDateString()} </p>
                        <p className="p3 text-textsecondary " >จะบูดตอน {expDate.toLocaleDateString()} </p>
                    </div>
                </div>

                <div className="ButtonMenu flex flex-col gap-[1rem] mt-[1.5rem] ">
                    {buttonMenu.map((button) => {
                        return (
                            <DialogClose key={button.id} asChild>
                                <Button type="button" text={button.text}
                                    className={`!w-[12rem] !h-[3rem] ${button.className} `}
                                    onClick={button.function}
                                />
                            </DialogClose>
                        )
                    })}
                </div>




            </DialogContent>
        </Dialog>





    )
}
export default FridgeList