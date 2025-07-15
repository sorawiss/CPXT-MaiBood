"use client"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation";




function TitleHeader({ title }: { title: string }) {
    const router = useRouter();

    
    return (
        <div className="TitleHeader flex items-center justify-between w-full mb-[2rem] ">
            <ChevronLeft
                className="cursor-pointer text-makro "
                onClick={() => router.back()}
            />
            <h1>{title}</h1>
            <p className="invisible " >.</p>
        </div>
    )
}
export default TitleHeader