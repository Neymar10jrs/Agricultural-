import { DiseasePestKnowledge } from '@/types';

export const diseasePestDatabase: DiseasePestKnowledge[] = [
  {
    id: 'pest-brown-planthopper',
    commonName: 'Brown Planthopper (BPH / भूरा फुदका)',
    scientificName: 'Nilaparvata lugens',
    type: 'Insect/Pest',
    causalOrganism: 'Insect Pest (Delphacidae family, Hemiptera)',
    hostCrops: ['Rice (धान)', 'Wild Rice varieties'],
    symptoms: [
      'Circular patches of dried, golden-brown lodging plants resembling fire burns ("Hopper Burn").',
      'Clusters of nymph and adult planthoppers visible at the base of rice tillers just above the water line.',
      'Sooty mold fungus growth on lower plant parts due to excreted honeydew.',
      'Stunted tillering and incomplete panicle emergence with chaffy grains.',
    ],
    damageDescription:
      'Both nymphs and adults suck phloem sap from the leaf sheaths, causing rapid wilting. In heavy infestations, hopper burn spreads concentrically across entire fields within days, transmitting ragged stunt and grassy stunt viruses.',
    indiaDistribution: ['Punjab', 'Haryana', 'Uttar Pradesh', 'West Bengal', 'Odisha', 'Andhra Pradesh', 'Tamil Nadu', 'Chhattisgarh', 'Bihar'],
    worldwideDistribution: 'Widespread across South Asia, Southeast Asia, East Asia, and Northern Australia.',
    season: ['Kharif'],
    favorableConditions: {
      temperature: '25°C – 31°C',
      humidity: '80% – 95% relative humidity',
      rainfall: 'Intermittent cloudy spells and high water stagnating in field',
      cropStage: 'Tillering to Panicle Initiation & Milk stage',
    },
    lifeCycle: 'Egg stage lasts 7–9 days inserted into leaf sheath midribs. 5 nymphal instars over 13–15 days. Adults live 15–20 days; total generation cycle is 25–30 days with overlapping broods.',
    spreadTransmission: 'Strong wind-borne dispersal of macropterous (long-winged) adults over long distances; localized migration between micro-irrigated paddy plots.',
    monitoringProtocol: 'Scout 20 random hills per acre by tilting stems slightly and tapping tillers over white paper or surface water. Inspect basal stem zone weekly.',
    economicThresholdLevel: '5 to 10 hoppers per hill during vegetative stage; 15 to 20 hoppers per hill during panicle stage.',
    integratedManagement: {
      cultural: [
        'Practice alternate wetting and drying (AWD) irrigation; drain standing water for 3–4 days to disrupt nymph survival.',
        'Avoid excessive basal and top-dressed Nitrogen (do not exceed state university recommendations).',
        'Maintain 30 cm alleyways (pathways) every 2–3 meters to allow sunlight penetration and aeration.',
        'Plant resistant/tolerant paddy cultivars such as PR-126, CR Dhan 205, or MTU-1010.',
      ],
      biological: [
        'Conserve natural predators: Mirid bug (Cyrtorhinus lividipennis), wolf spiders (Lycosa pseudoannulata), and water striders.',
        'Spray Beauveria bassiana or Metarhizium anisopliae @ 1 kg/acre in humid evening conditions.',
      ],
      chemical: [
        'If hoppers exceed ETL, apply Pymetrozine 50% WDG @ 120 g/acre or Triflumezopyrim 10% SC @ 94 ml/acre directed strictly at the base of the plant.',
        'Avoid synthetic pyrethroids which trigger pest resurgence by killing beneficial spider populations.',
      ],
    },
    prevention: [
      'Synchronized planting across village clusters to prevent continuous green bridge.',
      'Balanced N:P:K application with supplementary Potassium and Silicon fertilization.',
      'Regular light trap monitoring (install 1 solar light trap per 2 acres) to detect early flight arrival.',
    ],
  },
  {
    id: 'disease-yellow-rust-wheat',
    commonName: 'Stripe Rust / Yellow Rust (पीला रतुआ / ਪੀਲੀ ਕੁੰਗੀ)',
    scientificName: 'Puccinia striiformis f. sp. tritici',
    type: 'Fungal Disease',
    causalOrganism: 'Biotrophic Fungus (Basidiomycota, Pucciniaceae)',
    hostCrops: ['Wheat (गेहूं)', 'Barley (जौ)', 'Wild grasses (Bromus, Aegilops)'],
    symptoms: [
      'Bright yellow to orange pustules (uredinia) arranged in distinct linear stripes along leaf veins.',
      'Yellow powder stains fingers or clothing when gently wiped across infected foliage.',
      'Premature desiccation of leaves, reduced photosynthetic area, and shriveled grain fill.',
      'In severe outbreaks, stripes also appear on leaf sheaths, glumes, and developing awns.',
    ],
    damageDescription:
      'Deprives the wheat plant of photosynthetic assimilates during critical stem elongation and flag leaf emergence. Yield reduction can reach 40% to 100% in susceptible cultivars if unchecked during early season.',
    indiaDistribution: ['Punjab (Shivalik foothill districts)', 'Haryana', 'Himachal Pradesh', 'Jammu & Kashmir', 'Western Uttar Pradesh', 'Uttarakhand (Tarai)'],
    worldwideDistribution: 'Temperate and high-altitude wheat growing regions globally (North America, Mediterranean, Central Asia, East Africa).',
    season: ['Rabi'],
    favorableConditions: {
      temperature: '10°C – 15°C (night) and 18°C – 23°C (day)',
      humidity: '>85% relative humidity with persistent morning fog and dew',
      rainfall: 'Winter showers followed by sustained cool overcast weather',
      cropStage: 'Tillering to Flag Leaf and Flowering stage',
    },
    lifeCycle: 'Fungus survives year-round on off-season volunteer grasses in Himalayan foothills. Microscopic urediniospores blow down to the plains with north-westerly winds.',
    spreadTransmission: 'Airborne urediniospores carried hundreds of kilometers by atmospheric wind currents during Western Disturbances.',
    monitoringProtocol: 'Scout Northern and Eastern borders of fields bordering water channels and tree lines where morning dew persists longest. Check lower canopy leaves first.',
    economicThresholdLevel: 'First appearance of isolated yellow pustule foci in the field (Zero-tolerance policy for Stripe Rust in seed production and high-yield zones).',
    integratedManagement: {
      cultural: [
        'Sow resistant and recommended wheat varieties like HD-3226, DBW-187, DBW-303, PBW-725; avoid discontinued susceptible varieties.',
        'Avoid late sowing; complete wheat drilling before November 15–20 to escape peak inoculum periods.',
        'Refrain from excessive late nitrogen application which prolongs vegetative succulence.',
      ],
      biological: [
        'Seed treatment with Trichoderma viride @ 5g/kg seed to improve overall systemic resistance.',
      ],
      chemical: [
        'Upon first focal detection, spray Propiconazole 25% EC @ 200 ml/acre or Tebuconazole 25.9% EC @ 200 ml in 200 liters of water using a hollow cone nozzle.',
        'Repeat spray after 15 days if cool humid weather continues and new stripes emerge on upper leaves.',
      ],
    },
    prevention: [
      'Participate in state ICAR/PAU sentinel surveillance networks.',
      'Diversify varieties across contiguous village farms rather than planting a monoculture.',
    ],
  },
  {
    id: 'disease-rice-blast',
    commonName: 'Rice Blast (धान का झुलसा रोग)',
    scientificName: 'Magnaporthe oryzae (anamorph Pyricularia oryzae)',
    type: 'Fungal Disease',
    causalOrganism: 'Ascomycete Fungus',
    hostCrops: ['Rice (धान)', 'Finger Millet (Ragi)', 'Barley'],
    symptoms: [
      'Spindle-shaped, eye-like lesions with diamond centers (grey or whitish) and dark reddish-brown borders on leaves.',
      'Lesions enlarge and coalesce, causing entire leaf blades to blast and wither.',
      'Neck rot/blast: Blackening and rotting of the panicle node causing complete lodging of the head and empty grains.',
      'Node blast: Dark brown constriction at stem nodes leading to breaking of tillers.',
    ],
    damageDescription:
      'One of the most devastating rice diseases globally. Neck blast can completely sever nutrient flow to the grain head, leading to 50–80% localized crop destruction.',
    indiaDistribution: ['Punjab', 'Haryana', 'West Bengal', 'Assam', 'Odisha', 'Karnataka (Cauvery basin)', 'Tamil Nadu', 'Kerala', 'Telangana'],
    worldwideDistribution: 'Over 85 rice-growing countries across Asia, Americas, and Africa.',
    season: ['Kharif'],
    favorableConditions: {
      temperature: '20°C – 26°C with cool nights',
      humidity: '>90% relative humidity, prolonged leaf wetness (>10 hours)',
      rainfall: 'High rainfall accompanied by cloudy overcast days',
      cropStage: 'Seedling nursery to panicle emergence',
    },
    lifeCycle: 'Overwinters in infected crop residue, straw, and seeds. Conidia are ejected into the air during high humidity and dew periods.',
    spreadTransmission: 'Airborne fungal conidia and seed-borne transmission.',
    monitoringProtocol: 'Inspect nursery beds and tillering crop for spindle lesions on lower canopy; check flag leaf junction before booting.',
    economicThresholdLevel: '2–5% leaf area affected on seedlings; or 1–2% neck blast lesions at boot stage.',
    integratedManagement: {
      cultural: [
        'Seed treatment with Carbendazim or Tricyclazole @ 2g/kg seed.',
        'Avoid high doses of nitrogenous fertilizers; apply N in 3–4 split doses based on Leaf Color Chart (LCC).',
        'Destroy infected stubble and maintain weed-free field bunds.',
      ],
      biological: [
        'Foliar spray of Pseudomonas fluorescens @ 2.5 kg/ha or 10g/liter of water.',
      ],
      chemical: [
        'Spray Tricyclazole 75% WP @ 120 g/acre or Isoprothiolane 40% EC @ 300 ml/acre at panicle emergence and milk stage.',
        'Kasugamycin 3% SL @ 400 ml/acre for organic and integrated protocols.',
      ],
    },
    prevention: [
      'Use certified blast-tolerant seeds (e.g. Basmati CSR-30, PR-121, Pusa 1509).',
      'Maintain optimum plant spacing to avoid dense microclimates.',
    ],
  },
  {
    id: 'pest-pink-bollworm',
    commonName: 'Pink Bollworm (गुलाबी सुंडी)',
    scientificName: 'Pectinophora gossypiella',
    type: 'Insect/Pest',
    causalOrganism: 'Lepidopteran Moth (Gelechiidae family)',
    hostCrops: ['Cotton (कपास)', 'Okra (Bhindi)', 'Hibiscus'],
    symptoms: [
      'Rosetted flowers ("Gulabi phool") with petals tied together by silk webbing preventing opening.',
      'Small entrance holes on developing green bolls plugged with excreta and frass.',
      'Discolored, rotted lint and prematurely opening bolls with stained fiber.',
      'Pinkish caterpillars inside seeds and locules eating developing kernels.',
    ],
    damageDescription:
      'Caterpillar burrows into squares and bolls, destroying developing seeds and lint. Causes severe locule rot, dramatic drop in ginning turnout, and seed viability loss.',
    indiaDistribution: ['Maharashtra (Vidarbha & Marathwada)', 'Gujarat (Saurashtra)', 'Telangana', 'Andhra Pradesh', 'Karnataka', 'Punjab', 'Haryana'],
    worldwideDistribution: 'Major cotton belts in Asia, Africa, Mediterranean, and the Americas.',
    season: ['Kharif'],
    favorableConditions: {
      temperature: '25°C – 32°C',
      humidity: '65% – 85% relative humidity',
      rainfall: 'Moderate rainfall with extended flowering duration',
      cropStage: 'Squaring, Flowering, and Boll formation stages (60–120 DAS)',
    },
    lifeCycle: 'Eggs laid on squares and bolls hatch in 3–5 days. Larvae enter bolls within 30 minutes, feed for 10–14 days turning pink, then pupate in soil or stored seed.',
    spreadTransmission: 'Adult moth flight up to several kilometers; transport of infested seed cotton to ginning mills.',
    monitoringProtocol: 'Install 5 Pheromone traps (Gossyplure) per acre at crop canopy level. Inspect 20 green bolls per acre weekly for internal larvae.',
    economicThresholdLevel: '8 male moths per trap per night for 3 consecutive days, or 10% damaged green bolls with live larvae.',
    integratedManagement: {
      cultural: [
        'Avoid ratoon cotton cropping; terminate crop by mid-December to break pest carryover diapause.',
        'Deep summer plowing to expose pupae in soil to scorching sunlight and predatory birds.',
        'Destroy ginning trash and practice strict sanitation around storage sheds.',
      ],
      biological: [
        'Release Trichogramma bactrae egg parasitoid @ 60,000/acre at weekly intervals from 45 DAS.',
        'Apply mating disruption pheromones (SPLAT PBW or PB-Rope L).',
      ],
      chemical: [
        'Spray Chlorantraniliprole 18.5% SC @ 60 ml/acre or Emamectin Benzoate 5% SG @ 88 g/acre when threshold is crossed.',
        'Profenofos 50% EC @ 400 ml/acre for knock-down of exposed larvae.',
      ],
    },
    prevention: [
      'Plant non-Bt refuge crops around Bt cotton fields to delay resistance build-up.',
      'Mass trapping with solar light and pheromone traps at village level.',
    ],
  },
  {
    id: 'pest-fall-armyworm',
    commonName: 'Fall Armyworm (फ़ॉल आर्मीवर्म)',
    scientificName: 'Spodoptera frugiperda',
    type: 'Insect/Pest',
    causalOrganism: 'Noctuid Moth Larva (Lepidoptera)',
    hostCrops: ['Maize (मक्का)', 'Sorghum (Jowar)', 'Sugarcane', 'Millets', 'Sweet Corn'],
    symptoms: [
      'Window-pane feeding marks on leaf whorls with pinholes on young leaves.',
      'Large ragged holes on older leaves and copious amount of sawdust-like brown frass inside the central whorl.',
      'Inverted "Y" mark on the head of mature caterpillars and four black spots arranged in a square on the 8th abdominal segment.',
      'Severed central shoots ("dead hearts") and damaged tassels or cobs.',
    ],
    damageDescription:
      'Extremely voracious feeder with high reproductive rate. A single caterpillar can defoliate entire whorls and penetrate cobs, destroying 30–70% of harvest if uncontrolled.',
    indiaDistribution: ['Karnataka', 'Tamil Nadu', 'Telangana', 'Maharashtra', 'Madhya Pradesh', 'Bihar', 'Rajasthan', 'Punjab'],
    worldwideDistribution: 'Native to Americas, now widespread across Sub-Saharan Africa, Asia, and Oceania.',
    season: ['Kharif', 'Rabi', 'Zaid'],
    favorableConditions: {
      temperature: '24°C – 32°C',
      humidity: '60% – 85%',
      rainfall: 'Warm conditions following light showers',
      cropStage: 'Seedling emergence to Knee-high and Tasseling stage',
    },
    lifeCycle: 'Female lays 1000–1500 eggs in dome-shaped egg masses covered with hair scales. 6 larval instars over 14–20 days. Pupates in soil.',
    spreadTransmission: 'Adult moths can fly up to 100 km in a single night aided by prevailing wind streams.',
    monitoringProtocol: 'Scout "W" shaped walk through maize fields inspecting 20 consecutive plants across 5 spots. Check inside the central funnel.',
    economicThresholdLevel: '5% damaged plants in seedling stage; 10% in mid-whorl stage; 20% in late-whorl stage.',
    integratedManagement: {
      cultural: [
        'Intercropping maize with pulses (cowpea, pigeon pea) or Desmodium.',
        'Handpicking of egg masses and early caterpillars in smallholder plots.',
        'Deep plowing before sowing to expose pupae.',
      ],
      biological: [
        'Apply neem seed kernel extract (NSKE 5%) or Azadirachtin 1500 ppm @ 5 ml/liter.',
        'Drop sand mixed with wood ash (9:1 ratio) or Metarhizium rileyi directly into the whorl.',
      ],
      chemical: [
        'Apply Chlorantraniliprole 18.5% SC @ 0.4 ml/liter or Spinetoram 11.7% SC @ 0.5 ml/liter directed strictly into the whorl.',
      ],
    },
    prevention: [
      'Synchronized community planting within 2–3 weeks.',
      'Pheromone trap installation @ 4 traps/acre upon seed emergence.',
    ],
  },
  {
    id: 'disease-early-late-blight-potato-tomato',
    commonName: 'Late Blight of Potato & Tomato (आलू का पछेती झुलसा)',
    scientificName: 'Phytophthora infestans',
    type: 'Fungal Disease',
    causalOrganism: 'Oomycete Water Mold',
    hostCrops: ['Potato (आलू)', 'Tomato (टमाटर)', 'Eggplant (Brinjal)'],
    symptoms: [
      'Water-soaked circular lesions on leaf tips and margins turning rapidly into large dark brown or purplish-black blotches.',
      'Delicate white fungal mildew ring visible on the underside of infected leaves in moist mornings.',
      'Brown necrotic lesions on stems and petioles causing rapid collapse of the entire foliage canopy.',
      'Tuber infection: Dry brown granular rot extending into the potato flesh.',
    ],
    damageDescription:
      'Historic cause of the Irish potato famine. Can destroy an entire green potato or tomato canopy in 72 hours under foggy, wet conditions.',
    indiaDistribution: ['Uttar Pradesh (Agra-Aligarh belt)', 'Punjab', 'West Bengal (Hooghly)', 'Bihar', 'Nilgiris (Tamil Nadu)', 'Himachal Pradesh'],
    worldwideDistribution: 'Ubiquitous in cool humid potato-growing zones worldwide.',
    season: ['Rabi'],
    favorableConditions: {
      temperature: '12°C – 20°C with relative humidity >90%',
      humidity: 'Morning fog, persistent dew, and overcast cloudiness for 48 hours',
      rainfall: 'Intermittent winter drizzle',
      cropStage: 'Tuber bulking to vegetative canopy closure',
    },
    lifeCycle: 'Survives in latent infected seed tubers in cold storage. Zoospores swim in water films on leaf surfaces to penetrate stomata.',
    spreadTransmission: 'Wind-blown sporangia and water splashes; infected seed tubers.',
    monitoringProtocol: 'Scout low-lying depression areas with high morning fog accumulation. Check underside of leaves with hand lens.',
    economicThresholdLevel: 'First appearance of disease warning in the district (Preventive spray threshold).',
    integratedManagement: {
      cultural: [
        'Plant certified disease-free seed tubers from reputed institutes like CPRI (Kufri Pukhraj, Kufri Jyoti).',
        'High earthing-up to prevent zoospores washing down from foliage into developing tubers.',
        'Dehaulming (cut stems at soil level) 10–12 days before tuber harvest.',
      ],
      biological: [
        'Trichoderma viride seed tuber dip before sowing.',
      ],
      chemical: [
        'Preventive spray: Mancozeb 75% WP @ 2.5 g/liter or Chlorothalonil 75% WP @ 2 g/liter before fog onset.',
        'Curative spray: Cymoxanil 8% + Mancozeb 64% WP @ 3 g/liter or Dimethomorph 50% WP @ 1 g/liter.',
      ],
    },
    prevention: [
      'Implement IMD-CPRI "Indo-Blightcast" early warning model.',
      'Avoid flood irrigation during cold foggy periods.',
    ],
  },
];
