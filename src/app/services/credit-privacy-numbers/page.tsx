"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Check, Shield, ChevronDown, ArrowRight, Star, Building2,
  Sparkles, BadgeCheck, FileCheck, Users, Clock, Phone,
  CreditCard, Home, Car, Briefcase, Lock, Award, Zap
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Navigation } from "@/components/landing/navigation"
import { Footer } from "@/components/landing/footer"

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
    icon: Shield,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-50",
    description: "Your Credit Privacy Number is a legitimate 9-digit identifier that has been thoroughly vetted through our forensic audit process. Every number we issue has zero prior associations with any other entity, ensuring you start with a completely clean slate.",
    benefits: [
      { text: "Verified through comprehensive database searches", icon: BadgeCheck },
      { text: "No prior credit history or financial associations", icon: FileCheck },
      { text: "Legally compliant with federal regulations", icon: Shield },
      { text: "Registered through proper commercial channels", icon: Award },
    ]
  },
  {
    title: "IRS Credit Partner Registration",
    icon: FileCheck,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
    description: "We provide complete guidance on registering your new credit profile number with the IRS as a credit partner. This establishes your number with full legal status in commerce, giving you the foundation for legitimate financial activities.",
    benefits: [
      { text: "Step-by-step registration assistance", icon: Check },
      { text: "Legal standing in commercial transactions", icon: Shield },
      { text: "Proper documentation for financial institutions", icon: FileCheck },
      { text: "Compliance with federal requirements", icon: BadgeCheck },
    ]
  },
  {
    title: "Public Records Database Submissions",
    icon: Users,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50",
    description: "Your new credit file gets submitted to over 100 public records databases, establishing your presence across the financial ecosystem. This creates the foundational footprint that lenders and businesses look for when evaluating new credit applications.",
    benefits: [
      { text: "Widespread database presence", icon: Sparkles },
      { text: "Consistent identity across platforms", icon: BadgeCheck },
      { text: "Enhanced credibility with lenders", icon: Award },
      { text: "Faster credit file recognition", icon: Zap },
    ]
  },
  {
    title: "Authorized User Tradelines",
    icon: CreditCard,
    iconColor: "text-green-500",
    bgColor: "bg-green-50",
    description: "Our tradeline packages include being added as an authorized user to established credit accounts with perfect payment histories. These accounts report to all three major credit bureaus, instantly boosting your credit profile with years of positive history.",
    benefits: [
      { text: "Immediate credit history establishment", icon: Zap },
      { text: "High-limit accounts ($15K-$150K)", icon: CreditCard },
      { text: "Perfect payment history records", icon: BadgeCheck },
      { text: "Reports to Experian, Equifax, and TransUnion", icon: FileCheck },
    ]
  },
  {
    title: "Privacy Documentation Package",
    icon: Lock,
    iconColor: "text-indigo-500",
    bgColor: "bg-indigo-50",
    description: "Receive a complete set of privacy documentation that supports your new credit file. This includes all necessary paperwork to maintain your privacy while engaging in legitimate financial activities.",
    benefits: [
      { text: "Comprehensive documentation set", icon: FileCheck },
      { text: "Privacy protection guidelines", icon: Lock },
      { text: "Financial institution templates", icon: FileCheck },
      { text: "Ongoing support materials", icon: Users },
    ]
  },
  {
    title: "Dedicated Support & Guidance",
    icon: Phone,
    iconColor: "text-rose-500",
    bgColor: "bg-rose-50",
    description: "Every package includes access to our team of credit specialists who guide you through the entire process. From initial setup to your first credit applications, you will have expert support every step of the way.",
    benefits: [
      { text: "One-on-one specialist consultations", icon: Users },
      { text: "Application strategy guidance", icon: Sparkles },
      { text: "Ongoing credit building support", icon: Award },
      { text: "Priority response times for higher tiers", icon: Clock },
    ]
  },
]

