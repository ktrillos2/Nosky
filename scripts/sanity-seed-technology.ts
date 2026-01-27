
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

const TECHNOLOGY_DATA = [
    {
        category: "Drones",
        icon: "Plane",
        items: [
            "DJI Matrice 350 RTK",
            "DJI Matrice 400",
            "DJI Matrice 4E",
            "DJI Mavic 3 E M",
            "DJI Mini 5 pro",
            "DJI Mini 4 pro",
        ],
    },
    {
        category: "Sensores",
        icon: "ScanLine",
        items: [
            "DJI Zenmuse L3",
            "DJI Zenmuse L2",
            "DJI Zenmuse L1",
            "DJI Zenmuse P1",
        ],
    },
    {
        category: "Escáneres",
        icon: "Box",
        items: [
            "Leica BLK 360",
            "Leica C10",
            "Faro Focus S",
            "Trimble TX8",
            "Satlab Cygnus Lite",
        ],
    },
    {
        category: "Topografía",
        icon: "Settings",
        items: [
            "Estación total (2mm + 2ppm, P.A. 2\")",
            "GNSS (RTK Y Postproceso)",
        ],
    },
    {
        category: "Software",
        icon: "Cpu",
        items: [
            "Agisoft MetaShape",
            "DJI Terra",
            "Revit",
            "Archicad",
            "Autocad",
            "CivilCad",
            "Civil3D",
        ],
    },
]

async function seedTechnology() {
    console.log('🚀 Starting Technology Section Migration...')

    // 1. Create Individual Technology Categories
    for (let i = 0; i < TECHNOLOGY_DATA.length; i++) {
        const cat = TECHNOLOGY_DATA[i]
        console.log(`Processing category: ${cat.category}...`)

        const docId = `tech_cat_${cat.category.replace(/\W/g, '').toLowerCase()}`

        const doc = {
            _id: docId,
            _type: 'technologyCategory',
            title: cat.category,
            icon: cat.icon,
            items: cat.items,
            order: i
        }

        await client.createOrReplace(doc)
    }

    // 2. Update the Singleton Config
    const configDoc = {
        _id: 'technologySection',
        _type: 'technologySection',
        title: "Equipamiento de Última Generación",
        subtitle: "Tecnología",
        description: "Invertimos constantemente en la mejor tecnología disponible para garantizar resultados de máxima precisión y calidad.",
    }

    console.log('💾 Saving Singleton Config...')
    await client.createOrReplace(configDoc)

    console.log('✅ Technology Section seeded successfully!')
}

seedTechnology()
