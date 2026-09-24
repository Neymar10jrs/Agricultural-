// BKIN Demo Time Series Data — 30 days of synthetic agricultural telemetry
// All data is clearly labeled as DEMO/SIMULATED

import { TimeSeriesDataset, TimeSeriesInsight } from '@/types';

// ─── NDVI Trend (Days 10–38 after sowing, Wheat Punjab demo farm) ────────────
export const ndviTimeSeries: TimeSeriesDataset = {
  id: 'ndvi',
  label: 'NDVI (Vegetation Health Index)',
  unit: '',
  color: '#10b981',
  benchmarkColor: '#94a3b8',
  dataPoints: [
    { date: 'Day 10', value: 0.24, benchmark: 0.22 },
    { date: 'Day 12', value: 0.28, benchmark: 0.26 },
    { date: 'Day 15', value: 0.32, benchmark: 0.30 },
    { date: 'Day 18', value: 0.39, benchmark: 0.37 },
    { date: 'Day 20', value: 0.44, benchmark: 0.42 },
    { date: 'Day 22', value: 0.49, benchmark: 0.47 },
    { date: 'Day 25', value: 0.54, benchmark: 0.53 },
    { date: 'Day 27', value: 0.58, benchmark: 0.57 },
    { date: 'Day 30', value: 0.61, benchmark: 0.60 },
    { date: 'Day 33', value: 0.65, benchmark: 0.64 },
    { date: 'Day 35', value: 0.67, benchmark: 0.66 },
    { date: 'Day 38', value: 0.68, benchmark: 0.70 },
  ],
  insights: [
    {
      period: 'Last 7 days',
      message: 'NDVI increased from 0.61 to 0.68 (+11.5%) — consistent with active tillering stage.',
      trend: 'improving',
    },
    {
      period: 'vs benchmark',
      message: 'Current NDVI (0.68) is marginally below the Day 38 benchmark (0.70). North-east parcel anomaly (0.51) pulling down the mean.',
      trend: 'alert',
    },
    {
      period: 'Season trend',
      message: 'Overall vegetation establishment is tracking well from Day 10 baseline. No broad stress signal detected.',
      trend: 'stable',
    },
  ],
};

// ─── Soil Moisture Trend ─────────────────────────────────────────────────────
export const soilMoistureTimeSeries: TimeSeriesDataset = {
  id: 'soil_moisture',
  label: 'Soil Moisture (%)',
  unit: '%',
  color: '#0284c7',
  benchmarkColor: '#94a3b8',
  dataPoints: [
    { date: 'Day 10', value: 38.2, benchmark: 36.0 },
    { date: 'Day 12', value: 36.8, benchmark: 35.5 },
    { date: 'Day 15', value: 34.5, benchmark: 34.0 },
    { date: 'Day 18', value: 33.1, benchmark: 33.5 },
    { date: 'Day 20', value: 35.4, benchmark: 34.0, label: 'Irrigation' },
    { date: 'Day 22', value: 37.2, benchmark: 34.5 },
    { date: 'Day 25', value: 35.8, benchmark: 34.0 },
    { date: 'Day 27', value: 34.2, benchmark: 33.5 },
    { date: 'Day 30', value: 33.6, benchmark: 33.0 },
    { date: 'Day 33', value: 32.9, benchmark: 33.0 },
    { date: 'Day 35', value: 32.6, benchmark: 33.0 },
    { date: 'Day 38', value: 32.5, benchmark: 33.0 },
  ],
  insights: [
    {
      period: 'Last 7 days',
      message: 'Soil moisture declined from 33.6% to 32.5% — still within the acceptable range for wheat tillering (30–38%).',
      trend: 'stable',
    },
    {
      period: 'Alert',
      message: 'Moisture has been at or near the lower threshold (32–33%) for 4 consecutive days. Rain forecast (12.5mm) should restore levels.',
      trend: 'alert',
    },
    {
      period: 'Season trend',
      message: 'Irrigation on Day 20 successfully raised moisture. Current declining trend will be reversed by forecasted rainfall.',
      trend: 'stable',
    },
  ],
};

// ─── Temperature Trend ────────────────────────────────────────────────────────
export const temperatureTimeSeries: TimeSeriesDataset = {
  id: 'temperature',
  label: 'Temperature (°C)',
  unit: '°C',
  color: '#f59e0b',
  benchmarkColor: '#94a3b8',
  dataPoints: [
    { date: 'Day 10', value: 18.5, benchmark: 19.0 },
    { date: 'Day 12', value: 19.2, benchmark: 19.5 },
    { date: 'Day 15', value: 20.1, benchmark: 20.0 },
    { date: 'Day 18', value: 21.4, benchmark: 21.0 },
    { date: 'Day 20', value: 22.0, benchmark: 21.5 },
    { date: 'Day 22', value: 23.1, benchmark: 22.0 },
    { date: 'Day 25', value: 22.8, benchmark: 22.0 },
    { date: 'Day 27', value: 23.5, benchmark: 22.5 },
    { date: 'Day 30', value: 22.9, benchmark: 22.5 },
    { date: 'Day 33', value: 22.1, benchmark: 22.0 },
    { date: 'Day 35', value: 22.4, benchmark: 22.0 },
    { date: 'Day 38', value: 22.4, benchmark: 22.0 },
  ],
  insights: [
    {
      period: 'Last 7 days',
      message: 'Average daytime temperature stable at 22–23°C — within the optimal range (18–25°C) for wheat tillering.',
      trend: 'stable',
    },
    {
      period: 'vs benchmark',
      message: 'Temperatures are slightly above seasonal benchmark on several days but within tolerance. No heat stress detected.',
      trend: 'stable',
    },
    {
      period: 'Season trend',
      message: 'Gradual warming trend from Day 10 baseline. Stay alert: sustained temperatures above 25°C during grain fill can reduce yield.',
      trend: 'stable',
    },
  ],
};

