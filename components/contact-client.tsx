"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Instagram, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { toast } from "sonner"

export function ContactClient({ data }: { data: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar el mensaje')
      }

      toast.success("¡Mensaje enviado!", {
        description: "Nos pondremos en contacto contigo pronto."
      })

      // Reset form
      form.reset()
    } catch (error: any) {
      toast.error("Error", {
        description: error.message || "Hubo un problema al enviar tu mensaje. Intenta de nuevo."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const email = data?.email || "contacto@noskygroup.com"
  const phone = data?.phone || "55 4191 4393"
  const phone2 = data?.phone2
  const address = data?.address || "Ciudad de México, México"
  const instagramLink = data?.socialLinks?.find((l: any) => l.platform?.toLowerCase().includes('instagram'))?.url || "https://www.instagram.com/noskitectura/"
  const whatsappLink = data?.whatsapp ? `https://wa.me/${data.whatsapp}` : "https://wa.me/525541914393"
  const tiktokLink = data?.socialLinks?.find((l: any) => l.platform?.toLowerCase().includes('tiktok'))?.url || "https://www.tiktok.com/@noskitectura"

  return (
    <section id="contacto" className="py-24 relative bg-card rounded-[32px] overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-15" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 opacity-0 animate-in fade-in fill-mode-forwards"
        >
          <span className="text-primary font-mono text-lg uppercase tracking-widest">{data?.subtitle || "Contacto"}</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            {data?.title || "¡Hagamos Equipo!"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {data?.description || "Cuéntanos sobre tu proyecto y te proporcionaremos una cotización personalizada."}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="opacity-0"
          >
            <Card className="bg-card/50 border-primary/20 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-2xl">Hablemos de tu Proyecto</CardTitle>
                <CardDescription className="text-base">Completa el formulario y nos pondremos en contacto contigo.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-semibold text-foreground">
                        Nombre
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Tu nombre"
                        required
                        className="bg-background/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all duration-300 h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-semibold text-foreground">
                        Empresa
                      </label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Nombre de empresa"
                        className="bg-background/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all duration-300 h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-foreground">
                      Correo electrónico
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="tu@email.com"
                      className="bg-background/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all duration-300 h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-semibold text-foreground">
                      Servicio de interés
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full h-11 px-3 rounded-md bg-background/50 border border-border text-foreground focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all duration-300"
                    >
                      <option value="">Selecciona un servicio</option>
                      <option value="Topografía de precisión">Topografía de precisión</option>
                      <option value="Fotogrametría">Fotogrametría</option>
                      <option value="LiDAR aéreo">LiDAR aéreo</option>
                      <option value="Escaneo 3D">Escaneo 3D</option>
                      <option value="Modelado BIM">Modelado BIM</option>
                      <option value="Drones">Drones</option>
                      <option value="Documentación Digital">Documentación Digital</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-foreground">
                      Descripción del proyecto
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Cuéntanos sobre tu proyecto, ubicación y requerimientos específicos..."
                      rows={4}
                      className="bg-background/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/50 resize-none transition-all duration-300"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold glow-accent shadow-lg hover:shadow-xl transition-all duration-300 h-12 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>enviando...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Enviar
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center opacity-0"
          >
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Correo Electrónico</h3>
                    <p className="text-muted-foreground">{email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Teléfono</h3>
                    <p className="text-muted-foreground">
                      {phone}
                      {phone2 && ` / ${phone2}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Ubicación</h3>
                    <p className="text-muted-foreground">{address}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-8 border-t border-border">
                <h3 className="font-semibold text-foreground mb-4">Síguenos</h3>
                <div className="flex gap-4">
                  <Link
                    href={instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    aria-label="Seguir en Instagram"
                  >
                    <Instagram className="w-7 h-7 text-primary" />
                  </Link>
                  <Link
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    aria-label="Contactar por WhatsApp"
                  >
                    <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </Link>
                  <Link
                    href={tiktokLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    aria-label="Seguir en TikTok"
                  >
                    <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
