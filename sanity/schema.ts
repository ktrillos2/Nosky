import { type SchemaTypeDefinition } from 'sanity'
import globalSettings from './schemas/global-settings'
import servicesSection from './schemas/services-section'
import service from './schemas/service'
import projectGallery from './schemas/project-gallery'
import project from './schemas/project'
import hero from './schemas/hero-section'
import technologySection from './schemas/technology-section'
import technologyCategory from './schemas/technology-category'
import portfolioSection from './schemas/portfolio-section'
import portfolioItem from './schemas/portfolio-item'
import clientsSection from './schemas/clients-section'
import clientItem from './schemas/client-item'
import contactSection from './schemas/contact-section'
import videoSection from './schemas/video-section'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        globalSettings,
        hero,
        servicesSection,
        service,
        projectGallery,
        project,
        technologySection,
        technologyCategory,
        portfolioSection,
        portfolioItem,
        videoSection,
        clientsSection,
        clientItem,
        contactSection
    ],
}
