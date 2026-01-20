"use client"

import { motion } from "framer-motion"

export function VideoSection() {
    return (
        <section className="py-20 bg-muted/30 rounded-[32px] overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 opacity-0"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Tecnología en Acción</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Visualiza nuestros procesos y resultados
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto relative rounded-2xl overflow-hidden shadow-2xl bg-black opacity-0"
                >
                    <video
                        className="w-full h-auto object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                    >
                        <source src="/images/video-maqueta.MOV" type="video/mp4" />
                        <source src="/images/video-maqueta.MOV" type="video/quicktime" />
                        Tu navegador no soporta la reproducción de video.
                    </video>
                </motion.div>
            </div>
        </section>
    )
}
