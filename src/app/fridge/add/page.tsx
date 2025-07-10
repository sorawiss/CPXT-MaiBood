"use client"
import TitleHeader from "@/app/components/TitleHeader";
import { handleAddToFridge } from "./action";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import { useState } from "react";

export default function Add() {
  const [amount, setAmount] = useState<number | string>("");
  const suggestAmount = [1, 5, 10];


  // Hanle when click suggestion amount
  function handleSuggestAmount(amount: number) {
    setAmount(amount);
  }


  return (
    // Title Header
    <div className="min-h-[calc(100vh-10rem)] flex flex-col justify-center items-center w-full ">
      <TitleHeader title="เพิ่มอาหาร" />

      {/* Form */}
      <form action={handleAddToFridge} className="my-auto w-full flex flex-col gap-[1rem] ">
        <Input type="text" name="item" placeholder="อาหาร" label="🍽️ ชื่ออาหาร" required
          className="!bg-transparent !border-backgroundsecondary " />

        {/* Amount */}
        <div className="AmountWrapper flex items-end ">
          <Input type="number" name="amount" value={amount.toString()} placeholder="จำนวน" label="จำนวน" required
            className="w-[10.5rem] !bg-transparent !border-backgroundsecondary "
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="SuggestionWrapper flex gap-[0.75rem] ">
            {suggestAmount.map((suggestAmount) => (
              <button key={suggestAmount} className={`w-[3rem] h-[2.5rem] border rounded-2xl cursor-pointer
                border-textprimary ${amount === suggestAmount ? "bg-textprimary text-background" : ""} `}
                onClick={() => handleSuggestAmount(suggestAmount)}
                type="button"
              >{suggestAmount}</button>
            ))}
          </div>

        </div>

        <Input type="date" name="expiry_date" placeholder="วันหมดอายุ" label="วันหมดอายุ" required
          className="!bg-transparent !border-backgroundsecondary "
        />
        <Button type="submit" text="เพิ่มเข้าตู้เย็น ✚" className="mt-[5rem] " />
        <p className="p2 text-textsecondary text-center " >✨ บันทึกอาหารในตู้เย็นทำให้ง่ายต่อการจัดการ</p>

      </form>


    </div>
  );
}