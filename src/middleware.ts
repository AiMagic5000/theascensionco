import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Check if Clerk is properly configured
const isClerkConfigured = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  return key && !key.includes("placeholder") && key !== "pk_test_xxx"
}

export default async function middleware(request: NextRequest) {
  // If Clerk is not configured, allow all requests (demo mode)
  if (!isClerkConfigured()) {
    return NextResponse.next()
  }

  // Dynamically import and use Clerk middleware when configured
  const { clerkMiddleware, createRouteMatcher } = await import("@clerk/nextjs/server")

  const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/api/accounts(.*)",
    "/api/transactions(.*)",
    "/api/profile(.*)",
  ])

  return clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
      await auth.protect()
    }
  })(request, {} as any)
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
