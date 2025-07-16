import Image from "next/image"

function NotificationObject() {
    return (
        <div className="border border-textprimary rounded-2xl p-[1rem] h-[4.5rem] w-full " >
            <div className="Left flex items-center gap-1 ">
                <div className="ProfileWrapper size-10 ">
                    <Image src="/makro-logo.png" alt="profile" width={180} height={180} className="object-cover rounded-full" />
                </div>
                <div className="NameAndDetail flex flex-col ">
                    <p className="text-textprimary ">ชื่อ</p>
                    <p className="p3 text-textsecondary">รายละเอียด</p>
                </div>
            </div>
        </div>
    )
}
export default NotificationObject