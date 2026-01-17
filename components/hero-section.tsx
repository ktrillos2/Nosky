"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Radar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gravity-hero",
        {
          y: -150,
          opacity: 0,
          rotate: () => Math.random() * 6 - 3,
        },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.5,
          stagger: 0.3,
          ease: "bounce.out",
          delay: 0.5,
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden rounded-[32px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/nopales-cielo.jpg"
          alt="Paisaje de nopales bajo un cielo claro"
          fill
          className="object-cover object-center"
          priority
          fetchPriority="high"
        />
        {/* Overlay gradients for readability */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-background/90" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30 z-10" />

      {/* Content */}
      <div ref={containerRef} className="relative z-20 container mx-auto px-4 lg:px-8 pt-20">
        <div className="max-w-4xl mx-auto text-center">


          {/* Main Heading */}
          <h1
            className="gravity-hero text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-balance drop-shadow-2xl opacity-0"
          >
            Captura, Digitalización y <span className="text-primary text-glow drop-shadow-md">Documentación</span> del Mundo Real
          </h1>

          {/* Subtitle */}
          <p
            className="gravity-hero text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 text-pretty drop-shadow-md font-medium opacity-0"
          >
            Transformamos espacios físicos en datos precisos mediante escaneo LiDAR, fotogrametría aérea y topografía de
            alta precisión. Soluciones integrales para ingeniería, arquitectura y construcción.
          </p>

          {/* CTA Buttons */}
          <div
            className="gravity-hero flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 opacity-0"
          >
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 glow-accent"
            >
              <Link href="#contacto">Solicitar Cotización</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 bg-transparent"
            >
              <Link href="#servicios">Explorar Servicios</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
