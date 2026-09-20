import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  ReactFlow, 
  MiniMap, 
  Controls, 
  Background, 
  BackgroundVariant,
  Panel,
  Handle, 
  Position, 
  MarkerType,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  NodeProps
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import confetti from 'canvas-confetti';
import { ScreenTab, Language } from '../types';
import { 
  Users, 
  Smartphone, 
  Monitor, 
  FileText, 
  Building2, 
  Clock, 
  Mail, 
  ThumbsUp, 
  ThumbsDown, 
  CheckCircle2, 
  UserCheck, 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  RotateCcw, 
  Play, 
  Pause, 
  Layers, 
  Database, 
  Sparkles, 
  Code2, 
  Award,
  Compass,
  Zap,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

interface ProcessFlowScreenProps {
  language?: Language;
  onNavigateTab: (tab: ScreenTab) => void;
  onOpenReportModal: () => void;
}

export type FlowNodeId = 
  | 'citizen'
  | 'intake-registration'
  | 'portals-escalation'
  | 'unique-id-ai'
  | 'transmission-pgo-lab'
  | 'resolution-prototype'
  | 'sla-clock'
  | 'atr-notification'
  | 'feedback-loop'
  | 'satisfied-decision'
  | 'closure-gazette'
  | 'appellate-authority'
  | 'final-resolution';

interface NodeDeepDetail {
  id: FlowNodeId;
  title: string;
  hindiTitle: string;
  cpgramsEquivalent: string;
  websiteComponent: string;
  summary: string;
  internalMechanism: string[];
  algorithmOrAiModel: string;
  dataSchema: Record<string, any>;
  slaAndRules: string;
  securityProtocol: string;
  statMetric: string;
  statLabel: string;
}

const FLOW_NODES_DATA: Record<FlowNodeId, NodeDeepDetail> = {
  'citizen': {
    id: 'citizen',
    title: '1. Citizen Grassroots Stakeholder',
    hindiTitle: '1. नागरिक एवं ग्रामीण हितधारक',
    cpgramsEquivalent: 'Citizen (नागरिक) - Primary origin of grievance',
    websiteComponent: 'HomeScreen.tsx (Jan Samadhan Portal), RuralOfflineQueueBanner.tsx',
    summary: 'The starting origin of all civic challenges. Supports rural tribals, urban residents, farmers, and municipal citizens across 24 Jharkhand districts.',
    internalMechanism: [
      'Multi-modal input intake: typed text, smartphone camera photo, or direct vernacular voice recording.',
      'Low-bandwidth offline resilience: IndexedDB local caching when network drops in remote tribal blocks (e.g., Namkum, Tamar, Torpa).',
      'Dual access modes: Authenticated with mobile OTP / Aadhaar or anonymous guest pass with digital ticket pass.'
    ],
    algorithmOrAiModel: 'Whisper Fine-Tuned ASR for Santhali (Ol Chiki), Ho, Mundari, Khortha, Nagpuri, and Hindi speech phonetics.',
    dataSchema: {
      "citizenId": "UUID or anonymized hash",
      "mobile": "E.164 encrypted (+91-XXXXX)",
      "district": "Ranchi | Dhanbad | Dumka | 21 others",
      "block": "Block name (Namkum, Govindpur, etc.)",
      "submissionChannel": "Web | OfflineQueue | CSC | TollFree181"
    },
    slaAndRules: 'Submission guaranteed within 300ms. Offline sync automatically triggers upon regaining 2G/3G telemetry connectivity.',
    securityProtocol: 'SHA-256 mobile hashing, zero personal data leak to public feed, privacy-compliant geotag redaction.',
    statMetric: '42,850+',
    statLabel: 'Citizens Registered Across 24 Districts'
  },
  'intake-registration': {
    id: 'intake-registration',
    title: '2A. One-Time Registration & Problem Intake',
    hindiTitle: '2A. वन-टाइम पंजीकरण एवं समस्या प्रविष्टि',
    cpgramsEquivalent: 'One Time Registration & Login',
    websiteComponent: 'SubmitProblemModal.tsx, HomeScreen.tsx (In-Page Quick Register)',
    summary: 'Direct citizen entry pipeline. Allows instant registration with verified mobile OTP, geo-coordinates, block selection, category tags, and multimedia attachments.',
    internalMechanism: [
      'Automatic GPS reverse-geocoding via navigator.geolocation with fallback district-block manual picker.',
      'Live voice recorder with audio waveform visualization and instant dialect transcript preview.',
      'Client-side image compression and EXIF metadata validation (preventing tampered or stock image uploads).'
    ],
    algorithmOrAiModel: 'Vision Classifier (MobileNet/Gemini) for civic defect visual feature verification (e.g., rusted handpump, broken culvert, burning dump).',
    dataSchema: {
      "intakePayload": "Object",
      "title": "String (min 10 chars)",
      "description": "String (vernacular audio transcript or text)",
      "coordinates": "{ lat: 23.3441, lng: 85.3096 }",
      "voiceAttachmentUri": "Blob / audio/webm; codecs=opus",
      "photoAttachmentUri": "Base64 or Cloud Storage CDN link"
    },
    slaAndRules: 'Instant OTP delivery within 15 seconds; maximum file size 12MB with automatic client downscaling.',
    securityProtocol: 'TLS 1.3 encryption, rate-limiting by IP and mobile number (max 5 submissions per hour per user).',
    statMetric: '1,420',
    statLabel: 'Intake Submissions Processed This Week'
  },
  'portals-escalation': {
    id: 'portals-escalation',
    title: '2B. Institutional & Ministerial Escalation Portals',
    hindiTitle: '2B. मंत्रालय एवं वीआईपी पोर्टल एकीकरण',
    cpgramsEquivalent: 'Portals of President Secretariat; PMO; CS',
    websiteComponent: 'External Webhook Receivers, CommandCenterScreen.tsx (VIP Queue)',
    summary: 'Omnichannel routing from high-level state and central offices (Chief Minister Jan Samadhan, PMO portal, President Secretariat, CS Hotline 181, CSC Pragya Kendras).',
    internalMechanism: [
      'Webhook listeners ingest JSON payloads from external state portals and CPGRAMS central APIs.',
      'VIP & High-Priority flags automatically stamped on grievances originating from CS or CMO.',
      'Cross-system reference number mapped to local Jan Samadhan ticket ID for synchronized tracking.'
    ],
    algorithmOrAiModel: 'Cross-Portal Deduplication Hash (MinHash LSH) to detect if a citizen submitted identical complaints across PMO and Jan Samadhan.',
    dataSchema: {
      "originPortal": "PMO | CS_Hotline | CM_Secretariat | CPGRAMS_Gov",
      "externalRefId": "PMOPG/E/2025/0091823",
      "priorityLevel": "CRITICAL_STATUTORY",
      "ingestedAt": "ISO-8601 Timestamp"
    },
    slaAndRules: 'Statutory 24-hour mandatory acknowledgment and automatic escalation to District Collector (DC).',
    securityProtocol: 'Mutual TLS (mTLS) with state data center, IP whitelisting, and HMAC signature verification.',
    statMetric: '318',
    statLabel: 'Ministerial Referrals Synced'
  },
  'unique-id-ai': {
    id: 'unique-id-ai',
    title: '3. Grievance Unique ID Generation & AI Clustering Engine',
    hindiTitle: '3. यूनिक ग्रीवांस आईडी एवं एआई क्लस्टरिंग',
    cpgramsEquivalent: 'Registration with details of Dept./Org. etc Generation of Grievance Unique ID',
    websiteComponent: 'SubmitProblemModal.tsx, CitizenDigitalPassModal.tsx, types.ts',
    summary: 'Core intelligence gateway. Issues cryptographic Grievance IDs (e.g., JH-RNC-2025-WTR-8821), runs NLP category classification, and groups identical complaints into Hotzones.',
    internalMechanism: [
      'Cryptographic ID Generator: `JH-[DISTRICT_CODE]-[YEAR]-[SECTOR_CODE]-[RANDOM_INT]` e.g. `JH-RNC-2025-WTR-8821`.',
      'Citizen Digital Pass creation with verifiable QR Code and NFC pass compatibility.',
      'Spatial Deduplication: Groups duplicate reports within 500m radius into an Active Cluster with child ticket linkage.'
    ],
    algorithmOrAiModel: 'Gemini 2.5 Flash / DistilBERT text embeddings + Haversine Geospatial 500m clustering for civic complaint deduplication.',
    dataSchema: {
      "ticketId": "JH-RNC-2025-WTR-8821",
      "category": "Drinking Water & Sanitation | Energy | Agri",
      "severity": "Critical | High | Moderate | Low",
      "clusterId": "CLUST-RNC-KOKAR-14",
      "duplicateCount": "18 Linked",
      "digitalPassQr": "Signed JWT with ticket claims"
    },
    slaAndRules: 'ID generated in <1.2 seconds; citizen receives confirmation SMS with ticket tracking URL immediately.',
    securityProtocol: 'Cryptographic SHA-256 QR code verification, ensuring tamper-proof on-field validation by local officials.',
    statMetric: '99.4%',
    statLabel: 'AI Classification Accuracy'
  },
  'transmission-pgo-lab': {
    id: 'transmission-pgo-lab',
    title: '4. Transmission to PGO, Command Center & University Labs',
    hindiTitle: '4. पीजीओ, कमान केंद्र एवं यूनिवर्सिटी लैब को प्रेषण',
    cpgramsEquivalent: 'Transmission of Grievance to PGO / Field Office',
    websiteComponent: 'CommandCenterScreen.tsx, DossierModal.tsx, ProjectsScreen.tsx',
    summary: 'Dual transmission path. While standard municipal complaints route to Department PGOs, complex engineering and technological challenges are paired with premier university R&D labs.',
    internalMechanism: [
      'Department Officer Command Center triage queue with severity filters and duplicate merging tools.',
      'University Lab Competency Matchmaker: Automatically matches problem semantics with accredited research labs (IIT ISM Dhanbad, BIT Mesra, NIT Jamshedpur, Birsa Agri, AIIMS Deoghar).',
      'District Innovation Fund (DIC) allocation: Automatic earmarking of prototype grants from ₹5 Lakhs to ₹22 Lakhs.'
    ],
    algorithmOrAiModel: 'Cosine Similarity matching between problem feature vectors and University Faculty/Lab patent & publication profiles.',
    dataSchema: {
      "assignedPgo": "Executive Engineer, Drinking Water Dept, Ranchi",
      "matchedLab": "BIT Mesra Environmental Engineering Cell",
      "aiFitScore": "94.8%",
      "grantPoolAllocated": "₹22,00,000",
      "sponsoringBody": "District Innovation Fund (DIC) & CSR Grant"
    },
    slaAndRules: 'Transmission completed within 48 hours of intake; automatic notification to Principal Investigator (PI).',
    securityProtocol: 'Role-Based Access Control (RBAC) separating Citizen, Department Officer, and Institution PI views.',
    statMetric: '142',
    statLabel: 'Accredited University R&D Labs Active'
  },
  'resolution-prototype': {
    id: 'resolution-prototype',
    title: '5. Resolution Pipeline & Rapid Prototype Deployment',
    hindiTitle: '5. निवारण पाइपलाइन एवं प्रोटोटाइप फील्ड पायलट',
    cpgramsEquivalent: 'Resolution (Ellipse node)',
    websiteComponent: 'ProjectsScreen.tsx, FieldImpactShowcase.tsx, DossierModal.tsx',
    summary: 'The core solution phase. Unlike routine paper filing, Jan Samadhan engineers physical prototypes, tests field pilots in rural blocks, and installs sustainable municipal remedies.',
    internalMechanism: [
      '4-Phase Milestone Tracking: Lab Proposal -> Prototype Engineering -> In-Situ Field Pilot -> Statewide Gazette Deployment.',
      'On-ground pilot testing by District Innovation Cell (DIC) Rapid Response Teams.',
      'Telemetry integration: Sensor data & IoT metrics (e.g. water arsenic level sensors, solar inverter telemetry) logged in real-time.'
    ],
    algorithmOrAiModel: 'Milestone Progress Tracker with automated penalty triggers for lagging R&D milestones.',
    dataSchema: {
      "stage": "Field Pilot | Prototype Dev | State Deploy",
      "pilotLocation": "Kokar Ward 14 & Namkum Block",
      "hardwareSpecs": "Graphene-Sand Nano Filtration Column (500L/hr)",
      "fieldAuditTimestamp": "2025-02-18T10:15:00Z",
      "sensorData": "{ arsenicPpm: 0.008, phLevel: 7.2 }"
    },
    slaAndRules: 'Must meet statutory test benchmarks; water/air solutions must pass State Pollution Control Board standards.',
    securityProtocol: 'Cryptographic Geo-Audit stamped with latitude, longitude, and satellite telemetry timestamp.',
    statMetric: '48',
    statLabel: 'Active Field Pilots in Progress'
  },
  'sla-clock': {
    id: 'sla-clock',
    title: '5A. Statutory SLA Resolution Clock (45 Days / 21 Days)',
    hindiTitle: '5A. सांविधिक समय सीमा (45 दिन / 21 दिन)',
    cpgramsEquivalent: 'Resolution Time: 21 days (Clock Icon)',
    websiteComponent: 'SlaTimelineTracker.tsx, CommandCenterScreen.tsx',
    summary: 'Statutory countdown enforcement. Traditional administrative grievances must be solved in 21 days; university hardware prototype solutions have a statutory 45-day SLA.',
    internalMechanism: [
      'Real-time SLA countdown clock visible to citizen, department officer, and university lab.',
      'Quartile performance classification: Top Quartile (<30 days), Target SLA (30-45 days), Review Flag (>45 days).',
      'Auto-escalation warning dispatched at Day 14 and Day 35 to the Special Secretary (Science & Tech) if progress slows.'
    ],
    algorithmOrAiModel: 'Predictive Turnaround Estimator calculating expected resolution date based on historical district performance.',
    dataSchema: {
      "slaTotalDays": "45 Days (Prototypes) / 21 Days (Admin)",
      "daysRemaining": "18 Days Left",
      "slaStatus": "Target SLA | Review Flag | Top Quartile",
      "turnaroundBenchmark": "Jharkhand Right to Service Act 2011"
    },
    slaAndRules: 'Statutory deadline enforced under Jharkhand Public Service Delivery Guarantee Act.',
    securityProtocol: 'Immutable audit log; officers cannot arbitrarily reset the SLA clock without Chief Secretary sign-off.',
    statMetric: '38.4',
    statLabel: 'Avg. State Turnaround Days (Target: 45)'
  },
  'atr-notification': {
    id: 'atr-notification',
    title: '6. Action Taken Report (ATR) via SMS, WhatsApp & Digital Pass',
    hindiTitle: '6. एटीआर रिपोर्ट (एसएमएस, व्हाट्सएप एवं डिजिटल पास)',
    cpgramsEquivalent: 'ATR to citizen through SMS/Email (Envelope Icon)',
    websiteComponent: 'VernacularAudioDossier.tsx, CitizenDigitalPassModal.tsx',
    summary: 'Transparent closure notification sent directly to citizen. Contains full ATR document, before/after satellite photos, and recorded vernacular audio explanation.',
    internalMechanism: [
      'Automated SMS & WhatsApp dispatch with one-click direct access to the digital Action Taken Report.',
      'Vernacular Audio Dossier: Synthesizes or plays voice summary of the technical solution in the citizen’s spoken dialect.',
      'Citizen Digital Pass is updated with green "RESOLVED" badge and downloadable PDF certification.'
    ],
    algorithmOrAiModel: 'Text-to-Speech (TTS) voice generation in Santhali, Ho, Nagpuri, and Hindi with regional dialect modulation.',
    dataSchema: {
      "atrId": "ATR-JH-2025-8821",
      "dispatchChannels": "SMS, WhatsApp, AppNotification, VoiceIVR",
      "beforePhotoUrl": "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6",
      "afterPhotoUrl": "https://images.unsplash.com/photo-1584467735815-f778f274e296",
      "officerSignedHash": "ECDSA_SIGNATURE_OFFICER_RNC"
    },
    slaAndRules: 'ATR dispatched within 2 hours of field pilot sign-off.',
    securityProtocol: 'Digital signatures by Executive Engineer and Academic Lab Director with verification hash.',
    statMetric: '98.2%',
    statLabel: 'ATR Delivery Success Rate'
  },
  'feedback-loop': {
    id: 'feedback-loop',
    title: '7. Citizen Feedback & Ground-Truth Verification',
    hindiTitle: '7. नागरिक फीडबैक एवं जमीनी सत्यापन',
    cpgramsEquivalent: 'Feedback (Thumbs Up / Thumbs Down Icon)',
    websiteComponent: 'HomeScreen.tsx (Public Verified Feedback), ImpactGraphScreen.tsx',
    summary: 'The ultimate reality check. The citizen inspects the solution on the ground and submits their 1-5 star rating and recorded satisfaction testimony.',
    internalMechanism: [
      'Citizen provides 1 to 5 star rating, thumbs up/down, and optional voice verification.',
      'Community ground-truth validation: Neighboring citizens in the same ward or panchayat can upvote or confirm the solution works.',
      'Verified citizen badge attached to prevent fraudulent administrative self-approvals.'
    ],
    algorithmOrAiModel: 'Sentiment Analysis on citizen vernacular voice feedback to detect genuine satisfaction vs masked dissatisfaction.',
    dataSchema: {
      "rating": "1 to 5 Stars",
      "satisfactionStatus": "SATISFIED | UNSATISFIED",
      "voiceTestimonyUrl": "Blob audio",
      "verifiedCitizen": "Verified",
      "communityUpvotes": "42 Upvotes"
    },
    slaAndRules: 'Citizen has 14 days to submit feedback. If no response after 3 reminders, provisional closure is reviewed by Ward Member.',
    securityProtocol: 'Geo-fencing check: feedback must originate within reasonable radius of the problem location.',
    statMetric: '4.82 / 5',
    statLabel: 'Citizen Satisfaction Score'
  },
  'satisfied-decision': {
    id: 'satisfied-decision',
    title: '8. Satisfied? Decision Gateway (Y / N)',
    hindiTitle: '8. संतुष्ट हैं? निर्णय द्वार (हाँ / नहीं)',
    cpgramsEquivalent: 'Satisfied (Diamond Decision Box with Y / N branches)',
    websiteComponent: 'App.tsx State Machine, CommandCenterScreen.tsx',
    summary: 'The pivotal governance fork. If the citizen is Satisfied (Y), the case proceeds to permanent Closure. If Unsatisfied (N), it automatically escalates to the Nodal Appellate Authority.',
    internalMechanism: [
      'Automated routing logic based on citizen satisfaction boolean.',
      'Branch Y (Yes): Triggers official case closure, updates State Heatmap solved counters, and awards academic innovation credit.',
      'Branch N (No): Locks case against administrative dismissal, flags red in District Collector dashboard, and re-routes to Appellate Authority.'
    ],
    algorithmOrAiModel: 'Automated Routing State Machine with zero human tampering tolerance.',
    dataSchema: {
      "satisfied": "Boolean (true / false)",
      "dissatisfactionReason": "Filtration clogged | Flow insufficient | Other",
      "escalationTier": "TIER_1_APPELLATE"
    },
    slaAndRules: 'Decision instantly propagates across all monitoring dashboards in real-time.',
    securityProtocol: 'Cryptographic immutable state change written to system audit trail.',
    statMetric: '91.6%',
    statLabel: 'First-Pass Citizen Satisfaction Rate'
  },
  'closure-gazette': {
    id: 'closure-gazette',
    title: '9. Official Closure & State Gazette Publication',
    hindiTitle: '9. आधिकारिक समाप्ति एवं राज्य गजट प्रकाशन',
    cpgramsEquivalent: 'Closure (Rectangle node)',
    websiteComponent: 'ProjectsScreen.tsx, HeatmapScreen.tsx, ImpactGraphScreen.tsx',
    summary: 'Permanent resolution archive. Case is marked Closed, added to the Public Innovation Impact Registry, and credited toward the participating University’s NIRF & State Research Ranking.',
    internalMechanism: [
      'Problem status updated to `State Deploy` and permanently indexed in the public searchable catalog.',
      'State Heatmap coordinates change from Critical Red to Solved Emerald Green.',
      'Academic lab receives formal State Gazette citation and patent licensing credits.'
    ],
    algorithmOrAiModel: 'University Performance Index calculation (aggregating SLA speed, satisfaction, and patent output).',
    dataSchema: {
      "finalStatus": "State Deploy (CLOSED)",
      "gazetteNotificationNumber": "JH-S&T-2025-RES-0491",
      "publicImpactMetrics": "{ livesBenefited: '14,200+', district: 'Ranchi' }",
      "closedAt": "ISO-8601 Timestamp"
    },
    slaAndRules: 'Final closure archived in National Informatics Centre (NIC) data lake.',
    securityProtocol: 'Official digital cryptographic sign-off by Special Secretary, Science & Technology.',
    statMetric: '312',
    statLabel: 'Solutions State Gazette Approved'
  },
  'appellate-authority': {
    id: 'appellate-authority',
    title: '10. Nodal Appellate Authority & Sub-Appellate Review',
    hindiTitle: '10. नोडल अपीलीय प्राधिकारी एवं समीक्षा',
    cpgramsEquivalent: 'Nodal Appellate Authority, Sub Appellate Auth. (Suit Avatar)',
    websiteComponent: 'DistrictDossierModal.tsx (Rapid Team Dispatch), CommandCenterScreen.tsx',
    summary: 'Statutory appellate tribunal. Presided over by the District Magistrate (DC) and Special Secretary of Higher & Technical Education to resolve rejected grievances.',
    internalMechanism: [
      'Case elevated to formal appellate docket with mandatory hearing within 7 business days.',
      'Power to order immediate re-engineering, sanction secondary matching grant, or deploy the Emergency Rapid Technical Team.',
      'Imposes accountability audits on delinquent departments or underperforming university research units.'
    ],
    algorithmOrAiModel: 'Root Cause Failure Diagnostic (analyzing whether failure was engineering, logistical, or departmental).',
    dataSchema: {
      "appealId": "APP-JH-2025-0042",
      "appellateAuthorityOfficer": "Special Secretary, Science & Tech & District Collector",
      "actionOrdered": "DISPATCH_RAPID_TEAM | REVISE_PROTOTYPE_SPEC | REALLOCATE_LAB",
      "secondaryGrantSanctioned": "₹5,00,000"
    },
    slaAndRules: 'Appellate hearing and action order strictly within 14 days of citizen appeal.',
    securityProtocol: 'Quasi-judicial order stamped with official government seal and unalterable digital signature.',
    statMetric: '100%',
    statLabel: 'Appeals Reviewed Within 14-Day Limit'
  },
  'final-resolution': {
    id: 'final-resolution',
    title: '11. Final Resolution & Citizen Redelivery',
    hindiTitle: '11. अंतिम समाधान एवं नागरिक को पुनः वितरण',
    cpgramsEquivalent: 'Final Resolution (Ellipse node looping back to Citizen)',
    websiteComponent: 'DistrictDossierModal.tsx, CitizenDigitalPassModal.tsx',
    summary: 'The ultimate closing loop. Following appellate interventions and rapid field adjustments, the revised solution is redelivered directly to the citizen with complete verification.',
    internalMechanism: [
      'Emergency Rapid Technical Team completes on-site modifications under direct supervision of the Sub-Divisional Magistrate (SDM).',
      'Revised ATR and secondary testing certification delivered to citizen in person and via SMS/WhatsApp.',
      'Full cycle closes directly back at the Citizen node, completing the complete accountability circle.'
    ],
    algorithmOrAiModel: 'Post-Appellate Quality Assurance Benchmark audit.',
    dataSchema: {
      "finalResolutionId": "FINAL-RES-JH-2025-8821",
      "supervisingOfficial": "Sub-Divisional Magistrate (SDM)",
      "redeliveryStatus": "VERIFIED_ON_SITE",
      "completedLoopBack": "Loop Complete"
    },
    slaAndRules: 'Final resolution must be certified on-site with photographic proof in the presence of the citizen.',
    securityProtocol: 'Biometric or OTP confirmation on the ground by the complainant citizen.',
    statMetric: '99.1%',
    statLabel: 'Final Resolution Success After Appeal'
  }
};

/* ========================================================================= */
/* CUSTOM REACT FLOW NODES - BEAUTIFULLY STYLED FOR CPGRAMS ARCHETYPE       */
/* ========================================================================= */

const CitizenCustomNode: React.FC<NodeProps> = ({ data, selected }) => {
  return (
    <div 
      className={`w-[270px] bg-white rounded-2xl p-4 border-2 transition-all shadow-xs relative ${
        selected ? 'border-amber-500 ring-4 ring-amber-400/30' : 'border-amber-400 hover:border-amber-500'
      }`}
    >
      <Handle type="target" position={Position.Left} id="final-in" style={{ top: '50%' }} className="w-2.5 h-2.5 !bg-slate-800 !border-2 !border-white !rounded-xs" />
      <Handle type="target" position={Position.Top} id="top-in" className="w-2.5 h-2.5 !bg-slate-800 !border-2 !border-white !rounded-xs" />
      <Handle type="target" position={Position.Bottom} id="atr-in" className="w-2.5 h-2.5 !bg-slate-800 !border-2 !border-white !rounded-xs" />
      <Handle type="source" position={Position.Right} id="out-direct" style={{ top: '35%' }} className="w-2.5 h-2.5 !bg-slate-800 !border-2 !border-white !rounded-xs" />
      <Handle type="source" position={Position.Right} id="out-portal" style={{ top: '75%' }} className="w-2.5 h-2.5 !bg-slate-800 !border-2 !border-white !rounded-xs" />

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 p-1 flex items-center justify-center shrink-0">
          <Users className="w-6 h-6 text-amber-700" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span>ORIGIN NODE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            </span>
          </div>
          <h3 className="text-sm font-extrabold text-slate-900 leading-tight mt-0.5">
            Citizen (नागरिक)
          </h3>
          <p className="text-[10px] font-medium text-slate-500">
            24 Districts • Multilingual Voice
          </p>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px]">
        <div className="bg-slate-50/80 p-1.5 rounded-lg text-slate-600">
          <span className="block font-bold text-slate-900">Offline Queue</span>
          <span className="text-[9px] text-slate-500">IndexedDB Sync</span>
        </div>
        <div className="bg-slate-50/80 p-1.5 rounded-lg text-slate-600">
          <span className="block font-bold text-slate-900">42,850+</span>
          <span className="text-[9px] text-slate-500">Registered</span>
        </div>
      </div>
    </div>
  );
};

const StandardProcessNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as any;
  const isSelected = selected;
  const isTransmissionNode = nodeData.id === 'transmission-pgo-lab';

  return (
    <div 
      className={`w-[280px] bg-white rounded-2xl p-3.5 border-2 transition-all shadow-xs relative ${
        isSelected 
          ? 'border-sky-500 ring-4 ring-sky-400/20' 
          : isTransmissionNode 
            ? 'border-sky-400 hover:border-sky-500' 
            : 'border-slate-700/80 hover:border-slate-900'
      }`}
    >
      <Handle type="target" position={Position.Left} id="left-in" style={{ top: '40%' }} className="w-2.5 h-2.5 !bg-slate-800 !border-2 !border-white !rounded-xs" />
      <Handle type="source" position={Position.Left} id="left-out" style={{ top: '65%' }} className="w-2.5 h-2.5 !bg-slate-800 !border-2 !border-white !rounded-xs" />
      <Handle type="target" position={Position.Right} id="right-in" style={{ top: '40%' }} className="w-2.5 h-2.5 !bg-slate-800 !border-2 !border-white !rounded-xs" />
      <Handle type="source" position={Position.Right} id="right-out" style={{ top: '65%' }} className="w-2.5 h-2.5 !bg-slate-800 !border-2 !border-white !rounded-xs" />
      <Handle type="target" position={Position.Top} id="top-in" className="w-2.5 h-2.5 !bg-slate-800 !border-2 !border-white !rounded-xs" />
      <Handle type="source" position={Position.Top} id="top-out" className="w-2.5 h-2.5 !bg-slate-800 !border-2 !border-white !rounded-xs" />
      <Handle type="target" position={Position.Bottom} id="bottom-in" className="w-2.5 h-2.5 !bg-slate-800 !border-2 !border-white !rounded-xs" />
      <Handle type="source" position={Position.Bottom} id="bottom-out" className="w-2.5 h-2.5 !bg-slate-800 !border-2 !border-white !rounded-xs" />

      <div className="flex items-start gap-2.5">
        <div className={`p-2 rounded-xl shrink-0 ${nodeData.iconBg || 'bg-sky-50 text-sky-700'}`}>
          {nodeData.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 truncate">
              {nodeData.badge || 'STAGE'}
            </span>
            {nodeData.metric && (
              <span className="text-[10px] font-extrabold bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded shrink-0">
                {nodeData.metric}
              </span>
            )}
          </div>
          <h3 className="text-xs font-bold text-slate-900 leading-snug mt-0.5 truncate">
            {nodeData.title}
          </h3>
          <p className="text-[10px] text-slate-500 mt-0.5 leading-tight line-clamp-2">
            {nodeData.subtitle}
          </p>
        </div>
      </div>

      {nodeData.footerText && (
        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-500 font-medium">
          <span className="truncate max-w-[170px]">{nodeData.footerText}</span>
          <span className="text-sky-700 font-bold flex items-center gap-0.5 shrink-0">
            Inspect <ArrowRight className="w-2.5 h-2.5" />
          </span>
        </div>
      )}
    </div>
  );
};

