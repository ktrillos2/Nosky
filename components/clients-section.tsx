"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Building2, Factory, Home, Landmark, Mountain, Zap } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const industries = [
  { icon: Building2, name: "Construcción", description: "Control e inspección de obra" },
  { icon: Factory, name: "Industrial", description: "Representación industrial 2D/3D" },
  { icon: Landmark, name: "Patrimonio", description: "Documentación histórica" },
  { icon: Home, name: "Arquitectura", description: "Proyectos residenciales" },
  { icon: Mountain, name: "Minería", description: "Inspección y volumetrías" },
  { icon: Zap, name: "Energía", description: "Inspección  y  Monitoreo eficiente" },
]

export function ClientsSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGSAP = () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".gravity-client",
          {
            y: -150,
            opacity: 0,
            rotate: () => Math.random() * 20 - 10,
          },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "bounce.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
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
    <section className="py-24 bg-card/30 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 opacity-0"
        >
          <span className="text-primary font-mono text-sm uppercase tracking-widest">Sectores</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Industrias que <span className="text-primary">Confían</span> en Nosotros
          </h2>
        </motion.div>

        {/* Industries Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {industries.map((industry, index) => (
            <div
              key={industry.name}
              className="gravity-client flex flex-col items-center text-center p-6 rounded-xl bg-background/50 border border-border hover:border-primary/50 transition-all duration-300 group hover:scale-105"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <industry.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{industry.name}</h3>
              <p className="text-xs text-muted-foreground">{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
