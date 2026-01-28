"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Shield,
  Building2,
  TrendingUp,
  DollarSign,
  FileText,
  Bell,
  ArrowRight,
  CreditCard,
  Briefcase,
} from "lucide-react"

// Demo data for ABC Buggy Whips Company
const demoStats = {
  businessName: "ABC Buggy Whips Co.",
  dunsNumber: "12-345-6789",
  paydexScore: 72,
  totalAccounts: 5,
  pendingTasks: 3,
}

const quickActions = [
  {
    title: "Privacy Services",
    description: "View your privacy file and services",
    href: "/dashboard/privacy",
    icon: Shield,
    color: "blue",
  },
  {
    title: "Business Management",
    description: "Manage accounts and track credit",
    href: "/dashboard/business",
    icon: Building2,
    color: "purple",
  },
  {
    title: "Resources",
    description: "Guides, tools, and credit issuers",
    href: "/dashboard/resources",
    icon: FileText,
    color: "green",
  },
  {
    title: "Get Support",
    description: "Contact our team for assistance",
    href: "/dashboard/support",
    icon: Bell,
    color: "orange",
  },
]

const recentActivity = [
  { type: "account", message: "Business checking account added", time: "2 hours ago" },
  { type: "credit", message: "D&B profile updated", time: "1 day ago" },
  { type: "service", message: "Privacy service activated", time: "3 days ago" },
  { type: "notification", message: "Monthly statement available", time: "1 week ago" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            This is demo content until we start building your privacy file or business.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/business">
            View Business Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Business</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                  {demoStats.businessName}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">D&B Number</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                  {demoStats.dunsNumber}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">PAYDEX Score</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                  {demoStats.paydexScore}/100
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Accounts</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                  {demoStats.totalAccounts} Active
                </p>
              </div>
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 bg-${action.color}-100 dark:bg-${action.color}-900/50 rounded-xl flex items-center justify-center mb-4`}
                  >
                    <action.icon
                      className={`h-6 w-6 text-${action.color}-600 dark:text-${action.color}-400`}
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{action.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest account updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 pb-3 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0"
                >
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                    {activity.type === "account" && (
                      <DollarSign className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    )}
                    {activity.type === "credit" && (
                      <TrendingUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    )}
                    {activity.type === "service" && (
                      <Shield className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    )}
                    {activity.type === "notification" && (
                      <Bell className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
            <CardDescription>Items that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <span className="text-sm text-gray-900 dark:text-white">
                    Complete business profile
                  </span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/business">Start</Link>
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm text-gray-900 dark:text-white">
                    Add business bank account
                  </span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/business">Add</Link>
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-gray-900 dark:text-white">
                    Review credit issuer options
                  </span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/resources">View</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
