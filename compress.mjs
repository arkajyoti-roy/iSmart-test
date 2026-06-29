import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const dir = 'public';

async function processDirectory(directory) {
  const files = await fs.readdir(directory, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(directory, file.name);
    
    if (file.isDirectory()) {
      await processDirectory(fullPath);
    } else if (file.isFile() && /\.(png|jpe?g)$/i.test(file.name)) {
      console.log(`Compressing ${fullPath}...`);
      const tempPath = fullPath + '.tmp';
      
      try {
        if (file.name.toLowerCase().endsWith('.png')) {
          await sharp(fullPath).png({ quality: 80, compressionLevel: 9, effort: 10 }).toFile(tempPath);
        } else {
          await sharp(fullPath).jpeg({ quality: 80, mozjpeg: true }).toFile(tempPath);
        }
        await fs.rename(tempPath, fullPath);
      } catch (err) {
        console.error(`Error compressing ${fullPath}:`, err);
      }
    }
  }
}

console.log('Starting image compression...');
processDirectory(dir).then(() => {
  console.log('Finished compressing all images in the public directory!');
}).catch(console.error);
