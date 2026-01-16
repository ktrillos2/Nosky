import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "NOSKY | Captura, Digitalización y Documentación Aérea y Terrestre",
  description:
    "Especialistas en topografía de precisión, fotogrametría con drones, escaneo LiDAR aéreo y terrestre, y modelado BIM/3D. Transformamos la realidad en datos precisos.",
  keywords: [
    "LiDAR",
    "fotogrametría",
    "drones",
    "topografía",
    "modelado 3D",
    "BIM",
    "nube de puntos",
    "escaneo láser",
    "México",
  ],
  authors: [{ name: "NOSKY" }],
  openGraph: {
    title: "NOSKY | Captura, Digitalización y Documentación Aérea y Terrestre",
    description:
      "Especialistas en topografía de precisión, fotogrametría con drones, escaneo LiDAR aéreo y terrestre, y modelado BIM/3D.",
    type: "website",
    locale: "es_MX",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#0a1628",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
