'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/app/components/web/Navbar'
import Footer from '@/app/components/web/Footer'
import LMSTopBar from '@/app/components/lms/Navbar'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLMSRoute = pathname?.startsWith('/lms') || pathname?.startsWith('/dashboard') || pathname?.startsWith('/courses/[id]')

  if (isLMSRoute) {
    return (
      <>
        <LMSTopBar />
        <main className="min-h-screen bg-gray-50 pt-16">
          {children}
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}