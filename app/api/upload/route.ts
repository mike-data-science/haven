import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/roles';
import prisma from '@/lib/db';
import crypto from 'crypto';
import { put } from '@vercel/blob';

const ALLOWED_TYPES: Record<string, string[]> = {
  'image/jpeg': ['jpg', 'jpeg'],
  'image/png': ['png'],
  'image/webp': ['webp'],
  'image/gif': ['gif'],
};

const ALLOWED_EXTENSIONS = new Set(
  Object.values(ALLOWED_TYPES).flat()
);

// Magic byte signatures for allowed image types
const MAGIC_BYTES: Array<{ mime: string; bytes: number[] }> = [
  { mime: 'image/jpeg', bytes: [0xFF, 0xD8, 0xFF] },
  { mime: 'image/png', bytes: [0x89, 0x50, 0x4E, 0x47] },
  { mime: 'image/webp', bytes: [0x52, 0x49, 0x46, 0x46] }, // RIFF header
  { mime: 'image/gif', bytes: [0x47, 0x49, 0x46] },          // GIF
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_FILES_PER_REQUEST = 10;

function detectMimeFromBytes(buffer: Buffer): string | null {
  for (const sig of MAGIC_BYTES) {
    if (sig.bytes.every((byte, i) => buffer[i] === byte)) {
      return sig.mime;
    }
  }
  return null;
}

export async function POST(request: Request) {
  try {
    // Only logged in users (any role) can upload, since Agents need to upload photos
    const user = await requireRole(['ADMIN', 'AGENT', 'USER']);

    const formData = await request.formData();
    const propertyIdStr = formData.get('propertyId') as string;
    const propertyId = Number(propertyIdStr);

    if (!propertyId || isNaN(propertyId)) {
      return NextResponse.json({ error: 'Valid propertyId is required' }, { status: 400 });
    }

    // Verify ownership of the property (unless ADMIN)
    const property = await prisma.property.findUnique({
      where: { id: propertyId }
    });

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    if (user.role !== 'ADMIN' && property.userId !== user.id) {
      return NextResponse.json({ error: 'You do not have permission to upload photos for this property' }, { status: 403 });
    }

    const files = formData.getAll('files') as File[];
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    if (files.length > MAX_FILES_PER_REQUEST) {
      return NextResponse.json(
        { error: `Maximum ${MAX_FILES_PER_REQUEST} files per upload` },
        { status: 400 }
      );
    }

    const savedImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // 1. Size check
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds the ${MAX_FILE_SIZE / (1024 * 1024)} MB size limit` },
          { status: 400 }
        );
      }

      // 2. Extension check
      const extension = (file.name.split('.').pop() || '').toLowerCase();
      if (!ALLOWED_EXTENSIONS.has(extension)) {
        return NextResponse.json(
          { error: `File type ".${extension}" is not allowed. Accepted: ${[...ALLOWED_EXTENSIONS].join(', ')}` },
          { status: 400 }
        );
      }

      // 3. MIME type check
      if (!ALLOWED_TYPES[file.type]) {
        return NextResponse.json(
          { error: `MIME type "${file.type}" is not allowed` },
          { status: 400 }
        );
      }

      // 4. Verify extension matches the declared MIME type
      if (!ALLOWED_TYPES[file.type].includes(extension)) {
        return NextResponse.json(
          { error: `Extension ".${extension}" does not match MIME type "${file.type}"` },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());

      // 5. Magic byte verification
      const detectedMime = detectMimeFromBytes(buffer);
      if (!detectedMime || detectedMime !== file.type) {
        return NextResponse.json(
          { error: `File "${file.name}" content does not match its declared type` },
          { status: 400 }
        );
      }

      // Generate a unique filename with validated extension
      const filename = `${crypto.randomUUID()}.${extension}`;

      // Upload to Vercel Blob instead of local filesystem
      const blob = await put(filename, buffer, {
        access: 'public',
        contentType: file.type,
      });

      // Save to Prisma
      const imageRecord = await prisma.image.create({
        data: {
          url: blob.url,
          alt: file.name.replace(/\.[^.]+$/, ''), // Strip extension from alt text
          order: i,
          propertyId,
        }
      });
      
      savedImages.push(imageRecord);
    }

    return NextResponse.json({ success: true, images: savedImages }, { status: 201 });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error during upload' },
      { status: 500 }
    );
  }
}
