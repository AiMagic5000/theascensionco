"use client"

import { motion } from "framer-motion"
import { Shield, Clock, Users, Award } from "lucide-react"

const stats = [
  { icon: Users, value: "500+", label: "Clients Served" },
  { icon: Shield, value: "100%", label: "Privacy Focused" },
  { icon: Clock, value: "24/7", label: "Support Available" },
  { icon: Award, value: "5-Star", label: "Client Rating" },
]

export function About() {
  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              About The Ascension Company
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Founded with the belief that progress begins with clarity, The Ascension Company LLC
                works closely with clients to identify challenges, assess opportunities, and develop
                actionable strategies aligned with their goals.
              </p>
              <p>
                Our team provides structured consulting solutions aimed at strengthening decision-making,
                improving organizational readiness, and supporting long-term personal and business
                development throughout New Mexico and beyond.
              </p>
              <p>
                We believe that many individuals and entrepreneurs face uncertainty not because they
                lack ambition, but because they lack reliable guidance. Our role is to help clients
                evaluate where they are, determine where they want to go, and build a realistic plan
                to get there.
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                We focus on sustainable growth, not quick fixes.
              </p>
            </div>

            <div className="mt-8 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">AG</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Antonio Goldwire</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Founder & Principal Consultant</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    &ldquo;Every client brings a unique set of circumstances. We take the time to listen,
                    assess, and develop tailored strategies that align with each client&apos;s objectives.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 text-center"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-4">Our Commitment</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Shield className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Transparency, professionalism, and ethical standards</span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Clear, accurate, and practical guidance</span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Long-term relationships built on trust</span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Measurable progress and accountability</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
