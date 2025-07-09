import Link from "next/link"
import { handleGetFridgeItemsAndUserName } from "./action"
import { Plus } from "lucide-react"


import FridgeList from "./components/FridgeList"
import Button from "../components/Button"

async function Fridge() {

  const { items, userName, count } = await handleGetFridgeItemsAndUserName()
  console.log("userName", userName)
  console.log("items", items)


  // Render
  return (
    <div className="flex flex-col items-center justify-center gap-[3.5rem] " >
      <div className="Title w-full flex flex-col items-center " >
        <h2 className="text-textprimary " >❄️ ตู้เย็นของคุณ {userName?.name}</h2>
        <p className="p3 text-textsecondary " >บันทึกอาหารในตู้เย็น ช่วยให้จัดการอาหารได้ง่ายขึ้น</p>
      </div>

      {/* Data display */}
      <div className="DataDisplay w-full flex flex-col gap-[1rem] " >
        <p className="text-textprimary " >อาหารในตู้เย็น {count} รายการ</p>
        <div className="FridgeListContainer w-full flex flex-col gap-[1rem] " >


          {items && items.map((item) => (
            <FridgeList key={item.id} item={item} exp_date={item.exp_date.toLocaleDateString()} />
          ))}
        </div>
      </div>


      {/* Add button */}
      <Link href="/fridge/add" >
        <Button type="button" text={<Plus className="size-12" />} className="!size-[4.5rem] rounded-full " />
      </Link>
    </div>
  )
}
export default Fridge