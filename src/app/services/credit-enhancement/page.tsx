"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, TrendingUp, ChevronDown, ArrowRight, FileText, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

const creditRepairPackage = {
  name: "Credit Enhancement",
  price: 1500,
  description: "Professional credit repair and optimization for your existing credit profile",
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

const processSteps = [
  {
    step: 1,
    title: "Credit Analysis",
    description: "We obtain and analyze your credit reports from all three bureaus, identifying every negative item, error, and opportunity for improvement."
  },
  {
    step: 2,
    title: "Strategy Development",
    description: "Based on your specific situation, we develop a customized dispute strategy targeting the items most likely to be removed and have the greatest score impact."
  },
  {
    step: 3,
    title: "Dispute Execution",
    description: "Our team prepares and sends professionally crafted dispute letters to the credit bureaus and creditors, challenging inaccurate or unverifiable information."
  },
  {
    step: 4,
    title: "Tracking & Follow-Up",
    description: "We monitor responses, send follow-up communications as needed, and keep you informed of progress through regular updates and reports."
  },
]

const featureDetails = [
  {
    title: "Comprehensive Credit Analysis",
    description: "Your credit repair journey begins with a thorough analysis of all three credit reports. We identify every negative item, inaccuracy, and opportunity for improvement across Experian, Equifax, and TransUnion.",
    benefits: [
      "Review of all three credit bureau reports",
      "Identification of all negative items",
      "Error and inaccuracy detection",
      "Score impact prioritization"
    ]
  },
  {
    title: "Professional Dispute Letters",
    description: "Generic template disputes rarely work. Our team crafts personalized, legally-grounded dispute letters for each negative item, citing specific consumer protection laws and requesting proper verification.",
    benefits: [
      "Customized letters for each item",
      "Legal basis citations included",
      "Proper formatting for bureau processing",
      "Strategic timing of submissions"
    ]
  },
  {
    title: "Bureau Communication Management",
    description: "Dealing with credit bureaus requires persistence and proper documentation. We handle all correspondence, track responses, and ensure your disputes are processed according to federal law requirements.",
    benefits: [
      "Direct bureau correspondence handling",
      "Response tracking and documentation",
      "FCRA compliance monitoring",
      "Escalation when necessary"
    ]
  },
  {
    title: "Negative Item Removal Support",
    description: "From late payments to collections to charge-offs, we target all types of negative items that are dragging down your score. Our goal is maximum removal of inaccurate, unverifiable, or unfair items.",
    benefits: [
      "Collections account disputes",
      "Late payment challenges",
      "Charge-off negotiations",
      "Public record addressing"
    ]
  },
  {
    title: "Score Optimization Strategy",
    description: "Credit repair is not just about removing negatives. We provide guidance on positive actions you can take to maximize score improvements, including credit utilization, account mix, and timing strategies.",
    benefits: [
      "Credit utilization optimization",
      "Account age strategies",
      "New credit timing guidance",
      "Score factor education"
    ]
  },
  {
    title: "Monthly Progress Reports",
    description: "Stay informed about your credit repair progress with detailed monthly reports. See what disputes were sent, what responses were received, and how your scores are trending over time.",
    benefits: [
      "Detailed dispute status updates",
      "Score tracking over time",
      "Removal success documentation",
      "Next steps recommendations"
    ]
  },
  {
    title: "Direct Specialist Support",
    description: "Questions do not wait for monthly reports. You have direct access to your credit specialist for questions, updates, and guidance throughout your 90-day service period.",
    benefits: [
      "Phone and email support access",
      "Quick response times",
      "Expert credit guidance",
      "Personalized recommendations"
    ]
  },
  {
    title: "90-Day Active Service Period",
    description: "Real credit repair takes time. Your service includes a full 90 days of active dispute work, multiple rounds of disputes, and ongoing support to maximize your results.",
    benefits: [
      "Multiple dispute rounds included",
      "Continuous monitoring",
      "Full bureau cycle coverage",
      "Extension options available"
    ]
  },
]

const faqs = [
  {
    q: "What types of negative items can be removed from my credit report?",
    a: "We can challenge and potentially remove late payments, collections, charge-offs, repossessions, foreclosures, bankruptcies, judgments, tax liens, and other negative items that are inaccurate, unverifiable, or reported in violation of consumer protection laws."
  },
  {
    q: "How long does credit repair take?",
    a: "Most clients see initial results within 30-45 days as first-round disputes are processed. Significant improvements typically occur within 90 days, though complex cases may require additional time. Our 90-day service period covers multiple dispute rounds."
  },
  {
    q: "Can you guarantee specific score improvements?",
    a: "We cannot legally guarantee specific point increases because results depend on your individual credit profile and how bureaus respond to disputes. However, we have a strong track record of successful removals for most clients."
  },
  {
    q: "What is the difference between credit repair and credit building?",
    a: "Credit repair focuses on removing existing negative items from your credit reports. Credit building involves adding positive accounts and history. Many clients benefit from both services, which is why we offer Credit Privacy Numbers for a fresh credit building opportunity."
  },
  {
    q: "Is credit repair legal?",
    a: "Absolutely. Your right to dispute inaccurate or unverifiable information on your credit report is protected by federal law, including the Fair Credit Reporting Act (FCRA). Credit repair companies that operate ethically and follow the law are completely legitimate."
  },
  {
    q: "What laws protect my right to dispute credit items?",
    a: "The Fair Credit Reporting Act (FCRA) requires credit bureaus to investigate disputes within 30 days and remove any information that cannot be verified. The Fair Debt Collection Practices Act (FDCPA) also provides protections regarding how debt collectors report information."
  },
  {
    q: "How many points can I expect my score to increase?",
    a: "Score increases vary widely based on what is currently on your report and what gets removed. Clients have seen increases ranging from 50 to 200+ points, depending on the severity and number of negative items successfully removed."
  },
  {
    q: "What information do you need to get started?",
    a: "We need copies of your credit reports from all three bureaus (we can help you obtain these), basic identification information, and details about any negative items you want to dispute. We will guide you through the process during onboarding."
  },
  {
    q: "Do I need to do anything during the process?",
    a: "Your main responsibility is providing initial information and responding promptly if we need additional details. We handle all dispute preparation, submission, and tracking. Some clients choose to participate more actively in understanding their credit, which we encourage."
  },
  {
    q: "What happens after the 90-day service period?",
    a: "After 90 days, you receive a final report showing all results achieved. If additional work is needed, we offer extension packages at a reduced rate. Many clients achieve their goals within the initial period."
  },
  {
    q: "Can I dispute items myself?",
    a: "Yes, you have the legal right to dispute items on your own. However, professional credit repair brings expertise in crafting effective disputes, understanding legal requirements, and managing the process efficiently. DIY disputes often have lower success rates."
  },
  {
    q: "How do credit bureaus respond to disputes?",
    a: "Credit bureaus must investigate disputes within 30 days (45 in some cases). They contact the creditor for verification. If the creditor cannot or does not respond with verification, the item must be removed. This is where our expertise in dispute crafting pays off."
  },
  {
    q: "What if an item comes back after being removed?",
    a: "Re-inserted items must meet strict legal requirements, including notifying you in writing. If an item is improperly re-inserted, we can challenge it again and potentially pursue damages under the FCRA."
  },
  {
    q: "Do you work with creditors directly?",
    a: "Yes, in some cases we communicate directly with creditors or collection agencies to negotiate removal of items, particularly when the debt has been paid or settled. This is often called 'pay for delete' negotiation."
  },
  {
    q: "What is the success rate for credit repair?",
    a: "Success varies by case, but the majority of our clients see at least some negative items removed. Many see significant improvements. Your success depends on factors like the type of negative items, their age, and whether proper verification exists."
  },
  {
    q: "Can credit repair help with student loans?",
    a: "Student loans can be challenging because they are well-documented. However, we can dispute late payments that may be inaccurately reported, incorrect balance information, or procedural violations in how the loans were reported."
  },
  {
    q: "What about medical collections?",
    a: "Medical collections are often successfully disputed because medical billing frequently contains errors and verification requirements are strict. Recent credit scoring models also weight medical debt less heavily than other collections."
  },
  {
    q: "Can you help with identity theft issues?",
    a: "Yes, if negative items appeared due to identity theft, we can help dispute those items with additional documentation. Identity theft disputes often have higher success rates because the items are genuinely fraudulent."
  },
  {
    q: "How do I know my information is secure?",
    a: "We take data security seriously. All personal information is encrypted, stored securely, and only accessed by authorized staff working on your case. We never share your information with unauthorized parties."
  },
  {
    q: "What payment options do you offer?",
    a: "We offer full payment at signup with a discount, or payment plans that spread the cost over the service period. Contact our team to discuss which option works best for your budget."
  },
  {
    q: "Can I cancel if I am not satisfied?",
    a: "We offer a satisfaction policy during the early stages of service. If you are unhappy with our service within the first 30 days before substantial work has begun, we can discuss refund options. Once disputes are in process, refunds are limited."
  },
  {
    q: "How often will I receive updates?",
    a: "You receive detailed monthly progress reports, plus notifications when significant developments occur. You can also contact your specialist anytime for status updates."
  },
  {
    q: "What makes your service different from other credit repair companies?",
    a: "We focus on quality over quantity, crafting personalized disputes rather than using mass templates. Our team has extensive experience with credit law, and we provide genuine support rather than just automated processes."
  },
  {
    q: "Should I stop paying debts during credit repair?",
    a: "We never recommend stopping payments on legitimate debts. Doing so could result in additional negative items and legal action. Credit repair addresses reporting accuracy, not debt obligations."
  },
  {
    q: "Can credit repair help me qualify for a mortgage?",
    a: "Yes, many clients use credit repair to reach the score thresholds needed for mortgage approval or to qualify for better interest rates. Even a small rate improvement can save tens of thousands over a mortgage term."
  },
  {
    q: "What if I have very bad credit?",
    a: "Even severely damaged credit can often be improved. In some cases, we may recommend combining credit repair with a Credit Privacy Number for a fresh start while your existing credit is being repaired."
  },
  {
    q: "How do I monitor my progress?",
    a: "We recommend signing up for credit monitoring (we can help with recommendations) so you can see changes in real-time. We also provide detailed reports showing exactly what has been disputed and the results."
  },
  {
    q: "What happens if a creditor verifies the debt?",
    a: "If a creditor verifies, we analyze whether the verification was proper and complete. Often, we can send follow-up disputes requesting more specific documentation or challenging the verification process itself."
  },
  {
    q: "Can you help with credit card debt?",
    a: "We focus on credit repair (removing inaccurate reporting) rather than debt settlement. If you need help with actual debt reduction, we can provide referrals to reputable debt management services."
  },
  {
    q: "Is there anything that cannot be removed from a credit report?",
    a: "Items that are accurate, properly verified, and reported in compliance with all laws can remain on your report for their legal reporting period (7-10 years for most items). However, many items have reporting errors or verification issues that make them disputable."
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

export default function CreditEnhancementPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1920&q=80"
            alt="Financial growth"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-emerald-900/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6"
            >
              <TrendingUp className="h-5 w-5 text-green-300 mr-2" />
              <span className="text-green-100 text-sm font-medium">Credit Enhancement Services</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Professional Credit Repair & Enhancement
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-green-100 mb-8"
            >
              Remove inaccurate negative items from your credit reports and optimize your score
              with our professional credit enhancement services. Results you can see in 30-90 days.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="#package">
                <Button size="lg" className="w-full sm:w-auto bg-white text-green-900 hover:bg-green-50">
                  View Service Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  Start Repairing My Credit
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
              { stat: "15,000+", label: "Items Removed" },
              { stat: "85%", label: "Dispute Success Rate" },
              { stat: "90 Days", label: "Active Service Period" },
              { stat: "100+", label: "Point Avg Increase" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-3xl font-bold text-green-600">{item.stat}</div>
                <div className="text-gray-600">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Credit Repair */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Your Credit Score Matters
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A higher credit score opens doors and saves money. Every point matters when it comes to the opportunities available to you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&q=80",
                title: "Lower Interest Rates",
                description: "Higher scores qualify for lower interest rates on mortgages, auto loans, and credit cards. Even a 1% difference can save thousands over the life of a loan."
              },
              {
                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
                title: "Better Approval Odds",
                description: "Get approved for the credit cards, apartments, and loans you apply for. Stop facing rejection due to past credit issues that may not even be accurate."
              },
              {
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
                title: "Employment Opportunities",
                description: "Many employers check credit as part of the hiring process. A clean credit report removes this potential barrier to career advancement."
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

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Credit Repair Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A systematic approach to identifying and removing inaccurate items from your credit reports.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-200 flex gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">{step.step}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Section */}
      <section id="package" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Credit Enhancement Package
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to repair and optimize your existing credit profile.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-4">
                <FileText className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-800 font-medium">Complete Credit Repair Service</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {creditRepairPackage.name}
              </h3>
              <div className="mt-4">
                <span className="text-5xl font-bold text-gray-900">
                  ${creditRepairPackage.price.toLocaleString()}
                </span>
                <span className="text-gray-600 ml-2">one-time</span>
              </div>
              <p className="mt-4 text-gray-600 max-w-lg mx-auto">
                {creditRepairPackage.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {creditRepairPackage.features.map((feature, i) => (
                <div key={i} className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/sign-up">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Start Credit Enhancement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Consider a Fresh Start</h4>
                  <p className="text-amber-800 text-sm">
                    If your credit has multiple serious negative items, you may also want to consider our Credit Privacy Number services
                    for a fresh start while your existing credit is being repaired. Many clients use both services together for
                    immediate access to credit while working on long-term credit restoration.
                  </p>
                  <Link href="/services/credit-privacy-numbers" className="inline-flex items-center text-amber-700 font-medium mt-2 hover:text-amber-800">
                    Learn about Credit Privacy Numbers
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Details */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What is Included in Your Service
            </h2>
            <p className="text-lg text-gray-600">
              Understand exactly what you receive with your credit enhancement package.
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
      <section className="py-20">
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
              Get answers to the most common questions about credit repair and enhancement.
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
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
          >
            Ready to Improve Your Credit?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-green-100 mb-8"
          >
            Take the first step toward better credit today. Our team is ready to analyze your credit and develop a personalized repair strategy.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/sign-up">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                Start Your Credit Repair
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
