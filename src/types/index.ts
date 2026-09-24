// Core domain models and interfaces for Bharat Krishi Intelligence Network (BKIN)

export type RiskLevel = 'low' | 'moderate' | 'high';
export type ConfidenceLevel = 'high' | 'medium' | 'low';
export type ObservationType = 'forecast' | 'confirmed_observation';
export type UserMode = 'farmer' | 'expert' | 'institution';
export type AlertSeverity = 'critical' | 'high' | 'moderate' | 'info';
export type ExpertReviewStatus = 'submitted' | 'under_review' | 'expert_responded' | 'resolved';
export type DataSourceCategory = 'satellite' | 'weather' | 'soil' | 'crop_stage' | 'field_report' | 'ai_model' | 'knowledge_base';
export type DataFreshness = 'live' | 'recent' | 'aging' | 'stale';

// ─── Geo ────────────────────────────────────────────────────────────────────

export interface GeoCoordinate {
  lat: number;
  lng: number;
}

export interface VillageLocation {
  state: string;
  stateCode: string;
  district: string;
  block: string;
  village: string;
  pincode: string;
  coordinates: GeoCoordinate;
}

// ─── Crop ───────────────────────────────────────────────────────────────────

export interface CropProfile {
  id: string;
  name: string;
  hindiName: string;
  punjabiName?: string;
  season: 'Kharif' | 'Rabi' | 'Zaid';
  variety: string;
  durationDays: number;
  waterRequirementMm: number;
  currentStage: string;
  stageProgressPercent: number;
  daysAfterSowing: number;
  sowingDate: string;
  harvestEstimateDate: string;
  expectedYieldQuintalPerAcre: number;
}

// ─── Soil ───────────────────────────────────────────────────────────────────

export interface SoilProfile {
  ph: number;
  nitrogenKgPerHa: number;
  phosphorusKgPerHa: number;
  potassiumKgPerHa: number;
  organicCarbonPercent: number;
  electricalConductivityDsm: number;
  soilMoisturePercent: number;
  soilType: 'Alluvial' | 'Black Soil (Regur)' | 'Red & Yellow' | 'Laterite' | 'Sandy Loam';
  texture: 'Fine' | 'Medium' | 'Coarse';
  recommendations: {
    nutrient: string;
    status: 'Deficient' | 'Sufficient' | 'Excess';
    action: string;
    why: string;
  }[];
}

// ─── Weather ────────────────────────────────────────────────────────────────

export interface WeatherDayForecast {
  date: string;
  dayName: string;
  tempMaxC: number;
  tempMinC: number;
  rainfallMm: number;
  rainProbabilityPercent: number;
  humidityPercent: number;
  windSpeedKmh: number;
  windDirection: string;
  condition: 'Sunny' | 'Partly Cloudy' | 'Cloudy' | 'Light Rain' | 'Heavy Rain' | 'Thunderstorm';
  icon: string;
  agriculturalImpact: string;
  sprayingCondition: 'Optimal' | 'Caution' | 'Unfavorable';
}

export interface WeatherObservation {
  currentTempC: number;
  feelsLikeC: number;
  humidityPercent: number;
  windSpeedKmh: number;
  windDirection: string;
  rainProbabilityPercent: number;
  uvIndex: number;
  dewPointC: number;
  atmosphericPressureHpa: number;
  lastUpdated: string;
  alerts: string[];
  forecast7Days: WeatherDayForecast[];
}

// ─── Satellite ──────────────────────────────────────────────────────────────

export interface SatelliteLayerData {
  layerId: 'true_color' | 'ndvi' | 'ndwi' | 'crop_health' | 'moisture';
  label: string;
  description: string;
  unit: string;
  currentValue: number;
  interpretation: string;
  legend: { label: string; color: string; range: string }[];
}

export interface SatelliteObservation {
  farmId: string;
  fieldPolygon: GeoCoordinate[];
  captureDate: string;
  satelliteName: 'Sentinel-2' | 'Landsat-9' | 'Resourcesat-2A';
  cloudCoverPercent: number;
  ndviMean: number;
  ndwiMean: number;
  vegetationCondition: 'Optimal' | 'Good' | 'Mild Stress' | 'High Stress';
  historicalTrend: { date: string; ndvi: number; benchmark: number }[];
  anomalies: {
    zoneName: string;
    severity: RiskLevel;
    detectedIssue: string;
    probableReason: string;
    recommendedAction: string;
  }[];
}

// ─── Advisory ───────────────────────────────────────────────────────────────

