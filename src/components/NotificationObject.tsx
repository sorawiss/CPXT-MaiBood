import Image from "next/image"
import Link from "next/link";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"


function NotificationObject({ notification }: { notification: any }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="border border-textprimary rounded-2xl p-[1rem] h-[4.5rem] w-full " >
                    <div className="Left flex items-center gap-1 ">
                        <div className="ProfileWrapper size-10 ">
                            <Link href={`/profile/${notification.sender.id}`}>
                                <Image src={notification.sender.profile_picture ?? "/makro-logo.png"} alt="profile" width={180} height={180} className="object-cover rounded-full" />
                            </Link>
                        </div>
                        <div className="NameAndDetail flex flex-col ">
                            <p className="text-textprimary ">{notification.sender.name}</p>
                            <p className="p3 text-textsecondary">สนใจรับ {notification.fridge.name} ของคุณ</p>
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="bottom-0 translate-y-0 rounded-t-2xl w-full border border-textsecondary 
                data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom 
                duration-300 ease-in-out flex flex-col items-center h-[25rem] "
                showCloseButton={false}
            >
                <div className="Info flex flex-col gap-[0.5rem] items-center ">
                    <div className="Detail flex flex-col items-center ">
                        <p className="p3 text-textsecondary " >เข้าตู้เย็นเมื่อ </p>
                        <p className="p3 text-textsecondary " >จะบูดตอน </p>
                    </div>
                </div>






            </DialogContent>
        </Dialog>

    )
}
export default NotificationObject