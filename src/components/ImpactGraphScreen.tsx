import React, { useState } from 'react';

interface ImpactGraphScreenProps {
  onNavigateToProjects: () => void;
}

export const ImpactGraphScreen: React.FC<ImpactGraphScreenProps> = ({ onNavigateToProjects }) => {
  const [activeTab, setActiveTab] = useState<'flow' | 'trl' | 'helix'>('flow');

  return (
    <div className="w-full flex flex-col gap-space-lg py-space-md px-4 sm:px-8 max-w-[1720px] mx-auto">
      {/* Header */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container-high/40 flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-headline-lg">hub</span>
            <h1 className="font-headline-xl text-headline-xl text-primary font-bold">
              Statewide Innovation Impact & Triple-Helix Graph
            </h1>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Analyzing resource allocation, inter-departmental routing velocity, and societal ROI across Jharkhand.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('flow')}
            className={`px-3 py-1 rounded font-label-md text-label-md transition-all cursor-pointer ${
              activeTab === 'flow' ? 'bg-secondary text-on-secondary font-bold' : 'text-on-surface-variant'
            }`}
          >
            System Pipeline Flow
          </button>
          <button
            onClick={() => setActiveTab('helix')}
            className={`px-3 py-1 rounded font-label-md text-label-md transition-all cursor-pointer ${
              activeTab === 'helix' ? 'bg-secondary text-on-secondary font-bold' : 'text-on-surface-variant'
            }`}
          >
            Triple-Helix Matrix
          </button>
          <button
            onClick={() => setActiveTab('trl')}
            className={`px-3 py-1 rounded font-label-md text-label-md transition-all cursor-pointer ${
              activeTab === 'trl' ? 'bg-secondary text-on-secondary font-bold' : 'text-on-surface-variant'
            }`}
          >
            TRL Distribution
          </button>
        </div>
      </div>

      {/* 3 Impact Hero Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container-high/40 flex items-center justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
              Total Citizen Beneficiaries
            </span>
            <div className="font-numeric-metric text-numeric-metric font-bold text-primary my-0.5">
              3.2 Million
            </div>
            <span className="font-body-sm text-emerald-600 font-medium text-[12px]">
              Across 24 districts in 18 months
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <span className="material-symbols-outlined text-headline-md">groups</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container-high/40 flex items-center justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
              Public Co-Investment Ratio
            </span>
            <div className="font-numeric-metric text-numeric-metric font-bold text-secondary my-0.5">
              1 : 3.4
            </div>
            <span className="font-body-sm text-on-surface-variant text-[12px]">
              Every ₹1 state grant unlocks ₹3.40 in CSR
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-secondary-fixed text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-headline-md">pie_chart</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container-high/40 flex items-center justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
              Average Prototyping Cycle
            </span>
            <div className="font-numeric-metric text-numeric-metric font-bold text-primary my-0.5">
              45 Days
            </div>
            <span className="font-body-sm text-emerald-600 font-medium text-[12px]">
              -62% faster than conventional procurement
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center">
            <span className="material-symbols-outlined text-headline-md">bolt</span>
          </div>
        </div>
      </div>

      {/* Main Graph Visualization Container */}
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-xs border border-surface-container-high/40 flex flex-col gap-space-lg">
        {activeTab === 'flow' && (
          <div className="space-y-6">
            <div className="border-b border-surface-container pb-3">
              <h3 className="font-headline-md text-headline-md text-primary font-bold">
                End-to-End Civic Ingestion to Solution Flow
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Tracing volume conversion from raw citizen filings down to deployed state assets.
              </p>
            </div>

            {/* Sankey-style Visual Pipeline Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-surface-container-low p-4 rounded-xl border border-secondary/20 space-y-2">
                <span className="font-label-sm text-label-sm text-secondary font-bold uppercase">Node 1: Public Intake</span>
                <div className="font-headline-lg text-headline-lg font-bold text-primary">12,480 Tickets</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Voice memos in 5 tribal dialects, WhatsApp images, and District Help-desks.
                </p>
                <div className="w-full bg-secondary h-1.5 rounded-full mt-2"></div>
              </div>

              <div className="bg-surface-container-low p-4 rounded-xl border border-secondary/20 space-y-2">
                <span className="font-label-sm text-label-sm text-secondary font-bold uppercase">Node 2: Vector Deduplication</span>
                <div className="font-headline-lg text-headline-lg font-bold text-primary">3,842 Unified</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Clustered across 500m geographic radii; 68% redundant grievances filtered.
                </p>
                <div className="w-full bg-secondary h-1.5 rounded-full mt-2"></div>
              </div>

              <div className="bg-surface-container-low p-4 rounded-xl border border-secondary/20 space-y-2">
                <span className="font-label-sm text-label-sm text-secondary font-bold uppercase">Node 3: Lab Matching</span>
                <div className="font-headline-lg text-headline-lg font-bold text-primary">164 Active Labs</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Assigned to faculty PIs at BIT Mesra, IIT ISM, NIT Jamshedpur, etc.
                </p>
                <div className="w-full bg-secondary h-1.5 rounded-full mt-2"></div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 space-y-2">
                <span className="font-label-sm text-label-sm text-emerald-800 font-bold uppercase">Node 4: Ground Deploy</span>
                <div className="font-headline-lg text-headline-lg font-bold text-emerald-950">87 Verified Pilots</div>
                <p className="font-body-sm text-body-sm text-emerald-800">
                  Solar chillers, water filters, fly-ash roads, drone relays in 18 districts.
                </p>
                <div className="w-full bg-emerald-600 h-1.5 rounded-full mt-2"></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'helix' && (
          <div className="space-y-6">
            <div className="border-b border-surface-container pb-3">
              <h3 className="font-headline-md text-headline-md text-primary font-bold">
                Triple-Helix Ecosystem Governance
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Interlocking responsibilities across Government, Academia, and Industry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              <div className="bg-surface-container-low p-5 rounded-xl space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold">
                  GOV
                </div>
                <h4 className="font-headline-sm text-headline-sm font-bold text-primary">
                  1. Government of Jharkhand
                </h4>
                <ul className="font-body-sm text-body-sm text-on-surface-variant space-y-1.5 list-disc pl-4">
                  <li>Mandates statutory challenge intake</li>
                  <li>Fast-tracks testing permissions & municipal access</li>
                  <li>Matching seed grants via DIC fund</li>
                  <li>Guaranteed public procurement upon successful SLA</li>
                </ul>
              </div>

              <div className="bg-surface-container-low p-5 rounded-xl space-y-3">
                <div className="w-10 h-10 rounded-lg bg-secondary text-on-secondary flex items-center justify-center font-bold">
                  UNIV
                </div>
                <h4 className="font-headline-sm text-headline-sm font-bold text-primary">
                  2. Universities & Technical Labs
                </h4>
                <ul className="font-body-sm text-body-sm text-on-surface-variant space-y-1.5 list-disc pl-4">
                  <li>IIT (ISM), BIT Mesra, NIT Jamshedpur faculty PIs</li>
                  <li>Specialized test beds and sensor prototyping</li>
                  <li>Engineering student research stipends</li>
                  <li>Formal IP registration & technical auditing</li>
                </ul>
              </div>

              <div className="bg-surface-container-low p-5 rounded-xl space-y-3">
                <div className="w-10 h-10 rounded-lg bg-tertiary-fixed text-primary flex items-center justify-center font-bold">
                  IND
                </div>
                <h4 className="font-headline-sm text-headline-sm font-bold text-primary">
                  3. Industry & Corporate CSR
                </h4>
                <ul className="font-body-sm text-body-sm text-on-surface-variant space-y-1.5 list-disc pl-4">
                  <li>Tata Steel, BCCL, SAIL, CCL CSR capital matching</li>
                  <li>Commercial manufacturing & supply-chain rollout</li>
                  <li>Field telemetry maintenance contracts</li>
                  <li>100% Section 135 Companies Act tax deduction</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trl' && (
          <div className="space-y-6">
            <div className="border-b border-surface-container pb-3">
              <h3 className="font-headline-md text-headline-md text-primary font-bold">
                Technology Readiness Level (TRL) Breakdown
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Standardized ISO/NASA TRL metrics applied across all 164 projects in the portal.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { trl: 'TRL 1-3 (Basic Principles & Lab Feasibility)', count: 38, pct: '23%', color: 'bg-primary/60' },
                { trl: 'TRL 4-6 (Component Prototype in Simulated Environment)', count: 52, pct: '32%', color: 'bg-secondary' },
                { trl: 'TRL 7-8 (System Prototype in Operating Operational Environment)', count: 47, pct: '29%', color: 'bg-secondary-container' },
                { trl: 'TRL 9 (Actual System Proven in Full Operational Field Service)', count: 27, pct: '16%', color: 'bg-emerald-600' },
              ].map((row) => (
                <div key={row.trl} className="space-y-1">
                  <div className="flex items-center justify-between text-body-sm font-body-sm">
                    <span className="font-bold text-primary">{row.trl}</span>
                    <span className="font-semibold text-on-surface-variant">{row.count} Projects ({row.pct})</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${row.color}`} style={{ width: row.pct }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-surface-container flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Data verified by Directorate of Science & Technology, Government of Jharkhand
          </span>
          <button
            onClick={onNavigateToProjects}
            className="text-secondary font-label-md text-label-md font-bold hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>Explore all projects in the registry</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
