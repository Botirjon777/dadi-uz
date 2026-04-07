import sharp from 'sharp';
import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';

const IMAGE_DIR = 'public/images';
const QUALITY = 80;

async function optimizeImages() {
  console.log('🚀 Starting image optimization...');

  // Find all images (jpg, jpeg, png)
  const files = await glob(`${IMAGE_DIR}/**/*.{jpg,jpeg,png}`);
  console.log(`Found ${files.length} images to optimize.`);

  let totalSaved = 0;

  for (const file of files) {
    const stats = await fs.stat(file);
    const originalSize = stats.size;

    const extension = path.extname(file).toLowerCase();
    const tempFile = `${file}.tmp`;

    try {
      let pipeline = sharp(file);

      if (extension === '.png') {
        pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9, palette: true });
      } else {
        pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
      }

      await pipeline.toFile(tempFile);

      const optimizedStats = await fs.stat(tempFile);
      const optimizedSize = optimizedStats.size;

      if (optimizedSize < originalSize) {
        await fs.rename(tempFile, file);
        const saved = originalSize - optimizedSize;
        totalSaved += saved;
        console.log(`✅ ${file}: ${(saved / 1024 / 1024).toFixed(2)} MB saved (${((saved / originalSize) * 100).toFixed(1)}%)`);
      } else {
        await fs.unlink(tempFile);
        console.log(`ℹ️ ${file}: Already optimized.`);
      }

      // Also generate WebP version if it doesn't exist or is smaller
      const webpFile = file.replace(extension, '.webp');
      await sharp(file).webp({ quality: QUALITY }).toFile(webpFile);
      const webpStats = await fs.stat(webpFile);
      
      // If WebP is actually larger (rare but possible), maybe remove it? 
      // Usually WebP is smaller.
      console.log(`  - WebP generated: ${(webpStats.size / 1024).toFixed(2)} KB`);

    } catch (error) {
      console.error(`❌ Error optimizing ${file}:`, error.message);
      if (await fs.access(tempFile).then(() => true).catch(() => false)) {
        await fs.unlink(tempFile);
      }
    }
  }

  console.log('\n✨ Optimization complete!');
  console.log(`Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

optimizeImages().catch(console.error);
