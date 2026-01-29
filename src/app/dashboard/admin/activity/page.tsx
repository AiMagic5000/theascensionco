"use client"

import { useUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Activity,
  FileText,
  User,
  CreditCard,
  Shield,
  Clock,
  Filter,
  Download,
} from "lucide-react"

const isAdminEmail = (email: string | undefined | null): boolean => {
  if (!email) return false
  return email.endsWith("@theascensionco.us") || email.endsWith("@ascensionco.us")
}

// Demo activity data
const demoActivities = [
  {
    id: "1",
    type: "poa_submission",
    user: "John Smith",
    email: "john.smith@email.com",
    description: "Submitted Power of Attorney form",
    details: "IRS Registration requested - $125 payment pending",
    timestamp: "2024-01-28 14:32:00",
    icon: FileText,
    color: "text-blue-600 bg-blue-100",
  },
  {
    id: "2",
    type: "payment",
    user: "Sarah Johnson",
    email: "sarah.j@email.com",
    description: "Payment received",
    details: "$125 for IRS Registration via Gumroad",
    timestamp: "2024-01-28 13:15:00",
    icon: CreditCard,
    color: "text-green-600 bg-green-100",
  },
  {
    id: "3",
    type: "login",
    user: "Michael Brown",
    email: "m.brown@email.com",
    description: "User logged in",
    details: "Dashboard accessed",
    timestamp: "2024-01-28 12:45:00",
    icon: User,
    color: "text-purple-600 bg-purple-100",
  },
  {
    id: "4",
    type: "document",
    user: "John Smith",
    email: "john.smith@email.com",
    description: "Document uploaded",
    details: "Business License.pdf added to Business Management",
    timestamp: "2024-01-28 11:20:00",
    icon: FileText,
    color: "text-amber-600 bg-amber-100",
  },
  {
    id: "5",
    type: "privacy",
    user: "Admin",
    email: "support@theascensionco.us",
    description: "Public records uploaded for Sarah Johnson",
    details: "2 files added to client's download folder",
    timestamp: "2024-01-28 10:00:00",
    icon: Shield,
    color: "text-indigo-600 bg-indigo-100",
  },
]

export default function ActivityLogPage() {
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
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Activity Log
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor all client activities and system events
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Activity Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>All activities from the past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {demoActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="flex gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{activity.description}</p>
                        <p className="text-sm text-gray-500">{activity.details}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400 whitespace-nowrap">
                        <Clock className="h-3 w-3" />
                        {activity.timestamp}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <User className="h-3 w-3" />
                      <span>{activity.user}</span>
                      <span className="text-gray-300">|</span>
                      <span>{activity.email}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button variant="outline">Load More</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
