import { createClient } from 'next-sanity'
import sharp from 'sharp'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import https from 'https'

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-25'
const token = process.env.SANITY_API_TOKEN

if (!token) {
    console.error('Error: SANITY_API_TOKEN is not set in .env.local')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
})

async function downloadImage(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            const data = []
            res.on('data', (chunk) => data.push(chunk))
            res.on('end', () => resolve(Buffer.concat(data)))
            res.on('error', reject)
        })
    })
}

async function rotateImage(buffer) {
    return sharp(buffer).rotate(90).toBuffer()
}

async function uploadImage(buffer) {
    return client.assets.upload('image', buffer)
}

async function main() {
    try {
        console.log('Fetching hero document...')
        const hero = await client.fetch('*[_type == "hero"][0]')

        if (!hero || !hero.carouselImages || hero.carouselImages.length === 0) {
            console.log('No hero document or images found.')
            return
        }

        console.log(`Found ${hero.carouselImages.length} images. Processing...`)

        const newCarouselImages = []

        for (const item of hero.carouselImages) {
            if (!item.image?.asset?._ref) {
                console.log('Skipping item without image asset')
                newCarouselImages.push(item)
                continue
            }

            // Get the image URL
            const asset = await client.getDocument(item.image.asset._ref)
            const imageUrl = asset.url

            console.log(`Downloading image: ${imageUrl}`)
            const imageBuffer = await downloadImage(imageUrl)

            console.log('Rotating image...')
            const rotatedBuffer = await rotateImage(imageBuffer)

            console.log('Uploading rotated image...')
            const newAsset = await uploadImage(rotatedBuffer)
            console.log(`Uploaded new asset: ${newAsset._id}`)

            // Construct new item with updated asset reference
            newCarouselImages.push({
                ...item,
                image: {
                    ...item.image,
                    asset: {
                        _type: 'reference',
                        _ref: newAsset._id
                    }
                }
            })
        }

        console.log('Updating hero document...')
        await client
            .patch(hero._id)
            .set({ carouselImages: newCarouselImages })
            .commit()

        console.log('Successfully rotated and updated hero images!')
    } catch (error) {
        console.error('Error:', error)
    }
}

main()
