import { getGlobalData } from "@/lib/get-global-data"
import { FooterClient } from "./footer-client"

export async function Footer() {
  const settings = await getGlobalData()

  // Default fallback data matching original content
  const defaultSocials = [
    { platform: "facebook", url: "https://facebook.com" },
    { platform: "instagram", url: "https://instagram.com" }
  ]
  const footerData = {
    companyName: settings?.companyName || "NOSKY",
    logoUrl: settings?.logo?.asset?.url || "/images/A1 Logo Circular.png",
    footerText: settings?.footerText || `Captura, Digitalización y Documentación\nAérea y Terrestre\nTransformamos espacios físicos en datos precisos`,
    socialLinks: settings?.socialLinks || defaultSocials,
    menuItems: settings?.menuItems || []
  }

  return <FooterClient data={footerData} />
}
