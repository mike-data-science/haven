import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/roles';
import prisma from '@/lib/db';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';
import { mkdir } from 'fs/promises';

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

    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    // Ensure directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // Ignore if it exists
    }

    const savedImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const buffer = Buffer.from(await file.arrayBuffer());
      
      // Generate a unique filename
      const extension = file.name.split('.').pop() || 'jpg';
      const filename = `${crypto.randomUUID()}.${extension}`;
      const filepath = join(uploadDir, filename);

      // Write to public/uploads
      await writeFile(filepath, buffer);

      // Public URL to store in DB
      const publicUrl = `/uploads/${filename}`;

      // Save to Prisma
      const imageRecord = await prisma.image.create({
        data: {
          url: publicUrl,
          alt: file.name,
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
      { error: 'Failed to upload files', detail: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
