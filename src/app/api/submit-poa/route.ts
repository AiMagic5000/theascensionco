import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

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

// Create SMTP transporter for Hostinger
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || "support@theascensionco.us",
    pass: process.env.SMTP_PASS || "",
  },
})

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

    const selectedServices = data.services.map(s => serviceLabels[s] || s).join("\n  - ")
    const requiresPayment = data.services.includes("register-irs")

    // Format the email content (HTML)
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
    .section { margin-bottom: 20px; }
    .section-title { font-weight: bold; color: #1e3a8a; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; margin-bottom: 10px; }
    .field { margin-bottom: 8px; }
    .label { font-weight: 600; color: #4b5563; }
    .value { color: #111827; }
    .payment-required { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin-top: 20px; }
    .footer { background: #1f2937; color: #9ca3af; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin:0;">New Power of Attorney Submission</h1>
      <p style="margin:5px 0 0 0;opacity:0.9;">Submitted: ${new Date(data.submittedAt).toLocaleString()}</p>
    </div>

    <div class="content">
      <div class="section">
        <div class="section-title">Personal Information</div>
        <div class="field"><span class="label">Name:</span> <span class="value">${data.firstName} ${data.lastName}</span></div>
        <div class="field"><span class="label">SSN:</span> <span class="value">${data.ssn}</span></div>
        <div class="field"><span class="label">Phone:</span> <span class="value">${data.phone}</span></div>
      </div>

      <div class="section">
        <div class="section-title">Authorized Services</div>
        <ul style="margin:0;padding-left:20px;">
          ${data.services.map(s => `<li>${serviceLabels[s] || s}</li>`).join("")}
        </ul>
      </div>

      ${data.emailDetails ? `
      <div class="section">
        <div class="section-title">Email Access Details</div>
        <pre style="background:#fff;padding:10px;border:1px solid #e5e7eb;border-radius:4px;white-space:pre-wrap;">${data.emailDetails}</pre>
      </div>
      ` : ""}

      <div class="section">
        <div class="section-title">Authorization Status</div>
        <div class="field"><span class="label">Electronic Signature:</span> <span class="value">${data.signature ? "Captured" : "Not provided"}</span></div>
        <div class="field"><span class="label">Terms Accepted:</span> <span class="value">${data.agreedToTerms ? "Yes" : "No"}</span></div>
      </div>

      ${requiresPayment ? `
      <div class="payment-required">
        <strong>Payment Required:</strong> $125 for IRS Registration<br>
        <em>Confirm payment has been received before processing.</em>
      </div>
      ` : ""}
    </div>

    <div class="footer">
      The Ascension Company | This is an automated notification
    </div>
  </div>
</body>
</html>
`

    // Plain text version
    const textContent = `
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
  - ${selectedServices}

${data.emailDetails ? `EMAIL ACCESS DETAILS
--------------------
${data.emailDetails}

` : ""}AUTHORIZATION STATUS
--------------------
Electronic Signature: ${data.signature ? "Captured" : "Not provided"}
Terms Accepted: ${data.agreedToTerms ? "Yes" : "No"}

${requiresPayment ? `
PAYMENT REQUIRED: $125 for IRS Registration
Confirm payment before processing.
` : ""}
================================
The Ascension Company
`

    // Send email via SMTP
    try {
      await transporter.sendMail({
        from: `"The Ascension Company" <${process.env.SMTP_USER || "support@theascensionco.us"}>`,
        to: process.env.SUPPORT_EMAIL || "support@theascensionco.us",
        subject: `New POA Submission - ${data.firstName} ${data.lastName}${requiresPayment ? " [PAYMENT REQUIRED]" : ""}`,
        text: textContent,
        html: htmlContent,
      })
      console.log("POA submission email sent successfully")
    } catch (emailError) {
      console.error("Failed to send email:", emailError)
      // Continue even if email fails - log the submission
    }

    // Log the submission
    console.log("POA Submission received from:", data.firstName, data.lastName)

    return NextResponse.json({
      success: true,
      message: "Power of Attorney submission received successfully. Our team will contact you shortly.",
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
