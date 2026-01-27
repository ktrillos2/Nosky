"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Cpu, Plane, ScanLine, Box, Cloud, Settings, LucideIcon } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, LucideIcon> = {
  Plane,
  ScanLine,
  Box,
  Settings,
  Cpu,
  Cloud
}

export function TechnologyClient({ data }: { data: any }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const technologies = data?.categories?.map((cat: any) => ({
    category: cat.title,
    items: cat.items.map((item: string) => ({
      name: item,
      icon: iconMap[cat.icon] || Settings // Fallback icon
    }))
  })) || []

  useEffect(() => {
    const initGSAP = () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".gravity-tech",
          {
            y: -150,
            opacity: 0,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "bounce.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
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
    <section id="tecnologia" className="py-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-15" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 opacity-0"
        >
          <span className="text-primary font-mono text-lg uppercase tracking-widest">{data?.subtitle || "Tecnología"}</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            {data?.title || "Equipamiento de Última Generación"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {data?.description || "Invertimos constantemente en la mejor tecnología disponible para garantizar resultados de máxima precisión y calidad."}
          </p>
        </motion.div>

        {/* Technology Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {technologies.map((category: any) => (
            <div
              key={category.category}
              className="gravity-tech bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
            >
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">{category.category}</h3>
              <ul className="space-y-3">
                {category.items.map((item: any) => (
                  <li key={item.name} className="flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>


      </div>
    </section>
  )
}
