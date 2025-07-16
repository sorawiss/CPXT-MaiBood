import { Loader } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
            <Loader className="w-12 h-12 text-makro animate-spin" />
            <p className="mt-4 text-lg text-textsecondary">Loading deliciousness...</p>
        </div>
    );
} 