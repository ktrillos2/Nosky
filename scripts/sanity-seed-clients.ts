
import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error('❌ Missing required environment variables')
    process.exit(1)
}

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: false,
})

const industries = [
    { icon: 'Building2', name: "Construcción", description: "Control e inspección de obra" },
    { icon: 'Factory', name: "Industrial", description: "Representación industrial 2D/3D" },
    { icon: 'Landmark', name: "Patrimonio", description: "Documentación histórica" },
    { icon: 'Home', name: "Arquitectura", description: "Proyectos residenciales" },
    { icon: 'Mountain', name: "Minería", description: "Inspección y volumetrías" },
    { icon: 'Zap', name: "Energía", description: "Inspección y Monitoreo eficiente" },
]

async function seedClients() {
    console.log('🚀 Starting Clients/Industries Seeding...')

    // 1. Config
    const configDoc = {
        _id: 'clientsSection',
        _type: 'clientsSection',
        title: 'Industrias que Confían en Nosotros',
        subtitle: 'Sectores'
    }
    await client.createOrReplace(configDoc)
    console.log('✅ Clients Configuration set.')

    // 2. Items
    for (let i = 0; i < industries.length; i++) {
        const industry = industries[i]
        const doc = {
            _type: 'clientItem',
            name: industry.name,
            description: industry.description,
            icon: industry.icon,
            order: i
        }
        await client.create(doc)
        console.log(`✅ Created industry: ${industry.name}`)
    }

    console.log('🎉 Clients Section seeding complete!')
}

seedClients()