export interface AdvisoryItem {
  id: string;
  title: string;
  category: 'Irrigation' | 'Nutrient' | 'Pest & Disease' | 'Weather Action' | 'Field Operation';
  urgency: 'Immediate' | 'Within 48h' | 'Routine';
  recommendation: string;
  why: string;
  evidence: string;
  confidence: ConfidenceLevel;
  confidenceScore: number;
  dataSources: ('Satellite' | 'Soil' | 'Weather' | 'Crop Stage' | 'Field Reports')[];
  relevantCropStage: string;
  createdAt: string;
}

// ─── Disease & Pest ─────────────────────────────────────────────────────────

export interface DiseasePestKnowledge {
  id: string;
  commonName: string;
  scientificName: string;
  type: 'Fungal Disease' | 'Bacterial Disease' | 'Viral Disease' | 'Insect/Pest' | 'Nematode';
  causalOrganism: string;
  hostCrops: string[];
  symptoms: string[];
  damageDescription: string;
  indiaDistribution: string[];
  worldwideDistribution: string;
  season: ('Kharif' | 'Rabi' | 'Zaid')[];
  favorableConditions: {
    temperature: string;
    humidity: string;
    rainfall: string;
    cropStage: string;
  };
  lifeCycle: string;
  spreadTransmission: string;
  monitoringProtocol: string;
  economicThresholdLevel: string;
  integratedManagement: {
    cultural: string[];
    biological: string[];
    chemical: string[];
  };
  prevention: string[];
}

export interface DiagnosticResult {
  diagnosis: string;
  scientificName?: string;
  pathogenType: string;
  confidencePercent: number;
  confidenceTier: ConfidenceLevel;
  observedSymptoms: string[];
  environmentalEvidence: string[];
  recommendedNextSteps: string[];
  preventiveMeasures: string[];
  expertVerificationRecommended: boolean;
  disclaimer: string;
  // Enhanced: alternative diagnoses
  alternativeDiagnoses?: { name: string; probability: number; reason: string }[];
}

// ─── Warnings ───────────────────────────────────────────────────────────────

export interface EarlyWarning {
  id: string;
  type: ObservationType;
  hazard: 'Heavy Rainfall' | 'Drought Stress' | 'Heatwave Stress' | 'Frost Hazard' | 'Pest Outbreak' | 'Disease Risk';
  state: string;
  districtsAffected: string[];
  severity: RiskLevel;
  title: string;
  description: string;
  validFrom: string;
  validUntil: string;
  farmerActions: string[];
  verifiedSourcesCount?: number;
}

// ─── Climate & Scenarios ─────────────────────────────────────────────────────

export interface ClimateScenario {
  scenarioId: string;
  name: string;
  description: string;
  waterDemandM3PerAcre: number;
  waterSavingsPercentVsBaseline: number;
  climateRiskScore: number;
  soilImpactScore: number;
  cropDurationDays: number;
  inputCostPerAcreInr: number;
  expectedGrossMarginInr: number;
  resilienceBenefits: string[];
  considerations: string[];
}

export interface RegenerativePractice {
  id: string;
  practiceTitle: string;
  category: 'Soil Management' | 'Crop Diversity' | 'Water Efficiency' | 'Biological Inputs';
  currentConventionalPractice: string;
  possibleImprovement: string;
  expectedBenefit: string;
  carbonSequestrationEstimate: string;
  implementationEase: 'Easy' | 'Moderate' | 'Requires Equipment';
}

// ─── Geography / States ──────────────────────────────────────────────────────

export interface StateNode {
  stateCode: string;
  name: string;
  hindiName: string;
  capital: string;
  majorCrops: string[];
  agroClimaticZones: string[];
  soilTypes: string[];
  activeAdvisoriesCount: number;
  connectedFarmersCount: number;
  nodesStatus: 'Active' | 'Synchronizing' | 'Standby';
  satelliteCoveragePercent: number;
  activeDiseaseRisks: string[];
  dataAvailability: {
    satellite: boolean;
    weather: boolean;
    soilRegistry: boolean;
    pestSurveillance: boolean;
  };
}

// ─── Farm State ──────────────────────────────────────────────────────────────

export interface DemoFarmState {
  id: string;
  name: string;
  ownerName: string;
  state: string;
  district: string;
  block: string;
  village: string;
  areaAcres: number;
  crop: string;
  variety: string;
  sowingDate: string;
  daysAfterSowing: number;
  irrigationType: 'Canal' | 'Tubewell / Borewell' | 'Drip Micro-irrigation' | 'Sprinkler' | 'Rainfed';
  previousCrop: string;
  overallHealthScore: number;
  statusMetrics: {
    cropHealth: { score: number; status: string; level: RiskLevel };
    soilHealth: { score: number; status: string; level: RiskLevel };
    waterStatus: { score: number; status: string; level: RiskLevel };
    weatherRisk: { score: number; status: string; level: RiskLevel };
    diseaseRisk: { score: number; status: string; level: RiskLevel };
    pestRisk: { score: number; status: string; level: RiskLevel };
    climateRisk: { score: number; status: string; level: RiskLevel };
  };
}

