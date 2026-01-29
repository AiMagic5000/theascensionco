"use client"

import { useState, useCallback, useRef, useEffect, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useUser } from "@clerk/nextjs"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip } from "@/components/ui/tooltip"
import {
  Building2,
  Plus,
  Pencil,
  Trash2,
  DollarSign,
  TrendingUp,
  CreditCard,
  Save,
  X,
  Upload,
  FileText,
  File,
  FileSpreadsheet,
  Image as ImageIcon,
  Download,
  Eye,
  FolderPlus,
  Folder,
  FolderOpen,
  ChevronRight,
  Info,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Search,
  Grid,
  List,
  MoreVertical,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  Shield,
} from "lucide-react"

// Types
interface FileItem {
  id: string
  name: string
  type: string
  size: number
  uploadedAt: Date
  folderId: string | null
  url?: string
  blobUrl?: string // Object URL for download/preview
  content?: string // Text content for preview
  status: "uploading" | "processing" | "ready" | "error"
  aiProcessed?: boolean
}

interface FolderItem {
  id: string
  name: string
  parentId: string | null
  createdAt: Date
}

interface Account {
  id: string
  name: string
  type: "business" | "personal"
  category: string
  balance: number
  institution: string
  accountNumber: string
  // Dynamic fields for different account types
  url?: string
  username?: string
  password?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  entityId?: string
  jurisdiction?: string
  agentName?: string
  phone?: string
  email?: string
  notes?: string
  [key: string]: string | number | boolean | undefined // Allow additional dynamic fields
}

// Empty business profile - to be populated by user or AI
const initialBusinessProfile = {
  companyName: "",
  dunsNumber: "",
  paydexScore: 0,
  ein: "",
  stateOfFormation: "",
  industry: "",
}

// Empty accounts - user will add their own
const initialAccounts: Account[] = []

// Empty files - user will upload their own
const initialFiles: FileItem[] = []

// Starter folders for organization
const initialFolders: FolderItem[] = [
  { id: "legal", name: "Legal Documents", parentId: null, createdAt: new Date() },
  { id: "tax", name: "Tax Documents", parentId: null, createdAt: new Date() },
  { id: "contracts", name: "Contracts", parentId: null, createdAt: new Date() },
  { id: "financial", name: "Financial Statements", parentId: null, createdAt: new Date() },
]

// File icon helper
function getFileIcon(type: string) {
  if (type.includes("pdf")) return <FileText className="h-8 w-8 text-red-500" />
  if (type.includes("word") || type.includes("doc")) return <FileText className="h-8 w-8 text-blue-500" />
  if (type.includes("sheet") || type.includes("excel") || type.includes("csv")) return <FileSpreadsheet className="h-8 w-8 text-green-500" />
  if (type.includes("image")) return <ImageIcon className="h-8 w-8 text-purple-500" />
  return <File className="h-8 w-8 text-gray-500" />
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B"
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
  return (bytes / (1024 * 1024)).toFixed(1) + " MB"
}

// Deduplication helper - checks if an account already exists
function isDuplicateAccount(existingAccounts: Account[], newAccount: Partial<Account>): boolean {
  const normalize = (str: string | undefined) => (str || "").toLowerCase().trim()

  return existingAccounts.some((existing) => {
    // Check by name + institution (most common identifier)
    if (
      normalize(existing.name) === normalize(newAccount.name) &&
      normalize(existing.institution) === normalize(newAccount.institution) &&
      normalize(existing.name) !== ""
    ) {
      return true
    }

    // Check by category + accountNumber (for bank accounts)
    if (
      normalize(existing.category) === normalize(newAccount.category) &&
      normalize(existing.accountNumber) === normalize(newAccount.accountNumber) &&
      normalize(existing.accountNumber) !== "" &&
      normalize(existing.accountNumber) !== "n/a"
    ) {
      return true
    }

    // Check by username + url (for login credentials)
    if (
      normalize(existing.username) === normalize(newAccount.username) &&
      normalize(existing.url) === normalize(newAccount.url) &&
      normalize(existing.username) !== "" &&
      normalize(existing.url) !== ""
    ) {
      return true
    }

    // Check by email + category (for email accounts)
    if (
      normalize(existing.email) === normalize(newAccount.email) &&
      normalize(existing.category) === normalize(newAccount.category) &&
      normalize(existing.email) !== ""
    ) {
      return true
    }

    return false
  })
}

// Filter out duplicates from new accounts list
function filterDuplicateAccounts(existingAccounts: Account[], newAccounts: Partial<Account>[]): Partial<Account>[] {
  const uniqueNew: Partial<Account>[] = []
  const seenInBatch = new Set<string>()

  for (const acc of newAccounts) {
    // Create a simple key for batch deduplication
    const batchKey = `${(acc.name || "").toLowerCase()}-${(acc.institution || "").toLowerCase()}-${(acc.username || "").toLowerCase()}`

    // Skip if already seen in this batch
    if (seenInBatch.has(batchKey) && batchKey !== "--") {
      continue
    }

    // Skip if duplicate of existing account
    if (isDuplicateAccount(existingAccounts, acc)) {
      continue
    }

    seenInBatch.add(batchKey)
    uniqueNew.push(acc)
  }

  return uniqueNew
}

