const fs = require('fs');
const path = require('path');

// Basic PNG chunk reader to get dimensions
function getPngDimensions(filePath) {
    const fd = fs.openSync(filePath, 'r');
    const signature = Buffer.alloc(8);
    fs.readSync(fd, signature, 0, 8, 0);

    // Check PNG signature
    if (signature.toString('hex') !== '89504e470d0a1a0a') {
        console.log('Not a valid PNG file');
        fs.closeSync(fd);
        return;
    }

    const ihdr = Buffer.alloc(24); // read enough for IHDR
    fs.readSync(fd, ihdr, 0, 24, 8);
    fs.closeSync(fd);

    // IHDR chunk structure: Length (4) + Type (4) + Width (4) + Height (4)
    // We skipped length and type reading in previous readSync for simplicity, let's just grab width/height
    // Actually, let's read properly.
    // The first 4 bytes of IHDR data (after Length and Type) are Width.
    // Length of IHDR data is always 13 bytes.
    // So usually bytes 16-19 of the file are width, 20-23 are height if we count from 0.

    // Let's re-read simply:
    // Offset 16: Width (4 bytes big endian)
    // Offset 20: Height (4 bytes big endian)

    const buffer = Buffer.alloc(24);
    const fd2 = fs.openSync(filePath, 'r');
    fs.readSync(fd2, buffer, 0, 24, 0);
    fs.closeSync(fd2);

    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);

    console.log(`Dimensions: ${width}x${height}`);
}

getPngDimensions(path.join(process.cwd(), 'client/public/images/cursor.png'));
