import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  if (!path.startsWith('/app')) return NextResponse.next()
  const token = req.cookies.get('sb-access-token')?.value
  if (!token) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirectedFrom', path)
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}
