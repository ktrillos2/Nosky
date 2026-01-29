import { createClient } from '@sanity/client'
import fs from 'fs'
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

async function cleanAndFixHero() {
    console.log('🚀 Starting Hero Cleanup & Fix...')

    const hero = await client.getDocument('hero')
    if (!hero || !hero.carouselImages) {
        console.error('❌ Hero document not found')
        return
    }

    let images = [...hero.carouselImages]
    console.log(`Initial count: ${images.length}`)

    // 1. Remove Mosaico-02
    // Filter by filename pattern or alt text
    const beforeCount = images.length
    images = images.filter((img: any) => {
        // Check alt text
        if (img.alt && (img.alt.includes('mosaico') || img.alt.includes('Mosaico'))) {
            // Check if it's the specific mosaico-02 one (detached/detail)
            // The user said "mosaico-02". In seed script it was "Detalle de mosaico fotogramétrico".
            if (img.alt === "Detalle de mosaico fotogramétrico") return false
        }
        return true
    })

    if (images.length < beforeCount) {
        console.log(`🗑️ Removed ${beforeCount - images.length} image(s) (Mosaico).`)
    } else {
        console.log('⚠️ Mosaico image not found, skipping removal.')
    }

    // 2. Upload New Capilla Image
    const imagePath = path.join(__dirname, '../public/images/capilla-final.png')
    let capillaAssetId = null

    if (fs.existsSync(imagePath)) {
        console.log('Uploading fresh capilla-final.png...')
        const fileStream = fs.createReadStream(imagePath)
        const asset = await client.assets.upload('image', fileStream, {
            filename: 'capilla-final.png'
        })
        capillaAssetId = asset._id
        console.log('✅ Capilla uploaded:', capillaAssetId)
    } else {
        console.error('❌ capilla-final.png not found!')
    }

    // 3. Update Capilla Entry
    if (capillaAssetId) {
        const capillaIndex = images.findIndex((img: any) => img.alt === "Capilla histórica")
        if (capillaIndex !== -1) {
            console.log(`Updating Capilla at index ${capillaIndex}...`)
            images[capillaIndex].image = {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: capillaAssetId
                }
            }
            images[capillaIndex].fit = "object-cover"
            images[capillaIndex].position = "object-center" // Reset position

            // Remove ANY orientation metadata if possible (handled by saving clean PNG)
        } else {
            console.error('❌ Capilla entry not found in the list!')
        }
    }

    // 4. Commit Changes
    console.log('💾 Saving changes to Sanity...')
    await client
        .patch('hero')
        .set({ carouselImages: images })
        .commit()

    console.log('✨ All done! Mosaico removed, Capilla fixed.')
}

cleanAndFixHero()
