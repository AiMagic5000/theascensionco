"use client"

import { useTheme } from "next-themes"
import { useEffect, useState, useId } from "react"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const id = useId()

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

  const isDark = theme === "dark"

  const handleToggle = () => {
    const newTheme = isDark ? "light" : "dark"
    setTheme(newTheme)
  }

  return (
    <div className={cn("theme-toggle-container", className)}>
      <input
        type="checkbox"
        id={`theme-toggle-${id}`}
        className="theme-toggle-checkbox"
        checked={isDark}
        onChange={handleToggle}
        aria-label="Toggle dark mode"
      />
      <label
        htmlFor={`theme-toggle-${id}`}
        className="theme-toggle-label"
        role="switch"
        aria-checked={isDark}
      />
    </div>
  )
}
