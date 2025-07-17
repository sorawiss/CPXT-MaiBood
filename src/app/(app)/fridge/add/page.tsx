"use client"
import Input from "@/components/Input";
import TitleHeader from "@/components/TitleHeader";
import { handleAddToFridge } from "./action";
import { useActionState, useState, useRef, useEffect } from "react";
import { useFormStatus } from "react-dom";
import Button from "@/components/Button";
import Category from "@/components/Category";

type FormState = {
  error?: string;
  success?: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" text={pending ? "กำลังเพิ่ม..." : "เพิ่มเข้าตู้เย็น ✚"} className="mt-[3rem]" isLoading={pending} />
  )
}


export default function Add() {
  const [state, formAction] = useActionState(handleAddToFridge, { error: undefined, success: undefined });
  const [amount, setAmount] = useState<number | string>("");
  const [category, setCategory] = useState<number | null>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const suggestAmount = [1, 3, 5, 10];


  useEffect(() => {
    if (state.success) {
      setAmount("");
      setCategory(0);
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  }, [state.success]);

  // Hanle when click suggestion amount
  function handleSuggestAmount(amount: number) {
    setAmount(amount);
  }


  return (
    // Title Header
    <div className="min-h-[calc(100vh-10rem)] flex flex-col justify-center items-center w-full ">
      <TitleHeader title="เพิ่มอาหาร" />

      {/* Form */}
      <form ref={formRef} action={formAction} className="my-auto w-full flex flex-col gap-[1rem] ">
        <Input type="text" name="item" placeholder="ตัวอย่าง: อกไก่สด" label="ชื่ออาหาร" required
          className="!bg-transparent !border-backgroundsecondary " />

        {/* Expiry Date */}
        <Input type="date" name="expiry_date" placeholder="วันหมดอายุ" label="วันหมดอายุ" required
          className="!bg-transparent !border-backgroundsecondary "
        />

        {/* Amount */}
        <div className="AmountWrapper flex flex-col gap-[1rem] ">
          <Input type="number" name="amount" value={amount.toString()} placeholder="จำนวน" label="จำนวน" required
            className="!bg-transparent !border-backgroundsecondary "
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

        {/* Category */}
        <div className="Category flex flex-col mt-[2rem] ">
          <label className="text-textprimary font-medium text-[1rem] " htmlFor="category">ประเภท (ไม่เลือกได้)</label>
          <Category value={category} onChange={setCategory} />
          <input type="hidden" name="category" value={category ? category.toString() : ""} />
        </div>

        <SubmitButton />
        <p className="p2 text-textsecondary text-center " >✨ บันทึกอาหารในตู้เย็นทำให้ง่ายต่อการจัดการ</p>

      </form>


    </div>
  );
}