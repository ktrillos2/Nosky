
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

async function seedContact() {
    console.log('🚀 Starting Contact Section Seeding...')

    const configDoc = {
        _id: 'contactSection',
        _type: 'contactSection',
        title: '¡Hagamos Equipo!',
        subtitle: 'Contacto',
        description: 'Cuéntanos sobre tu proyecto y te proporcionaremos una cotización personalizada.'
    }

    await client.createOrReplace(configDoc)
    console.log('✅ Contact Section seeded successfully!')
}

seedContact()
