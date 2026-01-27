
import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error('❌ Missing required environment variables (NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN)')
    process.exit(1)
}

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: false,
})

const GLOBAL_SETTINGS_ID = 'globalSettings' // Singleton ID

async function uploadImage(filename: string) {
    const filePath = path.join(__dirname, '../public/images', filename)
    if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ Image not found: ${filename}`)
        return null
    }
    const buffer = fs.readFileSync(filePath)
    const asset = await client.assets.upload('image', buffer, { filename })
    return asset._id
}

async function seedGlobalSettings() {
    console.log('🚀 Starting Global Settings Migration...')

    // 1. Upload Logos
    console.log('📤 Uploading logos...')
    const logoId = await uploadImage('A1 Logo Circular.png')
    // Assuming same logo for dark mode for now, or use a specific one if available
    const logoDarkId = await uploadImage('A1 Logo Circular.png')

    if (!logoId) {
        console.error('❌ Critical: Main logo could not be uploaded.')
        return
    }

    // 2. Define Data
    const globalData = {
        _id: GLOBAL_SETTINGS_ID,
        _type: 'globalSettings',
        companyName: 'NOSKY',
        seoTitle: 'NOSKY - Captura, Digitalización y Documentación',
        seoDescription: 'Transformamos espacios físicos en datos precisos mediante escaneo LiDAR, fotogrametría aérea y topografía de alta precisión.',
        logo: {
            _type: 'image',
            asset: { _type: 'reference', _ref: logoId }
        },
        logoDark: logoDarkId ? {
            _type: 'image',
            asset: { _type: 'reference', _ref: logoDarkId }
        } : undefined,
        menuItems: [
            { _key: 'menu_1', label: "Inicio", link: "#inicio" },
            { _key: 'menu_2', label: "Servicios", link: "#servicios" },
            { _key: 'menu_3', label: "Portafolio", link: "#portafolio" },
            { _key: 'menu_4', label: "Tecnología", link: "#tecnologia" },
            { _key: 'menu_5', label: "Contacto", link: "#contacto" },
        ],
        // Contact Info
        email: 'contacto@noskygroup.com',
        phone: '55 4191 4393',
        phone2: '55 3231 1151',
        whatsapp: '525541914393',
        address: 'Ciudad de México, México. Atendemos proyectos en toda la República Mexicana',
        footerText: 'Expertos en captura y procesamiento de datos geoespaciales para ingeniería, arquitectura y construcción.',
        footerCopyright: 'Todos los derechos reservados.',
        socialLinks: [
            { _key: 'soc_1', platform: 'LinkedIn', url: 'https://linkedin.com' },
            { _key: 'soc_2', platform: 'Instagram', url: 'https://instagram.com' },
            { _key: 'soc_3', platform: 'Facebook', url: 'https://facebook.com' },
        ]
    }

    // 3. Create/Replace Document
    console.log('💾 Saving to Sanity...')
    const result = await client.createOrReplace(globalData)

    console.log('✅ Global Settings seeded successfully!')
    console.log('📄 Document ID:', result._id)
}

seedGlobalSettings()
