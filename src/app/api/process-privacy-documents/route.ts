import { NextRequest, NextResponse } from "next/server"

interface DocumentData {
  fileName: string
  content: string
  type: string
}

interface ExtractedPrivacyInfo {
  fullName?: string
  dateOfBirth?: string
  ssn?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  phone?: string
  email?: string
  privacyNumber?: string
  privacyNumberIssueDate?: string
  privacyNumberStatus?: string
  creditScore?: number
  creditBureau?: string
  creditReportDate?: string
  publicRecordsCount?: number
  publicRecordsStatus?: string
  tradelines?: Array<{
    creditor: string
    accountNumber: string
    creditLimit: number
    balance: number
    paymentStatus: string
    dateOpened: string
    age: string
  }>
  bankAccounts?: Array<{
    bankName: string
    accountType: string
    accountNumber: string
    balance?: number
  }>
  notes?: string
}

export async function POST(request: NextRequest) {
  try {
    const { documents, type }: { documents: DocumentData[]; type: "privacy" | "publicRecords" } = await request.json()

    if (!documents || documents.length === 0) {
      return NextResponse.json(
        { success: false, error: "No documents provided" },
        { status: 400 }
      )
    }

    const apiKey = process.env.KIMI_API_KEY

    if (!apiKey) {
      console.error("KIMI_API_KEY not configured")
      return NextResponse.json(
        { success: false, error: "AI processing not configured" },
        { status: 500 }
      )
    }

    // Filter documents with content
    const validDocs = documents.filter(
      (doc) => doc.content && doc.content.trim().length > 10
    )

    if (validDocs.length === 0) {
      return NextResponse.json({
        success: true,
        data: {},
        documentsProcessed: 0,
        message: "No readable text content found in documents.",
      })
    }

    // Prepare document summaries for AI processing
    const documentSummaries = validDocs
      .map((doc, index) => {
        const truncatedContent = doc.content.substring(0, 8000)
        return `=== Document ${index + 1}: ${doc.fileName} ===
${truncatedContent}
=== END Document ${index + 1} ===`
      })
      .join("\n\n")

    const systemPrompt = type === "privacy"
      ? `You are an expert privacy document analyzer. Extract ALL personal and privacy-related information from documents.

## Information to Extract:
- Full Name (first and last name combined)
- Date of Birth (format: YYYY-MM-DD or MM/DD/YYYY)
- Social Security Number (SSN) - format: XXX-XX-XXXX
- Address (street address)
- City, State, ZIP
- Phone Number
- Email Address
- Privacy Number/CPN (Credit Privacy Number) - format: XXX-XX-XXXX
- Privacy Number Issue Date
- Privacy Number Status (Active, Pending, Expired, etc.)
- Credit Score (number 300-850)
- Credit Bureau (Equifax, Experian, TransUnion)
- Credit Report Date
- Tradelines (credit accounts with creditor, account number, credit limit, balance, payment status, date opened, age)
- Bank Accounts (bank name, account type, account number, balance)
- Any notes or additional information

## JSON Response Format:
{
  "fullName": "string or null",
  "dateOfBirth": "string or null",
  "ssn": "string or null",
  "address": "string or null",
  "city": "string or null",
  "state": "string or null",
  "zip": "string or null",
  "phone": "string or null",
  "email": "string or null",
  "privacyNumber": "string or null",
  "privacyNumberIssueDate": "string or null",
  "privacyNumberStatus": "string or null",
  "creditScore": number or null,
  "creditBureau": "string or null",
  "creditReportDate": "string or null",
  "tradelines": [],
  "bankAccounts": [],
  "notes": "string or null"
}

Return VALID JSON only - no markdown, no explanation text.`
      : `You are an expert public records document analyzer. Extract ALL public records information from documents.

## Information to Extract:
- Public Records Count (total number of records found)
- Public Records Status (Clear, Items Found, Pending Review, etc.)
- Court Records (case numbers, dates, types, dispositions)
- Liens (tax liens, mechanic liens, judgment liens)
- Judgments (civil judgments, monetary amounts)
- Bankruptcies (chapter, date filed, date discharged, status)
- Any other official public filings
- Notes about the records

## JSON Response Format:
{
  "publicRecordsCount": number or null,
  "publicRecordsStatus": "string or null",
  "notes": "string containing details about records found or null"
}

Return VALID JSON only - no markdown, no explanation text.`

    console.log(`Sending ${validDocs.length} ${type} documents to Kimi API`)

    const response = await fetch("https://api.moonshot.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "moonshot-v1-32k",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: `Extract ALL ${type === "privacy" ? "privacy and personal" : "public records"} information from these documents:\n\n${documentSummaries}`,
          },
        ],
        response_format: { type: "json_object" },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Kimi API error:", errorText)
      return NextResponse.json(
        { success: false, error: "AI processing failed" },
        { status: 500 }
      )
    }

    const aiResponse = await response.json()
    const content = aiResponse.choices?.[0]?.message?.content

    if (!content) {
      return NextResponse.json(
        { success: false, error: "No response from AI" },
        { status: 500 }
      )
    }

    console.log("AI Response received:", content.substring(0, 500))

    let extractedData: ExtractedPrivacyInfo
    try {
      extractedData = JSON.parse(content)
    } catch {
      console.error("Failed to parse AI response:", content)
      return NextResponse.json(
        { success: false, error: "Invalid AI response format" },
        { status: 500 }
      )
    }

    console.log("Extracted privacy data:", JSON.stringify(extractedData, null, 2))

    return NextResponse.json({
      success: true,
      data: extractedData,
      documentsProcessed: validDocs.length,
    })
  } catch (error) {
    console.error("Privacy document processing error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to process documents" },
      { status: 500 }
    )
  }
}
