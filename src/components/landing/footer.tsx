import Link from "next/link"
import Image from "next/image"

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
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Ascendant Group"
                width={180}
                height={45}
                className="h-11 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Privacy ~ Business ~ Growth. Strategic consulting services for individuals and businesses.
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
              &copy; {new Date().getFullYear()} Ascendant Group. All rights reserved.
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
