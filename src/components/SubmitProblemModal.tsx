import React, { useState, useEffect } from 'react';
import { DISTRICT_STATS } from '../data/mockData';
import { SimilarProblemsMap, SimilarProblemLocation } from './SimilarProblemsMap';
import { SlaTimelineTracker } from './SlaTimelineTracker';
import { VernacularAudioDossier } from './VernacularAudioDossier';
import { CitizenDigitalPassModal } from './CitizenDigitalPassModal';
import logoImg from '../assets/images/jan_samadhan_logo_1789843668705.jpg';

interface SubmitProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (ticket: { id: string; title: string; district: string }) => void;
  initialData?: {
    title?: string;
    category?: string;
    district?: string;
    block?: string;
    description?: string;
    photoUrl?: string;
    autoStartProcessing?: boolean;
  } | null;
  onNavigateToCommandCenter?: () => void;
}

export const SubmitProblemModal: React.FC<SubmitProblemModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  initialData,
  onNavigateToCommandCenter,
}) => {
  // Modal Workflow Steps: 'form' | 'processing' | 'report'
  const [modalStep, setModalStep] = useState<'form' | 'processing' | 'report'>('form');

  // Intake Form State
  const [inputMode, setInputMode] = useState<'text' | 'voice' | 'photo'>('text');
  const [district, setDistrict] = useState('Ranchi');
  const [block, setBlock] = useState('Namkum Ward 14');
  const [category, setCategory] = useState('Water Security & Aquifer Contamination');
  const [dialect, setDialect] = useState<'Santali' | 'Ho' | 'Mundari' | 'Khortha' | 'Nagpuri' | 'Hindi'>('Santali');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [photoSelected, setPhotoSelected] = useState(true);
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string>(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDVs1KxTJut34izNR6-BSK0ohQqvO9Q-SWWgPeE5PN4mgTK5NdQUYVfi1YkT2p-Zmdk2SDUjoU1hDy5efAyAaDBxEmjuplpvQZYdRBLMS_4ZocwApcfsq81CDFkAb2G4KQSBVagdC55YjLfAJtXO5l96INaCAOspSEaxbjHTiQP5SvnyBnCZaK3XilR5XR-GysvcrooWzMW4paHSstB9g64iHoQXkoiSJS9FEZ4yQfcHFmP_1hPS0CD6g'
  );

  // 3 to 4 Seconds Processing State
  const [processingProgress, setProcessingProgress] = useState(0);
  const [activeProcessingPhase, setActiveProcessingPhase] = useState<number>(1);
  const [generatedDocketId, setGeneratedDocketId] = useState<string>('JAN-RNC-2025-4192');
  const [selectedMapProblemId, setSelectedMapProblemId] = useState<string | null>(null);
  const [isDigitalPassOpen, setIsDigitalPassOpen] = useState(false);

  // Populate from initialData if passed
  useEffect(() => {
    if (initialData && isOpen) {
      if (initialData.title) setTitle(initialData.title);
      if (initialData.category) setCategory(initialData.category);
      if (initialData.district) setDistrict(initialData.district);
      if (initialData.block) setBlock(initialData.block);
      if (initialData.description) setDescription(initialData.description);
      if (initialData.photoUrl) setSelectedPhotoUrl(initialData.photoUrl);

      if (initialData.autoStartProcessing) {
        startProcessingFlow({
          district: initialData.district,
          title: initialData.title,
          category: initialData.category,
          block: initialData.block,
        });
      } else {
        setModalStep('form');
      }
    } else if (isOpen && modalStep === 'form' && !title) {
      // Default pre-fill for rich instant experience
      setTitle('Heavy Iron & Arsenic Infiltration in Deep Borewell Aquifer');
      setDescription(
        'Over 60 households in the tola are getting reddish-brown turbid water from the primary community deep tubewell since the last 3 months. Filter mesh clogs daily with heavy iron precipitates, and skin irritation has been reported among children.'
      );
    }
  }, [initialData, isOpen]);

  // Voice recording timer
  useEffect(() => {
    let interval: any = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  if (!isOpen) return null;

  // Handle Quick Pre-fill Samples for demonstration
  const handleQuickPreFill = (sampleKey: 'water' | 'mine' | 'cold') => {
    if (sampleKey === 'water') {
      setTitle('Heavy Iron & Arsenic Infiltration in Deep Borewell Aquifer');
      setCategory('Water Security & Aquifer Contamination');
      setDistrict('Ranchi');
      setBlock('Namkum Ward 14');
      setDescription(
        'Over 60 households in the tola are getting reddish-brown turbid water from the community tubewell. Sedimentation test indicates heavy iron and arsenic leachate exceeding permissible BIS 10500 limits.'
      );
      setPhotoSelected(true);
      setSelectedPhotoUrl(
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDVs1KxTJut34izNR6-BSK0ohQqvO9Q-SWWgPeE5PN4mgTK5NdQUYVfi1YkT2p-Zmdk2SDUjoU1hDy5efAyAaDBxEmjuplpvQZYdRBLMS_4ZocwApcfsq81CDFkAb2G4KQSBVagdC55YjLfAJtXO5l96INaCAOspSEaxbjHTiQP5SvnyBnCZaK3XilR5XR-GysvcrooWzMW4paHSstB9g64iHoQXkoiSJS9FEZ4yQfcHFmP_1hPS0CD6g'
      );
    } else if (sampleKey === 'mine') {
      setTitle('Ambient Coal Dust & Particulate Infiltration into Village School');
      setCategory('Clean Air & Mine Dust');
      setDistrict('Dhanbad');
      setBlock('Tisra Colliery');
      setDescription(
        'Open-cast blasting and continuous heavy dumper transport generates extreme fugitive coal dust during morning school hours. PM 2.5 and PM 10 exceed safe thresholds by 400%, creating severe respiratory issues.'
      );
      setPhotoSelected(true);
      setSelectedPhotoUrl(
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDFqT5Z_VbZkM-d4UfxhVq3x5e6A9bM5E3wQ6R-1n2X7Y8Z9a0b1c2d3e4f5g6h7i8j9k0'
      );
    } else {
      setTitle('Micro Solar Cold Storage Need for Hillside Vegetable Cultivators');
      setCategory('Agriculture & Cold Storage');
      setDistrict('Khunti');
      setBlock('Torpa Block');
      setDescription(
        'Smallholder farmers producing organic tomatoes and beans face 35% post-harvest spoilage within 48 hours in summer heat because grid power is erratic and commercial cold storages are 45 km away.'
      );
      setPhotoSelected(true);
    }
  };

  const handleStartRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setDescription(
        'हमार टोला में पानी के चापाकल 3 महीना से खराब बा, लाल पानी आवत बा... (Audio recorded in ' +
          dialect +
          ')'
      );
      if (!title) {
        setTitle('Contaminated Borewell Water Infiltration in ' + block);
      }
    }, 2800);
  };

  // Launch the 3 to 4 seconds AI Processing Pipeline
  const startProcessingFlow = (overrideData?: {
    district?: string;
    title?: string;
    category?: string;
    block?: string;
  }) => {
    const curDistrict = overrideData?.district || district;
    const curTitle = overrideData?.title || title;
    const curCategory = overrideData?.category || category;

    setModalStep('processing');
    setProcessingProgress(0);
    setActiveProcessingPhase(1);

    const docketCode = `JAN-${curDistrict.substring(0, 3).toUpperCase()}-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedDocketId(docketCode);

    // Phase 1: 0 - 900ms: Searching similar problems
    // Phase 2: 900 - 1800ms: Extracting information from image
    // Phase 3: 1800 - 2700ms: Semantic matching of similar problems across locations
    // Phase 4: 2700 - 3600ms: Capable sectors & university capability matching
    // Finish: 3600ms -> Open Detailed Structured Problem Statement Report

    const startTime = Date.now();
    const duration = 3600; // 3.6 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProcessingProgress(progress);

      if (elapsed >= 2700) {
        setActiveProcessingPhase(4);
      } else if (elapsed >= 1800) {
        setActiveProcessingPhase(3);
      } else if (elapsed >= 900) {
        setActiveProcessingPhase(2);
      } else {
        setActiveProcessingPhase(1);
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setModalStep('report');
          onSubmitSuccess?.({
            id: docketCode,
            title: curTitle || `Public Grievance in ${curDistrict} (${curCategory})`,
            district: curDistrict,
          });
        }, 200);
      }
    }, 80);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startProcessingFlow();
  };

  // Realistic Similar Problems Data across Jharkhand Locations
  const similarProblems: SimilarProblemLocation[] = [
    {
      id: 'JH-SIM-01',
      title: 'Deep Aquifer Arsenic & Iron Infiltration in Kokar Ward 14',
      district: 'Ranchi',
      blockOrWard: 'Kokar Ward 14',
      similarity: 94.2,
      coordinates: { x: 500, y: 335, lat: 23.375, lng: 85.345 },
      status: 'Pilot Prototype Deployed',
      assignedLab: 'BIT Mesra (Env. Nanotech Lab)',
      submittedAgo: '18 days ago',
      reportsCount: 38,
      category: 'Water Security',
      keyFinding: 'Identical geogenic iron-arsenic mineral leaching signature detected at 140ft bore depth.'
    },
    {
      id: 'JH-SIM-02',
      title: 'Mine Seepage & Coal Slurry Runoff into Community Tubewells',
      district: 'Dhanbad',
      blockOrWard: 'Tisra Colliery',
      similarity: 88.5,
      coordinates: { x: 670, y: 280, lat: 23.742, lng: 86.418 },
      status: 'Field Validated by Nodal Officer',
      assignedLab: 'IIT (ISM) Dhanbad (Center for Water & Air)',
      submittedAgo: '1 month ago',
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

  return (
    <div
      id="submit-problem-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-primary/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl border border-surface-container-high flex flex-col my-auto">
        
        {/* Top Header Bar */}
        <div className="bg-primary text-on-primary p-4 sm:p-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Jan Samadhan Logo"
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border border-cyan-400/40 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-md text-headline-md font-bold text-white text-base sm:text-lg">
                  {modalStep === 'form' && 'Citizen Grievance & Technical Problem Intake'}
                  {modalStep === 'processing' && 'AI Multimodal Triage & University Routing Engine'}
                  {modalStep === 'report' && 'Structured Problem Statement & Cluster Dossier'}
                </h3>
                <span className="bg-secondary text-on-secondary px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
                  Official Gov Portal
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-primary-container text-xs">
                {modalStep === 'form' && 'Multimodal AI extracts features, dedupes with statewide records, and assigns university labs.'}
                {modalStep === 'processing' && 'Running cross-district vector search, image analysis, and capability scoring...'}
                {modalStep === 'report' && `Docket #${generatedDocketId} • Synthesized & Linked to State Innovation Grid`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-on-primary-container hover:text-on-primary hover:bg-white/10 transition-colors cursor-pointer"
            title="Close"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* 
          ======================================================================
          VIEW 1: INTAKE FORM (When modalStep === 'form')
          ======================================================================
        */}
        {modalStep === 'form' && (
          <form onSubmit={handleFormSubmit} className="p-5 sm:p-7 space-y-6">
            {/* Quick Demo Pre-fills */}
            <div className="bg-surface-container-low p-3.5 rounded-xl border border-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">bolt</span>
                <span className="text-xs font-bold text-primary">
                  Fast Demo Pre-fills (One-click sample issues):
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleQuickPreFill('water')}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-surface-container-lowest hover:bg-surface-container border border-surface-container-high text-primary transition-all cursor-pointer"
                >
                  💧 Ranchi Arsenic Water
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPreFill('mine')}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-surface-container-lowest hover:bg-surface-container border border-surface-container-high text-primary transition-all cursor-pointer"
                >
                  🏭 Dhanbad Mine Dust
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPreFill('cold')}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-surface-container-lowest hover:bg-surface-container border border-surface-container-high text-primary transition-all cursor-pointer"
                >
                  🌾 Khunti Micro-Cold Storage
                </button>
              </div>
            </div>

            {/* Input Mode Selector */}
            <div>
              <label className="font-label-md text-label-md text-primary font-bold block mb-2">
                Problem Input Channel
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setInputMode('text')}
                  className={`py-2.5 px-3 rounded-xl font-label-md text-label-md flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                    inputMode === 'text'
                      ? 'bg-secondary text-on-secondary font-bold border-secondary shadow-xs'
                      : 'bg-surface-container-low text-on-surface border-surface-container-high hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">edit_note</span>
                  <span>Written Details</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('photo')}
                  className={`py-2.5 px-3 rounded-xl font-label-md text-label-md flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                    inputMode === 'photo'
                      ? 'bg-secondary text-on-secondary font-bold border-secondary shadow-xs'
                      : 'bg-surface-container-low text-on-surface border-surface-container-high hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">add_a_photo</span>
                  <span>Photo & Geotag</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('voice')}
                  className={`py-2.5 px-3 rounded-xl font-label-md text-label-md flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                    inputMode === 'voice'
                      ? 'bg-secondary text-on-secondary font-bold border-secondary shadow-xs'
                      : 'bg-surface-container-low text-on-surface border-surface-container-high hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">mic</span>
                  <span>Vernacular Voice</span>
                </button>
              </div>
            </div>

            {/* Photo Upload / Selection Box */}
            <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-high space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[18px]">photo_camera</span>
                  Ground Photographic Evidence (For AI Feature Extraction):
                </label>
                <span className="text-[11px] text-on-surface-variant font-medium">
                  {photoSelected ? '✓ 1 Image Attached' : 'Optional Evidence'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                {/* Photo Preview */}
                <div className="sm:col-span-1 relative rounded-xl overflow-hidden border border-surface-container-highest bg-black/10 aspect-video flex items-center justify-center group shadow-xs">
                  {photoSelected ? (
                    <>
                      <img
                        src={selectedPhotoUrl}
                        alt="Evidence preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2">
                        <span className="text-[10px] text-white font-mono">
                          EXIF: 23.3441° N, 85.3096° E
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-3">
                      <span className="material-symbols-outlined text-surface-container-highest text-3xl">image</span>
                      <p className="text-[10px] text-on-surface-variant">No photo attached</p>
                    </div>
                  )}
                </div>

                {/* Photo Actions and Detection Preview */}
                <div className="sm:col-span-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPhotoSelected(true)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-primary border border-surface-container-high transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">upload</span>
                      Select / Replace Photo
                    </button>
                    {photoSelected && (
                      <button
                        type="button"
                        onClick={() => setPhotoSelected(false)}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-error hover:bg-error/10 transition-all cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    AI computer vision scans colorimetry, turbidity, rust oxidation indices, particulate density, and GPS EXIF metadata automatically upon submission.
                  </p>
                </div>
              </div>
            </div>

            {/* Voice Input Details if active */}
            {inputMode === 'voice' && (
              <div className="bg-surface-container-low p-4 rounded-xl border border-secondary/30 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold text-primary">
                    Tribal Vernacular Dialect:
                  </span>
                  <div className="flex items-center gap-1.5">
                    {(['Santali', 'Ho', 'Mundari', 'Khortha', 'Nagpuri', 'Hindi'] as const).map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDialect(d)}
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                          dialect === d
                            ? 'bg-secondary text-on-secondary'
                            : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={isRecording ? () => setIsRecording(false) : handleStartRecord}
                    className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      isRecording ? 'bg-red-600 text-white animate-pulse' : 'bg-secondary text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isRecording ? 'stop' : 'mic'}
                    </span>
                    {isRecording ? `Listening (${recordingSeconds}s)... Tap to Finish` : `Record Note in ${dialect}`}
                  </button>
                  <span className="text-xs text-on-surface-variant italic">
                    {description ? '✓ Audio speech recognized and added to description' : 'Speaks into microphone to translate'}
                  </span>
                </div>
              </div>
            )}

            {/* District & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-label-sm text-label-sm text-primary font-bold block mb-1">
                  District in Jharkhand (झारखंड जिला) *
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-surface-container-low border border-surface-container-high rounded-lg p-2.5 font-body-sm text-body-sm text-primary"
                >
                  {DISTRICT_STATS.map((d) => (
                    <option key={d.name} value={d.name}>
                      {d.name} District ({d.activeClusters} active clusters)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-primary font-bold block mb-1">
                  Block / Ward / Village (प्रखंड / वार्ड) *
                </label>
                <input
                  type="text"
                  value={block}
                  onChange={(e) => setBlock(e.target.value)}
                  placeholder="e.g. Namkum Ward 14, Tisra, Torpa"
                  className="w-full bg-surface-container-low border border-surface-container-high rounded-lg p-2.5 font-body-sm text-body-sm text-primary"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="font-label-sm text-label-sm text-primary font-bold block mb-1">
                Civic / Scientific Problem Domain *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-surface-container-low border border-surface-container-high rounded-lg p-2.5 font-body-sm text-body-sm text-primary"
              >
                <option value="Water Security & Aquifer Contamination">Water Security & Aquifer Contamination</option>
                <option value="Clean Air & Mine Dust">Clean Air & Mine Dust Mitigation</option>
                <option value="Agriculture & Cold Storage">AgTech & Micro Cold-Chain Storage</option>
                <option value="Clean Energy & Rural Microgrids">Clean Energy & Solar Microgrids</option>
                <option value="Rural Healthcare & Drone Logistics">Rural Healthcare Logistics</option>
                <option value="Roads & Waste Management">Roads, Bridges & Hazardous Waste Management</option>
              </select>
            </div>

            {/* Title & Description */}
            <div>
              <label className="font-label-sm text-label-sm text-primary font-bold block mb-1">
                Problem Summary / Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Heavy Iron & Arsenic Infiltration in Deep Borewell Aquifer"
                className="w-full bg-surface-container-low border border-surface-container-high rounded-lg p-2.5 font-body-sm text-body-sm text-primary"
                required
              />
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-primary font-bold block mb-1">
                Community Description & Interventions Attempted *
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail how many households are affected, how long the issue has persisted, and what local officials reported..."
                className="w-full bg-surface-container-low border border-surface-container-high rounded-lg p-2.5 font-body-sm text-body-sm text-primary"
                required
              />
            </div>

            {/* Submit Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-surface-container-high">
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                <span>Submitting triggers instant 4-phase AI semantic matching & university capability scoring</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer w-full sm:w-auto text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="start-ai-triage-button"
                  className="w-full sm:w-auto bg-secondary hover:bg-[#c2410c] text-white px-7 py-2.5 rounded-xl font-headline-sm text-headline-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-400/30"
                >
                  <span className="material-symbols-outlined text-[20px]">psychology</span>
                  <span>Submit to National Innovation Engine</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* 
          ======================================================================
          VIEW 2: 3 TO 4 SECONDS MULTI-PHASE PROCESSING STATE
          ======================================================================
        */}
        {modalStep === 'processing' && (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-8 bg-[#071a2b] text-white">
            {/* Center Animated Scanner Radar Ring */}
            <div className="relative">
              {/* Outer pulsing ring */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-cyan-400/40 animate-ping absolute inset-0 opacity-50" />
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-cyan-500/20 via-emerald-500/20 to-blue-500/20 blur-xl absolute inset-0" />
              
              {/* Center Box */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-cyan-400 bg-[#092238] shadow-2xl flex flex-col items-center justify-center p-3">
                <span className="material-symbols-outlined text-4xl sm:text-5xl text-cyan-300 animate-spin" style={{ animationDuration: '3s' }}>
                  {activeProcessingPhase === 1 && 'manage_search'}
                  {activeProcessingPhase === 2 && 'document_scanner'}
                  {activeProcessingPhase === 3 && 'hub'}
                  {activeProcessingPhase === 4 && 'school'}
                </span>
                <span className="font-mono text-xs text-cyan-200 mt-1 font-bold">
                  {processingProgress}%
                </span>
              </div>
            </div>

            {/* Current Phase Title & Subtitle */}
            <div className="space-y-2 max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                Phase {activeProcessingPhase} of 4 • Real-Time Telemetry
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {activeProcessingPhase === 1 && '1. Searching Statewide Similar Problems...'}
                {activeProcessingPhase === 2 && '2. Extracting Information from Provided Image & Sensor Data...'}
                {activeProcessingPhase === 3 && '3. Semantic Matching with Registered Problems Across Locations...'}
                {activeProcessingPhase === 4 && '4. Computing Capable Sectors & University Lab Match Scores...'}
              </h4>
              <p className="text-sm text-cyan-100/80">
                {activeProcessingPhase === 1 && 'Querying 12,480 citizen dockets across 24 Jharkhand District Innovation Cells...'}
                {activeProcessingPhase === 2 && 'Running computer vision: parsing turbidity indices, iron/arsenic precipitate spectra, and EXIF coordinates...'}
                {activeProcessingPhase === 3 && 'Cross-referencing geographic proximity & dense text embeddings with Dhanbad, Khunti, Bokaro, and Musabani...'}
                {activeProcessingPhase === 4 && 'Evaluating BIT Mesra, IIT ISM Dhanbad, and NIT Jamshedpur on patent portfolios, active pilots, and avg. resolution turnaround compliance...'}
              </p>
            </div>

            {/* Overall Progress Bar */}
            <div className="w-full max-w-md space-y-2">
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden p-0.5 border border-white/20">
                <div
                  className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 h-full rounded-full transition-all duration-150 shadow-[0_0_12px_rgba(45,212,191,0.6)]"
                  style={{ width: `${processingProgress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-cyan-200/80 px-1">
                <span>{processingProgress}% Ingested</span>
                <span>Avg. Resolution: 41 Days</span>
              </div>
            </div>

            {/* 4 Steps Telemetry Ticker */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 w-full max-w-2xl text-left">
              {[
                { step: 1, title: 'Search Database', desc: '12,480 Dockets' },
                { step: 2, title: 'Extract Image Info', desc: 'Spectra & Geotags' },
                { step: 3, title: 'Semantic Cluster', desc: '5 Locations Linked' },
                { step: 4, title: 'University Match', desc: '3 Labs Scored' },
              ].map((item) => {
                const isDone = activeProcessingPhase > item.step;
                const isCurrent = activeProcessingPhase === item.step;

                return (
                  <div
                    key={item.step}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200 shadow-md'
                        : isDone
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                        : 'bg-white/5 border-white/10 text-white/40'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      {isDone ? (
                        <span className="material-symbols-outlined text-[16px] text-emerald-400">check_circle</span>
                      ) : isCurrent ? (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-white/20" />
                      )}
                      <span className="text-xs font-bold truncate">{item.title}</span>
                    </div>
                    <span className="text-[10px] block opacity-80 truncate">{item.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 
          ======================================================================
          VIEW 3: DETAILED STRUCTURED PROBLEM STATEMENT REPORT & MAP
          ======================================================================
        */}
        {modalStep === 'report' && (
          <div className="p-5 sm:p-7 space-y-6 overflow-y-auto">
            {/* Top Docket Alert Banner */}
            <div className="bg-emerald-900/10 border border-emerald-500/30 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-2xl">verified</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-primary">
                      DOCKET #{generatedDocketId}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-600 text-white">
                      Triaged & Clustered
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-600 text-white">
                      Tier-1 Priority
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Filed for: <span className="font-bold text-primary">{block}, {district} District</span> • Transmitted to DWSD & BIT Mesra Innovation Cell
                  </p>
                </div>
              </div>

              {/* Actions & SLA Countdown */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setIsDigitalPassOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span className="material-symbols-outlined text-[16px]">badge</span>
                  <span>Digital Pass & WhatsApp</span>
                </button>

                <div className="bg-surface-container-lowest px-3 py-1.5 rounded-xl border border-surface-container-high shadow-xs text-right shrink-0">
                  <span className="text-[10px] text-on-surface-variant font-bold block uppercase tracking-wider">
                    Avg. Resolution Time
                  </span>
                  <span className="font-mono text-sm font-black text-secondary">
                    ~41 Day Avg.
                  </span>
                </div>
              </div>
            </div>

            {/* VERNACULAR AUDIO DOSSIER (NATIVE VOICE READ-OUT) */}
            <VernacularAudioDossier
              docketId={generatedDocketId}
              title={title}
              district={district}
              block={block}
              category={category}
              initialDialect={dialect}
            />

            {/* SECTION A: DETAILED STRUCTURED PROBLEM STATEMENT (FORMAL SYNTHESIS) */}
            <div className="bg-surface-container-low p-5 sm:p-6 rounded-2xl border border-surface-container-high space-y-4">
              <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-2xl">description</span>
                  <h4 className="font-headline-md text-headline-md font-bold text-primary text-lg">
                    Official Structured Problem Statement (Synthesis)
                  </h4>
                </div>
                <span className="text-xs bg-secondary/10 text-secondary font-bold px-2.5 py-1 rounded-full">
                  Technical Taxonomy: ISO-DW-JH-2025
                </span>
              </div>

              {/* Formal Problem Scope */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                    1. Problem Definition & Scope:
                  </span>
                  <p className="text-on-surface leading-relaxed text-xs sm:text-sm bg-surface-container-lowest p-3 rounded-xl border border-surface-container-high">
                    {title}. Severe water quality degradation reported across {block} affecting rural households relying exclusively on community deep borewells. Field samples exhibit high particulate turbidity, distinct reddish precipitation, and persistent taste anomalies exceeding safe potable standards.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                    2. Hypothesized Technical Root Cause:
                  </span>
                  <p className="text-on-surface leading-relaxed text-xs sm:text-sm bg-surface-container-lowest p-3 rounded-xl border border-surface-container-high">
                    Geogenic leaching of unoxidized Iron (Fe²⁺) and Arsenic (As³⁺) minerals through fractured basalt aquifers due to intensive post-monsoon water table drawdown, compounded by the absence of localized micro-porous filtration beds.
                  </p>
                </div>
              </div>

              {/* Community Impact & Vulnerability Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container-high">
                  <span className="text-[11px] text-on-surface-variant block">Affected Population</span>
                  <span className="text-base font-bold text-primary">~640 Citizens</span>
                  <span className="text-[10px] text-secondary block">60+ Households</span>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container-high">
                  <span className="text-[11px] text-on-surface-variant block">Contamination Risk</span>
                  <span className="text-base font-bold text-red-600">Critical / High</span>
                  <span className="text-[10px] text-on-surface-variant block">BIS 10500 Non-compliant</span>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container-high">
                  <span className="text-[11px] text-on-surface-variant block">Nodal Department</span>
                  <span className="text-base font-bold text-primary truncate block">Drinking Water & San.</span>
                  <span className="text-[10px] text-secondary block">Executive Engineer DWSD</span>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container-high">
                  <span className="text-[11px] text-on-surface-variant block">Recommended Action</span>
                  <span className="text-base font-bold text-emerald-600 truncate block">Catalytic Filter Skid</span>
                  <span className="text-[10px] text-on-surface-variant block">University Field Pilot</span>
                </div>
              </div>
            </div>

            {/* SECTION B: EXTRACTED INFORMATION FROM PROVIDED IMAGE & SENSORS */}
            <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container-high space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-2xl">document_scanner</span>
                  <h4 className="font-headline-md text-headline-md font-bold text-primary text-base">
                    Multimodal Extraction Audit (Image & Dialect Voice)
                  </h4>
                </div>
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Verified by Computer Vision Engine
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                {/* Visual Preview with Bounding Overlay */}
                <div className="relative rounded-xl overflow-hidden aspect-video border border-surface-container-high bg-black">
                  <img
                    src={selectedPhotoUrl}
                    alt="Analyzed sample evidence"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border-2 border-dashed border-red-400/80 m-3 rounded pointer-events-none flex items-start justify-end p-1">
                    <span className="bg-red-600 text-white text-[9px] font-mono px-1 py-0.5 rounded shadow">
                      Discoloration: Fe-Oxide Detected (91.4%)
                    </span>
                  </div>
                </div>

                {/* Telemetry Parameter Table */}
                <div className="sm:col-span-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-surface-container-low p-2.5 rounded-lg border border-surface-container-high">
                    <span className="text-on-surface-variant block text-[10px]">Estimated Turbidity:</span>
                    <span className="font-mono font-bold text-primary text-sm">4.8 NTU</span>
                    <span className="text-[10px] text-red-500 block">Exceeds permissible 1.0 NTU</span>
                  </div>
                  <div className="bg-surface-container-low p-2.5 rounded-lg border border-surface-container-high">
                    <span className="text-on-surface-variant block text-[10px]">Precipitate Index:</span>
                    <span className="font-mono font-bold text-primary text-sm">High (Fe / As Oxide)</span>
                    <span className="text-[10px] text-amber-600 block">Inorganic colloidal phase</span>
                  </div>
                  <div className="bg-surface-container-low p-2.5 rounded-lg border border-surface-container-high">
                    <span className="text-on-surface-variant block text-[10px]">EXIF GPS Geotag:</span>
                    <span className="font-mono font-bold text-primary text-sm">23.3441° N, 85.3096° E</span>
                    <span className="text-[10px] text-emerald-600 block">Verified inside {district}</span>
                  </div>
                  <div className="bg-surface-container-low p-2.5 rounded-lg border border-surface-container-high">
                    <span className="text-on-surface-variant block text-[10px]">Dialect Audio Calibration:</span>
                    <span className="font-mono font-bold text-primary text-sm">{dialect} Dialect</span>
                    <span className="text-[10px] text-secondary block">98.4% transcription confidence</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RESEARCH MILESTONE & FIELD RESOLUTION TRACKER */}
            <SlaTimelineTracker
              docketId={generatedDocketId}
              category={category}
              district={district}
              block={block}
              matchedLab="BIT Mesra Environmental Engineering Lab"
            />

            {/* SECTION C: GEOSPATIAL MAP OF SIMILAR SUBMITTED PROBLEMS */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-headline-md text-headline-md font-bold text-primary text-base flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">explore</span>
                    Jharkhand Geospatial Cluster Map (Similar Problems Registered Across Locations)
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Click any marker pin on the map to inspect historical tickets, distance vectors, and assigned university research teams.
                  </p>
                </div>
              </div>

              {/* Map Canvas Component */}
              <SimilarProblemsMap
                currentProblem={{
                  title: title,
                  district: district,
                  block: block,
                  category: category,
                  coordinates: { x: 490, y: 340, lat: 23.3441, lng: 85.3096 },
                }}
                similarProblems={similarProblems}
                selectedProblemId={selectedMapProblemId}
                onSelectProblem={(p) => setSelectedMapProblemId(p ? p.id : null)}
              />
            </div>

            {/* SECTION D: SEMANTIC MATCHING OF SIMILAR PROBLEMS FROM DIFFERENT LOCATIONS */}
            <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container-high space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
                <div>
                  <h4 className="font-headline-md text-headline-md font-bold text-primary text-base flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">share_location</span>
                    Semantic Cluster Matches in Other Districts & Wards
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Correlated by dense text embeddings, hydrological profiles, and visual feature similarity.
                  </p>
                </div>
                <span className="text-xs font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
                  {similarProblems.length} Historical Correlated Clusters
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {similarProblems.map((prob) => (
                  <div
                    key={prob.id}
                    onClick={() => setSelectedMapProblemId(prob.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                      selectedMapProblemId === prob.id
                        ? 'bg-secondary/10 border-secondary shadow-sm ring-2 ring-secondary/30'
                        : 'bg-surface-container-low border-surface-container-high hover:bg-surface-container'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                          {prob.district} • {prob.blockOrWard}
                        </span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          prob.similarity >= 85 ? 'bg-red-600 text-white' : 'bg-amber-500 text-black'
                        }`}>
                          {prob.similarity}% Match
                        </span>
                      </div>
                      <h5 className="font-bold text-xs text-primary leading-snug">
                        {prob.title}
                      </h5>
                      <p className="text-[11px] text-on-surface-variant mt-1 line-clamp-2">
                        {prob.keyFinding}
                      </p>
                    </div>

                    <div className="border-t border-surface-container-high/60 pt-2 flex items-center justify-between text-[11px]">
                      <span className="text-secondary font-semibold truncate max-w-[200px]">
                        Lab: {prob.assignedLab}
                      </span>
                      <span className="text-on-surface-variant font-medium">
                        {prob.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION E: CAPABLE SECTORS & MATCHING CAPABILITY OF UNIVERSITIES */}
            <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container-high space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
                <div>
                  <h4 className="font-headline-md text-headline-md font-bold text-primary text-base flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">school</span>
                    University Research Labs & Technical Capability Scoreboard
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Automated fit calculation based on specialized laboratory instrumentation, patent depth, and field SLA history.
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                  Primary Routing: BIT Mesra (Rank #1)
                </span>
              </div>

              <div className="space-y-3">
                {universityCapabilities.map((univ) => (
                  <div
                    key={univ.name}
                    className="p-4 rounded-xl border border-surface-container-high bg-surface-container-low flex flex-col gap-2.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary text-white text-[11px] font-black flex items-center justify-center">
                            #{univ.rank}
                          </span>
                          <h5 className="font-bold text-sm text-primary">
                            {univ.name}
                          </h5>
                          <span className="text-xs font-semibold text-secondary">
                            ({univ.lab})
                          </span>
                        </div>
                        <span className="text-xs text-on-surface-variant block mt-0.5">
                          Lead Nodal Investigator: <span className="font-semibold text-primary">{univ.nodalScientist}</span>
                        </span>
                      </div>

                      {/* Capability Fit Badge */}
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-[10px] text-on-surface-variant block">Capability Match</span>
                          <span className="font-mono text-base font-black text-secondary">
                            {univ.matchScore}%
                          </span>
                        </div>
                        <div className="w-16 bg-surface-container-highest rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-secondary h-full rounded-full"
                            style={{ width: `${univ.matchScore}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      <strong className="text-primary font-semibold">Turnaround Strategy: </strong>
                      {univ.capabilityRationale}
                    </p>

                    {/* Specialized Equipment Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-bold text-on-surface-variant">Lab Hardware:</span>
                      {univ.specializedEquipment.map((eq) => (
                        <span
                          key={eq}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-surface-container-lowest text-primary border border-surface-container-high"
                        >
                          ✓ {eq}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-1 border-t border-surface-container-high/60">
                      <span>Historical SLA: <strong className="text-emerald-700 font-bold">{univ.slaTurnaroundEstimate}</strong></span>
                      <span>Track Record: {univ.pilotsDeployed} Field Pilots • {univ.patents} State Patents</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-surface-container-high">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-lowest hover:bg-surface-container text-primary font-semibold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
                <span>Print Official Docket PDF</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setModalStep('form');
                    setTitle('');
                    setDescription('');
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
                >
                  Register Another Problem
                </button>

                {/* View Digital Pass & WhatsApp Alert Button */}
                <button
                  type="button"
                  onClick={() => setIsDigitalPassOpen(true)}
                  className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
                  <span>Citizen Pass & WhatsApp</span>
                </button>

                {onNavigateToCommandCenter && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateToCommandCenter();
                    }}
                    className="w-full sm:w-auto bg-secondary text-on-secondary px-5 py-2.5 rounded-xl font-bold text-xs shadow-md hover:bg-secondary/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">monitoring</span>
                    <span>Track in Command Center</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto bg-secondary hover:bg-[#c2410c] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer border border-amber-400/30"
                >
                  Done & Back to Portal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CITIZEN DIGITAL PASS & WHATSAPP MODAL */}
      <CitizenDigitalPassModal
        isOpen={isDigitalPassOpen}
        onClose={() => setIsDigitalPassOpen(false)}
        language={'en'}
        ticket={{
          id: generatedDocketId,
          title: title || `Water Security & Aquifer Contamination in ${block}, ${district}`,
          district: district,
          block: block,
          category: category,
          matchedLab: 'BIT Mesra (Environmental Engineering Lab)',
          date: '19 Sep 2025',
          slaDays: 41,
        }}
      />
    </div>
  );
};
