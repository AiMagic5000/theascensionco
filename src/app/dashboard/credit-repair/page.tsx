"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TrendingUp, Shield, ExternalLink } from "lucide-react"

export default function CreditRepairDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Credit Repair Dashboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Track your disputes, view progress, and manage your credit repair journey.
          </p>
        </div>
        <a href="https://app.scorewise.app/" target="_blank" rel="noopener noreferrer">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Open in New Tab
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </a>
      </motion.div>

      {/* Trust Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4"
      >
        <div className="flex items-center gap-2 text-sm text-green-800 dark:text-green-300">
          <Shield className="h-4 w-4" />
          <span>Secure portal powered by ScoreWise - Your data is encrypted and protected</span>
        </div>
      </motion.div>

      {/* iframe Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm"
        style={{ height: "calc(100vh - 280px)", minHeight: "600px" }}
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
