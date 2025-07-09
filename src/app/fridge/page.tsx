import Link from "next/link"
import { handleGetFridgeItemsAndUserName } from "./action"


import FridgeList from "./components/FridgeList"

async function Fridge() {

  const { items, userName } = await handleGetFridgeItemsAndUserName()
  console.log("userName", userName)


  // Render
  return (
    <div className="flex flex-col items-center justify-center gap-[3.5rem] " >
      <div className="Title w-full flex flex-col items-center " >
        <h2 className="text-textprimary " >❄️ ตู้เย็นของคุณ {userName?.name}</h2>
        <p className="p3 text-textsecondary " >บันทึกอาหารในตู้เย็น ช่วยให้จัดการอาหารได้ง่ายขึ้น</p>
      </div>
      <FridgeList fridgeItems={{ items: items || [] }} />
      <Link href="/fridge/add">Add</Link>
    </div>
  )
}
export default Fridge