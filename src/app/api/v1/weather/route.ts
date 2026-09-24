import { NextResponse } from 'next/server';
import { demoWeatherObservation } from '@/data/demoFarm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get('state') || 'Punjab';
  const district = searchParams.get('district') || 'Ludhiana';

  return NextResponse.json({
    status: 'success',
    state,
    district,
    telemetry_source: 'IMD-Agro-Met-Radar-Simulated',
    observation: demoWeatherObservation,
    agricultural_recommendation: 'Rain (12.5mm) likely within 24 hours. Consider delaying scheduled tubewell irrigation for 36-48 hours.',
  });
}
