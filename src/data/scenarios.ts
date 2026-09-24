import { ClimateScenario, RegenerativePractice } from '@/types';

export const climateScenariosData: ClimateScenario[] = [
  {
    scenarioId: 'sc-flood-wheat',
    name: 'Scenario A: Conventional Flood-Irrigated Wheat (Current Baseline)',
    description: 'Traditional 4–5 flood irrigations via submersible tubewell with disc plow tillage and full basal chemical fertilizer application.',
    waterDemandM3PerAcre: 1850,
    waterSavingsPercentVsBaseline: 0,
    climateRiskScore: 68, // higher risk under heat or delayed canal water
    soilImpactScore: 42, // lower organic matter retention
    cropDurationDays: 145,
    inputCostPerAcreInr: 14200,
    expectedGrossMarginInr: 34500,
    resilienceBenefits: [
      'Familiar conventional agronomic routine requiring no specialized drill equipment.',
      'Predictable seedling emergence under uniform soil pulverization.',
    ],
    considerations: [
      'High electricity and groundwater depletion in deep aquifer zones.',
      'Soil hardpan formation from repeated tractor disc operations.',
      'Vulnerability to terminal heat stress in late March if water table fluctuates.',
    ],
  },
  {
    scenarioId: 'sc-happy-seeder',
    name: 'Scenario B: Direct Drilling with In-situ Residue Retention (Happy Seeder)',
    description: 'Wheat sown directly into standing paddy stubble without burning or prior plowing, using micro-irrigation or timed furrow irrigation.',
    waterDemandM3PerAcre: 1380,
    waterSavingsPercentVsBaseline: 25.4,
    climateRiskScore: 38, // lower risk
    soilImpactScore: 78, // high organic improvement
    cropDurationDays: 142,
    inputCostPerAcreInr: 11400,
    expectedGrossMarginInr: 38800,
    resilienceBenefits: [
      'Surface mulch layer acts as a thermal blanket, reducing root-zone soil temperature by 2°C–3°C during March heat spikes.',
      'Conserves 20–25% irrigation water by suppressing soil moisture evaporation.',
      'Zero stubble burning; adds ~1.8 tons of organic carbon per acre over multi-year cycles.',
    ],
    considerations: [
      'Requires access to custom-hiring center (CHC) for Happy Seeder or Super Seeder machinery.',
      'Early weed management must be timed precisely with pre-emergence Stomp/Pendimethalin.',
      'Field must be laser-leveled for uniform mulch distribution.',
    ],
  },
  {
    scenarioId: 'sc-diversified-chickpea',
    name: 'Scenario C: Crop Diversification — Chickpea (Desi Chana) Intercrop',
    description: 'Replacing or intercropping 1.2 acres with drought-tolerant Chickpea (variety PBG-8), fixing biological atmospheric nitrogen with 2 life-saving irrigations.',
    waterDemandM3PerAcre: 680,
    waterSavingsPercentVsBaseline: 63.2,
    climateRiskScore: 32, // high resilience
    soilImpactScore: 88, // highest biological nitrogen fixation
    cropDurationDays: 135,
    inputCostPerAcreInr: 8800,
    expectedGrossMarginInr: 36200,
    resilienceBenefits: [
      'Saves over 60% groundwater, functioning effectively on residual soil moisture.',
      'Fixes 35–45 kg of atmospheric Nitrogen per acre, improving soil fertility for the following Kharif crop.',
      'High protein pulse diversification reduces market single-commodity price risk.',
    ],
    considerations: [
      'Requires well-drained soil; sensitive to water stagnation during heavy winter rainfall.',
      'Susceptible to Pod Borer (Helicoverpa armigera) requiring pheromone trap vigilance.',
      'Local Mandi MSP procurement readiness should be checked in advance.',
    ],
  },
];

export const regenerativePracticesData: RegenerativePractice[] = [
  {
    id: 'reg-001',
    practiceTitle: 'In-Situ Crop Residue Retention (Mulch Farming)',
    category: 'Soil Management',
    currentConventionalPractice: 'Burning paddy straw or multiple rotavator passes to clear crop residue before sowing wheat.',
    possibleImprovement: 'Retain 100% paddy straw on field surface using Happy Seeder, Surface Seeder, or Zero-Till Drill.',
    expectedBenefit: 'Increases soil organic matter by 0.15% per 3 years, moderates soil temperature by 2°C–4°C, and prevents seasonal air pollution.',
    carbonSequestrationEstimate: '1.2 to 1.8 metric tons CO2-equivalent per acre annually.',
    implementationEase: 'Requires Equipment',
  },
  {
    id: 'reg-002',
    practiceTitle: 'Green Manuring with Sesbania (Dhaincha)',
    category: 'Biological Inputs',
    currentConventionalPractice: 'Leaving fields fallow during peak summer (May–June) or growing short-duration summer Moong without biomass return.',
    possibleImprovement: 'Broadcast 12 kg/acre of Sesbania aculeata (Dhaincha) in May; incorporate into soil at 45–50 days before paddy transplanting.',
    expectedBenefit: 'Adds 20–25 tons of succulent green biomass and saves 25–30 kg of chemical Nitrogen fertilizer per acre.',
    carbonSequestrationEstimate: '0.8 to 1.2 metric tons CO2e per acre.',
    implementationEase: 'Easy',
  },
  {
    id: 'reg-003',
    practiceTitle: 'Alternate Wetting and Drying (AWD) Irrigation',
    category: 'Water Efficiency',
    currentConventionalPractice: 'Continuous standing water flooding (5–7 cm) in paddy fields throughout the vegetative cycle.',
    possibleImprovement: 'Install perforated Pani Pipe (15 cm diameter, 30 cm long) to monitor underground water depth; irrigate only when water drops 15 cm below soil surface.',
    expectedBenefit: 'Reduces irrigation water consumption by 25–30% and curbs soil methane (CH4) emissions by 30–45% without yield penalty.',
    carbonSequestrationEstimate: '0.6 to 0.9 metric tons CO2e reduction.',
    implementationEase: 'Easy',
  },
  {
    id: 'reg-004',
    practiceTitle: 'Integrated Nutrient Management (INM) & Bio-Fertilizers',
    category: 'Soil Management',
    currentConventionalPractice: 'Sole reliance on synthetic chemical Urea and DAP, leading to micro-nutrient depletion and soil acidification.',
    possibleImprovement: 'Soil test-based fertilization supplemented with Azotobacter/Rhizobium and Phosphate Solubilizing Bacteria (PSB) seed inoculation + 2 tons FYM.',
    expectedBenefit: 'Improves fertilizer use efficiency (FUE) by 18%, revitalizes beneficial soil microbes, and stabilizes long-term crop yields.',
    carbonSequestrationEstimate: '0.5 to 0.7 metric tons CO2e per acre.',
    implementationEase: 'Moderate',
  },
  {
    id: 'reg-005',
    practiceTitle: 'Biodiversity Field Borders & Flowering Perimeters',
    category: 'Crop Diversity',
    currentConventionalPractice: 'Bare, herbicide-sprayed field bunds with no flowering plants or pollinator shelters.',
    possibleImprovement: 'Plant flowering border rows of Marigold, Mustard, Sunflower, or Coriander along field perimeter dykes.',
    expectedBenefit: 'Attracts natural parasitoids (Trichogramma, Braconids) and predatory spiders, cutting chemical insecticide sprays by up to 50%.',
    carbonSequestrationEstimate: '0.3 to 0.5 metric tons CO2e per acre.',
    implementationEase: 'Easy',
  },
];
