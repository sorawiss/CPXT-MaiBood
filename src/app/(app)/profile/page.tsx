import Contact from "@/components/Contact"
import TitleHeader from "@/components/TitleHeader"
import { getCurrentUser } from "@/utils/user"
import { countFreeItems, countSoldItems } from "@/utils/DALs"
import ProfileStat from "@/components/ProfileStat"
import Button from "@/components/Button"
import { deleteSession } from "@/utils/session"
import Image from "next/image"
import { Suspense } from "react"

export const revalidate = 3600; // Revalidate every 1 hour

async function ProfileStats({ userId }: { userId: string }) {
    const [soldItems, freeItems] = await Promise.all([
        countSoldItems(userId),
        countFreeItems(userId)
    ]);

    return (
        <div className={`StateWrapper flex flex-col items-center justify-center w-full gap-2 `}>
            <ProfileStat title="♞ อัศวิน" amount={soldItems} isBold={true} />
            <ProfileStat title="🤝 ขายอาหาร" amount={soldItems} />
            <ProfileStat title="❤ แจกฟรี" amount={freeItems} />
        </div>
    );
}

async function Profile() {
    const user = await getCurrentUser()
    if (!user) {
        return <div>User not found</div>
    }

    return (
        <div className="flex flex-col items-center justify-center pt-[4rem] w-[25rem] px-[1.5rem] mx-auto gap-[2rem] " >
            <TitleHeader title={"บัญชีของ " + user.name} showEdit={true} />

            <div className="ProfileHeader flex flex-col items-center justify-between w-full gap-2 ">
                <div className="ImageWrapper size-[10rem] bg-backgroundsecondary rounded-full ">
                    <Image src={user.profile_picture ?? "/default-profile.jpg"} alt={user.name} width={180} height={180} className="object-cover rounded-full w-full h-full" />
                </div>
                <div className="ProfileInfo flex flex-col items-center justify-center w-full">
                    <h1 className="text-textprimary " >{user.name}</h1>
                    <p className="p4 text-textsecondary text-center " >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.</p>
                </div>
            </div>

            <Contact
                phone={user.phone_number ?? undefined}
                line={user.line ?? undefined}
                facebook={user.facebook ?? undefined}
                ig={user.instagram ?? undefined}
            />

            <Suspense fallback={<div className="h-24 bg-gray-200 animate-pulse rounded-lg w-full"></div>}>
                <ProfileStats userId={user.id} />
            </Suspense>


            <Button type="button" text="ออกจากระบบ" className="w-full" onClick={deleteSession} />


        </div>
    )
}
export default Profile