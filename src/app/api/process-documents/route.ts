import { NextRequest, NextResponse } from "next/server"

interface DocumentData {
  fileName: string
  content: string
  type: string
  base64?: string // For binary files like PDFs
}

// Determine MIME type from data URI or filename
function getMimeType(content: string, fileName: string): string {
  if (content.startsWith("data:")) {
    const match = content.match(/^data:([^;,]+)/)
    if (match) return match[1]
  }

  const ext = fileName.toLowerCase().split(".").pop()
  const mimeTypes: Record<string, string> = {
    pdf: "application/pdf",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xls: "application/vnd.ms-excel",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    txt: "text/plain",
    csv: "text/csv",
  }
  return mimeTypes[ext || ""] || "application/octet-stream"
}

// Upload file to Kimi and get file ID
async function uploadFileToKimi(base64Content: string, fileName: string, apiKey: string): Promise<string | null> {
  try {
    const base64Data = base64Content.includes(",")
      ? base64Content.split(",")[1]
      : base64Content

    const buffer = Buffer.from(base64Data, "base64")
    const mimeType = getMimeType(base64Content, fileName)

    const formData = new FormData()
    const blob = new Blob([buffer], { type: mimeType })
    formData.append("file", blob, fileName)
    formData.append("purpose", "file-extract")

    const response = await fetch("https://api.moonshot.ai/v1/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Kimi file upload error:", errorText)
      return null
    }

    const data = await response.json()
    return data.id
  } catch (error) {
    console.error("Error uploading file to Kimi:", error)
    return null
  }
}

// Get file content from Kimi
async function getFileContent(fileId: string, apiKey: string): Promise<string | null> {
  try {
    const response = await fetch(`https://api.moonshot.ai/v1/files/${fileId}/content`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })

    if (!response.ok) {
      console.error("Kimi file content error:", response.status)
      return null
    }

    return await response.text()
  } catch (error) {
    console.error("Error getting file content:", error)
    return null
  }
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
  }>
  suggestedFolders?: Array<{
    fileName: string
    suggestedFolder: string
  }>
}

