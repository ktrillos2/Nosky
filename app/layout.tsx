import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

import { getGlobalData } from "@/lib/get-global-data"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getGlobalData()
  const logoSrc = settings?.logo?.asset?.url || "/images/A1 Logo Circular.webp"

  return {
    icons: {
      icon: logoSrc,
      shortcut: logoSrc,
      apple: logoSrc,
    },
    title: settings?.companyName ? `${settings.companyName} | Captura, Digitalización y Documentación Aérea y Terrestre` : "NOSKY | Captura, Digitalización y Documentación Aérea y Terrestre",
    description: settings?.footerText || "Especialistas en topografía de precisión, fotogrametría con drones, escaneo LiDAR aéreo y terrestre, y modelado BIM/3D. Transformamos la realidad en datos precisos.",
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
    authors: [{ name: settings?.companyName || "NOSKY" }],
    openGraph: {
      title: settings?.companyName ? `${settings.companyName} | Captura, Digitalización y Documentación Aérea y Terrestre` : "NOSKY | Captura, Digitalización y Documentación Aérea y Terrestre",
      description: settings?.footerText || "Especialistas en topografía de precisión, fotogrametría con drones, escaneo LiDAR aéreo y terrestre, y modelado BIM/3D.",
      type: "website",
      locale: "es_MX",
    },
    generator: 'v0.app',
    metadataBase: new URL("https://noskygroup.com"),
  }
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
      <head>
        {/* Estilos Críticos (Inline) para evitar FOUC y mejorar LCP */}
        <style dangerouslySetInnerHTML={{
          __html: `

          :root { 
            --background: #0a1628; 
            --foreground: #f2f2f2; 
            --primary: #f2f2f2;
            --accent: #cccccc;
            --card: #121f33;
          }
          body { background: #0a1628; color: #f2f2f2; margin: 0; font-family: sans-serif; overflow-x: hidden; }
          .min-h-\\[90vh\\] { min-height: 90vh; }
          .flex { display: flex; }
          .items-center { align-items: center; }
          .justify-center { justify-content: center; }
          .relative { position: relative; }
          .absolute { position: absolute; }
          .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
          .z-0 { z-index: 0; }
          .z-20 { z-index: 20; }
          .overflow-hidden { overflow: hidden; }
          .bg-black\\/20 { background-color: rgba(0,0,0,0.2); }
          .bg-gradient-to-b { background-image: linear-gradient(to bottom, var(--tw-gradient-stops)); }
          .from-black\\/50 { --tw-gradient-from: rgba(0,0,0,0.5) var(--tw-gradient-from-position); --tw-gradient-to: rgba(0,0,0,0) var(--tw-gradient-to-position); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
          .text-center { text-align: center; }
          .max-w-4xl { max-width: 56rem; }
          .mx-auto { margin-left: auto; margin-right: auto; }
          .container { width: 100%; margin-left: auto; margin-right: auto; padding-left: 1rem; padding-right: 1rem; }
          h1 { font-size: 2.25rem; font-weight: 700; line-height: 1.2; margin-bottom: 1.5rem; text-wrap: balance; }
          .text-primary { color: #f2f2f2; }
          @media (min-width: 768px) { h1 { font-size: 3.75rem; } .container { padding-left: 2rem; padding-right: 2rem; } }
          @media (min-width: 1024px) { h1 { font-size: 4.5rem; } }
          /* Ocultar elementos que GSAP animará hasta que cargue - REMOVED for LCP optimization */
          /* .gravity-hero { opacity: 0; } */
        ` }} />


      </head>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
