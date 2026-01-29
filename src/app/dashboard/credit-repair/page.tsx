"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, Shield, ExternalLink } from "lucide-react"
import { Navigation } from "@/components/landing/navigation"

export default function CreditRepairDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Credit Repair Dashboard
                </h1>
              </div>
              <p className="text-green-100">
                Track your disputes, view progress, and manage your credit repair journey.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/services/credit-enhancement">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Services
                </Button>
              </Link>
              <a href="https://app.scorewise.app/" target="_blank" rel="noopener noreferrer">
                <Button className="bg-white text-green-600 hover:bg-green-50">
                  Open in New Tab
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Shield className="h-4 w-4 text-green-600" />
            <span>Secure portal powered by ScoreWise - Your data is encrypted and protected</span>
          </div>
        </div>
      </div>

      {/* iframe Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full"
        style={{ height: "calc(100vh - 200px)" }}
      >
        <iframe
          src="https://app.scorewise.app/"
          className="w-full h-full border-0"
          title="Credit Repair Dashboard"
          allow="clipboard-write; encrypted-media"
          loading="lazy"
        />
      </motion.div>
    </div>
  )
}
