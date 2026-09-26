import { GuideConfig } from './types';

export const GLOBAL_GUIDE: GuideConfig = {
  id: 'global',
  layer: 'global',
  titleEn: 'BKIN Platform Tour',
  titleHi: 'बीकेआईएन प्लेटफॉर्म भ्रमण',
  descriptionEn: 'Explore the sovereign Indian agricultural intelligence ecosystem and its core decision-support tools.',
  descriptionHi: 'भारतीय संप्रभु कृषि बुद्धिमत्ता पारिस्थितिकी तंत्र और इसके मुख्य निर्णय-समर्थन उपकरणों का अन्वेषण करें।',
  steps: [
    {
      id: 'brand-identity',
      targetSelector: '#nav-brand',
      mobileSelector: '#nav-brand',
      titleEn: 'Bharat Krishi Intelligence Network (BKIN)',
      titleHi: 'भारत कृषि इंटेलिजेंस नेटवर्क (BKIN)',
      descEn:
        'National digital agricultural public infrastructure fusing Sentinel-2 satellites, IMD weather radar, and ICAR agro-advisories for precision decision support.',
      descHi:
        'सटीक कृषि निर्णयों हेतु सेंटिनल-2 उपग्रह, मौसम रडार और आईसीएआर सिफारिशों को संयोजित करने वाला राष्ट्रीय डिजिटल सार्वजनिक कृषि मंच।',
      kisanTipEn: 'Click the logo anytime to return to the National Agri-Intelligence Home Overview.',
      kisanTipHi: 'राष्ट्रीय कृषि अवलोकन पर किसी भी समय वापस जाने के लिए लोगो पर क्लिक करें।',
      placement: 'bottom',
    },
    {
      id: 'my-farm',
      targetSelector: '#nav-my-farm',
      mobileSelector: '#mobile-nav-my-farm',
      titleEn: 'My Farm (खेत प्रबंधन)',
      titleHi: 'मेरा खेत (My Farm)',
      descEn:
        'Manage your registered agricultural parcels, soil test parameters, crop growth stages, and real-time field telemetry from one centralized dashboard.',
      descHi:
        'अपने पंजीकृत खेतों, मिट्टी के परीक्षण परिणामों, फसल के चरणों और वास्तविक समय के टेलीमेट्री डेटा को एक ही स्थान से प्रबंधित करें।',
      kisanTipEn: 'Supports multi-parcel switching so you can inspect individual field borders and soil profiles.',
      kisanTipHi: 'कई खेतों के बीच त्वरित स्विचिंग की सुविधा ताकि प्रत्येक खेत की अलग निगरानी की जा सके।',
      placement: 'bottom',
      featureRoute: '/my-farm',
    },
    {
      id: 'risk-center',
      targetSelector: '#nav-risk-center',
      mobileSelector: '#mobile-nav-risk-center',
      titleEn: 'Crop Risk Intelligence Center (जोखिम केंद्र)',
      titleHi: 'फसल जोखिम केंद्र (Risk Center)',
      descEn:
        '6-factor Bayesian risk engine analyzing weather, soil, pest vectors, and regional outbreak epidemiology to calculate farm threat levels.',
      descHi:
        'मौसम, मिट्टी, कीट और क्षेत्रीय प्रकोप का विश्लेषण करने वाला 6-कारकीय एआई जोखिम मॉडल जो खेत के खतरे का स्तर आंकता है।',
      kisanTipEn: 'Check the "Why is my farm at risk?" panel to see the exact scientific drivers behind high scores.',
      kisanTipHi: 'उच्च जोखिम स्कोर के पीछे के वैज्ञानिक कारणों को देखने के लिए "मेरा खेत जोखिम में क्यों है" पैनल देखें।',
      placement: 'bottom',
      featureRoute: '/risk-center',
    },
    {
      id: 'crop-doctor',
      targetSelector: '#nav-crop-doctor',
      mobileSelector: '#nav-crop-doctor',
      titleEn: 'Crop Doctor AI (फसल चिकित्सक)',
      titleHi: 'फसल डॉक्टर एआई (Crop Doctor)',
      descEn:
        'Upload leaf photos or select observable symptoms to receive instant differential diagnoses, confidence scoring, and certified IPM spray recipes.',
      descHi:
        'पत्तियों की फोटो अपलोड करें या लक्षण चुनें; तुरंत विभेदक रोग निदान, सटीकता स्कोर और अनुशंसित उपचार प्राप्त करें।',
      kisanTipEn: 'Low confidence AI predictions are automatically routed to certified agricultural extension officers.',
      kisanTipHi: 'कम आत्मविश्वास वाले एआई पूर्वानुमानों को स्वचालित रूप से प्रमाणित कृषि वैज्ञानिकों को भेजा जाता है।',
      placement: 'bottom',
      featureRoute: '/crop-doctor',
    },
    {
      id: 'todays-advisory',
      targetSelector: '#nav-todays-advisory',
      mobileSelector: '#nav-todays-advisory',
      titleEn: "Today's Actionable Advisory (आज की सलाह)",
      titleHi: 'आज की आवश्यक कृषि सलाह (Today’s Advisory)',
      descEn:
        'Prioritized daily farming action checklist covering irrigation windows, fertilizer top-dressing timings, and pre-emptive disease barriers.',
      descHi:
        'सिंचाई समय, यूरिया/डीएपी छिड़काव और रोग-निवारक उपायों को समाहित करने वाली प्राथमिकता-आधारित दैनिक कृषि कार्यसूची।',
      kisanTipEn: 'Features a 5-Part Explainable Dossier showing exact satellite and soil evidence behind each advice.',
      kisanTipHi: 'प्रत्येक सलाह के पीछे उपग्रह और मिट्टी के साक्ष्य दिखाने वाला 5-भाग विस्तृत साक्ष्य विवरण उपलब्ध है।',
      placement: 'bottom',
      featureRoute: '/todays-advisory',
    },
    {
      id: 'ask-krishi',
      targetSelector: '#nav-ask-krishi',
      mobileSelector: '#mobile-nav-ask-krishi',
      titleEn: 'Ask Krishi AI Voice Assistant (कृषि वाणी)',
      titleHi: 'कृषि वाणी वॉयस असिस्टेंट (Ask Krishi AI)',
      descEn:
        'Speak or type questions in Hindi, English, Punjabi, and regional languages. Ask Krishi understands local agronomy, mandi prices, and pest remedies.',
      descHi:
        'हिंदी, अंग्रेजी या अपनी भाषा में बोलकर या लिखकर प्रश्न पूछें। कृषि वाणी स्थानीय कृषि, मंडी भाव और कीट उपचार समझता है।',
      kisanTipEn: 'Tap the microphone icon anytime for instant spoken guidance tailored to your specific crop stage.',
      kisanTipHi: 'अपनी फसल अवस्था के अनुसार मौखिक सलाह पाने के लिए किसी भी समय माइक बटन दबाएं।',
      placement: 'bottom',
    },
    {
      id: 'bilingual-engine',
      targetSelector: '#nav-language',
      mobileSelector: '#nav-language',
      titleEn: 'Bilingual Engine & Accessibility',
      titleHi: 'द्विभाषी चयन व सुलभता',
      descEn:
        'Switch instantly between English and हिंदी with full script localization across all AI models, advisories, and satellite analyses.',
      descHi:
        'हिंदी और अंग्रेजी के बीच तुरंत भाषा बदलें। सभी मॉडल, सलाह और उपग्रह विश्लेषण आपकी चुनी हुई भाषा के अनुसार स्वतः अनुवादित होते हैं।',
      kisanTipEn: 'All AI models and satellite analyses respect your preferred language and accessibility settings.',
      kisanTipHi: 'सभी एआई मॉडल और उपग्रह विश्लेषण आपकी चुनी हुई भाषा के अनुसार स्वतः अनुवादित होते हैं।',
      placement: 'bottom',
    },
  ],
};

