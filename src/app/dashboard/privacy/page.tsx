"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
  FolderDown,
  File,
  FileImage,
  FileSpreadsheet,
} from "lucide-react"

// Demo privacy file data (blurred)
const demoPrivacyFile = {
  status: "Active",
  createdDate: "2024-01-15",
  lastUpdated: "2024-12-01",
  package: "Professional",
  creditScore: 724,
  tradelines: [
    { name: "Premium AU Tradeline #1", limit: "$25,000", age: "3 years", status: "Active" },
    { name: "Premium AU Tradeline #2", limit: "$20,000", age: "2 years", status: "Active" },
  ],
  publicRecords: 127,
}

// Demo downloadable files - in production, fetch from database per user
interface DownloadFile {
  id: string
  name: string
  type: "pdf" | "image" | "spreadsheet" | "document"
  size: string
  uploadedAt: string
  downloadUrl: string
}

const demoDownloadFiles: DownloadFile[] = [
  // Empty by default - admin will upload files for each client
  // Example structure when files are available:
  // {
  //   id: "1",
  //   name: "Public_Records_Report.pdf",
  //   type: "pdf",
  //   size: "2.4 MB",
  //   uploadedAt: "2024-01-20",
  //   downloadUrl: "#",
  // },
]

const getFileIcon = (type: DownloadFile["type"]) => {
  switch (type) {
    case "pdf":
      return FileText
    case "image":
      return FileImage
    case "spreadsheet":
      return FileSpreadsheet
    default:
      return File
  }
}

export default function PrivacyPage() {
  const [showSensitive, setShowSensitive] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Privacy Services
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your privacy file and related services
          </p>
        </div>
        <Button onClick={() => setShowSensitive(!showSensitive)} variant="outline">
          {showSensitive ? (
            <>
              <EyeOff className="mr-2 h-4 w-4" />
              Hide Sensitive Info
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" />
              Show Sensitive Info
            </>
          )}
        </Button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                  {demoPrivacyFile.status}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Package</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {demoPrivacyFile.package}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Public Records</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {demoPrivacyFile.publicRecords} Submitted
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Public Records Downloads */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderDown className="h-5 w-5 text-purple-600" />
              Public Records Downloads
            </CardTitle>
            <CardDescription>
              Download your public records documents uploaded by our team
            </CardDescription>
          </CardHeader>
          <CardContent>
            {demoDownloadFiles.length > 0 ? (
              <div className="space-y-3">
                {demoDownloadFiles.map((file) => {
                  const FileIcon = getFileIcon(file.type)
                  return (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                          <FileIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {file.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {file.size} - Uploaded {file.uploadedAt}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={file.downloadUrl} download>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                <FolderDown className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  No files available yet
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Your public records documents will appear here once uploaded by our team
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Privacy File Preview (Blurred Demo) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Privacy File Preview
          </CardTitle>
          <CardDescription>
            Demo preview of your privacy file. Toggle visibility above to reveal details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`relative ${!showSensitive ? "blur-preview select-none" : ""}`}>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-6">
              {/* File Header */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  ABC Buggy Whips Co. - Privacy Profile
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  File ID: CPF-2024-XXXX-XXXX
                </p>
              </div>

              {/* Credit Score */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Credit Score</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {demoPrivacyFile.creditScore}
                    </span>
                    <span className="text-sm text-green-600 dark:text-green-400">Good</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Created</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {demoPrivacyFile.createdDate}
                  </p>
                </div>
              </div>

              {/* Tradelines */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Active Tradelines
                </h4>
                <div className="space-y-3">
                  {demoPrivacyFile.tradelines.map((tradeline, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {tradeline.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Limit: {tradeline.limit} | Age: {tradeline.age}
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full">
                        {tradeline.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
                <AlertCircle className="h-4 w-4" />
                <span>Last updated: {demoPrivacyFile.lastUpdated}</span>
              </div>
            </div>
          </div>

          {!showSensitive && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/90 dark:bg-gray-900/90 px-6 py-4 rounded-lg shadow-lg text-center pointer-events-auto">
                <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="font-medium text-gray-900 dark:text-white">Content Protected</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click &ldquo;Show Sensitive Info&rdquo; to reveal
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Upgrades */}
      <Card>
        <CardHeader>
          <CardTitle>Upgrade Your Package</CardTitle>
          <CardDescription>Enhance your privacy protection with additional features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white">Executive Package</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Upgrade to 740+ score target with high-limit tradelines
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-3">$1,847</p>
              <Button className="w-full mt-4">Upgrade Now</Button>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white">Elite Package</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Maximum protection with 760+ score and VIP access
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-3">$2,747</p>
              <Button className="w-full mt-4">Upgrade Now</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
