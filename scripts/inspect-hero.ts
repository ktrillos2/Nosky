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

async function inspectHero() {
    const hero = await client.getDocument('hero')
    if (!hero || !hero.carouselImages) {
        console.log('No hero images found.')
        return
    }

    console.log('Current Hero Config:')
    hero.carouselImages.forEach((img: any, i: number) => {
        console.log(`[${i}] ${img.alt || 'No Alt'}`)
        console.log(`    Position: ${img.position}`)
        console.log(`    Fit: ${img.fit}`)
        console.log(`    Overlay: ${img.overlayColor}`)
        console.log(`    Asset Ref: ${img.image?.asset?._ref}`)
        console.log('---')
    })
}

inspectHero()
