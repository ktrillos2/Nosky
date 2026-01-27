
"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Building2, Factory, Home, Landmark, Mountain, Zap, LucideIcon } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, LucideIcon> = {
    Building2,
    Factory,
    Landmark,
    Home,
    Mountain,
    Zap
}

export function ClientsClient({ data }: { data: any }) {
    const containerRef = useRef<HTMLDivElement>(null)

    const items = data?.items || []

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
                    <span className="text-primary font-mono text-lg uppercase tracking-widest">{data?.subtitle || "Sectores"}</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
                        {data?.title || "Industrias que Confían en Nosotros"}
                    </h2>
                </motion.div>

                {/* Industries Grid */}
                <div
                    ref={containerRef}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
                >
                    {items.map((item: any) => {
                        const IconComponent = iconMap[item.icon] || Building2
                        return (
                            <div
                                key={item._id}
                                className="gravity-client flex flex-col items-center text-center p-6 rounded-xl bg-background/50 border border-border hover:border-primary/50 transition-all duration-300 group hover:scale-105"
                            >
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <IconComponent className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
