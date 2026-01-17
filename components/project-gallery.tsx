"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const galleryImages = [
    {
        src: "/images/equipo-atardecer.jpg",
        alt: "Equipo de trabajo al atardecer en campo",
    },
    {
        src: "/images/nopales-fondo.jpg",
        alt: "Paisaje natural con vegetación local",
    },
    {
        src: "/images/trabajo-campo.jpg",
        alt: "Ingenieros realizando mediciones en terreno",
    },
    {
        src: "/images/dron-detalle.jpg",
        alt: "Detalle técnico de drone profesional de topografía",
    },
    {
        src: "/images/gallery-field.jpg",
        alt: "Vista panorámica de levantamiento topográfico",
    },
]

export function ProjectGallery() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
    }

    // Optional: Auto-play
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide()
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <section className="py-20 bg-background relative overflow-hidden rounded-[32px]">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="container mx-auto px-4 opacity-0"
            >
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Galería de Proyectos</h2>
                    <p className="text-muted-foreground text-lg">
                        Nuestra experiencia en campo capturada en imágenes.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
                    <div className="relative h-[400px] md:h-[500px] w-full bg-muted">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 opacity-0"
                            >
                                <Image
                                    src={galleryImages[currentIndex].src}
                                    alt={galleryImages[currentIndex].alt}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 1024px"
                                    className="object-cover"
                                />
                                {/* Overlay for better arrow visibility if needed */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="absolute inset-0 flex items-center justify-between p-4 z-10 pointer-events-none">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={prevSlide}
                                className="pointer-events-auto h-12 w-12 rounded-full bg-background/20 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white"
                            >
                                <ChevronLeft className="h-6 w-6" />
                                <span className="sr-only">Anterior</span>
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={nextSlide}
                                className="pointer-events-auto h-12 w-12 rounded-full bg-background/20 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white"
                            >
                                <ChevronRight className="h-6 w-6" />
                                <span className="sr-only">Siguiente</span>
                            </Button>
                        </div>

                        {/* Dots Navigation */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {galleryImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
                                        }`}
                                    aria-label={`Ir a la imagen ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
