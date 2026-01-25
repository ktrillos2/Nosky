"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Cpu, Plane, ScanLine, Box, Cloud, Settings } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const technologies = [
  {
    category: "Drones",
    items: [
      { name: "DJI Matrice 350 RTK", icon: Plane },
      { name: "DJI Matrice 400", icon: Plane },
      { name: "DJI Matrice 4E", icon: Plane },
      { name: "DJI Mavic 3 E M", icon: Plane },
      { name: "DJI Mini 5 pro", icon: Plane },
      { name: "DJI Mini 4 pro", icon: Plane },
    ],
  },
  {
    category: "Sensores",
    items: [
      { name: "DJI Zenmuse L3", icon: ScanLine },
      { name: "DJI Zenmuse L2", icon: ScanLine },
      { name: "DJI Zenmuse L1", icon: ScanLine },
      { name: "DJI Zenmuse P1", icon: ScanLine },
    ],
  },
  {
    category: "Escáneres",
    items: [
      { name: "Leica BLK 360", icon: Box },
      { name: "Leica C10", icon: Box },
      { name: "Faro Focus S", icon: Box },
      { name: "Trimble TX8", icon: Box },
      { name: "Satlab Cygnus Lite", icon: Box },
    ],
  },
  {
    category: "Topografía",
    items: [
      { name: "Estación total (2mm + 2ppm, P.A. 2\")", icon: Settings },
      { name: "GNSS (RTK Y Postproceso)", icon: Settings },
    ],
  },
  {
    category: "Software",
    items: [
      { name: "Agisoft MetaShape", icon: Cpu },
      { name: "DJI Terra", icon: Cpu },
      { name: "Revit", icon: Cpu },
      { name: "Archicad", icon: Cpu },
      { name: "Autocad", icon: Cpu },
      { name: "CivilCad", icon: Cpu },
      { name: "Civil3D", icon: Cpu },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
}

export function TechnologySection() {
  const containerRef = useRef<HTMLDivElement>(null)

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
          <span className="text-primary font-mono text-lg uppercase tracking-widest">Tecnología</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            Equipamiento de <span className="text-primary">Última Generación</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Invertimos constantemente en la mejor tecnología disponible para garantizar resultados de máxima precisión y
            calidad.
          </p>
        </motion.div>

        {/* Technology Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {technologies.map((category) => (
            <div
              key={category.category}
              className="gravity-tech bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
            >
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">{category.category}</h3>
              <ul className="space-y-3">
                {category.items.map((item) => (
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
