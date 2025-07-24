"use client"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation";
import { PenLine } from "lucide-react";



function TitleHeader({ title, showEdit = false }: { title: string, showEdit?: boolean }) {
    const router = useRouter();

    
    return (
        <div className="TitleHeader flex items-center justify-between w-full mb-[2rem] ">
            <ChevronLeft
                className="cursor-pointer text-textprimary "
                onClick={() => router.back()}
            />
            <h1>{title}</h1>

            {showEdit ? (
                <PenLine className="cursor-pointer text-textprimary " onClick={() => router.push('/profile/edit')} />
            ) : (
                <p className="invisible " >.</p>
            )}
        </div>
    )
}
export default TitleHeader