'use client'

import { useState } from 'react'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  ClockIcon, 
  ArrowRightIcon,
  SparklesIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

type ContactContent = {
  text: string
  className?: string
  href?: string
}

type ContactItem = {
  icon: React.ElementType
  title: string
  content: ContactContent[]
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Form submitted:', formData)
    
    setLoading(false)
    setSubmitted(true)
    
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ============ HERO SECTION ============ */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-gradient-to-br from-[#2563eb] to-[#1e40af]">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-[#dc2626]/10 rounded-full blur-3xl"></div>
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container-custom px-6 md:px-8 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/20 mb-8">
              <SparklesIcon className="w-5 h-5 text-[#dc2626]" />
              <span className="text-sm font-medium text-white tracking-wider">GET IN TOUCH</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white font-eina-bold leading-tight">
              Contact Us
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Get in touch with Yegara Trading Share Company
            </p>
          </div>
        </div>
      </section>

      {/* ============ CONTACT INFO & FORM ============ */}
      <section className="py-28 bg-gray-50">
        <div className="container-custom px-6 md:px-8 mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
            
            {/* Contact Info */}
            <div className="space-y-10">
              {/* Section header */}
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-[#2563eb] mb-4">Get in Touch</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We're here to help and answer any questions you might have. We look forward to hearing from you.
                </p>
              </div>

              {/* Contact Details Cards */}
              <div className="grid gap-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index} 
                      className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100"
                    >
                      <div className="flex items-start gap-5">
                        <div className="w-16 h-16 bg-[#2563eb]/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#dc2626] transition-colors duration-300">
                          <Icon className="w-8 h-8 text-[#2563eb] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[#2563eb] mb-3 group-hover:text-[#dc2626] transition-colors duration-300">
                            {item.title}
                          </h3>
                          <div className="text-gray-600 space-y-2">
                            {item.content.map((line, i) => (
                              <p key={i}>
                                {line.href ? (
                                  <a href={line.href} className={line.className}>
                                    {line.text}
                                  </a>
                                ) : (
                                  line.text
                                )}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Media Links */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-[#2563eb] mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-[#dc2626] hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                      aria-label={social.label}
                    >
                      <span className="text-2xl">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="bg-white rounded-3xl shadow-2xl p-10 lg:p-12 border border-gray-100">
                <h2 className="text-3xl lg:text-4xl font-bold text-[#2563eb] mb-2">Send us a Message</h2>
                <p className="text-gray-600 text-lg mb-10">We'll get back to you within 24 hours</p>
                
                {submitted ? (
                  <div className="bg-green-50 rounded-2xl p-12 text-center border border-green-200">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircleIcon className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-700 mb-3">Message Sent!</h3>
                    <p className="text-green-600 text-lg">
                      Thank you for reaching out. We'll get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-2">
                          Your Name <span className="text-[#dc2626]">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] transition-colors bg-gray-50 text-base"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
                          Email Address <span className="text-[#dc2626]">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] transition-colors bg-gray-50 text-base"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-base font-medium text-gray-700 mb-2">
                        Subject <span className="text-[#dc2626]">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] transition-colors bg-gray-50 text-base"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="membership">Membership Questions</option>
                        <option value="training">Training Programs</option>
                        <option value="partnership">Partnership Opportunities</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-base font-medium text-gray-700 mb-2">
                        Message <span className="text-[#dc2626]">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] transition-colors resize-none bg-gray-50 text-base"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#dc2626] text-white px-8 py-5 rounded-xl font-semibold text-lg hover:bg-[#b91c1c] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-1 hover:shadow-2xl shadow-lg"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-3">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </button>

                    <p className="text-sm text-gray-500 text-center mt-6">
                      By submitting this form, you agree to our{' '}
                      <Link href="/privacy" className="text-[#2563eb] hover:text-[#dc2626] transition-colors">
                        Privacy Policy
                      </Link>{' '}
                      and{' '}
                      <Link href="/terms" className="text-[#2563eb] hover:text-[#dc2626] transition-colors">
                        Terms of Service
                      </Link>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MAP SECTION ============ */}
      <section className="h-[600px] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.799708009091!2d38.763868!3d9.010794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85f5c5a5c5c5%3A0x5c5c5c5c5c5c5c5c!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1234567890"
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="YTSC Location"
        ></iframe>
        
        {/* Map Overlay Card */}
        <div className="absolute bottom-12 left-12 right-12 md:left-auto md:right-auto md:bottom-16 md:left-16 bg-white rounded-2xl shadow-2xl p-8 md:p-10 max-w-md border border-gray-100">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 bg-[#2563eb]/5 rounded-xl flex items-center justify-center shrink-0">
              <MapPinIcon className="w-8 h-8 text-[#2563eb]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#2563eb] mb-3">Visit Our Office</h3>
              <p className="text-gray-600 text-base mb-5 leading-relaxed">
                Bole Sub-city, Woreda 03<br />
                Addis Ababa, Ethiopia<br />
                P.O.Box: 1234
              </p>
              <a
                href="https://maps.google.com/?q=Bole+Addis+Ababa+Ethiopia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-[#dc2626] font-medium hover:text-[#b91c1c] transition-colors group text-base"
              >
                Get Directions
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section className="py-28 bg-gradient-to-br from-[#2563eb] to-[#1e40af] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-[#dc2626]/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[25rem] h-[25rem] bg-white/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="container-custom px-6 md:px-8 mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white font-eina-bold leading-tight">
            <span className="block mb-4">Ready to Get Started?</span>
            <span className="block text-3xl md:text-4xl lg:text-5xl font-amharic text-[#dc2626]">ዛሬውኑ ይመዝገቡ</span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-white/80">
            Join our community of shareholders and access exclusive training and resources
          </p>
          
          <Link 
            href="/register" 
            className="group inline-flex items-center gap-3 bg-[#dc2626] text-white px-10 py-5 rounded-xl font-semibold text-lg hover:bg-[#b91c1c] transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl"
          >
            Become a Shareholder
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}

const contactInfo: ContactItem[] = [
  {
    icon: MapPinIcon,
    title: 'Visit Us',
    content: [
      { text: 'Bole Sub-city, Woreda 03' },
      { text: 'Addis Ababa, Ethiopia' },
      { text: 'P.O.Box: 1234' }
    ]
  },
  {
    icon: PhoneIcon,
    title: 'Call Us',
    content: [
      { 
        text: '+251 (0) 111 234 567',
        className: 'hover:text-[#dc2626] transition-colors inline-block',
        href: 'tel:+251111234567'
      },
      { 
        text: '+251 (0) 911 234 567',
        className: 'hover:text-[#dc2626] transition-colors inline-block',
        href: 'tel:+251911234567'
      }
    ]
  },
  {
    icon: EnvelopeIcon,
    title: 'Email Us',
    content: [
      { 
        text: 'info@yegarasc.com',
        className: 'hover:text-[#dc2626] transition-colors inline-block',
        href: 'mailto:info@yegarasc.com'
      },
      { 
        text: 'support@yegarasc.com',
        className: 'hover:text-[#dc2626] transition-colors inline-block',
        href: 'mailto:support@yegarasc.com'
      }
    ]
  },
  {
    icon: ClockIcon,
    title: 'Working Hours',
    content: [
      { text: 'Monday - Friday: 8:30 AM - 5:30 PM' },
      { text: 'Saturday: 8:30 AM - 1:00 PM' },
      { text: 'Sunday: Closed' }
    ]
  }
]

const socialLinks = [
  { icon: '📘', href: 'https://facebook.com/yegarasc', label: 'Facebook' },
  { icon: '🐦', href: 'https://twitter.com/yegarasc', label: 'Twitter' },
  { icon: '📷', href: 'https://instagram.com/yegarasc', label: 'Instagram' },
  { icon: '🔗', href: 'https://linkedin.com/company/yegarasc', label: 'LinkedIn' },
  { icon: '▶️', href: 'https://youtube.com/yegarasc', label: 'YouTube' },
]