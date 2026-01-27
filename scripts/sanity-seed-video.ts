
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

const VIDEO_FILE_PATH = "public/images/video-maqueta.MOV"

async function seedVideo() {
    console.log('🚀 Starting Video Section Migration...')

    const absolutePath = path.resolve(process.cwd(), VIDEO_FILE_PATH)

    let videoAssetId = null

    if (fs.existsSync(absolutePath)) {
        console.log(`Uploading video from ${VIDEO_FILE_PATH}... (This may take a moment)`)
        try {
            const buffer = fs.readFileSync(absolutePath)
            const asset = await client.assets.upload('file', buffer, {
                filename: path.basename(VIDEO_FILE_PATH),
                contentType: 'video/quicktime' // .MOV is usually video/quicktime
            })
            videoAssetId = asset._id
            console.log('✅ Video uploaded successfully!')
        } catch (error) {
            console.error('❌ Failed to upload video:', error)
        }
    } else {
        console.warn(`⚠️ Video file not found at ${absolutePath}`)
    }

    const configDoc = {
        _id: 'videoSection',
        _type: 'videoSection',
        title: "Tecnología en Acción",
        description: "Visualiza nuestros procesos y resultados",
        videoFile: videoAssetId ? { _type: "file", asset: { _type: "reference", _ref: videoAssetId } } : undefined,
    }

    console.log('💾 Saving Video Config...')
    await client.createOrReplace(configDoc)

    console.log('✅ Video Section seeded successfully!')
}

seedVideo()
