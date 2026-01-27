import { createClient } from 'next-sanity'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
    console.error('Missing required environment variables for seeding.')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    token,
    useCdn: false,
    apiVersion: '2024-01-25',
})

const initialData = {
    _id: 'globalSettings',
    _type: 'globalSettings',
    companyName: 'NOSKY',
    email: 'contacto@noskygroup.com',
    socialLinks: [
        { platform: 'facebook', url: 'https://facebook.com', _key: 'fb' },
        { platform: 'instagram', url: 'https://instagram.com', _key: 'ig' },
        { platform: 'linkedin', url: 'https://linkedin.com', _key: 'li' },
        { platform: 'whatsapp', url: 'https://wa.me/521234567890', _key: 'wa' }
    ],
    footerText: 'Todos los derechos reservados.',
    menuItems: [
        { label: 'Inicio', link: '#inicio', _key: 'home' },
        { label: 'Servicios', link: '#servicios', _key: 'services' },
        { label: 'Portafolio', link: '#portafolio', _key: 'portfolio' },
        { label: 'Tecnología', link: '#tecnologia', _key: 'tech' },
        { label: 'Contacto', link: '#contacto', _key: 'contact' }
    ]
}

async function seed() {
    try {
        console.log('Seeding global settings...')
        await client.createOrReplace(initialData)
        console.log('Global settings seeded successfully!')
    } catch (error) {
        console.error('Error seeding data:', error)
    }
}

seed()
