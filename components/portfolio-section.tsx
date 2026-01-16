"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const portfolioItems = [
  {
    id: 1,
    title: "Vuelo LiDAR con Drone Profesional",
    category: "Captura Aérea",
    description:
      "Operación con drone DJI equipado para captura de datos topográficos desde el aire, permitiendo acceso a zonas difíciles.",
    image: "/images/feature-drone.jpg",
    tech: ["DJI Enterprise", "Fotogrametría", "Nube de Puntos"],
  },
  {
    id: 2,
    title: "Documentación de Patrimonio",
    category: "Arquitectura",
    description:
      "Levantamiento arquitectónico de alta precisión en edificaciones históricas para proyectos de restauración y conservación.",
    image: "/images/gallery-arch.jpg",
    tech: ["Estación Total", "Fachadas", "Detalle Milimétrico"],
  },
  {
    id: 3,
    title: "Topografía en Terreno Agreste",
    category: "Topografía",
    description:
      "Trabajo de campo en entornos desafiantes, garantizando mediciones exactas sin importar las condiciones del terreno.",
    image: "/images/gallery-field.jpg",
    tech: ["Estación Total", "Geodesia", "Control Terrestre"],
  },
  {
    id: 4,
    title: "Levantamientos Agrícolas",
    category: "Fotogrametría",
    description: "Aplicación de tecnología topográfica en sectores agrícolas y rurales para planificación de cultivos y parcelas.",
    image: "/images/portfolio-cactus.jpg",
    tech: ["Estación Total", "Catastro", "Planimetría"],
  },
  {
    id: 5,
    title: "Georreferenciación Urbana",
    category: "Geodesia",
    description: "Puntos de control y levantamientos GNSS en entornos urbanos y viales para proyectos de infraestructura.",
    image: "/images/feature-gps.jpg",
    tech: ["GNSS RTK", "Vialidad", "Infraestructura"],
  },
  {
    id: 6,
    title: "Escaneo de Estructuras",
    category: "Escaneo 3D",
    description: "Captura de nubes de puntos de alta precisión para ingeniería inversa y análisis estructural.",
    image: "/images/gallery-arch.jpg",
    tech: ["LiDAR", "Nube de Puntos", "Ingeniería"],
  },
]

export function PortfolioSection() {
  return (
    <section id="portafolio" className="py-24 bg-card/30 relative overflow-hidden rounded-[32px]">
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm uppercase tracking-widest">Portafolio</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            Proyectos que <span className="text-primary">Transforman</span> la Realidad
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cada proyecto es una oportunidad para demostrar nuestra precisión y compromiso con la excelencia técnica.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-primary/10 bg-card/50 hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-background/80 backdrop-blur-sm text-primary border border-primary/20">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] uppercase tracking-wider text-muted-foreground/80"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
