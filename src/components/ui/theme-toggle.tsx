"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={cn("toggle-container", className)}>
        <div className="toggle-label" />
      </div>
    )
  }

  const isDark = theme === "dark"

  return (
    <div className={cn("toggle-container", className)}>
      <input
        type="checkbox"
        id="theme-toggle"
        className="toggle-checkbox"
        checked={isDark}
        onChange={() => setTheme(isDark ? "light" : "dark")}
      />
      <label htmlFor="theme-toggle" className="toggle-label" />
      <style jsx>{`
        .toggle-container {
          display: flex;
          align-items: center;
        }

        .toggle-checkbox {
          display: none;
        }

        .toggle-label {
          height: 32px;
          width: 64px;
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: inset 0 0 3px 2px rgba(255, 255, 255, 1),
            inset 0 0 10px 1px rgba(0, 0, 0, 0.3), 5px 10px 15px rgba(0, 0, 0, 0.1),
            inset 0 0 0 2px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          cursor: pointer;
          position: relative;
          transition: transform 0.3s ease;
        }

        .toggle-label:hover {
          transform: perspective(100px) rotateX(3deg) rotateY(-3deg);
        }

        .toggle-checkbox:checked ~ .toggle-label:hover {
          transform: perspective(100px) rotateX(-3deg) rotateY(3deg);
        }

        .toggle-checkbox:checked ~ .toggle-label {
          background-color: #1f2937;
          box-shadow: inset 0 0 3px 2px rgba(50, 50, 50, 1),
            inset 0 0 10px 1px rgba(0, 0, 0, 0.5), 5px 10px 15px rgba(0, 0, 0, 0.2),
            inset 0 0 0 2px rgba(100, 100, 100, 0.3);
        }

        .toggle-checkbox:checked ~ .toggle-label::before {
          left: 36px;
          background-color: #fbbf24;
          background-image: linear-gradient(130deg, #fde68a 10%, #fbbf24 50%, #f59e0b 90%);
        }

        .toggle-label::before {
          position: absolute;
          content: "";
          height: 22px;
          width: 22px;
          border-radius: 50%;
          background-color: #1f2937;
          background-image: linear-gradient(130deg, #6b7280 10%, #374151 50%, #1f2937 90%);
          left: 5px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 5px 5px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  )
}
