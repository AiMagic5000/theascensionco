"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={cn("theme-toggle-container", className)}>
        <div className="theme-toggle-label" />
      </div>
    )
  }

  const isDark = resolvedTheme === "dark"

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <div className={cn("theme-toggle-container", className)}>
      <input
        type="checkbox"
        id="theme-toggle-input"
        className="theme-toggle-checkbox"
        checked={isDark}
        onChange={handleToggle}
        aria-label="Toggle dark mode"
      />
      <label
        htmlFor="theme-toggle-input"
        className="theme-toggle-label"
        role="switch"
        aria-checked={isDark}
      />
    </div>
  )
}
