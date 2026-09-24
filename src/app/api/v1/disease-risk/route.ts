import { NextResponse } from 'next/server';
import { diseasePestDatabase } from '@/data/diseases';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const crop = searchParams.get('crop') || 'Wheat';
  const state = searchParams.get('state') || 'Punjab';

  const diseases = diseasePestDatabase.filter(
    (d) => d.type.includes('Disease') && d.hostCrops.some((hc) => hc.toLowerCase().includes(crop.toLowerCase()))
  );

  return NextResponse.json({
    status: 'success',
    crop,
    state,
    surveillance_hub: 'ICAR-NCIPM-Epidemiological-Surveillance',
    active_disease_risks: diseases.map((d) => ({
      disease_id: d.id,
      common_name: d.commonName,
      scientific_name: d.scientificName,
      risk_severity: 'moderate',
      favorable_conditions: d.favorableConditions,
      etl: d.economicThresholdLevel,
      recommended_ipm: d.integratedManagement,
    })),
  });
}
