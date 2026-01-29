"use client"

import { useUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Settings,
  Users,
  Activity,
  Mail,
  FileText,
  TrendingUp,
  ArrowRight,
} from "lucide-react"

const isAdminEmail = (email: string | undefined | null): boolean => {
  if (!email) return false
  return email.endsWith("@theascensionco.us") || email.endsWith("@ascensionco.us")
}

const adminCards = [
  {
    title: "Client Management",
    description: "View and manage all registered clients",
    href: "/dashboard/admin/clients",
    icon: Users,
    color: "bg-blue-500",
    stats: "View all clients",
  },
  {
    title: "Activity Log",
    description: "Monitor client activities and form submissions",
    href: "/dashboard/admin/activity",
    icon: Activity,
    color: "bg-green-500",
    stats: "Recent activity",
  },
  {
    title: "Client Emails",
    description: "View client email communications",
    href: "/dashboard/admin/emails",
    icon: Mail,
    color: "bg-purple-500",
    stats: "Email history",
  },
]

export default function AdminPage() {
  const { user, isLoaded } = useUser()

  if (isLoaded && !isAdminEmail(user?.primaryEmailAddress?.emailAddress)) {
    redirect("/dashboard")
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
            <Settings className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Admin Panel
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage clients, view activity, and monitor the platform
            </p>
          </div>
        </div>
      </motion.div>

      {/* Admin Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4"
      >
        <div className="flex items-center gap-2 text-sm text-amber-800 dark:text-amber-300">
          <Settings className="h-4 w-4" />
          <span>Logged in as admin: {user?.primaryEmailAddress?.emailAddress}</span>
        </div>
      </motion.div>

      {/* Admin Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminCards.map((card, index) => (
          <motion.div
            key={card.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
          >
            <Link href={card.href}>
              <Card className="hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-blue-400">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center`}>
                      <card.icon className="h-6 w-6 text-white" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <CardTitle className="mt-4">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{card.stats}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">--</p>
                <p className="text-sm text-gray-500">Total Clients</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">--</p>
                <p className="text-sm text-gray-500">Active This Week</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">--</p>
                <p className="text-sm text-gray-500">POA Submissions</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">--</p>
                <p className="text-sm text-gray-500">Pending Payments</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">
              Connect a database to display real statistics
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
