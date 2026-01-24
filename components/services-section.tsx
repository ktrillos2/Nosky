"use client"

import { useEffect, useRef, CSSProperties } from "react"
import { motion } from "framer-motion"
import { Scan, Camera, Compass, Box, FileText, ArrowRight, LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface Service {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  image: string
  conclusion?: string
  imagePosition?: string
  imageFit?: string
  style?: CSSProperties
}

const services: Service[] = [
  {
    icon: Scan,
    title: "LiDAR Aéreo",
    description: "El LiDAR aéreo es una tecnología de captura remota de alta precisión que utiliza pulsos láser emitidos desde drones. Permite obtener información detallada del relieve, incluso en zonas con vegetación densa, siendo una herramienta clave para topografía, ingeniería, agricultura y conservación del patrimonio histórico.",
    features: [
      "Generación de nubes de puntos 3D georreferenciadas",
      "Modelos Digitales del Terreno (MDT) y de Superficie (MDS)",
      "Curvas de nivel y análisis de pendientes",
      "Cálculo de volúmenes y superficies",
      "Cartografía de alta precisión",
      "Análisis del terreno bajo cobertura vegetal",
    ],
    image: "/images/Dronsote.jpg",
    conclusion: "El uso de LiDAR aéreo permite cubrir grandes extensiones en menor tiempo, con alta precisión y mínima intervención en campo.",
    imagePosition: "object-[center_77%] brightness-130",
  },
  /* {
    icon: Scan,
    title: "Escaneo 3D",
    description: "Captura Digital precisa de entornos físicos para ingeniería y arquitectura y conservación histórica. Transformando espacios físicos en miles de puntos con coordenadas exactas y colores reales que recrean una edificación con precisión",
    features: ["Nubes de Puntos", "Modelos Digitales", "Precisión Milimétrica"],
    image: "/images/D-1.png",
  }, */
  {
    icon: Scan,
    title: "Escaneo 3D",
    description: "Captura Digital precisa de entornos físicos para ingeniería y arquitectura y conservación histórica. Transformando espacios físicos en miles de puntos con coordenadas exactas y colores reales que recrean una edificación con precisión",
    features: ["Nubes de Puntos", "Modelos Digitales", "Precisión Milimétrica"],
    image: "/images/D-1.png",
    /*     imagePosition: "object-top", */
    imageFit: "object-contain",
    style: { transform: "translateY(-1px)" }
  },
  {
    icon: Camera,
    title: "Fotogrametría",
    description: "Mediante Vehículos Aéreos No Tripulados (VANT) equipados con cámaras de alta resolución, realizamos la captura fotográfica necesaria para documentar, ilustrar e inspeccionar de forma precisa cualquier sitio o elemento de interés. Con esta tecnología obtenemos:",
    features: [
      "Ortomosaicos de alta precisión",
      "Modelos Digitales de Elevación (MDE)",
      "Curvas de nivel",
      "Mapas termográficos",
      "Modelos 3D y nubes de puntos",
      "Cálculo de volúmenes y superficies",
      "Inspección visual de áreas de difícil acceso",
    ],
    image: "/images/E-2.jpg",
    conclusion: "Todo esto permite cubrir grandes superficies en muy poco tiempo, con alta precisión y a un costo significativamente menor en comparación con métodos tradicionales.",
    imagePosition: "object-[center_95%] brightness-130",
  },
  {
    icon: Compass,
    title: "Topografía de Precisión",
    description: "Realizamos la medición detallada de terrenos para el conocimiento exacto de dimensiones, superficies y desniveles, proporcionando una referencia confiable para proyectos de construcción, regularización y documentación legal. Entregamos datos topográficos precisos y verificables, fundamentales para la planificación, diseño y ejecución de obra, así como para su correcta descripción técnica en trámites y documentos oficiales.",
    features: [
      "Planimetría y altimetría",
      "Georreferenciación (UTM)",
      "Curvas de nivel",
      "Amojonamiento",
      "Levantamientos topográficos con estación total y GNSS",
      "Cálculo de áreas, perímetros y volúmenes",
      "Perfiles longitudinales y transversales del terreno",
    ],
    image: "/images/IMG_7066.JPG",
    conclusion: "Este enfoque garantiza precisión, claridad y respaldo técnico en cada proyecto.",
  },
  {
    icon: Box,
    title: "Modelado BIM",
    description: "Desarrollamos modelos inteligentes BIM orientados a la gestión eficiente de edificaciones e infraestructuras, integrando información geométrica y técnica para todas las etapas del proyecto. Creamos modelos BIM desde LOD 100 hasta LOD 400, así como As-Built, garantizando coherencia entre el diseño, la construcción y la operación. Nuestros servicios incluyen:",
    features: [
      "LOD 100 – Modelado conceptual",
      "LOD 200 – Modelado esquemático",
      "LOD 300 – Modelado de diseño y coordinación",
      "LOD 400 – Modelado para construcción",
      "Documentación As-Built",
      "Extracción de planos y cuantificaciones",
      "Integración con levantamientos topográficos, Arquitectonicos y Estructurales, nubes de puntos y fotogrametría",
    ],
    image: "/images/G-1.png",
    conclusion: "El modelado BIM permite mejor toma de decisiones, reducción de errores en obra y una administración integral del proyecto.",
    imagePosition: "object-[center_12%]",
  },

  {
    icon: FileText,
    title: "Consultoría Sobre Decisión Técnica Mediante Datos",
    description: "Brindamos consultoría técnica especializada enfocada en la toma de decisiones basada en datos, integrando información obtenida mediante levantamientos topográficos, captura aérea, modelado 3D, fotogrametría y BIM. Nuestro enfoque permite analizar, interpretar y transformar los datos técnicos en soluciones claras y estratégicas para proyectos de topografía, arquitectura y conservación del patrimonio histórico, reduciendo riesgos y optimizando recursos. Nuestros servicios incluyen:",
    features: [
      "Análisis y validación de datos técnicos",
      "Interpretación de nubes de puntos, modelos 3D y ortomosaicos",
      "Asesoría para selección de metodologías y tecnologías de captura",
      "Informes técnicos para soporte de decisiones, proyectos y trámites",
      "Acompañamiento técnico durante la planeación y ejecución del proyecto",
    ],
    image: "/images/IMG-00045.jpeg",
    conclusion: "La consultoría técnica garantiza decisiones informadas, mayor control del proyecto y respaldo técnico sólido en cada etapa del proceso.",
  },
]

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="servicios" className="py-24 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800/50" />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Nuestras Soluciones
            </h2>
            <h3 className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Tecnología de Vanguardia aplicada a la captura y procesamiento de datos geoespaciales
            </h3>

            {/* Key Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left mt-12 bg-background/40 backdrop-blur-sm p-6 rounded-2xl border border-primary/10">
              <div className="flex flex-col gap-2">
                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-2">
                  <Scan className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-foreground">Tecnología de Punta</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Equipos de última generación para capturas aéreas y terrestres de máxima fidelidad.</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-2">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-foreground">Datos Accionables</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Transformamos nubes de puntos en información estratégica para tu proyecto.</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-2">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-foreground">Cobertura Total</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Soluciones integrales desde el levantamiento inicial hasta el modelado final.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Image Header - Fixed Height & Edge-to-Edge */}
              <div className="relative w-full h-[280px] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className={`transition-transform duration-700 group-hover:scale-105 ${service.imageFit || "object-cover"} ${service.imagePosition || "object-center"}`}
                  style={service.style}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />

                {/* Icon Badge - Floating on image bottom-left */}
                <div className="absolute bottom-4 left-6">
                  <div className="h-12 w-12 rounded-lg bg-background/90 backdrop-blur-md border border-primary/20 shadow-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description.split('.')[0]}. {service.conclusion || ""}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-border/30">
                  <Link
                    href="#contacto"
                    className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    Más información
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20"
        >
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 h-12 rounded-full shadow-lg shadow-accent/20 transition-all hover:scale-105"
          >
            <Link href="#contacto">
              Hagamos equipo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
