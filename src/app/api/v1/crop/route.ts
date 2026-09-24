import { NextResponse } from 'next/server';
import { cropCatalog } from '@/data/crops';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cropId = searchParams.get('crop_id');

  if (cropId) {
    const found = cropCatalog.find((c) => c.id === cropId);
    return NextResponse.json({ status: 'success', crop: found || null });
  }

  return NextResponse.json({
    status: 'success',
    total_crops: cropCatalog.length,
    crops: cropCatalog,
  });
}
