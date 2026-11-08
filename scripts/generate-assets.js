import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Minimal pure Node PNG generator
function createPngBuffer(width, height, pixelFn) {
  // RGBA buffer with filter byte per row (0 = None)
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = pixelFn(x, y, width, height);
      const pixelOffset = rowOffset + 1 + x * 4;
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const deflated = zlib.deflateSync(rawData);

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR Chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // bit depth 8
  ihdr.writeUInt8(6, 9); // RGBA
  ihdr.writeUInt8(0, 10); // compression
  ihdr.writeUInt8(0, 11); // filter
  ihdr.writeUInt8(0, 12); // interlace

  function makeChunk(type, data) {
    const typeBuf = Buffer.from(type, 'ascii');
    const len = data.length;
    const chunk = Buffer.alloc(4 + 4 + len + 4);
    chunk.writeUInt32BE(len, 0);
    typeBuf.copy(chunk, 4);
    data.copy(chunk, 8);

    // CRC32
    let crc = 0xffffffff;
    for (let i = 4; i < 8 + len; i++) {
      const byte = chunk[i];
      crc = (crc >>> 8) ^ crcTable[(crc ^ byte) & 0xff];
    }
    crc = (crc ^ 0xffffffff) >>> 0;
    chunk.writeUInt32BE(crc, 8 + len);
    return chunk;
  }

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', deflated);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// CRC Table for PNG
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) {
      c = 0xedb88320 ^ (c >>> 1);
    } else {
      c = c >>> 1;
    }
  }
  crcTable[n] = c;
}

// Brand Leaf Botanical Art for icon pixels
function renderBotanicalIcon(x, y, width, height, isMaskable = false) {
  const cx = width / 2;
  const cy = height / 2;
  const radius = width / 2;

  // Background Forest Green: #1E3A2B (30, 58, 43) or #315B43 (49, 91, 67)
  const bgR = 49, bgG = 91, bgB = 67;

  // If not maskable, we can round the corners slightly or fill
  const distFromCenter = Math.hypot(x - cx, y - cy);

  // Normalize coordinates (-1 to 1)
  const nx = (x - cx) / (width * 0.42);
  const ny = (y - cy) / (height * 0.42);

  // Draw elegant stylized Monstera/Sage leaf
  // Leaf stem and curves
  const leafDist = Math.hypot(nx, ny * 0.85);
  const inLeaf = (leafDist < 0.75) && (ny > -0.75 && ny < 0.85);

  // Central vein
  const isVein = inLeaf && Math.abs(nx - Math.sin(ny * 2) * 0.05) < 0.025;
  // Side veins
  const sideVein1 = inLeaf && Math.abs((ny + nx * 0.8) % 0.3) < 0.02 && nx > 0.05;
  const sideVein2 = inLeaf && Math.abs((ny - nx * 0.8) % 0.3) < 0.02 && nx < -0.05;

  if (inLeaf && !isVein && !sideVein1 && !sideVein2) {
    // Soft Sage Green Leaf: #A3C9A8 or #E8F0EB
    // Gradient along leaf height
    const t = (ny + 0.75) / 1.5;
    const r = Math.round(180 + t * 40);
    const g = Math.round(225 - t * 15);
    const b = Math.round(195 - t * 25);
    return [r, g, b, 255];
  } else if (isVein || sideVein1 || sideVein2) {
    // Crisp pale vein
    return [245, 250, 245, 255];
  }

  // Background
  return [bgR, bgG, bgB, 255];
}

// Generate Icons
console.log('Generating PWA Icons...');
const icon512 = createPngBuffer(512, 512, (x, y, w, h) => renderBotanicalIcon(x, y, w, h, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), icon512);

const icon192 = createPngBuffer(192, 192, (x, y, w, h) => renderBotanicalIcon(x, y, w, h, false));
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), icon192);

const iconMaskable = createPngBuffer(512, 512, (x, y, w, h) => renderBotanicalIcon(x, y, w, h, true));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), iconMaskable);

const appleIcon = createPngBuffer(180, 180, (x, y, w, h) => renderBotanicalIcon(x, y, w, h, false));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleIcon);

// Brand SVG Icon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="128" fill="#315B43"/>
  <path d="M256 96 C340 96 400 170 400 270 C400 370 330 416 256 416 C182 416 112 370 112 270 C112 170 172 96 256 96 Z" fill="#EAF1EC"/>
  <path d="M256 120 C256 120 256 390 256 400" stroke="#315B43" stroke-width="8" stroke-linecap="round"/>
  <path d="M256 220 C290 190 340 210 360 215" stroke="#315B43" stroke-width="6" stroke-linecap="round" fill="none"/>
  <path d="M256 260 C210 230 170 250 150 255" stroke="#315B43" stroke-width="6" stroke-linecap="round" fill="none"/>
  <path d="M256 310 C295 285 335 300 350 310" stroke="#315B43" stroke-width="6" stroke-linecap="round" fill="none"/>
  <circle cx="256" cy="115" r="8" fill="#547761"/>
</svg>`;
fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent);

console.log('PWA icons created successfully.');
