"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Shield, ChevronDown, ArrowRight, Star, Building2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

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

const featureDetails = [
  {
    title: "Legally Established Credit Privacy Numbers",
    description: "Your Credit Privacy Number is a legitimate 9-digit identifier that has been thoroughly vetted through our forensic audit process. Every number we issue has zero prior associations with any other entity, ensuring you start with a completely clean slate.",
    benefits: [
      "Verified through comprehensive database searches",
      "No prior credit history or financial associations",
      "Legally compliant with federal regulations",
      "Registered through proper commercial channels"
    ]
  },
  {
    title: "IRS Credit Partner Registration",
    description: "We provide complete guidance on registering your new credit profile number with the IRS as a credit partner. This establishes your number with full legal status in commerce, giving you the foundation for legitimate financial activities.",
    benefits: [
      "Step-by-step registration assistance",
      "Legal standing in commercial transactions",
      "Proper documentation for financial institutions",
      "Compliance with federal requirements"
    ]
  },
  {
    title: "Public Records Database Submissions",
    description: "Your new credit file gets submitted to over 100 public records databases, establishing your presence across the financial ecosystem. This creates the foundational footprint that lenders and businesses look for when evaluating new credit applications.",
    benefits: [
      "Widespread database presence",
      "Consistent identity across platforms",
      "Enhanced credibility with lenders",
      "Faster credit file recognition"
    ]
  },
  {
    title: "Authorized User Tradelines",
    description: "Our tradeline packages include being added as an authorized user to established credit accounts with perfect payment histories. These accounts report to all three major credit bureaus, instantly boosting your credit profile with years of positive history.",
    benefits: [
      "Immediate credit history establishment",
      "High-limit accounts ($15K-$150K)",
      "Perfect payment history records",
      "Reports to Experian, Equifax, and TransUnion"
    ]
  },
  {
    title: "Privacy Documentation Package",
    description: "Receive a complete set of privacy documentation that supports your new credit file. This includes all necessary paperwork to maintain your privacy while engaging in legitimate financial activities.",
    benefits: [
      "Comprehensive documentation set",
      "Privacy protection guidelines",
      "Financial institution templates",
      "Ongoing support materials"
    ]
  },
  {
    title: "Dedicated Support & Guidance",
    description: "Every package includes access to our team of credit specialists who guide you through the entire process. From initial setup to your first credit applications, you will have expert support every step of the way.",
    benefits: [
      "One-on-one specialist consultations",
      "Application strategy guidance",
      "Ongoing credit building support",
      "Priority response times for higher tiers"
    ]
  },
]

