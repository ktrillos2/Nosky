"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"

const heroImages = [
  {
    src: "/images/hero-add-cielo.JPG",
    alt: "Vista aérea del cielo",
    position: "object-center",
  },
  {
    src: "/images/E-2.jpg",
    alt: "Drone inspeccionando terreno",
    position: "object-bottom",
  },
  {
    src: "/images/nopales-cielo.jpg",
    alt: "Paisaje de nopales bajo un cielo claro",
  },
  {
    src: "/images/hero-add-siembra.JPG",
    alt: "Campo de siembra y cultivo",
    position: "object-[center_30%]",
  },
  {
    src: "/images/hero-add-piedras.JPG",
    alt: "Terreno agreste y rocoso",
    position: "object-center",
  },
  {
    src: "/images/pastizaje-2.JPG",
    alt: "Vegetación y pastizales",
    position: "object-[center_30%]",
  },
  {
    src: "/images/hero-add-montaña.JPG",
    alt: "Vista de montaña y terreno",
    // Cambiamos 'object-center' por un valor arbitrario:
    position: "object-[center_65%]",
  },
]

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 6000) // Change every 6 seconds
    return () => clearInterval(timer)
  }, [])

  // GSAP Animation
  useEffect(() => {
    const initGSAP = () => {
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
      return ctx
    }

    let ctx: gsap.Context
    if (document.readyState === "complete") {
      ctx = initGSAP()
    } else {
      const handleLoad = () => {
        ctx = initGSAP()
      }
      window.addEventListener("load", handleLoad)
      return () => {
        window.removeEventListener("load", handleLoad)
        if (ctx) ctx.revert()
      }
    }

    return () => {
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden rounded-[32px]">
      {/* LCP Optimization: Static First Image (Rendered immediately by server) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImages[0].src}
          alt={heroImages[0].alt}
          fill
          className={`object-cover ${heroImages[0].position || "object-center"}`}
          priority
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
      </div>

      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, zIndex: 10 }}
            animate={{ opacity: 1, zIndex: 10 }}
            exit={{ opacity: 1, zIndex: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentIndex].src}
              alt={heroImages[currentIndex].alt}
              fill
              className={`object-cover ${heroImages[currentIndex].position || "object-center"}`}
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay gradients for readability */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background/90" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30 z-10" />

      {/* Slider Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
              ? "bg-primary w-8"
              : "bg-white/50 hover:bg-white/80 w-1.5"
              }`}
            aria-label={`Ir a la imagen ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div ref={containerRef} className="relative z-20 container mx-auto px-4 lg:px-8 pt-20">
        <div className="max-w-4xl mx-auto text-center">

          {/* Main Heading */}
          <h1
            className="gravity-hero text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-balance drop-shadow-2xl opacity-0"
          >
            Captura, Digitalización y <span className="text-primary text-glow drop-shadow-md">Documentación</span> Aérea y Terrestre
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
              <Link href="#contacto">Hagamos equipo</Link>
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
          <span className="text-xs uppercase tracking-widest">Ver más</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
