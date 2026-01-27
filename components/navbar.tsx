import { getGlobalData } from "@/lib/get-global-data"
import { urlForImage } from "@/sanity/lib/image"

export async function Navbar() {
  const data = await getGlobalData()
  const navLinks = data?.menuItems || [
    { link: "#inicio", label: "Inicio" },
    { link: "#servicios", label: "Servicios" },
    { link: "#portafolio", label: "Portafolio" },
    { link: "#tecnologia", label: "Tecnología" },
    { link: "#contacto", label: "Contacto" },
  ]
  const logoSrc = data?.logo?.asset?.url || "/images/A1 Logo Circular.png"

  return <NavbarClient settings={{ ...data, menuItems: navLinks, logoUrl: logoSrc }} />
}

import { NavbarClient } from "./navbar-client"