const faqs = [
  {
    q: "What exactly is a Credit Privacy Number?",
    a: "A Credit Privacy Number (CPN) is a nine-digit identifier used for credit reporting purposes. When properly established and registered, it serves as an alternative to your Social Security Number for credit-related activities, providing an additional layer of privacy protection."
  },
  {
    q: "Is using a Credit Privacy Number legal?",
    a: "Yes, using a properly established CPN for legitimate credit purposes is legal. The key is that the number must be obtained through legal channels, not associated with another person, and used truthfully on credit applications. We ensure every CPN we provide meets these requirements."
  },
  {
    q: "How is a CPN different from a Social Security Number?",
    a: "A Social Security Number is issued by the government for tax and benefits purposes. A CPN is a separate identifier used specifically for credit reporting. While both are 9-digit numbers, they serve different purposes and a CPN should never be used for government-related activities."
  },
  {
    q: "What verification process do you use for CPNs?",
    a: "Every CPN undergoes a rigorous forensic audit to verify it has no prior credit history, no associations with other individuals, and no existing financial footprint. This ensures you receive a completely clean number with no inherited problems."
  },
  {
    q: "How long does it take to receive my CPN package?",
    a: "Most packages are activated within 24-48 hours. The Foundation package includes 24-hour file activation, while packages with tradelines may take slightly longer as we coordinate with our tradeline partners to add you to established accounts."
  },
  {
    q: "What credit score can I expect with each package?",
    a: "The Foundation package starts you with a new file. The Essentials package typically establishes a 670+ FICO score, Professional reaches 720+, Executive achieves 740+, and our Elite package can establish scores of 760+ depending on the tradelines included."
  },
  {
    q: "How do authorized user tradelines work?",
    a: "You are added as an authorized user to established credit accounts with perfect payment history. These accounts then report to credit bureaus, adding their positive history to your credit file. You do not have access to the account or any spending ability - it is purely for credit building."
  },
  {
    q: "How long do tradelines stay on my credit report?",
    a: "Tradelines typically remain on your credit report for as long as the primary account holder maintains the account. Our tradeline partners maintain accounts specifically for this purpose, so you can expect long-term reporting in most cases."
  },
  {
    q: "Can I use my CPN for apartment rentals?",
    a: "Yes, one of the most common uses for a CPN is apartment applications. A properly established CPN with positive credit history can help you qualify for rentals and potentially reduce security deposit requirements."
  },
  {
    q: "Will my CPN work for auto financing?",
    a: "Yes, our Professional package and above are specifically designed to qualify for auto financing. The established credit history and FICO scores achieved with these packages meet most auto lender requirements."
  },
  {
    q: "Can I get business credit with a CPN?",
    a: "Absolutely. Many business owners use CPNs to separate their personal credit from business activities. Our Executive and Elite packages include features specifically designed for business credit establishment."
  },
  {
    q: "What is IRS Credit Partner Registration?",
    a: "This is the process of properly registering your CPN with the IRS as a legitimate credit identifier. We provide guidance on completing this registration, which establishes your number with full legal standing in commerce."
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes, we understand these are significant investments. Contact our team to discuss flexible payment options that work with your budget. We want to make financial freedom accessible to everyone."
  },
  {
    q: "What happens after I purchase a package?",
    a: "You will receive immediate confirmation and a welcome email with next steps. Our team will reach out within 24 hours to begin the onboarding process, answer any questions, and guide you through establishing your new credit file."
  },
  {
    q: "How do I build credit after receiving my CPN?",
    a: "We provide comprehensive guidance on building your credit profile. This includes applying for starter credit products, maintaining proper utilization, and strategically adding positive accounts over time. Higher-tier packages include detailed credit building strategy guides."
  },
  {
    q: "What credit bureaus will my CPN report to?",
    a: "Your CPN and associated tradelines will report to all three major credit bureaus: Experian, Equifax, and TransUnion. This ensures comprehensive coverage across all credit checking platforms."
  },
  {
    q: "Can banks verify my CPN?",
    a: "Yes, properly established CPNs pass standard bank verification processes. The public records submissions included in our packages ensure your identity is verifiable across the databases banks commonly check."
  },
  {
    q: "What if my CPN gets rejected by a lender?",
    a: "While rare with our properly established CPNs, if you encounter issues, our support team will help troubleshoot. This may involve additional documentation or choosing a more CPN-friendly lender from our recommended list."
  },
  {
    q: "How is my privacy protected?",
    a: "Your CPN provides a layer of separation between your personal SSN and credit activities. All communications are encrypted, your information is stored securely, and we never share your details with unauthorized parties."
  },
  {
    q: "What types of credit can I apply for with a CPN?",
    a: "You can apply for most types of consumer credit including credit cards, auto loans, personal loans, and retail credit accounts. The specific products available depend on your credit profile strength, which is why higher packages include better tradelines."
  },
  {
    q: "Do you guarantee specific credit scores?",
    a: "While we provide estimated FICO ranges based on the tradelines included in each package, individual results may vary. Credit scores depend on multiple factors including how you manage your new credit accounts after establishment."
  },
  {
    q: "What is the difference between primary and AU tradelines?",
    a: "Primary tradelines are accounts you open in your own name. Authorized User (AU) tradelines are accounts where you are added as a user to someone else's established account. Both report to credit bureaus and build credit history."
  },
  {
    q: "How do public records submissions help my credit?",
    a: "Public records submissions establish your identity across databases that lenders and verification services check. This creates the foundational footprint necessary for credit applications to process successfully."
  },
  {
    q: "Can I upgrade my package later?",
    a: "Yes, you can upgrade to a higher tier package at any time. The cost difference will be applied, and additional tradelines and services will be added to your existing file. Many clients start with Foundation and upgrade as they see results."
  },
  {
    q: "What documentation do I need to get started?",
    a: "Getting started is simple. You will need basic identification information and contact details. Our team will guide you through any additional documentation requirements during the onboarding process."
  },
  {
    q: "How long until I can start applying for credit?",
    a: "With our Foundation package, you can begin applying for credit-building products within 24-48 hours. Packages with tradelines typically require 1-2 weeks for the accounts to report to bureaus before you will see the full credit profile established."
  },
  {
    q: "What support is included after purchase?",
    a: "All packages include ongoing support. Foundation includes dedicated phone support, while higher tiers include priority response times and VIP concierge service for Elite members. We are here to help you succeed long-term."
  },
  {
    q: "Are there any recurring fees?",
    a: "No, our packages are one-time purchases. There are no monthly fees or hidden charges. You pay once and receive all the services and tradelines included in your chosen package."
  },
  {
    q: "What makes your CPNs different from others?",
    a: "Every CPN we provide undergoes forensic auditing to verify zero prior associations. We do not resell numbers or use questionable sources. Combined with our IRS registration guidance and comprehensive support, we offer a complete solution rather than just a number."
  },
  {
    q: "Can I get a refund if I am not satisfied?",
    a: "Due to the nature of our services and the resources expended upon order placement, we offer a limited satisfaction guarantee. Contact our team within 30 days if you have concerns, and we will work to address any issues with your package."
  },
]

