import { NextRequest, NextResponse } from "next/server"

interface DocumentData {
  fileName: string
  content: string
  type: string
}

interface ExtractedBusinessInfo {
  companyName?: string
  ein?: string
  dunsNumber?: string
  stateOfFormation?: string
  industry?: string
  paydexScore?: number
  accounts?: Array<{
    name: string
    type: "business" | "personal"
    category: string
    balance: number
    institution: string
    accountNumber: string
  }>
  suggestedFolders?: Array<{
    fileName: string
    suggestedFolder: string
  }>
}

export async function POST(request: NextRequest) {
  try {
    const { documents }: { documents: DocumentData[] } = await request.json()

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

    // Prepare document summaries for AI processing
    const documentSummaries = documents.map((doc, index) => {
      // Truncate content to avoid token limits
      const truncatedContent = doc.content.substring(0, 3000)
      return `Document ${index + 1}: ${doc.fileName} (${doc.type})
Content Preview:
${truncatedContent}
---`
    }).join("\n\n")

    // Call Kimi K2.5 API (OpenAI-compatible format)
    const response = await fetch("https://api.moonshot.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "kimi-k2.5-preview",
        temperature: 0.6,
        messages: [
          {
            role: "system",
            content: `You are a business document analyzer specializing in extracting structured business data. Analyze uploaded documents thoroughly to extract ALL business information.

CRITICAL: Extract EVERY piece of business data you can find, including:

1. **Company Information:**
   - Company/Business Name (legal name, DBA, trade names)
   - EIN (Tax ID) - format: XX-XXXXXXX
   - DUNS Number - format: XX-XXX-XXXX
   - State of Formation/Incorporation
   - Business Address
   - Industry/Business Type
   - Date of Formation

2. **Financial Accounts (IMPORTANT - Extract ALL):**
   Look for ANY mention of bank accounts, credit lines, loans, or financial institutions:
   - Bank account names and numbers (mask as ****1234)
   - Account types: Checking, Savings, Money Market, Line of Credit, Credit Card, Loan
   - Bank/Institution names (Chase, Bank of America, Wells Fargo, etc.)
   - Account balances (if visible)
   - Credit limits
   - Business vs Personal designation

3. **Credit Information:**
   - PAYDEX Score (0-100)
   - Business credit scores
   - Trade references
   - Payment history mentions

4. **Document Organization:**
   Suggest folders: Legal Documents, Tax Documents, Contracts, Financial Statements, Bank Statements, Credit Reports, Licenses & Permits, Insurance, or create new relevant folders.

Return JSON with this structure:
{
  "companyName": "string or null",
  "ein": "string or null",
  "dunsNumber": "string or null",
  "stateOfFormation": "string or null",
  "industry": "string or null",
  "paydexScore": "number 0-100 or null",
  "accounts": [
    {
      "name": "Descriptive Account Name",
      "type": "business",
      "category": "Checking|Savings|Credit Card|Line of Credit|Loan|Money Market",
      "balance": 0,
      "institution": "Bank Name",
      "accountNumber": "****1234"
    }
  ],
  "suggestedFolders": [
    {
      "fileName": "document.pdf",
      "suggestedFolder": "Folder Name"
    }
  ]
}

IMPORTANT: Be thorough. If you see ANY account numbers, bank names, or financial references, include them in the accounts array. Even partial information is valuable.`
          },
          {
            role: "user",
            content: `Please analyze these business documents and extract relevant information:\n\n${documentSummaries}`
          }
        ],
        response_format: { type: "json_object" }
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

    let extractedData: ExtractedBusinessInfo
    try {
      extractedData = JSON.parse(content)
    } catch {
      console.error("Failed to parse AI response:", content)
      return NextResponse.json(
        { success: false, error: "Invalid AI response format" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: extractedData,
      documentsProcessed: documents.length,
    })

  } catch (error) {
    console.error("Document processing error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to process documents" },
      { status: 500 }
    )
  }
}
