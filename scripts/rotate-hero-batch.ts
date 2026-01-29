import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/images');
const ANGLE = 90;

const FILES_TO_ROTATE = [
    'hero-add-cielo.webp',
    'capilla.webp',
    'nopales-cielo.webp',
    'hero-add-siembra.webp',
    'hero-add-piedras.webp',
    'pastizaje-2.webp',
    'hero-add-montaña.webp'
];

async function rotateBatch() {
    console.log('🚀 Starting batch rotation...');

    for (const filename of FILES_TO_ROTATE) {
        const filePath = path.join(IMAGES_DIR, filename);
        if (!fs.existsSync(filePath)) {
            console.warn(`⚠️ File not found: ${filename}`);
            continue;
        }

        const tempPath = path.join(IMAGES_DIR, `temp_${filename}`);
        try {
            console.log(`Rotating ${filename}...`);
            await sharp(filePath).rotate(ANGLE).toFile(tempPath);
            fs.unlinkSync(filePath);
            fs.renameSync(tempPath, filePath);
            console.log(`✅ Fixed ${filename}`);
        } catch (error) {
            console.error(`❌ Error rotating ${filename}:`, error);
        }
    }
    console.log('✨ Batch rotation complete.');
}

rotateBatch();
