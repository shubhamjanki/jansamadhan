import React, { useState } from 'react';
import { AwardedInstitute, Challenge, DistrictStat, Language, PublicFeedbackItem, UniversityRankItem } from '../types';
import { FieldImpactShowcase } from './FieldImpactShowcase';
import campusHeroBg from '../assets/images/campus_hero_bg.jpg';
import { 
  AWARDED_INSTITUTES, 
  CHALLENGES_DATA, 
  DISTRICT_STATS, 
  PUBLIC_FEEDBACK_DATA, 
  UNIVERSITY_RANKINGS 
} from '../data/mockData';

interface HomeScreenProps {
  language: Language;
  onOpenReportModal: (initialData?: any) => void;
  onNavigateToChallenges: () => void;
  onSelectChallenge: (challenge: Challenge) => void;
  onNavigateToHeatmap: () => void;
  onSelectDistrict?: (district: DistrictStat) => void;
  onShowToast?: (msg: string) => void;
  onOpenTechnicalAudit?: () => void;
  onRegisterLab?: () => void;
  onPartnerCSR?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  language,
  onOpenReportModal,
  onNavigateToChallenges,
  onSelectChallenge,
  onNavigateToHeatmap,
  onSelectDistrict,
  onShowToast,
}) => {
  // In-page Register Problem Form State
  const [reportTitle, setReportTitle] = useState('');
  const [reportCategory, setReportCategory] = useState('Drinking Water & Sanitation');
  const [reportDistrict, setReportDistrict] = useState('Ranchi');
  const [reportBlock, setReportBlock] = useState('Namkum');
  const [reportDescription, setReportDescription] = useState('');
  const [selectedDialect, setSelectedDialect] = useState<'Santali' | 'Ho' | 'Mundari' | 'Khortha' | 'Nagpuri' | 'Hindi'>('Santali');
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [audioTranscriptRecorded, setAudioTranscriptRecorded] = useState(false);
  const [hasUploadedPhoto, setHasUploadedPhoto] = useState(false);
  const [submittedTickets, setSubmittedTickets] = useState<Array<{ id: string; title: string; district: string; time: string; status: string }>>([
    {
      id: 'JAN-RNC-2025-0814',
      title: 'Deep Borewell Arsenic Infiltration in Kokar Ward 14',
      district: 'Ranchi',
      time: '2 hours ago',
      status: 'University Lab Prototype Assigned (BIT Mesra)'
    }
  ]);
  const [newlyCreatedTicket, setNewlyCreatedTicket] = useState<{ id: string; title: string; district: string } | null>(null);

  // Ticket Lookup State
  const [lookupId, setLookupId] = useState('');
  const [lookupResult, setLookupResult] = useState<{
    id: string;
    title: string;
    stage: string;
    lab: string;
    dept: string;
    eta: string;
    percent: number;
  } | null>(null);

  // Dialect Sample Audio and Translations
  const dialectTranscripts: Record<string, { text: string; entity: string; confidence: string; dept: string; lab: string }> = {
    Santali: {
      text: '"हमार टोला में पानी के चापाकल 3 महीना से खराब बा, लाल पानी आवत बा..."',
      entity: 'Contaminated Ground Aquifer (Iron/Arsenic)',
      confidence: '98.4%',
      dept: 'Drinking Water & Sanitation',
      lab: 'BIT Mesra Env. Lab',
    },
    Ho: {
      text: '"ᱦᱚᱲ ᱠᱚᱣᱟᱜ ᱫᱟᱜ ᱨᱮ ᱢᱮᱬᱦᱮᱫ ᱡᱟᱹᱥᱛᱤ ᱢᱮᱱᱟᱜᱼᱟ, ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱨᱩᱣᱟᱹᱜ ᱠᱟᱱᱟ..."',
      entity: 'Iron Oxide Infiltration in Tap Source',
      confidence: '97.2%',
      dept: 'Public Health Engineering',
      lab: 'NIT Jamshedpur Water Cell',
    },
    Mundari: {
      text: '"खेते पानी नी मिलो, सोलर पम्प के मोटर जल गेल, सुखाड़ होइत बा..."',
      entity: 'Solar Irrigation Motor Coil Fault',
      confidence: '96.8%',
      dept: 'Agri & Water Resources',
      lab: 'Birsa Agri Engineering',
    },
    Khortha: {
      text: '"कोयला खदान के धुंध से स्कूल के बच्चा सभ के खांसी धर लेलक..."',
      entity: 'Ambient PM 2.5 Coal Particulates',
      confidence: '99.1%',
      dept: 'Mines & Environment',
      lab: 'IIT (ISM) Dhanbad Clean Air Lab',
    },
    Nagpuri: {
      text: '"टमाटर के खेती तैयार हे मगर कोल्ड स्टोर नइखे, सड़त हे पूरा फसल..."',
      entity: 'Decentralized Micro-Chilling Need',
      confidence: '95.6%',
      dept: 'Horticulture & Rural Dev',
      lab: 'BAU Ranchi Post-Harvest',
    },
    Hindi: {
      text: '"गाँव के प्राथमिक विद्यालय के सामने जलभराव और हैंडपंप का पानी दूषित हो गया है..."',
      entity: 'Surface Runoff Drainage & Coliform Intrusion',
      confidence: '99.5%',
      dept: 'Panchayati Raj & Sanitation',
      lab: 'BIT Sindri Civil Lab',
    }
  };

  // Top Problems State (with upvotes)
  const [topProblemsCategory, setTopProblemsCategory] = useState<string>('All');
  const [upvotedProblemIds, setUpvotedProblemIds] = useState<Record<string, boolean>>({});
  const [problemsUpvotes, setProblemsUpvotes] = useState<Record<string, number>>({
    'JH-W-2025-08': 1420,
    'JH-M-2025-14': 892,
    'JH-A-2025-03': 645,
    'JH-E-2025-01': 512,
  });

  // Heatmap Section State
  const [selectedHeatmapDistrict, setSelectedHeatmapDistrict] = useState<DistrictStat>(DISTRICT_STATS[0]); // Ranchi
  const [heatmapLayer, setHeatmapLayer] = useState<'all' | 'water' | 'mining' | 'agro'>('all');

  // University Rankings State
  const [rankSortBy, setRankSortBy] = useState<'solved' | 'sla' | 'rating'>('solved');
  const [rankedUniversities, setRankedUniversities] = useState<UniversityRankItem[]>(UNIVERSITY_RANKINGS);

  // Public Feedback State
  const [feedbacks, setFeedbacks] = useState<PublicFeedbackItem[]>(PUBLIC_FEEDBACK_DATA);
  const [newFeedbackName, setNewFeedbackName] = useState('');
  const [newFeedbackDistrict, setNewFeedbackDistrict] = useState('Ranchi');
  const [newFeedbackVillage, setNewFeedbackVillage] = useState('');
  const [newFeedbackRating, setNewFeedbackRating] = useState(5);
  const [newFeedbackCategory, setNewFeedbackCategory] = useState('Drinking Water');
  const [newFeedbackComment, setNewFeedbackComment] = useState('');
  const [feedbackSubmittedSuccess, setFeedbackSubmittedSuccess] = useState(false);

  // Handle Audio Voice Recording Simulation
  const handleToggleAudioRecording = () => {
    if (!isRecordingAudio) {
      setIsRecordingAudio(true);
      setTimeout(() => {
        setIsRecordingAudio(false);
        setAudioTranscriptRecorded(true);
        const sample = dialectTranscripts[selectedDialect];
        setReportDescription(sample.text);
        if (!reportTitle) {
          setReportTitle(`${sample.entity} in ${reportBlock}`);
        }
        onShowToast?.(`Transcribed audio from ${selectedDialect} dialect with ${sample.confidence} confidence.`);
      }, 2500);
    } else {
      setIsRecordingAudio(false);
    }
  };

  // Quick In-Page Problem Submission
  const handleQuickSubmitProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportTitle && !reportDescription) {
      onShowToast?.('Please provide a title or voice/text description of your problem.');
      return;
    }

    const generatedTicketId = `JAN-${reportDistrict.substring(0, 3).toUpperCase()}-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket = {
      id: generatedTicketId,
      title: reportTitle || `Citizen Issue: ${reportCategory} in ${reportBlock}, ${reportDistrict}`,
      district: reportDistrict,
      time: 'Just now',
      status: 'Triaged & Transmitted to District Innovation Cell'
    };

    setSubmittedTickets((prev) => [newTicket, ...prev]);
    setNewlyCreatedTicket(newTicket);

    // Launch the 3-4s AI extraction, semantic matching, and detailed report modal
    onOpenReportModal({
      title: reportTitle || `Citizen Issue: ${reportCategory} in ${reportBlock}, ${reportDistrict}`,
      category: reportCategory,
      district: reportDistrict,
      block: reportBlock,
      description: reportDescription || 'Citizen reported community issue requiring university laboratory analysis.',
      photoUrl: hasUploadedPhoto
        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVs1KxTJut34izNR6-BSK0ohQqvO9Q-SWWgPeE5PN4mgTK5NdQUYVfi1YkT2p-Zmdk2SDUjoU1hDy5efAyAaDBxEmjuplpvQZYdRBLMS_4ZocwApcfsq81CDFkAb2G4KQSBVagdC55YjLfAJtXO5l96INaCAOspSEaxbjHTiQP5SvnyBnCZaK3XilR5XR-GysvcrooWzMW4paHSstB9g64iHoQXkoiSJS9FEZ4yQfcHFmP_1hPS0CD6g'
        : undefined,
      autoStartProcessing: true,
    });
  };

  // Handle Ticket Status Lookup
  const handleLookupTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = lookupId.trim().toUpperCase();
    if (!cleanId) return;

    if (cleanId.includes('0814') || cleanId.includes('RNC')) {
      setLookupResult({
        id: cleanId,
        title: 'Deep Borewell Arsenic Infiltration in Kokar Ward 14',
        stage: 'Field Pilot Deployed',
        lab: 'BIT Mesra (Environmental Nanotechnology Lab)',
        dept: 'Drinking Water & Sanitation Dept.',
        eta: '7 days to final certification',
        percent: 85
      });
    } else {
      setLookupResult({
        id: cleanId,
        title: `Civic Problem Registration [${cleanId}]`,
        stage: 'Under Technical Evaluation',
        lab: 'Designated University Nodal Innovation Cell',
        dept: 'District Magistrate Innovation Taskforce',
        eta: '14 days for pilot prototype design',
        percent: 45
      });
    }
  };

  // Handle Upvoting a Top Problem
  const handleUpvoteProblem = (id: string) => {
    if (upvotedProblemIds[id]) {
      setUpvotedProblemIds((prev) => ({ ...prev, [id]: false }));
      setProblemsUpvotes((prev) => ({ ...prev, [id]: (prev[id] || 1) - 1 }));
      onShowToast?.('Upvote removed.');
    } else {
      setUpvotedProblemIds((prev) => ({ ...prev, [id]: true }));
      setProblemsUpvotes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
      onShowToast?.('✓ Thank you! You upvoted this citizen issue (+1).');
    }
  };

  // Handle Sorting University Rankings
  const handleSortRankings = (type: 'solved' | 'sla' | 'rating') => {
    setRankSortBy(type);
    const sorted = [...UNIVERSITY_RANKINGS].sort((a, b) => {
      if (type === 'solved') return b.solvedCount - a.solvedCount;
      if (type === 'sla') return b.slaRate - a.slaRate;
      if (type === 'rating') return b.satisfactionRating - a.satisfactionRating;
      return 0;
    });
    setRankedUniversities(sorted);
  };

  // Handle Submit Public Feedback
  const handlePostFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedbackName.trim() || !newFeedbackComment.trim()) {
      onShowToast?.('Please enter your name and feedback comments.');
      return;
    }

    const newEntry: PublicFeedbackItem = {
      id: `fb-${Date.now()}`,
      citizenName: newFeedbackName.trim(),
      villageOrWard: newFeedbackVillage.trim() || 'Local Ward / Village',
      district: newFeedbackDistrict,
      date: 'Just now',
      rating: newFeedbackRating,
      category: newFeedbackCategory,
      solvedProblemTitle: 'Community Problem Resolved via Jan Samadhan',
      solvingInstitute: 'Assigned Technical University Lab',
      comment: newFeedbackComment.trim(),
      verifiedCitizen: true,
      upvotesCount: 1
    };

    setFeedbacks([newEntry, ...feedbacks]);
    setNewFeedbackName('');
    setNewFeedbackVillage('');
    setNewFeedbackComment('');
    setFeedbackSubmittedSuccess(true);
    setTimeout(() => setFeedbackSubmittedSuccess(false), 5000);
    onShowToast?.('✓ Public feedback submitted successfully! Thank you for reviewing.');
  };

  // Filter top problems
  const filteredTopProblems = CHALLENGES_DATA.filter((c) => {
    if (topProblemsCategory === 'All') return true;
    if (topProblemsCategory === 'Water Quality' && c.category.includes('Water')) return true;
    if (topProblemsCategory === 'Mining & Air' && (c.category.includes('Mining') || c.category.includes('Industrial'))) return true;
    if (topProblemsCategory === 'Agriculture' && c.category.includes('Agriculture')) return true;
    return c.category.toLowerCase().includes(topProblemsCategory.toLowerCase());
  });

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* 
        ========================================================================
        HERO & BANNER: JAN SAMADHAN — CINEMATIC FULL-BLEED CAMPUS HERO
        ========================================================================
      */}
      <section className="relative w-full overflow-hidden min-h-[90vh] flex flex-col justify-end text-on-primary">
        {/* Full-bleed campus background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${campusHeroBg})` }}
        />
        {/* Multi-layer gradient overlay: top fade (dark navy) + bottom fade (deep saffron-night) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07192f]/80 via-[#07192f]/40 to-[#1a0900]/85" />
        {/* Subtle warm vignette from sides */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,25,47,0.55)_100%)]" />

        {/* Indian Tricolor top ribbon */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808] z-10" />

        {/* Floating top bar */}
        <div className="relative z-10 px-4 sm:px-8 pt-8 pb-0">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary/90 backdrop-blur-sm text-white font-label-sm text-label-sm uppercase tracking-wider font-bold shadow-md border border-amber-400/50">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                {language === 'hi' ? '🇮🇳 राष्ट्र सेवा • जन समाधान' : '🇮🇳 National Service • Citizen Portal'}
              </span>
              <span className="hidden sm:inline text-amber-200 text-xs font-medium drop-shadow">
                सत्यमेव जयते &nbsp;•&nbsp; जन सेवा ही देश सेवा
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-mono text-emerald-300 border border-white/15 shadow">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>औसत समाधान समय • Avg. Resolution: 41 Days</span>
            </div>
          </div>
        </div>

        {/* Main hero content — anchored to bottom */}
        <div className="relative z-10 px-4 sm:px-8 pt-16 pb-14 sm:pb-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">

            {/* Left column: headline, sub-copy, CTAs */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Patriotic badge */}
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-500/20 backdrop-blur-sm px-4 py-1.5 rounded-lg w-fit border border-amber-400/30 shadow-sm">
                <span className="material-symbols-outlined text-[15px]">assured_workload</span>
                {language === 'hi' ? 'राष्ट्र निर्माण में नागरिक भागीदारी' : 'Nation Building Through Citizen Action'}
              </div>

              {/* Main headline */}
              <h1 className="text-white font-black tracking-tight leading-[1.1] text-4xl sm:text-5xl lg:text-[3.5rem] drop-shadow-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {language === 'hi' ? (
                  <>
                    <span className="text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">जन समाधान:</span>{' '}
                    <span className="text-[#FF9933] drop-shadow-[0_2px_16px_rgba(255,153,51,0.6)]">आपकी समस्या,</span>
                    <br />
                    <span className="text-white/95">शीर्ष विश्वविद्यालयों का समाधान</span>
                  </>
                ) : (
                  <>
                    <span className="text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">Jan Samadhan:</span>{' '}
                    <span className="text-[#FF9933] drop-shadow-[0_2px_16px_rgba(255,153,51,0.6)]">Your Voice,</span>
                    <br />
                    <span className="text-white/95">India's Best Labs Solve It</span>
                  </>
                )}
              </h1>

              {/* Sub-description */}
              <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl drop-shadow" style={{ fontFamily: "'Inter', sans-serif" }}>
                {language === 'hi'
                  ? 'संथाली, हो, मुंडारी, खोरठा, नागपुरी या हिंदी में बोलकर अपनी समस्या दर्ज करें। झारखण्ड के शीर्ष तकनीकी विश्वविद्यालय औसतन 41 दिनों में समाधान तैयार करते हैं।'
                  : 'Speak your community problem in your tribal dialect or Hindi. BIT Mesra, NIT Jamshedpur, IIT(ISM), and 39 more labs build a verified field solution — average resolution time: 41 days.'}
              </p>

              {/* Desh Bhakti quote strip */}
              <div className="flex items-center gap-3 py-2 border-l-4 border-[#FF9933] pl-4">
                <span className="text-amber-200/90 italic text-sm font-medium drop-shadow" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  "जब देश का नागरिक बोलता है — विज्ञान सुनता है।" &nbsp;|&nbsp; Jan Samadhan, Jharkhand
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#register-problem"
                  id="hero-quick-report-btn"
                  className="group relative overflow-hidden bg-[#FF9933] hover:bg-[#e8871a] text-white px-8 py-4 rounded-2xl font-bold text-base transition-all shadow-2xl shadow-orange-500/40 flex items-center gap-2.5 cursor-pointer border border-amber-300/50"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="material-symbols-outlined text-[22px]">mic</span>
                  {language === 'hi' ? 'समस्या दर्ज करें' : 'Submit Your Problem'}
                </a>
                <a
                  href="#track-problem"
                  id="hero-track-btn"
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-2xl font-semibold text-base backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer border border-white/25 shadow-lg"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <span className="material-symbols-outlined text-amber-300">track_changes</span>
                  {language === 'hi' ? 'स्थिति जांचें' : 'Track Status'}
                </a>
              </div>
            </div>

            {/* Right column: live stats card */}
            <div className="lg:col-span-4">
              <div className="bg-white/8 backdrop-blur-2xl p-6 rounded-3xl border border-white/15 shadow-2xl flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-300">
                      {language === 'hi' ? 'लाइव स्थिति' : 'Live Solution Pulse'}
                    </span>
                  </div>
                  <span className="text-white/40 text-xs font-mono">24/24 Districts</span>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/8 p-4 rounded-2xl border border-white/10 flex flex-col gap-1">
                    <span className="text-[11px] text-white/60 font-medium">Problems Solved</span>
                    <span className="text-3xl font-black text-[#FF9933]">1,842+</span>
                    <span className="text-[10px] text-emerald-300 flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[11px]">verified</span>
                      In Field Today
                    </span>
                  </div>
                  <div className="bg-white/8 p-4 rounded-2xl border border-white/10 flex flex-col gap-1">
                    <span className="text-[11px] text-white/60 font-medium">Active Labs</span>
                    <span className="text-3xl font-black text-white">42</span>
                    <span className="text-[10px] text-white/50 truncate">BIT · ISM · NIT · BAU</span>
                  </div>
                </div>

                {/* SLA banner */}
                <div className="bg-[#FF9933]/15 border border-[#FF9933]/25 p-3.5 rounded-2xl flex items-center gap-3 text-xs">
                  <div className="w-9 h-9 rounded-xl bg-[#FF9933]/20 text-[#FF9933] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">speed</span>
                  </div>
                  <div>
                    <span className="font-bold text-white block text-xs">Avg. Resolution Time: 41 Days</span>
                    <span className="text-white/60 text-[11px]">From report filed to field prototype installed</span>
                  </div>
                </div>

                {/* Indian tricolor accent bar */}
                <div className="h-1 w-full rounded-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] opacity-60" />
              </div>
            </div>

          </div>
        </div>

        {/* Bottom scroll cue */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-60 animate-bounce">
          <span className="material-symbols-outlined text-white text-2xl">keyboard_arrow_down</span>
        </div>
      </section>

      {/* 
        ========================================================================
        CITIZEN ACTION CENTER: INTAKE & REAL-TIME TRACKING
        ========================================================================
      */}
      <section id="register-problem" className="w-full py-12 px-4 sm:px-8 bg-surface-container-lowest border-b border-surface-container-high/60">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-secondary/15 text-secondary uppercase tracking-wider">
                  Citizen Action Center • Direct Government Intake
                </span>
                <span className="text-xs text-on-surface-variant font-medium hidden sm:inline">• Free Public Service</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-primary font-black tracking-tight text-2xl sm:text-3xl">
                {language === 'hi' ? 'अपनी समस्या दर्ज करें एवं स्थिति जांचें' : 'Submit Your Problem or Track Status'}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1.5 max-w-3xl leading-relaxed">
                {language === 'hi'
                  ? 'अपनी स्थानीय मातृभाषा में बोलकर या त्वरित विवरण लिखकर समस्या दर्ज करें। आपका आवेदन स्वतः निकटतम इंजीनियरिंग विश्वविद्यालय अनुसंधान केंद्र को भेजा जाता है।'
                  : 'Submit your community issue via vernacular voice note or quick form. Antigravity AI extracts the technical challenge and routes it to the nearest accredited university laboratory.'
                }
              </p>
            </div>

            {/* Statutory SLA Guarantee Badge */}
            <div className="flex items-center gap-3 bg-surface-container p-3 rounded-xl border border-surface-container-high text-xs shrink-0">
              <span className="material-symbols-outlined text-secondary text-2xl">verified_user</span>
              <div>
                <span className="font-bold text-primary block">Right to Public Service — Tracked Process</span>
                <span className="text-on-surface-variant text-[11px]">24h Triage • 7d Lab Match • Avg. 41d Resolution</span>
              </div>
            </div>
          </div>

          {/* Dual Column Layout: Left Form (8 Cols) / Right Tracker (4 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Problem Registration Form */}
            <div className="lg:col-span-8 bg-surface rounded-2xl p-6 sm:p-8 shadow-sm border border-surface-container-high flex flex-col gap-6">
              <form onSubmit={handleQuickSubmitProblem} className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-surface-container-high pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[18px]">edit_note</span>
                    </span>
                    <div>
                      <h3 className="font-headline-md text-headline-md text-primary font-bold">
                        {language === 'hi' ? 'नागरिक समस्या पंजीकरण प्रपत्र' : 'New Problem Registration Form'}
                      </h3>
                      <span className="text-[11px] text-on-surface-variant">No bureaucratic delays • Straight to university research team</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenReportModal}
                    className="text-xs text-secondary hover:underline font-bold flex items-center gap-1 cursor-pointer bg-secondary/10 px-3 py-1.5 rounded-lg"
                  >
                    <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                    {language === 'hi' ? 'विस्तृत विज़ार्ड खोलें' : 'Detailed Wizard'}
                  </button>
                </div>

                {/* Dialect Voice Intake Studio */}
                <div className="bg-surface-container-low p-4 sm:p-5 rounded-xl border border-surface-container-high/80 flex flex-col gap-3.5">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-xl">mic</span>
                      <span className="font-label-md text-label-md text-primary font-bold">
                        {language === 'hi' ? 'मातृभाषा में बोलकर दर्ज करें:' : 'Record via Local Dialect Audio Studio:'}
                      </span>
                    </div>
                    {/* Dialect Selection Pills with Vernacular Scripts */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {[
                        { id: 'Santali', label: 'Santali (ᱚᱞ ᱪᱤᱠᱤ)' },
                        { id: 'Ho', label: 'Ho (ᱣᱟᱨᱟᱝ ᱪᱤᱛᱤ)' },
                        { id: 'Mundari', label: 'Mundari (मुंडारी)' },
                        { id: 'Khortha', label: 'Khortha (खोरठा)' },
                        { id: 'Nagpuri', label: 'Nagpuri (नागपुरी)' },
                        { id: 'Hindi', label: 'Hindi (हिन्दी)' },
                      ].map((dl) => (
                        <button
                          key={dl.id}
                          type="button"
                          onClick={() => setSelectedDialect(dl.id as any)}
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                            selectedDialect === dl.id
                              ? 'bg-secondary text-on-secondary shadow-xs'
                              : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                          }`}
                        >
                          {dl.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Audio Recording Trigger & Live Feedback */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handleToggleAudioRecording}
                      className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                        isRecordingAudio
                          ? 'bg-red-600 text-white ring-4 ring-red-400/30 animate-pulse'
                          : 'bg-primary text-on-primary hover:bg-primary/90'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isRecordingAudio ? 'stop' : 'radio_button_checked'}
                      </span>
                      {isRecordingAudio 
                        ? (language === 'hi' ? 'सुन रहा है... (रोकने के लिए टैप करें)' : 'Listening in ' + selectedDialect + '...') 
                        : (language === 'hi' ? `${selectedDialect} में बोलें (रिकॉर्ड करें)` : `Record Audio in ${selectedDialect}`)
                      }
                    </button>

                    {/* Soundwave animation bars during recording */}
                    {isRecordingAudio && (
                      <div className="flex items-center gap-1 h-6 px-2">
                        <span className="w-1 bg-red-500 rounded-full animate-soundwave-1"></span>
                        <span className="w-1 bg-red-500 rounded-full animate-soundwave-2"></span>
                        <span className="w-1 bg-red-500 rounded-full animate-soundwave-3"></span>
                        <span className="w-1 bg-red-500 rounded-full animate-soundwave-4"></span>
                        <span className="w-1 bg-red-500 rounded-full animate-soundwave-5"></span>
                      </div>
                    )}

                    <span className="text-xs text-on-surface-variant italic">
                      {isRecordingAudio 
                        ? 'Translating dialect audio to technical grievance docket...'
                        : audioTranscriptRecorded 
                          ? '✓ Audio captured! Vernacular speech auto-filled below.' 
                          : 'Tap to speak. AI transcribes local vernacular speech automatically.'
                      }
                    </span>
                  </div>

                  {/* Audio transcription recognized entity feedback banner */}
                  {audioTranscriptRecorded && dialectTranscripts[selectedDialect] && (
                    <div className="mt-2 p-3 bg-surface-container rounded-lg border border-secondary/20 flex flex-col gap-1 text-xs">
                      <div className="flex items-center justify-between text-secondary font-bold">
                        <span>Recognized Technical Need: {dialectTranscripts[selectedDialect].entity}</span>
                        <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-mono text-[10px]">
                          {dialectTranscripts[selectedDialect].confidence} Confidence
                        </span>
                      </div>
                      <div className="text-on-surface-variant flex items-center gap-3 text-[11px]">
                        <span>Assigned Nodal Dept: <strong>{dialectTranscripts[selectedDialect].dept}</strong></span>
                        <span>Matched Lab: <strong>{dialectTranscripts[selectedDialect].lab}</strong></span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Category Selector */}
                <div>
                  <label className="font-label-sm text-label-sm text-primary font-bold block mb-2">
                    {language === 'hi' ? 'समस्या का क्षेत्र (Category)' : 'Problem Category / Domain'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'Drinking Water & Sanitation', label: 'Drinking Water', icon: 'water_drop' },
                      { id: 'Clean Air & Mine Dust', label: 'Mine Dust & Air', icon: 'air' },
                      { id: 'Agriculture & Cold Storage', label: 'Farming & Chilling', icon: 'agriculture' },
                      { id: 'Solar & Electricity', label: 'Solar & Power', icon: 'solar_power' },
                      { id: 'Healthcare & Rural Clinic', label: 'Rural Health', icon: 'local_hospital' },
                      { id: 'Roads & Waste Management', label: 'Roads & Waste', icon: 'alt_route' }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setReportCategory(cat.id)}
                        className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer text-xs font-semibold ${
                          reportCategory === cat.id
                            ? 'bg-secondary/10 border-secondary text-secondary font-bold shadow-xs'
                            : 'bg-surface-container-lowest border-surface-container-high text-on-surface-variant hover:bg-surface-container-low'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                        <span className="truncate">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* District & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-label-sm text-label-sm text-primary font-bold block mb-1.5">
                      {language === 'hi' ? 'जिला चुनें (District)' : 'District in Jharkhand'}
                    </label>
                    <select
                      value={reportDistrict}
                      onChange={(e) => setReportDistrict(e.target.value)}
                      className="w-full bg-surface-container-low border border-surface-container-high rounded-xl p-2.5 font-body-sm text-body-sm text-primary"
                    >
                      {DISTRICT_STATS.map((d) => (
                        <option key={d.name} value={d.name}>
                          {d.name} District ({d.activeClusters} active clusters)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-label-sm text-label-sm text-primary font-bold block mb-1.5">
                      {language === 'hi' ? 'प्रखंड / वार्ड / गांव (Block / Ward / Village)' : 'Block / Ward / Locality'}
                    </label>
                    <input
                      type="text"
                      value={reportBlock}
                      onChange={(e) => setReportBlock(e.target.value)}
                      placeholder="e.g. Namkum, Kokar Ward 14, Tisra, Torpa"
                      className="w-full bg-surface-container-low border border-surface-container-high rounded-xl p-2.5 font-body-sm text-body-sm text-primary"
                    />
                  </div>
                </div>

                {/* Problem Title & Details */}
                <div>
                  <label className="font-label-sm text-label-sm text-primary font-bold block mb-1.5">
                    {language === 'hi' ? 'समस्या का शीर्षक (Problem Title)' : 'Problem Summary / Title'}
                  </label>
                  <input
                    type="text"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    placeholder="e.g. Fecal coliform water contamination or solar pump failure in village..."
                    className="w-full bg-surface-container-low border border-surface-container-high rounded-xl p-2.5 font-body-sm text-body-sm text-primary"
                    required
                  />
                </div>

                <div>
                  <label className="font-label-sm text-label-sm text-primary font-bold block mb-1.5">
                    {language === 'hi' ? 'विस्तृत विवरण (Description & Impact)' : 'Detailed Description & Citizen Impact'}
                  </label>
                  <textarea
                    rows={3}
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    placeholder="How many households are affected? What have you tried so far? Give nearby landmarks..."
                    className="w-full bg-surface-container-low border border-surface-container-high rounded-xl p-2.5 font-body-sm text-body-sm text-primary"
                  ></textarea>
                </div>

                {/* Photo upload simulator */}
                <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl border border-dashed border-surface-container-highest">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary">add_a_photo</span>
                    <span className="text-xs text-on-surface-variant">
                      {hasUploadedPhoto 
                        ? '✓ Photo evidence attached: borehole_sample_photo.jpg' 
                        : 'Attach site photograph or test report (Optional)'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setHasUploadedPhoto(!hasUploadedPhoto);
                      onShowToast?.(hasUploadedPhoto ? 'Photo removed.' : 'Photo attached successfully.');
                    }}
                    className="text-xs px-3.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-semibold cursor-pointer"
                  >
                    {hasUploadedPhoto ? 'Remove' : 'Upload Photo'}
                  </button>
                </div>

                {/* Statutory 3-Milestone Guarantee Banner */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-secondary/5 rounded-xl border border-secondary/15 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-[10px]">1</span>
                    <div>
                      <span className="font-bold text-primary block text-[11px]">24h AI Intake</span>
                      <span className="text-[10px] text-on-surface-variant">SMS Reference Issued</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-[10px]">2</span>
                    <div>
                      <span className="font-bold text-primary block text-[11px]">7d Lab Match</span>
                      <span className="text-[10px] text-on-surface-variant">Assigned to BIT/ISM/NIT</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-[10px]">3</span>
                    <div>
                      <span className="font-bold text-primary block text-[11px]">~41d Avg.</span>
                      <span className="text-[10px] text-on-surface-variant">Field Prototype Installed</span>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-surface-container-high">
                  <span className="text-xs text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">verified</span>
                    Protected by Jharkhand Right to Public Service Mandate
                  </span>
                  <button
                    type="submit"
                    id="submit-problem-btn"
                    className="w-full sm:w-auto bg-secondary hover:bg-[#c2410c] text-on-secondary px-8 py-3.5 rounded-xl font-headline-sm text-headline-sm font-bold shadow-md shadow-secondary/30 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-400/40"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    {language === 'hi' ? 'समस्या दर्ज करें (Submit Ticket)' : 'Submit Problem to Jan Samadhan'}
                  </button>
                </div>
              </form>

              {/* Newly Created Ticket Success Confirmation Card */}
              {newlyCreatedTicket && (
                <div className="p-4 sm:p-5 rounded-xl bg-emerald-50 border border-emerald-300 flex flex-col gap-2 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                      <span className="material-symbols-outlined text-emerald-600">check_circle</span>
                      Grievance Successfully Registered!
                    </div>
                    <span className="font-mono text-xs font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                      {newlyCreatedTicket.id}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-700">
                    Your ticket <strong>{newlyCreatedTicket.id}</strong> has been transmitted to the <strong>{newlyCreatedTicket.district} District Innovation Cell</strong> and matched with the nearest technical laboratory. You will receive SMS updates on your registered mobile number.
                  </p>
                </div>
              )}
            </div>

            {/* Right: Live Ticket Tracker & Recent Citizen Submissions (4 Cols) */}
            <div id="track-problem" className="lg:col-span-4 flex flex-col gap-6">
              {/* Ticket Tracker Box */}
              <div className="bg-surface rounded-2xl p-6 shadow-sm border border-surface-container-high flex flex-col gap-4">
                <div className="flex items-center gap-2.5 text-primary font-bold">
                  <span className="w-8 h-8 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[18px]">track_changes</span>
                  </span>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary">
                      {language === 'hi' ? 'स्थिति जांचें' : 'Track Your Problem'}
                    </h3>
                    <span className="text-[11px] text-on-surface-variant font-normal">Real-time university lab progress</span>
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Enter your Jan Samadhan Reference Code (e.g. <code>JAN-RNC-2025-0814</code>) to inspect milestone progress.
                </p>

                <form onSubmit={handleLookupTicket} className="flex gap-2">
                  <input
                    type="text"
                    value={lookupId}
                    onChange={(e) => setLookupId(e.target.value)}
                    placeholder="e.g. JAN-RNC-2025-0814"
                    className="w-full bg-surface-container-low border border-surface-container-high rounded-xl p-2.5 font-mono text-xs text-primary"
                  />
                  <button
                    type="submit"
                    className="bg-secondary text-on-secondary px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 hover:bg-secondary/90 cursor-pointer"
                  >
                    Track
                  </button>
                </form>

                {/* Quick sample chips */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-on-surface-variant">Sample:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setLookupId('JAN-RNC-2025-0814');
                      setLookupResult({
                        id: 'JAN-RNC-2025-0814',
                        title: 'Deep Borewell Arsenic Infiltration in Kokar Ward 14',
                        stage: 'Field Pilot Deployed',
                        lab: 'BIT Mesra (Environmental Nanotechnology Lab)',
                        dept: 'Drinking Water & Sanitation Dept.',
                        eta: '7 days to final certification',
                        percent: 85
                      });
                    }}
                    className="text-[10px] font-mono bg-surface-container hover:bg-surface-container-high px-2 py-0.5 rounded text-primary font-semibold cursor-pointer"
                  >
                    JAN-RNC-2025-0814
                  </button>
                </div>

                {/* 4-Stage Visual Stepper Lookup Result Box */}
                {lookupResult && (
                  <div className="bg-surface-container-low p-4 rounded-xl border border-secondary/20 flex flex-col gap-3 animate-in fade-in">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-primary">{lookupResult.id}</span>
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                        {lookupResult.stage}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-on-surface leading-tight">{lookupResult.title}</span>
                    
                    {/* Visual 4-Stage Stepper */}
                    <div className="grid grid-cols-4 gap-1 pt-1 text-center text-[10px]">
                      <div className="flex flex-col items-center">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] mb-1 font-bold">✓</span>
                        <span className="text-emerald-800 font-bold">Logged</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] mb-1 font-bold">✓</span>
                        <span className="text-emerald-800 font-bold">Lab Matched</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="w-5 h-5 rounded-full bg-secondary text-white flex items-center justify-center text-[11px] mb-1 font-bold animate-pulse">3</span>
                        <span className="text-secondary font-bold">Field Pilot</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="w-5 h-5 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center text-[11px] mb-1 font-bold">4</span>
                        <span className="text-on-surface-variant">Certified</span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mt-1">
                      <div 
                        className="bg-secondary h-full rounded-full transition-all duration-500" 
                        style={{ width: `${lookupResult.percent}%` }}
                      ></div>
                    </div>

                    <div className="text-[11px] text-on-surface-variant space-y-1 pt-1.5 border-t border-surface-container">
                      <div><strong>Assigned Lab:</strong> {lookupResult.lab}</div>
                      <div><strong>Nodal Dept:</strong> {lookupResult.dept}</div>
                      <div><strong>Next Milestone:</strong> {lookupResult.eta}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Your Recent Submissions List */}
              <div className="bg-surface rounded-2xl p-6 shadow-sm border border-surface-container-high flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
                    {language === 'hi' ? 'हालिया नागरिक पंजीकरण' : 'Your Recent Tickets'}
                  </span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold">Live Updates</span>
                </div>
                <div className="space-y-2.5">
                  {submittedTickets.map((t) => (
                    <div key={t.id} className="p-3 bg-surface-container-low rounded-xl border border-surface-container-high/60 flex flex-col gap-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-primary">{t.id}</span>
                        <span className="text-[10px] text-on-surface-variant">{t.time}</span>
                      </div>
                      <span className="text-xs font-medium text-on-surface line-clamp-1">{t.title}</span>
                      <span className="text-[11px] text-secondary font-semibold">{t.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 2: TOP PROBLEMS (प्रमुख नागरिक समस्याएं)
        ========================================================================
      */}
      <section id="top-problems" className="w-full py-12 px-4 sm:px-8 bg-surface border-b border-surface-container-high/60">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Section Heading & Category Filter */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-800 uppercase tracking-wider">
                  Community Priorities • Clustered Citizen Grievances
                </span>
                <span className="text-xs text-on-surface-variant font-medium">• Clustered from 12,480+ citizen reports</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-primary font-black tracking-tight text-2xl sm:text-3xl">
                {language === 'hi' ? 'प्रमुख नागरिक समस्याएं (Community Priorities)' : 'Top Community Issues Requiring Solutions'}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-2xl">
                {language === 'hi'
                  ? 'ये वे समस्याएं हैं जिन्हें नागरिकों ने सबसे अधिक बार दर्ज किया है। आप भी "मुझे भी यह समस्या है (+1)" पर क्लिक करके समस्या की प्राथमिकता बढ़ा सकते हैं।'
                  : 'Highest impact community challenges pooled across Jharkhand. Upvote issues that affect your area to accelerate laboratory resource allocation.'
                }
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {['All', 'Water Quality', 'Mining & Air', 'Agriculture'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setTopProblemsCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    topProblemsCategory === cat
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Problem Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopProblems.map((prob) => {
              const upvoteCount = problemsUpvotes[prob.id] || prob.reportsCount;
              const isUpvoted = !!upvotedProblemIds[prob.id];

              return (
                <div
                  key={prob.id}
                  className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-container-high shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
                >
                  <div className="flex flex-col gap-3">
                    {/* Top tags */}
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                        prob.severity === 'Critical' 
                          ? 'bg-error/10 text-error' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {prob.severity} Priority
                      </span>
                      <span className="text-xs text-on-surface-variant font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                        {prob.district}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => onSelectChallenge(prob)}
                      className="font-headline-md text-headline-md text-primary font-bold group-hover:text-secondary transition-colors cursor-pointer line-clamp-2"
                    >
                      {prob.title}
                    </h3>

                    <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                      {prob.summary}
                    </p>

                    {/* Assigned Lab */}
                    <div className="bg-surface-container-low p-3 rounded-xl border border-surface-container-high/60 flex flex-col gap-1 text-xs">
                      <div className="flex items-center justify-between text-on-surface-variant">
                        <span>Assigned University Lab:</span>
                        <span className="font-bold text-secondary">{prob.aiMatchScore}% Fit</span>
                      </div>
                      <span className="font-bold text-primary truncate">{prob.matchedLab}</span>
                      <span className="text-[11px] text-on-surface-variant">{prob.sponsoringBody}</span>
                    </div>
                  </div>

                  {/* Bottom Stats & Upvote Action */}
                  <div className="pt-3 border-t border-surface-container-high flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="text-[11px] text-on-surface-variant">Citizen Reports</span>
                      <span className="text-sm font-bold text-primary">{upvoteCount} Affected</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpvoteProblem(prob.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          isUpvoted
                            ? 'bg-secondary text-on-secondary shadow-xs'
                            : 'bg-surface-container hover:bg-surface-container-high text-primary'
                        }`}
                        title="Upvote if this problem affects you too"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {isUpvoted ? 'thumb_up' : 'thumb_up_off_alt'}
                        </span>
                        <span>{isUpvoted ? 'Upvoted (+1)' : 'Me Too (+1)'}</span>
                      </button>

                      <button
                        onClick={() => onSelectChallenge(prob)}
                        className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                        title="View Detailed Technical Dossier"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        FIELD IMPACT SHOWCASE: BEFORE & AFTER UNIVERSITY SOLUTIONS
        ========================================================================
      */}
      <FieldImpactShowcase
        language={language}
        onOpenReportModal={() => onOpenReportModal()}
      />

      {/* 
        ========================================================================
        SECTION 3: HEAT MAP (झारखंड जिला समस्या हीटमैप)
        ========================================================================
      */}
      <section id="state-heatmap" className="w-full py-12 px-4 sm:px-8 bg-surface-container-lowest border-b border-surface-container-high/60">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/15 text-blue-800 uppercase tracking-wider">
                  District GIS Telemetry • 24-District Problem Hotspots
                </span>
                <span className="text-xs text-on-surface-variant font-medium">• Live Radar Synchronization</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-primary font-black tracking-tight text-2xl sm:text-3xl">
                {language === 'hi' ? 'झारखंड समस्या हीटमैप (24-District Telemetry)' : '24-District Problem Telemetry Heat Map'}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-2xl">
                {language === 'hi'
                  ? 'झारखंड के सभी २४ जिलों में समस्याओं का सजीव घनत्व देखें। किसी भी जिले पर क्लिक करके उसकी सक्रिय समस्याएं एवं समाधान में जुटी विश्वविद्यालय लैब का विवरण देखें।'
                  : 'Real-time geographic density of citizen grievances across all 24 districts of Jharkhand. Select any district to view its cluster density and assigned university lab.'
                }
              </p>
            </div>

            <button
              onClick={onNavigateToHeatmap}
              className="text-xs bg-primary text-on-primary hover:bg-primary/90 px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm self-start md:self-auto"
            >
              <span className="material-symbols-outlined text-[16px]">map</span>
              {language === 'hi' ? 'पूर्ण हीटमैप स्क्रीन खोलें' : 'Open Full Heatmap View'}
            </button>
          </div>

          {/* Heatmap Interactive Visual Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-surface rounded-2xl p-6 border border-surface-container-high shadow-sm">
            {/* Left: Interactive District Map Stage (8 Columns) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              {/* Layer Filter Toolbar */}
              <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-surface-container-high">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-on-surface-variant font-bold">Layer Filter:</span>
                  {(['all', 'water', 'mining', 'agro'] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setHeatmapLayer(l)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        heatmapLayer === l
                          ? 'bg-secondary text-on-secondary shadow-xs'
                          : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>

                <span className="text-xs text-on-surface-variant">
                  Current District: <strong className="text-primary">{selectedHeatmapDistrict.name}</strong>
                </span>
              </div>

              {/* GIS Satellite Telemetry Heatmap Stage with Blinking Hotspots */}
              <div
                className="w-full h-[420px] sm:h-[480px] rounded-xl bg-cover bg-center relative overflow-hidden flex flex-col justify-between p-4 border border-surface-container-high/40 shadow-inner"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAoz1EKD4qf_f8OON_jVvvCjBMgYt8YkZsku7G85AWoCtmtmo1p_4gO6LY-WpSu-b8lMkhjXuwbDxX04pkmKuGnypQ377oUT9mPb14eHS_ko77nM_swwMGczVSkIsp5xAp6R8V1MmlUpMmEBrVefJ65utUAYI-3kcFpnXgw61HOv3PCtoMKlJo8lk6cbcX8hNhptpV45T0rR4AAFsl1LUsLCvhcG0tfI2fVFGXbP2zk32x9tmArQRy2gA')"
                }}
              >
                {/* Backdrop Vignette Overlay */}
                <div className="absolute inset-0 bg-primary/25 backdrop-brightness-95 pointer-events-none"></div>

                {/* Top Badge: Satellite Source & Legend */}
                <div className="relative z-10 flex items-center justify-between flex-wrap gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="font-semibold text-[11px] uppercase tracking-wider text-tertiary-fixed">
                      JSAC Satellite GIS Layer • Live Blinking Hotzones
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span> Level 4 (Critical)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span> Level 3 (High)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span> Level 2 (Moderate)
                    </span>
                  </div>
                </div>

                {/* Dynamic District Blinking Hotspots */}
                <div className="absolute inset-0 pointer-events-none">
                  {DISTRICT_STATS.map((d, index) => {
                    const positions: Record<string, { top: string; left: string }> = {
                      Ranchi: { top: '48%', left: '46%' },
                      Dhanbad: { top: '44%', left: '64%' },
                      'East Singhbhum': { top: '72%', left: '70%' },
                      Bokaro: { top: '41%', left: '55%' },
                      Hazaribagh: { top: '35%', left: '44%' },
                      Deoghar: { top: '27%', left: '68%' },
                      Palamu: { top: '32%', left: '22%' },
                      Dumka: { top: '32%', left: '78%' },
                    };

                    const pos = positions[d.name] || { top: `${30 + index * 8}%`, left: `${20 + index * 9}%` };
                    const isSelected = selectedHeatmapDistrict.name === d.name;

                    return (
                      <div
                        key={d.name}
                        onClick={() => {
                          setSelectedHeatmapDistrict(d);
                          onSelectDistrict?.(d);
                          onShowToast?.(`Selected ${d.name} District (${d.status} • ${d.alerts} alerts)`);
                        }}
                        style={{ top: pos.top, left: pos.left }}
                        className="absolute pointer-events-auto cursor-pointer group -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-125"
                      >
                        <div className="relative flex items-center justify-center">
                          {/* Continuous Blinking Ping Animations */}
                          {d.status === 'Critical' && (
                            <span className="animate-ping absolute inline-flex h-9 w-9 rounded-full bg-red-500 opacity-80"></span>
                          )}
                          {d.status === 'High' && (
                            <span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-amber-400 opacity-70"></span>
                          )}
                          {isSelected && (
                            <span className="animate-ping absolute inline-flex h-11 w-11 rounded-full bg-cyan-400 opacity-90"></span>
                          )}

                          {/* Center Hotspot Marker Pin */}
                          <span
                            className={`relative inline-flex rounded-full h-6 w-6 text-white text-[11px] font-black items-center justify-center shadow-lg ring-2 ${
                              isSelected
                                ? 'ring-cyan-300 ring-4 scale-110 shadow-cyan-500/50'
                                : 'ring-white/90'
                            } ${
                              d.status === 'Critical'
                                ? 'bg-red-600'
                                : d.status === 'High'
                                ? 'bg-amber-500'
                                : 'bg-blue-600'
                            }`}
                          >
                            {d.rank}
                          </span>

                          {/* Mini label below pin */}
                          <span className="absolute top-full mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-black/75 text-white whitespace-nowrap shadow pointer-events-none backdrop-blur-xs">
                            {d.name}
                          </span>
                        </div>

                        {/* Hover Tooltip Popup */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[11px] p-2 rounded-lg shadow-xl whitespace-nowrap z-40 font-medium border border-white/20 pointer-events-none">
                          <div className="font-bold text-tertiary-fixed flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">location_on</span>
                            {d.name} District (Rank #{d.rank})
                          </div>
                          <div className="text-white/90 text-[10px]">
                            {d.status} • {d.alerts} Alerts • {d.activeClusters} Clusters
                          </div>
                          <div className="text-emerald-300 text-[10px] font-semibold mt-0.5">
                            Lab: {d.anchorLab}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Bar: Live Radar Sweep Telemetry */}
                <div className="relative z-10 w-full bg-surface-container-lowest/90 backdrop-blur-md p-3 rounded-lg flex items-center justify-between shadow-md border border-white/20">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-label-sm text-label-sm font-bold text-primary text-xs">
                      Active Radar Sweep: 24/24 Districts Synchronized
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] hidden sm:inline">
                    Click any blinking hotspot to inspect District Innovation Cell
                  </span>
                </div>
              </div>

              {/* District Quick Select Row */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1">
                <span className="text-xs text-on-surface-variant font-bold shrink-0">Quick Select:</span>
                {DISTRICT_STATS.map((d) => (
                  <button
                    key={d.name}
                    type="button"
                    onClick={() => {
                      setSelectedHeatmapDistrict(d);
                      onSelectDistrict?.(d);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 transition-all cursor-pointer flex items-center gap-1 ${
                      selectedHeatmapDistrict.name === d.name
                        ? 'bg-secondary text-on-secondary shadow-xs'
                        : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${d.status === 'Critical' ? 'bg-red-500 animate-ping' : d.status === 'High' ? 'bg-amber-400 animate-ping' : 'bg-blue-400'}`}></span>
                    {d.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Selected District Telemetry Info (4 Columns) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-4 p-4 bg-surface-container-low rounded-xl border border-surface-container-high">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">District Telemetry</span>
                  <span className="font-mono text-xs text-primary font-bold">DIV-JH-0{selectedHeatmapDistrict.name.length}</span>
                </div>

                <h3 className="font-headline-md text-headline-md text-primary font-black text-xl">
                  {selectedHeatmapDistrict.name} District
                </h3>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-surface p-2.5 rounded-lg border border-surface-container-high">
                    <span className="text-[10px] text-on-surface-variant block">Active Clusters</span>
                    <span className="text-base font-bold text-primary">{selectedHeatmapDistrict.activeClusters}</span>
                  </div>
                  <div className="bg-surface p-2.5 rounded-lg border border-surface-container-high">
                    <span className="text-[10px] text-on-surface-variant block">Critical Hotzones</span>
                    <span className="text-base font-bold text-error">{selectedHeatmapDistrict.criticalHotzones}</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-[11px] text-on-surface-variant block">Primary Status & Alerts:</span>
                  <span className="font-bold text-primary bg-surface p-2 rounded-lg border border-surface-container-high block">
                    {selectedHeatmapDistrict.status} Risk Level • {selectedHeatmapDistrict.alerts} Public Alerts
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-[11px] text-on-surface-variant block">Anchor University Lab:</span>
                  <span className="font-semibold text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">domain</span>
                    {selectedHeatmapDistrict.anchorLab}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-on-surface-variant">SLA Resolution Speed:</span>
                  <span className="font-bold text-emerald-600">{selectedHeatmapDistrict.slaRate}% on target ({selectedHeatmapDistrict.solvedCount} Solved)</span>
                </div>
              </div>

              <button
                onClick={() => onSelectDistrict?.(selectedHeatmapDistrict)}
                className="w-full bg-secondary hover:bg-secondary/90 text-on-secondary py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">folder_open</span>
                View {selectedHeatmapDistrict.name} Full Dossier
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 4: UNIVERSITY RANKING LIST (Based on Problems Solved)
        ========================================================================
      */}
      <section id="university-rankings" className="w-full py-12 px-4 sm:px-8 bg-surface border-b border-surface-container-high/60">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Section Heading & Sorting Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-800 uppercase tracking-wider">
                  Academic Performance Leaderboard • Higher Education Registry
                </span>
                <span className="text-xs text-on-surface-variant font-medium">• Verified Solutions Audit</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-primary font-black tracking-tight text-2xl sm:text-3xl">
                {language === 'hi' ? 'विश्वविद्यालय समाधान रैंकिंग सूची' : 'University Solutions & Performance Leaderboard'}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-2xl">
                {language === 'hi'
                  ? 'झारखंड के सभी इंजीनियरिंग कॉलेजों एवं विश्वविद्यालयों की आधिकारिक रैंकिंग—जिन्होंने नागरिकों की समस्याओं को वास्तविक प्रयोगशाला एवं फील्ड प्रोटोटाइप से सफलतापूर्वक हल किया है।'
                  : 'Official performance ranking of technical universities in Jharkhand based on total verified citizen problems solved, resolution speed, and public satisfaction.'
                }
              </p>
            </div>

            {/* Sorting Controls */}
            <div className="flex items-center gap-2 bg-surface-container-low p-1.5 rounded-xl border border-surface-container-high">
              <span className="text-xs text-on-surface-variant pl-2 font-bold hidden sm:inline">Sort:</span>
              <button
                onClick={() => handleSortRankings('solved')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  rankSortBy === 'solved'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Problems Solved
              </button>
              <button
                onClick={() => handleSortRankings('sla')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  rankSortBy === 'sla'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Turnaround SLA
              </button>
              <button
                onClick={() => handleSortRankings('rating')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  rankSortBy === 'rating'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Citizen Rating
              </button>
            </div>
          </div>

          {/* Ranking Cards / Table Layout */}
          <div className="flex flex-col gap-4">
            {rankedUniversities.map((uni) => {
              const rankMedal = uni.rank === 1 ? '🥇 Rank #1' : uni.rank === 2 ? '🥈 Rank #2' : uni.rank === 3 ? '🥉 Rank #3' : `Rank #${uni.rank}`;
              const rankColor = uni.rank === 1 ? 'border-amber-400 bg-amber-500/5' : uni.rank === 2 ? 'border-slate-300' : uni.rank === 3 ? 'border-amber-600/30' : 'border-surface-container-high';

              return (
                <div
                  key={uni.shortCode}
                  className={`bg-surface-container-lowest rounded-2xl p-5 sm:p-6 border ${rankColor} shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6`}
                >
                  {/* Left: Rank, Name, Flagship Solution */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex flex-col items-center justify-center shrink-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-xs ${
                        uni.rank === 1 
                          ? 'bg-amber-400 text-slate-950 font-black' 
                          : uni.rank === 2 
                            ? 'bg-slate-200 text-slate-900 font-bold' 
                            : uni.rank === 3 
                              ? 'bg-amber-700 text-white font-bold' 
                              : 'bg-surface-container text-primary font-bold'
                      }`}>
                        {rankMedal}
                      </span>
                      <span className="font-mono text-[10px] text-on-surface-variant mt-1 font-bold">
                        {uni.shortCode}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-headline-md text-headline-md text-primary font-bold text-lg">
                          {uni.name}
                        </h3>
                        <span className="text-xs text-on-surface-variant flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px]">pin_drop</span>
                          {uni.location}
                        </span>
                      </div>

                      <p className="text-xs text-on-surface-variant">
                        <strong>Flagship Solved Solution:</strong> {uni.flagshipSolution}
                      </p>

                      {/* Domain Badges */}
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {uni.topDomains.map((dom) => (
                          <span key={dom} className="px-2 py-0.5 rounded bg-surface-container text-[11px] text-primary font-medium">
                            {dom}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-t lg:border-t-0 lg:border-l border-surface-container-high pt-4 lg:pt-0 lg:pl-6 shrink-0 text-center lg:text-left">
                    {/* Key Metric: Problems Solved */}
                    <div className="flex flex-col">
                      <span className="text-[11px] text-on-surface-variant font-medium">Problems Solved</span>
                      <span className="text-2xl font-black text-secondary">{uni.solvedCount}</span>
                      <span className="text-[10px] text-emerald-600 font-bold">{uni.activeCount} in progress</span>
                    </div>

                    {/* Turnaround speed */}
                    <div className="flex flex-col">
                      <span className="text-[11px] text-on-surface-variant font-medium">Avg Turnaround</span>
                      <span className="text-xl font-bold text-primary">{uni.avgTurnaroundDays} days</span>
                      <span className="text-[10px] text-on-surface-variant">{uni.slaRate}% SLA Rate</span>
                    </div>

                    {/* Citizen Satisfaction */}
                    <div className="flex flex-col">
                      <span className="text-[11px] text-on-surface-variant font-medium">Citizen Rating</span>
                      <span className="text-xl font-bold text-amber-600 flex items-center justify-center lg:justify-start gap-1">
                        ★ {uni.satisfactionRating}
                      </span>
                      <span className="text-[10px] text-on-surface-variant">Verified Reviews</span>
                    </div>

                    {/* Research Grants Won */}
                    <div className="flex flex-col">
                      <span className="text-[11px] text-on-surface-variant font-medium">Grants Awarded</span>
                      <span className="text-lg font-bold text-primary">{uni.grantWon}</span>
                      <span className="text-[10px] text-secondary font-semibold">State Innovation Fund</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 5: AWARDED OR WINNING INSTITUTES (Recognition & Hall of Fame)
        ========================================================================
      */}
      <section id="awarded-institutes" className="w-full py-12 px-4 sm:px-8 bg-surface-container-lowest border-b border-surface-container-high/60">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-800 uppercase tracking-wider">
                  Gubernatorial Recognition • Hall of Fame
                </span>
                <span className="text-xs text-on-surface-variant font-medium">• State Citations</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-primary font-black tracking-tight text-2xl sm:text-3xl">
                {language === 'hi' ? 'सम्मानित एवं विजेता संस्थान (Governor Roll)' : 'Awarded & Recognized Research Institutes'}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-2xl">
                {language === 'hi'
                  ? 'झारखंड के नागरिकों की वास्तविक चुनौतियों को हल करने वाले विजेता विश्वविद्यालय और उनके द्वारा विकसित क्रांतिकारी समाधानों को राज्य स्तर पर सम्मान।'
                  : 'Prestigious state awards and gubernatorial recognition bestowed on academic laboratories delivering transformational societal breakthroughs.'
                }
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-amber-500">workspace_premium</span>
              <span>Annual Governor Innovation Roll • 2024-25</span>
            </div>
          </div>

          {/* Awards Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AWARDED_INSTITUTES.map((award) => (
              <div
                key={award.id}
                className="bg-surface rounded-2xl p-6 border border-surface-container-high shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-5 relative overflow-hidden"
              >
                {/* Decorative corner medal banner */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-600 flex items-center justify-center shrink-0 border border-amber-400/30 shadow-xs">
                      <span className="material-symbols-outlined text-3xl">{award.trophyIcon}</span>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
                        {award.category} • {award.awardYear}
                      </span>
                      <h3 className="font-headline-md text-headline-md text-primary font-black text-lg leading-snug">
                        {award.awardTitle}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Institute & Solution Details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs bg-surface-container-low p-2.5 rounded-lg border border-surface-container-high/60">
                    <span className="text-on-surface-variant">Winning Institute:</span>
                    <span className="font-bold text-primary">{award.instituteName}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs bg-surface-container-low p-2.5 rounded-lg border border-surface-container-high/60">
                    <span className="text-on-surface-variant">Winning Solution:</span>
                    <span className="font-bold text-secondary">{award.solutionName}</span>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed italic pt-1">
                    "{award.citation}"
                  </p>
                </div>

                {/* Impact Metrics Bar */}
                <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-surface-container-high">
                  <div className="bg-surface-container-low p-2 rounded-lg">
                    <span className="text-[10px] text-on-surface-variant block">Lives Benefited</span>
                    <span className="text-xs font-bold text-primary">{award.impactMetrics.livesBenefited}</span>
                  </div>
                  <div className="bg-surface-container-low p-2 rounded-lg">
                    <span className="text-[10px] text-on-surface-variant block">Districts Reached</span>
                    <span className="text-xs font-bold text-secondary">{award.impactMetrics.districtsDeployed} Districts</span>
                  </div>
                  <div className="bg-surface-container-low p-2 rounded-lg">
                    <span className="text-[10px] text-on-surface-variant block">Prize Grant</span>
                    <span className="text-xs font-bold text-emerald-600">{award.impactMetrics.grantAmount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 6: PUBLIC FEEDBACK (जनता की राय एवं समीक्षाएं)
        ========================================================================
      */}
      <section id="public-feedback" className="w-full py-12 px-4 sm:px-8 bg-surface">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-secondary/15 text-secondary uppercase tracking-wider">
                  Citizen Reviews & Verification • Public Trust
                </span>
                <span className="text-xs text-on-surface-variant font-medium">• 14,200+ Verified Ratings</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-primary font-black tracking-tight text-2xl sm:text-3xl">
                {language === 'hi' ? 'जनता की राय एवं अनुभव (Citizen Reviews)' : 'Public Feedback & Citizen Testimonials'}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-2xl">
                {language === 'hi'
                  ? 'देखें कि जिन नागरिकों की समस्याएं हल हुईं उनका क्या अनुभव रहा, अथवा आप भी अपने गांव/शहर में हुए समाधान पर अपनी राय और रेटिंग साझा करें।'
                  : 'Real testimonials from citizens across Jharkhand whose problems were solved by universities, along with an open forum to submit your own feedback.'
                }
              </p>
            </div>

            {/* Satisfaction score badge */}
            <div className="flex items-center gap-3 bg-surface-container-low p-3 rounded-2xl border border-surface-container-high">
              <div className="flex flex-col text-right">
                <span className="text-xs text-on-surface-variant">Citizen Trust Rating</span>
                <span className="text-lg font-black text-amber-600">4.8 / 5.0 ★</span>
              </div>
              <div className="h-8 w-px bg-surface-container-high"></div>
              <span className="text-xs text-on-surface-variant">14,200+ Verified Ratings</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Verified Citizen Reviews List (7 Columns) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {feedbacks.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 border border-surface-container-high shadow-sm flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-secondary/15 text-secondary flex items-center justify-center font-bold text-sm">
                        {item.citizenName.substring(0, 1)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-primary text-sm">{item.citizenName}</span>
                          {item.verifiedCitizen && (
                            <span className="material-symbols-outlined text-[16px] text-emerald-500" title="Verified Resident">
                              verified
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-on-surface-variant">
                          {item.villageOrWard}, {item.district} • {item.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-500 text-sm">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-2.5 rounded-xl border border-surface-container-high/60 text-xs">
                    <span className="text-on-surface-variant">Solved Problem: </span>
                    <strong className="text-primary">{item.solvedProblemTitle}</strong>
                    <span className="text-secondary font-medium block mt-0.5">Resolved by: {item.solvingInstitute}</span>
                  </div>

                  <p className="text-xs text-on-surface leading-relaxed italic">
                    "{item.comment}"
                  </p>

                  <div className="flex items-center justify-between text-xs text-on-surface-variant pt-2 border-t border-surface-container-high">
                    <span className="text-[11px]">Category: {item.category}</span>
                    <button
                      onClick={() => onShowToast?.(`✓ Marked feedback by ${item.citizenName} as helpful.`)}
                      className="hover:text-primary transition-colors flex items-center gap-1 text-xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">thumb_up</span>
                      Helpful ({item.upvotesCount})
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Submit Public Feedback Interactive Form (5 Columns) */}
            <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-6 border border-surface-container-high shadow-sm flex flex-col gap-4 sticky top-24">
              <div className="flex items-center gap-2 border-b border-surface-container-high pb-3">
                <span className="material-symbols-outlined text-secondary text-2xl">rate_review</span>
                <div>
                  <h3 className="font-headline-md text-headline-md text-primary font-bold">
                    {language === 'hi' ? 'अपनी राय साझा करें' : 'Share Your Citizen Feedback'}
                  </h3>
                  <span className="text-xs text-on-surface-variant">Help improve Jan Samadhan services</span>
                </div>
              </div>

              <form onSubmit={handlePostFeedback} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-bold text-primary block mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={newFeedbackName}
                    onChange={(e) => setNewFeedbackName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar Mahto"
                    className="w-full bg-surface-container-low border border-surface-container-high rounded-lg p-2 text-xs text-primary"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-primary block mb-1">
                      District
                    </label>
                    <select
                      value={newFeedbackDistrict}
                      onChange={(e) => setNewFeedbackDistrict(e.target.value)}
                      className="w-full bg-surface-container-low border border-surface-container-high rounded-lg p-2 text-xs text-primary"
                    >
                      {DISTRICT_STATS.map((d) => (
                        <option key={d.name} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-primary block mb-1">
                      Village / Ward
                    </label>
                    <input
                      type="text"
                      value={newFeedbackVillage}
                      onChange={(e) => setNewFeedbackVillage(e.target.value)}
                      placeholder="e.g. Ward 14 / Torpa"
                      className="w-full bg-surface-container-low border border-surface-container-high rounded-lg p-2 text-xs text-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-primary block mb-1">
                    Problem Domain / Category
                  </label>
                  <select
                    value={newFeedbackCategory}
                    onChange={(e) => setNewFeedbackCategory(e.target.value)}
                    className="w-full bg-surface-container-low border border-surface-container-high rounded-lg p-2 text-xs text-primary"
                  >
                    <option value="Drinking Water">Drinking Water & Sanitation</option>
                    <option value="Air Quality & Mining">Air Quality & Coal Dust</option>
                    <option value="Agriculture & Storage">Agriculture & Cold Storage</option>
                    <option value="Electricity & Solar">Solar Power & Irrigation</option>
                    <option value="Rural Health">Rural Health & Clinics</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-primary block mb-1">
                    Your Rating (1 to 5 Stars)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewFeedbackRating(star)}
                        className="text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <span 
                          className="material-symbols-outlined text-2xl"
                          style={{ fontVariationSettings: star <= newFeedbackRating ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          star
                        </span>
                      </button>
                    ))}
                    <span className="text-xs text-on-surface-variant font-bold ml-1">
                      {newFeedbackRating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-primary block mb-1">
                    Your Review & Experience
                  </label>
                  <textarea
                    rows={3}
                    value={newFeedbackComment}
                    onChange={(e) => setNewFeedbackComment(e.target.value)}
                    placeholder="How did the university prototype solve your issue? Tell us your experience..."
                    className="w-full bg-surface-container-low border border-surface-container-high rounded-lg p-2 text-xs text-primary"
                    required
                  ></textarea>
                </div>

                {feedbackSubmittedSuccess && (
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
                    Feedback posted successfully to the community registry!
                  </div>
                )}

                <button
                  type="submit"
                  id="submit-feedback-btn"
                  className="w-full bg-secondary hover:bg-[#c2410c] text-on-secondary py-3 rounded-xl text-xs font-bold transition-all shadow-md shadow-secondary/25 flex items-center justify-center gap-1.5 cursor-pointer border border-amber-400/40"
                >
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  Post Public Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