const faqs = [
  {
    q: "What exactly is a Credit Privacy Number?",
    a: "A Credit Privacy Number (CPN) is a nine-digit identifier used for credit reporting purposes. When properly established and registered, it serves as an alternative to your Social Security Number for credit-related activities, providing an additional layer of privacy protection.",
    icon: Shield
  },
  {
    q: "Is using a Credit Privacy Number legal?",
    a: "Yes, using a properly established CPN for legitimate credit purposes is legal. The key is that the number must be obtained through legal channels, not associated with another person, and used truthfully on credit applications. We ensure every CPN we provide meets these requirements.",
    icon: BadgeCheck
  },
  {
    q: "How is a CPN different from a Social Security Number?",
    a: "A Social Security Number is issued by the government for tax and benefits purposes. A CPN is a separate identifier used specifically for credit reporting. While both are 9-digit numbers, they serve different purposes and a CPN should never be used for government-related activities.",
    icon: FileCheck
  },
  {
    q: "What verification process do you use for CPNs?",
    a: "Every CPN undergoes a rigorous forensic audit to verify it has no prior credit history, no associations with other individuals, and no existing financial footprint. This ensures you receive a completely clean number with no inherited problems.",
    icon: Shield
  },
  {
    q: "How long does it take to receive my CPN package?",
    a: "Most packages are activated within 24-48 hours. The Foundation package includes 24-hour file activation, while packages with tradelines may take slightly longer as we coordinate with our tradeline partners to add you to established accounts.",
    icon: Clock
  },
  {
    q: "What credit score can I expect with each package?",
    a: "The Foundation package starts you with a new file. The Essentials package typically establishes a 670+ FICO score, Professional reaches 720+, Executive achieves 740+, and our Elite package can establish scores of 760+ depending on the tradelines included.",
    icon: Award
  },
  {
    q: "How do authorized user tradelines work?",
    a: "You are added as an authorized user to established credit accounts with perfect payment history. These accounts then report to credit bureaus, adding their positive history to your credit file. You do not have access to the account or any spending ability - it is purely for credit building.",
    icon: CreditCard
  },
  {
    q: "How long do tradelines stay on my credit report?",
    a: "Tradelines typically remain on your credit report for as long as the primary account holder maintains the account. Our tradeline partners maintain accounts specifically for this purpose, so you can expect long-term reporting in most cases.",
    icon: Clock
  },
  {
    q: "Can I use my CPN for apartment rentals?",
    a: "Yes, one of the most common uses for a CPN is apartment applications. A properly established CPN with positive credit history can help you qualify for rentals and potentially reduce security deposit requirements.",
    icon: Home
  },
  {
    q: "Will my CPN work for auto financing?",
    a: "Yes, our Professional package and above are specifically designed to qualify for auto financing. The established credit history and FICO scores achieved with these packages meet most auto lender requirements.",
    icon: Car
  },
  {
    q: "Can I get business credit with a CPN?",
    a: "Absolutely. Many business owners use CPNs to separate their personal credit from business activities. Our Executive and Elite packages include features specifically designed for business credit establishment.",
    icon: Briefcase
  },
  {
    q: "What is IRS Credit Partner Registration?",
    a: "This is the process of properly registering your CPN with the IRS as a legitimate credit identifier. We provide guidance on completing this registration, which establishes your number with full legal standing in commerce.",
    icon: FileCheck
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes, we understand these are significant investments. Contact our team to discuss flexible payment options that work with your budget. We want to make financial freedom accessible to everyone.",
    icon: CreditCard
  },
  {
    q: "What happens after I purchase a package?",
    a: "You will receive immediate confirmation and a welcome email with next steps. Our team will reach out within 24 hours to begin the onboarding process, answer any questions, and guide you through establishing your new credit file.",
    icon: Sparkles
  },
  {
    q: "How do I build credit after receiving my CPN?",
    a: "We provide comprehensive guidance on building your credit profile. This includes applying for starter credit products, maintaining proper utilization, and strategically adding positive accounts over time. Higher-tier packages include detailed credit building strategy guides.",
    icon: Award
  },
  {
    q: "What credit bureaus will my CPN report to?",
    a: "Your CPN and associated tradelines will report to all three major credit bureaus: Experian, Equifax, and TransUnion. This ensures comprehensive coverage across all credit checking platforms.",
    icon: BadgeCheck
  },
  {
    q: "Can banks verify my CPN?",
    a: "Yes, properly established CPNs pass standard bank verification processes. The public records submissions included in our packages ensure your identity is verifiable across the databases banks commonly check.",
    icon: Shield
  },
  {
    q: "What if my CPN gets rejected by a lender?",
    a: "While rare with our properly established CPNs, if you encounter issues, our support team will help troubleshoot. This may involve additional documentation or choosing a more CPN-friendly lender from our recommended list.",
    icon: Users
  },
  {
    q: "How is my privacy protected?",
    a: "Your CPN provides a layer of separation between your personal SSN and credit activities. All communications are encrypted, your information is stored securely, and we never share your details with unauthorized parties.",
    icon: Lock
  },
  {
    q: "What types of credit can I apply for with a CPN?",
    a: "You can apply for most types of consumer credit including credit cards, auto loans, personal loans, and retail credit accounts. The specific products available depend on your credit profile strength, which is why higher packages include better tradelines.",
    icon: CreditCard
  },
  {
    q: "Do you guarantee specific credit scores?",
    a: "While we provide estimated FICO ranges based on the tradelines included in each package, individual results may vary. Credit scores depend on multiple factors including how you manage your new credit accounts after establishment.",
    icon: Award
  },
  {
    q: "What is the difference between primary and AU tradelines?",
    a: "Primary tradelines are accounts you open in your own name. Authorized User (AU) tradelines are accounts where you are added as a user to someone else's established account. Both report to credit bureaus and build credit history.",
    icon: FileCheck
  },
  {
    q: "How do public records submissions help my credit?",
    a: "Public records submissions establish your identity across databases that lenders and verification services check. This creates the foundational footprint necessary for credit applications to process successfully.",
    icon: Users
  },
  {
    q: "Can I upgrade my package later?",
    a: "Yes, you can upgrade to a higher tier package at any time. The cost difference will be applied, and additional tradelines and services will be added to your existing file. Many clients start with Foundation and upgrade as they see results.",
    icon: Zap
  },
  {
    q: "What documentation do I need to get started?",
    a: "Getting started is simple. You will need basic identification information and contact details. Our team will guide you through any additional documentation requirements during the onboarding process.",
    icon: FileCheck
  },
  {
    q: "How long until I can start applying for credit?",
    a: "With our Foundation package, you can begin applying for credit-building products within 24-48 hours. Packages with tradelines typically require 1-2 weeks for the accounts to report to bureaus before you will see the full credit profile established.",
    icon: Clock
  },
  {
    q: "What support is included after purchase?",
    a: "All packages include ongoing support. Foundation includes dedicated phone support, while higher tiers include priority response times and VIP concierge service for Elite members. We are here to help you succeed long-term.",
    icon: Phone
  },
  {
    q: "Are there any recurring fees?",
    a: "No, our packages are one-time purchases. There are no monthly fees or hidden charges. You pay once and receive all the services and tradelines included in your chosen package.",
    icon: BadgeCheck
  },
  {
    q: "What makes your CPNs different from others?",
    a: "Every CPN we provide undergoes forensic auditing to verify zero prior associations. We do not resell numbers or use questionable sources. Combined with our IRS registration guidance and comprehensive support, we offer a complete solution rather than just a number.",
    icon: Shield
  },
  {
    q: "Can I get a refund if I am not satisfied?",
    a: "Due to the nature of our services and the resources expended upon order placement, we offer a limited satisfaction guarantee. Contact our team within 30 days if you have concerns, and we will work to address any issues with your package.",
    icon: Users
  },
]

