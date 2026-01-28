"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Star, Zap, Crown } from "lucide-react"
import Link from "next/link"

// Privacy Services Packages (CPN + $250 markup)
const privacyPackages = [
  {
    name: "Foundation",
    price: 547,
    description: "Essential privacy protection to get started",
    features: [
      "New Credit Profile Setup",
      "Public Records Submissions (100+)",
      "Privacy Best Practices Guide",
      "Live Phone Support",
      "24-Hour Processing",
    ],
    popular: false,
  },
  {
    name: "Essentials",
    price: 947,
    description: "Enhanced privacy with credit history",
    features: [
      "Everything in Foundation",
      "1 Authorized User Tradeline ($15K-$25K)",
      "Primary Tradeline Access",
      "6-Month to 2-Year Credit History",
      "670+ Credit Score Target",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: 1247,
    description: "Comprehensive privacy and credit building",
    features: [
      "Everything in Essentials",
      "2 Authorized User Accounts ($15K-$25K each)",
      "Enhanced Purchasing Power",
      "2-4 Year Credit History",
      "720+ Credit Score Target",
    ],
    popular: true,
  },
  {
    name: "Executive",
    price: 1847,
    description: "Premium privacy with funding capability",
    features: [
      "Everything in Professional",
      "2 Premium AU Tradelines ($50K-$75K each)",
      "High-Limit Card Eligibility",
      "Funding Capability Setup",
      "740+ Credit Score Target",
    ],
    popular: false,
  },
  {
    name: "Elite",
    price: 2747,
    description: "Maximum privacy protection and credit power",
    features: [
      "Everything in Executive",
      "4 Premium AU Tradelines ($100K-$150K each)",
      "15-30 Year Established History",
      "150+ Public Records Submissions",
      "760+ Credit Score Target",
      "VIP Lender Access List",
    ],
    popular: false,
  },
]

// Business Packages (SMB + $1.5K markup)
const businessPackages = [
  {
    name: "Standard",
    price: 4500,
    description: "Complete business formation and credit foundation",
    icon: Zap,
    features: [
      "LLC or Corporation Formation",
      "EIN Registration & Setup",
      "Registered Agent Service",
      "Operating Agreement/Bylaws",
      "D&B Registration",
      "Business Phone Number",
      "Professional Business Address",
      "Domain & Email Setup",
      "10-Page Custom Website",
      "Payment Processing Integration",
      "400+ News Outlet Press Release",
      "6 Months SEO Optimization",
      "Business Credit Qualification",
      "Lifetime Dashboard Access",
    ],
    popular: false,
  },
  {
    name: "Advanced Dual Corp",
    price: 6500,
    description: "Two-corporation structure for enhanced protection",
    icon: Star,
    features: [
      "Everything in Standard",
      "Second Corporation Formation",
      "15-Page Professional Website",
      "Traffic Booster Package",
      "500+ Premium Backlinks",
      "Advanced SEO Checklist",
      "500+ Business Listings",
      "$10,000 Business Tradeline",
      "Business Credit Monitoring",
      "Curated Credit Issuers List",
      "Business Grants Guidance",
      "6-Figure Funding Qualification",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: 14000,
    description: "Triple corporation with maximum leverage",
    icon: Crown,
    features: [
      "Everything in Advanced",
      "Third Corporation Formation",
      "Triple Corporation Advantage",
      "Velocity Funding Support",
      "Enhanced Asset Protection",
      "$100,000 Business Tradeline",
      "Dedicated Enterprise Support",
      "After-Hours Assistance",
      "Triple Funding Potential",
      "Advanced Corporate Structuring",
    ],
    popular: false,
  },
]

// Credit Repair Package
const creditRepairPackage = {
  name: "Credit Enhancement",
  price: 1500,
  description: "Professional credit repair and optimization",
  features: [
    "Comprehensive Credit Analysis",
    "Dispute Letter Preparation",
    "Bureau Communication Handling",
    "Negative Item Removal Support",
    "Score Optimization Strategy",
    "Monthly Progress Reports",
    "Direct Specialist Support",
    "90-Day Active Service Period",
  ],
}

export function Packages() {
  return (
    <section id="packages" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Choose Your Path to Success
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select the package that best fits your goals. All packages include expert guidance
            and dedicated support throughout your journey.
          </p>
        </motion.div>

        {/* Privacy Services */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Privacy Protection Packages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {privacyPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`relative bg-white dark:bg-gray-900 rounded-2xl p-6 border ${
                  pkg.popular
                    ? "border-blue-500 ring-2 ring-blue-500"
                    : "border-gray-200 dark:border-gray-800"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {pkg.name}
                </h4>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${pkg.price.toLocaleString()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {pkg.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up" className="block mt-6">
                  <Button
                    variant={pkg.popular ? "default" : "outline"}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Business Packages */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Business Formation Packages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white dark:bg-gray-900 rounded-2xl p-8 border ${
                  pkg.popular
                    ? "border-purple-500 ring-2 ring-purple-500"
                    : "border-gray-200 dark:border-gray-800"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Best Value
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center">
                    <pkg.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {pkg.name}
                  </h4>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${pkg.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {pkg.description}
                </p>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up" className="block">
                  <Button
                    variant={pkg.popular ? "default" : "outline"}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Credit Repair */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Credit Enhancement Service
          </h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800"
          >
            <div className="text-center">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                {creditRepairPackage.name}
              </h4>
              <div className="mt-4">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">
                  ${creditRepairPackage.price.toLocaleString()}
                </span>
                <span className="text-gray-600 dark:text-gray-400 ml-2">one-time</span>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                {creditRepairPackage.description}
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {creditRepairPackage.features.map((feature, i) => (
                <div key={i} className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/sign-up">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Start Credit Enhancement
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
