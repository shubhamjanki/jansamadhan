import { AwardedInstitute, Challenge, DistrictStat, InstitutionSLA, NotificationItem, PublicFeedbackItem, QueueItem, SectorVolume, UniversityRankItem } from '../types';

export const INITIAL_QUEUE_ITEMS: QueueItem[] = [
  {
    id: 'q-1',
    refCode: 'JHR-RNC-2025-0814',
    title: 'Ward 14 Ranchi Water Contamination',
    summary: 'Subsurface fecal coliform infiltration detected in municipal tap lines across Kokar & Lalpur zones. Heavy citizen surge.',
    severity: 'Critical',
    citizenReportsCount: 17,
    matchedInstitution: 'BIT Mesra (Dept of Env. Science)',
    department: 'Drinking Water & Sanitation',
    aiFitScore: 96,
    status: 'pending'
  },
  {
    id: 'q-2',
    refCode: 'JHR-DHN-2025-1029',
    title: 'Jharia Coal Dust Air Filtration Need',
    summary: 'PM 2.5 levels exceeding 420µg/m³ near schools in Jharia open-cast periphery. Low-cost electrostatic precipitation pilot requested.',
    severity: 'High',
    citizenReportsCount: 34,
    matchedInstitution: 'IIT (ISM) Dhanbad (Mining Engg)',
    department: 'Mines & Geology / Environment',
    aiFitScore: 99,
    status: 'pending'
  },
  {
    id: 'q-3',
    refCode: 'JHR-DMK-2025-0442',
    title: 'Rural Solar Cold Storage in Dumka',
    summary: 'Tribal tomato growers facing 45% post-harvest rot due to grid intermittency. Micro-chilling decentralization required.',
    severity: 'Moderate',
    citizenReportsCount: 8,
    matchedInstitution: 'NIFFT Ranchi / Birsa Agri Univ',
    department: 'Agriculture & Animal Husbandry',
    aiFitScore: 91,
    status: 'pending'
  },
  {
    id: 'q-4',
    refCode: 'JHR-BKR-2025-0112',
    title: 'Fly Ash Brick Stabilization in Chandrapura',
    summary: 'Thermal power plant fly ash disposal leakage risking Damodar river catchment. Geo-polymer encapsulation required.',
    severity: 'High',
    citizenReportsCount: 22,
    matchedInstitution: 'BIT Sindri (Chemical Engg)',
    department: 'Urban Development & Housing',
    aiFitScore: 94,
    status: 'pending'
  }
];

