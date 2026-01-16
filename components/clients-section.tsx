"use client"

import { motion } from "framer-motion"
import { Building2, Factory, Home, Landmark, Mountain, Zap } from "lucide-react"

const industries = [
  { icon: Building2, name: "Construcción", description: "Control de obra y as-built" },
  { icon: Factory, name: "Industrial", description: "Plantas y manufactura" },
  { icon: Landmark, name: "Patrimonio", description: "Documentación histórica" },
  { icon: Home, name: "Arquitectura", description: "Proyectos residenciales" },
  { icon: Mountain, name: "Minería", description: "Volumetrías y terrenos" },
  { icon: Zap, name: "Energía", description: "Inspección de activos" },
]

export function ClientsSection() {
  return (
    <section className="py-24 bg-card/30 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm uppercase tracking-widest">Sectores</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Industrias que <span className="text-primary">Confían</span> en Nosotros
          </h2>
        </motion.div>

        {/* Industries Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
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
              className="flex flex-col items-center text-center p-6 rounded-xl bg-background/50 border border-border hover:border-primary/50 transition-all duration-300 group hover:scale-105"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <industry.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{industry.name}</h3>
              <p className="text-xs text-muted-foreground">{industry.description}</p>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  )
}
