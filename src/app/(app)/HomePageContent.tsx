"use client";

import { useState } from "react";
import UserLocation from "@/components/UserLocation";
import Search from "@/components/Searh";
import Category from "@/components/Category";
import PostList from "@/components/PostList";
import { Fridge, Makro } from "@/lib/type";

interface HomePageContentProps {
  initialPosts: Fridge[];
  makroData: Makro[];
}

export default function HomePageContent({ initialPosts, makroData }: HomePageContentProps) {
  const [category, setCategory] = useState<number | null>(null);

  const filteredCommunityPosts = initialPosts.filter(post => 
    category === null || post.category?.toString() === category.toString()
  );

  const filteredMakroPosts = makroData.filter(post =>
    category === null || post.category?.toString() === category.toString()
  );

  return (
    <div className="flex flex-col items-center justify-center pt-[4rem] w-[25rem] px-[1.5rem] mx-auto gap-[2rem] ">
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
        <Category value={category} onChange={setCategory} />
      </div>

      <div className="PostContainer w-full flex flex-col gap-[1rem] ">
        <div className="Title w-full flex flex-col ">
          <h1>จาก CPAXT</h1>
          <p className="p3 text-textsecondary" >อาหารจาก Makro และ Lotus ใกล้บ้านคุณ </p>
        </div>
        <div className="MakroPost w-full grid grid-cols-2 gap-[1rem] ">
          {filteredMakroPosts.map((item, index) => (
            <PostList
              key={index}
              exp_date={item.exp_date}
              price={item.price ?? 0}
              name={item.name}
              id={item.id}
              isMakro={true}
              image={item.image}
              updated_at={item.updated_at}
            />
          ))}
        </div>
      </div>

      <div className="PostContainer w-full flex flex-col gap-[1rem] ">
        <div className="Title w-full flex flex-col ">
          <h1>จากชุมชนของคุณ</h1>
          <p className="p3 text-textsecondary" >อาหารจากเพื่อน ๆ ในชุมชน </p>
        </div>
        <div className="MakroPost w-full grid grid-cols-2 gap-[1rem] ">
          {filteredCommunityPosts.map((item) => (
            <PostList
              key={item.id}
              exp_date={item.exp_date}
              price={item.price ?? 0}
              name={item.name}
              id={item.id}
              image={item.image ?? undefined}
              updated_at={item.updated_at}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 