"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Mail, MessageSquare, Clock, FileQuestion, Book, ExternalLink } from "lucide-react"

const faqs = [
  {
    question: "How long does it take to see results from privacy services?",
    answer:
      "Most clients see initial results within 30-45 days. Full credit profile establishment typically takes 60-90 days depending on your package level.",
  },
  {
    question: "Can I upgrade my package after starting?",
    answer:
      "Yes! You can upgrade at any time. The price difference will be applied, and additional services will begin immediately.",
  },
  {
    question: "How do I track my business credit progress?",
    answer:
      "Use the Business Management section of your dashboard to monitor your PAYDEX score and D&B profile. We recommend checking monthly.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, bank transfers, and payment plans are available for qualifying packages.",
  },
]

export default function SupportPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Help & Support
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Get assistance and find answers to common questions
        </p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <a href="tel:8888688069" className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-4">
                <Phone className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Call Us</h3>
              <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mt-1">
                (888) 868-8069
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Mon-Fri 9AM-5PM MST
              </p>
            </a>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <a
              href="mailto:support@theascensionco.us"
              className="flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-4">
                <Mail className="h-7 w-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Email Support</h3>
              <p className="text-lg font-medium text-purple-600 dark:text-purple-400 mt-1">
                support@theascensionco.us
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Response within 24 hours
              </p>
            </a>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-4">
                <Clock className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Business Hours</h3>
              <p className="text-lg font-medium text-green-600 dark:text-green-400 mt-1">
                Mon - Fri
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                9:00 AM - 5:00 PM MST
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Send a Message
          </CardTitle>
          <CardDescription>Fill out the form below and we&apos;ll get back to you</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject
                </label>
                <select className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50">
                  <option value="">Select a topic...</option>
                  <option value="privacy">Privacy Services</option>
                  <option value="business">Business Formation</option>
                  <option value="credit">Credit Enhancement</option>
                  <option value="billing">Billing Question</option>
                  <option value="technical">Technical Support</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Priority
                </label>
                <select className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50">
                  <option value="low">Low - General question</option>
                  <option value="medium">Medium - Need assistance</option>
                  <option value="high">High - Urgent issue</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Describe your question or issue..."
                className="flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder:text-gray-400"
              />
            </div>
            <Button type="submit" className="w-full md:w-auto">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileQuestion className="h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>Quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <h4 className="font-semibold text-gray-900 dark:text-white">{faq.question}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Company Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                The Ascension Company LLC
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Antonio Goldwire, Founder
                <br />
                2585 S Broadway St, Unit #136
                <br />
                Truth or Consequences, NM 87901
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Contact</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Phone: (888) 868-8069
                <br />
                Email: support@theascensionco.us
                <br />
                Website: theascensionco.us
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
