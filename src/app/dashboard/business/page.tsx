"use client"

import { useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  ChevronDown,
  Search,
  Grid,
  List,
  MoreVertical,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
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

export default function BusinessPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "documents">("profile")
  const [businessProfile, setBusinessProfile] = useState(initialBusinessProfile)
  const [accounts, setAccounts] = useState(initialAccounts)
  const [editingProfile, setEditingProfile] = useState(false)
  const [showAddAccount, setShowAddAccount] = useState(false)
  const [accountFilter, setAccountFilter] = useState<"all" | "business" | "personal">("all")

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
    uploadedFiles.forEach((file) => {
      const newFile: FileItem = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedAt: new Date(),
        folderId: currentFolder,
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
          setFiles((prev) =>
            prev.map((f) => (f.id === newFile.id ? { ...f, status: "ready" } : f))
          )
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

  const handleFolderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || [])
    if (uploadedFiles.length > 0) {
      setShowAiUpload(true)
      // Handle bulk folder upload with AI processing option
      handleFileUpload(uploadedFiles)
    }
  }

  const handleDeleteFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: FolderItem = {
        id: Date.now().toString(),
        name: newFolderName.trim(),
        parentId: currentFolder,
        createdAt: new Date(),
      }
      setFolders((prev) => [...prev, newFolder])
      setNewFolderName("")
      setShowNewFolderModal(false)
    }
  }

  const handleDeleteFolder = (folderId: string) => {
    // Delete folder and all files in it
    setFolders((prev) => prev.filter((f) => f.id !== folderId))
    setFiles((prev) => prev.filter((f) => f.folderId !== folderId))
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

  const handleAddAccount = () => {
    const account: Account = {
      id: Date.now().toString(),
      ...newAccount,
    }
    setAccounts([...accounts, account])
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

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter((a) => a.id !== id))
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
                <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </Button>
                <Button size="sm" onClick={() => folderInputRef.current?.click()} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Upload Repository
                </Button>
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
                  // @ts-ignore - webkitdirectory is not in types
                  webkitdirectory=""
                  className="hidden"
                  onChange={handleFolderUpload}
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
                                  <Button variant="ghost" size="icon">
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
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setShowPreview(false)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 h-[70vh] overflow-auto bg-gray-100 dark:bg-gray-800">
                    {selectedFile.type.includes("pdf") ? (
                      <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <FileText className="h-24 w-24 mb-4 text-red-400" />
                        <p className="text-lg font-medium mb-2">PDF Preview</p>
                        <p className="text-sm text-gray-400 mb-4">
                          {selectedFile.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          Full PDF viewer would be integrated here using a library like react-pdf
                        </p>
                      </div>
                    ) : selectedFile.type.includes("word") || selectedFile.type.includes("doc") ? (
                      <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <FileText className="h-24 w-24 mb-4 text-blue-400" />
                        <p className="text-lg font-medium mb-2">Word Document Preview</p>
                        <p className="text-sm text-gray-400 mb-4">
                          {selectedFile.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          Word documents can be previewed using Microsoft Office Online or converted to PDF
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <File className="h-24 w-24 mb-4 text-gray-400" />
                        <p className="text-lg font-medium mb-2">File Preview</p>
                        <p className="text-sm text-gray-400">
                          Preview not available for this file type
                        </p>
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
                onClick={() => setShowAiUpload(false)}
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
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Document Processing</h3>
                      <p className="text-sm text-gray-500">Automatically extract and organize data</p>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Extract company information from documents</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Auto-categorize files into folders</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Populate business profile automatically</span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowAiUpload(false)}>Skip AI Processing</Button>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600" onClick={() => setShowAiUpload(false)}>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Process with AI
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <>
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
                  <Button onClick={() => setEditingProfile(false)}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
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
              <Button onClick={() => setShowAddAccount(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Account
              </Button>
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
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{account.name}</p>
                        <p className="text-sm text-gray-500">{account.institution} - {account.accountNumber}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`font-medium ${account.balance < 0 ? "text-red-600" : "text-gray-900 dark:text-white"}`}>
                          ${Math.abs(account.balance).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                          {account.balance < 0 && " CR"}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteAccount(account.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