// ─── NEW: Risk Engine ────────────────────────────────────────────────────────

export interface RiskFactor {
  key: string;
  label: string;
  score: number;       // 0–100: higher = higher risk
  weight: number;      // 0–1: proportion of overall risk (prototype weights)
  level: RiskLevel;
  explanation: string; // derived from actual demo data values
  dataSource: string;
  lastUpdated: string;
}

export interface RiskBreakdown {
  overallScore: number;          // 0–100
  overallLevel: RiskLevel;
  overallLabel: string;          // e.g. "HIGH RISK"
  factors: RiskFactor[];
  primaryDrivers: string[];      // top 2-3 explanations from data
  confidence: ConfidenceLevel;
  confidenceScore: number;
  calculatedAt: string;
  disclaimer: string;
}

// ─── NEW: Time Series ────────────────────────────────────────────────────────

export interface TimeSeriesPoint {
  date: string;           // "Day 10", "Sept 1", etc.
  value: number;
  benchmark?: number;
  label?: string;         // Optional annotation
}

export interface TimeSeriesDataset {
  id: string;
  label: string;
  unit: string;
  color: string;
  benchmarkColor?: string;
  dataPoints: TimeSeriesPoint[];
  insights: TimeSeriesInsight[];
}

export interface TimeSeriesInsight {
  period: string;
  message: string;
  trend: 'improving' | 'declining' | 'stable' | 'alert';
}

// ─── NEW: Data Provenance ────────────────────────────────────────────────────

export interface DataSource {
  id: string;
  label: string;
  category: DataSourceCategory;
  freshness: DataFreshness;
  lastUpdated: string;
  qualityScore: number;   // 0–100
  description: string;
}

export interface DataQualityReport {
  overallScore: number;
  overallLabel: 'Excellent' | 'Good' | 'Limited' | 'Poor';
  sources: DataSource[];
  limitations: string[];
  recommendationImpact: string;
}

// ─── NEW: System Status ──────────────────────────────────────────────────────

export type SystemModuleStatus = 'operational' | 'degraded' | 'offline' | 'syncing';

export interface SystemModule {
  id: string;
  label: string;
  status: SystemModuleStatus;
  lastSync: string;
  detail?: string;
}

export interface SystemStatus {
  overall: SystemModuleStatus;
  demoMode: boolean;
  modules: SystemModule[];
  lastChecked: string;
}

// ─── NEW: Alerts ─────────────────────────────────────────────────────────────

export interface AlertItem {
  id: string;
  severity: AlertSeverity;
  category: 'Weather' | 'Disease' | 'Pest' | 'Soil' | 'Irrigation' | 'Vegetation' | 'System';
  title: string;
  description: string;
  farm?: string;
  crop?: string;
  district?: string;
  state?: string;
  createdAt: string;
  validUntil?: string;
  actionRequired: boolean;
  recommendedAction?: string;
  dataSource: string;
  isRead: boolean;
}

// ─── NEW: Feedback ───────────────────────────────────────────────────────────

export interface FeedbackItem {
  id: string;
  advisoryId: string;
  advisoryTitle: string;
  rating: 'helpful' | 'not_helpful' | null;
  outcome?: string;
  notes?: string;
  submittedAt?: string;
}

// ─── NEW: Expert Connect ─────────────────────────────────────────────────────

export interface ExpertReview {
  id: string;
  status: ExpertReviewStatus;
  crop: string;
  state: string;
  district: string;
  cropStage: string;
  symptoms: string;
  bkinPrediction: string;
  bkinConfidence: number;
  submittedAt: string;
  reviewedAt?: string;
  expertName?: string;
  expertDesignation?: string;
  expertResponse?: string;
  resolvedAt?: string;
}

// ─── NEW: Impact Metrics ─────────────────────────────────────────────────────

export interface ImpactMetrics {
  farmsMonitored: number;
  warningsGenerated: number;
  advisoriesDelivered: number;
  expertReviewsConducted: number;
  farmerFeedbackReceived: number;
  resolvedCases: number;
  irrigationDecisionsSupported: number;
  diseaseDetections: number;
  statesActive: number;
  districtsReached: number;
  isDemo: true; // Always true — never fabricated as real
  demoSince: string;
}

// ─── NEW: What-If Scenario ───────────────────────────────────────────────────

export interface WhatIfScenario {
  id: string;
  label: string;
  description: string;
  parameter: string;
  change: string;
  effects: {
    metric: string;
    before: number;
    after: number;
    unit: string;
    direction: 'increase' | 'decrease' | 'stable';
    interpretation: string;
  }[];
  disclaimer: string;
}
