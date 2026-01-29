"use client"

import { useState, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip } from "@/components/ui/tooltip"
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
  Upload,
  Trash2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  User,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Calendar,
  Building,
  Hash,
} from "lucide-react"

// Privacy file data structure
interface PrivacyFileData {
  // Personal Info
  fullName?: string
  dateOfBirth?: string
  ssn?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  phone?: string
  email?: string

  // Privacy Number Info
  privacyNumber?: string
  privacyNumberIssueDate?: string
  privacyNumberStatus?: string

  // Credit Profile
  creditScore?: number
  creditBureau?: string
  creditReportDate?: string

  // Financial Info
  bankAccounts?: Array<{
    bankName: string
    accountType: string
    accountNumber: string
    balance?: number
  }>

  // Tradelines
  tradelines?: Array<{
    creditor: string
    accountNumber: string
    creditLimit: number
    balance: number
    paymentStatus: string
    dateOpened: string
    age: string
  }>

  // Public Records
  publicRecordsCount?: number
  publicRecordsStatus?: string

  // Notes
  notes?: string
}

interface DownloadFile {
  id: string
  name: string
  type: "pdf" | "image" | "spreadsheet" | "document"
  size: number
  uploadedAt: Date
  blobUrl?: string
  content?: string
}

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

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B"
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
  return (bytes / (1024 * 1024)).toFixed(1) + " MB"
}

