import type { Metadata } from "next"
import { ClerkProviderWrapper } from "@/components/clerk-provider-wrapper"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "The Ascension Company | Strategic Consulting Services",
  description: "Strategic consulting services for individuals and businesses. Privacy protection, business formation, and credit building solutions in Truth or Consequences, NM.",
  keywords: "consulting, business formation, privacy services, credit building, strategic planning, New Mexico",
  authors: [{ name: "The Ascension Company LLC" }],
  openGraph: {
    title: "The Ascension Company | Strategic Consulting Services",
    description: "Strategic consulting services for individuals and businesses.",
    url: "https://theascensionco.us",
    siteName: "The Ascension Company",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Ascension Company | Strategic Consulting Services",
    description: "Strategic consulting services for individuals and businesses.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ClerkProviderWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ClerkProviderWrapper>
      </body>
    </html>
  )
}
