"use client"
import { useState } from "react"
import { handleRegister } from "./action"
import Input from "@/components/Input"
import Button from "@/components/Button"
import Link from "next/link"
import Image from "next/image"


export default function Register() {
    const [form, setForm] = useState({ name: "", phone_number: "", password: "", confirm_password: "" })
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)
        const result = await handleRegister(new FormData(e.target as HTMLFormElement))

        if (result?.error) {
            setError(result.error)
        } else {
            setForm({ name: "", phone_number: "", password: "", confirm_password: "" })
        }
        setIsLoading(false)
    }


    // Render
    return (
        <div className="RegisterPage bg-makro min-h-screen flex flex-col items-center justify-end " >

            <div className="LogoWrapper mb-[6rem] ">
                <Image src="/maibood-logo.svg" alt="logo" width={106} height={134} />


            </div>


            {/* Form */}
            <form className="flex flex-col bg-backgroundsecondary w-full px-[2rem] py-[1.5rem] rounded-tl-[88px] p-[2rem] 
                    gap-[1rem] items-center " onSubmit={onSubmit}>
                <h1 className="text-textprimary font-bold text-[2.5rem] " >สมัครใช้งาน</h1>
                <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    label="ชื่อ"
                    value={form.name}
                    onChange={onChangeForm}
                />
                <Input
                    type="tel"
                    name="phone_number"
                    placeholder="Phone Number"
                    label="เบอร์โทรศัพท์"
                    value={form.phone_number}
                    onChange={onChangeForm}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    label="รหัสผ่าน"
                    value={form.password}
                    onChange={onChangeForm}
                />
                <Input
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    label="ยืนยันรหัสผ่าน"
                    value={form.confirm_password}
                    onChange={onChangeForm}
                />
                <Button type="submit" text="สมัคร" className="mt-[1rem] " isLoading={isLoading} />
                <p className="text-textsecondary text-[1.2rem] ">หากมีบัญชีแล้ว  <Link href="/login" className="text-makro">เข้าสู่ระบบ</Link></p>
            </form>

            {error && <div style={{ color: "red" }}>{error}</div>}


        </div>
    )
}