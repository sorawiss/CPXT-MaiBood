import { Search } from "lucide-react";

function Searh() {
  return (
    <div className="flex items-center h-[3.5rem] bg-backgroundsecondary rounded-2xl py-[1rem] px-[1.5rem]
          w-full shadow-[0px_10px_25px_-13px_rgba(0,_0,_0,_0.2)] justify-between " >
      <input type="text" placeholder="ค้นหาสินค้า" className="w-full outline-0  " />
      <Search className="w-[1.5rem] h-[1.5rem] text-textsecondary " />

    </div>
  )
}
export default Searh