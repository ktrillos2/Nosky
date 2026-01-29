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

async function restoreCapilla() {
    console.log('🚀 Restoring Capilla from project files...')

    // 1. Identify the source file
    // "portfolio-church.webp" is a likely candidate for "Capilla"
    const sourceFile = 'portfolio-church.webp'
    const sourcePath = path.join(__dirname, '../public/images', sourceFile)

    if (!fs.existsSync(sourcePath)) {
        console.error(`❌ Source file not found: ${sourceFile}`)
        return
    }

    console.log(`Using ${sourceFile} as the source for Capilla.`)

    // 2. Upload the file
    const fileStream = fs.createReadStream(sourcePath)
    const asset = await client.assets.upload('image', fileStream, {
        filename: sourceFile
    })
    console.log('✅ Asset uploaded:', asset._id)

    // 3. Patch Hero
    const hero = await client.getDocument('hero')
    if (!hero || !hero.carouselImages) return

    let images = [...hero.carouselImages]

    // Remove Mosaico (ensure it's gone)
    images = images.filter((img: any) => img.alt !== "Detalle de mosaico fotogramétrico")

    // Update Capilla
    const capillaIndex = images.findIndex((img: any) => img.alt === "Capilla histórica")
    if (capillaIndex !== -1) {
        images[capillaIndex].image = {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id }
        }
        images[capillaIndex].fit = "object-cover"
        // Try neutral position first, user complained about rotation
        images[capillaIndex].position = "object-center"
        console.log('Updated Capilla entry.')
    } else {
        console.warn('⚠️ Capilla entry not found in carousel to update.')
    }

    await client
        .patch('hero')
        .set({ carouselImages: images })
        .commit()

    console.log('✅ Hero restored!')
}

restoreCapilla()
