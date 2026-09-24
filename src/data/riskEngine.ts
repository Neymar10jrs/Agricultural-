// BKIN Risk Engine — Centralized, weighted risk calculation module
// ⚠️ PROTOTYPE: Weights and thresholds are illustrative, not scientifically validated.
// In a production system these would be calibrated against real agronomic data.

import { RiskBreakdown, RiskFactor, RiskLevel, ConfidenceLevel } from '@/types';
import { initialDemoFarm, demoSoilProfile, demoWeatherObservation, demoSatelliteObservation } from './demoFarm';

// ─── Helper: score → level ────────────────────────────────────────────────────
function scoreToLevel(score: number): RiskLevel {
  if (score >= 65) return 'high';
  if (score >= 35) return 'moderate';
  return 'low';
}

// ─── Helper: level label ──────────────────────────────────────────────────────
function overallLabel(score: number): string {
  if (score >= 70) return 'HIGH RISK';
  if (score >= 45) return 'MODERATE RISK';
  return 'LOW RISK';
}

// ─── Helper: confidence from data freshness ───────────────────────────────────
function deriveConfidence(score: number): { level: ConfidenceLevel; score: number } {
  // Moderate confidence when disease or weather is driving risk above 60
  if (score >= 70) return { level: 'high', score: 87 };
  if (score >= 45) return { level: 'medium', score: 72 };
  return { level: 'high', score: 91 };
}

// ─── Risk Factor Calculations (from actual demo data) ────────────────────────

function calcWeatherRisk(): RiskFactor {
  const rain = demoWeatherObservation.rainProbabilityPercent; // 78%
  const humidity = demoWeatherObservation.humidityPercent;    // 68%
  const wind = demoWeatherObservation.windSpeedKmh;           // 14

  // Higher rain probability + humidity = higher weather risk for this season
  const score = Math.round(
    (rain * 0.55) + (humidity * 0.3) + ((wind > 20 ? 30 : 10) * 0.15)
  );

  return {
    key: 'weather',
    label: 'Weather Risk',
    score: Math.min(score, 100),
    weight: 0.25,
    level: scoreToLevel(score),
    explanation: `Rain probability ${rain}%, humidity ${humidity}%. Western disturbance showers expected within 24h. Wind at ${wind} km/h — spraying conditions unfavorable.`,
    dataSource: 'Weather (IMD Agro-met Station)',
    lastUpdated: 'Today, 06:00 IST',
  };
}

function calcDiseaseRisk(): RiskFactor {
  const humidity = demoWeatherObservation.humidityPercent; // 68%
  const temp = demoWeatherObservation.currentTempC;        // 22.4°C
  const daysAfterSowing = initialDemoFarm.daysAfterSowing; // 38

  // Yellow rust favorable: temp 10–20°C, humidity >80%. Aphid: 20–25°C, moderate humidity
  // Temp 22.4°C is close to aphid favorable range; humidity 68% is moderate
  const rustScore = humidity > 75 ? 45 : 25;
  const aphidScore = temp >= 20 && temp <= 25 ? 42 : 20;
  const stageMultiplier = daysAfterSowing >= 30 && daysAfterSowing <= 60 ? 1.15 : 1.0;
  const score = Math.round(((rustScore + aphidScore) / 2) * stageMultiplier);

  return {
    key: 'disease',
    label: 'Disease Risk',
    score: Math.min(score, 100),
    weight: 0.20,
    level: scoreToLevel(score),
    explanation: `Humidity ${humidity}%, temperature ${temp}°C. Aphid-favorable microclimate during tillering (Day ${daysAfterSowing}). Yellow rust incubation risk moderate given recent humid period.`,
    dataSource: 'Weather + Crop Stage + Field Reports',
    lastUpdated: 'Yesterday, 05:00 IST',
  };
}

function calcSoilRisk(): RiskFactor {
  const ph = demoSoilProfile.ph;               // 7.2
  const oc = demoSoilProfile.organicCarbonPercent; // 0.46
  const n = demoSoilProfile.nitrogenKgPerHa;   // 195

  // Nitrogen deficiency: benchmark ~240–280 kg/ha for wheat tillering
  const nScore = n < 200 ? 55 : n < 240 ? 35 : 15;
  // Low organic carbon: benchmark >0.75%
  const ocScore = oc < 0.5 ? 40 : oc < 0.75 ? 25 : 10;
  // pH 7.2 is good for wheat
  const phScore = ph >= 6.5 && ph <= 7.5 ? 10 : 35;

  const score = Math.round((nScore * 0.45) + (ocScore * 0.35) + (phScore * 0.20));

  return {
    key: 'soil',
    label: 'Soil Risk',
    score: Math.min(score, 100),
    weight: 0.18,
    level: scoreToLevel(score),
    explanation: `Available N ${n} kg/ha (below the ${240}+ kg/ha benchmark). Organic Carbon at ${oc}% is low (<0.75%). pH ${ph} is acceptable for wheat. Zinc deficiency flagged.`,
    dataSource: 'Soil Health Registry (State Soil Testing Lab)',
    lastUpdated: '22 Sept 2026',
  };
}

