"use client"

import dynamic from "next/dynamic"
import Link from "next/link"

const isClerkConfigured = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  return key && !key.includes("placeholder") && key !== "pk_test_xxx"
}

// Dynamically import Clerk SignUp component only when configured
const SignUp = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.SignUp),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg h-96 w-80" />
    )
  }
)

function DemoModeMessage() {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl max-w-md w-full text-center">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Authentication Not Configured
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Clerk authentication is not set up yet. Please add your Clerk keys to the environment variables.
      </p>
      <Link
        href="/dashboard"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Continue to Dashboard (Demo Mode)
      </Link>
    </div>
  )
}

export default function SignUpPage() {
  const configured = isClerkConfigured()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      {configured ? (
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white dark:bg-gray-900 shadow-xl",
            },
          }}
        />
      ) : (
        <DemoModeMessage />
      )}
    </div>
  )
}
