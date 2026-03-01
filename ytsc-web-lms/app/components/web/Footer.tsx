import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-xl">YTSC</span>
              </div>
              <div>
                <span className="font-eina-bold text-secondary block leading-tight">
                  YEGARA TRADING
                </span>
                <span className="text-sm text-white/60 block leading-tight">
                  SHARE COMPANY
                </span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Empowering shareholders through innovative digital learning solutions and comprehensive training programs.
            </p>
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300 transform hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-secondary font-eina-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-white/70 hover:text-secondary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-secondary font-eina-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li key={index}>
                  <Link 
                    href={resource.href}
                    className="text-white/70 hover:text-secondary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    {resource.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-secondary font-eina-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">📍</span>
                <span className="text-white/70 text-sm">
                  Bole Sub-city, Woreda 03<br />
                  Addis Ababa, Ethiopia<br />
                  P.O.Box: 1234
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-secondary">📞</span>
                <div className="flex flex-col">
                  <a href="tel:+251111234567" className="text-white/70 hover:text-secondary transition-colors text-sm">
                    +251 (0) 111 234 567
                  </a>
                  <a href="tel:+251911234567" className="text-white/70 hover:text-secondary transition-colors text-sm">
                    +251 (0) 911 234 567
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-secondary">✉️</span>
                <div className="flex flex-col">
                  <a href="mailto:info@yegarasc.com" className="text-white/70 hover:text-secondary transition-colors text-sm">
                    info@yegarasc.com
                  </a>
                  <a href="mailto:support@yegarasc.com" className="text-white/70 hover:text-secondary transition-colors text-sm">
                    support@yegarasc.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-white/10">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-secondary font-eina-semibold text-lg mb-1">Stay Updated</h4>
              <p className="text-white/60 text-sm">Subscribe to our newsletter for updates and new courses</p>
            </div>
            <form className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-white/50 focus:outline-none focus:border-secondary transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-secondary text-primary font-semibold rounded-r-lg hover:bg-opacity-90 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-primary/80">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <div>
              © {new Date().getFullYear()} YEGARA TRADING SHARE COMPANY. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-secondary transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-secondary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Data arrays
const socialLinks = [
  { icon: '📘', href: 'https://facebook.com/yegarasc', label: 'Facebook' },
  { icon: '🐦', href: 'https://twitter.com/yegarasc', label: 'Twitter' },
  { icon: '📷', href: 'https://instagram.com/yegarasc', label: 'Instagram' },
  { icon: '🔗', href: 'https://linkedin.com/company/yegarasc', label: 'LinkedIn' },
  { icon: '▶️', href: 'https://youtube.com/yegarasc', label: 'YouTube' },
]

const quickLinks = [
  { href: '/about', label: 'About YTSC' },
  { href: '/services', label: 'Our Services' },
  { href: '/courses', label: 'Courses' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/careers', label: 'Careers' },
]

const resources = [
  { href: '/faq', label: 'FAQ' },
  { href: '/help', label: 'Help Center' },
  { href: '/blog', label: 'Blog' },
  { href: '/shareholders', label: 'Shareholder Portal' },
  { href: '/downloads', label: 'Downloads' },
]  