import Link from "next/link";
import { Suspense } from "react";
import { getFridgeItemsData, getUserData } from "./data";
import { Plus } from "lucide-react";

import FridgeList from "./components/FridgeList";
import Button from "../../components/Button";
import { filterExpDate } from "@/utils/filter-exp-date";
import Loading from "./loading";
import TitleHeader from "../../components/TitleHeader";

async function FridgeItems() {
  const { items, count } = await getFridgeItemsData();

  if (!items || items.length === 0) {
    return <p className="text-textsecondary">No items in your fridge.</p>;
  }

  return (
    <div className="w-full flex flex-col gap-[1rem]">
      <div className="MetaData flex justify-between">
        <p className="text-textprimary">อาหารในตู้เย็น {count} รายการ</p>
        <p className="text-textprimary">
          ใกล้หมดอายุ {filterExpDate(items)} รายการ
        </p>
      </div>
      <div className="FridgeListContainer w-full flex flex-col gap-[1rem]">
        {items.map((item) => (
          <FridgeList key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

async function Fridge() {
  const { userName } = await getUserData();

  return (
    <div className="flex flex-col items-center justify-center gap-[3.5rem] ">
      <div className="Title w-full flex flex-col items-center ">
        <TitleHeader title={`ตู้เย็นของ ${userName?.name}`} />
        <p className="p3 text-textsecondary ">
          บันทึกอาหารในตู้เย็น ช่วยให้จัดการอาหารได้ง่ายขึ้น
        </p>
      </div>

      {/* Data display */}
      <div className="DataDisplay w-full flex flex-col gap-[1rem] ">
        <Suspense fallback={<Loading />}>
          <FridgeItems />
        </Suspense>
      </div>

      {/* Add button */}
      <Link href="/fridge/add" className="flex flex-col items-center gap-[0.5rem] 
        fixed bottom-24 left-1/2 -translate-x-1/2 z-10  bg-background rounded-full ">
        <Button
          type="button"
          text={<Plus className="size-12 text-makro " />}
          className="!size-[4.5rem] rounded-full !bg-transparent !border-makro !border-2    "
        />
        <h3 className="text-textsecondary " >เพิ่มอาหาร</h3>
      </Link>
    </div>
  );
}
export default Fridge;