import { NextRequest, NextResponse } from "next/server"

interface POASubmission {
  firstName: string
  lastName: string
  ssn: string
  phone: string
  services: string[]
  emailDetails: string
  signature: string
  agreedToTerms: boolean
  submittedAt: string
}

export async function POST(request: NextRequest) {
  try {
    const data: POASubmission = await request.json()

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.ssn || !data.phone || !data.agreedToTerms) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Map service IDs to readable names
    const serviceLabels: Record<string, string> = {
      "register-irs": "Register CPN with IRS ($125)",
      "email-verify": "Email Account Verification",
      "business-verify": "Business Build-out Verification",
      "additional": "Additional Requests Allowed",
    }

    const selectedServices = data.services.map(s => serviceLabels[s] || s).join(", ")
    const requiresPayment = data.services.includes("register-irs")

    // Format the email content
    const emailContent = `
NEW POWER OF ATTORNEY SUBMISSION
================================

Submitted: ${new Date(data.submittedAt).toLocaleString()}

PERSONAL INFORMATION
--------------------
Name: ${data.firstName} ${data.lastName}
SSN: ${data.ssn}
Phone: ${data.phone}

AUTHORIZED SERVICES
-------------------
${selectedServices}

${data.emailDetails ? `EMAIL ACCESS DETAILS
--------------------
${data.emailDetails}

` : ""}PAYMENT STATUS
--------------
${requiresPayment ? "PAYMENT REQUIRED: $125 for IRS Registration" : "No payment required"}

SIGNATURE
---------
Electronic signature captured: ${data.signature ? "Yes" : "No"}

TERMS ACCEPTED: ${data.agreedToTerms ? "Yes" : "No"}

================================
This submission requires follow-up.
${requiresPayment ? "Confirm payment before processing IRS registration." : ""}
`

    // Log the submission (in production, this would send an email)
    console.log("POA Submission received:")
    console.log(emailContent)

    // In production, integrate with email service here
    // Options: SendGrid, Resend, AWS SES, or SMTP
    // Example with environment variables:
    // await sendEmail({
    //   to: process.env.SUPPORT_EMAIL || "support@theascensionco.us",
    //   subject: `New POA Submission - ${data.firstName} ${data.lastName}`,
    //   body: emailContent,
    // })

    // For now, we'll store the submission info
    // In production, save to database as well

    return NextResponse.json({
      success: true,
      message: "Power of Attorney submission received successfully",
      requiresPayment,
    })

  } catch (error) {
    console.error("Error processing POA submission:", error)
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    )
  }
}
