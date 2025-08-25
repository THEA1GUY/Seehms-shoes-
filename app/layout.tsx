import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import { SplashCursor } from "@/components/SplashCursor"
import { Providers } from "@/components/Providers"

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
  title: "Seehms Shoes - Stylish Footwear for Every Lifestyle",
  description:
    "Discover comfortable and stylish footwear including slides, crocs, sneakers, corporate shoes, and sandals at Seehms Shoes.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${workSans.variable} ${openSans.variable}`}>
      <body className="font-body antialiased">
        <Providers>
          <SplashCursor />
          <CartProvider>{children}</CartProvider>
        </Providers>
      </body>
    </html>
  )
}
