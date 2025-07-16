import { LoaderCircle } from "lucide-react";
import Image from "next/image";

export default function Loading() {
    return (
        <div className="flex flex-col w-screen h-screen items-center bg-makro justify-center min-h-[calc(100vh-10rem)]">
            <Image src="/maibood-logo.svg" alt="logo" width={106} height={134} className="
            mb-[4rem]" />
            <LoaderCircle className="w-12 h-12 text-background animate-spin" />
            <p className="mt-4 text-lg text-background">กำลังเปิดข้อมูลอาหาร...</p>
        </div>
    );
} 