export const CHALLENGES_DATA: Challenge[] = [
  {
    id: 'JH-W-2025-08',
    title: 'Deep Aquifer Arsenic & Iron Filtration for Sub-Urban Settlements',
    category: 'Water Quality',
    district: 'Ranchi',
    summary: 'Consolidated from 28 reports in Namkum and Hatia belts. Seeking low-maintenance community filter pods functioning under intermittent solar power.',
    matchedLab: 'NIT Jamshedpur Env Lab',
    matchedLabDepartment: 'Environmental Engineering Center',
    sponsoringBody: 'Tata Steel Foundation (CSR)',
    grantPool: '₹24,50,000',
    reportsCount: 28,
    status: 'Prototype Dev',
    severity: 'Critical',
    aiMatchScore: 97,
    coordinates: '23.3441° N, 85.3096° E',
    fullDescription: 'Groundwater sampling in Namkum and Hatia revealed arsenic concentrations of 0.08 mg/L (statutory ceiling: 0.01 mg/L) combined with intense iron oxidation. The objective is to engineer a multi-stage bio-sand and nano-adsorbent zeolite canister that operates without continuous AC grid connectivity and requires cartridge replacement only every 180 days.'
  },
  {
    id: 'JH-C-2025-44',
    title: 'Coal Slurry & Fly Ash Autonomous Solid-Block Compaction System',
    category: 'Waste Management',
    district: 'Dhanbad',
    summary: 'Jharia urban perimeter reporting heavy particulate runoff during monsoons. Need on-site mobile stabilization machinery converting slurry into construction bricks.',
    matchedLab: 'BIT Sindri Mechanical PI',
    matchedLabDepartment: 'Department of Mechanical & Mineral Processing',
    sponsoringBody: 'BCCL Sustainable Fund',
    grantPool: '₹38,00,000',
    reportsCount: 34,
    status: 'Prototype Dev',
    severity: 'High',
    aiMatchScore: 99,
    coordinates: '23.7957° N, 86.4304° E',
    fullDescription: 'Open-cast coal mining peripheral ponds in Jharia pose systemic breach hazards during high rainfall. The proposed machine unit will draw raw slurry directly from settling ponds, combine it with flue gas fly-ash and a non-toxic alkaline activator, and press it at 200 bar into load-bearing interlocking civic pavers for rural road embankments.'
  },
  {
    id: 'JH-E-2025-19',
    title: 'DC Solar Cold Storage Units for Hill Cultivators & Flower Merchants',
    category: 'Renewable Microgrid',
    district: 'Deoghar',
    summary: 'Consolidated demand from Baidyanath temple flower supplier co-ops and local smallholders needing decentralized cold-chain retention before transport.',
    matchedLab: 'BIT Mesra EEE Dept',
    matchedLabDepartment: 'Renewable Energy & Power Electronics Lab',
    sponsoringBody: 'Jharkhand Renewable (JREDA)',
    grantPool: '₹18,20,000',
    reportsCount: 19,
    status: 'Field Pilot',
    severity: 'Moderate',
    aiMatchScore: 94,
    coordinates: '24.4826° N, 86.6974° E',
    fullDescription: 'Pilgrim flower merchants and organic strawberry farmers around Trikut hills face 40%+ spoilage during summer months. This project deploys variable-speed DC brushless compressors driven directly by 3.2kW solar photovoltaic arrays with PCM (Phase Change Material) thermal energy storage buffers, removing the requirement for lithium-ion battery banks.'
  },
  {
    id: 'JH-AG-2025-31',
    title: 'Millet Processing & Micro-Dehuller for Tribal Women Self Help Groups',
    category: 'AgTech & Livelihood',
    district: 'Khunti',
    summary: 'Traditional finger millet (Ragi) harvesting in Torpa block constrained by manual pounding. High-throughput portable dehullers required.',
    matchedLab: 'Birsa Agricultural University',
    matchedLabDepartment: 'Farm Machinery & Post-Harvest Engineering',
    sponsoringBody: 'Jharkhand State Livelihood Promotion Society (JSLPS)',
    grantPool: '₹14,00,000',
    reportsCount: 15,
    status: 'Dept Validated',
    severity: 'Moderate',
    aiMatchScore: 92,
    coordinates: '23.0722° N, 85.2789° E',
    fullDescription: 'Khunti tribal cooperatives produce over 1,200 metric tonnes of organic ragi annually, but capture minimal margin due to reliance on manual pestle dehulling. The project delivers a 50kg/hr single-phase portable mechanical huller with cyclone chaff separation tailored for women operator ergonomics.'
  },
  {
    id: 'JH-HL-2025-12',
    title: 'Autonomous Cold-Box Drone Relay for Anti-Venom to Remote Forest Health Posts',
    category: 'Healthcare Logistics',
    district: 'Palamu',
    summary: 'Viper and krait snakebites in Betla reserve fringe communities experience 4+ hour delays for anti-venom serum arrival due to unpaved hilly roads.',
    matchedLab: 'IIT (ISM) Dhanbad Robotics Cell',
    matchedLabDepartment: 'Autonomous Systems & Unmanned Aerial Tech',
    sponsoringBody: 'National Health Mission Jharkhand',
    grantPool: '₹29,00,000',
    reportsCount: 26,
    status: 'Prototype Dev',
    severity: 'Critical',
    aiMatchScore: 95,
    coordinates: '24.0384° N, 84.0729° E',
    fullDescription: 'A custom long-range fixed-wing VTOL drone delivery corridor connecting Daltonganj Sadar Hospital to primary health sub-centres inside deep sal forests. Features active Peltier-cooled payload payload capsule maintaining 2-8°C with fail-safe parachute landing.'
  }
];