const DecisionDiamondNode: React.FC<NodeProps> = ({ data, selected }) => {
  return (
    <div 
      className={`w-[260px] bg-white rounded-2xl p-3.5 border-2 transition-all shadow-xs text-center relative ${
        selected ? 'border-indigo-600 ring-4 ring-indigo-400/20' : 'border-slate-700/80 hover:border-slate-900'
      }`}
    >
      <Handle type="target" position={Position.Left} id="left-in" className="w-2.5 h-2.5 !bg-slate-800 !border-2 !border-white !rounded-xs" />
      <Handle type="target" position={Position.Top} id="top-in" className="w-2.5 h-2.5 !bg-slate-800 !border-2 !border-white !rounded-xs" />
      <Handle type="source" position={Position.Right} id="yes" className="w-2.5 h-2.5 !bg-slate-800 !border-2 !border-white !rounded-xs" />
      <Handle type="source" position={Position.Bottom} id="no" className="w-2.5 h-2.5 !bg-slate-800 !border-2 !border-white !rounded-xs" />

      <div className="flex items-center justify-center gap-1.5 mb-1">
        <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">
          <HelpCircle className="w-3.5 h-3.5" />
        </div>
        <span className="text-[10px] font-black tracking-wider uppercase text-indigo-950">
          DECISION GATEWAY
        </span>
      </div>

      <h3 className="text-sm font-black text-slate-900">
        Satisfied? (संतुष्ट?)
      </h3>
      <p className="text-[10px] text-slate-500">
        Citizen Ground-Truth Verification
      </p>

      <div className="mt-2.5 grid grid-cols-2 gap-2 text-[10px] font-bold">
        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 py-1 rounded-lg flex items-center justify-center gap-1">
          <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px]">✓</span>
          <span>Closure</span>
        </div>
        <div className="bg-amber-50 text-amber-800 border border-amber-200 py-1 rounded-lg flex items-center justify-center gap-1">
          <span className="w-3.5 h-3.5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[9px]">N</span>
          <span>Appellate</span>
        </div>
      </div>
    </div>
  );
};

