"use client"

import dynamic from "next/dynamic"
import { ReactNode } from "react"

interface ClerkProviderWrapperProps {
  children: ReactNode
}

const isClerkConfigured = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  return key && !key.includes("placeholder") && key !== "pk_test_xxx"
}

// Dynamically import ClerkProvider only when needed
const ClerkProvider = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.ClerkProvider),
  { ssr: false }
)

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  // If no valid key or placeholder key, render children without Clerk
  if (!isClerkConfigured()) {
    return <>{children}</>
  }

  return <ClerkProvider>{children}</ClerkProvider>
}
