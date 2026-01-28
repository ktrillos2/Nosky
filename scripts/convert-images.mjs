import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Go up one level from scripts/ to root, then into public/
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

async function convertImages(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            await convertImages(filePath);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                // Skip icons/favicons usually kept as png/ico for compatibility, 
                // but user asked for "all images". Let's apply judgment: 
                // Favicons are often specific. 
                // Let's explicitly skip 'favicon.ico' (not png/jpg anyway)
                // Skip 'apple-icon.png' or similar if we fear compatibility, 
                // but user said "all". Let's stick to "all" but maybe check if 'icon' is in name?
                // Actually, browsers support webp mostly everywhere now, but manifest might need png.
                // Let's convert everything as requested, but maybe keep original for crucial metadata files IF simple.
                // User said "cambia el formato de TODAS". I will obey.

                const newFilePath = filePath.substring(0, filePath.lastIndexOf('.')) + '.webp';

                console.log(`Converting: ${filePath} -> ${newFilePath}`);

                try {
                    await sharp(filePath)
                        .toFormat('webp', { quality: 80 })
                        .toFile(newFilePath);

                    // Verify the new file exists before deleting old
                    if (fs.existsSync(newFilePath)) {
                        fs.unlinkSync(filePath);
                        console.log(`Deleted original: ${filePath}`);
                    }
                } catch (err) {
                    console.error(`Error converting ${filePath}:`, err);
                }
            }
        }
    }
}

console.log(`Starting conversion in ${PUBLIC_DIR}...`);
convertImages(PUBLIC_DIR)
    .then(() => console.log('All done!'))
    .catch(err => console.error('Fatal error:', err));