const ClockSlaNode: React.FC<NodeProps> = ({ data, selected }) => {
  return (
    <div 
      className={`w-[260px] bg-[#0c1322] text-white rounded-2xl p-3.5 border-2 transition-all shadow-md relative ${
        selected ? 'border-sky-400 ring-4 ring-sky-400/30' : 'border-slate-700 hover:border-slate-600'
      }`}
    >
      <Handle type="target" position={Position.Top} id="top-in" className="w-2.5 h-2.5 !bg-sky-400 !border-2 !border-slate-900 !rounded-xs" />
      <Handle type="source" position={Position.Left} id="left-out" className="w-2.5 h-2.5 !bg-sky-400 !border-2 !border-slate-900 !rounded-xs" />
      <Handle type="target" position={Position.Left} id="left-in" className="w-2.5 h-2.5 !bg-sky-400 !border-2 !border-slate-900 !rounded-xs" />
      <Handle type="source" position={Position.Bottom} id="bottom-out" className="w-2.5 h-2.5 !bg-sky-400 !border-2 !border-slate-900 !rounded-xs" />
      <Handle type="source" position={Position.Right} id="right-out" className="w-2.5 h-2.5 !bg-sky-400 !border-2 !border-slate-900 !rounded-xs" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-400 uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5 text-sky-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>STATUTORY SLA</span>
        </div>
        <span className="bg-sky-500/20 border border-sky-400/30 text-sky-300 text-[9px] font-bold px-2 py-0.5 rounded-full">
          Jharkhand Act
        </span>
      </div>

      <div className="mt-2.5 flex items-baseline justify-between">
        <div>
          <span className="text-2xl font-black text-white tracking-tight">45 Days</span>
          <span className="block text-[10px] text-slate-400">R&D Hardware Prototypes</span>
        </div>
        <div className="text-right">
          <span className="text-base font-bold text-amber-400">21 Days</span>
          <span className="block text-[10px] text-slate-400">Administrative</span>
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-300">
        <span>Avg State Speed:</span>
        <span className="font-bold text-emerald-400">38.4 Days</span>
      </div>
    </div>
  );
};

const nodeTypes = {
  citizenNode: CitizenCustomNode,
  standardNode: StandardProcessNode,
  decisionNode: DecisionDiamondNode,
  clockNode: ClockSlaNode
};

