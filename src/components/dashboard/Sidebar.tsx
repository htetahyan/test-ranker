'use client';
import { SelectUsers } from "@/db/schema/schema";
import { Avatar, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaClipboardList, FaUsers, FaCog, FaHome } from 'react-icons/fa';
import Logo from '@/assets/logo.png';
import Image from "next/image";
import { IoPricetagsOutline } from "react-icons/io5";

const sidebarItems = [
  { href: "/dashboard/assessments", icon: FaClipboardList, label: "My Assessments" },
  { href: "/dashboard/candidates", icon: FaUsers, label: "Candidates" },
  { href: "/dashboard/my-settings", icon: FaCog, label: "Settings" },
  { href: "/dashboard/subscriptions", icon: IoPricetagsOutline, label: "my subscription" },
];

export default function SideBar({ user }: { user: SelectUsers }) {
  const pathname = usePathname();

  return (
    <div className='flex flex-col max-w-[5vw] z-30 h-screen sticky top-0 w-fit bg-gradient-to-r from-slate-50 to-blue-100 shadow-lg'>
      <div className='flex items-center justify-between p-4 shadow-md'>
        <Link href="/dashboard">
          <Image src={Logo} alt="Logo" width={50} height={40} />
        </Link>
      </div>

      <div className="flex flex-col mt-20 space-y-20 px-4">
        {sidebarItems.map((item) => (
              <Tooltip key={item.href} placement="right-end" content={item.label}>

          <Link href={item.href}>
            <div className={`flex w-fit items-center p-2 justify-center transition-all rounded-full ${pathname === item.href ? "bg-blue-100 scale-[2] z-10 translate-x-10" : ""}`}>
              <item.icon className={` ${pathname === item.href ? "text-blue-500" : "text-gray-400"}`} size={24} />
            </div>
          </Link>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
