import NotificationObject from "@/components/NotificationObject"
import TitleHeader from "@/components/TitleHeader"
import { getNotifications } from "@/utils/DALs";
import { getCurrentUser } from "@/utils/user";

async function Notification() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center pt-[4rem] w-[25rem] px-[1.5rem] mx-auto gap-[2rem] ">
        <TitleHeader title="การแจ้งเตือน" />
        <p>Please login to see notifications</p>
      </div>
    );
  }

  const notifications = await getNotifications(user.id);


  return (
    <div className="flex flex-col items-center justify-center pt-[4rem] w-[25rem] px-[1.5rem] mx-auto gap-[2rem] ">
        <TitleHeader title="การแจ้งเตือน" />

        <div className="NotiList w-full flex flex-col gap-[1rem] ">
            {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationObject key={notification.id} notification={notification} />
            ))
          ) : (
            <p>No notifications yet</p>
          )}
        </div>

    </div>
  )
}
export default Notification