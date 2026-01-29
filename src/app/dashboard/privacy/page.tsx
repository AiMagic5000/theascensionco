"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useUser } from "@clerk/nextjs"
import { supabase } from "@/lib/supabase"
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
  Info,
  Loader2,
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
  const { user, isLoaded } = useUser()
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
  const [isLoading, setIsLoading] = useState(true)
  const [aiProcessing, setAiProcessing] = useState(false)
  const [aiProcessingType, setAiProcessingType] = useState<"privacy" | "publicRecords" | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const privacyFileInputRef = useRef<HTMLInputElement>(null)
  const publicRecordsInputRef = useRef<HTMLInputElement>(null)

  // Load data from database on mount
  useEffect(() => {
    const loadData = async () => {
      if (!user?.id || !isLoaded) return

      setIsLoading(true)
      try {
        // Load privacy files
        const { data: privacyFilesData } = await supabase
          .from("privacy_files")
          .select("*")
          .eq("user_id", user.id)
          .eq("file_type", "privacy")

        if (privacyFilesData) {
          setPrivacyFiles(privacyFilesData.map(f => ({
            id: f.id,
            name: f.name,
            type: f.type as DownloadFile["type"],
            size: f.size,
            uploadedAt: new Date(f.uploaded_at),
            content: f.content,
          })))
        }

        // Load public record files
        const { data: publicRecordsData } = await supabase
          .from("privacy_files")
          .select("*")
          .eq("user_id", user.id)
          .eq("file_type", "publicRecords")

        if (publicRecordsData) {
          setPublicRecordFiles(publicRecordsData.map(f => ({
            id: f.id,
            name: f.name,
            type: f.type as DownloadFile["type"],
            size: f.size,
            uploadedAt: new Date(f.uploaded_at),
            content: f.content,
          })))
        }

        // Load privacy data
        const { data: privacyData } = await supabase
          .from("privacy_data")
          .select("*")
          .eq("user_id", user.id)
          .single()

        if (privacyData) {
          setPrivacyFileData({
            fullName: privacyData.full_name || "",
            dateOfBirth: privacyData.date_of_birth || "",
            ssn: privacyData.ssn || "",
            address: privacyData.address || "",
            city: privacyData.city || "",
            state: privacyData.state || "",
            zip: privacyData.zip || "",
            phone: privacyData.phone || "",
            email: privacyData.email || "",
            privacyNumber: privacyData.privacy_number || "",
            privacyNumberIssueDate: privacyData.privacy_number_issue_date || "",
            privacyNumberStatus: privacyData.privacy_number_status || "Pending",
            creditScore: privacyData.credit_score || 0,
            creditBureau: privacyData.credit_bureau || "",
            creditReportDate: privacyData.credit_report_date || "",
            publicRecordsCount: privacyData.public_records_count || 0,
            publicRecordsStatus: privacyData.public_records_status || "Pending",
            tradelines: privacyData.tradelines || [],
            bankAccounts: privacyData.bank_accounts || [],
            notes: privacyData.notes || "",
          })
        }
      } catch (error) {
        console.error("Error loading privacy data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [user?.id, isLoaded])

  // Save file to database
  const saveFile = async (file: DownloadFile, fileType: "privacy" | "publicRecords") => {
    if (!user?.id) return

    try {
      await supabase.from("privacy_files").upsert({
        id: file.id,
        user_id: user.id,
        name: file.name,
        type: file.type,
        size: file.size,
        uploaded_at: file.uploadedAt.toISOString(),
        content: file.content || null,
        file_type: fileType,
      })
    } catch (error) {
      console.error("Error saving file:", error)
    }
  }

  // Save privacy data to database
  const savePrivacyData = async (data: PrivacyFileData) => {
    if (!user?.id) return

    try {
      await supabase.from("privacy_data").upsert({
        user_id: user.id,
        full_name: data.fullName,
        date_of_birth: data.dateOfBirth,
        ssn: data.ssn,
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        phone: data.phone,
        email: data.email,
        privacy_number: data.privacyNumber,
        privacy_number_issue_date: data.privacyNumberIssueDate,
        privacy_number_status: data.privacyNumberStatus,
        credit_score: data.creditScore,
        credit_bureau: data.creditBureau,
        credit_report_date: data.creditReportDate,
        public_records_count: data.publicRecordsCount,
        public_records_status: data.publicRecordsStatus,
        tradelines: data.tradelines,
        bank_accounts: data.bankAccounts,
        notes: data.notes,
        updated_at: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Error saving privacy data:", error)
    }
  }

  // Handle file upload with database persistence
  const handleFileUpload = useCallback((files: File[], type: "privacy" | "publicRecords") => {
    files.forEach(async (file) => {
      const blobUrl = URL.createObjectURL(file)
      let content: string | undefined

      // Read text content for text-based files
      const isTextFile =
        file.type.includes("text") ||
        file.name.endsWith(".txt") ||
        file.name.endsWith(".csv") ||
        file.name.endsWith(".md") ||
        file.name.endsWith(".doc") ||
        file.name.endsWith(".docx")

      if (isTextFile) {
        try {
          content = await file.text()
        } catch {
          content = undefined
        }
      }

      // For PDFs, read as base64 for AI processing
      if (file.type.includes("pdf")) {
        try {
          const arrayBuffer = await file.arrayBuffer()
          const base64 = Buffer.from(arrayBuffer).toString("base64")
          content = `data:application/pdf;base64,${base64}`
        } catch {
          content = undefined
        }
      }

      // For Excel files, read as base64
      if (file.type.includes("spreadsheet") || file.type.includes("excel") || file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
        try {
          const arrayBuffer = await file.arrayBuffer()
          const base64 = Buffer.from(arrayBuffer).toString("base64")
          const mimeType = file.name.endsWith(".xlsx")
            ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            : "application/vnd.ms-excel"
          content = `data:${mimeType};base64,${base64}`
        } catch {
          content = undefined
        }
      }

      // For Word documents, read as base64
      if (file.type.includes("document") || file.type.includes("msword") || file.name.endsWith(".docx") || file.name.endsWith(".doc")) {
        try {
          const arrayBuffer = await file.arrayBuffer()
          const base64 = Buffer.from(arrayBuffer).toString("base64")
          const mimeType = file.name.endsWith(".docx")
            ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            : "application/msword"
          content = `data:${mimeType};base64,${base64}`
        } catch {
          content = undefined
        }
      }

      // For images, also read as base64
      if (file.type.includes("image")) {
        try {
          const arrayBuffer = await file.arrayBuffer()
          const base64 = Buffer.from(arrayBuffer).toString("base64")
          content = `data:${file.type};base64,${base64}`
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

      // Save to database
      await saveFile(newFile, type)
    })
  }, [user?.id])

  // Populate with AI function
  const handlePopulateWithAI = async (type: "privacy" | "publicRecords") => {
    const filesToProcess = type === "privacy" ? privacyFiles : publicRecordFiles

    if (filesToProcess.length === 0) {
      alert(`No ${type === "privacy" ? "privacy" : "public records"} files uploaded. Please upload files first.`)
      return
    }

    setAiProcessing(true)
    setAiProcessingType(type)

    try {
      // Prepare documents for AI processing
      const documents = filesToProcess
        .filter(f => f.content)
        .map(f => ({
          fileName: f.name,
          content: f.content || "",
          type: f.type,
        }))

      if (documents.length === 0) {
        alert("No readable content found in uploaded files. Please upload text files (.txt, .csv, .doc) for best results.")
        return
      }

      const response = await fetch("/api/process-privacy-documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documents, type }),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success && result.data) {
          const data = result.data

          // Update privacy data with extracted information
          const updatedData = {
            ...privacyFileData,
            fullName: data.fullName || privacyFileData.fullName,
            dateOfBirth: data.dateOfBirth || privacyFileData.dateOfBirth,
            ssn: data.ssn || privacyFileData.ssn,
            address: data.address || privacyFileData.address,
            city: data.city || privacyFileData.city,
            state: data.state || privacyFileData.state,
            zip: data.zip || privacyFileData.zip,
            phone: data.phone || privacyFileData.phone,
            email: data.email || privacyFileData.email,
            privacyNumber: data.privacyNumber || privacyFileData.privacyNumber,
            privacyNumberIssueDate: data.privacyNumberIssueDate || privacyFileData.privacyNumberIssueDate,
            privacyNumberStatus: data.privacyNumberStatus || privacyFileData.privacyNumberStatus,
            creditScore: data.creditScore || privacyFileData.creditScore,
            creditBureau: data.creditBureau || privacyFileData.creditBureau,
            creditReportDate: data.creditReportDate || privacyFileData.creditReportDate,
            publicRecordsCount: data.publicRecordsCount ?? privacyFileData.publicRecordsCount,
            publicRecordsStatus: data.publicRecordsStatus || privacyFileData.publicRecordsStatus,
            tradelines: data.tradelines || privacyFileData.tradelines,
            bankAccounts: data.bankAccounts || privacyFileData.bankAccounts,
            notes: data.notes || privacyFileData.notes,
          }

          setPrivacyFileData(updatedData)
          await savePrivacyData(updatedData)

          alert(`Successfully extracted data from ${result.documentsProcessed} ${type === "privacy" ? "privacy" : "public records"} documents!`)
        } else {
          alert("AI processing completed but no data was found in the documents.")
        }
      } else {
        alert("Failed to process documents. Please try again.")
      }
    } catch (error) {
      console.error("AI processing error:", error)
      alert("An error occurred while processing documents.")
    } finally {
      setAiProcessing(false)
      setAiProcessingType(null)
    }
  }

  const handleDeleteFile = async (fileId: string, type: "privacy" | "publicRecords") => {
    if (type === "privacy") {
      setPrivacyFiles(prev => prev.filter(f => f.id !== fileId))
    } else {
      setPublicRecordFiles(prev => prev.filter(f => f.id !== fileId))
    }

    // Delete from database
    if (user?.id) {
      try {
        await supabase.from("privacy_files").delete().eq("id", fileId)
      } catch (error) {
        console.error("Error deleting file:", error)
      }
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

  // Handle field update
  const handleFieldChange = (field: keyof PrivacyFileData, value: string | number) => {
    setPrivacyFileData(prev => ({ ...prev, [field]: value }))
    setHasUnsavedChanges(true)
  }

  // Manual save handler
  const handleSaveChanges = async () => {
    setIsSaving(true)
    try {
      await savePrivacyData(privacyFileData)
      setHasUnsavedChanges(false)
      alert("Changes saved successfully!")
    } catch (error) {
      console.error("Error saving changes:", error)
      alert("Failed to save changes. Please try again.")
    } finally {
      setIsSaving(false)
    }
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
                        <strong>Next Step:</strong> After uploading, click <span className="text-purple-400">"Populate with AI"</span> to automatically extract your personal info, privacy number, and credit data.
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

                {/* Populate with AI Button */}
                <Tooltip
                  position="bottom"
                  maxWidth="380px"
                  content={
                    <div className="space-y-2">
                      <p className="font-semibold text-purple-400">Extract Privacy Data with AI</p>
                      <p>Scans your uploaded privacy files to automatically extract:</p>
                      <ul className="text-gray-300 text-xs list-disc list-inside space-y-1 mt-1">
                        <li>Personal information (name, DOB, SSN, address)</li>
                        <li>Privacy number and status</li>
                        <li>Credit score and bureau information</li>
                        <li>Bank accounts and tradelines</li>
                      </ul>
                      <p className="text-gray-300 text-xs mt-2 border-t border-gray-600 pt-2">
                        <strong>How to use:</strong> Upload your privacy file documents first, then click this button to auto-fill all fields.
                      </p>
                      <p className="text-gray-400 text-xs italic">Admins can upload and process files on behalf of clients.</p>
                    </div>
                  }
                >
                  <Button
                    onClick={() => handlePopulateWithAI("privacy")}
                    disabled={aiProcessing || privacyFiles.length === 0}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 disabled:opacity-50"
                  >
                    {aiProcessing && aiProcessingType === "privacy" ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Populate with AI
                      </>
                    )}
                  </Button>
                </Tooltip>
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
                        <strong>Next Step:</strong> After uploading, click <span className="text-green-400">"Populate with AI"</span> to automatically extract and update your public records status.
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

                {/* Populate with AI Button */}
                <Tooltip
                  position="bottom"
                  maxWidth="380px"
                  content={
                    <div className="space-y-2">
                      <p className="font-semibold text-green-400">Extract Public Records with AI</p>
                      <p>Scans your uploaded public records documents to automatically extract:</p>
                      <ul className="text-gray-300 text-xs list-disc list-inside space-y-1 mt-1">
                        <li>Public records count and status</li>
                        <li>Court records, liens, judgments</li>
                        <li>Bankruptcy information if present</li>
                        <li>Any official filings data</li>
                      </ul>
                      <p className="text-gray-300 text-xs mt-2 border-t border-gray-600 pt-2">
                        <strong>How to use:</strong> Upload your public records documents first, then click this button to auto-fill all fields.
                      </p>
                      <p className="text-gray-400 text-xs italic">Admins can upload and process files on behalf of clients.</p>
                    </div>
                  }
                >
                  <Button
                    onClick={() => handlePopulateWithAI("publicRecords")}
                    disabled={aiProcessing || publicRecordFiles.length === 0}
                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 disabled:opacity-50"
                  >
                    {aiProcessing && aiProcessingType === "publicRecords" ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Populate with AI
                      </>
                    )}
                  </Button>
                </Tooltip>
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Privacy File Preview
              </CardTitle>
              <CardDescription>
                Your complete privacy file data. Click sections to expand and edit.
              </CardDescription>
            </div>
            {hasUnsavedChanges && (
              <Button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            )}
          </div>
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
                      <label className="text-xs font-medium text-gray-500 uppercase block mb-1">Full Name</label>
                      <Input
                        value={privacyFileData.fullName || ""}
                        onChange={(e) => handleFieldChange("fullName", e.target.value)}
                        placeholder="Enter full name"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase block mb-1">Date of Birth</label>
                      <Input
                        value={privacyFileData.dateOfBirth || ""}
                        onChange={(e) => handleFieldChange("dateOfBirth", e.target.value)}
                        placeholder="MM/DD/YYYY"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase block mb-1">SSN</label>
                      <Input
                        value={privacyFileData.ssn || ""}
                        onChange={(e) => handleFieldChange("ssn", e.target.value)}
                        placeholder="XXX-XX-XXXX"
                        className="text-sm font-mono"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs font-medium text-gray-500 uppercase block mb-1">Address</label>
                      <Input
                        value={privacyFileData.address || ""}
                        onChange={(e) => handleFieldChange("address", e.target.value)}
                        placeholder="Enter street address"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase block mb-1">City</label>
                      <Input
                        value={privacyFileData.city || ""}
                        onChange={(e) => handleFieldChange("city", e.target.value)}
                        placeholder="Enter city"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase block mb-1">State</label>
                      <Input
                        value={privacyFileData.state || ""}
                        onChange={(e) => handleFieldChange("state", e.target.value)}
                        placeholder="Enter state"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase block mb-1">ZIP Code</label>
                      <Input
                        value={privacyFileData.zip || ""}
                        onChange={(e) => handleFieldChange("zip", e.target.value)}
                        placeholder="Enter ZIP"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase block mb-1">Phone</label>
                      <Input
                        value={privacyFileData.phone || ""}
                        onChange={(e) => handleFieldChange("phone", e.target.value)}
                        placeholder="Enter phone number"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase block mb-1">Email</label>
                      <Input
                        value={privacyFileData.email || ""}
                        onChange={(e) => handleFieldChange("email", e.target.value)}
                        placeholder="Enter email"
                        type="email"
                        className="text-sm"
                      />
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
                      <label className="text-xs font-medium text-gray-500 uppercase block mb-1">Privacy Number (CPN)</label>
                      <Input
                        value={privacyFileData.privacyNumber || ""}
                        onChange={(e) => handleFieldChange("privacyNumber", e.target.value)}
                        placeholder="XXX-XX-XXXX"
                        className="text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase block mb-1">Issue Date</label>
                      <Input
                        value={privacyFileData.privacyNumberIssueDate || ""}
                        onChange={(e) => handleFieldChange("privacyNumberIssueDate", e.target.value)}
                        placeholder="MM/DD/YYYY"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase block mb-1">Status</label>
                      <select
                        value={privacyFileData.privacyNumberStatus || "Pending"}
                        onChange={(e) => handleFieldChange("privacyNumberStatus", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Active">Active</option>
                        <option value="Expired">Expired</option>
                        <option value="Under Review">Under Review</option>
                      </select>
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
                        <label className="text-xs font-medium text-gray-500 uppercase block mb-1">Credit Score</label>
                        <Input
                          type="number"
                          value={privacyFileData.creditScore || ""}
                          onChange={(e) => handleFieldChange("creditScore", parseInt(e.target.value) || 0)}
                          placeholder="300-850"
                          min={300}
                          max={850}
                          className="text-lg font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase block mb-1">Credit Bureau</label>
                        <select
                          value={privacyFileData.creditBureau || ""}
                          onChange={(e) => handleFieldChange("creditBureau", e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Bureau</option>
                          <option value="Equifax">Equifax</option>
                          <option value="Experian">Experian</option>
                          <option value="TransUnion">TransUnion</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase block mb-1">Report Date</label>
                        <Input
                          value={privacyFileData.creditReportDate || ""}
                          onChange={(e) => handleFieldChange("creditReportDate", e.target.value)}
                          placeholder="MM/DD/YYYY"
                          className="text-sm"
                        />
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
                      <label className="text-xs font-medium text-gray-500 uppercase block mb-1">Records Count</label>
                      <Input
                        type="number"
                        value={privacyFileData.publicRecordsCount || 0}
                        onChange={(e) => handleFieldChange("publicRecordsCount", parseInt(e.target.value) || 0)}
                        placeholder="0"
                        min={0}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase block mb-1">Status</label>
                      <select
                        value={privacyFileData.publicRecordsStatus || "Pending"}
                        onChange={(e) => handleFieldChange("publicRecordsStatus", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Clear">Clear</option>
                        <option value="Items Found">Items Found</option>
                        <option value="Under Review">Under Review</option>
                      </select>
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
                    <textarea
                      value={privacyFileData.notes || ""}
                      onChange={(e) => handleFieldChange("notes", e.target.value)}
                      placeholder="Add notes about this privacy file..."
                      rows={4}
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                    />
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