function extractTextFromPdfBinary(base64Data: string): string {
  try {
    const buffer = Buffer.from(base64Data, "base64")
    const pdfContent = buffer.toString("binary")

    // Extract text streams from PDF
    const textParts: string[] = []

    // Look for text between BT (begin text) and ET (end text) markers
    const btEtRegex = /BT\s*([\s\S]*?)\s*ET/g
    let match

    while ((match = btEtRegex.exec(pdfContent)) !== null) {
      const textBlock = match[1]
      // Extract text from Tj and TJ operators
      const tjRegex = /\(([^)]*)\)\s*Tj/g
      let tjMatch
      while ((tjMatch = tjRegex.exec(textBlock)) !== null) {
        const text = tjMatch[1]
          .replace(/\\n/g, "\n")
          .replace(/\\r/g, "\r")
          .replace(/\\t/g, "\t")
          .replace(/\\\\/g, "\\")
          .replace(/\\'/g, "'")
        textParts.push(text)
      }

      // Also look for TJ arrays
      const tjArrayRegex = /\[(.*?)\]\s*TJ/g
      let tjArrayMatch
      while ((tjArrayMatch = tjArrayRegex.exec(textBlock)) !== null) {
        const arrayContent = tjArrayMatch[1]
        const stringRegex = /\(([^)]*)\)/g
        let stringMatch
        while ((stringMatch = stringRegex.exec(arrayContent)) !== null) {
          textParts.push(stringMatch[1])
        }
      }
    }

    // Also try to extract any readable ASCII text directly
    const asciiText = pdfContent
      .replace(/[^\x20-\x7E\n\r\t]/g, " ")
      .replace(/\s+/g, " ")
      .trim()

    // Filter for meaningful content
    const meaningfulWords = asciiText.match(
      /\b[A-Za-z]{3,}\b/g
    )

    let result = textParts.join(" ")

    // If we extracted very little from text streams, use ASCII extraction
    if (result.length < 100 && meaningfulWords && meaningfulWords.length > 20) {
      // Extract strings that look like business data
      const businessPatterns = [
        /\d{2}-\d{7}/g, // EIN pattern
        /\d{2}-\d{3}-\d{4}/g, // DUNS pattern
        /[A-Z][a-z]+\s+(?:LLC|Inc|Corp|Company|Co\.|Ltd)/gi, // Company names
        /\$[\d,]+\.?\d*/g, // Dollar amounts
        /Account\s*(?:Number|#|No\.?)?\s*[:\s]?\s*[\dX*]+/gi, // Account numbers
        /Bank\s+of\s+[A-Za-z]+|Chase|Wells\s*Fargo|Citi|Capital\s*One/gi, // Bank names
      ]

      const matches: string[] = []
      for (const pattern of businessPatterns) {
        const found = asciiText.match(pattern)
        if (found) {
          matches.push(...found)
        }
      }

      if (matches.length > 0) {
        result = `${result}\n\nAdditional extracted data: ${matches.join(", ")}`
      }
    }

    return result.trim()
  } catch (error) {
    console.error("PDF text extraction error:", error)
    return ""
  }
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

    // Process documents and extract text using Kimi file API
    const processedDocs: { fileName: string; type: string; content: string }[] = []

    for (const doc of documents) {
      let textContent = doc.content
      const ext = doc.fileName.toLowerCase().split(".").pop()
      const isUploadableFile = ext === "pdf" || ext === "xlsx" || ext === "xls" || ext === "doc" || ext === "docx"

      // Check if content is base64-encoded (from file upload)
      const isBase64 = doc.content?.startsWith("data:") || doc.base64

      if (isUploadableFile && (isBase64 || doc.base64)) {
        const base64Content = doc.content?.startsWith("data:") ? doc.content :
                             doc.base64 ? `data:application/pdf;base64,${doc.base64}` : null

        if (base64Content) {
          console.log(`Uploading ${ext} file to Kimi: ${doc.fileName}`)
          const fileId = await uploadFileToKimi(base64Content, doc.fileName, apiKey)
          if (fileId) {
            const fileContent = await getFileContent(fileId, apiKey)
            if (fileContent) {
              textContent = fileContent
              console.log(`Extracted ${textContent.length} characters from ${doc.fileName}`)
            }
          }
        }
      } else if (doc.type.includes("pdf") && doc.base64) {
        // Fallback to basic extraction if upload fails
        console.log(`Fallback extraction from PDF: ${doc.fileName}`)
        textContent = extractTextFromPdfBinary(doc.base64)
      }

      processedDocs.push({
        fileName: doc.fileName,
        type: doc.type,
        content: textContent,
      })
    }

    // Filter out documents with no meaningful content
    const validDocs = processedDocs.filter(
      (doc) => doc.content && doc.content.trim().length > 10
    )

    if (validDocs.length === 0) {
      console.log("No valid document content to process")
      return NextResponse.json({
        success: true,
        data: {},
        documentsProcessed: 0,
        message:
          "No readable text content found in documents. For best results, upload text files (.txt, .csv) containing business information.",
      })
    }

    // Prepare document summaries for AI processing
    const documentSummaries = validDocs
      .map((doc, index) => {
        // Increase content limit for better extraction
        const truncatedContent = doc.content.substring(0, 8000)
        return `=== Document ${index + 1}: ${doc.fileName} ===
${truncatedContent}
=== END Document ${index + 1} ===`
      })
      .join("\n\n")

    console.log(`Sending ${validDocs.length} documents to Kimi K2.5 API`)

    // Call Kimi K2.5 API (OpenAI-compatible format)
    const response = await fetch("https://api.moonshot.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "moonshot-v1-128k",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: `You are an expert business document analyzer. Your job is to extract EVERY piece of business and financial information from documents.

## EXTRACTION PRIORITY - ACCOUNTS ARE MOST IMPORTANT

**CRITICAL: You MUST extract ALL accounts mentioned in any document.** If you see ANY of these, create an account entry:
- Any bank name (Chase, Bank of America, Wells Fargo, Capital One, Citi, PNC, US Bank, TD Bank, Fifth Third, Regions, etc.)
- Any account type mention (checking, savings, business account, money market, CD, credit card, line of credit, loan, merchant account)
- Any account number pattern (even partial like ****1234 or ending in XXXX)
- Any credit card mention (Visa, Mastercard, Amex, Discover, store cards)
- Any business credit account (Net-30, Net-60, tradelines, vendor credit)
- Any loan (SBA, term loan, equipment financing, vehicle loan, mortgage)
- Email hosting accounts, domain registrations, business software subscriptions
- Virtual mailbox services (Anytime Mailbox, iPostal1, etc.)
- Registered agent services (with entity ID, jurisdiction)
- Secretary of State filings (SOS)
- EIN/Tax ID registrations
- WordPress/website logins
- Business insurance policies

## Company Information to Extract:
- Company/Business Name (legal name, DBA, trade names)
- EIN (Tax ID) - format: XX-XXXXXXX
- DUNS Number - format: XX-XXX-XXXX
- State of Formation/Incorporation
- Industry/Business Type
- PAYDEX Score (0-100)

## JSON Response Format:
{
  "companyName": "string or null",
  "ein": "string or null",
  "dunsNumber": "string or null",
  "stateOfFormation": "string or null",
  "industry": "string or null",
  "paydexScore": number or null,
  "accounts": [
    {
      "name": "Descriptive Account Name (e.g., 'Chase Business Checking', 'Hostinger Email', 'NM Registered Agent')",
      "type": "business",
      "category": "Checking|Savings|Credit Card|Line of Credit|Loan|Money Market|Net-30|Net-60|Tradeline|Email|Domain|Hosting|WordPress|Mailbox|Registered Agent|SOS|EIN|Insurance|Other",
      "balance": 0,
      "institution": "Bank or Company Name",
      "accountNumber": "****1234 or N/A",
      "url": "https://login-url.com or null",
      "username": "login username/email or null",
      "password": "password if visible or null",
      "address": "full street address or null",
      "city": "city or null",
      "state": "state abbreviation or null",
      "zip": "zip code or null",
      "entityId": "entity/filing ID or null",
      "jurisdiction": "state/jurisdiction or null",
      "agentName": "registered agent name or null",
      "phone": "phone number or null",
      "email": "email address or null",
      "notes": "any additional info or null"
    }
  ],
  "suggestedFolders": []
}

## IMPORTANT RULES:
1. Extract EVERY account you find - err on the side of including too many
2. If you see a bank name + any account reference = create an account entry
3. For spreadsheets/CSV data, extract EACH row as a separate account if applicable
4. Include email accounts (Google Workspace, Microsoft 365, Hostinger, etc.)
5. Include domain registrations as accounts
6. Include virtual office/mailbox services with full address
7. Include registered agent accounts with entity ID and jurisdiction
8. Include WordPress/website logins with URL, username, password
9. Include Secretary of State filings with login URL and entity ID
10. If balance is not specified, use 0
11. If a field is not found, use null (not empty string)
12. Return VALID JSON only - no markdown, no explanation text`,
          },
          {
            role: "user",
            content: `Extract ALL business information and EVERY account from these documents. Be thorough - if you see any bank, credit card, loan, or service account mentioned, include it:\n\n${documentSummaries}`,
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

    console.log("Extracted data:", JSON.stringify(extractedData, null, 2))

    return NextResponse.json({
      success: true,
      data: extractedData,
      documentsProcessed: validDocs.length,
    })
  } catch (error) {
    console.error("Document processing error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to process documents" },
      { status: 500 }
    )
  }
}
