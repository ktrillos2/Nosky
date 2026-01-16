import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { VideoSection } from "@/components/video-section"
import { ServicesSection } from "@/components/services-section"
import { ProjectGallery } from "@/components/project-gallery"
import { PortfolioSection } from "@/components/portfolio-section"
import { TechnologySection } from "@/components/technology-section"
import { ClientsSection } from "@/components/clients-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

import { WhatsAppButton } from "@/components/whatsapp-button"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 p-4 space-y-4 md:p-6 md:space-y-6">
      <Navbar />
      <HeroSection />
      <VideoSection />
      <ServicesSection />
      <ProjectGallery />
      <PortfolioSection />
      <TechnologySection />
      <ClientsSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
