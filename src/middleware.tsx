import { NextRequest, NextResponse } from "next/server"
import { currentUser } from "./service/auth.service"

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/assessments/:path*',
        '/account',
        '/admin/:path*',
    ],
}
const rateLimitMap = new Map();

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    const user= await currentUser()
    if (pathname === '/account' && user) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    if (pathname === '/admin' && user?.role !== 'Admin') {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    if (pathname.startsWith('/dashboard') && !user) {
        return NextResponse.redirect(new URL('/account', req.url))
    }
    
}