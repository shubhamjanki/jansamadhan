import React, { useState } from 'react';
import { Language } from '../types';
import { SimilarProblemsMap, SimilarProblemLocation } from './SimilarProblemsMap';
import { SlaTimelineTracker } from './SlaTimelineTracker';
import { VernacularAudioDossier } from './VernacularAudioDossier';
import { CitizenDigitalPassModal } from './CitizenDigitalPassModal';
import logoImg from '../assets/images/jan_samadhan_logo_1789843668705.jpg';

export interface ProblemDossierData {
  docketId: string;
  title: string;
  district: string;
  block: string;
  category: string;
  dialect?: string;
  description?: string;
  photoUrl?: string;
  timestamp?: string;
}

interface ProblemDossierScreenProps {
  language: Language;
  dossier: ProblemDossierData;
  onBackToHome: () => void;
  onNavigateToCommandCenter: () => void;
  onOpenSubmitProblem: () => void;
  onShowToast?: (msg: string) => void;
}

export const ProblemDossierScreen: React.FC<ProblemDossierScreenProps> = ({
  language,
  dossier,
  onBackToHome,
  onNavigateToCommandCenter,
  onOpenSubmitProblem,
  onShowToast,
}) => {
  const [isDigitalPassOpen, setIsDigitalPassOpen] = useState(false);
  const [selectedMapProblemId, setSelectedMapProblemId] = useState<string | null>('JH-SIM-01');
  const docket = dossier;

  // Similar historical problems across Jharkhand
  const similarProblems: SimilarProblemLocation[] = [
    {
      id: 'JH-SIM-01',
      title: 'Deep Borewell Arsenic Infiltration in Kokar Ward 14',
      district: 'Ranchi',
      blockOrWard: 'Kokar Urban Fringe',
      similarity: 94.2,
      coordinates: { x: 490, y: 340, lat: 23.372, lng: 85.342 },
      status: 'University Lab Assigned',
      assignedLab: 'BIT Mesra (Environmental Nanotech Lab)',
      submittedAgo: '12 days ago',
      reportsCount: 38,
      category: 'Groundwater Contamination',
      keyFinding: 'High arsenic (0.09 mg/L) with geogenic reddish sediment during dry drawdowns.'
    },
    {
      id: 'JH-SIM-02',
      title: 'Heavy Metal Leaching in Open Cast Coal Haul Corridor',
      district: 'Dhanbad',
      blockOrWard: 'Jharia Coalfield',
      similarity: 88.7,
      coordinates: { x: 670, y: 310, lat: 23.742, lng: 86.418 },
      status: 'Field Pilot Deployed',
      assignedLab: 'IIT (ISM) Dhanbad (Center of Water Engg)',
      submittedAgo: '18 days ago',
      reportsCount: 64,
      category: 'Mine Seepage',
      keyFinding: 'Acid mine drainage with high sulfate & turbidity verified across 3 handpump clusters.'
    },
    {
      id: 'JH-SIM-03',
      title: 'Seasonal Aquifer Turbidity & Low-Yield Borehole Siltation',
      district: 'Khunti',
      blockOrWard: 'Torpa Block',
      similarity: 84.1,
      coordinates: { x: 440, y: 440, lat: 23.072, lng: 85.278 },
      status: 'Lab Protocol Formulated',
      assignedLab: 'Birsa Agricultural University & BIT Mesra',
      submittedAgo: '24 days ago',
      reportsCount: 22,
      category: 'Water Security',
      keyFinding: 'Fine colloidal clay and iron oxide causing premature membrane fouling in rural water points.'
    },
    {
      id: 'JH-SIM-04',
      title: 'Industrial Effluent Leachate into Open Agricultural Wells',
      district: 'Bokaro',
      blockOrWard: 'Chas Industrial Cluster',
      similarity: 79.6,
      coordinates: { x: 590, y: 270, lat: 23.636, lng: 86.178 },
      status: 'Under Technical Evaluation',
      assignedLab: 'BIT Sindri (Chemical & Environmental Cell)',
      submittedAgo: '2 months ago',
      reportsCount: 45,
      category: 'Industrial Effluent',
      keyFinding: 'TDS spikes up to 1,840 mg/L with heavy particulate suspension during summer drawdown.'
    },
    {
      id: 'JH-SIM-05',
      title: 'Heavy Metal Runoff into Subarnarekha Basin Wells',
      district: 'East Singhbhum',
      blockOrWard: 'Musabani Mining Fringe',
      similarity: 76.8,
      coordinates: { x: 740, y: 480, lat: 22.518, lng: 86.452 },
      status: 'Sensor Telemetry Active',
      assignedLab: 'NIT Jamshedpur (Advanced Materials Lab)',
      submittedAgo: '3 weeks ago',
      reportsCount: 31,
      category: 'Heavy Metals',
      keyFinding: 'Copper and manganese trace exceedance requiring catalytic adsorption treatment.'
    }
  ];

  // University Capabilities Breakdown
  const universityCapabilities = [
    {
      name: 'Birla Institute of Technology (BIT) Mesra',
      lab: 'Environmental Nanotechnology & Membrane Research Lab',
      matchScore: 96.4,
      rank: 1,
      patents: 8,
      pilotsDeployed: 14,
      slaTurnaroundEstimate: 'Est. 38 Days (Avg. for category)',
      nodalScientist: 'Dr. R. K. Soren (Dept. of Chemical & Env. Engineering)',
      specializedEquipment: [
        'Inductively Coupled Plasma Mass Spectrometry (ICP-MS)',
        'Graphene Oxide Water Purification Filtration Skid',
        'Continuous Fluoride/Arsenic Field Test Trailer'
      ],
      capabilityRationale:
        'Holds active state patent on biochar-adsorbent catalytic filtration cartridges directly applicable to Jharkhand red-soil geogenic aquifers.'
    },
    {
      name: 'IIT (ISM) Dhanbad',
      lab: 'Center of Excellence in Water & Environmental Engineering',
      matchScore: 92.1,
      rank: 2,
      patents: 12,
      pilotsDeployed: 19,
      slaTurnaroundEstimate: 'Est. 41 Days (Avg. for category)',
      nodalScientist: 'Prof. S. Sengupta (Environmental Resources Division)',
      specializedEquipment: [
        'Automated Micro-Filtration Pilot Trailer Unit',
        'Electrochemical Acid-Drainage Neutralizer Skid',
        'GIS Real-Time Aquifer Hydro-Modeling Cluster'
      ],
      capabilityRationale:
        'Extensive field trial record in coal-belt aquifer rehabilitation with mobile rapid response telemetry vehicles.'
    },
    {
      name: 'National Institute of Technology (NIT) Jamshedpur',
      lab: 'Advanced Materials & Civic Infrastructure Cell',
      matchScore: 88.0,
      rank: 3,
      patents: 5,
      pilotsDeployed: 9,
      slaTurnaroundEstimate: 'Est. 43 Days (Avg. for category)',
      nodalScientist: 'Dr. P. Murmu (Metallurgical & Materials Engineering)',
      specializedEquipment: [
        'Sintered Ceramic Micro-Porous Filter Foundry',
        'Mobile Heavy Metal Spectrophotometry Van'
      ],
      capabilityRationale:
        'Low unit-cost localized manufacturing capability using Jharkhand clay and fly-ash composites for community-scale filtration.'
    }
  ];

  const evidencePhoto = dossier.photoUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80';
  const activeDialect = dossier.dialect || 'Nagpuri';

  return (
    <main className="w-full bg-surface-container-lowest min-h-screen py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">

        {/* Top Breadcrumb & Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-high/80">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant flex-wrap">
            <button
              type="button"
              onClick={onBackToHome}
              className="hover:text-primary font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>{language === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}</span>
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={onNavigateToCommandCenter}
              className="hover:text-primary font-semibold cursor-pointer transition-colors"
            >
              {language === 'hi' ? 'राज्य नवाचार ग्रिड' : 'State Innovation Grid'}
            </button>
            <span>/</span>
            <span className="font-mono font-bold text-secondary">
              Docket #{docket.docketId}
            </span>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto flex-wrap justify-end">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-2.5 sm:px-3.5 py-1.5 rounded-xl border border-surface-container-high bg-surface-container-low hover:bg-surface-container text-primary font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span className="hidden xs:inline">Print</span>
            </button>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                onShowToast?.('Official Dossier link copied to clipboard.');
              }}
              className="px-2.5 sm:px-3.5 py-1.5 rounded-xl border border-surface-container-high bg-surface-container-low hover:bg-surface-container text-primary font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
              <span className="hidden xs:inline">Share</span>
            </button>
            <button
              type="button"
              onClick={onBackToHome}
              className="px-3 sm:px-4 py-1.5 rounded-xl bg-surface-container-high hover:bg-outline text-primary font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Back</span>
            </button>
          </div>
        </div>

        {/* Official Page Header Banner */}
        <div className="bg-primary text-on-primary rounded-3xl p-4 sm:p-8 shadow-xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 relative overflow-hidden">
          {/* Subtle watermark seal */}
          <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none select-none">
            <span className="material-symbols-outlined text-[200px]">account_balance</span>
          </div>

          <div className="flex items-start sm:items-center gap-3 sm:gap-4 z-10">
            <img
              src={logoImg}
              alt="Jan Samadhan Logo"
              className="w-12 h-12 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover border-2 border-amber-400/40 shadow-lg shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                <span className="bg-secondary text-white px-2 sm:px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-black tracking-wider uppercase">
                  Official Gov Portal
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 sm:px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold">
                  Synthesized &amp; Linked
                </span>
              </div>
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                Structured Problem Statement &amp; Cluster Dossier
              </h1>
              <p className="text-xs sm:text-sm text-on-primary-container mt-1 max-w-2xl font-medium">
                Docket <strong className="text-amber-300 font-mono">#{docket.docketId}</strong> • Govt of Jharkhand Research &amp; University Lab Dossier
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-2.5 shrink-0 z-10 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsDigitalPassOpen(true)}
              className="w-full sm:w-auto justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-5 py-2.5 rounded-xl text-xs font-black shadow-lg transition-all flex items-center gap-2 cursor-pointer border border-emerald-400/40"
            >
              <span className="material-symbols-outlined text-[18px]">badge</span>
              <span>Citizen Pass &amp; WhatsApp Alert</span>
            </button>
            <div className="bg-primary-container/40 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-center sm:text-right w-full sm:w-auto">
              <span className="text-[10px] text-on-primary-container font-bold block uppercase tracking-wider">
                Statutory SLA Window
              </span>
              <span className="font-mono text-sm font-black text-amber-300">
                ~41-Day Resolution Target
              </span>
            </div>
          </div>
        </div>

        {/* Top Docket Alert & Quick Meta Strip */}
        <div className="bg-emerald-950/10 border border-emerald-500/30 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-2xl">verified</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono font-black text-base text-primary">
                  DOCKET #{docket.docketId}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-600 text-white">
                  Triaged &amp; Clustered
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-red-600 text-white">
                  Tier-1 Priority
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-primary/10 text-primary">
                  {docket.category}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                Filed for: <strong className="text-primary">{docket.block}, {docket.district} District</strong> • Transmitted to DWSD &amp; BIT Mesra Innovation Cell
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-surface-container-high">
            <div className="text-left md:text-right">
              <span className="text-[10px] text-on-surface-variant font-bold block uppercase">
                Primary Matched Lab
              </span>
              <span className="text-xs font-black text-primary block">
                BIT Mesra • Water Nanotech Lab
              </span>
            </div>
            <div className="text-left md:text-right">
              <span className="text-[10px] text-on-surface-variant font-bold block uppercase">
                Verification Confidence
              </span>
              <span className="text-xs font-mono font-black text-emerald-700 block">
                98.4% Multimodal Match
              </span>
            </div>
          </div>
        </div>

        {/* Vernacular Audio Dossier */}
        <VernacularAudioDossier
          docketId={docket.docketId}
          title={docket.title}
          district={docket.district}
          block={docket.block}
          category={docket.category}
          initialDialect={activeDialect}
        />

        {/* SECTION A: DETAILED STRUCTURED PROBLEM STATEMENT (FORMAL SYNTHESIS) */}
        <section className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-container-high shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-container-high pb-4">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-secondary text-2xl">description</span>
              <div>
                <h2 className="font-headline-md text-headline-md font-bold text-primary text-xl">
                  Official Structured Problem Statement (Synthesis)
                </h2>
                <span className="text-xs text-on-surface-variant">
                  Standardized AI synthesis formulation according to Departmental Research Framework
                </span>
              </div>
            </div>
            <span className="text-xs bg-secondary/10 text-secondary font-bold px-3 py-1 rounded-full self-start sm:self-auto border border-secondary/20">
              Technical Taxonomy: ISO-DW-JH-2025
            </span>
          </div>

          {/* Formal Problem Scope */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
            <div className="space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                1. Problem Definition &amp; Scope:
              </span>
              <div className="text-on-surface leading-relaxed text-xs sm:text-sm bg-surface-container-lowest p-4 rounded-2xl border border-surface-container-high shadow-xs">
                <p className="font-semibold text-primary mb-1">{docket.title}</p>
                <p className="text-on-surface-variant">
                  {docket.description ||
                    `Severe water quality degradation reported across ${docket.block} affecting rural households relying exclusively on community deep borewells. Field samples exhibit high particulate turbidity, distinct reddish precipitation, and persistent taste anomalies exceeding safe potable standards.`}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                2. Hypothesized Technical Root Cause:
              </span>
              <div className="text-on-surface leading-relaxed text-xs sm:text-sm bg-surface-container-lowest p-4 rounded-2xl border border-surface-container-high shadow-xs">
                <p className="font-semibold text-primary mb-1">Geogenic Leaching &amp; Aquifer Drawdown</p>
                <p className="text-on-surface-variant">
                  Geogenic leaching of unoxidized Iron (Fe²⁺) and Arsenic (As³⁺) minerals through fractured basalt aquifers due to intensive post-monsoon water table drawdown, compounded by the absence of localized micro-porous filtration beds.
                </p>
              </div>
            </div>
          </div>

          {/* Community Impact & Vulnerability Matrix */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            <div className="bg-surface-container-lowest p-4 rounded-2xl border border-surface-container-high shadow-xs">
              <span className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider block">Affected Population</span>
              <span className="text-xl font-black text-primary mt-1 block">~640 Citizens</span>
              <span className="text-[11px] text-secondary font-medium block mt-0.5">60+ Tribal Households</span>
            </div>
            <div className="bg-surface-container-lowest p-4 rounded-2xl border border-surface-container-high shadow-xs">
              <span className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider block">Contamination Risk</span>
              <span className="text-xl font-black text-red-600 mt-1 block">Critical / High</span>
              <span className="text-[11px] text-on-surface-variant font-medium block mt-0.5">BIS 10500 Non-compliant</span>
            </div>
            <div className="bg-surface-container-lowest p-4 rounded-2xl border border-surface-container-high shadow-xs">
              <span className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider block">Nodal Department</span>
              <span className="text-xl font-black text-primary mt-1 block truncate">DWSD Jharkhand</span>
              <span className="text-[11px] text-secondary font-medium block mt-0.5">Executive Engineer DWSD</span>
            </div>
            <div className="bg-surface-container-lowest p-4 rounded-2xl border border-surface-container-high shadow-xs">
              <span className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider block">Recommended Action</span>
              <span className="text-xl font-black text-emerald-600 mt-1 block truncate">Catalytic Skid</span>
              <span className="text-[11px] text-on-surface-variant font-medium block mt-0.5">University Field Pilot</span>
            </div>
          </div>
        </section>

        {/* SECTION B: MULTIMODAL EXTRACTION AUDIT (IMAGE & DIALECT VOICE) */}
        <section className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-container-high shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-container-high pb-4">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-secondary text-2xl">document_scanner</span>
              <div>
                <h2 className="font-headline-md text-headline-md font-bold text-primary text-xl">
                  Multimodal Extraction Audit (Image &amp; Dialect Voice)
                </h2>
                <span className="text-xs text-on-surface-variant">
                  Evidence verified by Computer Vision &amp; State AI Acoustic Feature Engine
                </span>
              </div>
            </div>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-bold border border-emerald-200 flex items-center gap-1.5 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Verified by Computer Vision Engine
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Visual Evidence Preview */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-video border border-surface-container-high bg-black shadow-md">
              <img
                src={evidencePhoto}
                alt="Analyzed sample evidence"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-2 border-dashed border-red-400/80 m-3 rounded-xl pointer-events-none flex items-start justify-end p-2">
                <span className="bg-red-600 text-white text-[10px] font-mono px-2 py-0.5 rounded-md shadow-md">
                  Discoloration: Fe-Oxide Detected (91.4%)
                </span>
              </div>
            </div>

            {/* Telemetry Parameter Table */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-surface-container-high shadow-xs">
                <span className="text-on-surface-variant block text-[11px] font-bold uppercase">Estimated Turbidity</span>
                <span className="font-mono font-black text-primary text-base mt-0.5 block">28.0 NTU (Field) / 4.8 NTU</span>
                <span className="text-[11px] text-red-600 block mt-0.5 font-semibold">⚠️ Exceeds permissible 1.0 NTU</span>
              </div>
              <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-surface-container-high shadow-xs">
                <span className="text-on-surface-variant block text-[11px] font-bold uppercase">Precipitate Index</span>
                <span className="font-mono font-black text-primary text-base mt-0.5 block">High (Fe / As Oxide)</span>
                <span className="text-[11px] text-amber-700 block mt-0.5 font-semibold">Inorganic colloidal suspension</span>
              </div>
              <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-surface-container-high shadow-xs">
                <span className="text-on-surface-variant block text-[11px] font-bold uppercase">EXIF GPS Geotag</span>
                <span className="font-mono font-black text-primary text-base mt-0.5 block">23.3441° N, 85.3096° E</span>
                <span className="text-[11px] text-emerald-700 block mt-0.5 font-semibold">✓ Verified inside {docket.district}</span>
              </div>
              <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-surface-container-high shadow-xs">
                <span className="text-on-surface-variant block text-[11px] font-bold uppercase">Dialect Audio Calibration</span>
                <span className="font-mono font-black text-primary text-base mt-0.5 block">{activeDialect} Dialect</span>
                <span className="text-[11px] text-secondary block mt-0.5 font-semibold">98.4% transcription confidence</span>
              </div>
            </div>
          </div>
        </section>

        {/* RESEARCH MILESTONE & FIELD RESOLUTION TRACKER */}
        <SlaTimelineTracker
          docketId={docket.docketId}
          category={docket.category}
          district={docket.district}
          block={docket.block}
          matchedLab="BIT Mesra Environmental Engineering Lab"
        />

        {/* SECTION C: GEOSPATIAL MAP OF SIMILAR SUBMITTED PROBLEMS */}
        <section className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-container-high shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-headline-md text-headline-md font-bold text-primary text-xl flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">explore</span>
                Jharkhand Geospatial Cluster Map (Similar Problems Registered Across Locations)
              </h2>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Click any marker pin on the map to inspect historical tickets, distance vectors, and assigned university research teams.
              </p>
            </div>
          </div>

          {/* Map Canvas Component */}
          <SimilarProblemsMap
            currentProblem={{
              title: docket.title,
              district: docket.district,
              block: docket.block,
              category: docket.category,
              coordinates: { x: 490, y: 340, lat: 23.3441, lng: 85.3096 },
            }}
            similarProblems={similarProblems}
            selectedProblemId={selectedMapProblemId}
            onSelectProblem={(p) => setSelectedMapProblemId(p ? p.id : null)}
          />
        </section>

        {/* SECTION D: SEMANTIC MATCHING OF SIMILAR PROBLEMS FROM DIFFERENT LOCATIONS */}
        <section className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-container-high shadow-md space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-container-high pb-4">
            <div>
              <h2 className="font-headline-md text-headline-md font-bold text-primary text-xl flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">share_location</span>
                Semantic Cluster Matches in Other Districts &amp; Wards
              </h2>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Correlated by dense text embeddings, hydrological profiles, and visual feature similarity across Jharkhand.
              </p>
            </div>
            <span className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full self-start sm:self-auto border border-secondary/20">
              {similarProblems.length} Historical Correlated Clusters
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {similarProblems.map((prob) => (
              <div
                key={prob.id}
                onClick={() => setSelectedMapProblemId(prob.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  selectedMapProblemId === prob.id
                    ? 'bg-surface-container-lowest border-secondary shadow-md ring-2 ring-secondary/30'
                    : 'bg-surface-container-low border-surface-container-high hover:bg-surface-container-lowest'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-wider">
                      {prob.district} • {prob.blockOrWard}
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      prob.similarity >= 85 ? 'bg-red-600 text-white' : 'bg-amber-500 text-black'
                    }`}>
                      {prob.similarity}% Match
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-primary leading-snug">
                    {prob.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1.5 line-clamp-2">
                    {prob.keyFinding}
                  </p>
                </div>

                <div className="border-t border-surface-container-high/80 pt-2.5 flex items-center justify-between text-[11px]">
                  <span className="text-secondary font-bold truncate max-w-[180px]">
                    Lab: {prob.assignedLab}
                  </span>
                  <span className="text-on-surface-variant font-medium">
                    {prob.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION E: CAPABLE SECTORS & MATCHING CAPABILITY OF UNIVERSITIES */}
        <section className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-container-high shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-container-high pb-4">
            <div>
              <h2 className="font-headline-md text-headline-md font-bold text-primary text-xl flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">school</span>
                University Research Labs &amp; Technical Capability Scoreboard
              </h2>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Automated fit calculation based on specialized laboratory instrumentation, patent depth, and field SLA history.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 self-start sm:self-auto">
              Primary Routing: BIT Mesra (Rank #1)
            </span>
          </div>

          <div className="space-y-4">
            {universityCapabilities.map((univ) => (
              <div
                key={univ.name}
                className="p-5 rounded-2xl border border-surface-container-high bg-surface-container-low flex flex-col gap-3 hover:bg-surface-container transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center">
                        #{univ.rank}
                      </span>
                      <h3 className="font-bold text-base text-primary">
                        {univ.name}
                      </h3>
                      <span className="text-xs font-semibold text-secondary">
                        ({univ.lab})
                      </span>
                    </div>
                    <span className="text-xs text-on-surface-variant block mt-1">
                      Lead Nodal Investigator: <strong className="text-primary">{univ.nodalScientist}</strong>
                    </span>
                  </div>

                  {/* Capability Fit Badge */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-on-surface-variant font-bold uppercase block">Capability Match</span>
                      <span className="font-mono text-lg font-black text-secondary">
                        {univ.matchScore}%
                      </span>
                    </div>
                    <div className="w-20 bg-surface-container-highest rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-secondary h-full rounded-full"
                        style={{ width: `${univ.matchScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-on-surface-variant leading-relaxed">
                  <strong className="text-primary font-bold">Turnaround Strategy: </strong>
                  {univ.capabilityRationale}
                </p>

                {/* Specialized Equipment Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">Lab Hardware:</span>
                  {univ.specializedEquipment.map((eq) => (
                    <span
                      key={eq}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-surface-container-lowest text-primary border border-surface-container-high"
                    >
                      ✓ {eq}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-on-surface-variant pt-2 border-t border-surface-container-high/80">
                  <span>Historical SLA: <strong className="text-emerald-700 font-bold">{univ.slaTurnaroundEstimate}</strong></span>
                  <span>Track Record: <strong>{univ.pilotsDeployed} Field Pilots</strong> • <strong>{univ.patents} State Patents</strong></span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Bottom Action Bar */}
        <div className="bg-surface rounded-2xl p-4 sm:p-5 border border-surface-container-high shadow-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low hover:bg-surface-container text-primary font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              <span>Print Dossier PDF</span>
            </button>
            <button
              type="button"
              onClick={() => setIsDigitalPassOpen(true)}
              className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
              <span>Citizen Pass &amp; WhatsApp</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onOpenSubmitProblem}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer text-center"
            >
              Register Another Problem
            </button>

            <button
              type="button"
              onClick={onNavigateToCommandCenter}
              className="w-full sm:w-auto bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">monitoring</span>
              <span>Track in Command Center</span>
            </button>

            <button
              type="button"
              onClick={onBackToHome}
              className="w-full sm:w-auto bg-secondary hover:bg-[#c2410c] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer border border-amber-400/30 text-center"
            >
              Done &amp; Back to Portal
            </button>
          </div>
        </div>

      </div>

      {/* CITIZEN DIGITAL PASS & WHATSAPP MODAL */}
      <CitizenDigitalPassModal
        isOpen={isDigitalPassOpen}
        onClose={() => setIsDigitalPassOpen(false)}
        language={language}
        ticket={{
          id: docket.docketId,
          title: docket.title || `Water Security & Aquifer Contamination in ${docket.block}, ${docket.district}`,
          district: docket.district,
          block: docket.block,
          category: docket.category,
          matchedLab: 'BIT Mesra (Environmental Engineering Lab)',
          date: docket.timestamp || '20 Sep 2025',
          slaDays: 41,
        }}
      />
    </main>
  );
};
