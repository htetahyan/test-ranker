import Header from "@/components/dashboard/Header"
import { currentUser } from "@/service/auth.service"

const layout =async ({ children }: { children: React.ReactNode }) => {
    const user = await currentUser() as any
    return (
        <>
        <Header user={user} />

            {children}
        </>
    )
}

export default layout