export const DISTRICT_STATS: DistrictStat[] = [
  {
    name: 'Ranchi',
    rank: 1,
    alerts: 2840,
    severityLevel: 4,
    status: 'Critical',
    activeClusters: 17,
    criticalHotzones: 5,
    slaRate: 89.4,
    anchorLab: 'BIT Mesra Env Sc.',
    activeGrants: 3,
    blocksCount: 18,
    lat: 23.3441,
    lng: 85.3096,
    solvedCount: 48,
    turnaroundDays: 45
  },
  {
    name: 'Dhanbad',
    rank: 2,
    alerts: 2190,
    severityLevel: 4,
    status: 'Critical',
    activeClusters: 14,
    criticalHotzones: 4,
    slaRate: 94.1,
    anchorLab: 'IIT (ISM) Dhanbad Mining',
    activeGrants: 4,
    blocksCount: 10,
    lat: 23.7957,
    lng: 86.4304,
    solvedCount: 31,
    turnaroundDays: 52
  },
  {
    name: 'East Singhbhum',
    rank: 3,
    alerts: 1620,
    severityLevel: 3,
    status: 'High',
    activeClusters: 11,
    criticalHotzones: 3,
    slaRate: 92.4,
    anchorLab: 'NIT Jamshedpur Metallurgical',
    activeGrants: 2,
    blocksCount: 11,
    lat: 22.8046,
    lng: 86.2029,
    solvedCount: 28,
    turnaroundDays: 48
  },
  {
    name: 'Bokaro',
    rank: 4,
    alerts: 1140,
    severityLevel: 3,
    status: 'High',
    activeClusters: 8,
    criticalHotzones: 2,
    slaRate: 91.0,
    anchorLab: 'BIT Sindri Materials',
    activeGrants: 2,
    blocksCount: 9,
    lat: 23.6693,
    lng: 86.1511,
    solvedCount: 24,
    turnaroundDays: 49
  },
  {
    name: 'Hazaribagh',
    rank: 5,
    alerts: 980,
    severityLevel: 2,
    status: 'Moderate',
    activeClusters: 6,
    criticalHotzones: 1,
    slaRate: 88.0,
    anchorLab: 'Vinoba Bhave Univ Sciences',
    activeGrants: 1,
    blocksCount: 16,
    lat: 23.9925,
    lng: 85.3637,
    solvedCount: 19,
    turnaroundDays: 54
  },
  {
    name: 'Deoghar',
    rank: 6,
    alerts: 890,
    severityLevel: 2,
    status: 'Moderate',
    activeClusters: 5,
    criticalHotzones: 1,
    slaRate: 88.5,
    anchorLab: 'AIIMS Deoghar / BIT Extension',
    activeGrants: 2,
    blocksCount: 10,
    lat: 24.4826,
    lng: 86.6974,
    solvedCount: 22,
    turnaroundDays: 58
  },
  {
    name: 'Palamu',
    rank: 7,
    alerts: 740,
    severityLevel: 2,
    status: 'Moderate',
    activeClusters: 4,
    criticalHotzones: 1,
    slaRate: 86.2,
    anchorLab: 'Nilamber Pitamber Univ',
    activeGrants: 1,
    blocksCount: 21,
    lat: 24.0384,
    lng: 84.0729,
    solvedCount: 16,
    turnaroundDays: 61
  },
  {
    name: 'Dumka',
    rank: 8,
    alerts: 680,
    severityLevel: 2,
    status: 'Moderate',
    activeClusters: 4,
    criticalHotzones: 1,
    slaRate: 87.0,
    anchorLab: 'Sido Kanhu Murmu Univ',
    activeGrants: 1,
    blocksCount: 10,
    lat: 24.2694,
    lng: 87.2519,
    solvedCount: 18,
    turnaroundDays: 59
  }
];

export const SECTOR_VOLUMES: SectorVolume[] = [
  {
    sector: 'Water Security & Urban Drainage',
    reports: 4120,
    percentage: 33,
    verifiedChallenges: 1420,
    activeProjects: 46,
    barWidthPercent: 76,
    colorClass: 'bg-secondary'
  },
  {
    sector: 'Clean Energy & Rural Electrification',
    reports: 2890,
    percentage: 23,
    verifiedChallenges: 980,
    activeProjects: 32,
    barWidthPercent: 58,
    colorClass: 'bg-primary'
  },
  {
    sector: 'Waste Management & Mining Dust',
    reports: 2410,
    percentage: 19,
    verifiedChallenges: 742,
    activeProjects: 28,
    barWidthPercent: 48,
    colorClass: 'bg-secondary-container'
  },
  {
    sector: 'AgTech, Chilling & Forest Produce',
    reports: 1820,
    percentage: 15,
    verifiedChallenges: 480,
    activeProjects: 34,
    barWidthPercent: 38,
    colorClass: 'bg-surface-tint'
  },
  {
    sector: 'Rural Healthcare Logistics',
    reports: 1240,
    percentage: 10,
    verifiedChallenges: 220,
    activeProjects: 24,
    barWidthPercent: 25,
    colorClass: 'bg-primary-container'
  }
];

