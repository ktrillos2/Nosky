
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

const PROJECTS_DATA = [
    {
        src: "portfolio-landscape.jpg",
        alt: "Vista panorámica de proyecto topográfico en campo",
        className: "object-[center_35%]",
    },
    {
        src: "carrusel-1.JPG",
        alt: "Proyecto de topografía y medición en campo",
        className: "object-[center_35%]",
    },
    {
        src: "carrusel-2.JPG",
        alt: "Equipo de trabajo en levantamiento topográfico",
    },
    {
        src: "IMG-19018.png",
        alt: "Captura de datos geoespaciales con tecnología avanzada",
    },
]

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

async function seedGallery() {
    console.log('🚀 Starting Project Gallery Migration...')

    // 1. Create Individual Project Documents
    for (const project of PROJECTS_DATA) {
        console.log(`Processing project image: ${project.src}...`)

        const assetId = await uploadImage(project.src)
        let imageRef = undefined
        if (assetId) {
            imageRef = {
                _type: 'image',
                asset: { _type: 'reference', _ref: assetId }
            }
        }

        const docId = project.src.replace(/\W/g, '').toLowerCase()

        const projectDoc = {
            _id: docId,
            _type: 'project',
            title: project.alt, // Use alt text as the internal title
            alt: project.alt,
            className: project.className,
            image: imageRef,
        }

        await client.createOrReplace(projectDoc)
    }

    // 2. Update the Singleton Config (Title/Subtitle only)
    const configDoc = {
        _id: 'projectGallery',
        _type: 'projectGallery',
        title: "Galería de Proyectos",
        subtitle: "Nuestra experiencia en campo capturada en imágenes.",
    }

    console.log('💾 Saving Singleton Config...')
    await client.createOrReplace(configDoc)

    console.log('✅ Project Gallery seeded successfully!')
}

seedGallery()
