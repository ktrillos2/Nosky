import { createClient } from '@sanity/client'
import sharp from 'sharp'
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

async function fixAndUpload() {
    console.log('🔧 Attempting to fix Capilla image...')

    const inputPath = path.join(__dirname, '../public/images/capilla.webp')
    const outputPath = path.join(__dirname, '../public/images/capilla-fixed.png')

    if (!fs.existsSync(inputPath)) {
        console.error('❌ Input file not found:', inputPath)
        return
    }

    try {
        // Convert to PNG to strip potential webp corruption/rotation header issues
        // We do NOT rotate here. We assume the *image data* might be valid but the header/container corrupted.
        // If it needs rotation, we should verify visual state first, but user said "aparece en negro" which implies corruption.

        await sharp(inputPath)
            .toFormat('png')
            .toFile(outputPath)

        console.log('✅ Converted to clean PNG:', outputPath)

        // Upload
        console.log('Uploading fixed image...')
        const fileStream = fs.createReadStream(outputPath)
        const asset = await client.assets.upload('image', fileStream, {
            filename: 'capilla-fixed.png'
        })
        console.log('✅ Asset uploaded:', asset._id)

        // Patch
        const hero = await client.getDocument('hero')
        const index = hero.carouselImages.findIndex((img: any) => img.alt === "Capilla histórica")

        if (index === -1) {
            console.error('❌ Capilla entry not found in Hero')
            return
        }

        console.log(`Patching index ${index}...`)
        await client
            .patch('hero')
            .set({
                [`carouselImages[${index}].image.asset._ref`]: asset._id,
                [`carouselImages[${index}].fit`]: "object-cover",
                // Reset position to center to be safe
                [`carouselImages[${index}].position`]: "object-center"
            })
            .commit()

        console.log('✅ Patch complete!')

    } catch (err) {
        console.error('❌ Error fixing image:', err)
    }
}

fixAndUpload()