export default function PrivacyPage() {
  const { user } = useUser()
  const [showSensitive, setShowSensitive] = useState(false)
  const [privacyFiles, setPrivacyFiles] = useState<DownloadFile[]>([])
  const [publicRecordFiles, setPublicRecordFiles] = useState<DownloadFile[]>([])
  const [privacyFileData, setPrivacyFileData] = useState<PrivacyFileData>({
    fullName: "",
    dateOfBirth: "",
    ssn: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    privacyNumber: "",
    privacyNumberIssueDate: "",
    privacyNumberStatus: "Pending",
    creditScore: 0,
    creditBureau: "",
    creditReportDate: "",
    publicRecordsCount: 0,
    publicRecordsStatus: "Pending",
    tradelines: [],
    bankAccounts: [],
    notes: "",
  })
  const [expandedSection, setExpandedSection] = useState<string | null>("personal")

  const privacyFileInputRef = useRef<HTMLInputElement>(null)
  const publicRecordsInputRef = useRef<HTMLInputElement>(null)

  // Handle file upload
  const handleFileUpload = useCallback((files: File[], type: "privacy" | "publicRecords") => {
    files.forEach(async (file) => {
      const blobUrl = URL.createObjectURL(file)
      let content: string | undefined

      // Read text content for text-based files
      const isTextFile =
        file.type.includes("text") ||
        file.name.endsWith(".txt") ||
        file.name.endsWith(".csv") ||
        file.name.endsWith(".md")

      if (isTextFile) {
        try {
          content = await file.text()
        } catch {
          content = undefined
        }
      }

      const newFile: DownloadFile = {
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type.includes("pdf") ? "pdf" :
              file.type.includes("image") ? "image" :
              file.type.includes("sheet") || file.type.includes("excel") ? "spreadsheet" : "document",
        size: file.size,
        uploadedAt: new Date(),
        blobUrl,
        content,
      }

      if (type === "privacy") {
        setPrivacyFiles(prev => [...prev, newFile])
      } else {
        setPublicRecordFiles(prev => [...prev, newFile])
      }
    })
  }, [])

  const handleDeleteFile = (fileId: string, type: "privacy" | "publicRecords") => {
    if (type === "privacy") {
      setPrivacyFiles(prev => prev.filter(f => f.id !== fileId))
    } else {
      setPublicRecordFiles(prev => prev.filter(f => f.id !== fileId))
    }
  }

  const handleDownloadFile = (file: DownloadFile) => {
    if (file.blobUrl) {
      const link = document.createElement('a')
      link.href = file.blobUrl
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  // Section toggle
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Privacy Services
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your privacy file, public records, and related services
          </p>
        </div>
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
                <p className="text-sm text-gray-500 dark:text-gray-400">Privacy File</p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                  {privacyFileData.privacyNumberStatus || "Pending"}
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
                <p className="text-sm text-gray-500 dark:text-gray-400">Privacy Number</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {privacyFileData.privacyNumber ? "•••-••-" + privacyFileData.privacyNumber.slice(-4) : "Not Set"}
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
                  {privacyFileData.publicRecordsCount || 0} Files
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Privacy File Upload */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Privacy File Documents
            </CardTitle>
            <CardDescription>
              Upload your privacy file documents for secure storage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Tooltip
                  position="bottom"
                  maxWidth="380px"
                  content={
                    <div className="space-y-2">
                      <p className="font-semibold text-blue-400">Upload Privacy File Documents</p>
                      <p>Upload documents containing your privacy information, such as privacy number files, personal identification documents, or profile data.</p>
                      <p className="text-gray-300 text-xs mt-2 border-t border-gray-600 pt-2">
                        <strong>Supported formats:</strong> PDF, Word (.doc, .docx), Text (.txt), CSV
                      </p>
                      <p className="text-gray-300 text-xs">
                        <strong>Tip:</strong> You can also upload privacy documents in the <span className="text-amber-400">Business Management</span> tab. Click <span className="text-amber-400">"Populate with AI"</span> there to automatically extract and populate your privacy data.
                      </p>
                    </div>
                  }
                >
                  <Button
                    variant="outline"
                    onClick={() => privacyFileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Privacy File
                  </Button>
                </Tooltip>
                <input
                  ref={privacyFileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.csv"
                  onChange={(e) => handleFileUpload(Array.from(e.target.files || []), "privacy")}
                />
              </div>

              {privacyFiles.length > 0 ? (
                <div className="space-y-3">
                  {privacyFiles.map((file) => {
                    const FileIcon = getFileIcon(file.type)
                    return (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <FileIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {file.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {formatFileSize(file.size)} - Uploaded {file.uploadedAt.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleDownloadFile(file)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteFile(file.id, "privacy")}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                  <Shield className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    No privacy files uploaded yet
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    Upload your privacy file documents for secure storage
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

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
              Public Records Documents
            </CardTitle>
            <CardDescription>
              Upload and manage your public records documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Tooltip
                  position="bottom"
                  maxWidth="380px"
                  content={
                    <div className="space-y-2">
                      <p className="font-semibold text-purple-400">Upload Public Records Documents</p>
                      <p>Upload documents related to your public records, including court records, liens, judgments, bankruptcies, or any official public filings.</p>
                      <p className="text-gray-300 text-xs mt-2 border-t border-gray-600 pt-2">
                        <strong>Supported formats:</strong> PDF, Word (.doc, .docx), Text (.txt), CSV, Excel (.xls, .xlsx)
                      </p>
                      <p className="text-gray-300 text-xs">
                        <strong>Tip:</strong> You can also upload public records in the <span className="text-amber-400">Business Management</span> tab. Click <span className="text-amber-400">"Populate with AI"</span> there to automatically extract and populate your public records data.
                      </p>
                    </div>
                  }
                >
                  <Button
                    variant="outline"
                    onClick={() => publicRecordsInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Public Records
                  </Button>
                </Tooltip>
                <input
                  ref={publicRecordsInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx"
                  onChange={(e) => handleFileUpload(Array.from(e.target.files || []), "publicRecords")}
                />
              </div>

              {publicRecordFiles.length > 0 ? (
                <div className="space-y-3">
                  {publicRecordFiles.map((file) => {
                    const FileIcon = getFileIcon(file.type)
                    return (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
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
                              {formatFileSize(file.size)} - Uploaded {file.uploadedAt.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleDownloadFile(file)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteFile(file.id, "publicRecords")}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                  <FolderDown className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    No public records uploaded yet
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    Upload your public records documents here
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Privacy File Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Privacy File Preview
          </CardTitle>
          <CardDescription>
            Your complete privacy file data. Click sections to expand.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Blur overlay with reveal button */}
            {!showSensitive && (
              <div className="absolute inset-0 z-10 backdrop-blur-md bg-white/50 dark:bg-gray-900/50 flex items-center justify-center rounded-xl">
                <Button
                  onClick={() => setShowSensitive(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
                  size="lg"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  Reveal Data
                </Button>
              </div>
            )}

            <div className={`bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden ${!showSensitive ? 'blur-sm' : ''}`}>
              {/* Personal Information Section */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => toggleSection("personal")}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-gray-900 dark:text-white">Personal Information</span>
                  </div>
                  {expandedSection === "personal" ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {expandedSection === "personal" && (
                  <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">Full Name</label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">{privacyFileData.fullName || "-"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">Date of Birth</label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">{privacyFileData.dateOfBirth || "-"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">SSN</label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1 font-mono">
                        {privacyFileData.ssn ? "•••-••-" + privacyFileData.ssn.slice(-4) : "-"}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs font-medium text-gray-500 uppercase">Address</label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">{privacyFileData.address || "-"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">City</label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">{privacyFileData.city || "-"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">State</label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">{privacyFileData.state || "-"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">ZIP Code</label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">{privacyFileData.zip || "-"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">Phone</label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">{privacyFileData.phone || "-"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">Email</label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">{privacyFileData.email || "-"}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Privacy Number Section */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => toggleSection("privacy")}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-gray-900 dark:text-white">Privacy Number</span>
                  </div>
                  {expandedSection === "privacy" ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {expandedSection === "privacy" && (
                  <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">Privacy Number (CPN)</label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1 font-mono">
                        {privacyFileData.privacyNumber || "-"}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">Issue Date</label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">{privacyFileData.privacyNumberIssueDate || "-"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">Status</label>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                        privacyFileData.privacyNumberStatus === "Active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}>
                        {privacyFileData.privacyNumberStatus || "Pending"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Credit Profile Section */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => toggleSection("credit")}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                    <span className="font-semibold text-gray-900 dark:text-white">Credit Profile</span>
                  </div>
                  {expandedSection === "credit" ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {expandedSection === "credit" && (
                  <div className="p-4 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase">Credit Score</label>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                          {privacyFileData.creditScore || "-"}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase">Credit Bureau</label>
                        <p className="text-sm text-gray-900 dark:text-white mt-1">{privacyFileData.creditBureau || "-"}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase">Report Date</label>
                        <p className="text-sm text-gray-900 dark:text-white mt-1">{privacyFileData.creditReportDate || "-"}</p>
                      </div>
                    </div>

                    {/* Tradelines */}
                    {privacyFileData.tradelines && privacyFileData.tradelines.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tradelines</h4>
                        <div className="space-y-2">
                          {privacyFileData.tradelines.map((tradeline, index) => (
                            <div key={index} className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-white">{tradeline.creditor}</p>
                                  <p className="text-xs text-gray-500">Account: {tradeline.accountNumber}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  tradeline.paymentStatus === "Current"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}>
                                  {tradeline.paymentStatus}
                                </span>
                              </div>
                              <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                                <div>
                                  <span className="text-gray-500">Limit:</span>{" "}
                                  <span className="text-gray-900 dark:text-white">${tradeline.creditLimit.toLocaleString()}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Balance:</span>{" "}
                                  <span className="text-gray-900 dark:text-white">${tradeline.balance.toLocaleString()}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Age:</span>{" "}
                                  <span className="text-gray-900 dark:text-white">{tradeline.age}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Public Records Section */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => toggleSection("publicRecords")}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-orange-600" />
                    <span className="font-semibold text-gray-900 dark:text-white">Public Records</span>
                  </div>
                  {expandedSection === "publicRecords" ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {expandedSection === "publicRecords" && (
                  <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">Records Count</label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">{privacyFileData.publicRecordsCount || 0}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">Status</label>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                        privacyFileData.publicRecordsStatus === "Clear"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}>
                        {privacyFileData.publicRecordsStatus || "Pending"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Notes Section */}
              <div>
                <button
                  onClick={() => toggleSection("notes")}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-gray-600" />
                    <span className="font-semibold text-gray-900 dark:text-white">Notes</span>
                  </div>
                  {expandedSection === "notes" ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {expandedSection === "notes" && (
                  <div className="p-4 pt-0">
                    <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                      {privacyFileData.notes || "No notes available."}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Hide button when revealed */}
            {showSensitive && (
              <div className="mt-4 text-center">
                <Button variant="outline" onClick={() => setShowSensitive(false)}>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Hide Sensitive Data
                </Button>
              </div>
            )}
          </div>
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
