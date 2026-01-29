import { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/landing/navigation"
import { Footer } from "@/components/landing/footer"

export const metadata: Metadata = {
  title: "Terms of Service | Ascendant Group",
  description: "Terms of Service for Ascendant Group LLC - Terms and conditions governing the use of our consulting services.",
}

export default function TermsOfService() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
            <p className="text-gray-500 mb-8">Last Updated: January 28, 2026</p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
              <p className="text-sm text-blue-800">
                Please read these Terms of Service ("Terms," "Terms of Service") carefully before using the website and services operated by <strong>Ascendant Group LLC</strong> ("Company," "we," "us," or "our").
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing or using our website at theascensionco.us (the "Site") or engaging our consulting services, you agree to be bound by these Terms of Service and our Privacy Policy. If you disagree with any part of these terms, you may not access our Site or use our services.
            </p>
            <p className="text-gray-600 mb-4">
              These Terms constitute a legally binding agreement between you and Ascendant Group LLC. We reserve the right to modify these Terms at any time. Your continued use of the Site or services after any changes constitutes acceptance of the modified Terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Description of Services</h2>
            <p className="text-gray-600 mb-4">
              Ascendant Group LLC provides consulting services including, but not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li><strong>Privacy Protection Services:</strong> Consulting and guidance on protecting personal information, privacy strategies, and related documentation services</li>
              <li><strong>Business Formation Services:</strong> Guidance on business entity selection, formation documentation, compliance consultation, and ongoing business structuring advice</li>
              <li><strong>Credit Building Services:</strong> Business credit education, credit profile development strategies, vendor account guidance, and credit monitoring recommendations</li>
            </ul>
            <p className="text-gray-600 mb-4">
              Our services are consulting and educational in nature. We provide information, guidance, and strategic recommendations to help you achieve your goals.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Important Disclaimers</h2>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">3.1 Not Legal, Tax, or Financial Advice</h3>
            <p className="text-gray-600 mb-4">
              <strong>THE SERVICES PROVIDED BY ASCENDANT GROUP LLC ARE FOR INFORMATIONAL AND EDUCATIONAL PURPOSES ONLY AND DO NOT CONSTITUTE LEGAL, TAX, ACCOUNTING, OR FINANCIAL ADVICE.</strong> We are not attorneys, certified public accountants, licensed financial advisors, or credit repair organizations as defined under federal or state law.
            </p>
            <p className="text-gray-600 mb-4">
              You should consult with qualified legal, tax, and financial professionals before making decisions based on information we provide. We encourage you to seek independent professional advice tailored to your specific situation.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">3.2 No Guarantees</h3>
            <p className="text-gray-600 mb-4">
              We do not guarantee any specific results, outcomes, credit scores, business success, or financial benefits from using our services. Results vary based on individual circumstances, effort, market conditions, and numerous factors outside our control.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">3.3 Credit Services Disclaimer</h3>
            <p className="text-gray-600 mb-4">
              Our credit building services are educational consulting services. We do not:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Dispute items on your credit report on your behalf</li>
              <li>Guarantee removal of negative items from credit reports</li>
              <li>Promise specific credit score improvements</li>
              <li>Act as a credit repair organization under the Credit Repair Organizations Act (CROA)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. User Responsibilities</h2>
            <p className="text-gray-600 mb-4">By using our services, you agree to:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Provide accurate, current, and complete information as required</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Use our services only for lawful purposes and in compliance with all applicable laws</li>
              <li>Not misrepresent your identity or provide false information</li>
              <li>Not use our services to engage in fraudulent, deceptive, or illegal activities</li>
              <li>Not reproduce, duplicate, copy, sell, or exploit any portion of our services without express written permission</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Account Registration</h2>
            <p className="text-gray-600 mb-4">
              To access certain features of our services, you may be required to create an account. You must be at least 18 years of age to create an account. When creating an account, you agree to provide accurate and complete information and to update such information to keep it accurate and current.
            </p>
            <p className="text-gray-600 mb-4">
              You are responsible for safeguarding your password and for any activities or actions under your account. We reserve the right to suspend or terminate your account if any information provided proves to be inaccurate, not current, or incomplete.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Payment Terms</h2>
            <p className="text-gray-600 mb-4">
              Fees for our services are as quoted at the time of purchase or as stated in a separate service agreement. All payments are due as specified in your service agreement or at the time of purchase.
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Prices are in U.S. dollars unless otherwise stated</li>
              <li>We accept major credit cards and other payment methods as indicated</li>
              <li>Payment processing is handled by third-party payment processors</li>
              <li>You agree to pay all applicable taxes associated with your purchase</li>
              <li>Recurring services will be billed according to the billing cycle specified</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Refund Policy</h2>
            <p className="text-gray-600 mb-4">
              Due to the nature of consulting services, refunds are handled on a case-by-case basis. Generally:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Requests for refunds must be made within 7 days of purchase for services not yet rendered</li>
              <li>Services already rendered are non-refundable</li>
              <li>Digital products and downloadable materials are non-refundable once accessed</li>
              <li>Subscription services may be cancelled at any time; refunds for partial periods are not provided</li>
            </ul>
            <p className="text-gray-600 mb-4">
              To request a refund, contact us at support@theascensionco.us with your order details and reason for the request.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              The Site and its original content, features, and functionality are owned by Ascendant Group LLC and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p className="text-gray-600 mb-4">
              You may not copy, modify, distribute, sell, or lease any part of our services or included software, nor may you reverse engineer or attempt to extract the source code of that software, unless applicable laws prohibit these restrictions or you have our written permission.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. User Content</h2>
            <p className="text-gray-600 mb-4">
              You retain ownership of any content you submit through our services. By submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such content solely for the purpose of providing our services to you.
            </p>
            <p className="text-gray-600 mb-4">
              You represent and warrant that you own or have the necessary rights to any content you submit, and that such content does not violate the rights of any third party.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              <strong>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ASCENDANT GROUP LLC, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Your access to or use of (or inability to access or use) our services</li>
              <li>Any conduct or content of any third party on our services</li>
              <li>Any content obtained from our services</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              <li>Any decisions made or actions taken based on information provided through our services</li>
            </ul>
            <p className="text-gray-600 mb-4">
              <strong>OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR USE OF OUR SERVICES SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER.</strong>
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Disclaimer of Warranties</h2>
            <p className="text-gray-600 mb-4">
              <strong>OUR SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.</strong>
            </p>
            <p className="text-gray-600 mb-4">
              We do not warrant that the services will be uninterrupted, timely, secure, or error-free, or that any defects will be corrected. We make no warranty regarding the results that may be obtained from use of our services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">12. Indemnification</h2>
            <p className="text-gray-600 mb-4">
              You agree to defend, indemnify, and hold harmless Ascendant Group LLC and its officers, directors, employees, contractors, agents, licensors, and suppliers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of our services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">13. Governing Law and Jurisdiction</h2>
            <p className="text-gray-600 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the State of New Mexico, United States, without regard to its conflict of law provisions.
            </p>
            <p className="text-gray-600 mb-4">
              Any legal action or proceeding arising out of or relating to these Terms or your use of our services shall be brought exclusively in the state or federal courts located in Sierra County, New Mexico. You consent to the personal jurisdiction of such courts.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">14. Dispute Resolution</h2>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">14.1 Informal Resolution</h3>
            <p className="text-gray-600 mb-4">
              Before filing a formal legal claim, you agree to contact us at support@theascensionco.us to attempt to resolve any dispute informally. We will attempt to resolve the dispute by contacting you via email. If a dispute is not resolved within 30 days of submission, either party may proceed with formal dispute resolution.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">14.2 Arbitration Agreement</h3>
            <p className="text-gray-600 mb-4">
              <strong>PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS.</strong>
            </p>
            <p className="text-gray-600 mb-4">
              You and Ascendant Group LLC agree that any dispute, claim, or controversy arising out of or relating to these Terms or the breach, termination, enforcement, interpretation, or validity thereof, or to the use of our services, shall be resolved by binding individual arbitration rather than in court, except that either party may seek equitable relief in court for infringement or misuse of intellectual property rights.
            </p>
            <p className="text-gray-600 mb-4">
              <strong>YOU ACKNOWLEDGE THAT YOU ARE WAIVING YOUR RIGHT TO A TRIAL BY JURY AND TO PARTICIPATE IN A CLASS ACTION.</strong>
            </p>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">14.3 Class Action Waiver</h3>
            <p className="text-gray-600 mb-4">
              You agree that any arbitration or proceeding shall be limited to the dispute between us and you individually. To the fullest extent permitted by law: (a) no arbitration or proceeding shall be joined with any other; (b) there is no right or authority for any dispute to be arbitrated or resolved on a class action basis or to utilize class action procedures; and (c) there is no right or authority for any dispute to be brought in a purported representative capacity on behalf of the general public or any other persons.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">15. Termination</h2>
            <p className="text-gray-600 mb-4">
              We may terminate or suspend your account and access to our services immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms.
            </p>
            <p className="text-gray-600 mb-4">
              Upon termination, your right to use our services will cease immediately. If you wish to terminate your account, you may contact us at support@theascensionco.us.
            </p>
            <p className="text-gray-600 mb-4">
              All provisions of these Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">16. Severability</h2>
            <p className="text-gray-600 mb-4">
              If any provision of these Terms is held to be invalid, illegal, or unenforceable, such provision shall be modified to the minimum extent necessary to make it valid, legal, and enforceable. If such modification is not possible, the relevant provision shall be deemed deleted. Any modification or deletion of a provision shall not affect the validity and enforceability of the rest of these Terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">17. Entire Agreement</h2>
            <p className="text-gray-600 mb-4">
              These Terms, together with our Privacy Policy and any other agreements expressly incorporated by reference, constitute the entire agreement between you and Ascendant Group LLC concerning our services and supersede all prior and contemporaneous understandings, agreements, representations, and warranties.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">18. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please contact us:
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
                By using our website or services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
              <div className="mt-4">
                <Link href="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
                  View our Privacy Policy →
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
