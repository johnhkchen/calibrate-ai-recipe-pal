import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Recipe Collection",
  description: "Discover and explore delicious recipes",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-recipe-pattern min-h-screen`}>
        <div className="bg-white/90 min-h-screen">{children}</div>
      </body>
    </html>
  )
}