export const INSTITUTIONS_SLA: InstitutionSLA[] = [
  {
    code: 'ISM',
    name: 'IIT (ISM) Dhanbad',
    grantsCount: 38,
    deptsCount: 9,
    slaDays: 3.2,
    quartileStatus: 'Top Quartile',
    badgeColor: 'bg-primary text-on-primary'
  },
  {
    code: 'BIT',
    name: 'BIT Mesra Ranchi',
    grantsCount: 44,
    deptsCount: 11,
    slaDays: 4.1,
    quartileStatus: 'Top Quartile',
    badgeColor: 'bg-secondary text-on-secondary'
  },
  {
    code: 'NIT',
    name: 'NIT Jamshedpur',
    grantsCount: 29,
    deptsCount: 7,
    slaDays: 5.8,
    quartileStatus: 'Target SLA',
    badgeColor: 'bg-surface-container-highest text-on-surface'
  },
  {
    code: 'BAU',
    name: 'Birsa Agricultural University',
    grantsCount: 21,
    deptsCount: 5,
    slaDays: 7.4,
    quartileStatus: 'Review Flag',
    badgeColor: 'bg-surface-container-highest text-on-surface'
  }
];

export const NOTIFICATIONS_DATA: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'High Influx in Jharia Open-Cast Belt',
    description: '34 citizen reports consolidated into single ticket JHR-DHN-2025-1029.',
    timeAgo: '4 mins ago',
    severity: 'urgent',
    read: false
  },
  {
    id: 'notif-2',
    title: 'BIT Mesra Lab Proposal Clearance',
    description: 'Financial approval granted for Zeolite Adsorption Pilot in Ranchi Ward 14.',
    timeAgo: '18 mins ago',
    severity: 'success',
    read: false
  },
  {
    id: 'notif-3',
    title: 'New Satellite Telemetry Feed Active',
    description: 'Groundwater anomaly vector updated across Santhal Pargana division.',
    timeAgo: '1 hour ago',
    severity: 'info',
    read: false
  },
  {
    id: 'notif-4',
    title: 'Tata Steel CSR Matching Pledged',
    description: '₹24.5 Lakh co-funding allocated for Hatia Clean Aquifer challenge.',
    timeAgo: '3 hours ago',
    severity: 'success',
    read: true
  }
];

