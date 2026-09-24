import { NextResponse } from 'next/server';
import { demoSoilProfile } from '@/data/demoFarm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const farmId = searchParams.get('farm_id') || 'farm-pb-ldh-042';

  return NextResponse.json({
    status: 'success',
    farm_id: farmId,
    registry_source: 'National-Soil-Health-Card-DACFW',
    profile: demoSoilProfile,
  });
}
