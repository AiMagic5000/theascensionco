"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { UserButtonWrapper } from "@/components/user-button-wrapper"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BookOpen,
  Shield,
  Building2,
  HelpCircle,
  Menu,
  X,
  ChevronRight,
} from "lucide-react"

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/resources", label: "Resources", icon: BookOpen },
  { href: "/dashboard/privacy", label: "Privacy Services", icon: Shield },
  { href: "/dashboard/business", label: "Business Management", icon: Building2 },
  { href: "/dashboard/support", label: "Help & Support", icon: HelpCircle },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 h-16">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
          </button>
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Ascendant Group"
              width={200}
              height={50}
              className="w-[200px] h-auto"
            />
          </Link>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <UserButtonWrapper afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-800">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Ascendant Group"
                width={200}
                height={50}
                className="w-[200px] h-auto"
              />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  <span className="font-medium">{link.label}</span>
                  {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <UserButtonWrapper afterSignOutUrl="/" />
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Account</p>
                </div>
              </div>
              <ThemeToggle className="hidden lg:flex" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="min-h-screen p-4 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