function FeatureDropdown({ feature, index }: { feature: typeof featureDetails[0], index: number }) {
  const [isOpen, setIsOpen] = useState(true)
  const IconComponent = feature.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <motion.div
            className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <IconComponent className={`h-6 w-6 ${feature.iconColor}`} />
          </motion.div>
          <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {feature.benefits.map((benefit, i) => {
              const BenefitIcon = benefit.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <BenefitIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 text-sm">{benefit.text}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function FAQItem({ faq, index }: { faq: typeof faqs[0], index: number }) {
  const [isOpen, setIsOpen] = useState(index < 5)
  const IconComponent = faq.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
      className="border-b border-gray-200 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-4 pr-4">
          <motion.div
            className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <IconComponent className="h-5 w-5 text-amber-600" />
          </motion.div>
          <h4 className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{faq.q}</h4>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pb-5 pl-14">
          <p className="text-gray-600 leading-relaxed">{faq.a}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function CreditPrivacyNumbersPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
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

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: "100%",
                  opacity: 0
                }}
                animate={{
                  y: "-20%",
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6"
              >
                <Shield className="h-5 w-5 text-amber-400 mr-2" />
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
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0">
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
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { stat: "10,000+", label: "Clients Served", icon: Users },
                { stat: "99.8%", label: "Success Rate", icon: Award },
                { stat: "24hr", label: "File Activation", icon: Clock },
                { stat: "100+", label: "Database Submissions", icon: FileCheck },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
                >
                  <motion.div
                    className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl flex items-center justify-center"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <item.icon className="h-6 w-6 text-amber-600" />
                  </motion.div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{item.stat}</div>
                  <div className="text-gray-600 mt-1">{item.label}</div>
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
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl mb-6 shadow-lg"
              >
                <Sparkles className="h-8 w-8 text-white" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
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
                  description: "Qualify for apartments and rentals without past credit issues holding you back. Lower security deposits and better lease terms become accessible.",
                  icon: Home,
                  color: "blue"
                },
                {
                  image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80",
                  title: "Vehicle Financing",
                  description: "Get approved for auto loans with competitive rates. No more being limited to buy-here-pay-here dealers or requiring large down payments.",
                  icon: Car,
                  color: "purple"
                },
                {
                  image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
                  title: "Business Growth",
                  description: "Separate personal and business credit. Access business funding, credit lines, and vendor accounts without personal credit limitations.",
                  icon: Briefcase,
                  color: "green"
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <motion.div
                      className={`absolute bottom-4 left-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                    </motion.div>
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
        <section id="packages" className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
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
              className="mb-8 max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <motion.div
                    className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Shield className="h-7 w-7 text-white" />
                  </motion.div>
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
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <motion.div
                    className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <Building2 className="h-7 w-7 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-semibold text-purple-900 mb-2">
                      Use Your CPN as a Business Personal Guarantor
                    </h4>
                    <p className="text-purple-800 text-sm leading-relaxed">
                      One of the most powerful uses for a properly established Credit Privacy Number is serving as the personal guarantor on an LLC or Corporation. When you attach a CPN with excellent credit standing to your business as the personal guarantee, you unlock access to business credit lines, vendor accounts, and funding that would otherwise require strong personal credit.
                    </p>
                    <p className="text-purple-800 text-sm leading-relaxed mt-3">
                      <strong>Recommended Strategy:</strong> Our Professional, Executive, and Elite packages are specifically designed for business use. The established credit history and high FICO scores (720-760+) meet the requirements that most business lenders look for when evaluating personal guarantees.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {cpnPackages.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`relative bg-white rounded-2xl p-6 border ${
                    pkg.popular
                      ? "border-blue-500 ring-2 ring-blue-500 shadow-xl"
                      : "border-gray-200 shadow-sm"
                  }`}
                >
                  {pkg.popular && (
                    <motion.div
                      className="absolute -top-3 left-1/2 -translate-x-1/2"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium px-4 py-1.5 rounded-full flex items-center shadow-lg">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </span>
                    </motion.div>
                  )}
                  <h4 className="text-lg font-semibold text-gray-900">
                    {pkg.name}
                  </h4>

                  <motion.div
                    className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    <BadgeCheck className="h-4 w-4 mr-1" />
                    FICO: {pkg.ficoScore}
                  </motion.div>

                  <div className="mt-3">
                    <span className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      ${pkg.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {pkg.description}
                  </p>

                  <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">
                    <CreditCard className="h-3 w-3 mr-1" />
                    {pkg.tradelines}
                  </div>

                  <ul className="mt-4 space-y-2">
                    {pkg.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 flex items-start">
                      <Sparkles className="h-3 w-3 mr-1 mt-0.5 text-amber-500" />
                      <span><strong>Ideal for:</strong> {pkg.idealFor}</span>
                    </p>
                  </div>

                  <Link href="/sign-up" className="block mt-4">
                    <Button
                      variant={pkg.popular ? "default" : "outline"}
                      className={`w-full ${pkg.popular ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" : ""}`}
                    >
                      Get Started
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="text-center text-sm text-gray-500 mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Payment plans available. Contact us for financing options on all packages.
            </motion.p>
          </div>
        </section>

        {/* Feature Details */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl mb-6 shadow-lg"
              >
                <Check className="h-8 w-8 text-white" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
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
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl mb-6 shadow-lg"
              >
                <Shield className="h-8 w-8 text-white" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Get answers to the most common questions about Credit Privacy Numbers.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl shadow-lg border border-gray-200 divide-y divide-gray-200 px-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {faqs.map((faq, index) => (
                <FAQItem key={index} faq={faq} index={index} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_100%] animate-gradient">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-8"
            >
              <Sparkles className="h-10 w-10 text-white" />
            </motion.div>
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
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
