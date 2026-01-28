"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { ReactNode } from "react"

interface ClerkProviderWrapperProps {
  children: ReactNode
}

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  return <ClerkProvider>{children}</ClerkProvider>
}
