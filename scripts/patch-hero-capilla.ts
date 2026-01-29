import { createClient } from '@sanity/client'
import fs from 'fs'
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

async function patchCapilla() {
    console.log('🚀 Starting Capilla Patch...')

    // 1. Upload the rotated local image
    const imagePath = path.join(__dirname, '../public/images/capilla.webp')
    if (!fs.existsSync(imagePath)) {
        console.error('❌ File not found:', imagePath)
        return
    }

    console.log('Uploading updated capilla.webp...')
    const fileStream = fs.createReadStream(imagePath)
    const asset = await client.assets.upload('image', fileStream, {
        filename: 'capilla.webp'
    })
    console.log('✅ Asset uploaded:', asset._id)

    // 2. Fetch current Hero doc
    const hero = await client.getDocument('hero')
    if (!hero || !hero.carouselImages) {
        console.error('❌ Hero document or images not found')
        return
    }

    // 3. Find the Capilla item index
    const capillaIndex = hero.carouselImages.findIndex((img: any) => img.alt === "Capilla histórica")

    if (capillaIndex === -1) {
        console.error('❌ "Capilla histórica" not found in carousel. Available items:', hero.carouselImages.map((i: any) => i.alt))
        return
    }

    console.log(`Found Capilla at index ${capillaIndex}. keys:`, Object.keys(hero.carouselImages[capillaIndex]))

    // 4. Patch only that index
    // We use the array syntax safely since we just found the index in the current live doc
    const patchOp = {
        [`carouselImages[${capillaIndex}].image`]: {
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: asset._id
            }
        },
        [`carouselImages[${capillaIndex}].fit`]: "object-cover",
        [`carouselImages[${capillaIndex}].position`]: "object-[center_60%]"
    }

    console.log('Applying patch:', patchOp)

    await client
        .patch('hero')
        .set(patchOp)
        .commit()

    console.log('✅ Capilla updated successfully!')
}

patchCapilla()
