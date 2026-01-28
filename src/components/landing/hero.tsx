"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Building2, TrendingUp, CheckCircle } from "lucide-react"

const features = [
  { icon: Shield, text: "Privacy Protection" },
  { icon: Building2, text: "Business Formation" },
  { icon: TrendingUp, text: "Credit Building" },
]

export function Hero() {
  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Background gradient - light theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
              Think, plan, and track
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                all in one place
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Strategic consulting services for individuals and businesses.
            Build your financial foundation with expert guidance and proven strategies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/sign-up">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#services">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </motion.div>

          {/* Feature badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200"
              >
                <feature.icon className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  {feature.text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating cards preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 transform hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Privacy Services</h3>
              <p className="text-sm text-gray-600">
                Protect your personal information with our comprehensive privacy solutions.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 transform hover:-translate-y-1 transition-transform md:-translate-y-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Business Formation</h3>
              <p className="text-sm text-gray-600">
                Launch your business with proper structure and compliance from day one.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 transform hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Credit Building</h3>
              <p className="text-sm text-gray-600">
                Build and strengthen your business credit profile for future growth.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
