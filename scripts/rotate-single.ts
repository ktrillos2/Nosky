import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagePath = path.join(__dirname, '../public/images/capilla.webp');

async function rotate() {
    console.log(`Rotating ${imagePath}...`);
    const buffer = await sharp(imagePath).rotate(90).toBuffer();
    fs.writeFileSync(imagePath, buffer);
    console.log('✅ Rotation complete.');
}

rotate().catch(console.error);
