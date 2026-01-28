"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface GalleryImage {
    src: string
    alt: string
    className?: string
}

interface ProjectGalleryData {
    title: string
    subtitle: string
    images: GalleryImage[]
}

const defaultGalleryImages = [
    {
        src: "/images/portfolio-landscape.webp",
        alt: "Vista panorámica de proyecto topográfico en campo",
        className: "object-[center_35%]",
    },
    {
        src: "/images/carrusel-1.webp",
        alt: "Proyecto de topografía y medición en campo",
        className: "object-[center_35%]",
    },
    {
        src: "/images/carrusel-2.webp",
        alt: "Equipo de trabajo en levantamiento topográfico",
    },
    {
        src: "/images/IMG-19018.webp",
        alt: "Captura de datos geoespaciales con tecnología avanzada",
    },
]

export function ProjectGalleryClient({ data }: { data: ProjectGalleryData | null }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    const galleryImages = (data?.images && data.images.length > 0) ? data.images : defaultGalleryImages
    const hasImages = galleryImages.length > 0

    const title = data?.title || "Galería de Proyectos"
    const subtitle = data?.subtitle || "Nuestra experiencia en campo capturada en imágenes."

    const nextSlide = () => {
        if (!hasImages) return
        setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
    }

    const prevSlide = () => {
        if (!hasImages) return
        setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
    }

    // Auto-play
    useEffect(() => {
        if (!hasImages) return
        const timer = setInterval(() => {
            nextSlide()
        }, 5000)
        return () => clearInterval(timer)
    }, [currentIndex, hasImages])

    // GSAP Animation
    useEffect(() => {
        const initGSAP = () => {
            const ctx = gsap.context(() => {
                gsap.fromTo(
                    ".gravity-gallery",
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
        <section className="py-24 bg-card rounded-[32px] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800/50" />

            <div className="container px-4 md:px-6 relative" ref={containerRef}>
                <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                        {title}
                    </h2>
                    <p className="text-muted-foreground text-lg md:text-xl">
                        {subtitle}
                    </p>
                </motion.div>

                <div className="gravity-gallery max-w-5xl mx-auto">
                    <div className="relative h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border border-primary/10 bg-card/50 backdrop-blur-sm">

                        {hasImages && (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={galleryImages[currentIndex].src}
                                        alt={galleryImages[currentIndex].alt}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 1024px"
                                        className={`object-cover ${galleryImages[currentIndex].className || ""}`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                                </motion.div>
                            </AnimatePresence>
                        )}

                        {/* Navigation Buttons */}
                        {hasImages && galleryImages.length > 1 && (
                            <>
                                <div className="absolute inset-0 flex items-center justify-between p-4 z-10 pointer-events-none">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={prevSlide}
                                        className="pointer-events-auto h-12 w-12 rounded-full bg-primary/10 backdrop-blur-md border-primary/20 text-primary hover:bg-primary/20 hover:text-primary transition-all"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                        <span className="sr-only">Anterior</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={nextSlide}
                                        className="pointer-events-auto h-12 w-12 rounded-full bg-primary/10 backdrop-blur-md border-primary/20 text-primary hover:bg-primary/20 hover:text-primary transition-all"
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
                                            className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                                ? "bg-primary w-8"
                                                : "bg-primary/50 hover:bg-primary/80 w-2.5"
                                                }`}
                                            aria-label={`Ir a la imagen ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
