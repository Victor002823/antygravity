import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = 'C:\\Users\\NAVI\\Downloads\\1777455608865.png';
const outputPath = path.join(__dirname, '..', 'public', 'images', 'logo.png');

async function removeWhiteBackground() {
  try {
    const { data, info } = await sharp(inputPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { width, height, channels } = info;

    // Flood-fill from borders with very generous thresholds
    const visited = new Uint8Array(width * height);
    
    // Use an iterative approach with an array-based stack to avoid recursion issues
    const stack = [];
    
    function isLightPixel(idx) {
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const brightness = (r + g + b) / 3;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const saturation = max > 0 ? (max - min) / max : 0;
      
      // Very aggressive: anything with brightness > 170 and low saturation
      return brightness > 170 && saturation < 0.20;
    }

    // Seed all border pixels
    for (let x = 0; x < width; x++) {
      stack.push(x); // top row
      stack.push((height - 1) * width + x); // bottom row
    }
    for (let y = 0; y < height; y++) {
      stack.push(y * width); // left column
      stack.push(y * width + width - 1); // right column
    }

    // BFS flood fill
    while (stack.length > 0) {
      const pos = stack.pop();
      if (pos < 0 || pos >= width * height) continue;
      if (visited[pos]) continue;
      visited[pos] = 1;

      const idx = pos * channels;
      if (!isLightPixel(idx)) continue;

      data[idx + 3] = 0; // Make transparent

      const x = pos % width;
      const y = Math.floor(pos / width);

      if (x > 0) stack.push(pos - 1);
      if (x < width - 1) stack.push(pos + 1);
      if (y > 0) stack.push(pos - width);
      if (y < height - 1) stack.push(pos + width);
    }

    // Edge smoothing pass
    const smoothed = Buffer.from(data);
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * channels;
        if (data[idx + 3] === 0) continue;

        // Count transparent neighbors (8-connected)
        let transparentCount = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nIdx = ((y + dy) * width + (x + dx)) * channels;
            if (data[nIdx + 3] === 0) transparentCount++;
          }
        }

        if (transparentCount >= 3) {
          const brightness = (data[idx] + data[idx+1] + data[idx+2]) / 3;
          if (brightness > 160) {
            // Make near-white edge pixels more transparent
            smoothed[idx + 3] = Math.min(data[idx + 3], Math.round(Math.max(0, (255 - brightness) * 4)));
          } else if (transparentCount >= 5) {
            // For darker edge pixels, reduce alpha slightly
            smoothed[idx + 3] = Math.round(data[idx + 3] * 0.7);
          }
        }
      }
    }

    await sharp(smoothed, { raw: { width, height, channels: 4 } })
      .png({ compressionLevel: 9 })
      .toFile(outputPath);

    // Verify: count transparent vs opaque pixels
    let transparent = 0, opaque = 0;
    for (let i = 0; i < smoothed.length; i += channels) {
      if (smoothed[i + 3] === 0) transparent++;
      else opaque++;
    }
    console.log(`✅ Logo saved: ${outputPath}`);
    console.log(`   Dimensions: ${width}x${height}`);
    console.log(`   Transparent pixels: ${transparent} (${Math.round(transparent/(transparent+opaque)*100)}%)`);
    console.log(`   Opaque pixels: ${opaque} (${Math.round(opaque/(transparent+opaque)*100)}%)`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

removeWhiteBackground();
