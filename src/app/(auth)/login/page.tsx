"use client"
import { useState } from "react"
import { handleLogin } from "./action"
import Input from "@/components/Input"
import Button from "@/components/Button"
import Link from "next/link"
import Image from "next/image"


function Login() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await handleLogin(new FormData(e.target as HTMLFormElement))
      console.log("login", result)
    } finally {
      setIsLoading(false)
    }
  }


  // Render
  return (
    <div className="LoginPage bg-makro min-h-screen flex flex-col items-center justify-end " >

      <div className="LogoWrapper mb-[10rem] ">
        <Image src="/maibood-logo.svg" alt="logo" width={106} height={134} />


      </div>


      {/* Form */}
      <form className="flex flex-col bg-backgroundsecondary w-full px-[2rem] py-[1.5rem] rounded-tl-[88px] p-[2rem] 
    gap-[1rem] items-center " onSubmit={handleSubmit}>
        <h1 className="text-textprimary font-bold text-[2.5rem] " >เข้าสู่ระบบ</h1>
        <Input
          type="tel"
          name="phone_number"
          placeholder="Phone Number"
          label="เบอร์โทรศัพท์"
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          label="รหัสผ่าน"
        />
        <Button type="submit" text="เข้าสู่ระบบ" className="mt-[1rem]" isLoading={isLoading} />
        <p className="text-textsecondary text-[1.2rem] ">หากยังไม่มีบัญชี  <Link href="/register" className="text-makro">สมัครสมาชิก</Link></p>
      </form>
    </div>
  )
}
export default Login