export const ProcessFlowScreen: React.FC<ProcessFlowScreenProps> = ({
  language = 'en',
  onNavigateTab,
  onOpenReportModal
}) => {
  const [activeViewMode, setActiveViewMode] = useState<'canvas' | 'diagram' | 'inspector' | 'comparison' | 'architecture'>('canvas');
  const [selectedNodeId, setSelectedNodeId] = useState<FlowNodeId>('citizen');
  
  // Simulator State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStepIndex, setSimulationStepIndex] = useState<number>(0);
  const [simulationSpeed, setSimulationSpeed] = useState<'normal' | 'fast'>('normal');

  // Simulation steps
  const simulationPath = useMemo(() => [
    { 
      nodeId: 'citizen' as FlowNodeId, 
      label: 'Step 1: Citizen Origin', 
      detail: 'Ranchi farmer reports deep borewell arsenic contamination in local Nagpuri dialect using voice recording.' 
    },
    { 
      nodeId: 'intake-registration' as FlowNodeId, 
      label: 'Step 2: Voice & GPS Intake', 
      detail: 'Whisper AI transcribes speech ("पानी में लाल रंग आवत बा"), extracts coordinates lat 23.34, lng 85.30.' 
    },
    { 
      nodeId: 'unique-id-ai' as FlowNodeId, 
      label: 'Step 3: Unique ID & Cluster', 
      detail: 'Generates ID JH-RNC-2025-WTR-8821. AI links with 18 other nearby complaints into Cluster CLUST-RNC-KOKAR.' 
    },
    { 
      nodeId: 'transmission-pgo-lab' as FlowNodeId, 
      label: 'Step 4: Lab Matching', 
      detail: 'Auto-matches with BIT Mesra Environmental Lab (94.8% fit). ₹22,00,000 District Innovation Fund earmarked.' 
    },
    { 
      nodeId: 'resolution-prototype' as FlowNodeId, 
      label: 'Step 5: Prototype & Field Pilot', 
      detail: 'BIT Mesra engineers Nano-Sand Arsenic Filter column; District Innovation Cell installs pilot in Kokar Ward 14.' 
    },
    { 
      nodeId: 'sla-clock' as FlowNodeId, 
      label: 'Step 5A: 45-Day SLA Check', 
      detail: 'Turnaround completed on Day 28, well within the statutory 45-day SLA deadline.' 
    },
    { 
      nodeId: 'atr-notification' as FlowNodeId, 
      label: 'Step 6: ATR to Citizen', 
      detail: 'SMS and WhatsApp dispatched with before/after water purity reports and vernacular voice explanation.' 
    },
    { 
      nodeId: 'feedback-loop' as FlowNodeId, 
      label: 'Step 7: Citizen Feedback', 
      detail: 'Citizen drinks clean filtered water, awards 5-star rating, and confirms in voice: "अब पानी एकदम साफ है".' 
    },
    { 
      nodeId: 'satisfied-decision' as FlowNodeId, 
      label: 'Step 8: Decision Gateway', 
      detail: 'Citizen voted SATISFIED (Y) -> branches directly to official Closure.' 
    },
    { 
      nodeId: 'closure-gazette' as FlowNodeId, 
      label: 'Step 9: State Gazette Closure', 
      detail: 'Case marked State Deploy (CLOSED). Solved count in Ranchi District Heatmap updated; BIT Mesra credited.' 
    },
    {
      nodeId: 'final-resolution' as FlowNodeId,
      label: 'Step 11: Final Resolution & Redelivery',
      detail: 'SDM certifies the on-site handoff. The updated citizen pass closes the accountability loop.'
    }
  ], []);

  // React Flow Nodes
  const initialNodes: Node[] = useMemo(() => [
    {
      id: 'citizen',
      type: 'citizenNode',
      position: { x: 80, y: 140 },
      data: { id: 'citizen' }
    },
    {
      id: 'intake-registration',
      type: 'standardNode',
      position: { x: 420, y: 20 },
      data: {
        id: 'intake-registration',
        title: 'One Time Registration & Login',
        subtitle: 'Mobile OTP • Vernacular Audio • GPS Auto-tag',
        badge: 'STAGE 2A',
        metric: '1,420/wk',
        footerText: 'SubmitProblemModal.tsx',
        icon: <Smartphone className="w-5 h-5 text-emerald-700" />,
        iconBg: 'bg-emerald-50 text-emerald-800'
      }
    },
    {
      id: 'portals-escalation',
      type: 'standardNode',
      position: { x: 420, y: 240 },
      data: {
        id: 'portals-escalation',
        title: 'Portals of President; PMO; CS',
        subtitle: 'Mukhyamantri Jan Samadhan & Hotline 181 Webhooks',
        badge: 'STAGE 2B',
        metric: '318 synced',
        footerText: 'VIP Statutory Queue',
        icon: <Monitor className="w-5 h-5 text-indigo-700" />,
        iconBg: 'bg-indigo-50 text-indigo-800'
      }
    },
    {
      id: 'unique-id-ai',
      type: 'standardNode',
      position: { x: 750, y: 20 },
      data: {
        id: 'unique-id-ai',
        title: 'Registration & Unique ID',
        subtitle: 'Cryptographic ID (JH-RNC-2025-WTR) + AI Cluster Engine',
        badge: 'STAGE 3',
        metric: '99.4% AI Acc',
        footerText: 'CitizenDigitalPassModal.tsx',
        icon: <FileText className="w-5 h-5 text-amber-700" />,
        iconBg: 'bg-amber-50 text-amber-800'
      }
    },
    {
      id: 'transmission-pgo-lab',
      type: 'standardNode',
      position: { x: 1080, y: 170 },
      data: {
        id: 'transmission-pgo-lab',
        title: 'Transmission to PGO & Labs',
        subtitle: 'Executive Engineers + Accredited R&D Labs (IIT/BIT/NIT)',
        badge: 'STAGE 4',
        metric: '142 Labs',
        footerText: 'CommandCenterScreen.tsx',
        icon: <Building2 className="w-5 h-5 text-sky-700" />,
        iconBg: 'bg-sky-50 text-sky-800'
      }
    },
    {
      id: 'sla-clock',
      type: 'clockNode',
      position: { x: 1080, y: 350 },
      data: { id: 'sla-clock' }
    },
    {
      id: 'resolution-prototype',
      type: 'standardNode',
      position: { x: 750, y: 350 },
      data: {
        id: 'resolution-prototype',
        title: 'Resolution (R&D Prototypes)',
        subtitle: 'Field Pilot Testing & Rapid Hardware Deployment in Wards',
        badge: 'STAGE 5',
        metric: '48 Active',
        footerText: 'ProjectsScreen.tsx',
        icon: <Zap className="w-5 h-5 text-violet-700" />,
        iconBg: 'bg-violet-50 text-violet-800'
      }
    },
    {
      id: 'atr-notification',
      type: 'standardNode',
      position: { x: 420, y: 420 },
      data: {
        id: 'atr-notification',
        title: 'ATR to Citizen (SMS/Email)',
        subtitle: 'WhatsApp • SMS • Vernacular Audio Voice Dossier',
        badge: 'STAGE 6',
        metric: '98.2% Deliv',
        footerText: 'VernacularAudioDossier.tsx',
        icon: <Mail className="w-5 h-5 text-amber-700" />,
        iconBg: 'bg-amber-50 text-amber-800'
      }
    },
    {
      id: 'feedback-loop',
      type: 'standardNode',
      position: { x: 80, y: 520 },
      data: {
        id: 'feedback-loop',
        title: 'Feedback (Ground-Truth)',
        subtitle: '1-5 Stars • Thumbs Up/Down • Neighbor Upvotes',
        badge: 'STAGE 7',
        metric: '4.82/5 Avg',
        footerText: 'HomeScreen.tsx Verified Feedback',
        icon: <ThumbsUp className="w-5 h-5 text-emerald-700" />,
        iconBg: 'bg-emerald-50 text-emerald-800'
      }
    },
    {
      id: 'satisfied-decision',
      type: 'decisionNode',
      position: { x: 420, y: 620 },
      data: { id: 'satisfied-decision' }
    },
    {
      id: 'closure-gazette',
      type: 'standardNode',
      position: { x: 750, y: 620 },
      data: {
        id: 'closure-gazette',
        title: 'Closure (State Gazette)',
        subtitle: 'Marked Solved • Green on Heatmap • NIRF Research Credit',
        badge: 'STAGE 9 (CLOSED)',
        metric: '312 Solved',
        footerText: 'Official State Archives',
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-700" />,
        iconBg: 'bg-emerald-100 text-emerald-900'
      }
    },
    {
      id: 'appellate-authority',
      type: 'standardNode',
      position: { x: 420, y: 840 },
      data: {
        id: 'appellate-authority',
        title: 'Nodal Appellate Authority',
        subtitle: 'Presided by District Collector (DC) & Special Secretary',
        badge: 'STAGE 10',
        metric: '14-Day Limit',
        footerText: 'Emergency Rapid Team Dispatch',
        icon: <UserCheck className="w-5 h-5 text-rose-700" />,
        iconBg: 'bg-rose-50 text-rose-800'
      }
    },
    {
      id: 'final-resolution',
      type: 'standardNode',
      position: { x: 80, y: 840 },
      data: {
        id: 'final-resolution',
        title: 'Final Resolution (Redelivery)',
        subtitle: 'On-site SDM certification & loop back to Citizen',
        badge: 'STAGE 11',
        metric: '99.1% Success',
        footerText: 'Closes directly back to Citizen',
        icon: <Award className="w-5 h-5 text-blue-700" />,
        iconBg: 'bg-blue-50 text-blue-800'
      }
    }
  ], []);

  // React Flow Edges matching CPGRAMS archetype reference image
  const initialEdges: Edge[] = useMemo(() => [
    // Citizen -> One Time Registration
    {
      id: 'e-cit-reg',
      source: 'citizen',
      sourceHandle: 'out-direct',
      target: 'intake-registration',
      targetHandle: 'left-in',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#0284c7', strokeWidth: 2, strokeDasharray: '4,4' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#0284c7', width: 14, height: 14 },
      label: 'Direct Channel',
      labelStyle: { fill: '#334155', fontWeight: 600, fontSize: 10 },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.95 },
      labelBgPadding: [6, 3],
      labelBgBorderRadius: 4
    },
    // Citizen -> Portals
    {
      id: 'e-cit-portals',
      source: 'citizen',
      sourceHandle: 'out-portal',
      target: 'portals-escalation',
      targetHandle: 'left-in',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#d97706', strokeWidth: 2, strokeDasharray: '4,4' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#d97706', width: 14, height: 14 },
      label: 'CMO / 181',
      labelStyle: { fill: '#334155', fontWeight: 600, fontSize: 10 },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.95 },
      labelBgPadding: [6, 3],
      labelBgBorderRadius: 4
    },
    // Reg -> Unique ID
    {
      id: 'e-reg-uid',
      source: 'intake-registration',
      sourceHandle: 'right-out',
      target: 'unique-id-ai',
      targetHandle: 'left-in',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#0284c7', strokeWidth: 2, strokeDasharray: '4,4' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#0284c7', width: 14, height: 14 }
    },
    // Unique ID -> Transmission
    {
      id: 'e-uid-trans',
      source: 'unique-id-ai',
      sourceHandle: 'right-out',
      target: 'transmission-pgo-lab',
      targetHandle: 'left-in',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#0284c7', strokeWidth: 2, strokeDasharray: '4,4' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#0284c7', width: 14, height: 14 }
    },
    // Portals -> Transmission
    {
      id: 'e-port-trans',
      source: 'portals-escalation',
      sourceHandle: 'right-out',
      target: 'transmission-pgo-lab',
      targetHandle: 'left-in',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#64748b', strokeWidth: 2, strokeDasharray: '4,4' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b', width: 14, height: 14 }
    },
    // Portals -> Resolution (Orange flow)
    {
      id: 'e-port-res',
      source: 'portals-escalation',
      sourceHandle: 'bottom-out',
      target: 'resolution-prototype',
      targetHandle: 'top-in',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#d97706', strokeWidth: 2, strokeDasharray: '4,4' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#d97706', width: 14, height: 14 }
    },
    // Transmission -> SLA Clock
    {
      id: 'e-trans-sla',
      source: 'transmission-pgo-lab',
      sourceHandle: 'bottom-out',
      target: 'sla-clock',
      targetHandle: 'top-in',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#0284c7', strokeWidth: 2, strokeDasharray: '4,4' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#0284c7', width: 14, height: 14 }
    },
    // SLA Clock -> Resolution
    {
      id: 'e-sla-res',
      source: 'sla-clock',
      sourceHandle: 'left-out',
      target: 'resolution-prototype',
      targetHandle: 'right-in',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#7c3aed', strokeWidth: 2, strokeDasharray: '4,4' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#7c3aed', width: 14, height: 14 },
      label: '45-Day SLA Pipeline',
      labelStyle: { fill: '#6d28d9', fontWeight: 600, fontSize: 10 },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.95 },
      labelBgPadding: [6, 3],
      labelBgBorderRadius: 4
    },
    // Resolution -> ATR Notification
    {
      id: 'e-res-atr',
      source: 'resolution-prototype',
      sourceHandle: 'left-out',
      target: 'atr-notification',
      targetHandle: 'right-in',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#d97706', strokeWidth: 2, strokeDasharray: '4,4' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#d97706', width: 14, height: 14 },
      label: 'ATR Report',
      labelStyle: { fill: '#b45309', fontWeight: 600, fontSize: 10 },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.95 },
      labelBgPadding: [6, 3],
      labelBgBorderRadius: 4
    },
    // Resolution -> Feedback loop
    {
      id: 'e-res-fb',
      source: 'resolution-prototype',
      sourceHandle: 'bottom-out',
      target: 'feedback-loop',
      targetHandle: 'right-in',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#7c3aed', strokeWidth: 1.8, strokeDasharray: '4,4' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#7c3aed', width: 14, height: 14 }
    },
    // ATR -> Feedback Loop
    {
      id: 'e-atr-fb',
      source: 'atr-notification',
      sourceHandle: 'left-out',
      target: 'feedback-loop',
      targetHandle: 'top-in',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#059669', strokeWidth: 2, strokeDasharray: '4,4' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#059669', width: 14, height: 14 }
    },
    // Feedback -> Satisfied Decision
    {
      id: 'e-fb-dec',
      source: 'feedback-loop',
      sourceHandle: 'right-out',
      target: 'satisfied-decision',
      targetHandle: 'left-in',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#2563eb', strokeWidth: 2, strokeDasharray: '4,4' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#2563eb', width: 14, height: 14 }
    },
    // Satisfied (Y) -> Closure
    {
      id: 'e-dec-close',
      source: 'satisfied-decision',
      sourceHandle: 'yes',
      target: 'closure-gazette',
      targetHandle: 'left-in',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#059669', strokeWidth: 2.5, strokeDasharray: '4,4' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#059669', width: 14, height: 14 },
      label: 'Y (Satisfied)',
      labelStyle: { fill: '#047857', fontWeight: 700, fontSize: 10 },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.95 },
      labelBgPadding: [6, 3],
      labelBgBorderRadius: 4
    },
    // Satisfied (N) -> Appellate Authority
    {
      id: 'e-dec-appeal',
      source: 'satisfied-decision',
      sourceHandle: 'no',
      target: 'appellate-authority',
      targetHandle: 'top-in',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#dc2626', strokeWidth: 2, strokeDasharray: '4,4' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#dc2626', width: 14, height: 14 },
      label: 'N (Rejected)',
      labelStyle: { fill: '#b91c1c', fontWeight: 700, fontSize: 10 },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.95 },
      labelBgPadding: [6, 3],
      labelBgBorderRadius: 4
    },
    // Appellate Authority -> Final Resolution
    {
      id: 'e-appeal-final',
      source: 'appellate-authority',
      sourceHandle: 'left-out',
      target: 'final-resolution',
      targetHandle: 'right-in',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#2563eb', strokeWidth: 2, strokeDasharray: '4,4' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#2563eb', width: 14, height: 14 },
      label: 'Rapid Re-engineering',
      labelStyle: { fill: '#1d4ed8', fontWeight: 600, fontSize: 10 },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.95 },
      labelBgPadding: [6, 3],
      labelBgBorderRadius: 4
    },
    // Final Resolution -> Citizen (Full closing circle!)
    {
      id: 'e-final-cit',
      source: 'final-resolution',
      sourceHandle: 'left-out',
      target: 'citizen',
      targetHandle: 'final-in',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#2563eb', strokeWidth: 2, strokeDasharray: '4,4' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#2563eb', width: 14, height: 14 }
    }
  ], []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const advanceSimulation = useCallback((nextIndex?: number) => {
    const nextStep = nextIndex ?? Math.min(simulationStepIndex + 1, simulationPath.length - 1);
    const nextNode = simulationPath[nextStep].nodeId;
    setSimulationStepIndex(nextStep);
    setSelectedNodeId(nextNode);
    setNodes((nds: Node[]) => nds.map((node) => ({ ...node, selected: node.id === nextNode })));
    if (nextNode === 'closure-gazette' || nextNode === 'final-resolution') {
      confetti({ particleCount: 100, spread: 75, origin: { y: 0.58 } });
    }
    if (nextStep === simulationPath.length - 1) setIsSimulating(false);
  }, [simulationPath, simulationStepIndex, setNodes]);

  // Keep edges in sync whenever initialEdges changes (e.g. during dev HMR)
  useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  // Sync selected node with React Flow node selection
  const onNodeClick = useCallback((_: any, node: Node) => {
    if (node.id in FLOW_NODES_DATA) {
      setSelectedNodeId(node.id as FlowNodeId);
    }
  }, []);

  // Simulator runner
  useEffect(() => {
    let timer: any;
    if (isSimulating) {
      const intervalMs = simulationSpeed === 'normal' ? 2400 : 1200;
      timer = setInterval(() => {
        setSimulationStepIndex((prev) => {
          if (prev >= simulationPath.length - 1) {
            setIsSimulating(false);
            return prev;
          }
          advanceSimulation(prev + 1);
          return prev + 1;
        });
      }, intervalMs);
    }
    return () => clearInterval(timer);
  }, [isSimulating, simulationSpeed, simulationPath, advanceSimulation]);

  const handleStartSimulation = () => {
    advanceSimulation(0);
    setIsSimulating(true);
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setSimulationStepIndex(0);
    setSelectedNodeId('citizen');
    setNodes((nds: Node[]) => 
      nds.map((n: Node) => ({
        ...n,
        selected: n.id === 'citizen'
      }))
    );
  };

  const activeNodeId = simulationPath[simulationStepIndex].nodeId;
  const activeEdgeIds = new Set(
    edges
      .filter((edge) => edge.source === activeNodeId || edge.target === activeNodeId)
      .map((edge) => edge.id)
  );
  const displayEdges = edges.map((edge) => ({
    ...edge,
    animated: edge.animated || activeEdgeIds.has(edge.id),
    style: activeEdgeIds.has(edge.id)
      ? { ...edge.style, stroke: '#f59e0b', strokeWidth: 3, strokeDasharray: '7 4' }
      : edge.style
  }));

  const selectedNode = FLOW_NODES_DATA[selectedNodeId];

  return (
    <div className="w-full bg-[#f8fafc] text-slate-900 pb-20">
      {/* Official State Emblem & Header Banner */}
      <div className="bg-gradient-to-r from-[#071a2b] via-[#0f2e4a] to-[#071a2b] text-white border-b border-sky-800/40 px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 flex items-center justify-center shadow-md">
              <div className="w-full h-full bg-[#071a2b] rounded-[10px] flex items-center justify-center">
                <Layers className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  {language === 'hi' ? 'झारखण्ड सरकार • समग्र आंतरिक कार्यप्रणाली' : 'GOVERNMENT OF JHARKHAND • CIVIC INNOVATION CELL'}
                </span>
                <span className="bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  CPGRAMS 2.0 INTERACTIVE ENGINE
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-0.5">
                {language === 'hi' ? 'जन समाधान: समग्र आंतरिक प्रक्रिया प्रवाह एवं कार्यप्रणाली' : 'JAN SAMADHAN PROCESS FLOW & INTERNAL WORKINGS'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
                High-fidelity, interactive visualization of every node, pipeline, AI model, and decision pathway in the platform — built with React Flow, styled to the CPGRAMS schematic, and deeply integrated with university R&D prototyping.
              </p>
            </div>
          </div>

          {/* Quick Simulation Trigger & Controls */}
          <div className="flex items-center gap-2.5 shrink-0 bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/15">
            {!isSimulating ? (
              <button
                onClick={handleStartSimulation}
                id="btn-start-simulation"
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Simulate Grievance Journey</span>
              </button>
            ) : (
              <button
                onClick={() => setIsSimulating(false)}
                id="btn-pause-simulation"
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause Simulation</span>
              </button>
            )}
            <button
              onClick={() => advanceSimulation()}
              id="btn-step-simulation"
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer"
              title="Advance one simulation stage"
            >
              <ChevronRight className="w-4 h-4" />
              <span>Step</span>
            </button>
            <button
              onClick={() => setSimulationSpeed((speed) => speed === 'normal' ? 'fast' : 'normal')}
              className="px-2 py-2 text-[10px] font-bold text-slate-200 border border-white/15 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              title="Toggle simulation speed"
            >
              {simulationSpeed === 'normal' ? '1×' : '2×'}
            </button>
            <button
              onClick={handleResetSimulation}
              id="btn-reset-simulation"
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              title="Reset Simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation & Mode Selector Tabs */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-8 sticky top-32 sm:top-28 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 py-2.5">
          {/* Main View Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveViewMode('canvas')}
              id="view-tab-canvas"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeViewMode === 'canvas'
                  ? 'bg-sky-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Interactive Flow Canvas (React Flow)</span>
            </button>

            <button
              onClick={() => setActiveViewMode('diagram')}
              id="view-tab-diagram"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeViewMode === 'diagram'
                  ? 'bg-sky-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>CPGRAMS Schematic Blueprint</span>
            </button>

            <button
              onClick={() => setActiveViewMode('inspector')}
              id="view-tab-inspector"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeViewMode === 'inspector'
                  ? 'bg-sky-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Deep Node Inspector ({Object.keys(FLOW_NODES_DATA).length} Modules)</span>
            </button>

            <button
              onClick={() => setActiveViewMode('comparison')}
              id="view-tab-comparison"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeViewMode === 'comparison'
                  ? 'bg-sky-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>CPGRAMS vs Jan Samadhan</span>
            </button>

            <button
              onClick={() => setActiveViewMode('architecture')}
              id="view-tab-architecture"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeViewMode === 'architecture'
                  ? 'bg-sky-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Architecture & State Machine</span>
            </button>
          </div>

          {/* Jump directly to Live Components */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider hidden lg:inline">
              Live Website Modules:
            </span>
            <button
              onClick={() => onNavigateTab('home')}
              className="text-[11px] font-bold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-2.5 py-1.5 rounded-md transition-colors cursor-pointer"
            >
              Citizen Portal
            </button>
            <button
              onClick={() => onNavigateTab('challenges')}
              className="text-[11px] font-bold text-indigo-800 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-2.5 py-1.5 rounded-md transition-colors cursor-pointer"
            >
              Command Center
            </button>
            <button
              onClick={() => onNavigateTab('state-heatmap')}
              className="text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1.5 rounded-md transition-colors cursor-pointer"
            >
              State Heatmap
            </button>
          </div>
        </div>
      </div>

      {/* Simulator Live Ticker Bar (When Active) */}
      {isSimulating && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 sm:px-8 py-3 animate-in fade-in duration-300">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Simulating Live Grievance: {simulationPath[simulationStepIndex].label}
              </span>
              <span className="text-xs text-amber-800 font-medium">
                {simulationPath[simulationStepIndex].detail}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-amber-700 font-semibold">
                Step {simulationStepIndex + 1} of {simulationPath.length}
              </span>
              <div className="w-24 h-2 bg-amber-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-600 transition-all duration-300"
                  style={{ width: `${((simulationStepIndex + 1) / simulationPath.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-6">
        {/* ========================================================================= */}
        {/* VIEW 1: REACT FLOW INTERACTIVE NODE CANVAS                                */}
        {/* ========================================================================= */}
        {activeViewMode === 'canvas' && (
          <div className="space-y-6">
            {/* Control & Guide Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-50 text-sky-700">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>Interactive Node-Based Process Canvas</span>
                    <span className="bg-sky-100 text-sky-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      POWERED BY REACT FLOW
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Zoom, pan, and click any node to explore its internal state. Drag nodes to customize layout. Use the MiniMap or controls on the bottom-left to navigate.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const nextIndex = (simulationStepIndex + 1) % simulationPath.length;
                    setSimulationStepIndex(nextIndex);
                    const nId = simulationPath[nextIndex].nodeId;
                    setSelectedNodeId(nId);
                    setNodes((nds: Node[]) => nds.map((n: Node) => ({ ...n, selected: n.id === nId })));
                  }}
                  className="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveViewMode('inspector')}
                  className="text-xs font-bold bg-sky-900 hover:bg-sky-800 text-white px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Inspect Selected Node</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* REACT FLOW CANVAS CONTAINER */}
            <div className="w-full h-[720px] bg-slate-900/5 rounded-3xl border-2 border-slate-300 shadow-sm relative overflow-hidden">
              <ReactFlow
                nodes={nodes}
                edges={displayEdges.length > 0 ? displayEdges : initialEdges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                minZoom={0.3}
                maxZoom={1.8}
                defaultEdgeOptions={{
                  type: 'smoothstep',
                  animated: true
                }}
              >
                <Background variant={BackgroundVariant.Dots} gap={20} size={1.5} color="#94a3b8" />
                <Controls className="bg-white! border-slate-200! shadow-lg! rounded-xl!" />
                <MiniMap 
                  nodeColor={(n: Node) => {
                    if (n.id === 'citizen') return '#f59e0b';
                    if (n.id === 'satisfied-decision') return '#6366f1';
                    if (n.id === 'closure-gazette') return '#10b981';
                    if (n.id === 'appellate-authority') return '#ef4444';
                    return '#0284c7';
                  }}
                  className="bg-white/90! backdrop-blur-md! border-slate-200! rounded-2xl! shadow-lg!"
                />
                
                {/* Floating Canvas Legend Panel */}
                <Panel position="top-right" className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-3.5 shadow-lg text-xs space-y-2 max-w-xs">
                  <div className="font-extrabold text-slate-900 border-b border-slate-100 pb-1 flex items-center justify-between">
                    <span>Active Selected Node</span>
                    <span className="text-[10px] text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded font-bold">
                      {selectedNode.statMetric}
                    </span>
                  </div>
                  <div className="font-bold text-sky-900 leading-tight">
                    {selectedNode.title}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                    {selectedNode.summary}
                  </p>
                  <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">CPGRAMS Match:</span>
                    <span className="font-semibold text-slate-700 truncate max-w-[150px]">
                      {selectedNode.cpgramsEquivalent}
                    </span>
                  </div>
                </Panel>

                {/* Simulation Control Overlay Panel */}
                <Panel position="top-left" className="bg-slate-900/90 backdrop-blur-md text-white border border-slate-700 rounded-2xl p-3.5 shadow-xl text-xs flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      LIFECYCLE STATUS
                    </span>
                    <span className="font-extrabold text-white text-xs">
                      {simulationPath[simulationStepIndex].label}
                    </span>
                  </div>
                  <div className="h-6 w-px bg-slate-700 mx-1" />
                  <span className="text-[11px] text-sky-300 font-semibold max-w-xs truncate hidden sm:inline">
                    {simulationPath[simulationStepIndex].detail}
                  </span>
                </Panel>
              </ReactFlow>
            </div>

            {/* Quick Summary Card of Currently Selected Node */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 flex items-center justify-center shrink-0">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                      Selected Module
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-semibold text-slate-500">
                      Component: {selectedNode.websiteComponent}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mt-0.5">
                    {selectedNode.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                    {selectedNode.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right pr-3 border-r border-slate-200">
                  <div className="text-xl font-black text-slate-900">{selectedNode.statMetric}</div>
                  <div className="text-[10px] font-semibold text-slate-500">{selectedNode.statLabel}</div>
                </div>
                <button
                  onClick={() => setActiveViewMode('inspector')}
                  className="bg-sky-900 hover:bg-sky-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Full Technical Deep-Dive
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: CPGRAMS EXACT SCHEMATIC BLUEPRINT (SVG Flowchart Layout)          */}
        {/* ========================================================================= */}
        {activeViewMode === 'diagram' && (
          <div className="space-y-6">
            <div className="bg-white border-2 border-slate-300 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-x-auto">
              <div className="text-center pb-8 border-b border-slate-100 mb-8">
                <h2 className="text-2xl sm:text-3xl font-black text-[#0f2e4a] tracking-tight uppercase">
                  CPGRAMS PROCESS FLOW
                </h2>
                <div className="w-24 h-1 bg-sky-600 mx-auto mt-2 rounded-full" />
                <p className="text-xs text-slate-500 mt-2 font-medium">
                  Direct structural mapping of the Central Grievance Process Flow with Jharkhand Grassroots Technical Innovation Pipeline
                </p>
              </div>

              {/* FLOW DIAGRAM GRID */}
              <div className="min-w-[980px] py-4 relative">
                {/* SVG Connectors Background Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 620" preserveAspectRatio="none" style={{ display: 'block' }}>
                  <defs>
                    <marker id="process-flow-arrowhead" viewBox="0 0 12 9" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="9" refX="12" refY="4.5" orient="auto" overflow="visible">
                      <path d="M 0 0 L 12 4.5 L 0 9 Z" fill="#1e293b" />
                    </marker>
                  </defs>

                  {/* 1. Citizen -> One Time Registration (Top Route) */}
                  <line x1="140" y1="90" x2="260" y2="90" stroke="#1e293b" strokeWidth="2.5" markerEnd="url(#process-flow-arrowhead)" />

                  {/* 1B. Citizen -> Portals of President/PMO (Side Route) */}
                  <path d="M 120 120 L 120 190 L 220 190" fill="none" stroke="#1e293b" strokeWidth="2.5" markerEnd="url(#process-flow-arrowhead)" />

                  {/* 2. One Time Registration -> Generation of Grievance Unique ID */}
                  <line x1="440" y1="90" x2="490" y2="90" stroke="#1e293b" strokeWidth="2.5" markerEnd="url(#process-flow-arrowhead)" />

                  {/* 3. Unique ID -> Transmission to PGO / Field Office */}
                  <path d="M 680 90 L 780 90 L 780 130" fill="none" stroke="#1e293b" strokeWidth="2.5" markerEnd="url(#process-flow-arrowhead)" />

                  {/* 3B. Portals -> Transmission to PGO */}
                  <line x1="430" y1="190" x2="710" y2="190" stroke="#1e293b" strokeWidth="2.5" markerEnd="url(#process-flow-arrowhead)" />

                  {/* 4. Transmission to PGO -> Drop down and turn left to Resolution */}
                  <path d="M 780 230 L 780 340 L 590 340" fill="none" stroke="#1e293b" strokeWidth="2.5" markerEnd="url(#process-flow-arrowhead)" />

                  {/* 5. Resolution -> ATR to Citizen */}
                  <path d="M 450 330 L 370 330 L 370 290 L 370 290" fill="none" stroke="#1e293b" strokeWidth="2.5" />
                  <path d="M 210 270 L 135 270 L 135 150" fill="none" stroke="#1e293b" strokeWidth="2.5" markerEnd="url(#process-flow-arrowhead)" />

                  {/* 6. Citizen -> Feedback */}
                  <path d="M 105 150 L 105 450 L 140 450" fill="none" stroke="#1e293b" strokeWidth="2.5" markerEnd="url(#process-flow-arrowhead)" />

                  {/* 7. Resolution -> Feedback */}
                  <path d="M 450 350 L 220 350 L 220 420" fill="none" stroke="#1e293b" strokeWidth="2.5" markerEnd="url(#process-flow-arrowhead)" />

                  {/* 8. Feedback -> Satisfied Diamond */}
                  <line x1="260" y1="450" x2="310" y2="450" stroke="#1e293b" strokeWidth="2.5" markerEnd="url(#process-flow-arrowhead)" />

                  {/* 9. Satisfied -> Y -> Closure */}
                  <line x1="440" y1="450" x2="490" y2="450" stroke="#1e293b" strokeWidth="2.5" markerEnd="url(#process-flow-arrowhead)" />

                  {/* 10. Satisfied -> N -> Nodal Appellate Authority */}
                  <path d="M 375 495 L 375 540" fill="none" stroke="#1e293b" strokeWidth="2.5" markerEnd="url(#process-flow-arrowhead)" />

                  {/* 11. Nodal Appellate Authority -> Final Resolution */}
                  <line x1="280" y1="585" x2="220" y2="585" stroke="#1e293b" strokeWidth="2.5" markerEnd="url(#process-flow-arrowhead)" />

                  {/* 12. Final Resolution -> Loops back all the way up to Citizen! */}
                  <path d="M 80 585 L 75 585 L 75 145" fill="none" stroke="#1e293b" strokeWidth="2.5" markerEnd="url(#process-flow-arrowhead)" />
                </svg>

                {/* ROW 1: TOP FLOW */}
                <div className="relative z-10 flex items-start gap-12">
                  <div
                    onClick={() => { setSelectedNodeId('citizen'); setActiveViewMode('inspector'); }}
                    className="w-36 flex flex-col items-center text-center cursor-pointer transition-all hover:scale-105"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 border-2 border-amber-500 flex items-center justify-center shadow-md">
                      <Users className="w-8 h-8 text-amber-900" />
                    </div>
                    <span className="font-extrabold text-sm text-slate-900 mt-2 block">
                      Citizen
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold">
                      (नागरिक / ग्रामीण)
                    </span>
                  </div>

                  <div
                    onClick={() => { setSelectedNodeId('intake-registration'); setActiveViewMode('inspector'); }}
                    className="w-44 bg-white border-2 border-slate-900 rounded-2xl p-3.5 shadow-sm cursor-pointer transition-all hover:border-sky-700 text-center"
                  >
                    <div className="text-xs font-bold text-slate-900">
                      One Time Registration & Login
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      OTP Mobile • Vernacular Audio • GPS Auto-tag
                    </div>
                  </div>

                  <div
                    onClick={() => { setSelectedNodeId('unique-id-ai'); setActiveViewMode('inspector'); }}
                    className="w-48 bg-white border-2 border-slate-900 rounded-2xl p-3.5 shadow-sm cursor-pointer transition-all hover:border-sky-700 text-center"
                  >
                    <div className="text-xs font-bold text-slate-900 leading-snug">
                      Registration with details of Dept./Org etc
                    </div>
                    <div className="text-[11px] font-extrabold text-sky-800 mt-1 bg-sky-100 rounded py-0.5">
                      Generation of Grievance Unique ID
                    </div>
                    <div className="text-[9px] text-slate-500 mt-1">
                      (e.g., JH-RNC-2025-WTR-8821)
                    </div>
                  </div>
                </div>

                {/* ROW 2: SIDE ROUTE (PORTALS) & TRANSMISSION */}
                <div className="relative z-10 flex items-center gap-12 mt-8 pl-28">
                  <div
                    onClick={() => { setSelectedNodeId('portals-escalation'); setActiveViewMode('inspector'); }}
                    className="w-52 bg-white border-2 border-slate-900 rounded-2xl p-3 shadow-sm cursor-pointer transition-all hover:border-sky-700 flex items-center gap-2.5"
                  >
                    <div className="p-1.5 bg-slate-100 rounded-lg shrink-0">
                      <Monitor className="w-5 h-5 text-slate-800" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900 leading-tight">
                        Portals of President Secretariat; PMO; CS
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Mukhyamantri Jan Samadhan & 181
                      </div>
                    </div>
                  </div>

                  <div className="flex-1" />

                  <div
                    onClick={() => { setSelectedNodeId('transmission-pgo-lab'); setActiveViewMode('inspector'); }}
                    className="w-48 bg-white border-2 border-slate-900 rounded-2xl p-3.5 shadow-sm cursor-pointer transition-all hover:border-sky-700 text-center"
                  >
                    <div className="text-xs font-bold text-slate-900">
                      Transmission of Grievance to PGO / Field Office
                    </div>
                    <div className="text-[10px] text-indigo-700 font-semibold mt-1">
                      + University R&D Labs (IIT/BIT/NIT)
                    </div>
                  </div>
                </div>

                {/* ROW 3: RESOLUTION & STATUTORY SLA CLOCK */}
                <div className="relative z-10 flex items-center justify-center gap-10 mt-16 pl-64">
                  <div
                    onClick={() => { setSelectedNodeId('resolution-prototype'); setActiveViewMode('inspector'); }}
                    className="w-36 h-20 bg-white border-2 border-slate-900 rounded-[50px] flex flex-col items-center justify-center cursor-pointer transition-all hover:border-sky-700 shadow-sm text-center px-2"
                  >
                    <div className="text-xs font-black text-slate-900">
                      Resolution
                    </div>
                    <div className="text-[9px] text-slate-500 font-medium">
                      (निवारण / प्रोटोटाइप)
                    </div>
                  </div>

                  <div
                    onClick={() => { setSelectedNodeId('sla-clock'); setActiveViewMode('inspector'); }}
                    className="w-60 border-2 border-dashed border-slate-900 rounded-2xl p-3 bg-white/80 flex items-center justify-between cursor-pointer transition-all hover:border-sky-700 shadow-xs"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">Resolution Time</div>
                      <div className="text-xl font-extrabold text-slate-900 mt-0.5">
                        21 days <span className="text-[10px] font-normal text-slate-500">(45d R&D)</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-slate-900 flex items-center justify-center bg-amber-50">
                      <Clock className="w-6 h-6 text-slate-800" />
                    </div>
                  </div>
                </div>

                {/* ROW 4: ATR TO CITIZEN & FEEDBACK */}
                <div className="relative z-10 flex items-center gap-12 mt-10 pl-24">
                  <div
                    onClick={() => { setSelectedNodeId('feedback-loop'); setActiveViewMode('inspector'); }}
                    className="w-36 h-18 bg-white border-2 border-slate-900 rounded-[45px] flex items-center justify-center gap-2 cursor-pointer transition-all hover:border-sky-700 shadow-sm px-3"
                  >
                    <div className="flex gap-1 text-slate-800">
                      <ThumbsUp className="w-4 h-4" />
                      <ThumbsDown className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">
                      Feedback
                    </span>
                  </div>

                  <div
                    onClick={() => { setSelectedNodeId('atr-notification'); setActiveViewMode('inspector'); }}
                    className="w-52 bg-white border-2 border-slate-900 rounded-2xl p-3 cursor-pointer transition-all hover:border-sky-700 shadow-sm flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-amber-700" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 leading-snug">
                        ATR to citizen through SMS/Email
                      </div>
                      <div className="text-[9px] text-slate-500 mt-0.5">
                        + WhatsApp & Vernacular Voice
                      </div>
                    </div>
                  </div>

                  {/* DIAMOND DECISION NODE: SATISFIED */}
                  <div
                    onClick={() => { setSelectedNodeId('satisfied-decision'); setActiveViewMode('inspector'); }}
                    className="relative w-32 h-32 flex items-center justify-center cursor-pointer transition-all hover:scale-105"
                  >
                    <div className="absolute inset-2 bg-white border-2 border-slate-900 rotate-45 shadow-sm" />
                    <div className="relative z-10 text-center">
                      <span className="text-xs font-black text-slate-900 block">
                        Satisfied
                      </span>
                      <span className="text-[9px] text-slate-500 font-medium">
                        (संतुष्ट?)
                      </span>
                    </div>
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-slate-900 bg-emerald-50 text-emerald-900 font-bold text-xs flex items-center justify-center z-20">
                      Y
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border border-slate-900 bg-amber-50 text-amber-900 font-bold text-xs flex items-center justify-center z-20">
                      N
                    </div>
                  </div>

                  <div
                    onClick={() => { setSelectedNodeId('closure-gazette'); setActiveViewMode('inspector'); }}
                    className="w-32 bg-white border-2 border-slate-900 rounded-xl p-3 text-center cursor-pointer transition-all hover:border-sky-700 shadow-sm"
                  >
                    <span className="text-xs font-black text-slate-900 block">
                      Closure
                    </span>
                    <span className="text-[10px] text-slate-500">
                      (समाप्ति / गजट)
                    </span>
                  </div>
                </div>

                {/* ROW 5: APPELLATE AUTHORITY & FINAL RESOLUTION */}
                <div className="relative z-10 flex items-center gap-12 mt-14 pl-12">
                  <div
                    onClick={() => { setSelectedNodeId('final-resolution'); setActiveViewMode('inspector'); }}
                    className="w-36 h-18 bg-white border-2 border-slate-900 rounded-[45px] flex flex-col items-center justify-center cursor-pointer transition-all hover:border-sky-700 shadow-sm text-center px-2"
                  >
                    <span className="text-xs font-black text-slate-900">
                      Final Resolution
                    </span>
                    <span className="text-[9px] text-slate-500">
                      (लूप वापस नागरिक को)
                    </span>
                  </div>

                  <div
                    onClick={() => { setSelectedNodeId('appellate-authority'); setActiveViewMode('inspector'); }}
                    className="w-64 bg-white border-2 border-slate-900 rounded-2xl p-3 flex items-center gap-3 cursor-pointer transition-all hover:border-sky-700 shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center shrink-0">
                      <UserCheck className="w-5 h-5 text-slate-800" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 leading-tight">
                        Nodal Appellate Authority, Sub Appellate Auth.
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        DC & Special Secretary Tribunal
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: DEEP NODE INSPECTOR                                               */}
        {/* ========================================================================= */}
        {activeViewMode === 'inspector' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Node Selector Sidebar */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Select Workflow Node
                </span>
                <span className="text-xs font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-full">
                  {Object.keys(FLOW_NODES_DATA).length} Total
                </span>
              </div>

              <div className="space-y-1.5 max-h-[640px] overflow-y-auto pr-1">
                {Object.values(FLOW_NODES_DATA).map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-sky-900 text-white shadow-sm'
                          : 'hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {node.title}
                        </div>
                        <div className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-sky-200' : 'text-slate-500'}`}>
                          {node.cpgramsEquivalent}
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-sky-300' : 'text-slate-400'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Detailed Node Specifications */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                {/* Node Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full">
                        CPGRAMS EQUIVALENT
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">
                        {selectedNode.cpgramsEquivalent}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                      {selectedNode.title}
                    </h2>
                    <h3 className="text-sm font-semibold text-slate-500 mt-0.5">
                      {selectedNode.hindiTitle}
                    </h3>
                  </div>

                  <div className="text-left sm:text-right bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl">
                    <div className="text-2xl font-black text-sky-900">{selectedNode.statMetric}</div>
                    <div className="text-xs font-semibold text-slate-500">{selectedNode.statLabel}</div>
                  </div>
                </div>

                {/* Summary & Component Location */}
                <div className="mt-5 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Module Purpose & Overview
                    </h4>
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                      {selectedNode.summary}
                    </p>
                  </div>

                  <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-sky-900">
                      <Code2 className="w-4 h-4 text-sky-700" />
                      <span>Source Component Implementation:</span>
                      <code className="font-mono text-sky-800 bg-sky-100 px-2 py-0.5 rounded text-[11px]">
                        {selectedNode.websiteComponent}
                      </code>
                    </div>
                    <button
                      onClick={() => {
                        if (selectedNode.id === 'citizen' || selectedNode.id === 'intake-registration') onNavigateTab('home');
                        else if (selectedNode.id === 'transmission-pgo-lab' || selectedNode.id === 'sla-clock') onNavigateTab('challenges');
                        else if (selectedNode.id === 'resolution-prototype' || selectedNode.id === 'closure-gazette') onNavigateTab('projects');
                        else onNavigateTab('state-heatmap');
                      }}
                      className="text-xs font-bold text-sky-800 hover:text-sky-950 flex items-center gap-1 underline cursor-pointer"
                    >
                      Open Live Screen
                    </button>
                  </div>
                </div>

                {/* Internal Mechanism Deep Breakdown */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Internal Architectural Mechanics
                  </h4>
                  <div className="space-y-2">
                    {selectedNode.internalMechanism.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="w-5 h-5 rounded-full bg-sky-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Algorithms & Security Grid */}
                <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                      <Cpu className="w-4 h-4 text-indigo-600" />
                      <span>AI Model & Algorithmic Engine</span>
                    </div>
                    <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                      {selectedNode.algorithmOrAiModel}
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Security & Integrity Protocol</span>
                    </div>
                    <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                      {selectedNode.securityProtocol}
                    </p>
                  </div>
                </div>

                {/* Data Schema & Live JSON Payload */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5" />
                      <span>State Schema & Data Payload</span>
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">JSON Schema v2.4</span>
                  </div>
                  <pre className="bg-slate-900 text-sky-300 p-4 rounded-xl text-xs font-mono overflow-x-auto shadow-inner border border-slate-800 leading-relaxed">
                    {JSON.stringify(selectedNode.dataSchema, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 4: CPGRAMS VS JAN SAMADHAN COMPARISON MATRIX                         */}
        {/* ========================================================================= */}
        {activeViewMode === 'comparison' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full">
                ARCHITECTURAL EVOLUTION
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                Comparative Analysis: Central CPGRAMS vs Jan Samadhan
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
                How Jan Samadhan faithfully implements every single statutory node of CPGRAMS while augmenting it with AI deduplication, vernacular dialect processing, and university hardware R&D prototyping.
              </p>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-3.5">Workflow Dimension</th>
                    <th className="p-3.5">Standard CPGRAMS (Central Portal)</th>
                    <th className="p-3.5 bg-sky-50/80 text-sky-950">Jan Samadhan (Jharkhand Civic R&D)</th>
                    <th className="p-3.5">Internal Code Implementation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr className="hover:bg-slate-50/60">
                    <td className="p-3.5 font-bold text-slate-900">Intake Channels</td>
                    <td className="p-3.5">Web Portal form, CSC Pragya Kendras, Mobile App.</td>
                    <td className="p-3.5 bg-sky-50/40 font-semibold text-sky-900">
                      Text + Camera photo + Vernacular voice recordings in Santhali, Ho, Mundari, Khortha, Nagpuri & Offline Queue.
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-600">SubmitProblemModal.tsx, Whisper ASR</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60">
                    <td className="p-3.5 font-bold text-slate-900">Routing & Dispatch</td>
                    <td className="p-3.5">Manual routing by administrative clerk to Department PGO.</td>
                    <td className="p-3.5 bg-sky-50/40 font-semibold text-sky-900">
                      Dual-Routing: Administrative tickets to PGO + Engineering problems matched to 142 University R&D Labs with ₹22L Grant Pools.
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-600">CommandCenterScreen.tsx, DossierModal.tsx</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60">
                    <td className="p-3.5 font-bold text-slate-900">Deduplication</td>
                    <td className="p-3.5">Basic phone/email text search; high duplicate clutter.</td>
                    <td className="p-3.5 bg-sky-50/40 font-semibold text-sky-900">
                      Gemini 2.5 Flash semantic embeddings + Haversine 500m spatial clustering into Hotzones.
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-600">SimilarProblemsMap.tsx</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60">
                    <td className="p-3.5 font-bold text-slate-900">Resolution Nature</td>
                    <td className="p-3.5">Administrative compliance, contractor work orders, repairs.</td>
                    <td className="p-3.5 bg-sky-50/40 font-semibold text-sky-900">
                      Technological prototyping: Nano-sand filters, solar microgrids, biomass gasifiers, IoT telemetry.
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-600">ProjectsScreen.tsx, FieldImpactShowcase.tsx</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60">
                    <td className="p-3.5 font-bold text-slate-900">Statutory SLA</td>
                    <td className="p-3.5">Mandatory 21 days for administrative grievance disposal.</td>
                    <td className="p-3.5 bg-sky-50/40 font-semibold text-sky-900">
                      21 days for administrative + 45 days statutory milestone countdown for physical hardware field pilots.
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-600">SlaTimelineTracker.tsx</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60">
                    <td className="p-3.5 font-bold text-slate-900">Citizen Transparency</td>
                    <td className="p-3.5">PDF Action Taken Report (ATR) via SMS/Email.</td>
                    <td className="p-3.5 bg-sky-50/40 font-semibold text-sky-900">
                      Citizen Digital Pass with verifiable QR code + Vernacular Audio Dossier explaining ATR in mother tongue.
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-600">CitizenDigitalPassModal.tsx, VernacularAudioDossier.tsx</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60">
                    <td className="p-3.5 font-bold text-slate-900">Appellate System</td>
                    <td className="p-3.5">Nodal Appellate Authority within central ministry.</td>
                    <td className="p-3.5 bg-sky-50/40 font-semibold text-sky-900">
                      Nodal Appellate Authority + Emergency Rapid Technical Team dispatch with power to sanction secondary matching grants.
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-600">DistrictDossierModal.tsx</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 5: ARCHITECTURE & STATE MACHINE                                      */}
        {/* ========================================================================= */}
        {activeViewMode === 'architecture' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full">
                  FULL SYSTEM ARCHITECTURE
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  Jan Samadhan 8-State Finite State Machine (FSM)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
                  Formal deterministic state machine governing ticket transitions from citizen voice upload through prototype pilot and final State Gazette closure.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    step: '01',
                    name: 'INTAKE_PENDING',
                    trigger: 'Citizen voice / GPS submit',
                    action: 'Whisper transcribe & validate',
                    color: 'border-amber-500 text-amber-900 bg-amber-50'
                  },
                  {
                    step: '02',
                    name: 'CLUSTERED_ACTIVE',
                    trigger: 'Geospatial 500m scan',
                    action: 'Issue JH-RNC-2025-WTR-8821',
                    color: 'border-sky-500 text-sky-900 bg-sky-50'
                  },
                  {
                    step: '03',
                    name: 'LAB_MATCHED',
                    trigger: 'Cosine similarity vector match',
                    action: 'Earmark ₹22L DIC grant pool',
                    color: 'border-indigo-500 text-indigo-900 bg-indigo-50'
                  },
                  {
                    step: '04',
                    name: 'PROTOTYPE_DEV',
                    trigger: 'PI accepts assignment',
                    action: 'Bench engineering in university lab',
                    color: 'border-violet-500 text-violet-900 bg-violet-50'
                  },
                  {
                    step: '05',
                    name: 'FIELD_PILOT',
                    trigger: 'Prototype passes bench test',
                    action: 'In-situ pilot in Kokar Ward 14',
                    color: 'border-blue-500 text-blue-900 bg-blue-50'
                  },
                  {
                    step: '06',
                    name: 'ATR_DISPATCHED',
                    trigger: 'IoT sensor benchmark verified',
                    action: 'SMS, WhatsApp & Vernacular Dossier',
                    color: 'border-amber-500 text-amber-900 bg-amber-50'
                  },
                  {
                    step: '07',
                    name: 'CITIZEN_REVIEW',
                    trigger: 'Citizen drinks/tests remedy',
                    action: 'Decision Gateway: Satisfied (Y / N)',
                    color: 'border-emerald-500 text-emerald-900 bg-emerald-50'
                  },
                  {
                    step: '08',
                    name: 'STATE_DEPLOY',
                    trigger: 'Confirmed Satisfied (Y)',
                    action: 'Official State Gazette notification',
                    color: 'border-emerald-700 text-emerald-950 bg-emerald-100'
                  }
                ].map((st, i) => (
                  <div key={i} className={`p-4 rounded-2xl border-2 ${st.color} shadow-xs space-y-2`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black font-mono">{st.step}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">STATE</span>
                    </div>
                    <div className="font-extrabold text-sm tracking-tight">{st.name}</div>
                    <div className="text-[11px] font-medium opacity-80 pt-2 border-t border-current/20">
                      <strong>Trigger:</strong> {st.trigger}
                    </div>
                    <div className="text-[11px] font-medium opacity-80">
                      <strong>Action:</strong> {st.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
