
"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Play } from "lucide-react"

export function VideoClient({ data }: { data: any }) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch((error) => console.log("Video autoplay failed:", error))
        }
    }, [])

    const [videoError, setVideoError] = useState<string | null>(null)

    // Priority: Sanity Video -> External URL -> Local Fallback
    const videoSrc = data?.videoUrl || data?.externalVideoUrl || "/images/video-maqueta.MOV"

    console.log("[VideoDebug] Data:", data)
    console.log("[VideoDebug] Source:", videoSrc)

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl group bg-gray-900">
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        className="w-full h-full object-cover"
                        loop
                        muted
                        playsInline
                        autoPlay
                        onError={(e) => {
                            const err = e.currentTarget.error;
                            console.error("[VideoDebug] Video Error:", err);
                            setVideoError(`Video Error: ${err?.message || "Playback failed"} (Code: ${err?.code})`);
                        }}
                    />

                    {videoError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white z-20">
                            <div className="text-center p-4">
                                <p className="text-xl font-bold text-red-500 mb-2">Video Playback Error</p>
                                <p className="font-mono text-sm">{videoError}</p>
                                <p className="text-sm mt-4 text-gray-400">Try converting the video to MP4 format.</p>
                            </div>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

                    <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                    <Play className="w-5 h-5 fill-current" />
                                </div>
                                <span className="text-sm font-medium tracking-wider uppercase">{data?.title || "Tecnología en Acción"}</span>
                            </div>
                            <h3 className="text-2xl md:text-4xl font-bold max-w-lg">
                                {data?.description || "Visualiza nuestros procesos y resultados"}
                            </h3>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
