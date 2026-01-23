"use client"

import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const footerLinks = {
  servicios: [
    { label: "Topografía", href: "#servicios" },
    { label: "Fotogrametría", href: "#servicios" },
    { label: "LiDAR", href: "#servicios" },
    { label: "Modelado BIM", href: "#servicios" },
  ],
  empresa: [
    { label: "Portafolio", href: "#portafolio" },
    { label: "Tecnología", href: "#tecnologia" },
    { label: "Contacto", href: "#contacto" },
  ],
  legal: [
    { label: "Aviso de Privacidad", href: "#" },
    { label: "Términos y Condiciones", href: "#" },
  ],
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-background border-t border-border rounded-[32px] overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand - Logo actualizado */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="#inicio" className="flex items-center gap-3 mb-4" aria-label="Ir al inicio">
              <Image
                src="/images/A1 Logo Circular.png"
                alt="NOSKY - Captura, Digitalización y Documentación Aérea y Terrestre"
                width={100}
                height={100}
                className="h-24 w-auto rounded-full"
              />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mb-6 whitespace-pre-line">
              Captura, Digitalización y Documentación{'\n'}
              Aérea y Terrestre{'\n'}
              Transformamos espacios físicos en datos precisos
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} NOSKY. Todos los derechos reservados.
            </p>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Servicios</h3>
            <ul className="space-y-2">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Empresa</h3>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Desarrollado por K&T 🤍</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
            aria-label="Volver arriba"
          >
            <ArrowUp className="w-5 h-5 text-primary" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
