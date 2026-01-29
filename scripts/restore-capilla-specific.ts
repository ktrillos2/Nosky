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

async function restoreCapillaFinal() {
    console.log('🚀 Restoring Capilla from local capilla.webp (Converted to JPG)...')

    const sourcePath = path.join(__dirname, '../public/images/capilla.webp')
    const destPath = path.join(__dirname, '../public/images/capilla-restored.jpg')

    if (!fs.existsSync(sourcePath)) {
        console.error(`❌ Source file not found: ${sourcePath}`)
        return
    }

    try {
        // Convert to JPG to ensure no alpha/weird profile issues causing black screen
        await sharp(sourcePath)
            .toFormat('jpeg', { quality: 90 })
            .toFile(destPath)

        console.log('✅ Converted to JPG:', destPath)

        // Upload
        const fileStream = fs.createReadStream(destPath)
        const asset = await client.assets.upload('image', fileStream, {
            filename: 'capilla-restored.jpg'
        })
        console.log('✅ Asset uploaded:', asset._id)

        // Patch Hero
        const hero = await client.getDocument('hero')
        if (!hero || !hero.carouselImages) {
            console.error('hero doc missing')
            return
        }

        let images = [...hero.carouselImages]

        // Ensure Mosaico-02 is gone
        images = images.filter((img: any) => img.alt !== "Detalle de mosaico fotogramétrico")

        // Update Capilla
        const capillaIndex = images.findIndex((img: any) => img.alt === "Capilla histórica")
        if (capillaIndex !== -1) {
            images[capillaIndex].image = {
                _type: 'image',
                asset: { _type: 'reference', _ref: asset._id }
            }
            images[capillaIndex].fit = "object-cover"
            // Reset position just in case
            images[capillaIndex].position = "object-center"
            console.log('Updated Capilla entry.')
        } else {
            console.error('❌ Capilla entry not found to update!')
        }

        await client
            .patch('hero')
            .set({ carouselImages: images })
            .commit()

        console.log('✅ Hero updated successfully!')

    } catch (error) {
        console.error('❌ Error processing image:', error)
    }
}

restoreCapillaFinal()
