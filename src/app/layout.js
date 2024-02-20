import { Inter } from 'next/font/google'
import './globals.css'
import './style.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SwiftEMS',
  description: 'Uber app for ambulance',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
