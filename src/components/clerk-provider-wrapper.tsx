"use client"

import { ReactNode } from "react"

interface ClerkProviderWrapperProps {
  children: ReactNode
}

// For static export, we don't use Clerk at all
// Clerk will be enabled when real keys are provided in production
export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  return <>{children}</>
}
