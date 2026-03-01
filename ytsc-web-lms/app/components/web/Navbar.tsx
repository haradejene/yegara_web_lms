'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { 
  Bars3Icon, 
  XMarkIcon,
  AcademicCapIcon 
} from '@heroicons/react/24/outline'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About YTSC' },
    { href: '/services', label: 'Services' },
    { href: '/courses', label: 'Courses' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Logo  */}
          <Link href="/" className="block group">
            <div className="relative w-14 h-14 md:w-16 md:h-16 overflow-hidden rounded-xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Image
                src="/YEGARA-06.png"
                alt="YEGARA TRADING SHARE COMPANY"
                fill
                className="object-contain p-2.5"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium text-sm tracking-wide transition-all duration-300 relative py-2 group ${
                  scrolled ? 'text-gray-700' : 'text-white'
                } ${
                  pathname === link.href ? 'text-[#dc2626]' : ''
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#dc2626] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                  pathname === link.href ? 'scale-x-100' : ''
                }`}></span>
              </Link>
            ))}
          </div>

          {/* LMS Button - Links directly to /lms */}
          <div className="hidden lg:block">
            <Link
              href="/lms"
              className="group relative inline-flex items-center gap-2.5 bg-[#dc2626] text-white px-6 py-3 rounded-lg font-semibold text-base overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#dc2626] to-[#b91c1c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-2.5">
                <AcademicCapIcon className="w-5 h-5" />
                Start Learning
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
              scrolled 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-3">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-5 py-3 transition-all duration-300 ${
                    pathname === link.href
                      ? 'bg-[#dc2626]/10 text-[#dc2626] font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="border-t border-gray-100 my-2"></div>
              
              {/* Mobile LMS Link */}
              <Link
                href="/lms"
                className="mx-5 my-3 bg-[#dc2626] text-white px-4 py-3 rounded-lg font-semibold text-center hover:bg-[#b91c1c] transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <AcademicCapIcon className="w-5 h-5" />
                Start Learning
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}