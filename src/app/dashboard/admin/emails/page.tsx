"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Mail,
  Search,
  Send,
  Inbox,
  Clock,
  User,
  Paperclip,
  Star,
  Archive,
  Trash2,
  Reply,
  Forward,
} from "lucide-react"

const isAdminEmail = (email: string | undefined | null): boolean => {
  if (!email) return false
  return email.endsWith("@theascensionco.us") || email.endsWith("@ascensionco.us")
}

// Demo email data
const demoEmails = [
  {
    id: "1",
    from: "John Smith",
    email: "john.smith@email.com",
    subject: "Question about IRS Registration",
    preview: "Hi, I wanted to follow up on my IRS registration submission. When can I expect...",
    timestamp: "2024-01-28 14:32",
    read: false,
    starred: true,
    hasAttachment: false,
  },
  {
    id: "2",
    from: "Sarah Johnson",
    email: "sarah.j@email.com",
    subject: "Payment Confirmation",
    preview: "I just completed the payment through Gumroad. Please confirm that you received...",
    timestamp: "2024-01-28 11:15",
    read: true,
    starred: false,
    hasAttachment: true,
  },
  {
    id: "3",
    from: "Michael Brown",
    email: "m.brown@email.com",
    subject: "Document Upload Issue",
    preview: "I'm having trouble uploading my business license. The file keeps failing to...",
    timestamp: "2024-01-27 16:45",
    read: true,
    starred: false,
    hasAttachment: false,
  },
  {
    id: "4",
    from: "System",
    email: "noreply@theascensionco.us",
    subject: "New POA Submission - John Smith",
    preview: "A new Power of Attorney form has been submitted. Client: John Smith, Services...",
    timestamp: "2024-01-27 10:20",
    read: true,
    starred: true,
    hasAttachment: true,
  },
]

export default function ClientEmailsPage() {
  const { user, isLoaded } = useUser()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null)

  if (isLoaded && !isAdminEmail(user?.primaryEmailAddress?.emailAddress)) {
    redirect("/dashboard")
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  const filteredEmails = demoEmails.filter(
    email =>
      email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selected = demoEmails.find(e => e.id === selectedEmail)

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
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
              <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Client Emails
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage client email communications
          </p>
        </div>
        <Button>
          <Send className="h-4 w-4 mr-2" />
          Compose
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search emails..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[600px] overflow-y-auto">
                {filteredEmails.map((email) => (
                  <div
                    key={email.id}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedEmail === email.id
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    } ${!email.read ? "bg-blue-50/50 dark:bg-blue-900/10" : ""}`}
                    onClick={() => setSelectedEmail(email.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`font-medium truncate ${!email.read ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
                            {email.from}
                          </p>
                          {email.starred && <Star className="h-3 w-3 text-amber-500 fill-amber-500" />}
                          {email.hasAttachment && <Paperclip className="h-3 w-3 text-gray-400" />}
                        </div>
                        <p className={`text-sm truncate ${!email.read ? "font-medium text-gray-800 dark:text-gray-200" : "text-gray-600 dark:text-gray-400"}`}>
                          {email.subject}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-1">{email.preview}</p>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{email.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Email Detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="h-full">
            {selected ? (
              <>
                <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{selected.subject}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <User className="h-4 w-4" />
                        {selected.from} ({selected.email})
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Star className={`h-4 w-4 ${selected.starred ? "text-amber-500 fill-amber-500" : ""}`} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <Clock className="h-4 w-4" />
                    {selected.timestamp}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{selected.preview}</p>
                    <p className="text-gray-500 mt-4">[Full email content would be displayed here]</p>
                  </div>

                  {selected.hasAttachment && (
                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Attachments</p>
                      <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                        <Paperclip className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">attachment.pdf</span>
                        <Button variant="ghost" size="sm" className="ml-auto">Download</Button>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button>
                      <Reply className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                    <Button variant="outline">
                      <Forward className="h-4 w-4 mr-2" />
                      Forward
                    </Button>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center text-gray-500">
                  <Inbox className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">Select an email to view</p>
                  <p className="text-sm">Choose from the list on the left</p>
                </div>
              </CardContent>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
