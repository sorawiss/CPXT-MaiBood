import UserLocation from "../components/UserLocation";

import Search from "../components/Searh";
import Category from "../components/Category";
import PostList from "../components/PostList";


export default function Home() {
  const postList = new Array(4).fill(0)


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
        <Category />
      </div>

      <div className="PostContainer w-full flex flex-col gap-[1rem] ">
        <div className="Title w-full flex flex-col ">
          <h1>จาก CPAXT</h1>
          <p className="p3 text-textsecondary" >คำอธิบายตรงนี้จะมาจากการเก็บข้อมูล user </p>
        </div>
        <div className="MakroPost w-full grid grid-cols-2 gap-[1rem] ">
          {postList.map((item, index) => (
            <PostList key={index} />
          ))}
        </div>
      </div>

      <div className="PostContainer w-full flex flex-col gap-[1rem] ">
        <div className="Title w-full flex flex-col ">
          <h1>จากเพื่อน ๆ ในชุมชน</h1>
          <p className="p3 text-textsecondary" >คำอธิบายตรงนี้จะมาจากการเก็บข้อมูล user </p>
        </div>
        <div className="MakroPost w-full grid grid-cols-2 gap-[1rem] ">
          {postList.map((item, index) => (
            <PostList key={index} />
          ))}
        </div>
      </div>




    </div>
  );
}
