"use client"
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import FridgeList from "@/components/FridgeList";
import Button from "@/components/Button";
import { filterExpDate } from "@/utils/filter-exp-date";
import Loading from "./loading";
import TitleHeader from "../../../components/TitleHeader";
import { getUser } from "@/utils/DALs";
import { getCurrentUser } from "@/utils/user";
import FridgeInfo from "@/components/FridgeInfo";


// API call function
const fetchFridgeData = async () => {
  const res = await fetch('/api/fridge');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const fetchUserData = async () => {
    const res = await fetch('/api/user');
    if (!res.ok) {
        throw new Error('Failed to fetch user data');
    }
    return res.json();
}

function FridgeItems() {
  const { data, isLoading, isError } = useQuery({ 
      queryKey: ['fridgeData'], 
      queryFn: fetchFridgeData 
  });

  if (isLoading) {
    return <Loading />;
  }
  
  if (isError || !data) {
      return <p className="text-textsecondary">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>;
  }
  
  const { items, categoryCounts } = data as { items: any[], categoryCounts: Record<string, number> };

  if (items.length === 0) {
    return <p className="text-textsecondary">ยังไม่มีอาหารถูกบันทึกในตู้เย็น เริ่มบันทึกอาหารเพื่อจัดระเบียบครัวกันเถอะ!</p>;
  }
  
  const count = items.length;

  return (
    <div className="w-full flex flex-col gap-[1rem]">
      <div className="MetaData flex mb-[2rem]">
        <FridgeInfo meat={categoryCounts["1"]} cake={categoryCounts["2"]} fruit={categoryCounts["3"]} other={categoryCounts["4"]} />
        {/* <p className="text-textprimary">อาหารในตู้เย็น {count} รายการ</p>
        <p className="text-textprimary">
          ใกล้หมดอายุ {filterExpDate(items)} รายการ
        </p> */}
      </div>
      <div className="FridgeListContainer w-full flex flex-col gap-[1rem]">
        {items.map((item: any) => (
          <FridgeList key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function Fridge() {
  const { data: userData, isLoading: isUserLoading } = useQuery({
      queryKey: ['userData'],
      queryFn: fetchUserData
  })

  return (
    <div className="flex flex-col items-center justify-center gap-[3.5rem] ">
      <div className="Title w-full flex flex-col items-center ">
        <TitleHeader title={isUserLoading ? "ตู้เย็นของคุณ" : `ตู้เย็นของ ${userData?.name}`} />
        <p className="p3 text-textsecondary ">
          บันทึกอาหารในตู้เย็น ช่วยให้จัดการอาหารได้ง่ายขึ้น
        </p>
      </div>

      {/* Data display */}
      <div className="DataDisplay w-full flex flex-col gap-[1rem] ">
          <FridgeItems />
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