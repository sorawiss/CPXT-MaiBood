import Contact from "@/components/Contact"
import TitleHeader from "@/components/TitleHeader"
import { getCurrentUser } from "@/utils/user"
import { countFreeItems, countSoldItems, getUser } from "@/utils/DALs"
import ProfileStat from "@/components/ProfileStat"
import Button from "@/components/Button"
import { deleteSession } from "@/utils/session"



async function ProfileFromId({ params }: { params: Promise<{ profileId: string }> }) {
    const { profileId } = await params
    const user = await getUser(profileId)
    if (!user) {
        return <div>User not found</div>
    }
    const soldItems = await countSoldItems(profileId)
    const freeItems = await countFreeItems(profileId)


    return (
        <div className="flex flex-col items-center justify-center pt-[4rem] w-[25rem] px-[1.5rem] mx-auto gap-[2rem] " >
            <TitleHeader title={"บัญชีของ " + user.name} />

            <div className="ProfileHeader flex flex-col items-center justify-between w-full gap-2 ">
                <div className="ImageWrapper size-[10rem] bg-backgroundsecondary rounded-full "></div>
                <div className="ProfileInfo flex flex-col items-center justify-center w-full">
                    <h1 className="text-textprimary " >{user.name}</h1>
                    <p className="p4 text-textsecondary text-center " >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.</p>
                </div>
            </div>

            <div className="StateWrapper flex flex-col items-center justify-center w-full gap-2 ">
                <ProfileStat title="🤝 ขายอาหาร" amount={soldItems} />
                <ProfileStat title="❤ แจกฟรี" amount={freeItems} />
            </div>


        </div>
    )
}
export default ProfileFromId