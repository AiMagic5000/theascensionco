"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Star, Zap, Crown, Shield, AlertCircle } from "lucide-react"
import Link from "next/link"

// Credit Privacy Number Packages (CPN + $250 markup)
const cpnPackages = [
  {
    name: "Foundation",
    price: 547,
    ficoScore: "New File",
    description: "Start fresh with a legally established credit privacy file",
    features: [
      "Legally Established Credit Privacy Number",
      "IRS Credit Partner Registration Guidance",
      "100+ Public Records Database Submissions",
      "Complete Privacy Documentation Package",
      "24-Hour File Activation",
      "Dedicated Phone Support",
    ],
    tradelines: "Primary tradelines (self-applied)",
    idealFor: "Those seeking a fresh financial start with rental deposits",
    popular: false,
  },
  {
    name: "Essentials",
    price: 947,
    ficoScore: "670+",
    description: "Enhanced file with established credit history",
    features: [
      "Everything in Foundation Package",
      "1 Authorized User Tradeline ($15K-$25K limit)",
      "6-Month to 2-Year Established History",
      "Primary Tradeline Application Access",
      "Credit Building Strategy Guide",
      "File Monitoring Setup",
    ],
    tradelines: "1 AU tradeline included",
    idealFor: "Apartment rentals with reduced move-in costs",
    popular: false,
  },
  {
    name: "Professional",
    price: 1247,
    ficoScore: "720+",
    description: "Robust file for serious credit applications",
    features: [
      "Everything in Essentials Package",
      "2 Premium AU Accounts ($15K-$25K each)",
      "2-4 Year Established Credit History",
      "Enhanced Purchasing Capability",
      "Auto Loan Qualification Support",
      "Business Credit PG Eligibility",
    ],
    tradelines: "2 AU tradelines included",
    idealFor: "Credit cards, auto financing, business guarantees",
    popular: true,
  },
  {
    name: "Executive",
    price: 1847,
    ficoScore: "740+",
    description: "Premium file with high-limit tradelines",
    features: [
      "Everything in Professional Package",
      "2 High-Limit AU Tradelines ($50K-$75K each)",
      "Advanced Funding Capability",
      "Premium Credit Card Eligibility",
      "Business Startup Credit Access",
      "Priority Processing & Support",
    ],
    tradelines: "2 high-limit AU tradelines",
    idealFor: "Business funding and premium credit lines",
    popular: false,
  },
  {
    name: "Elite",
    price: 2747,
    ficoScore: "760+",
    description: "Maximum credit power with seasoned history",
    features: [
      "Everything in Executive Package",
      "4 Premium AU Tradelines ($100K-$150K each)",
      "15-30 Year Seasoned Credit History",
      "150+ Public Records Submissions",
      "Exclusive Lender Access Directory",
      "Wealth Building Resource Library",
      "VIP Concierge Support",
    ],
    tradelines: "4 premium AU tradelines",
    idealFor: "Maximum funding potential and wealth building",
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
    <section id="packages" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Choose Your Path to Financial Freedom
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our Credit Privacy Numbers are legally established identifiers with standing in commerce.
            Each package includes expert guidance and dedicated support throughout your journey.
          </p>
        </motion.div>

        {/* CPN Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-4xl mx-auto"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-900 mb-2">
                  About Our Credit Privacy Numbers
                </h4>
                <p className="text-blue-800 text-sm leading-relaxed">
                  Every Credit Privacy Number we provide undergoes rigorous verification to confirm it has no prior associations with other entities. Our comprehensive forensic audit process identifies any existing financial activity before issuance. Under established commercial law, no party holds exclusive rights to any 9-digit identifier unless it has been formally registered as a credit partner in commerce. This means we can verify whether any number - whether previously linked to a Social Security Number or another Credit Privacy Number - has any prior activity before you receive it.
                </p>
                <p className="text-blue-800 text-sm leading-relaxed mt-3">
                  <strong>IRS Registration:</strong> For additional security and legal standing, we provide guidance on registering your new credit profile number with the IRS as a credit partner. This establishes your number with full legal status in commerce.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CPN Packages */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Credit Privacy Number Packages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {cpnPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`relative bg-white rounded-2xl p-6 border ${
                  pkg.popular
                    ? "border-blue-500 ring-2 ring-blue-500"
                    : "border-gray-200"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <h4 className="text-lg font-semibold text-gray-900">
                  {pkg.name}
                </h4>

                {/* FICO Score Badge */}
                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                  FICO: {pkg.ficoScore}
                </div>

                <div className="mt-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ${pkg.price.toLocaleString()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {pkg.description}
                </p>

                {/* Tradelines Info */}
                <div className="mt-3 text-xs text-blue-600 font-medium">
                  {pkg.tradelines}
                </div>

                <ul className="mt-4 space-y-2">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Ideal For */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    <strong>Ideal for:</strong> {pkg.idealFor}
                  </p>
                </div>

                <Link href="/sign-up" className="block mt-4">
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

          {/* Payment Options Note */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Payment plans available. Contact us for financing options on all packages.
          </p>
        </div>

        {/* Business Packages */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
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
                className={`relative bg-white rounded-2xl p-8 border ${
                  pkg.popular
                    ? "border-purple-500 ring-2 ring-purple-500"
                    : "border-gray-200"
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
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <pkg.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    {pkg.name}
                  </h4>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${pkg.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">
                  {pkg.description}
                </p>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
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
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Credit Enhancement Service
          </h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200"
          >
            <div className="text-center">
              <h4 className="text-2xl font-bold text-gray-900">
                {creditRepairPackage.name}
              </h4>
              <div className="mt-4">
                <span className="text-5xl font-bold text-gray-900">
                  ${creditRepairPackage.price.toLocaleString()}
                </span>
                <span className="text-gray-600 ml-2">one-time</span>
              </div>
              <p className="mt-4 text-gray-600">
                {creditRepairPackage.description}
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {creditRepairPackage.features.map((feature, i) => (
                <div key={i} className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-gray-700">{feature}</span>
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
