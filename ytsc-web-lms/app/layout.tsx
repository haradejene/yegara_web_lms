import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Inter } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '@/app/components/ConditionalLayout'

// Load Eina fonts
const einaRegular = localFont({
  src: '../public/FONTS/Eina/Eina03-Regular.ttf',
  variable: '--font-eina-regular',
  display: 'swap',
})

const einaBold = localFont({
  src: '../public/FONTS/Eina/Eina03-Bold.ttf',
  variable: '--font-eina-bold',
  display: 'swap',
})

const einaSemiBold = localFont({
  src: '../public/FONTS/Eina/Eina03-SemiBold.ttf',
  variable: '--font-eina-semibold',
  display: 'swap',
})

// Load Nokia Amharic font
const nokiaAmharic = localFont({
  src: [
    {
      path: '../public/FONTS/amharic font/nokiapureheadline_regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/FONTS/amharic font/nokiapureheadline_bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/FONTS/amharic font/nokiapureheadline_light.otf',
      weight: '300',
      style: 'normal',
    },
  ],
  variable: '--font-nokia-amharic',
  display: 'swap',
})

// Load Montserrat for English text
const montserrat = localFont({
  src: [
    {
      path: '../public/FONTS/english word/Montserrat-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/FONTS/english word/Montserrat-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/FONTS/english word/Montserrat-Light.ttf',
      weight: '300',
      style: 'normal',
    },
  ],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'YEGARA TRADING SHARE COMPANY - Empowering Shareholders Through Digital Learning',
  description: 'Join Yegara Trading Share Company\'s digital transformation. Access training, resources, and courses designed for our shareholders and members.',
  keywords: 'Yegara, YTSC, trading, share company, Ethiopia, digital learning, LMS, shareholder training',
  authors: [{ name: 'Yegara Trading Share Company' }],
  openGraph: {
    title: 'YEGARA TRADING SHARE COMPANY',
    description: 'Empowering Shareholders Through Digital Learning',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      data-scroll-behavior="smooth"
      className={`
        ${einaRegular.variable} 
        ${einaBold.variable} 
        ${einaSemiBold.variable} 
        ${nokiaAmharic.variable} 
        ${montserrat.variable}
      `}
    >
      <head>
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
      <body>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}