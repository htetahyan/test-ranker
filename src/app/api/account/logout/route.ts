import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const POST = async () => {

    try {
            const cookie=await cookies()
            cookie.set('ac','',{maxAge:0})
        return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 })
    }catch (err) {
        console.log(err)
        return NextResponse.json({ message: 'Failed to logout' }, { status: 500 })
    }
}