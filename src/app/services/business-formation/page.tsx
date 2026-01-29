"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Building2, ChevronDown, ArrowRight, Star, Zap, Crown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

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
    fundingPotential: "$50,000+",
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
    fundingPotential: "$100,000+",
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
    fundingPotential: "$300,000+",
    popular: false,
  },
]

const featureDetails = [
  {
    title: "Complete Business Entity Formation",
    description: "We handle the entire process of forming your LLC or Corporation from start to finish. This includes state filing, obtaining your Certificate of Formation, and ensuring your business is properly registered in your chosen state.",
    benefits: [
      "Choice of LLC or Corporation structure",
      "State filing and registration handled",
      "Certificate of Formation delivered",
      "Proper legal entity establishment"
    ]
  },
  {
    title: "EIN Registration and Business Identity",
    description: "Your Employer Identification Number is the cornerstone of your business identity. We handle the IRS application process and ensure your business is properly registered for tax purposes and banking relationships.",
    benefits: [
      "IRS EIN application completed",
      "Business tax identity established",
      "Required for business banking",
      "Foundation for business credit"
    ]
  },
  {
    title: "Registered Agent Service",
    description: "Every business needs a registered agent to receive legal documents and official correspondence. Our registered agent service ensures you never miss important filings while maintaining your privacy.",
    benefits: [
      "Legal document receipt handling",
      "Compliance deadline monitoring",
      "Privacy protection for owners",
      "Professional business appearance"
    ]
  },
  {
    title: "Professional Business Presence",
    description: "Credibility matters when building business credit. We provide a professional business address, dedicated phone number, and custom email setup to ensure your business appears established and trustworthy to lenders.",
    benefits: [
      "Virtual business address",
      "Dedicated business phone line",
      "Professional email domain",
      "Mail forwarding services"
    ]
  },
  {
    title: "Custom Website Development",
    description: "Your business website is often the first impression lenders and partners see. We create a professional, SEO-optimized website that establishes your online presence and supports your credibility with financial institutions.",
    benefits: [
      "Custom designed 10-15 page website",
      "Mobile responsive design",
      "SEO optimization included",
      "Payment processing integration"
    ]
  },
  {
    title: "Business Credit Building Foundation",
    description: "Building business credit requires proper setup from day one. We register your business with Dun & Bradstreet, establish your DUNS number, and set you up with the accounts needed to start building your business credit profile.",
    benefits: [
      "D&B registration and DUNS number",
      "Initial trade account setup",
      "Business credit monitoring access",
      "Credit building roadmap provided"
    ]
  },
  {
    title: "Multi-Corporation Structures",
    description: "For clients seeking enhanced asset protection and funding potential, our Advanced and Enterprise packages include multiple corporation formations. This structure allows for liability separation and increased credit capacity.",
    benefits: [
      "Liability separation between entities",
      "Multiple credit profiles established",
      "Enhanced funding opportunities",
      "Strategic asset protection"
    ]
  },
  {
    title: "Business Tradelines and Credit Lines",
    description: "Higher-tier packages include business tradelines that instantly establish credit history for your company. These reporting accounts accelerate your path to business funding eligibility.",
    benefits: [
      "$10K-$100K tradeline options",
      "Immediate credit history establishment",
      "Reports to business credit bureaus",
      "Accelerated funding timeline"
    ]
  },
]

