import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'YTSC- Learning Management System',
  description: 'Learning Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Add proper preload attributes for fonts */}
        <link
          rel="preload"
          href="/_next/static/media/Eina03_Regular-s.p.b550ad43.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/Eina03_SemiBold-s.p.4995d6c5.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/nokiapureheadline_bold-s.p.638885c6.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}