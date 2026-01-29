import { createClient } from '@sanity/client'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env.local') })

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

async function removeMosaico() {
    console.log('🚀 Checking Hero for mosaico-02...')

    const hero = await client.getDocument('hero')
    if (!hero || !hero.carouselImages) {
        console.error('❌ Hero document or images not found')
        return
    }

    const initialLength = hero.carouselImages.length

    // Filter out mosaico-02
    // We check against 'alt' or if we can identify it by another means. 
    // The previous seed script used alt: "Detalle de mosaico fotogramétrico" for mosaico-02.
    // Or we can check the filename if we had that, but here we have refs.
    // Let's rely on the Alt text if possible, or try to infer.
    // Ideally we should know the ID, but we don't.
    // Let's filter by alt text "Detalle de mosaico fotogramétrico".

    const newImages = hero.carouselImages.filter((img: any) => img.alt !== "Detalle de mosaico fotogramétrico")

    if (newImages.length === initialLength) {
        console.log('⚠️ Image "Detalle de mosaico fotogramétrico" not found. Nothing to remove.')
        // Double check by filename if possible via expansion? No, too complex.
        return
    }

    console.log(`Removing ${initialLength - newImages.length} image(s). Updating Hero...`)

    await client
        .patch('hero')
        .set({ carouselImages: newImages })
        .commit()

    console.log('✅ Removed mosaico-02 successfully!')
}

removeMosaico()
