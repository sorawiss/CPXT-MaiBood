import UserLocation from "@/components/UserLocation";

import Search from "@/components/Searh";
import Category from "@/components/Category";
import { getSellingFridgeItems } from "@/utils/DALs";
import PostList from "@/components/PostList";
import { makroData } from "../../../public/makro-data";


export default async function Home() {
  const postList = await getSellingFridgeItems();
  console.log("postList", postList);


  return (
    <div className="flex flex-col items-center justify-center pt-[4rem] w-[25rem] px-[1.5rem] mx-auto gap-[2rem] " >
      <div className="UserLocation w-full bg-makro rounded-2xl px-[1rem] py-[0.5rem]
          text-background flex flex-col gap-[1rem] ">
        <div className="GreatMessage">
          <h3>มีส้มลดราคาเป็นจำนวนมากในชุมชน</h3>
          <h2 className="text-textprimary" >ลองเข้าไปดูสิ</h2>
        </div>

        <UserLocation />

      </div>

      <div className="SearchAndCategory w-full flex flex-col gap-[1rem] ">
        <Search />
        {/* <Category value={category} onChange={setCategory} /> */}
      </div>

      <div className="PostContainer w-full flex flex-col gap-[1rem] ">
        <div className="Title w-full flex flex-col ">
          <h1>จาก CPAXT</h1>
          <p className="p3 text-textsecondary" >คำอธิบายตรงนี้จะมาจากการเก็บข้อมูล user </p>
        </div>
        <div className="MakroPost w-full grid grid-cols-2 gap-[1rem] ">
          {makroData.map((item, index) => (
            <PostList
              key={index}
              exp_date={item.exp_date}
              price={item.price ?? 0}
              name={item.name}
              id={item.id}
              isMakro={true}
              image={item.image}
            />
          ))}
        </div>
      </div>

      <div className="PostContainer w-full flex flex-col gap-[1rem] ">
        <div className="Title w-full flex flex-col ">
          <h1>จากเพื่อน ๆ ในชุมชน</h1>
          <p className="p3 text-textsecondary" >คำอธิบายตรงนี้จะมาจากการเก็บข้อมูล user </p>
        </div>
        <div className="MakroPost w-full grid grid-cols-2 gap-[1rem] ">
          {postList.map((item) => (
            <PostList
              key={item.id}
              exp_date={item.exp_date}
              price={item.price ?? 0}
              name={item.name}
              id={item.id}
            />
          ))}
        </div>
      </div>




    </div>
  );
}
