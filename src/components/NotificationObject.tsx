import Image from "next/image"
import Link from "next/link";

function NotificationObject({ notification }: { notification: any }) {
    return (
        <Link href={`/profile/${notification.sender.id}`}>
            <div className="border border-textprimary rounded-2xl p-[1rem] h-[4.5rem] w-full " >
                <div className="Left flex items-center gap-1 ">
                    <div className="ProfileWrapper size-10 ">
                        <Image src={notification.sender.profile_picture ?? "/makro-logo.png"} alt="profile" width={180} height={180} className="object-cover rounded-full" />
                    </div>
                    <div className="NameAndDetail flex flex-col ">
                        <p className="text-textprimary ">{notification.sender.name}</p>
                        <p className="p3 text-textsecondary">สนใจรับ {notification.fridge.name} ของคุณ</p>
                    </div>
                </div>
            </div>
        </Link>

    )
}
export default NotificationObject