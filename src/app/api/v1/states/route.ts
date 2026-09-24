import { NextResponse } from 'next/server';
import { indianStatesData } from '@/data/states';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    protocol: 'BKIN-Federated-Gateway-v1.0',
    total_states: indianStatesData.length,
    states: indianStatesData,
  });
}
