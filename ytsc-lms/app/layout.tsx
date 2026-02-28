import './globals.css'
import localFont from 'next/font/local'

const nokiaHeadline = localFont({
  src: [
    {
      path: '../public/FONTS/amharic font/nokiapureheadline_bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-heading',
})

const einaFont = localFont({
  src: [
    {
      path: '../public/FONTS/Eina/Eina03-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/FONTS/Eina/Eina03-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-body',
})

export const metadata = {
  title: 'Yegara Trading Share Company',
  description: 'Innovation. Trading. Growth.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${nokiaHeadline.variable} ${einaFont.variable}`}>
        {children}
      </body>
    </html>
  )
}