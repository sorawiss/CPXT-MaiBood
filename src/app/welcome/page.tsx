import Button from "@/components/Button"
import Image from "next/image"
import Link from "next/link"

function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-textprimary ">
      <Image
        src="/welcome.svg"
        alt="Welcome"
        width={260}
        height={260}
      />

      <Image 
        src="/cpaxt-logo.svg"
        alt="Welcome"
        width={260}
        height={260}
      />

      <div className="flex flex-col gap-[1rem] mt-[6rem] ">
        <Link href="/login">
          <Button type="button" text="เข้าสู่ระบบ" className="!w-[22rem] !bg-background !text-textprimary " />
        </Link>
        <Link href="/register">
          <Button type="button" text="สมัครสมาชิก" className="!w-[22rem] !bg-background !text-textprimary " />
        </Link>
        <Button type="button" text="ทดลองใช้งาน" className="!w-[22rem] !text-background border border-background !bg-transparent " />

      </div>


    </div>
  )
}
export default WelcomePage