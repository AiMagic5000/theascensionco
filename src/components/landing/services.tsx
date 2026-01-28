"use client"

import { motion } from "framer-motion"
import { Shield, Building2, TrendingUp, FileCheck, Users, Award } from "lucide-react"

const services = [
  {
    icon: Shield,
    title: "Privacy Protection Services",
    description: "Comprehensive privacy solutions to safeguard your personal information and establish a secure financial foundation. Our expert team guides you through every step.",
    features: ["Identity Protection", "Credit Profile Building", "Document Preparation"],
    color: "blue",
  },
  {
    icon: Building2,
    title: "Business Formation & Compliance",
    description: "Launch your enterprise with proper legal structure, compliance frameworks, and operational readiness. We handle the complexity so you can focus on growth.",
    features: ["LLC/Corporation Setup", "EIN Registration", "State Compliance"],
    color: "purple",
  },
  {
    icon: TrendingUp,
    title: "Business Credit Development",
    description: "Build a strong business credit profile separate from your personal credit. Access better financing options and vendor relationships.",
    features: ["D&B Profile Setup", "Tradeline Building", "Credit Monitoring"],
    color: "green",
  },
  {
    icon: FileCheck,
    title: "Credit Enhancement Services",
    description: "Professional credit repair and optimization services to help you achieve your financial goals with a clean, accurate credit history.",
    features: ["Dispute Resolution", "Score Optimization", "Ongoing Monitoring"],
    color: "orange",
  },
  {
    icon: Users,
    title: "Strategic Advisory",
    description: "Personalized consulting to help you navigate complex financial decisions and build sustainable wealth strategies.",
    features: ["Financial Planning", "Risk Assessment", "Growth Strategies"],
    color: "cyan",
  },
  {
    icon: Award,
    title: "Funding Readiness",
    description: "Prepare your business for funding opportunities with proper documentation, financial records, and lender-ready profiles.",
    features: ["Loan Preparation", "Investor Ready Docs", "Bank Relationships"],
    color: "pink",
  },
]

const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    icon: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    icon: "text-purple-600 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-800",
  },
  green: {
    bg: "bg-green-50 dark:bg-green-900/20",
    icon: "text-green-600 dark:text-green-400",
    border: "border-green-200 dark:border-green-800",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-900/20",
    icon: "text-orange-600 dark:text-orange-400",
    border: "border-orange-200 dark:border-orange-800",
  },
  cyan: {
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
    icon: "text-cyan-600 dark:text-cyan-400",
    border: "border-cyan-200 dark:border-cyan-800",
  },
  pink: {
    bg: "bg-pink-50 dark:bg-pink-900/20",
    icon: "text-pink-600 dark:text-pink-400",
    border: "border-pink-200 dark:border-pink-800",
  },
}

export function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Comprehensive Consulting Services
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            From privacy protection to business formation, we provide the strategic guidance
            you need to build a solid financial foundation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const colors = colorMap[service.color]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-gray-900 rounded-2xl p-6 border ${colors.border} hover:shadow-lg transition-shadow`}
              >
                <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <service.icon className={`h-7 w-7 ${colors.icon}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <div className={`w-1.5 h-1.5 ${colors.icon.replace("text-", "bg-")} rounded-full mr-2`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
