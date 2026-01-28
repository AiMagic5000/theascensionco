import Link from "next/link"

const footerLinks = {
  services: [
    { label: "Privacy Protection", href: "#packages" },
    { label: "Business Formation", href: "#packages" },
    { label: "Credit Enhancement", href: "#packages" },
    { label: "Strategic Consulting", href: "#services" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  resources: [
    { label: "Client Dashboard", href: "/dashboard" },
    { label: "FAQs", href: "/faq" },
    { label: "Blog", href: "/blog" },
    { label: "Support", href: "#contact" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AC</span>
              </div>
              <span className="font-semibold text-lg">The Ascension Company</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Strategic consulting services for individuals and businesses.
              Building financial foundations with expert guidance.
            </p>
            <div className="text-sm text-gray-400">
              <p>2585 S Broadway St, Unit #136</p>
              <p>Truth or Consequences, NM 87901</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} The Ascension Company LLC. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="tel:8888688069" className="text-gray-400 hover:text-white text-sm">
                (888) 868-8069
              </a>
              <a href="mailto:support@theascensionco.us" className="text-gray-400 hover:text-white text-sm">
                support@theascensionco.us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
