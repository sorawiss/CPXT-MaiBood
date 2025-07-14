"use client"
import TitleHeader from "@/components/TitleHeader";
import { handleShare } from "./action";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState } from "react";
import Category from "@/components/Category";
import { useSearchParams } from "next/navigation";

export default function Share() {
  const searchParams = useSearchParams();
  const [name, setName] = useState<string>(
    searchParams.get("name") || ""
  );
  const [expiryDate, setExpiryDate] = useState<string>(
    searchParams.get("expiry_date") || ""
  );
  const prefillCategory = searchParams.get("category");
  const [amount, setAmount] = useState<number | string>(
    parseInt(searchParams.get("amount") || "0")
  );
  const [category, setCategory] = useState<number | null>(
    prefillCategory && prefillCategory !== "" ? Number(prefillCategory) : null
  );
  const suggestAmount = [1, 3, 5, 10];


  // Hanle when click suggestion amount
  function handleSuggestAmount(amount: number) {
    setAmount(amount);
  }


  return (
    // Title Header
    <div className="min-h-[calc(100vh-10rem)] flex flex-col justify-center items-center w-full ">
      <TitleHeader title="แบ่งปัน ❤︎" />

      {/* Form */}
      <form action={handleShare} className="my-auto w-full flex flex-col gap-[1rem] ">
        <Input type="text" name="item" placeholder="ตัวอย่าง: อกไก่สด" label="ชื่ออาหาร" required
          className="!bg-transparent !border-backgroundsecondary "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Expiry Date */}
        <Input type="date" name="expiry_date" placeholder="วันหมดอายุ" label="วันหมดอายุ" required
          className="!bg-transparent !border-backgroundsecondary "
          value={expiryDate}
          readOnly={!!expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />

        <Input type="text" name="price" placeholder="ราคา" label="ราคา (ไม่ใส่เพื่อแจกฟรี)" defaultValue="0"
          className="!bg-transparent !border-backgroundsecondary "
        />

        <Input type="text" name="description" placeholder="ตัวอย่าง: มารับได้ที่ร้านครัวแม่พันธุ์" label="คำอธิบาย (ไม่ใส่ได้)"
          className="!bg-transparent !border-backgroundsecondary "
        />

        {/* Category */}
        <div className="Category flex flex-col mt-[2rem] ">
          <label className="text-textprimary font-medium text-[1rem] " htmlFor="category">ประเภท</label>
          <Category value={category} onChange={setCategory}  />
          <input type="hidden" name="category" value={category ? category.toString() : ""} />
        </div>

        <Button type="submit" text="แบ่งปัน ❤︎" className="mt-[3rem] " />
        <p className="p2 text-textsecondary text-center " >🎁 แจกจ่ายอาหารให้กับคนในชุมชน</p>

        <input type="hidden" name="id" value={searchParams.get("id") || ""} />

      </form>


    </div>
  );
}