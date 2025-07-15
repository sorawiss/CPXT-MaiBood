import Contact from "@/components/Contact"
import TitleHeader from "@/components/TitleHeader"
import { getUserData } from "@/utils/user"
import { countSoldItems } from "@/utils/DALs"



async function Profile() {
    const user = await getUserData()
    if (!user) {
        return <div>User not found</div>
    }


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

            <Contact
                phone={user.phone_number ?? undefined}
                line={user.line ?? undefined}
                facebook={user.facebook ?? undefined}
                ig={user.instagram ?? undefined}
            />

            <div className="Info border border-makro rounded-2xl p-4 w-full flex justify-between items-center ">
                <p className="text-textprimary " >🤝 แบ่งปันอาหารไป</p>
                <p className="text-textprimary " >{countSoldItems(user.id)}</p>

                

            </div>
        </div>
    )
}
export default Profile