"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Scan, Camera, Compass, Box, FileText, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Scan,
    title: "Escaneo Láser 3D",
    description: "Captura digital precisa de entornos físicos para ingeniería y arquitectura. Transformamos espacios físicos en modelos digitales de alta precisión utilizando tecnología láser de última generación.",
    features: ["Nubes de Puntos", "Modelos Digitales", "Precisión Milimétrica"],
    image: "/3d-point-cloud-building-scan-colorful-architectura.jpg",
  },
  {
    icon: Camera,
    title: "Fotogrametría Aérea",
    description: "Levantamientos topográficos y mapeo 3D mediante tecnología de drones. Capturamos datos geoespaciales desde el aire para proyectos de gran escala con precisión centimétrica.",
    features: ["Ortomosaicos", "Modelos de Elevación", "Inspección Visual"],
    image: "/images/dron-detalle.jpg",
  },
  {
    icon: Compass,
    title: "Topografía de Precisión",
    description: "Medición detallada de terrenos para proyectos de construcción y catastro. Proporcionamos datos topográficos exactos para la planificación y ejecución de obras civiles.",
    features: ["Georreferenciación", "Curvas de Nivel", "Amonojamientos"],
    image: "/images/topografia-de-precision.JPG",
  },
  {
    icon: Box,
    title: "Modelado BIM",
    description: "Creación de modelos inteligentes para la gestión eficiente de infraestructuras. Desarrollamos modelos BIM completos desde LOD 100 hasta LOD 500 para proyectos de construcción.",
    features: ["LOD 100-500", "Coordinación 3D", "Documentación As-Built"],
    image: "/images/bim-model.png",
  },
  {
    icon: FileText,
    title: "Consultoría Técnica",
    description: "Asesoramiento experto en geomática y gestión de datos espaciales. Brindamos soporte técnico especializado en todas las fases de su proyecto de captura y procesamiento de datos.",
    features: ["Control de Calidad", "Supervisión de Obra", "Capacitación"],
    image: "/images/trabajo-campo.jpg",
  },
]

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGSAP = () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".gravity-card",
          {
            y: -150,
            opacity: 0,
            rotate: () => Math.random() * 10 - 5,
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
    <section id="servicios" className="py-24 bg-card rounded-[32px] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800/50" />

      <div className="container px-4 md:px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="opacity-0"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Nuestras Soluciones
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl">
              Tecnología de vanguardia aplicada a la captura y procesamiento de datos geoespaciales.
            </p>
          </motion.div>
        </div>

        <div ref={containerRef} className="space-y-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="gravity-card group"
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 bg-background/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10`}>
                {/* Image Section - Larger and more prominent */}
                <div className="relative w-full lg:w-1/2 h-80 lg:h-96 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

                  {/* Icon overlay on image */}
                  <div className="absolute top-6 left-6">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 backdrop-blur-md flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground text-base lg:text-lg mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm lg:text-base text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn more link */}
                  <Link
                    href="#contacto"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium group/link"
                  >
                    Más información
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 opacity-0"
        >
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold glow-accent"
          >
            <Link href="#contacto">
              Solicitar Cotización
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
