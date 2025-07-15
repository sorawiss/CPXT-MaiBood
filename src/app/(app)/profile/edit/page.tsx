
import { verifySession } from "@/utils/session";
import { prismaDB } from "@/lib/prisma-client";
import EditProfileForm from "./EditProfileForm";


async function page() {
    const userSession = await verifySession();
    const user = await prismaDB.user.findUnique({
        where: { id: userSession.userId as string },
    });

    if (!user) {
        return <div>User not found</div>
    }

    return (
        <EditProfileForm user={user} />
    )
}

export default page