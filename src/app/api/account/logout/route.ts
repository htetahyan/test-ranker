import { is } from "drizzle-orm"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const DELETE = async () => {

    try {
            const cookie=await cookies()
         cookie.delete('ac')
        return NextResponse.json({ message: 'logged out ...',isLoggedOut:true }, { status: 200 })
    }catch (err) {
        console.log(err)
        return NextResponse.json({ message: 'Failed to logout',isLoggedOut:false }, { status: 500 })
    }
}