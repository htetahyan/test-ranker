import SideBar from "@/components/dashboard/Sidebar"
import { currentUser } from "@/service/auth.service"
export const metadata = {
    title: "Dashboard",
    description: "Dashboard",
}
const Layout =async ({ children }: { children: React.ReactNode }) => {
    const user = await currentUser() as any
    return (
        <div className="flex h-screen w-screen relative overflow-hidden">
        <SideBar user={user} />
<div className="flex-1 overflow-y-auto max-w-[95vw] overflow-hidden relative">
            {children}</div>
        </div>
    )
}

export default Layout