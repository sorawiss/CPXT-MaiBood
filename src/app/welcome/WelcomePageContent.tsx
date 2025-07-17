"use client";
import Button from "@/components/Button";
import { useFormStatus } from "react-dom";
import { handleGuestLogin } from "./action";

function GuestLoginButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            text="ทดลองใช้งาน"
            className="!w-[22rem] !text-background border border-background !bg-transparent"
            isLoading={pending}
        />
    );
}

export default function WelcomePageContent() {
    return (
        <form action={handleGuestLogin}>
            <GuestLoginButton />
        </form>
    )
} 