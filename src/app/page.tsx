import UserLocation from "./components/UserLocation";


export default function Home() {

  
  return (
    <div className="flex flex-col items-center justify-center pt-[4rem] " >
      <div className="UserLocation w-[22.5rem] bg-makro rounded-2xl px-[1rem] py-[0.5rem]
          text-background gap-[1rem] ">
        <div className="GreatMessage">
          <h2>มีส้มลดราคาเป็นจำนวนมากในชุมชน</h2>
          <h3 className="text-textprimary" >ลองเข้าไปดูสิ</h3>
        </div>

        <UserLocation />


      </div>
    </div>
  );
}
