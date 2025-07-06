import { Search } from "lucide-react";

function Searh() {
  return (
    <div className="flex items-center h-[3.5rem] bg-backgroundsecondary rounded-2xl " >
        <Search className="w-[1rem] h-[1rem] text-backgroundsecondary" />
        <input type="text" placeholder="ค้นหาสินค้า" />
    </div>
  )
}
export default Searh