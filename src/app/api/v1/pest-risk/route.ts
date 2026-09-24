import { NextResponse } from 'next/server';
import { diseasePestDatabase } from '@/data/diseases';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const crop = searchParams.get('crop') || 'Rice';
  const state = searchParams.get('state') || 'Punjab';

  const pests = diseasePestDatabase.filter(
    (d) => d.type === 'Insect/Pest' && d.hostCrops.some((hc) => hc.toLowerCase().includes(crop.toLowerCase()))
  );

  return NextResponse.json({
    status: 'success',
    crop,
    state,
    surveillance_hub: 'State-Sentinel-Pheromone-Trap-Network',
    active_pest_risks: pests.map((p) => ({
      pest_id: p.id,
      common_name: p.commonName,
      scientific_name: p.scientificName,
      damage: p.damageDescription,
      favorable_conditions: p.favorableConditions,
      etl: p.economicThresholdLevel,
      recommended_ipm: p.integratedManagement,
    })),
  });
}
