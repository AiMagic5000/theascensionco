"use client"

import { UserButton } from "@clerk/nextjs"

interface UserButtonWrapperProps {
  afterSignOutUrl?: string
}

export function UserButtonWrapper({ afterSignOutUrl = "/" }: UserButtonWrapperProps) {
  return <UserButton afterSignOutUrl={afterSignOutUrl} />
}
