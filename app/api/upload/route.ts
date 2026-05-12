import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ success: false, error: 'File is required' }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    data: {
      url: `/uploads/${file.name}`,
      size: file.size,
      mimeType: file.type,
    },
  });
}