function BusinessPageContent() {
  const { user, isLoaded } = useUser()
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams.get("tab")
  const [activeTab, setActiveTab] = useState<"profile" | "documents">(
    tabFromUrl === "documents" ? "documents" : "profile"
  )

  // Sync tab with URL when it changes
  useEffect(() => {
    if (tabFromUrl === "documents") {
      setActiveTab("documents")
    } else if (tabFromUrl === "profile") {
      setActiveTab("profile")
    }
  }, [tabFromUrl])
  const [businessProfile, setBusinessProfile] = useState(initialBusinessProfile)
  const [accounts, setAccounts] = useState(initialAccounts)
  const [editingProfile, setEditingProfile] = useState(false)
  const [showAddAccount, setShowAddAccount] = useState(false)
  const [editingAccountId, setEditingAccountId] = useState<string | null>(null)
  const [expandedAccountId, setExpandedAccountId] = useState<string | null>(null)
  const [accountFilter, setAccountFilter] = useState<"all" | "business" | "personal">("all")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Document management state
  const [files, setFiles] = useState<FileItem[]>(initialFiles)
  const [folders, setFolders] = useState<FolderItem[]>(initialFolders)
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewFolderModal, setShowNewFolderModal] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [showAiUpload, setShowAiUpload] = useState(false)
  const [aiProcessing, setAiProcessing] = useState(false)
  const [pendingFiles, setPendingFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const folderInputRef = useRef<HTMLInputElement>(null)

  const [newAccount, setNewAccount] = useState({
    name: "",
    type: "business" as "business" | "personal",
    category: "Checking",
    balance: 0,
    institution: "",
    accountNumber: "",
  })

  // Load data from Cognabase on mount
  useEffect(() => {
    if (!isLoaded || !user) return

    const loadData = async () => {
      setIsLoading(true)
      const userId = user.id

      try {
        // Load business profile
        const { data: profileData, error: profileError } = await supabase
          .from('ascension_business_profiles')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle()

        if (profileData && !profileError) {
          setBusinessProfile({
            companyName: profileData.company_name || '',
            dunsNumber: profileData.duns_number || '',
            paydexScore: profileData.paydex_score || 0,
            ein: profileData.ein || '',
            stateOfFormation: profileData.state_of_formation || '',
            industry: profileData.industry || '',
          })
        }

        // Load accounts
        const { data: accountsData } = await supabase
          .from('ascension_business_accounts')
          .select('*')
          .eq('user_id', userId)

        if (accountsData && accountsData.length > 0) {
          setAccounts(accountsData.map(a => ({
            id: a.id,
            name: a.name,
            type: a.type as 'business' | 'personal',
            category: a.category || 'Checking',
            balance: Number(a.balance) || 0,
            institution: a.institution || '',
            accountNumber: a.account_number || '',
            // Dynamic fields
            url: a.url || '',
            username: a.username || '',
            password: a.password || '',
            address: a.address || '',
            city: a.city || '',
            state: a.state || '',
            zip: a.zip || '',
            entityId: a.entity_id || '',
            jurisdiction: a.jurisdiction || '',
            agentName: a.agent_name || '',
            phone: a.phone || '',
            email: a.email || '',
            notes: a.notes || '',
          })))
        }

        // Load folders
        const { data: foldersData } = await supabase
          .from('ascension_folders')
          .select('*')
          .eq('user_id', userId)

        if (foldersData && foldersData.length > 0) {
          const loadedFolders: FolderItem[] = foldersData.map(f => ({
            id: f.id,
            name: f.name,
            parentId: f.parent_id,
            createdAt: new Date(f.created_at),
          }))
          // Merge with initial folders
          const existingNames = loadedFolders.map(f => f.name.toLowerCase())
          const newInitialFolders = initialFolders.filter(f => !existingNames.includes(f.name.toLowerCase()))
          setFolders([...loadedFolders, ...newInitialFolders])
        }

        // Load files
        const { data: filesData } = await supabase
          .from('ascension_files')
          .select('*')
          .eq('user_id', userId)

        if (filesData && filesData.length > 0) {
          setFiles(filesData.map(f => ({
            id: f.id,
            name: f.name,
            type: f.type || 'application/octet-stream',
            size: Number(f.size) || 0,
            uploadedAt: new Date(f.created_at),
            folderId: f.folder_id,
            content: f.content || undefined,
            status: 'ready' as const,
            aiProcessed: f.ai_processed || false,
          })))
        }
      } catch (error) {
        console.error('Error loading data from Cognabase:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [isLoaded, user])

  // Save business profile to Cognabase
  const saveBusinessProfile = useCallback(async (profile: typeof businessProfile) => {
    if (!user) {
      console.error('Cannot save profile: no user')
      return
    }
    setIsSaving(true)

    try {
      console.log('Saving business profile to Cognabase for user:', user.id)
      const { data, error } = await supabase
        .from('ascension_business_profiles')
        .upsert({
          user_id: user.id,
          company_name: profile.companyName,
          duns_number: profile.dunsNumber,
          paydex_score: profile.paydexScore,
          ein: profile.ein,
          state_of_formation: profile.stateOfFormation,
          industry: profile.industry,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' })
        .select()

      if (error) {
        console.error('Supabase error saving profile:', error)
      } else {
        console.log('Business profile saved successfully:', data)
      }
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setIsSaving(false)
    }
  }, [user])

  // Save account to Cognabase
  const saveAccount = useCallback(async (account: Account) => {
    if (!user) {
      console.error('Cannot save account: no user')
      return
    }

    try {
      console.log('Saving account to Cognabase:', account.id, account.name)
      const { data, error } = await supabase
        .from('ascension_business_accounts')
        .upsert({
          id: account.id,
          user_id: user.id,
          name: account.name,
          type: account.type,
          category: account.category,
          balance: account.balance,
          institution: account.institution,
          account_number: account.accountNumber,
          // Dynamic fields
          url: account.url || null,
          username: account.username || null,
          password: account.password || null,
          address: account.address || null,
          city: account.city || null,
          state: account.state || null,
          zip: account.zip || null,
          entity_id: account.entityId || null,
          jurisdiction: account.jurisdiction || null,
          agent_name: account.agentName || null,
          phone: account.phone || null,
          email: account.email || null,
          notes: account.notes || null,
        })
        .select()

      if (error) {
        console.error('Supabase error saving account:', error)
      } else {
        console.log('Account saved successfully:', data)
      }
    } catch (error) {
      console.error('Error saving account:', error)
    }
  }, [user])

  // Delete account from Cognabase
  const deleteAccount = useCallback(async (accountId: string) => {
    if (!user) return

    try {
      await supabase
        .from('ascension_business_accounts')
        .delete()
        .eq('id', accountId)
        .eq('user_id', user.id)
    } catch (error) {
      console.error('Error deleting account:', error)
    }
  }, [user])

  // Save folder to Cognabase
  const saveFolder = useCallback(async (folder: FolderItem) => {
    if (!user) {
      console.error('Cannot save folder: no user')
      return
    }

    try {
      console.log('Saving folder to Cognabase:', folder.id, folder.name)
      const { data, error } = await supabase
        .from('ascension_folders')
        .upsert({
          id: folder.id,
          user_id: user.id,
          name: folder.name,
          parent_id: folder.parentId,
        })
        .select()

      if (error) {
        console.error('Supabase error saving folder:', error)
      } else {
        console.log('Folder saved successfully:', data)
      }
    } catch (error) {
      console.error('Error saving folder:', error)
    }
  }, [user])

  // Save file metadata to Cognabase
  const saveFile = useCallback(async (file: FileItem) => {
    if (!user) {
      console.error('Cannot save file: no user')
      return
    }

    try {
      console.log('Saving file to Cognabase:', file.id, file.name)
      const { data, error } = await supabase
        .from('ascension_files')
        .upsert({
          id: file.id,
          user_id: user.id,
          name: file.name,
          type: file.type,
          size: file.size,
          folder_id: file.folderId,
          content: file.content?.substring(0, 50000), // Limit content size
          ai_processed: file.aiProcessed || false,
        })
        .select()

      if (error) {
        console.error('Supabase error saving file:', error)
      } else {
        console.log('File saved successfully:', data)
      }
    } catch (error) {
      console.error('Error saving file:', error)
    }
  }, [user])

  // Delete file from Cognabase
  const deleteFileFromDb = useCallback(async (fileId: string) => {
    if (!user) return

    try {
      await supabase
        .from('ascension_files')
        .delete()
        .eq('id', fileId)
        .eq('user_id', user.id)
    } catch (error) {
      console.error('Error deleting file:', error)
    }
  }, [user])

  // Filter files based on current folder and search
  const filteredFiles = files.filter((file) => {
    const matchesFolder = file.folderId === currentFolder
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFolder && matchesSearch
  })

  const currentFolderData = folders.find((f) => f.id === currentFolder)
  const subFolders = folders.filter((f) => f.parentId === currentFolder)

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFileUpload(droppedFiles)
  }, [currentFolder])

  const handleFileUpload = (uploadedFiles: File[]) => {
    uploadedFiles.forEach(async (file) => {
      // Create a blob URL for download/preview
      const blobUrl = URL.createObjectURL(file)
      const fileId = crypto.randomUUID()

      // Read text content for text-based files
      let content: string | undefined
      const isTextFile =
        file.type.includes("text") ||
        file.name.endsWith(".txt") ||
        file.name.endsWith(".csv") ||
        file.name.endsWith(".md") ||
        file.name.endsWith(".json")

      if (isTextFile) {
        try {
          content = await file.text()
        } catch {
          content = undefined
        }
      }

      const newFile: FileItem = {
        id: fileId,
        name: file.name,
        type: file.type || getMimeType(file.name),
        size: file.size,
        uploadedAt: new Date(),
        folderId: currentFolder,
        blobUrl: blobUrl,
        content: content,
        status: "uploading",
      }

      setFiles((prev) => [...prev, newFile])
      setUploadProgress((prev) => ({ ...prev, [newFile.id]: 0 }))

      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          const readyFile = { ...newFile, status: "ready" as const }
          setFiles((prev) =>
            prev.map((f) => (f.id === newFile.id ? readyFile : f))
          )
          // Save file metadata to Cognabase
          saveFile(readyFile)
          setUploadProgress((prev) => {
            const newProgress = { ...prev }
            delete newProgress[newFile.id]
            return newProgress
          })
        } else {
          setUploadProgress((prev) => ({ ...prev, [newFile.id]: progress }))
        }
      }, 200)
    })
  }

  // Helper to get MIME type from file extension
  const getMimeType = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase()
    const mimeTypes: Record<string, string> = {
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      txt: 'text/plain',
      csv: 'text/csv',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      gif: 'image/gif',
    }
    return mimeTypes[ext || ''] || 'application/octet-stream'
  }

  const handleFolderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || [])
    if (uploadedFiles.length > 0) {
      setPendingFiles(uploadedFiles)
      setShowAiUpload(true)
    }
  }

  const handleAiProcess = async () => {
    if (pendingFiles.length === 0) return

    setAiProcessing(true)

    // First upload the files normally
    handleFileUpload(pendingFiles)

    // Read file contents for AI processing
    const documentPromises = pendingFiles.slice(0, 10).map(async (file) => {
      const ext = file.name.toLowerCase().split(".").pop()
      const isPdf = file.type.includes("pdf") || ext === "pdf"
      const isExcel = file.type.includes("spreadsheet") || file.type.includes("excel") || ext === "xlsx" || ext === "xls"
      const isWord = file.type.includes("document") || file.type.includes("msword") || ext === "docx" || ext === "doc"
      const isTextFile =
        file.type.includes("text") ||
        ext === "txt" ||
        ext === "csv" ||
        ext === "md" ||
        ext === "json"

      // For PDFs, Excel, and Word files, send as base64 with data URI
      if (isPdf || isExcel || isWord) {
        try {
          const arrayBuffer = await file.arrayBuffer()
          const base64 = btoa(
            new Uint8Array(arrayBuffer).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          )

          // Determine correct MIME type
          let mimeType = file.type
          if (!mimeType || mimeType === "application/octet-stream") {
            if (ext === "pdf") mimeType = "application/pdf"
            else if (ext === "xlsx") mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            else if (ext === "xls") mimeType = "application/vnd.ms-excel"
            else if (ext === "docx") mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            else if (ext === "doc") mimeType = "application/msword"
          }

          return {
            fileName: file.name,
            content: `data:${mimeType};base64,${base64}`,
            type: mimeType,
          }
        } catch (e) {
          console.error("Error reading file:", e)
          return null
        }
      }

      // For text files, read content directly
      if (isTextFile) {
        try {
          const text = await file.text()
          return {
            fileName: file.name,
            content: text,
            type: file.type || "text/plain",
          }
        } catch {
          return null
        }
      }

      // Skip binary files that we can't process
      return null
    })

    const documents = (await Promise.all(documentPromises)).filter(Boolean)

    console.log(`Processing ${documents.length} documents for AI extraction`)

    if (documents.length > 0) {
      try {
        console.log("Sending documents to API:", documents.map(d => d ? { fileName: d.fileName, type: d.type, hasBase64: !!(d as { base64?: string }).base64, contentLength: d.content?.length || 0 } : null))

        const response = await fetch("/api/process-documents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ documents }),
        })

        console.log("API response status:", response.status)

        if (response.ok) {
          const result = await response.json()
          console.log("API result:", result)

          if (result.success && result.data) {
            const data = result.data
            console.log("Extracted business data:", data)

            // Auto-populate business profile
            const updatedProfile = {
              companyName: data.companyName || businessProfile.companyName,
              ein: data.ein || businessProfile.ein,
              dunsNumber: data.dunsNumber || businessProfile.dunsNumber,
              stateOfFormation: data.stateOfFormation || businessProfile.stateOfFormation,
              industry: data.industry || businessProfile.industry,
              paydexScore: data.paydexScore || businessProfile.paydexScore,
            }
            console.log("Updating business profile to:", updatedProfile)
            setBusinessProfile(updatedProfile)
            await saveBusinessProfile(updatedProfile)
            console.log("Business profile saved to Cognabase")

            // Auto-add accounts if found (with deduplication)
            if (data.accounts && Array.isArray(data.accounts) && data.accounts.length > 0) {
              console.log(`Found ${data.accounts.length} accounts from AI:`, data.accounts)

              // Filter out duplicates before adding
              const uniqueAccounts = filterDuplicateAccounts(accounts, data.accounts as Partial<Account>[])
              console.log(`After deduplication: ${uniqueAccounts.length} unique accounts to add`)

              if (uniqueAccounts.length > 0) {
                const newAccounts = uniqueAccounts.map((acc: Partial<Account>) => ({
                  id: crypto.randomUUID(),
                  name: acc.name || "Unnamed Account",
                  type: (acc.type === "personal" ? "personal" : "business") as "business" | "personal",
                  category: acc.category || "Other",
                  balance: Number(acc.balance) || 0,
                  institution: acc.institution || "",
                  accountNumber: acc.accountNumber || "",
                  url: acc.url || "",
                  username: acc.username || "",
                  password: acc.password || "",
                  address: acc.address || "",
                  city: acc.city || "",
                  state: acc.state || "",
                  zip: acc.zip || "",
                  entityId: acc.entityId || "",
                  jurisdiction: acc.jurisdiction || "",
                  agentName: acc.agentName || "",
                  phone: acc.phone || "",
                  email: acc.email || "",
                  notes: acc.notes || "",
                }))
                console.log("Processed unique accounts:", newAccounts)
                setAccounts((prev) => [...prev, ...newAccounts])
                // Save each account to Cognabase
                for (const acc of newAccounts) {
                  await saveAccount(acc)
                  console.log("Saved account to Cognabase:", acc.name)
                }
              } else {
                console.log("All extracted accounts already exist (duplicates filtered)")
              }
            } else {
              console.log("No accounts found in AI response")
            }

            // Create suggested folders
            if (data.suggestedFolders) {
              const existingFolderNames = folders.map((f) => f.name.toLowerCase())
              const newFolderNames = new Set<string>()

              for (const sf of data.suggestedFolders as { suggestedFolder: string }[]) {
                const folderName = sf.suggestedFolder
                if (
                  folderName &&
                  !existingFolderNames.includes(folderName.toLowerCase()) &&
                  !newFolderNames.has(folderName.toLowerCase())
                ) {
                  newFolderNames.add(folderName.toLowerCase())
                  const newFolder: FolderItem = {
                    id: crypto.randomUUID(),
                    name: folderName,
                    parentId: null,
                    createdAt: new Date(),
                  }
                  setFolders((prev) => [...prev, newFolder])
                  await saveFolder(newFolder)
                }
              }
            }

            // Mark files as AI processed and save to Cognabase
            setFiles((prev) => {
              const updatedFiles = prev.map((f) => ({
                ...f,
                aiProcessed: true,
              }))
              // Save each file to Cognabase
              updatedFiles.forEach((file) => saveFile(file))
              return updatedFiles
            })
          } else {
            console.log("AI processing completed but no data extracted")
          }
        } else {
          const errorText = await response.text()
          console.error("API error response:", errorText)
        }
      } catch (error) {
        console.error("AI processing failed:", error)
      }
    } else {
      console.log("No processable documents found in uploaded files")
    }

    setAiProcessing(false)
    setShowAiUpload(false)
    setPendingFiles([])
  }

  const handleSkipAiProcessing = () => {
    handleFileUpload(pendingFiles)
    setShowAiUpload(false)
    setPendingFiles([])
  }

  const handleDeleteFile = async (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))
    await deleteFileFromDb(fileId)
  }

  const handleCreateFolder = async () => {
    if (newFolderName.trim()) {
      const newFolder: FolderItem = {
        id: crypto.randomUUID(),
        name: newFolderName.trim(),
        parentId: currentFolder,
        createdAt: new Date(),
      }
      setFolders((prev) => [...prev, newFolder])
      await saveFolder(newFolder)
      setNewFolderName("")
      setShowNewFolderModal(false)
    }
  }

  const handleDeleteFolder = async (folderId: string) => {
    // Delete folder and all files in it
    const filesToDelete = files.filter((f) => f.folderId === folderId)
    setFolders((prev) => prev.filter((f) => f.id !== folderId))
    setFiles((prev) => prev.filter((f) => f.folderId !== folderId))

    // Delete from database
    for (const file of filesToDelete) {
      await deleteFileFromDb(file.id)
    }
    if (user) {
      await supabase.from('ascension_folders').delete().eq('id', folderId).eq('user_id', user.id)
    }
  }

  const handlePreviewFile = (file: FileItem) => {
    setSelectedFile(file)
    setShowPreview(true)
  }

  // Account handlers
  const filteredAccounts = accounts.filter(
    (a) => accountFilter === "all" || a.type === accountFilter
  )

  const totalBusinessBalance = accounts
    .filter((a) => a.type === "business")
    .reduce((sum, a) => sum + a.balance, 0)

  const handleAddAccount = async () => {
    const account: Account = {
      id: crypto.randomUUID(),
      ...newAccount,
    }
    setAccounts([...accounts, account])
    await saveAccount(account)
    setNewAccount({
      name: "",
      type: "business",
      category: "Checking",
      balance: 0,
      institution: "",
      accountNumber: "",
    })
    setShowAddAccount(false)
  }

  const handleDeleteAccount = async (id: string) => {
    setAccounts(accounts.filter((a) => a.id !== id))
    await deleteAccount(id)
  }

  const handleUpdateAccount = async (id: string, updates: Partial<Account>) => {
    const updatedAccounts = accounts.map((a) =>
      a.id === id ? { ...a, ...updates } : a
    )
    setAccounts(updatedAccounts)
    const updatedAccount = updatedAccounts.find((a) => a.id === id)
    if (updatedAccount) {
      await saveAccount(updatedAccount)
    }
  }

  // Helper to detect and make URLs clickable
  const formatWithLinks = (text: string) => {
    if (!text) return text
    const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9.-]+\.(com|org|net|io|co|us|gov|edu)[^\s]*)/gi
    const parts = text.split(urlRegex).filter(Boolean)

    return parts.map((part, i) => {
      if (part && (part.startsWith('http') || part.startsWith('www.') || /\.(com|org|net|io|co|us|gov|edu)/i.test(part))) {
        const url = part.startsWith('http') ? part : `https://${part}`
        return (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 hover:underline inline-flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
            <ExternalLink className="h-3 w-3" />
          </a>
        )
      }
      return part
    })
  }

  // Populate business profile and accounts from all uploaded documents using AI
  const handlePopulateWithAI = async () => {
    if (files.length === 0) {
      alert("No documents uploaded. Please upload business documents first in the Documents tab.")
      return
    }

    setAiProcessing(true)
    console.log(`Starting AI population from ${files.length} documents`)

    try {
      // Gather all documents with content
      const documents = files
        .filter((file) => {
          // Only process files that have content or are text-based
          const isTextFile =
            file.type.includes("text") ||
            file.name.endsWith(".txt") ||
            file.name.endsWith(".csv") ||
            file.name.endsWith(".md") ||
            file.name.endsWith(".json")
          const isPdf = file.type.includes("pdf") || file.name.toLowerCase().endsWith(".pdf")
          return file.content || isTextFile || isPdf
        })
        .slice(0, 15) // Limit to 15 documents
        .map((file) => ({
          fileName: file.name,
          content: file.content || `[File: ${file.name}]`,
          type: file.type,
        }))

      console.log(`Processing ${documents.length} documents with content`)

      if (documents.length === 0) {
        alert("No documents with readable content found. Please upload text files (.txt, .csv) containing business information.")
        setAiProcessing(false)
        return
      }

      const response = await fetch("/api/process-documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documents }),
      })

      console.log("API response status:", response.status)

      if (response.ok) {
        const result = await response.json()
        console.log("AI extraction result:", result)

        if (result.success && result.data) {
          const data = result.data

          // Update business profile with extracted data
          const updatedProfile = {
            companyName: data.companyName || businessProfile.companyName,
            ein: data.ein || businessProfile.ein,
            dunsNumber: data.dunsNumber || businessProfile.dunsNumber,
            stateOfFormation: data.stateOfFormation || businessProfile.stateOfFormation,
            industry: data.industry || businessProfile.industry,
            paydexScore: data.paydexScore || businessProfile.paydexScore,
          }

          console.log("Updating business profile:", updatedProfile)
          setBusinessProfile(updatedProfile)
          await saveBusinessProfile(updatedProfile)

          // Add extracted accounts (with deduplication)
          if (data.accounts && Array.isArray(data.accounts) && data.accounts.length > 0) {
            console.log(`Found ${data.accounts.length} accounts from AI`)

            // Filter out duplicates before adding
            const uniqueAccounts = filterDuplicateAccounts(accounts, data.accounts as Partial<Account>[])
            console.log(`After deduplication: ${uniqueAccounts.length} unique accounts to add`)

            if (uniqueAccounts.length > 0) {
              const newAccounts = uniqueAccounts.map((acc: Partial<Account>) => ({
                id: crypto.randomUUID(),
                name: acc.name || "Unnamed Account",
                type: (acc.type === "personal" ? "personal" : "business") as "business" | "personal",
                category: acc.category || "Other",
                balance: Number(acc.balance) || 0,
                institution: acc.institution || "",
                accountNumber: acc.accountNumber || "",
                url: acc.url || "",
                username: acc.username || "",
                password: acc.password || "",
                address: acc.address || "",
                city: acc.city || "",
                state: acc.state || "",
                zip: acc.zip || "",
                entityId: acc.entityId || "",
                jurisdiction: acc.jurisdiction || "",
                agentName: acc.agentName || "",
                phone: acc.phone || "",
                email: acc.email || "",
                notes: acc.notes || "",
              }))

              setAccounts((prev) => [...prev, ...newAccounts])
              for (const acc of newAccounts) {
                await saveAccount(acc)
              }
            }
          }

          const duplicatesFiltered = data.accounts?.length - (filterDuplicateAccounts(accounts, data.accounts as Partial<Account>[])?.length || 0) || 0
          const message = duplicatesFiltered > 0
            ? `Successfully extracted business data from ${result.documentsProcessed} documents! (${duplicatesFiltered} duplicate accounts skipped)`
            : `Successfully extracted business data from ${result.documentsProcessed} documents!`
          alert(message)
        } else {
          alert("AI processing completed but no business data was found in the documents.")
        }
      } else {
        const errorText = await response.text()
        console.error("API error:", errorText)
        alert("Failed to process documents. Please try again.")
      }
    } catch (error) {
      console.error("AI population error:", error)
      alert("An error occurred while processing documents.")
    } finally {
      setAiProcessing(false)
    }
  }

  // Show loading state while fetching data
  if (isLoading || !isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading your business data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Business Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your business profile, documents, and accounts
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl overflow-hidden border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-1">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === "profile"
                ? "bg-amber-100 dark:bg-amber-800/50 text-amber-900 dark:text-amber-100 shadow-sm border border-amber-300 dark:border-amber-600"
                : "text-gray-600 dark:text-gray-400 hover:text-amber-800 dark:hover:text-amber-200"
            }`}
          >
            <Building2 className="h-4 w-4 inline mr-2" />
            Profile & Accounts
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === "documents"
                ? "bg-amber-100 dark:bg-amber-800/50 text-amber-900 dark:text-amber-100 shadow-sm border border-amber-300 dark:border-amber-600"
                : "text-gray-600 dark:text-gray-400 hover:text-amber-800 dark:hover:text-amber-200"
            }`}
          >
            <FileText className="h-4 w-4 inline mr-2" />
            Documents
          </button>
        </div>
      </div>

      {activeTab === "documents" ? (
        <>
          {/* Document Management Section */}
          <Card>
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Folder className="h-5 w-5" />
                    Business Documents
                  </CardTitle>
                  <CardDescription>
                    Upload, manage, and preview your business documents
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search files..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${viewMode === "grid" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600" : "bg-white dark:bg-gray-800 text-gray-600"}`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${viewMode === "list" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600" : "bg-white dark:bg-gray-800 text-gray-600"}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-2 p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                {/* Breadcrumb */}
                <div className="flex items-center gap-1 text-sm flex-1">
                  <button
                    onClick={() => setCurrentFolder(null)}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                  >
                    All Documents
                  </button>
                  {currentFolderData && (
                    <>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900 dark:text-white font-medium">
                        {currentFolderData.name}
                      </span>
                    </>
                  )}
                </div>

                <Button variant="outline" size="sm" onClick={() => setShowNewFolderModal(true)}>
                  <FolderPlus className="h-4 w-4 mr-2" />
                  New Folder
                </Button>
                <Tooltip
                  position="bottom"
                  maxWidth="350px"
                  content={
                    <div className="space-y-2">
                      <p className="font-semibold text-amber-400">Upload Individual Files</p>
                      <p>Upload specific business documents like tax forms, contracts, or statements one at a time.</p>
                      <p className="text-gray-300 text-xs mt-2 border-t border-gray-600 pt-2">
                        <strong>Next Step:</strong> After uploading, go to the <span className="text-amber-400">Profile & Accounts</span> tab and click <span className="text-amber-400">"Populate with AI"</span> to automatically extract business data from your documents.
                      </p>
                    </div>
                  }
                >
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </Button>
                </Tooltip>
                <Tooltip
                  position="bottom"
                  maxWidth="380px"
                  content={
                    <div className="space-y-2">
                      <p className="font-semibold text-purple-400">Upload Entire Folder/Repository</p>
                      <p>Upload a complete folder containing all your business documents at once. The folder structure will be preserved.</p>
                      <p className="text-gray-300 text-xs mt-2 border-t border-gray-600 pt-2">
                        <strong>Next Steps:</strong>
                      </p>
                      <ul className="text-gray-300 text-xs list-disc list-inside space-y-1">
                        <li>Go to <span className="text-amber-400">Profile & Accounts</span> tab and click <span className="text-amber-400">"Populate with AI"</span> to extract all business accounts, EIN, DUNS, and profile data</li>
                        <li>If your repository includes privacy files or public records, the <span className="text-blue-400">Privacy Services</span> tab will also be updated automatically</li>
                      </ul>
                    </div>
                  }
                >
                  <Button size="sm" onClick={() => folderInputRef.current?.click()} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Upload Repository
                  </Button>
                </Tooltip>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileUpload(Array.from(e.target.files || []))}
                />
                <input
                  ref={folderInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFolderUpload}
                  {...({ webkitdirectory: "true", directory: "true", mozdirectory: "true" } as React.InputHTMLAttributes<HTMLInputElement>)}
                />
              </div>

              {/* Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`min-h-[400px] p-4 transition-colors ${
                  isDragging
                    ? "bg-blue-50 dark:bg-blue-900/20 border-2 border-dashed border-blue-400"
                    : ""
                }`}
              >
                {isDragging ? (
                  <div className="flex flex-col items-center justify-center h-[400px] text-blue-600">
                    <Upload className="h-16 w-16 mb-4" />
                    <p className="text-lg font-medium">Drop files here to upload</p>
                  </div>
                ) : (
                  <>
                    {/* Folders */}
                    {subFolders.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Folders</h3>
                        <div className={viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3" : "space-y-2"}>
                          {subFolders.map((folder) => (
                            <motion.div
                              key={folder.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={`group cursor-pointer ${
                                viewMode === "grid"
                                  ? "p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                                  : "flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400"
                              }`}
                              onClick={() => setCurrentFolder(folder.id)}
                            >
                              <FolderOpen className="h-8 w-8 text-amber-500 mx-auto" />
                              <p className="text-sm font-medium text-gray-900 dark:text-white text-center mt-2 truncate">
                                {folder.name}
                              </p>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteFolder(folder.id)
                                }}
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 bg-red-100 rounded-lg hover:bg-red-200 transition-opacity"
                              >
                                <Trash2 className="h-3 w-3 text-red-600" />
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Files */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                        Files {filteredFiles.length > 0 && `(${filteredFiles.length})`}
                      </h3>

                      {filteredFiles.length === 0 && subFolders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                          <FileText className="h-16 w-16 mb-4 text-gray-300" />
                          <p className="text-lg font-medium mb-2">No documents yet</p>
                          <p className="text-sm text-gray-400 mb-4">Upload files or create folders to get started</p>
                          <Button onClick={() => fileInputRef.current?.click()}>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Files
                          </Button>
                        </div>
                      ) : viewMode === "grid" ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                          {filteredFiles.map((file) => (
                            <motion.div
                              key={file.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="group relative p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
                              onClick={() => handlePreviewFile(file)}
                            >
                              {file.status === "uploading" && (
                                <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 rounded-xl flex items-center justify-center">
                                  <div className="text-center">
                                    <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto mb-2" />
                                    <span className="text-xs text-gray-600">{Math.round(uploadProgress[file.id] || 0)}%</span>
                                  </div>
                                </div>
                              )}
                              <div className="flex justify-center mb-3">
                                {getFileIcon(file.type)}
                              </div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white text-center truncate" title={file.name}>
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500 text-center mt-1">
                                {formatFileSize(file.size)}
                              </p>
                              {file.aiProcessed && (
                                <div className="absolute top-2 left-2">
                                  <Sparkles className="h-4 w-4 text-purple-500" />
                                </div>
                              )}
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handlePreviewFile(file)
                                  }}
                                  className="p-1.5 bg-blue-100 dark:bg-blue-900/50 rounded-lg hover:bg-blue-200"
                                >
                                  <Eye className="h-3 w-3 text-blue-600" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteFile(file.id)
                                  }}
                                  className="p-1.5 bg-red-100 dark:bg-red-900/50 rounded-lg hover:bg-red-200"
                                >
                                  <Trash2 className="h-3 w-3 text-red-600" />
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {filteredFiles.map((file) => (
                            <motion.div
                              key={file.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="group flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer"
                              onClick={() => handlePreviewFile(file)}
                            >
                              {getFileIcon(file.type)}
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 dark:text-white truncate">{file.name}</p>
                                <p className="text-sm text-gray-500">
                                  {formatFileSize(file.size)} - {file.uploadedAt.toLocaleDateString()}
                                </p>
                              </div>
                              {file.aiProcessed && (
                                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 text-xs rounded-full flex items-center gap-1">
                                  <Sparkles className="h-3 w-3" />
                                  AI Processed
                                </span>
                              )}
                              {file.status === "uploading" ? (
                                <div className="w-20">
                                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-blue-600 transition-all"
                                      style={{ width: `${uploadProgress[file.id] || 0}%` }}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handlePreviewFile(file) }}>
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="icon"
                                    className="bg-[#D4A84B] hover:bg-[#c49a3f] text-white h-8 w-8"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      if (file.blobUrl) {
                                        const link = document.createElement('a')
                                        link.href = file.blobUrl
                                        link.download = file.name
                                        document.body.appendChild(link)
                                        link.click()
                                        document.body.removeChild(link)
                                      }
                                    }}
                                    disabled={!file.blobUrl}
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => { e.stopPropagation(); handleDeleteFile(file.id) }}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* New Folder Modal */}
          <AnimatePresence>
            {showNewFolderModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={() => setShowNewFolderModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create New Folder</h3>
                  <Input
                    placeholder="Folder name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
                    autoFocus
                  />
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setShowNewFolderModal(false)}>Cancel</Button>
                    <Button onClick={handleCreateFolder}>Create Folder</Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* File Preview Modal */}
          <AnimatePresence>
            {showPreview && selectedFile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                onClick={() => setShowPreview(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      {getFileIcon(selectedFile.type)}
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{selectedFile.name}</h3>
                        <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="bg-[#D4A84B] hover:bg-[#c49a3f] text-white font-medium"
                        onClick={() => {
                          if (selectedFile.blobUrl) {
                            const link = document.createElement('a')
                            link.href = selectedFile.blobUrl
                            link.download = selectedFile.name
                            document.body.appendChild(link)
                            link.click()
                            document.body.removeChild(link)
                          }
                        }}
                        disabled={!selectedFile.blobUrl}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setShowPreview(false)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="h-[70vh] overflow-auto bg-gray-100 dark:bg-gray-800">
                    {selectedFile.type.includes("pdf") && selectedFile.blobUrl ? (
                      <iframe
                        src={selectedFile.blobUrl}
                        className="w-full h-full border-0"
                        title={selectedFile.name}
                      />
                    ) : selectedFile.type.includes("text") ||
                       selectedFile.name.endsWith(".txt") ||
                       selectedFile.name.endsWith(".csv") ||
                       selectedFile.name.endsWith(".md") ||
                       selectedFile.name.endsWith(".json") ? (
                      <div className="p-4 h-full flex flex-col">
                        {selectedFile.content ? (
                          <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-4 rounded-lg flex-1 overflow-auto">
                            {selectedFile.content}
                          </pre>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <FileText className="h-24 w-24 mb-4 text-gray-400" />
                            <p className="text-lg font-medium mb-2">Text Preview</p>
                            <p className="text-sm text-gray-400 mb-4">Content not available for preview</p>
                            {selectedFile.blobUrl && (
                              <Button
                                className="bg-[#D4A84B] hover:bg-[#c49a3f] text-white"
                                onClick={() => {
                                  if (selectedFile.blobUrl) {
                                    const link = document.createElement('a')
                                    link.href = selectedFile.blobUrl
                                    link.download = selectedFile.name
                                    document.body.appendChild(link)
                                    link.click()
                                    document.body.removeChild(link)
                                  }
                                }}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download to View
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    ) : selectedFile.type.includes("sheet") || selectedFile.type.includes("excel") || selectedFile.name.endsWith(".xlsx") || selectedFile.name.endsWith(".xls") || selectedFile.name.endsWith(".csv") ? (
                      <div className="p-4 h-full">
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 h-full overflow-auto">
                          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                            <FileSpreadsheet className="h-8 w-8 text-green-500" />
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{selectedFile.name}</h4>
                              <p className="text-sm text-gray-500">Spreadsheet • {formatFileSize(selectedFile.size)}</p>
                            </div>
                          </div>
                          {selectedFile.content ? (
                            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-auto max-h-[50vh]">
                              {selectedFile.content}
                            </pre>
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Excel files can be viewed by downloading and opening in a spreadsheet application
                              </p>
                              <div className="flex gap-3 justify-center">
                                {selectedFile.blobUrl && (
                                  <Button
                                    className="bg-[#D4A84B] hover:bg-[#c49a3f] text-white"
                                    onClick={() => {
                                      if (selectedFile.blobUrl) {
                                        const link = document.createElement('a')
                                        link.href = selectedFile.blobUrl
                                        link.download = selectedFile.name
                                        document.body.appendChild(link)
                                        link.click()
                                        document.body.removeChild(link)
                                      }
                                    }}
                                  >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Spreadsheet
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : selectedFile.type.includes("word") || selectedFile.type.includes("doc") || selectedFile.name.endsWith(".docx") ? (
                      <div className="p-4 h-full">
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 h-full overflow-auto">
                          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                            <FileText className="h-8 w-8 text-blue-500" />
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{selectedFile.name}</h4>
                              <p className="text-sm text-gray-500">Word Document • {formatFileSize(selectedFile.size)}</p>
                            </div>
                          </div>
                          {selectedFile.blobUrl ? (
                            <div className="text-center py-8">
                              <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Word documents can be viewed using Microsoft Office Online
                              </p>
                              <div className="flex gap-3 justify-center">
                                <Button
                                  className="bg-[#D4A84B] hover:bg-[#c49a3f] text-white"
                                  onClick={() => {
                                    if (selectedFile.blobUrl) {
                                      const link = document.createElement('a')
                                      link.href = selectedFile.blobUrl
                                      link.download = selectedFile.name
                                      document.body.appendChild(link)
                                      link.click()
                                      document.body.removeChild(link)
                                    }
                                  }}
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Download to View
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-gray-500 text-center py-8">Document preview not available</p>
                          )}
                        </div>
                      </div>
                    ) : selectedFile.type.includes("image") && selectedFile.blobUrl ? (
                      <div className="p-4 flex items-center justify-center h-full">
                        <img
                          src={selectedFile.blobUrl}
                          alt={selectedFile.name}
                          className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                        <File className="h-24 w-24 mb-4 text-gray-400" />
                        <p className="text-lg font-medium mb-2">{selectedFile.name}</p>
                        <p className="text-sm text-gray-400 mb-4">
                          {formatFileSize(selectedFile.size)} • {selectedFile.type || 'Unknown type'}
                        </p>
                        {selectedFile.blobUrl && (
                          <Button
                            className="bg-[#D4A84B] hover:bg-[#c49a3f] text-white"
                            onClick={() => {
                              if (selectedFile.blobUrl) {
                                const link = document.createElement('a')
                                link.href = selectedFile.blobUrl
                                link.download = selectedFile.name
                                document.body.appendChild(link)
                                link.click()
                                document.body.removeChild(link)
                              }
                            }}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download File
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Upload Modal */}
          <AnimatePresence>
            {showAiUpload && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={() => !aiProcessing && setShowAiUpload(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-lg w-full shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                      {aiProcessing ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Sparkles className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {aiProcessing ? "Processing Documents..." : "AI Document Processing"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {aiProcessing
                          ? `Analyzing ${pendingFiles.length} files with Kimi K2.5`
                          : `${pendingFiles.length} files ready for processing`}
                      </p>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-green-800 dark:text-green-300">Secure & Encrypted</p>
                        <p className="text-xs text-green-700 dark:text-green-400 mt-0.5">
                          Your data is transmitted using TLS encryption. Documents are processed securely and never stored on external servers.
                        </p>
                      </div>
                    </div>
                  </div>

                  {aiProcessing ? (
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Clock className="h-5 w-5 text-blue-500 animate-pulse" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Extracting business information...</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg opacity-50">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-500">Categorizing documents...</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg opacity-50">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-500">Populating dashboard...</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Drop your entire business folder and our AI will automatically populate your dashboard with all relevant information.
                      </p>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Extract company name, EIN, DUNS from documents</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Auto-categorize files into appropriate folders</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Detect bank accounts and financial data</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Populate business profile automatically</span>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={handleSkipAiProcessing}
                      disabled={aiProcessing}
                    >
                      Skip AI Processing
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={handleAiProcess}
                      disabled={aiProcessing}
                    >
                      {aiProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Process with AI
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <>
          {/* Getting Started Banner - Show when no documents uploaded */}
          {files.length === 0 && (
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="py-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                    <Info className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Getting Started with Business Management
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Follow these steps to auto-populate your business data:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                      <li><strong>Go to the Documents tab</strong> - Click "Documents" in the top right</li>
                      <li><strong>Upload your business files</strong> - Upload your data files, spreadsheets, or documents from your business buildout</li>
                      <li><strong>Return to Profile & Accounts</strong> - Come back to this tab</li>
                      <li><strong>Click "Populate with AI"</strong> - The AI will scan your documents and automatically fill in your business profile and accounts</li>
                    </ol>
                    <Button onClick={() => setActiveTab("documents")} className="bg-blue-600 hover:bg-blue-700">
                      <Upload className="mr-2 h-4 w-4" />
                      Go to Documents
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Business Profile */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Business Profile
                </CardTitle>
                <CardDescription>Your business information and D&B tracking</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative group">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePopulateWithAI}
                    disabled={aiProcessing || files.length === 0}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50"
                  >
                    {aiProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Populate with AI
                      </>
                    )}
                  </Button>
                  <button className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Info className="h-4 w-4" />
                  </button>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-80 z-50">
                    <p className="font-semibold mb-1 text-amber-400">Auto-fill Business Profile</p>
                    <p className="mb-2">Scans your uploaded documents to extract company name, EIN, DUNS, state of formation, and industry information.</p>
                    <div className="border-t border-gray-700 pt-2 mt-2">
                      <p className="font-semibold text-blue-400 mb-1">How to use:</p>
                      <ol className="list-decimal list-inside space-y-1 text-gray-300">
                        <li>Go to the <span className="text-amber-400">Documents</span> tab</li>
                        <li>Upload your business files or repository</li>
                        <li>Return here and click this button</li>
                      </ol>
                      <p className="text-gray-400 mt-2 italic">Admins can also upload files on behalf of clients</p>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingProfile(!editingProfile)}
                >
                  {editingProfile ? (
                    <>
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Company Name</label>
                  {editingProfile ? (
                    <Input
                      value={businessProfile.companyName}
                      onChange={(e) => setBusinessProfile({ ...businessProfile, companyName: e.target.value })}
                      placeholder="Enter company name"
                      className="mt-1"
                    />
                  ) : businessProfile.companyName ? (
                    <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">{businessProfile.companyName}</p>
                  ) : (
                    <div className="mt-1 h-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 cursor-pointer hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" onClick={() => setEditingProfile(true)}>
                      <span className="text-sm text-gray-400">Click to add company name</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">D&B Number (DUNS)</label>
                  {editingProfile ? (
                    <Input
                      value={businessProfile.dunsNumber}
                      onChange={(e) => setBusinessProfile({ ...businessProfile, dunsNumber: e.target.value })}
                      placeholder="XX-XXX-XXXX"
                      className="mt-1"
                    />
                  ) : businessProfile.dunsNumber ? (
                    <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">{businessProfile.dunsNumber}</p>
                  ) : (
                    <div className="mt-1 h-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 cursor-pointer hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" onClick={() => setEditingProfile(true)}>
                      <span className="text-sm text-gray-400">Click to add DUNS number</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">PAYDEX Score</label>
                  {editingProfile ? (
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={businessProfile.paydexScore || ""}
                      onChange={(e) => setBusinessProfile({ ...businessProfile, paydexScore: parseInt(e.target.value) || 0 })}
                      placeholder="0-100"
                      className="mt-1"
                    />
                  ) : businessProfile.paydexScore > 0 ? (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{businessProfile.paydexScore}</span>
                      <span className="text-sm text-gray-500">/100</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  ) : (
                    <div className="mt-1 h-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 cursor-pointer hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" onClick={() => setEditingProfile(true)}>
                      <span className="text-sm text-gray-400">Click to add score</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">EIN (Tax ID)</label>
                  {editingProfile ? (
                    <Input
                      value={businessProfile.ein}
                      onChange={(e) => setBusinessProfile({ ...businessProfile, ein: e.target.value })}
                      placeholder="XX-XXXXXXX"
                      className="mt-1"
                    />
                  ) : businessProfile.ein ? (
                    <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">{businessProfile.ein}</p>
                  ) : (
                    <div className="mt-1 h-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 cursor-pointer hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" onClick={() => setEditingProfile(true)}>
                      <span className="text-sm text-gray-400">Click to add EIN</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">State of Formation</label>
                  {editingProfile ? (
                    <Input
                      value={businessProfile.stateOfFormation}
                      onChange={(e) => setBusinessProfile({ ...businessProfile, stateOfFormation: e.target.value })}
                      placeholder="e.g., Delaware, Wyoming"
                      className="mt-1"
                    />
                  ) : businessProfile.stateOfFormation ? (
                    <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">{businessProfile.stateOfFormation}</p>
                  ) : (
                    <div className="mt-1 h-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 cursor-pointer hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" onClick={() => setEditingProfile(true)}>
                      <span className="text-sm text-gray-400">Click to add state</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Industry</label>
                  {editingProfile ? (
                    <Input
                      value={businessProfile.industry}
                      onChange={(e) => setBusinessProfile({ ...businessProfile, industry: e.target.value })}
                      placeholder="e.g., Technology, Healthcare"
                      className="mt-1"
                    />
                  ) : businessProfile.industry ? (
                    <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">{businessProfile.industry}</p>
                  ) : (
                    <div className="mt-1 h-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 cursor-pointer hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" onClick={() => setEditingProfile(true)}>
                      <span className="text-sm text-gray-400">Click to add industry</span>
                    </div>
                  )}
                </div>
              </div>
              {editingProfile && (
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={async () => {
                      await saveBusinessProfile(businessProfile)
                      setEditingProfile(false)
                    }}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Summary */}
          <Card className={accounts.length > 0
            ? "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800"
            : "bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-300 dark:border-gray-600"
          }>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${accounts.length > 0 ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}`}>
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className={`text-sm ${accounts.length > 0 ? "text-blue-700 dark:text-blue-300" : "text-gray-500 dark:text-gray-400"}`}>
                    Total Business Balance
                  </p>
                  {accounts.length > 0 ? (
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      ${totalBusinessBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                  ) : (
                    <p className="text-lg text-gray-400 dark:text-gray-500">Add accounts to see balance</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accounts List */}
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Accounts
                </CardTitle>
                <CardDescription>Manage your business accounts</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative group">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePopulateWithAI}
                    disabled={aiProcessing || files.length === 0}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50"
                  >
                    {aiProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Populate with AI
                      </>
                    )}
                  </Button>
                  <button className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Info className="h-4 w-4" />
                  </button>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-80 z-50">
                    <p className="font-semibold mb-1 text-purple-400">Auto-detect Accounts</p>
                    <p className="mb-2">Scans your uploaded documents to find bank accounts, credit cards, loans, email accounts, registered agents, and more.</p>
                    <div className="border-t border-gray-700 pt-2 mt-2">
                      <p className="font-semibold text-blue-400 mb-1">How to use:</p>
                      <ol className="list-decimal list-inside space-y-1 text-gray-300">
                        <li>Go to the <span className="text-amber-400">Documents</span> tab</li>
                        <li>Upload your business files or repository</li>
                        <li>Return here and click this button</li>
                      </ol>
                      <p className="text-gray-400 mt-2 italic">Admins can also upload files on behalf of clients</p>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
                <Button onClick={() => setShowAddAccount(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Account
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showAddAccount && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Add New Account</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Input
                      placeholder="Account Name"
                      value={newAccount.name}
                      onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                    />
                    <Input
                      placeholder="Institution"
                      value={newAccount.institution}
                      onChange={(e) => setNewAccount({ ...newAccount, institution: e.target.value })}
                    />
                    <Input
                      type="number"
                      placeholder="Balance"
                      value={newAccount.balance || ""}
                      onChange={(e) => setNewAccount({ ...newAccount, balance: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setShowAddAccount(false)}>Cancel</Button>
                    <Button onClick={handleAddAccount}>Add Account</Button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {accounts.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <CreditCard className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 font-medium mb-2">No accounts added yet</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">Add your business bank accounts and credit cards to track finances</p>
                    <Button variant="outline" onClick={() => setShowAddAccount(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Account
                    </Button>
                  </div>
                ) : (
                  accounts.map((account) => (
                    <div
                      key={account.id}
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                      {/* Account Header - Always Visible */}
                      <div
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                        onClick={() => setExpandedAccountId(expandedAccountId === account.id ? null : account.id)}
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{account.name}</p>
                          <p className="text-sm text-gray-500">{formatWithLinks(account.institution)} {account.accountNumber && account.accountNumber !== "N/A" ? `- ${account.accountNumber}` : ""}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                            {account.category || "Other"}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              setEditingAccountId(editingAccountId === account.id ? null : account.id)
                              setExpandedAccountId(account.id)
                            }}
                            className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteAccount(account.id)
                            }}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          {expandedAccountId === account.id ? (
                            <ChevronUp className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </div>

                      {/* Expanded Account Details */}
                      {expandedAccountId === account.id && (
                        <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                            {/* Account Name */}
                            <div>
                              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Account Name</label>
                              {editingAccountId === account.id ? (
                                <Input
                                  value={account.name}
                                  onChange={(e) => handleUpdateAccount(account.id, { name: e.target.value })}
                                  className="mt-1"
                                />
                              ) : (
                                <p className="text-sm text-gray-900 dark:text-white mt-1">{account.name}</p>
                              )}
                            </div>

                            {/* Institution */}
                            <div>
                              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Institution / Provider</label>
                              {editingAccountId === account.id ? (
                                <Input
                                  value={account.institution}
                                  onChange={(e) => handleUpdateAccount(account.id, { institution: e.target.value })}
                                  className="mt-1"
                                />
                              ) : (
                                <p className="text-sm text-gray-900 dark:text-white mt-1">{formatWithLinks(account.institution)}</p>
                              )}
                            </div>

                            {/* URL - Only show if has value or editing */}
                            {(account.url || editingAccountId === account.id) && (
                              <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Login URL</label>
                                {editingAccountId === account.id ? (
                                  <Input
                                    value={account.url || ""}
                                    onChange={(e) => handleUpdateAccount(account.id, { url: e.target.value })}
                                    className="mt-1"
                                    placeholder="https://..."
                                  />
                                ) : (
                                  <p className="text-sm text-gray-900 dark:text-white mt-1">{formatWithLinks(account.url || "")}</p>
                                )}
                              </div>
                            )}

                            {/* Username - Only show if has value or editing */}
                            {(account.username || editingAccountId === account.id) && (
                              <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Username / Email</label>
                                {editingAccountId === account.id ? (
                                  <Input
                                    value={account.username || ""}
                                    onChange={(e) => handleUpdateAccount(account.id, { username: e.target.value })}
                                    className="mt-1"
                                  />
                                ) : (
                                  <p className="text-sm text-gray-900 dark:text-white mt-1">{account.username}</p>
                                )}
                              </div>
                            )}

                            {/* Password - Only show if has value or editing */}
                            {(account.password || editingAccountId === account.id) && (
                              <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Password</label>
                                {editingAccountId === account.id ? (
                                  <Input
                                    value={account.password || ""}
                                    onChange={(e) => handleUpdateAccount(account.id, { password: e.target.value })}
                                    className="mt-1"
                                    type="password"
                                  />
                                ) : (
                                  <p className="text-sm text-gray-900 dark:text-white mt-1 font-mono">••••••••</p>
                                )}
                              </div>
                            )}

                            {/* Account Number */}
                            {(account.accountNumber || editingAccountId === account.id) && (
                              <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Account Number</label>
                                {editingAccountId === account.id ? (
                                  <Input
                                    value={account.accountNumber}
                                    onChange={(e) => handleUpdateAccount(account.id, { accountNumber: e.target.value })}
                                    className="mt-1"
                                  />
                                ) : (
                                  <p className="text-sm text-gray-900 dark:text-white mt-1">{account.accountNumber || "N/A"}</p>
                                )}
                              </div>
                            )}

                            {/* Entity ID - Only show if has value or editing */}
                            {(account.entityId || editingAccountId === account.id) && (
                              <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Entity ID</label>
                                {editingAccountId === account.id ? (
                                  <Input
                                    value={account.entityId || ""}
                                    onChange={(e) => handleUpdateAccount(account.id, { entityId: e.target.value })}
                                    className="mt-1"
                                  />
                                ) : (
                                  <p className="text-sm text-gray-900 dark:text-white mt-1">{account.entityId}</p>
                                )}
                              </div>
                            )}

                            {/* Jurisdiction - Only show if has value or editing */}
                            {(account.jurisdiction || editingAccountId === account.id) && (
                              <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Jurisdiction</label>
                                {editingAccountId === account.id ? (
                                  <Input
                                    value={account.jurisdiction || ""}
                                    onChange={(e) => handleUpdateAccount(account.id, { jurisdiction: e.target.value })}
                                    className="mt-1"
                                  />
                                ) : (
                                  <p className="text-sm text-gray-900 dark:text-white mt-1">{account.jurisdiction}</p>
                                )}
                              </div>
                            )}

                            {/* Agent Name - Only show if has value or editing */}
                            {(account.agentName || editingAccountId === account.id) && (
                              <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Registered Agent</label>
                                {editingAccountId === account.id ? (
                                  <Input
                                    value={account.agentName || ""}
                                    onChange={(e) => handleUpdateAccount(account.id, { agentName: e.target.value })}
                                    className="mt-1"
                                  />
                                ) : (
                                  <p className="text-sm text-gray-900 dark:text-white mt-1">{account.agentName}</p>
                                )}
                              </div>
                            )}

                            {/* Address - Only show if has value or editing */}
                            {(account.address || editingAccountId === account.id) && (
                              <div className="md:col-span-2">
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Address</label>
                                {editingAccountId === account.id ? (
                                  <Input
                                    value={account.address || ""}
                                    onChange={(e) => handleUpdateAccount(account.id, { address: e.target.value })}
                                    className="mt-1"
                                  />
                                ) : (
                                  <p className="text-sm text-gray-900 dark:text-white mt-1">{account.address}</p>
                                )}
                              </div>
                            )}

                            {/* City/State/Zip - Only show if has value or editing */}
                            {(account.city || account.state || account.zip || editingAccountId === account.id) && (
                              <>
                                <div>
                                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">City</label>
                                  {editingAccountId === account.id ? (
                                    <Input
                                      value={account.city || ""}
                                      onChange={(e) => handleUpdateAccount(account.id, { city: e.target.value })}
                                      className="mt-1"
                                    />
                                  ) : (
                                    <p className="text-sm text-gray-900 dark:text-white mt-1">{account.city || "-"}</p>
                                  )}
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">State</label>
                                  {editingAccountId === account.id ? (
                                    <Input
                                      value={account.state || ""}
                                      onChange={(e) => handleUpdateAccount(account.id, { state: e.target.value })}
                                      className="mt-1"
                                    />
                                  ) : (
                                    <p className="text-sm text-gray-900 dark:text-white mt-1">{account.state || "-"}</p>
                                  )}
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">ZIP Code</label>
                                  {editingAccountId === account.id ? (
                                    <Input
                                      value={account.zip || ""}
                                      onChange={(e) => handleUpdateAccount(account.id, { zip: e.target.value })}
                                      className="mt-1"
                                    />
                                  ) : (
                                    <p className="text-sm text-gray-900 dark:text-white mt-1">{account.zip || "-"}</p>
                                  )}
                                </div>
                              </>
                            )}

                            {/* Phone - Only show if has value or editing */}
                            {(account.phone || editingAccountId === account.id) && (
                              <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Phone</label>
                                {editingAccountId === account.id ? (
                                  <Input
                                    value={account.phone || ""}
                                    onChange={(e) => handleUpdateAccount(account.id, { phone: e.target.value })}
                                    className="mt-1"
                                  />
                                ) : (
                                  <p className="text-sm text-gray-900 dark:text-white mt-1">{account.phone}</p>
                                )}
                              </div>
                            )}

                            {/* Email - Only show if has value or editing */}
                            {(account.email || editingAccountId === account.id) && (
                              <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Email</label>
                                {editingAccountId === account.id ? (
                                  <Input
                                    value={account.email || ""}
                                    onChange={(e) => handleUpdateAccount(account.id, { email: e.target.value })}
                                    className="mt-1"
                                  />
                                ) : (
                                  <p className="text-sm text-gray-900 dark:text-white mt-1">{account.email}</p>
                                )}
                              </div>
                            )}

                            {/* Category */}
                            <div>
                              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Category</label>
                              {editingAccountId === account.id ? (
                                <select
                                  value={account.category}
                                  onChange={(e) => handleUpdateAccount(account.id, { category: e.target.value })}
                                  className="mt-1 w-full h-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-gray-900 dark:text-gray-50"
                                >
                                  <option value="Checking">Checking</option>
                                  <option value="Savings">Savings</option>
                                  <option value="Credit Card">Credit Card</option>
                                  <option value="Line of Credit">Line of Credit</option>
                                  <option value="Loan">Loan</option>
                                  <option value="Money Market">Money Market</option>
                                  <option value="Net-30">Net-30</option>
                                  <option value="Net-60">Net-60</option>
                                  <option value="Tradeline">Tradeline</option>
                                  <option value="Email">Email Hosting</option>
                                  <option value="Domain">Domain</option>
                                  <option value="Hosting">Web Hosting</option>
                                  <option value="WordPress">WordPress</option>
                                  <option value="Mailbox">Virtual Mailbox</option>
                                  <option value="Registered Agent">Registered Agent</option>
                                  <option value="SOS">Secretary of State</option>
                                  <option value="EIN">EIN / Tax ID</option>
                                  <option value="Insurance">Insurance</option>
                                  <option value="Other">Other</option>
                                </select>
                              ) : (
                                <p className="text-sm text-gray-900 dark:text-white mt-1">{account.category || "Other"}</p>
                              )}
                            </div>

                            {/* Type */}
                            <div>
                              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Account Type</label>
                              {editingAccountId === account.id ? (
                                <select
                                  value={account.type}
                                  onChange={(e) => handleUpdateAccount(account.id, { type: e.target.value as "business" | "personal" })}
                                  className="mt-1 w-full h-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-gray-900 dark:text-gray-50"
                                >
                                  <option value="business">Business</option>
                                  <option value="personal">Personal</option>
                                </select>
                              ) : (
                                <p className="text-sm text-gray-900 dark:text-white mt-1 capitalize">{account.type}</p>
                              )}
                            </div>

                            {/* Balance - Only show if relevant category */}
                            {["Checking", "Savings", "Credit Card", "Line of Credit", "Loan", "Money Market"].includes(account.category) && (
                              <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Balance / Limit</label>
                                {editingAccountId === account.id ? (
                                  <Input
                                    type="number"
                                    value={account.balance}
                                    onChange={(e) => handleUpdateAccount(account.id, { balance: parseFloat(e.target.value) || 0 })}
                                    className="mt-1"
                                  />
                                ) : (
                                  <p className={`text-sm mt-1 ${account.balance < 0 ? "text-red-600" : "text-gray-900 dark:text-white"}`}>
                                    ${Math.abs(account.balance).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                    {account.balance < 0 && " (Credit)"}
                                  </p>
                                )}
                              </div>
                            )}

                            {/* Notes - Only show if has value or editing */}
                            {(account.notes || editingAccountId === account.id) && (
                              <div className="md:col-span-2 lg:col-span-3">
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Notes</label>
                                {editingAccountId === account.id ? (
                                  <textarea
                                    value={account.notes || ""}
                                    onChange={(e) => handleUpdateAccount(account.id, { notes: e.target.value })}
                                    className="mt-1 w-full min-h-[80px] rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-gray-900 dark:text-gray-50"
                                    placeholder="Additional notes..."
                                  />
                                ) : (
                                  <p className="text-sm text-gray-900 dark:text-white mt-1 whitespace-pre-wrap">{account.notes}</p>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Edit Mode Actions */}
                          {editingAccountId === account.id && (
                            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingAccountId(null)}
                              >
                                Done Editing
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

// Wrapper with Suspense for useSearchParams
export default function BusinessPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <BusinessPageContent />
    </Suspense>
  )
}
