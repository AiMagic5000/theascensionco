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
            content: `You are a business document analyzer. Extract business information from uploaded documents and return structured data.

Your task is to analyze the provided documents and extract:
1. Company name
2. EIN (Tax ID) - format: XX-XXXXXXX
3. DUNS Number - format: XX-XXX-XXXX
4. State of Formation
5. Industry/Business Type
6. Any bank account information visible
7. Suggest which folder each document should be organized into (Legal Documents, Tax Documents, Contracts, Financial Statements, or suggest a new folder name)

Return your analysis as a JSON object with this exact structure:
{
  "companyName": "string or null",
  "ein": "string or null",
  "dunsNumber": "string or null",
  "stateOfFormation": "string or null",
  "industry": "string or null",
  "paydexScore": "number or null",
  "accounts": [
    {
      "name": "Account Name",
      "type": "business",
      "category": "Checking",
      "balance": 0,
      "institution": "Bank Name",
      "accountNumber": "****1234"
    }
  ],
  "suggestedFolders": [
    {
      "fileName": "document.pdf",
      "suggestedFolder": "Legal Documents"
    }
  ]
}

Only include fields where you have confident data from the documents. Use null for unknown values.`
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
