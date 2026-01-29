import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load env vars
dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-25'
const token = process.env.SANITY_API_TOKEN

if (!token || !projectId || !dataset) {
    console.error('Missing required environment variables.')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
})

const TEXT_DATA = {
    title: "Captura, Digitalización y Documentación Aérea y Terrestre",
    subtitle: "Transformamos espacios físicos en datos precisos mediante escaneo LiDAR, fotogrametría aérea y topografía de alta precisión. Soluciones integrales para ingeniería, arquitectura y construcción."
}

const IMAGES_DATA = [
    { src: "hero-add-cielo.webp", alt: "Vista aérea del cielo", position: "object-center" },
    { src: "mosaico-02.webp", alt: "Detalle de mosaico fotogramétrico", position: "object-center" },
    { src: "capilla.webp", alt: "Capilla histórica", position: "object-[center_60%]", fit: "object-cover", overlayColor: "bg-black/90" },
    { src: "nopales-cielo.webp", alt: "Paisaje de nopales bajo un cielo claro" },
    { src: "hero-add-siembra.webp", alt: "Campo de siembra y cultivo", position: "object-[center_30%]" },
    { src: "hero-add-piedras.webp", alt: "Terreno agreste y rocoso", position: "object-center" },
    { src: "pastizaje-2.webp", alt: "Vegetación y pastizales", position: "object-[center_30%]" },
    { src: "hero-add-montaña.webp", alt: "Vista de montaña y terreno", position: "object-[center_65%]" },
]

async function seed() {
    console.log('Start seeding Hero Section...')

    try {
        const carouselImages = []

        for (const img of IMAGES_DATA) {
            const filePath = path.join(process.cwd(), 'public', 'images', img.src)
            if (fs.existsSync(filePath)) {
                console.log(`Uploading ${img.src}...`)
                const fileStream = fs.createReadStream(filePath)
                const asset = await client.assets.upload('image', fileStream, {
                    filename: img.src
                })

                carouselImages.push({
                    _key: img.src.replace(/\W/g, ''), // Generate a key
                    image: {
                        _type: 'image',
                        asset: {
                            _type: 'reference',
                            _ref: asset._id
                        }
                    },
                    alt: img.alt,
                    position: img.position,
                    fit: img.fit,
                    overlayColor: img.overlayColor
                })
            } else {
                console.warn(`File not found: ${img.src}`)
            }
        }

        const doc = {
            _id: 'hero', // Singleton ID
            _type: 'hero',
            title: TEXT_DATA.title,
            subtitle: TEXT_DATA.subtitle,
            carouselImages
        }

        console.log('Creating hero document...')
        const result = await client.createOrReplace(doc)
        console.log('Hero Section created:', result._id)

    } catch (error) {
        console.error('Error seeding hero data:', error)
    }
}

seed()
