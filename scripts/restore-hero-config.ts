import { createClient } from '@sanity/client'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../.env.local') })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-25',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
})

const CONFIG_MAP: any = {
    "Vista aérea del cielo": { position: "object-center" },
    "Capilla histórica": {
        position: "object-[center_60%]",
        fit: "object-cover",
        overlayColor: "bg-black/90"
    },
    // "Paisaje de nopales bajo un cielo claro" - had no specific config in original file
    "Campo de siembra y cultivo": { position: "object-[center_30%]" },
    "Terreno agreste y rocoso": { position: "object-center" },
    "Vegetación y pastizales": { position: "object-[center_30%]" },
    "Vista de montaña y terreno": { position: "object-[center_65%]" }
}

async function restoreConfig() {
    console.log('🚀 Restoring Hero Configuration...')

    const hero = await client.getDocument('hero')
    if (!hero || !hero.carouselImages) {
        console.error('hero doc missing')
        return
    }

    let images = [...hero.carouselImages]
    let updates = 0

    images = images.map((img: any) => {
        const config = CONFIG_MAP[img.alt]
        if (config) {
            console.log(`Restoring config for: ${img.alt}`)
            // Merge existing img with restored config
            // We do NOT overwrite the image asset itself, just the metadata
            updates++
            return {
                ...img,
                ...config
            }
        }
        return img
    })

    if (updates > 0) {
        await client
            .patch('hero')
            .set({ carouselImages: images })
            .commit()
        console.log(`✅ Restored configuration for ${updates} images.`)
    } else {
        console.log('No configuration updates needed.')
    }
}

restoreConfig()
