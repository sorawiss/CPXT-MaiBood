import { getCurrentUser } from "@/utils/user";
import { redirect } from "next/navigation";
import SharePageClient from "./SharePageClient";
import { Suspense } from "react";
import TitleHeader from "@/components/TitleHeader";

export default async function Share() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/welcome");
    }

    return (
        <Suspense fallback={<Loader />}>
            <SharePageClient />
        </Suspense>
    );
}

function Loader() {
    return (
        <div className="min-h-[calc(100vh-10rem)] flex flex-col justify-center items-center w-full ">
            <TitleHeader title="แบ่งปัน ❤︎" />
            <div className="my-auto w-full flex flex-col gap-[1rem]">
                <div className="w-full h-48 bg-gray-200 animate-pulse rounded-lg"></div>
                <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
            </div>
        </div>
    )
}