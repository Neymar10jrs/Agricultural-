import { NextResponse } from 'next/server';
import { initialAdvisories } from '@/data/advisories';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const farmId = searchParams.get('farm_id') || 'farm-pb-ldh-042';

  return NextResponse.json({
    status: 'success',
    farm_id: farmId,
    generated_at: new Date().toISOString(),
    total_advisories: initialAdvisories.length,
    advisories: initialAdvisories,
  });
}
