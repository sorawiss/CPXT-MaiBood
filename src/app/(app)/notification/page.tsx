import NotificationObject from "@/components/NotificationObject"
import TitleHeader from "@/components/TitleHeader"

function Notification() {
  return (
    <div className="flex flex-col items-center justify-center pt-[4rem] w-[25rem] px-[1.5rem] mx-auto gap-[2rem] ">
        <TitleHeader title="การแจ้งเตือน" />

        <div className="NotiList w-full flex flex-col gap-[1rem] ">
            <NotificationObject />
        </div>

    </div>
  )
}
export default Notification