// ─── Rainfall Trend ───────────────────────────────────────────────────────────
export const rainfallTimeSeries: TimeSeriesDataset = {
  id: 'rainfall',
  label: 'Rainfall (mm)',
  unit: 'mm',
  color: '#6366f1',
  dataPoints: [
    { date: 'Day 10', value: 0 },
    { date: 'Day 12', value: 0 },
    { date: 'Day 15', value: 4.2 },
    { date: 'Day 18', value: 0 },
    { date: 'Day 20', value: 0 },
    { date: 'Day 22', value: 8.5 },
    { date: 'Day 25', value: 0 },
    { date: 'Day 27', value: 0 },
    { date: 'Day 30', value: 0 },
    { date: 'Day 33', value: 0 },
    { date: 'Day 35', value: 0 },
    { date: 'Day 38', value: 0, label: 'Forecast: 12.5mm' },
  ],
  insights: [
    {
      period: 'Last 7 days',
      message: 'No rainfall recorded in the last 7 days. Western disturbance forecast for next 24 hours (12.5mm, 78% probability).',
      trend: 'alert',
    },
    {
      period: 'Season trend',
      message: 'Seasonal rainfall has been limited (12.7mm cumulative). Irrigation has compensated effectively so far.',
      trend: 'stable',
    },
  ],
};

// ─── Disease Probability Trend ────────────────────────────────────────────────
export const diseaseProbabilityTimeSeries: TimeSeriesDataset = {
  id: 'disease_probability',
  label: 'Disease Probability (%)',
  unit: '%',
  color: '#ef4444',
  benchmarkColor: '#fca5a5',
  dataPoints: [
    { date: 'Day 10', value: 8, benchmark: 15 },
    { date: 'Day 12', value: 10, benchmark: 15 },
    { date: 'Day 15', value: 12, benchmark: 18 },
    { date: 'Day 18', value: 18, benchmark: 20 },
    { date: 'Day 20', value: 22, benchmark: 22 },
    { date: 'Day 22', value: 28, benchmark: 24, label: 'Humidity spike' },
    { date: 'Day 25', value: 25, benchmark: 22 },
    { date: 'Day 27', value: 24, benchmark: 22 },
    { date: 'Day 30', value: 22, benchmark: 20 },
    { date: 'Day 33', value: 20, benchmark: 20 },
    { date: 'Day 35', value: 21, benchmark: 20 },
    { date: 'Day 38', value: 23, benchmark: 22 },
  ],
  insights: [
    {
      period: 'Last 7 days',
      message: 'Disease probability increased from 20% to 23% following humidity spike on Day 22. Risk is above benchmark but remains MODERATE.',
      trend: 'alert',
    },
    {
      period: 'Key event',
      message: 'Humidity spike on Day 22 (75%+ RH) elevated yellow rust incubation probability. Conditions have partially normalized.',
      trend: 'declining',
    },
    {
      period: 'Season trend',
      message: 'Disease risk has been trending upward from early-season baseline. Pre-emptive field scouting is advisable.',
      trend: 'alert',
    },
  ],
};

// ─── Crop Health Score Trend ──────────────────────────────────────────────────
export const cropHealthTimeSeries: TimeSeriesDataset = {
  id: 'crop_health',
  label: 'Overall Crop Health Score (0–100)',
  unit: '/100',
  color: '#10b981',
  benchmarkColor: '#94a3b8',
  dataPoints: [
    { date: 'Day 10', value: 58, benchmark: 55 },
    { date: 'Day 12', value: 62, benchmark: 58 },
    { date: 'Day 15', value: 65, benchmark: 62 },
    { date: 'Day 18', value: 68, benchmark: 65 },
    { date: 'Day 20', value: 72, benchmark: 68, label: 'Irrigation' },
    { date: 'Day 22', value: 75, benchmark: 71 },
    { date: 'Day 25', value: 77, benchmark: 73 },
    { date: 'Day 27', value: 77, benchmark: 74 },
    { date: 'Day 30', value: 78, benchmark: 75 },
    { date: 'Day 33', value: 78, benchmark: 76 },
    { date: 'Day 35', value: 78, benchmark: 77 },
    { date: 'Day 38', value: 78, benchmark: 78 },
  ],
  insights: [
    {
      period: 'Last 7 days',
      message: 'Crop health score has plateaued at 78/100 for 4 days — consistent with active tillering. No decline detected.',
      trend: 'stable',
    },
    {
      period: 'vs benchmark',
      message: 'Health score is tracking the benchmark precisely (78 vs 78). North-east parcel anomaly is contained and not spreading.',
      trend: 'stable',
    },
    {
      period: 'Season trend',
      message: 'Strong improvement from 58 at establishment to 78 at tillering (+34%). On track for a productive season.',
      trend: 'improving',
    },
  ],
};

// ─── All datasets indexed ─────────────────────────────────────────────────────
export const allTimeSeriesDatasets: Record<string, TimeSeriesDataset> = {
  ndvi: ndviTimeSeries,
  soil_moisture: soilMoistureTimeSeries,
  temperature: temperatureTimeSeries,
  rainfall: rainfallTimeSeries,
  disease_probability: diseaseProbabilityTimeSeries,
  crop_health: cropHealthTimeSeries,
};
