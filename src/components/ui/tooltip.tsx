"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  position?: "top" | "bottom" | "left" | "right"
  className?: string
  maxWidth?: string
}

export function Tooltip({
  children,
  content,
  position = "top",
  className,
  maxWidth = "320px",
}: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false)

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-gray-900 dark:border-t-gray-700 border-x-transparent border-b-transparent",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 dark:border-b-gray-700 border-x-transparent border-t-transparent",
    left: "left-full top-1/2 -translate-y-1/2 border-l-gray-900 dark:border-l-gray-700 border-y-transparent border-r-transparent",
    right: "right-full top-1/2 -translate-y-1/2 border-r-gray-900 dark:border-r-gray-700 border-y-transparent border-l-transparent",
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            "absolute z-50 px-3 py-2 text-sm bg-gray-900 dark:bg-gray-700 text-white rounded-lg shadow-lg whitespace-normal",
            positionClasses[position],
            className
          )}
          style={{ maxWidth }}
        >
          {content}
          <div
            className={cn(
              "absolute w-0 h-0 border-[6px]",
              arrowClasses[position]
            )}
          />
        </div>
      )}
    </div>
  )
}
