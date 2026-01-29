import { NextRequest, NextResponse } from "next/server"

interface DocumentData {
  fileName: string
  content: string
  type: string
  base64?: string // For binary files like PDFs
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

    // Process documents and extract text
    const processedDocs = await Promise.all(
      documents.map(async (doc) => {
        let textContent = doc.content

        // If it's a PDF with base64 data, extract text
        if (doc.type.includes("pdf") && doc.base64) {
          console.log(`Extracting text from PDF: ${doc.fileName}`)
          textContent = extractTextFromPdfBinary(doc.base64)
          console.log(
            `Extracted ${textContent.length} characters from ${doc.fileName}`
          )
        }

        return {
          fileName: doc.fileName,
          type: doc.type,
          content: textContent,
        }
      })
    )

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
        // Truncate content to avoid token limits
        const truncatedContent = doc.content.substring(0, 5000)
        return `Document ${index + 1}: ${doc.fileName} (${doc.type})
Content:
${truncatedContent}
---`
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
        model: "moonshot-v1-32k",
        temperature: 0.3,
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

IMPORTANT: Be thorough. If you see ANY account numbers, bank names, or financial references, include them in the accounts array. Even partial information is valuable. Return valid JSON only.`,
          },
          {
            role: "user",
            content: `Please analyze these business documents and extract relevant information:\n\n${documentSummaries}`,
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