export const UNIVERSITY_RANKINGS: UniversityRankItem[] = [
  {
    rank: 1,
    name: 'Birla Institute of Technology (BIT) Mesra',
    shortCode: 'BIT Mesra',
    location: 'Ranchi, Jharkhand',
    logoBadge: 'BIT',
    solvedCount: 48,
    activeCount: 14,
    slaRate: 96.8,
    avgTurnaroundDays: 41,
    satisfactionRating: 4.9,
    topDomains: ['Aquifer Nanofiltration', 'Renewable Microgrids', 'Agro-Chilling'],
    flagshipSolution: 'Zero-Grid Arsenic & Iron Canister Filter (Kokar & Namkum deployment)',
    grantWon: '₹1.85 Crore'
  },
  {
    rank: 2,
    name: 'Indian Institute of Technology (ISM) Dhanbad',
    shortCode: 'IIT (ISM)',
    location: 'Dhanbad, Jharkhand',
    logoBadge: 'ISM',
    solvedCount: 39,
    activeCount: 12,
    slaRate: 95.4,
    avgTurnaroundDays: 44,
    satisfactionRating: 4.8,
    topDomains: ['Mining Particulate Filtration', 'Subsurface Robotics', 'Drone Medical Relay'],
    flagshipSolution: 'High-Density Electrostatic Dust Barrier for Open-Cast School Corridors',
    grantWon: '₹2.10 Crore'
  },
  {
    rank: 3,
    name: 'National Institute of Technology (NIT) Jamshedpur',
    shortCode: 'NIT JSR',
    location: 'Jamshedpur, East Singhbhum',
    logoBadge: 'NIT',
    solvedCount: 31,
    activeCount: 9,
    slaRate: 92.6,
    avgTurnaroundDays: 48,
    satisfactionRating: 4.7,
    topDomains: ['Heavy Metal Precipitation', 'Industrial Slag Pavers', 'Smart Sensors'],
    flagshipSolution: 'Direct Hexavalent Chromium Neutralizer for Subarnarekha Basin',
    grantWon: '₹1.45 Crore'
  },
  {
    rank: 4,
    name: 'Birsa Agricultural University (BAU)',
    shortCode: 'BAU Ranchi',
    location: 'Kanke, Ranchi',
    logoBadge: 'BAU',
    solvedCount: 24,
    activeCount: 8,
    slaRate: 90.2,
    avgTurnaroundDays: 50,
    satisfactionRating: 4.8,
    topDomains: ['Tribal Post-Harvest Tech', 'Solar Micro-Chilling', 'Bio-Fertilizers'],
    flagshipSolution: 'Portable Ergonomic Millet Dehuller for Torpa Women Cooperatives',
    grantWon: '₹95 Lakh'
  },
  {
    rank: 5,
    name: 'Birsa Institute of Technology (BIT) Sindri',
    shortCode: 'BIT Sindri',
    location: 'Dhanbad, Jharkhand',
    logoBadge: 'BTS',
    solvedCount: 19,
    activeCount: 7,
    slaRate: 88.7,
    avgTurnaroundDays: 52,
    satisfactionRating: 4.6,
    topDomains: ['Thermal Fly Ash Stabilization', 'Alkaline Road Blocks', 'Effluent Plants'],
    flagshipSolution: 'Fly-Ash Composite Interlocking Blocks for Rural Embankments',
    grantWon: '₹80 Lakh'
  },
  {
    rank: 6,
    name: 'All India Institute of Medical Sciences (AIIMS) Deoghar',
    shortCode: 'AIIMS DEO',
    location: 'Deoghar, Jharkhand',
    logoBadge: 'AIM',
    solvedCount: 15,
    activeCount: 5,
    slaRate: 89.1,
    avgTurnaroundDays: 46,
    satisfactionRating: 4.9,
    topDomains: ['Anti-Venom Cold Chain', 'Tele-Pathology Probes', 'Forest First-Aid'],
    flagshipSolution: 'Peltier-Cooled Anti-Venom Drone Transport System',
    grantWon: '₹75 Lakh'
  }
];

export const AWARDED_INSTITUTES: AwardedInstitute[] = [
  {
    id: 'award-1',
    awardTitle: "Governor's State Innovation Gold Trophy 2024-25",
    awardYear: '2024-25',
    category: 'Clean Water & Public Health',
    instituteName: 'Birla Institute of Technology (BIT) Mesra',
    instituteCode: 'BIT Mesra',
    solutionName: 'Nanotech Arsenic & Bacterial Filter Canisters',
    citation: 'For delivering maintenance-free gravity filtration to 45,000 tribal households across Namkum and Hatia, eradicating waterborne diarrheal outbreaks.',
    impactMetrics: {
      livesBenefited: '45,000+ Citizens',
      districtsDeployed: 4,
      grantAmount: '₹35,00,000'
    },
    trophyIcon: 'military_tech',
    badgeBg: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'award-2',
    awardTitle: "Chief Minister's Clean Air & Mining Stewardship Medal",
    awardYear: '2024-25',
    category: 'Industrial Air Quality & Child Safety',
    instituteName: 'Indian Institute of Technology (ISM) Dhanbad',
    instituteCode: 'IIT (ISM)',
    solutionName: 'Electrostatic Dust Curtain for Jharia Open-Cast Schools',
    citation: 'For designing low-cost particulate curtains cutting respirable ambient PM 2.5 levels by 68% in 18 primary schools adjacent to coal mining pits.',
    impactMetrics: {
      livesBenefited: '18,500+ Children',
      districtsDeployed: 2,
      grantAmount: '₹40,00,000'
    },
    trophyIcon: 'workspace_premium',
    badgeBg: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'award-3',
    awardTitle: 'Jharkhand Tribal Livelihoods & Agro-Excellence Award',
    awardYear: '2024-25',
    category: 'Rural Economy & Women SHGs',
    instituteName: 'Birsa Agricultural University (BAU)',
    instituteCode: 'BAU Ranchi',
    solutionName: 'Decentralized Solar Chilling & Millet De-hullers',
    citation: 'For saving over 140 tonnes of tomato and finger millet crops from spoilage, doubling the take-home income of 820 indigenous women self-help group members.',
    impactMetrics: {
      livesBenefited: '3,200+ Farmers',
      districtsDeployed: 3,
      grantAmount: '₹25,00,000'
    },
    trophyIcon: 'eco',
    badgeBg: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'award-4',
    awardTitle: 'State Circular Economy & Slag Valorization Laureate',
    awardYear: '2024-25',
    category: 'Waste Recycling & Green Infrastructure',
    instituteName: 'National Institute of Technology (NIT) Jamshedpur',
    instituteCode: 'NIT JSR',
    solutionName: 'Zero-Cement Industrial Slag Paving Blocks',
    citation: 'In collaboration with Tata Steel CSR, converting 12,000 tons of blast-furnace slag into flood-resistant rural walkway tiles across Kolhan division.',
    impactMetrics: {
      livesBenefited: '32,000+ Commuters',
      districtsDeployed: 2,
      grantAmount: '₹30,00,000'
    },
    trophyIcon: 'recycling',
    badgeBg: 'from-orange-500 to-amber-700'
  }
];

