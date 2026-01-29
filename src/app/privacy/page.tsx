import { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/landing/navigation"
import { Footer } from "@/components/landing/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | Ascendant Group",
  description: "Privacy Policy for Ascendant Group LLC - How we collect, use, and protect your personal information.",
}

export default function PrivacyPolicy() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-500 mb-8">Last Updated: January 28, 2026</p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
              <p className="text-sm text-blue-800">
                <strong>Ascendant Group LLC</strong> ("Company," "we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">1.1 Personal Information You Provide</h3>
            <p className="text-gray-600 mb-4">We may collect personal information that you voluntarily provide when you:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Create an account or register for our services</li>
              <li>Request a consultation or quote</li>
              <li>Subscribe to our newsletter or marketing communications</li>
              <li>Contact us through our website, email, or phone</li>
              <li>Engage our privacy protection, business formation, or credit building services</li>
            </ul>
            <p className="text-gray-600 mb-4">This information may include:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Full legal name and any aliases</li>
              <li>Email address and phone number</li>
              <li>Mailing address and billing address</li>
              <li>Date of birth and Social Security Number (where legally required for services)</li>
              <li>Business information (EIN, business name, formation documents)</li>
              <li>Financial information for credit building services</li>
              <li>Payment information (processed securely through third-party processors)</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">1.2 Information Automatically Collected</h3>
            <p className="text-gray-600 mb-4">When you access our website, we may automatically collect:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Device information (browser type, operating system, device identifiers)</li>
              <li>IP address and approximate geographic location</li>
              <li>Pages visited, time spent, and navigation patterns</li>
              <li>Referring website or source</li>
              <li>Cookies and similar tracking technologies (see Section 5)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Provide, maintain, and improve our consulting services</li>
              <li>Process transactions and send related information</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send administrative information, updates, and service-related notices</li>
              <li>Personalize your experience and deliver relevant content</li>
              <li>Comply with legal obligations and regulatory requirements</li>
              <li>Protect against fraudulent, unauthorized, or illegal activity</li>
              <li>Enforce our Terms of Service and other agreements</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. How We Share Your Information</h2>
            <p className="text-gray-600 mb-4">We may share your information in the following circumstances:</p>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">3.1 Service Providers</h3>
            <p className="text-gray-600 mb-4">
              We may share information with third-party vendors who perform services on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance. These providers are contractually obligated to protect your information.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">3.2 Business Transfers</h3>
            <p className="text-gray-600 mb-4">
              In the event of a merger, acquisition, bankruptcy, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any change in ownership or uses of your personal information.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">3.3 Legal Requirements</h3>
            <p className="text-gray-600 mb-4">
              We may disclose your information if required by law, regulation, legal process, or governmental request, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">3.4 With Your Consent</h3>
            <p className="text-gray-600 mb-4">
              We may share your information for other purposes with your explicit consent.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Data Retention</h2>
            <p className="text-gray-600 mb-4">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When determining retention periods, we consider:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>The nature and sensitivity of the information</li>
              <li>The purposes for which we process the information</li>
              <li>Applicable legal, regulatory, tax, accounting, or other requirements</li>
              <li>Whether we have an ongoing business relationship with you</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="text-gray-600 mb-4">
              We use cookies and similar tracking technologies to collect and track information about your browsing activities. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
            <p className="text-gray-600 mb-4">Types of cookies we use:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Your Privacy Rights</h2>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">6.1 California Residents (CCPA/CPRA)</h3>
            <p className="text-gray-600 mb-4">
              If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA):
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li><strong>Right to Know:</strong> Request information about the categories and specific pieces of personal information we have collected</li>
              <li><strong>Right to Delete:</strong> Request deletion of your personal information, subject to certain exceptions</li>
              <li><strong>Right to Correct:</strong> Request correction of inaccurate personal information</li>
              <li><strong>Right to Opt-Out:</strong> Opt out of the sale or sharing of your personal information</li>
              <li><strong>Right to Non-Discrimination:</strong> Not be discriminated against for exercising your privacy rights</li>
              <li><strong>Right to Limit:</strong> Limit the use and disclosure of sensitive personal information</li>
            </ul>
            <p className="text-gray-600 mb-4">
              We do not sell personal information as defined under the CCPA/CPRA. To exercise your rights, contact us at support@theascensionco.us or call (888) 868-8069.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">6.2 Virginia, Colorado, Connecticut, and Utah Residents</h3>
            <p className="text-gray-600 mb-4">
              If you reside in Virginia (VCDPA), Colorado (CPA), Connecticut (CTDPA), or Utah (UCPA), you may have similar rights including access, correction, deletion, data portability, and the right to opt out of targeted advertising and profiling. Contact us to exercise these rights.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">6.3 All Users</h3>
            <p className="text-gray-600 mb-4">Regardless of your location, you may:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Access and update your account information through your dashboard</li>
              <li>Opt out of marketing communications by clicking "unsubscribe" in emails</li>
              <li>Request a copy of your personal data</li>
              <li>Request deletion of your account (subject to legal retention requirements)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Encryption of data in transit (TLS/SSL) and at rest</li>
              <li>Secure authentication mechanisms</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Access controls limiting employee access to personal information</li>
              <li>Employee training on data protection and security practices</li>
            </ul>
            <p className="text-gray-600 mb-4">
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Third-Party Links</h2>
            <p className="text-gray-600 mb-4">
              Our website may contain links to third-party websites or services not operated by us. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-600 mb-4">
              Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. International Data Transfers</h2>
            <p className="text-gray-600 mb-4">
              Our services are primarily offered within the United States. If you access our services from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States where our servers are located and our central database is operated.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-600 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">12. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <p className="text-gray-700 mb-2"><strong>Ascendant Group LLC</strong></p>
              <p className="text-gray-600 mb-1">2585 S Broadway St, Unit #136</p>
              <p className="text-gray-600 mb-1">Truth or Consequences, NM 87901</p>
              <p className="text-gray-600 mb-1">Email: support@theascensionco.us</p>
              <p className="text-gray-600">Phone: (888) 868-8069</p>
            </div>

            <div className="border-t border-gray-200 pt-8 mt-8">
              <p className="text-sm text-gray-500">
                By using our website or services, you acknowledge that you have read and understood this Privacy Policy.
              </p>
              <div className="mt-4">
                <Link href="/terms" className="text-blue-600 hover:text-blue-800 font-medium">
                  View our Terms of Service →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
