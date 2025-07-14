"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Bell, House, Refrigerator, User, Plus } from "lucide-react"

const navItems = [
    {
        name: "หน้าหลัก",
        href: "/",
        icon: <House className="size-[1rem] " />
    },
    {
        name: "แจ้งเตือน",
        href: "/notification",
        icon: <Bell className="size-[1rem] " />
    },
    {
        name: "ตัวฉัน",
        href: "/profile",
        icon: <User className="size-[1rem] " />
    },
    {
        name: "ตู้เย็น",
        href: "/fridge",
        icon: <Refrigerator className="size-[1rem] " />
    },
    {
        name: "แจกจ่าย",
        href: "/fridge/share",
        icon: <Plus className="size-[1rem] " />
    },
]


function NavBar() {
    const pathname = usePathname()
    let currentPage = pathname.split("/")[1]
    const isActive = (href: string) => {
        return currentPage === href.split("/")[1]
    }

    return (
        (
            <div className="NavBar w-full h-[3.5rem] mx-auto flex justify-between items-center py-[0.5rem]
                bg-background rounded-2xl fixed bottom-0 left-0 right-0 z-50 
                shadow-[0px_5px_17px_0px_rgba(0,_0,_0,_0.25)] " >
                <div className="NavWrapper w-[25rem] mx-auto flex justify-between items-center px-[3rem] " >

                    {navItems.map((item, index) => {
                        return (
                            <Link href={item.href} key={index} className={`flex flex-col items-center 
                                ${isActive(item.href) ? "text-makro" : "text-textprimary"}`} >
                                {item.icon}
                                <p className={`p4 ${isActive(item.href) ? "text-makro" : "text-textprimary"}`} >
                                    {item.name}</p>
                            </Link>
                        )
                    })}
                </div>
            </div>

        )

    )
}
export default NavBar