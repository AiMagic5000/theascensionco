"use client"

import dynamic from "next/dynamic"
import { User } from "lucide-react"

const isClerkConfigured = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  return key && !key.includes("placeholder") && key !== "pk_test_xxx"
}

// Dynamically import UserButton only when Clerk is configured
const UserButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.UserButton),
  {
    ssr: false,
    loading: () => (
      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    ),
  }
)

interface UserButtonWrapperProps {
  afterSignOutUrl?: string
}

export function UserButtonWrapper({ afterSignOutUrl = "/" }: UserButtonWrapperProps) {
  if (!isClerkConfigured()) {
    // Show demo user icon when Clerk is not configured
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
        <User className="h-4 w-4 text-white" />
      </div>
    )
  }

  return <UserButton afterSignOutUrl={afterSignOutUrl} />
}
