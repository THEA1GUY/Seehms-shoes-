import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import { SplashCursor } from "@/components/SplashCursor"
import { Providers } from "@/components/Providers"
import { Footer } from "@/components/footer"

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
  weight: ["400", "600", "700"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: {
    default: "Seehms Shoes - Premium Footwear in Nigeria",
    template: "%s | Seehms Shoes"
  },
  description:
    "Nigeria's premier destination for quality footwear. Shop authentic sneakers, boots, running shoes, and more from top brands. Fast delivery across Nigeria.",
  keywords: ["shoes Nigeria", "sneakers Lagos", "buy shoes online Nigeria", "footwear", "Nike", "Adidas", "running shoes", "boots"],
  authors: [{ name: "Seehms Shoes" }],
  creator: "Seehms Shoes",
  publisher: "Seehms Shoes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://seemsshoes.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Seehms Shoes - Premium Footwear in Nigeria",
    description: "Shop authentic sneakers, boots, and running shoes from top brands. Fast delivery across Nigeria.",
    url: 'https://seemsshoes.com',
    siteName: 'Seehms Shoes',
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seehms Shoes - Premium Footwear in Nigeria',
    description: 'Shop authentic sneakers, boots, and running shoes from top brands.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  generator: 'Next.js',
  applicationName: 'Seehms Shoes',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Seehms Shoes',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${workSans.variable} ${openSans.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased flex flex-col min-h-screen" suppressHydrationWarning>
        <Providers>
          <SplashCursor />
          <CartProvider>
            <div className="flex-1">{children}</div>
            <Footer />
          </CartProvider>
        </Providers>
      </body>
    </html>
  )
}
