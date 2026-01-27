
import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

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

const PORTFOLIO_ITEMS = [
    {
        title: "Vuelo LiDAR",
        category: "Captura Aérea",
        description: "Ejecución de operacion con Dron DJI Matrice 350 Equipado con sensor L2 logrando la captura de datos de una gran superficie a bajo costo.",
        imagePath: "public/images/portfolio-drone.jpg",
        tech: ["DJI Enterprise", "LiDAR", "Nube de Puntos"],
        className: "object-[center_80%] brightness-130",
    },
    {
        title: "Documentación de Patrimonio",
        category: "Arquitectura",
        description: "Documentación digital de edificaciones históricas mediante levantamiento de alta precisión para proyectos de restauración y conservación.",
        imagePath: "public/images/gallery-arch.jpg",
        tech: ["#Conservación #Digitalización #Historica"],
    },
    {
        title: "Levantamiento y Análisis Topográfico",
        category: "Topografía",
        description: "Trabajo de campo en entornos desafiantes, garantizando mediciones exactas sin importar las condiciones del terreno.",
        imagePath: "public/images/terreno-agreste.JPG",
        tech: ["GNSS", "Geodesia"],
        className: "object-[center_60%]",
    },
    {
        title: "Topografía y Análisis de Terreno Agrícola",
        category: "Fotogrametría",
        description: "Aplicación de tecnología topográfica en sectores agrícolas y rurales para planificación de cultivos, parcelas y descripción en documentación legal.",
        imagePath: "public/images/portfolio-cactus.jpg",
        tech: ["Estación Total", "Planeación", "Planimetría"],
    },
    {
        title: "Georreferenciación",
        category: "Geodesia",
        description: "Colocación de puntos de control y levantamiento mediante GNSS en entornos urbanos, rurales y viales para la correcta Obtención la posición geográfica absoluta.",
        imagePath: "public/images/feature-gps.jpg",
        tech: ["#GNSS #INEGI #RGNA"],
    },
    {
        title: "Escaneo 3D",
        category: "Escaneo 3D",
        description: "Captura de nube de puntos de alta precisión para analisis estructural y espacial.",
        imagePath: "public/images/escaneo-de-estructuras.JPG",
        tech: ["LiDAR", "Nube de Puntos", "Ingeniería"],
    },
]

async function uploadImage(filePath: string) {
    try {
        const absolutePath = path.resolve(process.cwd(), filePath)
        if (!fs.existsSync(absolutePath)) {
            console.warn(`⚠️ Image not found at ${absolutePath}, skipping image upload.`)
            return null
        }
        const buffer = fs.readFileSync(absolutePath)
        const asset = await client.assets.upload('image', buffer, {
            filename: path.basename(filePath)
        })
        return asset._id
    } catch (error) {
        console.error(`❌ Failed to upload image ${filePath}:`, error)
        return null
    }
}

async function seedPortfolio() {
    console.log('🚀 Starting Portfolio Section Migration...')

    // 1. Create Individual Portfolio Items
    for (let i = 0; i < PORTFOLIO_ITEMS.length; i++) {
        const item = PORTFOLIO_ITEMS[i]
        console.log(`Processing item: ${item.title}...`)

        let imageAssetId = null
        if (item.imagePath) {
            imageAssetId = await uploadImage(item.imagePath)
        }

        const docId = `portfolio_item_${i}`

        const doc = {
            _id: docId,
            _type: 'portfolioItem',
            title: item.title,
            category: item.category,
            description: item.description,
            image: {
                _type: 'image',
                asset: imageAssetId ? { _type: "reference", _ref: imageAssetId } : undefined,
                className: item.className // Passing custom class name if available
            },
            tech: item.tech,
            order: i
        }

        await client.createOrReplace(doc)
    }

    // 2. Update the Singleton Config
    const configDoc = {
        _id: 'portfolioSection',
        _type: 'portfolioSection',
        title: "Proyectos que Digitalizan la Realidad",
        subtitle: "Portafolio",
        description: "Cada proyecto es una oportunidad para demostrar nuestra precisión y compromiso con la excelencia técnica.",
    }

    console.log('💾 Saving Portfolio Config...')
    await client.createOrReplace(configDoc)

    console.log('✅ Portfolio Section seeded successfully!')
}

seedPortfolio()