const faqs = [
  {
    q: "What is the difference between an LLC and a Corporation?",
    a: "An LLC (Limited Liability Company) offers flexibility in management and taxation with pass-through tax treatment. A Corporation is a more formal structure with shareholders and directors, often preferred for businesses seeking investment. We help you choose the right structure for your goals."
  },
  {
    q: "Which state should I form my business in?",
    a: "While Delaware, Wyoming, and Nevada offer advantages for certain situations, most businesses benefit from forming in their home state. We analyze your specific situation and recommend the optimal state for formation based on your business activities and goals."
  },
  {
    q: "How long does the business formation process take?",
    a: "Most formations are completed within 7-14 business days. This includes state filing, EIN registration, and initial account setups. Rush processing is available for clients who need faster turnaround."
  },
  {
    q: "What is a DUNS number and why do I need it?",
    a: "A DUNS number is a unique nine-digit identifier issued by Dun & Bradstreet. It is essential for establishing business credit, applying for government contracts, and building credibility with vendors and lenders. We handle the registration process as part of every package."
  },
  {
    q: "Can I use my home address for my business?",
    a: "While legal, using a home address can limit your credibility with lenders and expose your personal information. Our packages include a professional business address that maintains your privacy and enhances your business appearance."
  },
  {
    q: "What is a registered agent and do I really need one?",
    a: "A registered agent receives legal documents and state correspondence on behalf of your business. Most states require one. Our registered agent service ensures compliance while keeping your personal address private."
  },
  {
    q: "How does the dual corporation structure work?",
    a: "The dual corporation structure creates two separate legal entities. One typically operates the business while the other holds assets or intellectual property. This separation provides liability protection and doubles your business credit building potential."
  },
  {
    q: "What is included in the website development?",
    a: "Your custom website includes professional design, mobile responsiveness, SEO optimization, contact forms, and integration with payment processors if needed. Standard includes 10 pages, Advanced includes 15 pages with additional features."
  },
  {
    q: "How does the business tradeline work?",
    a: "A business tradeline is a credit account that reports to business credit bureaus. We add your new business as an authorized account holder on an established business credit line, instantly giving your company credit history."
  },
  {
    q: "When can I start applying for business credit?",
    a: "After your business formation is complete and your DUNS number is established (typically 2-3 weeks), you can begin applying for starter business credit accounts. We provide a roadmap of recommended accounts and applications."
  },
  {
    q: "Do I need good personal credit to get business credit?",
    a: "Initially, many business credit applications will check personal credit. However, as your business credit grows, you can qualify for credit based solely on your business profile. Our packages are designed to accelerate this separation."
  },
  {
    q: "What is the press release for?",
    a: "The press release announces your business launch across 400+ news outlets and websites. This creates online presence, builds backlinks for SEO, and establishes credibility that lenders can verify when researching your company."
  },
  {
    q: "How does the SEO optimization help my business?",
    a: "SEO optimization ensures your business appears in search results when potential customers or lenders look for your company. A well-ranked website adds credibility and can directly impact your business credit applications."
  },
  {
    q: "What is the business listing submission?",
    a: "We submit your business information to over 500 online directories and databases. This consistent presence across the web builds your NAP (Name, Address, Phone) consistency which both search engines and credit bureaus value."
  },
  {
    q: "Can I upgrade my package later?",
    a: "Yes, you can upgrade to a higher-tier package at any time. We apply your previous investment toward the upgrade cost and add the additional services and corporations to your existing setup."
  },
  {
    q: "What ongoing costs should I expect after formation?",
    a: "Expect annual state filing fees (varies by state, typically $50-$800), registered agent service renewal, and optional services like website hosting and credit monitoring. We provide a complete breakdown during onboarding."
  },
  {
    q: "How do the multiple corporations help with funding?",
    a: "Each corporation can build its own separate credit profile. This means you can potentially access credit through multiple entities, significantly increasing your total funding capacity compared to a single-entity approach."
  },
  {
    q: "What is velocity funding?",
    a: "Velocity funding is a strategy where you systematically apply for business credit across multiple lenders in a short timeframe. Our Enterprise package includes support for this advanced funding approach, which can result in significant credit access quickly."
  },
  {
    q: "Do you help with business bank accounts?",
    a: "Yes, we provide guidance on the best banks for new businesses and help ensure your formation documents are properly prepared for account opening. Many clients open accounts within the first week of formation."
  },
  {
    q: "What is the lifetime dashboard access?",
    a: "Every client receives access to our client dashboard where you can track your formation progress, access documents, monitor your credit building journey, and communicate with our support team."
  },
  {
    q: "How does asset protection work with corporations?",
    a: "Properly maintained corporations create legal separation between your personal assets and business liabilities. Our multi-corporation packages are structured to maximize this protection while maintaining compliance."
  },
  {
    q: "What documents will I receive?",
    a: "You receive Articles of Organization/Incorporation, Operating Agreement or Bylaws, EIN confirmation letter, Registered Agent certification, and various compliance documents. All are professionally prepared and stored in your dashboard."
  },
  {
    q: "Can I be my own registered agent?",
    a: "While possible in most states, this requires using your personal address (public record), being available during business hours for document service, and maintaining consistent presence. Our service eliminates these requirements."
  },
  {
    q: "What happens if I miss a state filing deadline?",
    a: "Missing deadlines can result in penalties, loss of good standing, or even administrative dissolution. Our registered agent service monitors deadlines and alerts you in advance, and we offer compliance management services."
  },
  {
    q: "How do I maintain my business credit once established?",
    a: "Maintaining business credit requires paying accounts on time, keeping credit utilization reasonable, maintaining consistent business information, and periodically adding new credit relationships. We provide ongoing guidance."
  },
  {
    q: "What is the curated credit issuers list?",
    a: "This is our proprietary list of vendors, credit cards, and lenders known to work well with new businesses. It includes application tips, approval likelihood factors, and recommended application sequences for maximum success."
  },
  {
    q: "Do you help with business grants?",
    a: "Our Advanced and Enterprise packages include business grants guidance, which covers identifying relevant grant opportunities, application best practices, and resources for finding grants matching your business type."
  },
  {
    q: "What kind of support is included?",
    a: "All packages include email and phone support. Advanced packages include priority support, and Enterprise clients receive dedicated account managers with after-hours availability for urgent matters."
  },
  {
    q: "Can I form a business if I have bad personal credit?",
    a: "Absolutely. There are no credit requirements to form a business entity. While personal credit may affect initial business credit applications, our packages are specifically designed to help you build business credit that becomes independent over time."
  },
  {
    q: "What payment options are available?",
    a: "We accept all major credit cards and offer payment plans on larger packages. Contact our team to discuss financing options that work for your budget."
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

export default function BusinessFormationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
            alt="Business buildings"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-indigo-900/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6"
            >
              <Building2 className="h-5 w-5 text-purple-300 mr-2" />
              <span className="text-purple-100 text-sm font-medium">Business Formation Services</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Business Formation & Credit Building
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-purple-100 mb-8"
            >
              Launch your business with a complete foundation for success. Entity formation, professional presence,
              and credit building infrastructure - all in one comprehensive package.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="#packages">
                <Button size="lg" className="w-full sm:w-auto bg-white text-purple-900 hover:bg-purple-50">
                  View Packages
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  Start Your Business
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
              { stat: "5,000+", label: "Businesses Formed" },
              { stat: "$50M+", label: "Client Funding Secured" },
              { stat: "50", label: "States Covered" },
              { stat: "14 Days", label: "Average Setup Time" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-3xl font-bold text-purple-600">{item.stat}</div>
                <div className="text-gray-600">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Form a Business */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Proper Business Formation Matters
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A properly structured business opens doors to funding, protection, and opportunities that sole proprietorships simply cannot access.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
                title: "Asset Protection",
                description: "Separate your personal assets from business liabilities. A properly maintained corporation or LLC shields your home, savings, and personal property from business debts and lawsuits."
              },
              {
                image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80",
                title: "Business Credit Access",
                description: "Corporations and LLCs can build credit profiles separate from personal credit. This opens access to business credit cards, lines of credit, and loans based on your company's performance."
              },
              {
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
                title: "Professional Credibility",
                description: "Vendors, lenders, and customers take incorporated businesses more seriously. A professional structure with proper documentation signals stability and commitment."
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
              Business Formation Packages
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete business setup with everything you need to establish credibility and build business credit from day one.
            </p>
          </motion.div>

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
                    <span className="bg-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center">
                      <Star className="h-3 w-3 mr-1" />
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

                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    ${pkg.price.toLocaleString()}
                  </span>
                </div>

                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4">
                  Funding Potential: {pkg.fundingPotential}
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
                    className={`w-full ${pkg.popular ? "bg-purple-600 hover:bg-purple-700" : ""}`}
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
              Everything Included in Your Package
            </h2>
            <p className="text-lg text-gray-600">
              Understand exactly what you receive with your business formation package.
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
              Get answers to the most common questions about business formation and credit building.
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
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
          >
            Ready to Build Your Business Empire?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-purple-100 mb-8"
          >
            Join thousands of entrepreneurs who have launched successful businesses with our comprehensive formation packages.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/sign-up">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                Start Your Business Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
