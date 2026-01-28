"use client"

import { User } from "lucide-react"

interface UserButtonWrapperProps {
  afterSignOutUrl?: string
}

// For static export, show demo user icon
// Clerk integration will be enabled when real keys are provided
export function UserButtonWrapper({ afterSignOutUrl = "/" }: UserButtonWrapperProps) {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
      <User className="h-4 w-4 text-white" />
    </div>
  )
}
