"use client"
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import Button from "@/components/Button";
import { StatusType } from "@/utils/DALs";
import { useRouter } from "next/navigation";
import { DialogTitle } from "@radix-ui/react-dialog";
import { safeDate } from "@/utils/date-formate";

interface FridgeItem {
    id: string;
    name: string;
    amount: number;
    status: StatusType;
    user_id: string;
    created_at: Date | string; 
    updated_at: Date | string; 
    exp_date: Date | string;
    category?: string; // Make category optional
}

// API Functions
const updateItemAmount = async ({ id, action }: { id: string, action: 'increase' | 'decrease' }) => {
    const res = await fetch('/api/fridge', {
        method: 'POST',
        body: JSON.stringify({ id, action }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to update amount');
    return res.json();
};

const deleteItem = async (id: string) => {
    const res = await fetch('/api/fridge', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to delete item');
    return res.json();
};

const updateItemStatus = async ({ id, status }: { id: string, status: StatusType }) => {
    const res = await fetch('/api/fridge', {
        method: 'PUT',
        body: JSON.stringify({ id, status }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res.json();
};


function FridgeList({ item }: { item: FridgeItem }) {
    const queryClient = useQueryClient();
    const router = useRouter();

    const [amount, setAmount] = useState(item.amount);
    const expDate = safeDate(item.exp_date);
    const createdAtDate = safeDate(item.created_at);
    const willExpire = expDate <= new Date(new Date().setDate(new Date().getDate() + 3));
    let status: string = item.status;

    // Mutations
    const mutationOptions = {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fridgeItems'] });
        },
        onError: (error: any) => {
            console.error(error.message);
            queryClient.invalidateQueries({ queryKey: ['fridgeItems'] }); // Revert optimistic update
        },
    };

    const deleteMutation = useMutation({
      mutationFn: deleteItem, 
      ...mutationOptions
    });
    const updateAmountMutation = useMutation({
      mutationFn: updateItemAmount,
      ...mutationOptions
    });
    const updateStatusMutation = useMutation({
      mutationFn: updateItemStatus, 
      ...mutationOptions
    });


    const buttonMenu = [
        {
            id: 1,
            text: "🤝 แบ่งปัน",
            className: "bg-textprimary text-background ",
            function: () => {
                const params = new URLSearchParams({
                    name: item.name,
                    expiry_date: expDate.toISOString().split('T')[0],
                    category: item.category || "",
                    id: item.id,
                    amount: item.amount.toString()
                });
                router.push(`/fridge/share?${params.toString()}`);
            }
        },
        {
            id: 2,
            text: "😋 กินหมด",
            className: "bg-transparent border border-textprimary !text-textprimary ",
            function: () => updateStatusMutation.mutate({ id: item.id, status: StatusType.eat })
        },
        {
            id: 3,
            text: "แบ่งปันสำเร็จ",
            className: " bg-textprimary text-background ",
            function: () => updateStatusMutation.mutate({ id: item.id, status: StatusType.free })
        },
        {
            id: 4,
            text: "🗑 ลบ",
            className: "bg-transparent border border-makro !text-makro ",
            function: () => deleteMutation.mutate(item.id)
        }
    ]


    // Increase amount
    function increase(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        setAmount((prev) => prev + 1);
        updateAmountMutation.mutate({ id: item.id, action: 'increase' });
    }

    // Decrease amount
    function decrease(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        if (amount <= 1) {
            deleteMutation.mutate(item.id);
        } else {
            setAmount((prev) => prev - 1);
            updateAmountMutation.mutate({ id: item.id, action: 'decrease' });
        }
    }

    // Status
    function setStatus() {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        if (expDate < today) {
            status = "⚠️ บูด";
        } else if (item.status === StatusType.fresh) {
            status = "";
        }
        if (willExpire && expDate >= today) {
            status = "🤢 จะบูด";
        }
        if (item.status === StatusType.selling) {
            status = "กำลังแบ่งปัน...";
        }
    }
    setStatus()

    // Optimistic UI - hide immediately on mutation
    if (deleteMutation.isPending || updateStatusMutation.isPending) {
        return null;
    }


    // Render
    return (

        <Dialog>
            <DialogTrigger asChild>
                <div className={`cursor-pointer FridgeItem w-ful rounded-2xl px-[1.5rem] 
                    h-[4.5rem] flex items-center justify-between
                    ${willExpire ? "border border-makro " : "border border-textsecondary"}
                     ${status === "กำลังแบ่งปัน..." ? "bg-backgroundsecondary border-none " : ""}
                     ${updateAmountMutation.isPending ? "opacity-50" : ""}
                     `} key={item.id}>
                    <div className="ItemInfo flex flex-col  ">
                        <p className={`text-textprimary w-fit `} >{item.name}</p>
                        <p className={`p4 text-textsecondary  `} >
                            หมดอายุ {expDate.getFullYear()}/{String(expDate.getMonth() + 1).padStart(2, '0')}/{String(expDate.getDate()).padStart(2, '0')}
                        </p>
                    </div>

                    {/* Status */}
                    <div className="Status">
                        <p className={`text-textsecondary `} >{status}</p>
                    </div>

                    {/* Amount */}
                    <div className="Amount flex gap-[0.5rem] " >
                        <button className={` text-makro cursor-pointer h-ful w-5 `}
                            onClick={decrease}
                            disabled={updateAmountMutation.isPending}
                        >-</button>
                        <p className={`text-textsecondary`} >{amount}</p>
                        <button className={`text-textprimary cursor-pointer  h-ful w-5 `}
                            onClick={increase}
                            disabled={updateAmountMutation.isPending}
                        >+</button>
                    </div>

                </div>

            </DialogTrigger>
            <DialogTitle className="sr-only " >
                <p className="text-textprimary " >{item.name}</p>
            </DialogTitle>

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
                    {buttonMenu
                        .filter(
                            button =>
                                !(item.status === "selling" && button.id === 1) &&
                                !(item.status !== "selling" && button.id === 3) &&
                                !(status === "⚠️ บูด" && button.id === 1) &&
                                !(status === "⚠️ บูด" && button.id === 2)
                        )
                        .map((button) => (
                            <DialogClose key={button.id} asChild>
                                <Button
                                    type="button"
                                    text={button.text}
                                    className={`!w-[12rem] !h-[3rem] ${button.className} `}
                                    onClick={button.function}
                                />
                            </DialogClose>
                        ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default FridgeList