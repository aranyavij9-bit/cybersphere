import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Nunito, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ProfileProvider } from '@/lib/profile-context'
import { AppShell } from '@/components/app-shell'

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  axes: ['SOFT', 'opsz'],
})
const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'CyberSphere - Global Cyber Awareness & Threat Intelligence',
  description:
    'An enterprise-grade cybersecurity education and threat visualization command center. Learn to recognize phishing, scams, malware and more - awareness over offense.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#FBF8F5',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${nunito.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        <ProfileProvider>
          <AppShell>{children}</AppShell>
        </ProfileProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
