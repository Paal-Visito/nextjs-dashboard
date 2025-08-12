import type { NextAuthConfig } from 'next-auth'
import { tr } from 'zod/v4/locales'
 
export const authConfig = {
  pages: {
    signIn: '/login'
  },
  trustHost: true,
  callbacks: {
    authorized({ auth, request: { nextUrl }}) {
        const isLoggedIn = !!auth?.user
        const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
        const isOnGolf = nextUrl.pathname.startsWith('/golf')
        if (isOnDashboard || isOnGolf) {
            if (isLoggedIn) {
                return true
            }
            return false
        } else if (isLoggedIn) {
            return Response.redirect(new URL('/dashboard/golf', nextUrl))
        }
        return true
    }
  },
  providers: []
} satisfies NextAuthConfig