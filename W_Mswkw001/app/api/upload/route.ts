import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/src/utils/cloudinary';

export async function POST(request: NextRequest) {
  try {
    // Check Cloudinary environment variables
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error('Cloudinary environment variables are not set.');
      return NextResponse.json(
        { error: 'Cloudinary environment variables are not set.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
    }

    // Convert file to buffer for Cloudinary upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary with timeout
    const uploadPromise = uploadImage(buffer.toString('base64'), file.type);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Upload timeout')), 30000)
    );

    const imageUrl = await Promise.race([uploadPromise, timeoutPromise]);

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Upload error:', error);
    if (error instanceof Error && error.message === 'Upload timeout') {
      return NextResponse.json({ error: 'Upload timed out' }, { status: 408 });
    }
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
