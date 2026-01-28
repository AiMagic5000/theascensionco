"use client"

import { ReactNode } from "react"

interface ClerkProviderWrapperProps {
  children: ReactNode
}

// Static export doesn't support Clerk's server actions
// Clerk auth will work at runtime but build uses demo mode
export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  return <>{children}</>
}
