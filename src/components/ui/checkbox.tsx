"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, checked, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked)
    }

    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={handleChange}
          className="sr-only peer"
          {...props}
        />
        <div
          className={cn(
            "h-5 w-5 shrink-0 rounded border-2 border-gray-300 dark:border-gray-600",
            "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2",
            "peer-checked:bg-blue-600 peer-checked:border-blue-600",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            "transition-colors cursor-pointer",
            className
          )}
          onClick={() => onCheckedChange?.(!checked)}
        >
          {checked && (
            <Check className="h-4 w-4 text-white absolute top-0.5 left-0.5" />
          )}
        </div>
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
