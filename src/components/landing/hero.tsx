"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Building2, TrendingUp, Lock, CreditCard, FileText, Briefcase } from "lucide-react"

const features = [
  { icon: Shield, text: "Privacy Protection" },
  { icon: Building2, text: "Business Formation" },
  { icon: TrendingUp, text: "Credit Building" },
]

// Floating background icons for the animated background
const floatingIcons = [
  { Icon: Shield, delay: 0, duration: 20, x: "10%", y: "20%" },
  { Icon: Building2, delay: 2, duration: 25, x: "85%", y: "15%" },
  { Icon: TrendingUp, delay: 4, duration: 22, x: "75%", y: "70%" },
  { Icon: Lock, delay: 1, duration: 18, x: "15%", y: "75%" },
  { Icon: CreditCard, delay: 3, duration: 23, x: "90%", y: "45%" },
  { Icon: FileText, delay: 5, duration: 21, x: "5%", y: "50%" },
  { Icon: Briefcase, delay: 2.5, duration: 24, x: "60%", y: "85%" },
  { Icon: Shield, delay: 6, duration: 19, x: "40%", y: "10%" },
]

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-blue-400/80 rounded-full blur-3xl"
        initial={{ x: 0, y: 0 }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "10%", left: "5%" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] bg-purple-400/70 rounded-full blur-3xl"
        initial={{ x: 0, y: 0 }}
        animate={{
          x: [0, -80, -40, 0],
          y: [0, 80, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "50%", right: "10%" }}
      />
      <motion.div
        className="absolute w-[450px] h-[450px] bg-indigo-400/65 rounded-full blur-3xl"
        initial={{ x: 0, y: 0 }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -60, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ bottom: "20%", left: "30%" }}
      />

      {/* Floating icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: item.x, top: item.y }}
          initial={{ y: 0, opacity: 0.6 }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.6, 0.85, 0.6],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <item.Icon className="w-12 h-12 md:w-16 md:h-16 text-blue-500" />
        </motion.div>
      ))}

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen pt-28 pb-16 overflow-hidden">
      {/* Background gradient - light theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-blue-50/50 to-white" />

      {/* Animated background elements */}
      <AnimatedBackground />

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
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/80 backdrop-blur-sm">
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
              <motion.div
                key={index}
                className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <feature.icon className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  {feature.text}
                </span>
              </motion.div>
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
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200"
              whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Credit Privacy Numbers</h3>
              <p className="text-sm text-gray-600">
                Create legal standing privacy partners registered with the IRS for complete financial separation.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200 md:-translate-y-4"
              whileHover={{ y: -12, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Business Formation</h3>
              <p className="text-sm text-gray-600">
                Launch your business with proper structure and compliance from day one.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200"
              whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Credit Building</h3>
              <p className="text-sm text-gray-600">
                Build and strengthen your business credit profile for future growth.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
