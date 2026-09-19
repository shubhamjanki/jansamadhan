import React, { useState } from 'react';

interface SlaTimelineTrackerProps {
  docketId: string;
  category?: string;
  district: string;
  block?: string;
  matchedLab?: string;
}

interface Milestone {
  phase: number;
  dayRange: string;
  title: string;
  status: 'completed' | 'active' | 'upcoming';
  dateEstimate: string;
  description: string;
  leadAssigned: string;
  deliverables: string[];
}

export const SlaTimelineTracker: React.FC<SlaTimelineTrackerProps> = ({
  docketId,
  category,
  district,
  block,
  matchedLab,
}) => {
  const [selectedPhase, setSelectedPhase] = useState<number>(2);

  const milestones: Milestone[] = [
    {
      phase: 1,
      dayRange: 'Day 0–5',
      title: 'AI Intake, Semantic Triage & State Verification',
      status: 'completed',
      dateEstimate: 'Completed on 19 Sep 2025',
      description: 'Grievance ingested into the statewide registry, image evidence extracted, 5 historical district clusters cross-referenced, and statutory SLA clocked.',
      leadAssigned: 'Jharkhand Innovation Council AI Engine',
      deliverables: [
        'Docket ID issued: ' + docketId,
        'Computer Vision Turbidity Spectrum Analyzed',
        'State Gazette Grant Pool Reserved (₹22,00,000)',
      ],
    },
    {
      phase: 2,
      dayRange: 'Day 6–15',
      title: 'University Scholar Dispatch & Field Sampling',
      status: 'active',
      dateEstimate: '22 Sep – 28 Sep 2025 (In Progress)',
      description: 'PhD Research scholars and field technicians travel to ' + (block || 'Namkum') + ' with portable spectrophotometers and water testing rigs to collect multi-depth aquifer samples.',
      leadAssigned: 'Dr. Ananya Mukherjee & 2 Senior Research Fellows (' + (matchedLab || 'BIT Mesra') + ')',
      deliverables: [
        'Multi-point heavy metal ICP-MS laboratory titration',
        'Direct consultation with Gram Pradhan & local women committee',
        'GPS geotagged groundwater depth logging',
      ],
    },
    {
      phase: 3,
      dayRange: 'Day 16–30',
      title: 'Low-Cost Prototype Design & Lab Fabrication',
      status: 'upcoming',
      dateEstimate: '29 Sep – 14 Oct 2025',
      description: 'University engineering workshops fabricate custom micro-filtration/remediation unit tailored to the chemical composition identified in field samples.',
      leadAssigned: 'Department Workshop & Rapid Prototyping Facility',
      deliverables: [
        'Clay-baked activated biochar filtration core assembled',
        'Zero-electricity gravity-fed flow rate optimization',
        'BIS 10500 Potable Water Safety Pre-Certification',
      ],
    },
    {
      phase: 4,
      dayRange: 'Day 31–40',
      title: 'Community Village Pilot & Real-World Validation',
      status: 'upcoming',
      dateEstimate: '15 Oct – 24 Oct 2025',
      description: 'Prototype unit installed at community borewell in ' + (block || 'locality') + '. 100 households test the water daily under scientific observation.',
      leadAssigned: 'District Innovation Cell (DIC) & University Field Unit',
      deliverables: [
        'Continuous 10-day water quality sensor telemetry',
        'Citizen satisfaction survey & taste evaluation score',
        'Local youth training for maintenance & filter replacement',
      ],
    },
    {
      phase: 5,
      dayRange: 'Day 39–41',
      title: 'Administration Handover & Scale-Up Sign-Off',
      status: 'upcoming',
      dateEstimate: '25 Oct – 29 Oct 2025',
      description: 'Final technical audit submitted to District Collector and Department of Higher & Technical Education for block-wide public works rollout.',
      leadAssigned: 'Deputy Commissioner & Vice Chancellor Joint Committee',
      deliverables: [
        'Final Technical Milestone Completion Certificate',
        'Disbursement of University R&D Grant Tranche 2',
        'Open-source blueprints uploaded to State Innovation Portal',
      ],
    },
  ];

  const activeMilestone = milestones.find((m) => m.phase === selectedPhase) || milestones[1];

  return (
    <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl border border-surface-container-high space-y-5">
      {/* Tracker Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-container-high pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-2xl">timeline</span>
            <h4 className="font-headline-md text-headline-md font-bold text-primary text-base sm:text-lg">
              Research Milestone & Field Resolution Tracker
            </h4>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Transparent Day-by-Day Roadmap from Citizen Filing to On-Ground University Delivery
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            Active Stage: Phase 2 of 5
          </span>
          <span className="font-mono text-xs font-bold text-secondary bg-surface-container px-2.5 py-1 rounded-xl">
            Day 3 of ~41
          </span>
        </div>
      </div>

      {/* Progress Bar & Phase Nodes */}
      <div className="pt-2">
        <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
          {milestones.map((m) => {
            const isCompleted = m.status === 'completed';
            const isActive = m.status === 'active';
            const isSelected = selectedPhase === m.phase;

            return (
              <button
                key={m.phase}
                type="button"
                onClick={() => setSelectedPhase(m.phase)}
                className={`text-left p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-surface-container border-secondary shadow-sm ring-2 ring-secondary/20'
                    : 'bg-surface-container-low border-surface-container-high hover:bg-surface-container hover:border-outline'
                }`}
              >
                {/* Status Dot */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] font-bold text-on-surface-variant">
                    {m.dayRange}
                  </span>
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
                  ) : isActive ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-surface-container-highest" />
                  )}
                </div>

                <div className="font-bold text-[11px] sm:text-xs text-primary truncate">
                  Phase {m.phase}
                </div>
                <div className="text-[10px] text-on-surface-variant truncate hidden sm:block">
                  {m.title.split(' ')[0]} {m.title.split(' ')[1]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Phase Deep Dive Card */}
      <div className="bg-surface-container-low p-4 sm:p-5 rounded-2xl border border-surface-container-high space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                activeMilestone.status === 'completed'
                  ? 'bg-emerald-100 text-emerald-800'
                  : activeMilestone.status === 'active'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {activeMilestone.dayRange} • {activeMilestone.status.toUpperCase()}
              </span>
              <span className="text-xs font-mono text-on-surface-variant">
                {activeMilestone.dateEstimate}
              </span>
            </div>
            <h5 className="font-bold text-sm sm:text-base text-primary mt-1">
              Phase {activeMilestone.phase}: {activeMilestone.title}
            </h5>
          </div>

          <div className="text-xs text-on-surface-variant font-medium sm:text-right">
            <span>Primary Custodian:</span>
            <span className="block font-bold text-primary">{activeMilestone.leadAssigned}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-on-surface leading-relaxed">
          {activeMilestone.description}
        </p>

        {/* Milestone Deliverables Checklist */}
        <div className="pt-2 border-t border-surface-container-high">
          <span className="text-[11px] font-bold text-primary uppercase tracking-wider block mb-2">
            Target Deliverables & Scientific Benchmarks:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {activeMilestone.deliverables.map((item, i) => (
              <div
                key={i}
                className="bg-surface-container-lowest p-2.5 rounded-xl border border-surface-container-high text-xs text-on-surface flex items-start gap-2"
              >
                <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0 mt-0.5">
                  check_box
                </span>
                <span className="leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