function calcWaterStress(): RiskFactor {
  const moisture = demoSoilProfile.soilMoisturePercent; // 32.5%
  const rain = demoWeatherObservation.rainProbabilityPercent; // 78%

  // Moisture 32.5% is near lower threshold for wheat (30–38% optimal)
  const moistureScore = moisture < 30 ? 70 : moisture < 33 ? 35 : 15;
  // High rain probability reduces water stress outlook
  const rainMitigation = rain > 70 ? -15 : rain > 40 ? -8 : 0;
  const score = Math.max(0, Math.round(moistureScore + rainMitigation));

  return {
    key: 'water',
    label: 'Water Stress',
    score: Math.min(score, 100),
    weight: 0.18,
    level: scoreToLevel(score),
    explanation: `Soil moisture at ${moisture}% (optimal range: 30–38%). Near lower threshold for 4 consecutive days. Imminent 12.5mm rainfall should restore levels — delaying irrigation is recommended.`,
    dataSource: 'Soil Sensor / Soil Test + Weather Forecast',
    lastUpdated: 'Today, 06:00 IST',
  };
}

function calcVegetationStress(): RiskFactor {
  const ndvi = demoSatelliteObservation.ndviMean;     // 0.68
  const benchmark = 0.70;                              // Day 38 benchmark
  const anomalyNdvi = 0.51;                           // North-east parcel
  const deviation = ((ndvi - benchmark) / benchmark) * 100;

  // NDVI very close to benchmark, but anomaly parcel pulls
  const baseScore = ndvi < 0.5 ? 75 : ndvi < 0.65 ? 45 : ndvi < benchmark ? 28 : 15;
  const anomalyBonus = anomalyNdvi < 0.55 ? 18 : 8;
  const score = Math.round(baseScore + anomalyBonus);

  return {
    key: 'vegetation',
    label: 'Vegetation Stress',
    score: Math.min(score, 100),
    weight: 0.12,
    level: scoreToLevel(score),
    explanation: `Field NDVI mean ${ndvi} vs Day 38 benchmark ${benchmark} (${deviation.toFixed(1)}% below). North-eastern parcel anomaly detected: NDVI 0.51 (vs 0.72 field average). Probable compaction or moisture variation.`,
    dataSource: 'Satellite (Sentinel-2, 16 Sept 2026)',
    lastUpdated: '16 Sept 2026',
  };
}

function calcPestRisk(): RiskFactor {
  const temp = demoWeatherObservation.currentTempC;   // 22.4°C
  const humidity = demoWeatherObservation.humidityPercent; // 68%
  const daysAfterSowing = initialDemoFarm.daysAfterSowing; // 38

  // Aphid favorable: 18–26°C, moderate-high humidity, tillering stage
  const aphidFavorable = temp >= 18 && temp <= 26 && humidity >= 55;
  const stageAtRisk = daysAfterSowing >= 25 && daysAfterSowing <= 75;
  const score = aphidFavorable && stageAtRisk ? 52 : aphidFavorable ? 38 : 22;

  return {
    key: 'pest',
    label: 'Pest Risk',
    score: Math.min(score, 100),
    weight: 0.07,
    level: scoreToLevel(score),
    explanation: `Temperature ${temp}°C and humidity ${humidity}% are favorable for wheat aphid colony formation during tillering. 4 regional farmer reports from Samrala block. ETL not yet breached — preventive scouting advised.`,
    dataSource: 'Weather + Field Reports + Crop Stage',
    lastUpdated: 'Yesterday, 03:00 IST',
  };
}

// ─── Main Risk Engine ─────────────────────────────────────────────────────────
export function calculateRiskBreakdown(): RiskBreakdown {
  const factors: RiskFactor[] = [
    calcWeatherRisk(),
    calcDiseaseRisk(),
    calcSoilRisk(),
    calcWaterStress(),
    calcVegetationStress(),
    calcPestRisk(),
  ];

  // Weighted sum
  const totalWeight = factors.reduce((sum, f) => sum + f.weight, 0);
  const weightedScore = factors.reduce((sum, f) => sum + f.score * f.weight, 0);
  const overallScore = Math.round(weightedScore / totalWeight);

  // Top 3 drivers by score × weight
  const sortedByImpact = [...factors].sort((a, b) => (b.score * b.weight) - (a.score * a.weight));
  const primaryDrivers = sortedByImpact.slice(0, 3).map(f => f.explanation);

  const { level: confidence, score: confidenceScore } = deriveConfidence(overallScore);

  return {
    overallScore,
    overallLevel: scoreToLevel(overallScore),
    overallLabel: overallLabel(overallScore),
    factors,
    primaryDrivers,
    confidence,
    confidenceScore,
    calculatedAt: 'Today, 07:00 IST',
    disclaimer: 'Risk calculations are based on prototype weights using demo data. These scores are indicative only and should not replace expert agronomic advice.',
  };
}

// Export a computed singleton for use across the app
export const demoRiskBreakdown: RiskBreakdown = calculateRiskBreakdown();