export const PAGE_GUIDES: Record<string, GuideConfig> = {
  '/crop-doctor': {
    id: 'crop-doctor',
    layer: 'page',
    titleEn: 'Crop Doctor AI Walkthrough',
    titleHi: 'फसल चिकित्सक एआई मार्गदर्शिका',
    descriptionEn: 'Learn how to submit plant photos, interpret differential diagnoses, and get verified IPM treatments.',
    descriptionHi: 'पौधों की तस्वीरें प्रस्तुत करने, विभेदक निदान समझने और प्रमाणित उपचार प्राप्त करने की विधि जानें।',
    steps: [
      {
        id: 'cd-input',
        targetSelector: '#guide-doctor-input',
        titleEn: 'Multimodal Symptom & Photo Input',
        titleHi: 'लक्षण व फोटो अपलोड कार्यक्षेत्र',
        descEn:
          'Upload high-resolution camera images of affected foliage, stems, or ears. Select the crop type, state, and current growth stage for precise epidemiology matching.',
        descHi:
          'प्रभावित पत्तियों या तनों की फोटो अपलोड करें। सटीक निदान के लिए फसल का प्रकार, राज्य और वर्तमान विकास चरण चुनें।',
        kisanTipEn: 'Clear natural daylight photos of leaf undersides give the highest diagnostic accuracy.',
        kisanTipHi: 'पत्तियों के पिछले हिस्से की स्पष्ट प्राकृतिक रोशनी वाली तस्वीरें सबसे सटीक परिणाम देती हैं।',
        placement: 'bottom',
      },
      {
        id: 'cd-presets',
        targetSelector: '#guide-doctor-presets',
        titleEn: 'Interactive Sample Outbreak Scenarios',
        titleHi: 'त्वरित डेमो प्रकोप परिदृश्य',
        descEn:
          'Test the AI engine instantly using verified field case studies: Wheat Yellow Rust, Rice Brown Planthopper, Cotton Pink Bollworm, or Potato Late Blight.',
        descHi:
          'सत्यापित फील्ड केस स्टडीज के साथ एआई इंजन का तुरंत परीक्षण करें: गेहूं का पीला रतुआ, धान का भूरा फुदका, कपास की गुलाबी सुंडी या आलू की झुलसा।',
        kisanTipEn: 'Clicking any sample automatically loads verified diagnostic imagery and environmental telemetry.',
        kisanTipHi: 'किसी भी सैंपल पर क्लिक करने से संबंधित उपग्रह व मौसम टेलीमेट्री स्वतः लोड हो जाती है।',
        placement: 'bottom',
      },
      {
        id: 'cd-results',
        targetSelector: '#guide-doctor-results',
        titleEn: 'Primary AI Differential Diagnosis',
        titleHi: 'मुख्य एआई रोग निदान परिणाम',
        descEn:
          'Displays the primary pathogen identified, scientific name, probability percentage, and corroborating weather/satellite evidence.',
        descHi:
          'पहचाने गए मुख्य रोगज़नक़, वैज्ञानिक नाम, संभावना प्रतिशत और पुष्टिकारक मौसम/उपग्रह साक्ष्य प्रदर्शित करता है।',
        kisanTipEn: 'Read the Observed Symptoms and Environmental Evidence columns to understand the reasoning.',
        kisanTipHi: 'एआई द्वारा निदान के कारणों को समझने के लिए लक्षित लक्षण और पर्यावरणीय साक्ष्य कॉलम पढ़ें।',
        placement: 'top',
      },
      {
        id: 'cd-alternatives',
        targetSelector: '#guide-doctor-alternatives',
        titleEn: 'Differential Diagnoses & Abiotic Stress',
        titleHi: 'वैकल्पिक निदान व अजैविक तनाव',
        descEn:
          'Distinguishes fungal pathogens from micronutrient deficiencies (e.g. Zinc/Nitrogen chlorosis) and weather-induced scorched leaf tips.',
        descHi:
          'फफूंद जनित रोगों और सूक्ष्म पोषक तत्वों की कमी (जैसे जिंक/नाइट्रोजन की कमी) के बीच अंतर स्पष्ट करता है।',
        kisanTipEn: 'Prevents wasteful fungicide spray if the true cause is merely nutrient starvation or salinity.',
        kisanTipHi: 'यदि वास्तविक कारण केवल पोषक तत्वों की कमी है, तो कीटनाशक के व्यर्थ खर्च को रोकता है।',
        placement: 'top',
      },
      {
        id: 'cd-confidence',
        targetSelector: '#guide-doctor-confidence',
        titleEn: 'AI Confidence & Extension Officer Routing',
        titleHi: 'एआई विश्वसनीयता व वैज्ञानिक सत्यापन',
        descEn:
          'High confidence (>75%) issues instant IPM protocols. Medium or Low confidence cases route directly to regional Krishi Vigyan Kendra scientists.',
        descHi:
          'उच्च विश्वसनीयता (>75%) पर तुरंत दवा अनुशंसा मिलती है। संदिग्ध मामलों को सीधे कृषि विज्ञान केंद्र के वैज्ञानिकों को भेजा जाता है।',
        kisanTipEn: 'You can tap "Ask an Agricultural Expert" to have an extension officer review your photo within 4-8 hours.',
        kisanTipHi: 'कृषि विशेषज्ञ से अपनी फोटो की 4-8 घंटे में समीक्षा कराने के लिए "विशेषज्ञ से पूछें" पर टैप करें।',
        placement: 'top',
      },
    ],
  },

  '/my-farm': {
    id: 'my-farm',
    layer: 'page',
    titleEn: 'My Farm Intelligence Guide',
    titleHi: 'मेरा खेत बुद्धिमत्ता मार्गदर्शिका',
    descriptionEn: 'Manage multi-parcel land holdings, review health indices, and inspect high-resolution satellite imagery.',
    descriptionHi: 'अपनी कृषि भूमि, स्वास्थ्य सूचकांकों और उपग्रह तस्वीरों का प्रबंधन व अवलोकन करें।',
    steps: [
      {
        id: 'mf-parcels',
        targetSelector: '#guide-myfarm-parcels',
        titleEn: 'Multi-Parcel Switcher & Registration',
        titleHi: 'खेत पार्सल चयनकर्ता व नवीन पंजीकरण',
        descEn:
          'Switch seamlessly between your registered parcels to load dedicated Sentinel-2 NDVI layers, soil profiles, and localized threat assessments.',
        descHi:
          'अपने पंजीकृत खेतों के बीच आसानी से स्विच करें और प्रत्येक खेत के अलग उपग्रह व मिट्टी डेटा लोड करें।',
        kisanTipEn: 'Click "+ Add Parcel" to configure a new field boundary, crop variety, or sowing date.',
        kisanTipHi: 'नई फसल, बुवाई तिथि या खेत का रकबा जोड़ने के लिए "+ Add Parcel" पर क्लिक करें।',
        placement: 'bottom',
      },
      {
        id: 'mf-health',
        targetSelector: '#guide-myfarm-health',
        titleEn: 'Composite Farm Health Score',
        titleHi: 'समग्र खेत स्वास्थ्य स्कोर',
        descEn:
          'A unified 0–100 index synthesized from multi-spectral canopy density, root-zone moisture, automated radar, and localized pest scouting.',
        descHi:
          '0 से 100 तक का समग्र सूचकांक जो फसल घनत्व, जड़ की नमी, मौसम रडार और कीट स्काउटिंग का वैज्ञानिक संश्लेषण है।',
        kisanTipEn: 'Scores above 75 indicate optimal canopy vigor and minimal environmental stress.',
        kisanTipHi: '75 से ऊपर का स्कोर स्वस्थ फसल और तनाव-मुक्त वातावरण को दर्शाता है।',
        placement: 'bottom',
      },
      {
        id: 'mf-matrix',
        targetSelector: '#guide-myfarm-matrix',
        titleEn: 'Diagnostic Health Matrix',
        titleHi: 'निदान स्वास्थ्य मैट्रिक्स (7 प्रमुख पैरामीटर)',
        descEn:
          'Granular breakdown of Crop Health, Soil Nutrients, Root-Zone Water, Weather Risks, Outbreak Probabilities, and Seasonal Resilience.',
        descHi:
          'फसल स्वास्थ्य, मिट्टी के पोषक तत्व, जड़ की नमी, मौसम का जोखिम और रोग प्रकोप की विस्तृत 7-आयामी जांच।',
        kisanTipEn: 'Click any parameter card to drill down into historical time-series curves and sensor calibrations.',
        kisanTipHi: 'ऐतिहासिक प्रवृत्तियां और विस्तृत चार्ट देखने के लिए किसी भी कार्ड पर क्लिक करें।',
        placement: 'top',
      },
      {
        id: 'mf-satellite',
        targetSelector: '#guide-myfarm-satellite',
        titleEn: 'Satellite Multi-Spectral Field Observer',
        titleHi: 'उपग्रह मल्टी-स्पेक्ट्रल फील्ड प्रेक्षक',
        descEn:
          '10-meter resolution orbital view displaying NDVI vegetation vigour, highlighting parcel zones with sub-optimal biomass or weed stress.',
        descHi:
          '10-मीटर रिज़ॉल्यूशन वाला उपग्रह दृश्य जो फसल की हरियाली और कमजोर विकास वाले क्षेत्रों को तुरंत चिन्हित करता है।',
        kisanTipEn: 'Tap "Full Satellite Workspace" to toggle NDWI moisture and thermal canopy temperatures.',
        kisanTipHi: 'नमी और तापमान सूचकांक देखने के लिए "Full Satellite Workspace" पर क्लिक करें।',
        placement: 'top',
      },
      {
        id: 'mf-advisories',
        targetSelector: '#guide-myfarm-advisories',
        titleEn: 'Active Priority Advisories',
        titleHi: 'खेत हेतु सक्रिय प्राथमिकता परामर्श',
        descEn:
          'Immediate actionable recommendations customized for your parcel’s current growth stage and forecasted rain events.',
        descHi:
          'आपके खेत के वर्तमान फसल चरण और आगामी वर्षा पूर्वानुमान के अनुसार तैयार की गई तत्काल कार्रवाई सिफारिशें।',
        kisanTipEn: 'Each card provides the exact scientific evidence and data freshness timestamps.',
        kisanTipHi: 'प्रत्येक सलाह के साथ वैज्ञानिक साक्ष्य और उपग्रह डेटा का समय अंकित रहता है।',
        placement: 'top',
      },
    ],
  },

  '/risk-center': {
    id: 'risk-center',
    layer: 'page',
    titleEn: 'Crop Risk Intelligence Center Guide',
    titleHi: 'फसल जोखिम केंद्र मार्गदर्शिका',
    descriptionEn: 'Understand the 6 weighted risk factors, outbreak drivers, and how AI confidence routes safety recommendations.',
    descriptionHi: '6 जोखिम कारकों, प्रकोप के कारणों और एआई द्वारा सुरक्षा सिफारिशें तय करने की प्रक्रिया समझें।',
    steps: [
      {
        id: 'rc-gauge',
        targetSelector: '#guide-risk-gauge',
        titleEn: 'Overall Farm Risk Level Gauge',
        titleHi: 'समग्र खेत जोखिम स्तर गेज',
        descEn:
          'Radial indicator evaluating compound agricultural threat. Classified as Low (<35%), Moderate (35-65%), or High Risk (>65%).',
        descHi:
          'कृषि खतरे का समग्र रेडियल गेज। निम्न (<35%), मध्यम (35-65%) या उच्च जोखिम (>65%) के रूप में वर्गीकृत।',
        kisanTipEn: 'High Risk triggers automated alerts to block-level agricultural extension officers.',
        kisanTipHi: 'उच्च जोखिम होने पर ब्लॉक स्तरीय कृषि अधिकारियों को स्वचालित सूचना प्रेषित होती है।',
        placement: 'bottom',
      },
      {
        id: 'rc-factors',
        targetSelector: '#guide-risk-factors',
        titleEn: '6-Factor Weighted Risk Architecture',
        titleHi: '6-कारकीय भारित जोखिम मॉडल',
        descEn:
          'Calculates Weather Risk, Soil Moisture Deficit, Pest Infestation Threat, Disease Outbreak Likelihood, Sowing Delay, and Water Stress.',
        descHi:
          'मौसम का खतरा, मिट्टी की नमी, कीट प्रकोप, रोग की संभावना, बुवाई में देरी और जल तनाव का सटीक आकलन।',
        kisanTipEn: 'Expand any factor to see the exact sensor feeds and mathematical weight attributed to it.',
        kisanTipHi: 'प्रत्येक कारक पर क्लिक करके उसके पीछे के सेंसर डेटा और भार को विस्तार से देखें।',
        placement: 'bottom',
      },
      {
        id: 'rc-drivers',
        targetSelector: '#guide-risk-drivers',
        titleEn: 'Why is My Farm at Risk? Primary Drivers',
        titleHi: 'खेत जोखिम में क्यों है? मुख्य प्रेरक कारण',
        descEn:
          'Transparent breakdown of the top 3 physical ground factors driving up your farm’s current vulnerability index.',
        descHi:
          'आपके खेत की वर्तमान संवेदनशीलता बढ़ाने वाले शीर्ष 3 जमीनी भौतिक कारणों का पारदर्शी विवरण।',
        kisanTipEn: 'Addressing just the primary driver often drops overall risk back into the safe green zone.',
        kisanTipHi: 'केवल मुख्य कारण का निवारण करने से ही खेत का जोखिम स्तर सुरक्षित हरे क्षेत्र में आ जाता है।',
        placement: 'top',
      },
      {
        id: 'rc-confidence',
        targetSelector: '#guide-risk-confidence',
        titleEn: 'AI Confidence & Safety Routing Protocol',
        titleHi: 'एआई विश्वसनीयता व सुरक्षा मार्ग प्रोटोकॉल',
        descEn:
          'Guarantees farmer safety by never guessing. High confidence delivers immediate advisories; moderate confidence advises field inspection; low confidence mandates scientist verification.',
        descHi:
          'किसान की फसल सुरक्षा सर्वोपरि है। उच्च विश्वसनीयता पर तुरंत सलाह, मध्यम पर निरीक्षण की सलाह, और कम पर वैज्ञानिक सत्यापन अनिवार्य है।',
        kisanTipEn: 'Ensures farmers never apply toxic chemical sprays based on uncertain machine learning predictions.',
        kisanTipHi: 'यह सुनिश्चित करता है कि अनिश्चित एआई अनुमानों पर किसान कभी अनावश्यक रासायनिक छिड़काव न करें।',
        placement: 'top',
      },
      {
        id: 'rc-chart',
        targetSelector: '#guide-risk-chart',
        titleEn: 'Disease Probability Time-Series Trend',
        titleHi: 'रोग संभावना समय-श्रृंखला रुझान',
        descEn:
          'Tracks outbreak probability over 7-day, 30-day, and seasonal horizons against state university benchmark thresholds.',
        descHi:
          'विश्वविद्यालय के मानकों के सापेक्ष 7 दिन, 30 दिन और पूरे सीजन में रोग प्रकोप की संभावना का ग्राफ।',
        kisanTipEn: 'Spikes in the curve indicate upcoming temperature-humidity windows favorable to fungal spores.',
        kisanTipHi: 'ग्राफ में उछाल आगामी दिनों में फफूंद बीजाणुओं के अनुकूल तापमान-नमी की स्थिति को दर्शाता है।',
        placement: 'top',
      },
    ],
  },

  '/todays-advisory': {
    id: 'todays-advisory',
    layer: 'page',
    titleEn: "Today's Action Center Guide",
    titleHi: 'आज की आवश्यक कृषि सलाह मार्गदर्शिका',
    descriptionEn: 'Discover daily prioritized farming operations, fertilizer timings, and 5-part explainable evidence dossiers.',
    descriptionHi: 'दैनिक प्राथमिकता कृषि कार्य, उर्वरक समय और 5-भाग साक्ष्य विवरण का उपयोग करना सीखें।',
    steps: [
      {
        id: 'ta-filters',
        targetSelector: '#guide-advisory-filters',
        titleEn: 'Action Area Filter Pills',
        titleHi: 'कार्यक्षेत्र फ़िल्टर विकल्प',
        descEn:
          'Filter advisories by Irrigation Scheduling, Field Operations, Pest & Disease Controls, or Soil Nutrient Top-Dressing.',
        descHi:
          'सिंचाई, खेत संचालन, कीट व रोग नियंत्रण, या पोषक तत्व व खाद के आधार पर सलाह को अलग-अलग देखें।',
        kisanTipEn: 'Select "Irrigation" before morning tubewell pumping to verify soil root-zone moisture.',
        kisanTipHi: 'सुबह ट्यूबवेल चलाने से पहले "Irrigation" चुनकर देख लें कि क्या आज सिंचाई की आवश्यकता है।',
        placement: 'bottom',
      },
      {
        id: 'ta-format',
        targetSelector: '#guide-advisory-format',
        titleEn: '5-Part Dossier vs Compact View Toggle',
        titleHi: '5-भाग विस्तृत साक्ष्य बनाम त्वरित दृश्य',
        descEn:
          'Switch between the in-depth Explainable Dossier (Problem, Evidence, Risk, Action, Confidence) and the speedy compact field view.',
        descHi:
          'विस्तृत वैज्ञानिक साक्ष्य (समस्या, साक्ष्य, जोखिम, समाधान, सटीकता) या खेत में त्वरित देखने योग्य दृश्य चुनें।',
        kisanTipEn: 'Use the 5-Part Dossier when making major fertilizer purchases to inspect satellite justification.',
        kisanTipHi: 'उर्वरक खरीदने से पहले 5-भाग विवरण देखकर उपग्रह साक्ष्य की पुष्टि करें।',
        placement: 'bottom',
      },
      {
        id: 'ta-feed',
        targetSelector: '#guide-advisory-feed',
        titleEn: 'Prioritized Agronomic Actions',
        titleHi: 'प्राथमिकता-आधारित कृषि कार्य सूची',
        descEn:
          'Each card provides urgency indicators, exact dosage recommendations, and interactive thumbs up/down farmer feedback widgets.',
        descHi:
          'प्रत्येक कार्ड में तात्कालिकता, दवा की सटीक मात्रा, और सलाह उपयोगी रही या नहीं बताने का विकल्प उपलब्ध है।',
        kisanTipEn: 'Submitting feedback trains the local agronomy model to provide even sharper future recommendations.',
        kisanTipHi: 'फीडबैक देने से एआई मॉडल आपके स्थानीय क्षेत्र के लिए और अधिक सटीक सलाह देना सीखता है।',
        placement: 'top',
      },
      {
        id: 'ta-help',
        targetSelector: '#guide-advisory-help',
        titleEn: 'Kisan Call Centre Toll-Free Assistance',
        titleHi: 'किसान कॉल सेंटर निःशुल्क सहायता (1800-180-1551)',
        descEn:
          'Need human assistance implementing these recommendations? Dial toll-free 1800-180-1551 to talk to your block agriculture officer.',
        descHi:
          'इन सिफारिशों को लागू करने में सहायता चाहिए? सीधे अपने ब्लॉक कृषि अधिकारी से बात करने के लिए टोल-फ्री 1800-180-1551 मिलाएं।',
        kisanTipEn: 'Available 6 AM to 10 PM in 22 regional Indian languages.',
        kisanTipHi: 'सुबह 6 बजे से रात 10 बजे तक 22 भारतीय भाषाओं में निःशुल्क उपलब्ध।',
        placement: 'top',
      },
    ],
  },

  '/satellite-monitor': {
    id: 'satellite-monitor',
    layer: 'page',
    titleEn: 'Satellite Intelligence Hub Guide',
    titleHi: 'उपग्रह इंटेलिजेंस हब मार्गदर्शिका',
    descriptionEn: 'Learn how multi-spectral orbital bands reveal crop health, water index, and automated field anomalies.',
    descriptionHi: 'मल्टी-स्पेक्ट्रल उपग्रह बैंड द्वारा फसल स्वास्थ्य, जल सूचकांक और विसंगतियों को समझने की विधि।',
    steps: [
      {
        id: 'sat-bands',
        targetSelector: '#guide-satellite-bands',
        titleEn: 'Spectral Band Selector (NDVI, NDWI, NDMI, LST)',
        titleHi: 'स्पेक्ट्रल बैंड चयनकर्ता (हरियाली, नमी व तापमान)',
        descEn:
          'Toggle between Normalized Difference Vegetation Index (NDVI), Water Index (NDWI), Moisture Index (NDMI), and Land Surface Temperature (LST).',
        descHi:
          'वनस्पति सूचकांक (NDVI), जल सूचकांक (NDWI), नमी सूचकांक (NDMI) और सतह तापमान (LST) के बीच तुरंत स्विच करें।',
        kisanTipEn: 'NDWI drops sharply before visible leaves wilt, giving you a 48-hour head-start on irrigation.',
        kisanTipHi: 'पत्तियों के मुरझाने से पहले ही NDWI घट जाता है, जिससे सिंचाई के लिए 48 घंटे पूर्व संकेत मिलता है।',
        placement: 'bottom',
      },
      {
        id: 'sat-canvas',
        targetSelector: '#guide-satellite-canvas',
        titleEn: 'High-Resolution Field Spectral Canvas',
        titleHi: 'खेत का हाई-रिज़ॉल्यूशन स्पेक्ट्रल कैनवास',
        descEn:
          'Displays pixel-level chlorophyll absorption across your parcel boundaries, colored from dark green (dense) to yellow/red (stress).',
        descHi:
          'आपके खेत का पिक्सेल-स्तरीय क्लोरोफिल मानचित्र, जो गहरे हरे (स्वस्थ) से पीले/लाल (तनावग्रस्त) रंगों में दिखता है।',
        kisanTipEn: 'Red and orange patches inside your parcel indicate localized pest damage or poor soil fertility.',
        kisanTipHi: 'खेत के भीतर लाल और नारंगी धब्बे कीट प्रकोप या कमजोर मिट्टी वाले क्षेत्रों को दर्शाते हैं।',
        placement: 'top',
      },
      {
        id: 'sat-mechanics',
        targetSelector: '#guide-satellite-mechanics',
        titleEn: 'Band Mathematics & Physical Meaning',
        titleHi: 'बैंड गणित व वैज्ञानिक अर्थ',
        descEn:
          'Explains the exact satellite formula (e.g. (NIR - Red) / (NIR + Red)) and what the current score signifies for your crop.',
        descHi:
          'उपग्रह फॉर्मूला और फसल के लिए वर्तमान स्कोर के सटीक वैज्ञानिक महत्व की व्याख्या करता है।',
        kisanTipEn: 'Values between 0.65 and 0.85 represent peak photosynthetic active radiation in tillering wheat.',
        kisanTipHi: '0.65 से 0.85 के बीच का मान गेहूं में सर्वोत्तम कल्ले फूटने और प्रकाश संश्लेषण को दर्शाता है।',
        placement: 'top',
      },
      {
        id: 'sat-trends',
        targetSelector: '#guide-satellite-trends',
        titleEn: '30-Day Historical Trend & Benchmark',
        titleHi: '30-दिवसीय ऐतिहासिक प्रवृत्ति व जिला बेंचमार्क',
        descEn:
          'Interactive area chart tracking vegetative progression over the last 30 days compared with state agro-climatic normal curves.',
        descHi:
          'पिछले 30 दिनों में फसल की वृद्धि को राज्य के औसत सामान्य विकास से तुलना करने वाला इंटरैक्टिव ग्राफ।',
        kisanTipEn: 'Any dip below the benchmark line indicates an urgent need for agronomic field inspection.',
        kisanTipHi: 'औसत रेखा से नीचे जाने पर तुरंत खेत का व्यक्तिगत निरीक्षण करने की सलाह दी जाती है।',
        placement: 'top',
      },
    ],
  },

  '/weather': {
    id: 'weather',
    layer: 'page',
    titleEn: 'Agro-Met Weather Intelligence Guide',
    titleHi: 'कृषि-मौसम विज्ञान मार्गदर्शिका',
    descriptionEn: 'Learn how to use radar forecasts, operational spray windows, and hyper-local precipitation telemetry.',
    descriptionHi: 'मौसम रडार, छिड़काव की अनुकूल खिड़की और स्थानीय वर्षा पूर्वानुमान का उपयोग करना सीखें।',
    steps: [
      {
        id: 'wx-overview',
        targetSelector: '#guide-weather-overview',
        titleEn: 'Live Agro-Met Telemetry Overview',
        titleHi: 'लाइव कृषि-मौसम टेलीमेट्री अवलोकन',
        descEn:
          'Real-time ambient temperature, humidity, barometric pressure, wind speed, and rain probability sourced directly from IMD radars.',
        descHi:
          'मौसम विभाग के रडार से प्राप्त वास्तविक समय का तापमान, आर्द्रता, वायुदाब, हवा की गति और वर्षा की संभावना।',
        kisanTipEn: 'High humidity (>85%) combined with temperatures between 15-22°C creates ideal fungal rust conditions.',
        kisanTipHi: '85% से अधिक आर्द्रता और 15-22°C तापमान होने पर फफूंद जनित रोगों का खतरा सर्वाधिक होता है।',
        placement: 'bottom',
      },
      {
        id: 'wx-forecast',
        targetSelector: '#guide-weather-forecast',
        titleEn: '7-Day Precision Agricultural Forecast',
        titleHi: '7-दिवसीय सटीक कृषि पूर्वानुमान',
        descEn:
          'Daily projections with clear agricultural implications: sunshine hours, precipitation probability, and wind shear vectors.',
        descHi:
          'दैनिक मौसम अनुमान के साथ कृषि पर प्रभाव: धूप के घंटे, वर्षा की संभावना और हवा की दिशा।',
        kisanTipEn: 'Never apply urea fertilizer within 24 hours of a heavy rainfall forecast to prevent nutrient runoff.',
        kisanTipHi: 'भारी वर्षा के पूर्वानुमान से 24 घंटे पहले यूरिया न डालें ताकि खाद बहने से बचा जा सके।',
        placement: 'top',
      },
      {
        id: 'wx-operational',
        targetSelector: '#guide-weather-operational',
        titleEn: 'Operational Spray & Irrigation Windows',
        titleHi: 'छिड़काव व सिंचाई की अनुकूल समय-खिड़की',
        descEn:
          'Automated decision support indicating exact safe hours for pesticide spraying without wind drift or rain wash-off.',
        descHi:
          'हवा के बहाव या बारिश में दवा धुलने से बचाने के लिए कीटनाशक छिड़काव के सबसे सुरक्षित घंटों का स्वतः संकेत।',
        kisanTipEn: 'Green window indicates wind speeds under 12 km/h with 0% rain probability over the next 6 hours.',
        kisanTipHi: 'हरा संकेत बताता है कि अगले 6 घंटों में हवा 12 किमी/घंटा से कम रहेगी और बारिश की संभावना नहीं है।',
        placement: 'top',
      },
    ],
  },

  '/soil-health': {
    id: 'soil-health',
    layer: 'page',
    titleEn: 'Soil Health Dashboard Guide',
    titleHi: 'मृदा स्वास्थ्य डैशबोर्ड मार्गदर्शिका',
    descriptionEn: 'Learn how to interpret NPK macronutrients, pH balance, organic carbon, and tailored fertilizer plans.',
    descriptionHi: 'एनपीके पोषक तत्वों, मिट्टी के पीएच, जैविक कार्बन और संतुलित खाद योजना को समझना सीखें।',
    steps: [
      {
        id: 'sh-npk',
        targetSelector: '#guide-soil-npk',
        titleEn: 'Primary Macronutrient Matrix (NPK, pH, OC)',
        titleHi: 'प्राथमिक पोषक तत्व मैट्रिक्स (NPK, pH, जैविक कार्बन)',
        descEn:
          'Displays Nitrogen (N), Phosphorus (P), Potassium (K), Soil pH, and Organic Carbon levels with clear Deficient, Optimal, or Excess status.',
        descHi:
          'नाइट्रोजन, फास्फोरस, पोटाश, पीएच और जैविक कार्बन की मात्रा को कमी, सामान्य या अधिकता के स्पष्ट संकेतों के साथ दिखाता है।',
        kisanTipEn: 'Low Organic Carbon (<0.5%) restricts plant root uptake even when expensive chemical fertilizers are applied.',
        kisanTipHi: 'जैविक कार्बन 0.5% से कम होने पर महंगी रासायनिक खाद डालने पर भी पौधों की जड़ें उसे नहीं सोख पाती हैं।',
        placement: 'bottom',
      },
      {
        id: 'sh-secondary',
        targetSelector: '#guide-soil-secondary',
        titleEn: 'Secondary Nutrients & Micro-Flora Activity',
        titleHi: 'द्वितीयक सूक्ष्म पोषक तत्व व सूक्ष्मजीव गतिविधि',
        descEn:
          'Reviews Zinc, Iron, Sulphur, Electrical Conductivity (salinity), and biological microbial activity in your parcel’s root-zone.',
        descHi:
          'जिंक, आयरन, सल्फर, खारापन (EC) और मिट्टी में लाभकारी सूक्ष्मजीवों की जैविक गतिविधि की जांच।',
        kisanTipEn: 'Zinc deficiency is the #1 cause of stunted wheat seedlings in Indo-Gangetic alluvial plains.',
        kisanTipHi: 'उत्तरी भारत के मैदानी इलाकों में गेहूं के पौधों का विकास रुकने का मुख्य कारण जिंक की कमी है।',
        placement: 'top',
      },
      {
        id: 'sh-recommendations',
        targetSelector: '#guide-soil-recommendations',
        titleEn: 'Tailored Nutrient Replenishment Plan',
        titleHi: 'अनुकूलित पोषक तत्व संवर्धन योजना',
        descEn:
          'Exact recommended doses of DAP, MOP, Urea, Farmyard Manure (FYM), and bio-fertilizers customized for your target crop yield.',
        descHi:
          'लक्षित फसल पैदावार के अनुसार डीएपी, पोटाश, यूरिया और जैविक खाद की प्रति एकड़ सटीक मात्रा की सिफारिश।',
        kisanTipEn: 'Split nitrogen applications into 3 equal splits (Basal, CRI, Tillering) to boost fertilizer efficiency by 35%.',
        kisanTipHi: 'यूरिया को 3 बार में बांटकर डालने से खाद की उपयोग दक्षता 35% तक बढ़ जाती है।',
        placement: 'top',
      },
    ],
  },

  '/alert-center': {
    id: 'alert-center',
    layer: 'page',
    titleEn: 'Alert & Biosecurity Center Guide',
    titleHi: 'अलर्ट व जैव-सुरक्षा केंद्र मार्गदर्शिका',
    descriptionEn: 'Monitor multi-hazard alerts, omni-channel delivery protocols, and community ground scout reports.',
    descriptionHi: 'बहु-आपदा चेतावनियां, बहु-माध्यम सूचना प्रणाली और सामुदायिक जमीनी रिपोर्टों की निगरानी करें।',
    steps: [
      {
        id: 'ac-status',
        targetSelector: '#guide-alert-status',
        titleEn: 'Telemetry Pipelines Operational Status',
        titleHi: 'टेलीमेट्री पाइपलाइन संचालन स्थिति',
        descEn:
          'Live status indicators for Satellite Overpasses, Weather Radars, Disease Vector Models, and Sensor Sync queues.',
        descHi:
          'उपग्रह ओवरपास, मौसम रडार, रोग वेक्टर मॉडल और सेंसर सिंक कतारों की लाइव परिचालन स्थिति।',
        kisanTipEn: 'Green pulsing dots indicate telemetry is live and calibrated within the last 15 minutes.',
        kisanTipHi: 'हरी चमकती बत्ती दर्शाती है कि डेटा लाइव है और पिछले 15 मिनट में अपडेट हुआ है।',
        placement: 'bottom',
      },
      {
        id: 'ac-filters',
        targetSelector: '#guide-alert-filters',
        titleEn: 'Severity & Category Triage Filters',
        titleHi: 'गंभीरता व श्रेणी छंटाई फ़िल्टर',
        descEn:
          'Filter by Critical (Red), High (Orange), Moderate (Yellow), or Info (Blue) across Weather, Disease, Pest, Soil, and Irrigation.',
        descHi:
          'मौसम, रोग, कीट, मिट्टी और सिंचाई के आधार पर गंभीर, उच्च, मध्यम या सामान्य अलर्ट तुरंत छांटें।',
        kisanTipEn: 'Always address Critical alerts first as they represent irreversible outbreak or frost events.',
        kisanTipHi: 'गंभीर (Critical) अलर्ट को प्राथमिकता दें क्योंकि ये फसल को अचानक नुकसान से बचाते हैं।',
        placement: 'bottom',
      },
      {
        id: 'ac-feed',
        targetSelector: '#guide-alert-feed',
        titleEn: 'Verified Alert Cards Feed',
        titleHi: 'सत्यापित अलर्ट कार्ड फीड',
        descEn:
          'Action-oriented alerts displaying affected parcel, validity window, underlying data source, and clear field recommendations.',
        descHi:
          'प्रभावित खेत, समय-सीमा, डेटा स्रोत और खेत में करने योग्य आवश्यक कार्यों के साथ अलर्ट कार्ड।',
        kisanTipEn: 'Click "Take Action" to immediately jump into today’s tailored advisory workflow.',
        kisanTipHi: 'समाधान देखने के लिए सीधे "Take Action" बटन पर क्लिक करें।',
        placement: 'top',
      },
      {
        id: 'ac-omnichannel',
        targetSelector: '#guide-alert-omnichannel',
        titleEn: 'Omnichannel Rural Delivery Protocol',
        titleHi: 'बहु-माध्यम ग्रामीण वितरण प्रणाली',
        descEn:
          'Dispatches verified alerts through Web Push, WhatsApp Krishi Bot, synthesized voice IVR phone calls, and offline GSM SMS fallback.',
        descHi:
          'वेब पुश, व्हाट्सएप बॉट, फोन कॉल (IVR) और बिना इंटरनेट वाले साधारण फोन पर एसएमएस द्वारा अलर्ट भेजना।',
        kisanTipEn: 'Ensures zero farmer exclusion even in regions with intermittent mobile data connectivity.',
        kisanTipHi: 'कमजोर इंटरनेट वाले क्षेत्रों में भी कोई भी किसान महत्वपूर्ण सूचना से वंचित नहीं रहता।',
        placement: 'top',
      },
      {
        id: 'ac-community',
        targetSelector: '#guide-alert-community',
        titleEn: 'Two-Way Community Ground Observations',
        titleHi: 'द्वि-मार्गी सामुदायिक जमीनी रिपोर्ट',
        descEn:
          'Farmers and scouts submit real-time pest sightings and local rain gauge readings to continuously calibrate upstream AI models.',
        descHi:
          'किसानों और अधिकारियों द्वारा दर्ज की गई कीट व वर्षा की जमीनी रिपोर्ट जो एआई मॉडल को लगातार सटीक बनाती हैं।',
        kisanTipEn: 'Corroborating a neighbour’s pest report alerts your entire block before the pest crosses economic thresholds.',
        kisanTipHi: 'पड़ोसी किसान की कीट रिपोर्ट की पुष्टि करने से पूरे गांव को समय रहते सतर्क किया जा सकता है।',
        placement: 'top',
      },
    ],
  },

  '/impact': {
    id: 'impact',
    layer: 'page',
    titleEn: 'National Impact Dashboard Guide',
    titleHi: 'राष्ट्रीय प्रभाव डैशबोर्ड मार्गदर्शिका',
    descriptionEn: 'Review pilot program metrics, farmer yield outcomes, and the continuous AI intelligence loop.',
    descriptionHi: 'पायलट कार्यक्रम के परिणाम, किसानों की आय/उपज में सुधार और निरंतर सीखने वाले एआई चक्र का अध्ययन करें।',
    steps: [
      {
        id: 'imp-metrics',
        targetSelector: '#guide-impact-metrics',
        titleEn: '10 Key Platform Impact Metrics',
        titleHi: '10 प्रमुख राष्ट्रीय प्रभाव मेट्रिक्स',
        descEn:
          'Quantifies monitored farms (284), early warnings generated (1,847), delivered advisories (6,392), and resolved disease cases.',
        descHi:
          'निगरानी किए गए खेत (284), जारी चेतावनियां (1,847), दी गई सलाह (6,392) और हल किए गए कृषि मामलों की गणना।',
        kisanTipEn: 'Shows tangible pilot program progress across 6 participating Indian agro-climatic states.',
        kisanTipHi: '6 भारतीय राज्यों में चल रहे पायलट प्रोजेक्ट की वास्तविक प्रगति और आंकड़ों को दर्शाता है।',
        placement: 'bottom',
      },
      {
        id: 'imp-comparison',
        targetSelector: '#guide-impact-comparison',
        titleEn: 'Traditional vs. BKIN Closed Intelligence Loop',
        titleHi: 'पारंपरिक बनाम बीकेआईएन बुद्धिमत्ता चक्र तुलना',
        descEn:
          'Contrasts the reactive, delayed traditional approach with BKIN’s pre-emptive cycle: Observe → Detect → Predict → Explain → Recommend → Act → Measure → Learn.',
        descHi:
          'पारंपरिक देर से होने वाले उपचार के मुकाबले बीकेआईएन के पूर्व-सक्रिय चक्र (अवलोकन → पहचान → पूर्वानुमान → व्याख्या → सलाह → कार्रवाई → सुधार) की तुलना।',
        kisanTipEn: 'Pre-emptive detection saves an average of ₹12,400 per acre by preventing late-stage crop damage.',
        kisanTipHi: 'समय पूर्व पहचान से फसल क्षति रुकती है और प्रति एकड़ औसतन ₹12,400 की बचत होती है।',
        placement: 'top',
      },
      {
        id: 'imp-status',
        targetSelector: '#guide-impact-status',
        titleEn: 'Live Consortium System Status Panel',
        titleHi: 'लाइव कंसोर्टियम सिस्टम स्थिति पैनल',
        descEn:
          'Operational health monitoring across Sentinel-2 satellite ingestion, IMD radar feeds, soil lab APIs, and extension dispatch nodes.',
        descHi:
          'उपग्रह डेटा, मौसम रडार, मिट्टी प्रयोगशालाओं और विस्तार नेटवर्क की लाइव तकनीकी स्थिति की निरंतर निगरानी।',
        kisanTipEn: 'Guarantees 99.8% uptime for mission-critical disaster and biosecurity advisories.',
        kisanTipHi: 'महत्वपूर्ण आपदा और फसल सुरक्षा सलाह के लिए 99.8% निर्बाध सेवा सुनिश्चित करता है।',
        placement: 'top',
      },
    ],
  },
};