export const PUBLIC_FEEDBACK_DATA: PublicFeedbackItem[] = [
  {
    id: 'fb-1',
    citizenName: 'Sunita Devi',
    villageOrWard: 'Ward 14, Kokar',
    district: 'Ranchi',
    date: '3 days ago',
    rating: 5,
    category: 'Water Quality',
    solvedProblemTitle: 'Coliform Infiltration in Municipal Tap Lines',
    solvingInstitute: 'BIT Mesra (Env. Engineering Lab)',
    comment: 'For 6 months our taps were giving smelly yellow water. We filed a grievance on Jan Samadhan with a voice note. Within 38 days, the BIT Mesra team installed testing pods and an automated backwash filter canister. Now our children are drinking clean water without stomach infections.',
    verifiedCitizen: true,
    upvotesCount: 84
  },
  {
    id: 'fb-2',
    citizenName: 'Manoj Kumar Soren',
    villageOrWard: 'Tisra Panchayat, Jharia',
    district: 'Dhanbad',
    date: '1 week ago',
    rating: 5,
    category: 'Air Quality & Dust',
    solvedProblemTitle: 'Coal Dust Settling in Primary School',
    solvingInstitute: 'IIT (ISM) Dhanbad (Mining Engg)',
    comment: 'The coal trucks were blowing heavy dust straight into the classroom windows. The prototype air dust barriers designed by ISM students operate on solar and catch the black soot before it enters classrooms. Our kids can now breathe freely.',
    verifiedCitizen: true,
    upvotesCount: 62
  },
  {
    id: 'fb-3',
    citizenName: 'Jhalo Mahato',
    villageOrWard: 'Torpa Block',
    district: 'Khunti',
    date: '2 weeks ago',
    rating: 5,
    category: 'Agriculture & Livelihood',
    solvedProblemTitle: 'Finger Millet (Ragi) Manual Pounding Loss',
    solvingInstitute: 'Birsa Agricultural University (Farm Machinery)',
    comment: 'Earlier our women SHG members spent 5 hours daily beating millet with wooden pestles with blisters on our hands. The portable machine given by Birsa Agricultural University dehulls 50 kg in one hour! We sold packaged flour directly in Ranchi markets at double the price.',
    verifiedCitizen: true,
    upvotesCount: 119
  },
  {
    id: 'fb-4',
    citizenName: 'Deepak Besra',
    villageOrWard: 'Ghatsila Rural',
    district: 'East Singhbhum',
    date: '3 weeks ago',
    rating: 4,
    category: 'Clean Water',
    solvedProblemTitle: 'Iron & Manganese Infiltration in Borewells',
    solvingInstitute: 'NIT Jamshedpur',
    comment: 'The tube-well water used to stain our clothes and cooking utensils bright red. NIT Jamshedpur engineers deployed a multi-media zeolite adsorption column. The red color disappeared on day one. Very grateful to the district innovation cell!',
    verifiedCitizen: true,
    upvotesCount: 47
  }
];

