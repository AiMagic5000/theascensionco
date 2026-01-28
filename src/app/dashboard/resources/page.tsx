"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ExternalLink,
  CreditCard,
  Building2,
  TrendingUp,
  FileText,
  BookOpen,
  Star,
} from "lucide-react"

// Top 10 Business Fintech Credit Issuers
const fintechIssuers = [
  {
    name: "Brex",
    description: "Business credit cards with no personal guarantee required",
    url: "https://brex.com",
    features: ["No PG", "Rewards", "Expense Management"],
    rating: 4.8,
  },
  {
    name: "Ramp",
    description: "Corporate cards with built-in savings and controls",
    url: "https://ramp.com",
    features: ["No PG", "Cashback", "Spend Controls"],
    rating: 4.7,
  },
  {
    name: "Divvy (Bill.com)",
    description: "Free expense management and business credit cards",
    url: "https://divvy.com",
    features: ["Free Software", "Credit Builder", "Rewards"],
    rating: 4.6,
  },
  {
    name: "Mercury",
    description: "Banking for startups with credit card offerings",
    url: "https://mercury.com",
    features: ["Banking", "Cards", "Treasury"],
    rating: 4.7,
  },
  {
    name: "Bluevine",
    description: "Business banking and line of credit solutions",
    url: "https://bluevine.com",
    features: ["Line of Credit", "Banking", "Invoice Factoring"],
    rating: 4.5,
  },
  {
    name: "Fundbox",
    description: "Working capital and line of credit for small business",
    url: "https://fundbox.com",
    features: ["Line of Credit", "Net Terms", "Fast Approval"],
    rating: 4.4,
  },
  {
    name: "Kabbage (Amex)",
    description: "Flexible line of credit from American Express",
    url: "https://kabbage.com",
    features: ["Line of Credit", "Amex Network", "Quick Access"],
    rating: 4.3,
  },
  {
    name: "Nav",
    description: "Business credit and financing marketplace",
    url: "https://nav.com",
    features: ["Credit Monitoring", "Loan Matching", "Education"],
    rating: 4.4,
  },
  {
    name: "Novo",
    description: "Business banking designed for entrepreneurs",
    url: "https://novo.co",
    features: ["Free Banking", "Integrations", "Cashback"],
    rating: 4.5,
  },
  {
    name: "Relay",
    description: "No-fee business banking with smart features",
    url: "https://relayfi.com",
    features: ["No Fees", "Multiple Accounts", "Profit First"],
    rating: 4.6,
  },
]

// Soft Pull Business Credit Issuers
const softPullIssuers = [
  {
    name: "Uline",
    description: "Net 30 account with soft pull credit check",
    type: "Net 30",
    reports: "D&B, Experian",
  },
  {
    name: "Grainger",
    description: "Industrial supplies with business credit account",
    type: "Net 30",
    reports: "D&B",
  },
  {
    name: "Quill",
    description: "Office supplies with business credit terms",
    type: "Net 30",
    reports: "D&B, Experian",
  },
  {
    name: "Strategic Network Solutions",
    description: "Net 30 vendor account for tech supplies",
    type: "Net 30",
    reports: "D&B, Experian, Equifax",
  },
  {
    name: "Crown Office Supplies",
    description: "Office products with easy approval",
    type: "Net 30",
    reports: "D&B, Experian",
  },
  {
    name: "Summa Office Supplies",
    description: "Business supplies vendor account",
    type: "Net 30",
    reports: "D&B, Experian",
  },
]

// Educational Resources
const resources = [
  {
    title: "Business Credit Building Guide",
    description: "Step-by-step guide to establishing business credit",
    type: "Guide",
    icon: BookOpen,
  },
  {
    title: "PAYDEX Score Explained",
    description: "Understanding your D&B PAYDEX score",
    type: "Article",
    icon: TrendingUp,
  },
  {
    title: "Net 30 Account Strategy",
    description: "How to use vendor accounts to build credit",
    type: "Guide",
    icon: Building2,
  },
  {
    title: "Business Credit Monitoring",
    description: "Tools and services to track your progress",
    type: "Resource",
    icon: FileText,
  },
]

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Resources</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Credit issuers, vendor accounts, and educational materials
        </p>
      </div>

      {/* Top Fintech Credit Issuers */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-blue-600" />
          Top 10 Business Fintech Credit Issuers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fintechIssuers.map((issuer, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{issuer.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-xs">{issuer.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {issuer.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {issuer.features.map((feature, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <a href={issuer.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Soft Pull Issuers */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-purple-600" />
          Soft Pull Business Credit Issuers
        </h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                      Vendor
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                      Reports To
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {softPullIssuers.map((issuer, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                        {issuer.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {issuer.description}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full">
                          {issuer.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {issuer.reports}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Educational Resources */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-green-600" />
          Educational Resources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map((resource, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-3">
                  <resource.icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {resource.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {resource.description}
                </p>
                <span className="inline-block mt-3 px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">
                  {resource.type}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
