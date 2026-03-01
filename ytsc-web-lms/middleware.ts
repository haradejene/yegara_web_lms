import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            supabaseResponse = NextResponse.next({
              request,
            })
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Refresh session if expired
  const { data: { user } } = await supabase.auth.getUser()

  // Define protected routes
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard')
  const isProfileRoute = request.nextUrl.pathname.startsWith('/students')
  const isCoursesRoute = request.nextUrl.pathname.startsWith('/courses')
  const isProtectedRoute = isAdminRoute || isDashboardRoute || isProfileRoute || isCoursesRoute

  // If accessing protected route without user, redirect to login
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If accessing admin route, check if user is admin
  if (isAdminRoute && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - api (API routes)
     * - login (login page)
     * - register (register page)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api|login|register).*)',
  ],
}