function FeatureDropdown({ feature, index }: { feature: typeof featureDetails[0], index: number }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border border-gray-200 rounded-xl overflow-hidden bg-white"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="text-gray-600 mb-4">{feature.description}</p>
          <ul className="space-y-2">
            {feature.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  )
}

function FAQItem({ faq, index }: { faq: typeof faqs[0], index: number }) {
  const [isOpen, setIsOpen] = useState(index < 5)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      className="border-b border-gray-200 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <h4 className="text-base font-medium text-gray-900 pr-4">{faq.q}</h4>
        <ChevronDown className={`h-5 w-5 text-gray-500 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <p className="pb-4 text-gray-600">{faq.a}</p>
      )}
    </motion.div>
  )
}

export default function CreditPrivacyNumbersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920&q=80"
            alt="Financial freedom"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6"
            >
              <Shield className="h-5 w-5 text-blue-300 mr-2" />
              <span className="text-blue-100 text-sm font-medium">Privacy Protection Services</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Credit Privacy Numbers
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100 mb-8"
            >
              Establish a fresh financial identity with our legally compliant Credit Privacy Numbers.
              Each CPN is forensically verified, IRS-registered, and backed by our comprehensive support system.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="#packages">
                <Button size="lg" className="w-full sm:w-auto bg-white text-blue-900 hover:bg-blue-50">
                  View Packages
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  Get Started Today
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "10,000+", label: "Clients Served" },
              { stat: "99.8%", label: "Success Rate" },
              { stat: "24hr", label: "File Activation" },
              { stat: "100+", label: "Database Submissions" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-3xl font-bold text-blue-600">{item.stat}</div>
                <div className="text-gray-600">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose CPN */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why People Choose Credit Privacy Numbers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A fresh start opens doors that were previously closed. Here is what becomes possible with a properly established CPN.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
                title: "Housing Opportunities",
                description: "Qualify for apartments and rentals without past credit issues holding you back. Lower security deposits and better lease terms become accessible."
              },
              {
                image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80",
                title: "Vehicle Financing",
                description: "Get approved for auto loans with competitive rates. No more being limited to buy-here-pay-here dealers or requiring large down payments."
              },
              {
                image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
                title: "Business Growth",
                description: "Separate personal and business credit. Access business funding, credit lines, and vendor accounts without personal credit limitations."
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
              >
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your CPN Package
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every package includes our forensic verification process and IRS registration guidance.
              Select the tier that matches your credit goals.
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
                <Shield className="h-8 w-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">
                    Our CPN Verification Process
                  </h4>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    Every Credit Privacy Number we provide undergoes rigorous verification to confirm it has no prior associations with other entities. Our comprehensive forensic audit process identifies any existing financial activity before issuance. Under established commercial law, no party holds exclusive rights to any 9-digit identifier unless it has been formally registered as a credit partner in commerce.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Personal Guarantor Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 max-w-4xl mx-auto"
          >
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Building2 className="h-8 w-8 text-purple-600 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-purple-900 mb-2">
                    Use Your CPN as a Business Personal Guarantor
                  </h4>
                  <p className="text-purple-800 text-sm leading-relaxed">
                    One of the most powerful uses for a properly established Credit Privacy Number is serving as the personal guarantor on an LLC or Corporation. When you attach a CPN with excellent credit standing to your business as the personal guarantee, you unlock access to business credit lines, vendor accounts, and funding that would otherwise require strong personal credit.
                  </p>
                  <p className="text-purple-800 text-sm leading-relaxed mt-3">
                    <strong>Recommended Strategy:</strong> Our Professional, Executive, and Elite packages are specifically designed for business use. The established credit history and high FICO scores (720-760+) meet the requirements that most business lenders look for when evaluating personal guarantees. This allows you to separate your personal SSN from business credit activities while still accessing substantial funding opportunities.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

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
                    <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}
                <h4 className="text-lg font-semibold text-gray-900">
                  {pkg.name}
                </h4>

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

          <p className="text-center text-sm text-gray-500 mt-6">
            Payment plans available. Contact us for financing options on all packages.
          </p>
        </div>
      </section>

      {/* Feature Details */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What is Included in Every Package
            </h2>
            <p className="text-lg text-gray-600">
              Understand exactly what you receive with your Credit Privacy Number package.
            </p>
          </motion.div>

          <div className="space-y-4">
            {featureDetails.map((feature, index) => (
              <FeatureDropdown key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Get answers to the most common questions about Credit Privacy Numbers.
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 divide-y divide-gray-200 px-6">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
          >
            Ready for a Fresh Financial Start?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100 mb-8"
          >
            Join thousands of clients who have transformed their financial futures with our Credit Privacy Number services.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/sign-up">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
