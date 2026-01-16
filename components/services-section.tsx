"use client"

import { motion } from "framer-motion"
import { Scan, Camera, Compass, Box, FileText, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    icon: Scan,
    title: "Escaneo Láser 3D",
    description: "Captura digital precisa de entornos físicos para ingeniería y arquitectura.",
    features: ["Nubes de Puntos", "Modelos Digitales", "Precisión Milimétrica"],
    colors: {
      bg: "bg-primary/10",
      text: "text-primary",
      dot: "bg-primary",
    },
  },
  {
    icon: Camera,
    title: "Fotogrametría Aérea",
    description: "Levantamientos topográficos y mapeo 3D mediante tecnología de drones.",
    features: ["Ortomosaicos", "Modelos de Elevación", "Inspección Visual"],
    image: "/images/dron-detalle.jpg",
    colors: {
      bg: "bg-primary/10",
      text: "text-primary",
      dot: "bg-primary",
    },
  },
  {
    icon: Compass,
    title: "Topografía de Precisión",
    description: "Medición detallada de terrenos para proyectos de construcción y catastro.",
    features: ["Georreferenciación", "Curvas de Nivel", "Amonojamientos"],
    image: "/images/feature-gps.jpg",
    colors: {
      bg: "bg-primary/10",
      text: "text-primary",
      dot: "bg-primary",
    },
  },
  {
    icon: Box,
    title: "Modelado BIM",
    description: "Creación de modelos inteligentes para la gestión eficiente de infraestructuras.",
    features: ["LOD 100-500", "Coordinación 3D", "Documentación As-Built"],
    colors: {
      bg: "bg-primary/10",
      text: "text-primary",
      dot: "bg-primary",
    },
  },
  {
    icon: FileText,
    title: "Consultoría Técnica",
    description: "Asesoramiento experto en geomática y gestión de datos espaciales.",
    features: ["Control de Calidad", "Supervisión de Obra", "Capacitación"],
    colors: {
      bg: "bg-primary/10",
      text: "text-primary",
      dot: "bg-primary",
    },
  },
]

export function ServicesSection() {
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
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Nuestras Soluciones
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl">
              Tecnología de vanguardia aplicada a la captura y procesamiento de datos geoespaciales.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 50,
                    damping: 20,
                  },
                },
              }}
              className={`group ${index === 1 || index === 2 ? "lg:col-span-2" : ""
                } ${index === 4 ? "lg:col-span-3 md:col-span-2" : ""}`}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-500 border-primary/10 overflow-hidden flex flex-col hover:scale-[1.02] bg-card/50 backdrop-blur-sm">
                {service.image && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  </div>
                )}
                <CardHeader className={`relative z-10 ${service.image ? '-mt-12' : 'pt-6'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-lg ${service.colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                    >
                      <service.icon className={`w-5 h-5 ${service.colors.text}`} />
                    </div>
                    <CardTitle className="text-lg font-semibold leading-tight">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm line-clamp-3">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className={`w-1.5 h-1.5 rounded-full ${service.colors.dot}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary/50 text-primary hover:bg-primary/10 group bg-background/50 backdrop-blur-sm"
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
