"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import {
  FileCheck,
  Shield,
  AlertCircle,
  CheckCircle,
  CreditCard,
  Send,
  Info,
  ExternalLink,
} from "lucide-react"

interface FormData {
  firstName: string
  lastName: string
  ssn: string
  phone: string
  services: string[]
  emailDetails: string
  signature: string
  agreedToTerms: boolean
}

const serviceOptions = [
  { id: "register-irs", label: "Register my CPN with the IRS ($125 paid option)", price: 125 },
  { id: "email-verify", label: "Log into my Email and verify Account Registrations" },
  { id: "business-verify", label: "Verify my Business Build-out Records Submissions" },
  { id: "additional", label: "I allow an additional request if needed" },
]

export default function RegisterIRSPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    ssn: "",
    phone: "",
    services: [],
    emailDetails: "",
    signature: "",
    agreedToTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }))
  }

  const requiresEmailDetails = formData.services.includes("email-verify")
  const requiresPayment = formData.services.includes("register-irs")

  // Signature canvas handlers - with proper coordinate scaling
  const getCanvasCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { x, y } = getCanvasCoordinates(e, canvas)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { x, y } = getCanvasCoordinates(e, canvas)
    ctx.lineTo(x, y)
    ctx.strokeStyle = "#1e3a8a"
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas) {
      setFormData(prev => ({ ...prev, signature: canvas.toDataURL() }))
    }
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setFormData(prev => ({ ...prev, signature: "" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Send form data to support email
      const response = await fetch("/api/submit-poa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.ssn &&
    formData.phone &&
    formData.services.length > 0 &&
    formData.signature &&
    formData.agreedToTerms &&
    (!requiresEmailDetails || formData.emailDetails)

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
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <FileCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Register Number with IRS
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Complete the Specific Power of Attorney form to authorize IRS registration services.
          </p>
        </div>
        <a
          href="https://creditprivacynumber.com/how-to-register-cpn-with-irs/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline">
            Learn More
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </a>
      </motion.div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4"
      >
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800 dark:text-blue-300">
            <p className="font-medium mb-1">Important Information</p>
            <p>This form authorizes The Ascension Company to perform specific services on your behalf. Payment of $125 is required for IRS registration and will be collected after form submission.</p>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Specific Power of Attorney
            </CardTitle>
            <CardDescription>
              All fields are required. Your information is encrypted and secure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Social Security Number <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={formData.ssn}
                      onChange={(e) => setFormData(prev => ({ ...prev, ssn: e.target.value }))}
                      placeholder="XXX-XX-XXXX"
                      required
                    />
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Enter your SSN, not your CPN
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="(555) 555-5555"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Services Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Authorized Services</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Select the services you authorize:</p>
                <div className="space-y-3">
                  {serviceOptions.map((service) => (
                    <div
                      key={service.id}
                      className={`flex items-start space-x-3 p-4 rounded-lg border transition-colors cursor-pointer ${
                        formData.services.includes(service.id)
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                      onClick={() => handleServiceToggle(service.id)}
                    >
                      <Checkbox
                        checked={formData.services.includes(service.id)}
                        onCheckedChange={() => handleServiceToggle(service.id)}
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {service.label}
                        </span>
                        {service.price && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            ${service.price}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conditional Email Details */}
              {requiresEmailDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email Access Details</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Provider, Username, Password & Additional Details <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      value={formData.emailDetails}
                      onChange={(e) => setFormData(prev => ({ ...prev, emailDetails: e.target.value }))}
                      placeholder="Email provider: Gmail&#10;Username: example@gmail.com&#10;Password: ********&#10;Additional notes..."
                      rows={4}
                      required={requiresEmailDetails}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      This information is required to verify account registrations on your behalf.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Signature */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Electronic Signature</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sign below. This electronic signature holds the same validity as a handwritten signature.
                </p>
                <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={150}
                    className="w-full bg-white dark:bg-gray-800 cursor-crosshair touch-none"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                </div>
                <Button type="button" variant="outline" size="sm" onClick={clearSignature}>
                  Clear Signature
                </Button>
              </div>

              {/* Terms Agreement */}
              <div className="space-y-4">
                <div
                  className={`flex items-start space-x-3 p-4 rounded-lg border transition-colors cursor-pointer ${
                    formData.agreedToTerms
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, agreedToTerms: !prev.agreedToTerms }))}
                >
                  <Checkbox
                    checked={formData.agreedToTerms}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreedToTerms: checked as boolean }))}
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      I AGREE to the{" "}
                      <a href="/terms" className="text-blue-600 hover:underline" onClick={(e) => e.stopPropagation()}>
                        Terms of Use
                      </a>
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      By checking this box, I authorize The Ascension Company to perform the selected services on my behalf.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Status */}
              {submitStatus === "success" && (
                <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-300">
                  <CheckCircle className="h-5 w-5" />
                  <span>Form submitted successfully! Our team will contact you shortly.</span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300">
                  <AlertCircle className="h-5 w-5" />
                  <span>There was an error submitting the form. Please try again or contact support.</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">...</span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Authorization
                    </>
                  )}
                </Button>

                {requiresPayment && (
                  <a
                    href="https://theascensionco.gumroad.com/l/irs-registration"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      type="button"
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay $125 via Gumroad
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
