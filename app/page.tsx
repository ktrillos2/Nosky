import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { getGlobalData } from "@/lib/get-global-data"

const VideoSection = dynamic(() => import("@/components/video-section").then(mod => mod.VideoSection), { ssr: true })
const ServicesSection = dynamic(() => import("@/components/services-section").then(mod => mod.ServicesSection), { ssr: true })
const ProjectGallery = dynamic(() => import("@/components/project-gallery").then(mod => mod.ProjectGallery), { ssr: true })
const PortfolioSection = dynamic(() => import("@/components/portfolio-section").then(mod => mod.PortfolioSection), { ssr: true })
const TechnologySection = dynamic(() => import("@/components/technology-section").then(mod => mod.TechnologySection), { ssr: true })
const ClientsSection = dynamic(() => import("@/components/clients-section").then(mod => mod.ClientsSection), { ssr: true })
const ContactSection = dynamic(() => import("@/components/contact-section").then(mod => mod.ContactSection), { ssr: true })
const Footer = dynamic(() => import("@/components/footer").then(mod => mod.Footer), { ssr: true })
const WhatsAppButton = dynamic(() => import("@/components/whatsapp-button").then(mod => mod.WhatsAppButton))

export default async function HomePage() {
  const globalData = await getGlobalData()

  return (
    <main className="min-h-screen bg-neutral-950 p-4 space-y-4 md:p-6 md:space-y-6">
      <Navbar />
      <HeroSection />
      <VideoSection />
      <ServicesSection />
      <ProjectGallery />
      <TechnologySection />
      <PortfolioSection />
      <ClientsSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton phone={globalData?.whatsapp} />
    </main>
  )
}
