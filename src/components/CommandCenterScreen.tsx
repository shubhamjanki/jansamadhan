import React, { useState } from 'react';
import { DistrictStat, InstitutionSLA, Language, QueueItem, SectorVolume } from '../types';
import { DISTRICT_STATS, INSTITUTIONS_SLA, INITIAL_QUEUE_ITEMS, SECTOR_VOLUMES } from '../data/mockData';

interface CommandCenterScreenProps {
  language: Language;
  onOpenDistrictDossier: (district: DistrictStat) => void;
  onOpenCabinetBriefing: () => void;
  onViewGeoAudit: () => void;
  onAuthorizeGazette: () => void;
  onSelectQueueItem: (item: QueueItem) => void;
  onNavigateToProjects: () => void;
}

export const CommandCenterScreen: React.FC<CommandCenterScreenProps> = ({
  language,
  onOpenDistrictDossier,
  onOpenCabinetBriefing,
  onViewGeoAudit,
  onAuthorizeGazette,
  onSelectQueueItem,
  onNavigateToProjects,
}) => {
  const [queueItems, setQueueItems] = useState<QueueItem[]>(INITIAL_QUEUE_ITEMS);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictStat>(DISTRICT_STATS[0]);
  const [heatmapCategory, setHeatmapCategory] = useState<'All' | 'Water' | 'Mining & Dust' | 'Agri'>('All');
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('24h');
  const [queueFilter, setQueueFilter] = useState<'All' | 'Critical' | 'High' | 'Moderate'>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApproveAndRoute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setQueueItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'approved' } : item))
    );
    const item = queueItems.find((q) => q.id === id);
    showToast(`✓ Ticket ${item?.refCode || id} approved & routed to ${item?.matchedInstitution}!`);
  };

  const handleMergeTicket = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setQueueItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'merged' } : item))
    );
    showToast(`✓ Ticket clustered & merged into regional master challenge.`);
  };

  const handleBatchDispatch = () => {
    setQueueItems((prev) =>
      prev.map((item) => (item.status === 'pending' ? { ...item, status: 'approved' } : item))
    );
    showToast(`✓ Batch of 14 tickets successfully dispatched to University PIs & Nodal Officers.`);
  };

  const pendingQueueCount = queueItems.filter((q) => q.status === 'pending').length;

  const filteredQueue = queueItems.filter((item) => {
    if (queueFilter === 'All') return true;
    return item.severity === queueFilter;
  });

  return (
    <div className="flex flex-col w-full bg-surface pb-space-xl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3 border border-tertiary-fixed/30 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <span className="material-symbols-outlined text-emerald-400 text-headline-sm">check_circle</span>
          <span className="font-label-md text-label-md">{toastMessage}</span>
        </div>
      )}

      {/* Command Center Masthead Sub-Bar */}
      <div className="w-full bg-surface-container-low border-b border-surface-container-high py-space-sm px-4 sm:px-8">
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-1 rounded-full shadow-xs border border-surface-container-high">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
                State Command Center: Live Pulse
              </span>
            </div>
            <span className="text-outline hidden sm:inline">•</span>
            <div className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-body-sm text-primary">badge</span>
              Duty Officer: <strong className="text-on-surface">Dr. A. K. Verma, IAS</strong> (Special Secretary, Science & Tech)
            </div>
            <span className="text-outline hidden sm:inline">•</span>
            <div className="font-label-sm text-label-sm bg-error-container text-on-error-container px-2.5 py-0.5 rounded-full font-bold">
              Queue Alert: {pendingQueueCount + 125} Pending Approvals
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenCabinetBriefing}
              className="bg-surface-container hover:bg-surface-container-high text-primary px-3 py-1.5 rounded-lg font-label-md text-label-md transition-colors flex items-center gap-1 cursor-pointer font-semibold shadow-xs"
            >
              <span className="material-symbols-outlined text-body-sm">description</span>
              Cabinet Briefing PDF
            </button>
            <button
              onClick={handleBatchDispatch}
              className="bg-secondary hover:bg-secondary/90 text-on-secondary px-3.5 py-1.5 rounded-lg font-label-md text-label-md transition-colors flex items-center gap-1 cursor-pointer font-bold shadow-xs"
            >
              <span className="material-symbols-outlined text-body-sm">send</span>
              Batch Dispatch (14)
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="w-full px-4 sm:px-8 pt-space-md flex flex-col gap-space-lg max-w-[1720px] mx-auto">
        {/* 6 Key Performance Metric Cards */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-space-sm">
          {/* Metric 1 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container-high/30 flex flex-col justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Citizen Intake
            </span>
            <div className="my-1">
              <div className="font-numeric-metric text-numeric-metric text-primary font-bold">12,480</div>
              <div className="font-body-sm text-body-sm text-emerald-600 flex items-center gap-0.5 font-medium">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span> +8.4% WoW
              </div>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">24 Dists Active</span>
          </div>

          {/* Metric 2 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container-high/30 flex flex-col justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Verified Scope
            </span>
            <div className="my-1">
              <div className="font-numeric-metric text-numeric-metric text-primary font-bold">3,842</div>
              <div className="font-body-sm text-body-sm text-secondary font-medium">30.8% Yield</div>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">Valid SLA 94%</span>
          </div>

          {/* Metric 3 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container-high/30 flex flex-col justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              AI Deduplication
            </span>
            <div className="my-1">
              <div className="font-numeric-metric text-numeric-metric text-primary font-bold">1,264</div>
              <div className="font-body-sm text-body-sm text-emerald-600 font-medium">7,374 Saved Hrs</div>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">v2.4 Core Model</span>
          </div>

          {/* Metric 4 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container-high/30 flex flex-col justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Active Pipeline
            </span>
            <div className="my-1">
              <div className="font-numeric-metric text-numeric-metric text-primary font-bold">164</div>
              <div className="font-body-sm text-body-sm text-secondary font-medium">₹14.8 Cr Allocated</div>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">DIC Direct Flow</span>
          </div>

          {/* Metric 5 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container-high/30 flex flex-col justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Field Grounded
            </span>
            <div className="my-1">
              <div className="font-numeric-metric text-numeric-metric text-primary font-bold">87</div>
              <div className="font-body-sm text-body-sm text-emerald-600 font-medium">3.2M Citizens</div>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">Impact Zone Reach</span>
          </div>

          {/* Metric 6 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container-high/30 flex flex-col justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Institutional Network
            </span>
            <div className="my-1">
              <div className="font-numeric-metric text-numeric-metric text-primary font-bold">42</div>
              <div className="font-body-sm text-body-sm text-primary font-medium">IIT/NIT/BIT/Central</div>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">100% MoUs Active</span>
          </div>
        </section>

        {/* 8-stage Challenge-to-Solution Governance Lifecycle Tracker */}
        <section className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs border border-surface-container-high/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-space-sm">
            <div>
              <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider block">
                Statutory Governance Lifecycle
              </span>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                Statewide Challenge-to-Solution Pipeline Tracker
              </h3>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Active Phase Velocity: <strong>72% on schedule</strong>
            </span>
          </div>

          {/* Horizontal Stepper Grid */}
          <div className="overflow-x-auto pb-1">
            <div className="min-w-[1080px] grid grid-cols-8 gap-2">
              {/* S1 */}
              <div className="bg-surface-container-low p-2.5 rounded-lg border-t-2 border-secondary">
                <div className="flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant">
                  <span>STAGE 01</span>
                  <span className="text-secondary font-bold">100%</span>
                </div>
                <div className="font-headline-sm text-headline-sm text-primary font-bold mt-1 text-[13px]">Reported</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">12,480 Entries</div>
              </div>

              {/* S2 */}
              <div className="bg-surface-container-low p-2.5 rounded-lg border-t-2 border-secondary">
                <div className="flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant">
                  <span>STAGE 02</span>
                  <span className="text-secondary font-bold">100%</span>
                </div>
                <div className="font-headline-sm text-headline-sm text-primary font-bold mt-1 text-[13px]">AI Classified</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">Vector Deduplicated</div>
              </div>

              {/* S3 */}
              <div className="bg-surface-container-low p-2.5 rounded-lg border-t-2 border-secondary">
                <div className="flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant">
                  <span>STAGE 03</span>
                  <span className="text-secondary font-bold">100%</span>
                </div>
                <div className="font-headline-sm text-headline-sm text-primary font-bold mt-1 text-[13px]">Dept Validated</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">3,842 Official Challenges</div>
              </div>

              {/* S4 */}
              <div className="bg-surface-container-low p-2.5 rounded-lg border-t-2 border-secondary">
                <div className="flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant">
                  <span>STAGE 04</span>
                  <span className="text-secondary font-bold">100%</span>
                </div>
                <div className="font-headline-sm text-headline-sm text-primary font-bold mt-1 text-[13px]">Institution Matched</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">42 Labs Assigned</div>
              </div>

              {/* S5 */}
              <div className="bg-surface-container-low p-2.5 rounded-lg border-t-2 border-secondary">
                <div className="flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant">
                  <span>STAGE 05</span>
                  <span className="text-secondary font-bold">100%</span>
                </div>
                <div className="font-headline-sm text-headline-sm text-primary font-bold mt-1 text-[13px]">Proposal Submit</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">Financial Clearances</div>
              </div>

              {/* S6 */}
              <div className="bg-blue-50 p-2.5 rounded-lg border-t-2 border-secondary ring-1 ring-secondary/20">
                <div className="flex items-center justify-between text-label-sm font-label-sm text-secondary">
                  <span className="font-bold">STAGE 06</span>
                  <span className="font-bold animate-pulse">72%</span>
                </div>
                <div className="font-headline-sm text-headline-sm text-primary font-bold mt-1 text-[13px]">Prototype Dev</div>
                <div className="font-body-sm text-body-sm text-secondary font-medium text-[11px]">164 Active Labs</div>
              </div>

              {/* S7 */}
              <div className="bg-surface-container-low p-2.5 rounded-lg border-t-2 border-outline-variant">
                <div className="flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant">
                  <span>STAGE 07</span>
                  <span className="text-outline">Pending</span>
                </div>
                <div className="font-headline-sm text-headline-sm text-primary font-bold mt-1 text-[13px]">Field Pilot</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">18 Districts Staged</div>
              </div>

              {/* S8 */}
              <div className="bg-emerald-50 p-2.5 rounded-lg border-t-2 border-emerald-600">
                <div className="flex items-center justify-between text-label-sm font-label-sm text-emerald-800">
                  <span className="font-bold">STAGE 08</span>
                  <span className="font-bold">87 Live</span>
                </div>
                <div className="font-headline-sm text-headline-sm text-emerald-950 font-bold mt-1 text-[13px]">State Deploy</div>
                <div className="font-body-sm text-body-sm text-emerald-700 text-[11px]">Full Scale Rollout</div>
              </div>
            </div>
          </div>
        </section>

        {/* Dual Column Analytics & Action Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
          {/* Left Column: Jharkhand District Problem Heatmap (Span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs border border-surface-container-high/30 flex flex-col gap-space-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-headline-md">satellite_alt</span>
                    <h3 className="font-headline-md text-headline-md text-primary font-bold">
                      Jharkhand District Problem Heatmap
                    </h3>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Spatial Density of Citizen Issue Filings & Groundwater / Mining Anomalies
                  </span>
                </div>
                <div className="flex items-center gap-1 text-label-sm font-label-sm bg-surface-container px-2 py-1 rounded">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-semibold text-primary">Live GIS Synced</span>
                </div>
              </div>

              {/* Telemetry Bar & Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-surface-container">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {(['All', 'Water', 'Mining & Dust', 'Agri'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setHeatmapCategory(cat)}
                      className={`px-2.5 py-1 rounded font-label-sm text-label-sm transition-colors cursor-pointer ${
                        heatmapCategory === cat
                          ? 'bg-secondary text-on-secondary font-bold shadow-xs'
                          : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1 font-label-sm text-label-sm">
                  <span className="text-on-surface-variant mr-1">Timeframe:</span>
                  {(['24h', '7d', '30d'] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-2 py-0.5 rounded uppercase ${
                        timeframe === tf
                          ? 'bg-primary text-on-primary font-bold'
                          : 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                  <button
                    onClick={() => showToast('GeoJSON export generated for Jharkhand State Remote Sensing Center.')}
                    className="ml-2 text-secondary hover:text-primary transition-colors flex items-center gap-0.5 cursor-pointer font-bold"
                    title="Export Shapefile / GeoJSON"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>SHP</span>
                  </button>
                </div>
              </div>

              {/* Visual Heatmap Canvas with Hotspot Pins */}
              <div
                className="w-full h-80 sm:h-96 rounded-lg bg-cover bg-center relative overflow-hidden flex items-end p-3 shadow-inner border border-surface-container-high/40"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAoz1EKD4qf_f8OON_jVvvCjBMgYt8YkZsku7G85AWoCtmtmo1p_4gO6LY-WpSu-b8lMkhjXuwbDxX04pkmKuGnypQ377oUT9mPb14eHS_ko77nM_swwMGczVSkIsp5xAp6R8V1MmlUpMmEBrVefJ65utUAYI-3kcFpnXgw61HOv3PCtoMKlJo8lk6cbcX8hNhptpV45T0rR4AAFsl1LUsLCvhcG0tfI2fVFGXbP2zk32x9tmArQRy2gA')"
                }}
              >
                <div className="absolute inset-0 bg-primary/25 backdrop-brightness-95 pointer-events-none"></div>

                {/* Hotspot Pins on Districts */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Ranchi Pin */}
                  <div
                    onClick={() => setSelectedDistrict(DISTRICT_STATS[0])}
                    className="absolute top-[48%] left-[45%] pointer-events-auto cursor-pointer group"
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-error opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-error text-white text-[9px] font-bold items-center justify-center ring-2 ring-white">
                        1
                      </span>
                    </div>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-20">
                      Ranchi (2,840 alerts)
                    </span>
                  </div>

                  {/* Dhanbad Pin */}
                  <div
                    onClick={() => setSelectedDistrict(DISTRICT_STATS[1])}
                    className="absolute top-[45%] left-[62%] pointer-events-auto cursor-pointer group"
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-error opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-error text-white text-[9px] font-bold items-center justify-center ring-2 ring-white">
                        2
                      </span>
                    </div>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-20">
                      Dhanbad (2,190 alerts)
                    </span>
                  </div>

                  {/* East Singhbhum Pin */}
                  <div
                    onClick={() => setSelectedDistrict(DISTRICT_STATS[2])}
                    className="absolute top-[72%] left-[68%] pointer-events-auto cursor-pointer group"
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-white text-[9px] font-bold items-center justify-center ring-2 ring-white">
                        3
                      </span>
                    </div>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-20">
                      East Singhbhum (1,620)
                    </span>
                  </div>

                  {/* Bokaro Pin */}
                  <div
                    onClick={() => setSelectedDistrict(DISTRICT_STATS[3])}
                    className="absolute top-[40%] left-[54%] pointer-events-auto cursor-pointer group"
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-white text-[9px] font-bold items-center justify-center ring-2 ring-white">
                        4
                      </span>
                    </div>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-20">
                      Bokaro (1,140)
                    </span>
                  </div>

                  {/* Deoghar Pin */}
                  <div
                    onClick={() => setSelectedDistrict(DISTRICT_STATS[5])}
                    className="absolute top-[26%] left-[66%] pointer-events-auto cursor-pointer group"
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500 text-white text-[9px] font-bold items-center justify-center ring-1 ring-white">
                        6
                      </span>
                    </div>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-20">
                      Deoghar (890)
                    </span>
                  </div>
                </div>

                {/* Heatmap Overlay Sub-card */}
                <div className="relative z-10 w-full bg-surface-container-lowest/90 backdrop-blur-md p-3 rounded-lg flex flex-wrap items-center justify-between gap-2 shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-error animate-ping"></span>
                    <span className="font-label-sm text-label-sm font-bold text-primary">
                      Selected: {selectedDistrict.name} District
                    </span>
                    <span className="bg-error-container text-on-error-container font-label-sm text-[10px] px-1.5 py-0.5 rounded font-bold">
                      {selectedDistrict.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                      {selectedDistrict.alerts.toLocaleString()} Civic Complaints
                    </span>
                    <button
                      onClick={() => onOpenDistrictDossier(selectedDistrict)}
                      className="bg-primary text-on-primary text-label-sm font-label-sm px-2.5 py-1 rounded hover:bg-primary/90 transition-colors cursor-pointer font-semibold"
                    >
                      District Dossier
                    </button>
                  </div>
                </div>
              </div>

              {/* Selected District Details Card */}
              <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm border border-surface-container-high/40">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-headline-sm text-headline-sm text-primary font-bold">
                      {selectedDistrict.name} District Dossier
                    </h4>
                    <span className="text-label-sm font-label-sm bg-surface-container-highest text-primary px-2 py-0.5 rounded">
                      Rank #{selectedDistrict.rank}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Anchor R&D Institution: <strong>{selectedDistrict.anchorLab}</strong> • SLA Resolution Rate: <strong>{selectedDistrict.slaRate}%</strong>
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => showToast(`Emergency response deployed to ${selectedDistrict.name} District Innovation Cell.`)}
                    className="bg-secondary text-on-secondary px-3 py-1.5 rounded font-label-md text-label-md hover:bg-secondary/90 transition-colors cursor-pointer font-bold shadow-xs"
                  >
                    Deploy Rapid Response
                  </button>
                  <button
                    onClick={() => onOpenDistrictDossier(selectedDistrict)}
                    className="bg-surface-container-highest hover:bg-surface-container-high text-primary px-3 py-1.5 rounded font-label-md text-label-md transition-colors cursor-pointer font-semibold"
                  >
                    View All {selectedDistrict.blocksCount} Blocks
                  </button>
                </div>
              </div>

              {/* District Severity Ranking Table */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                    District Severity Ranking (Top 5 / 24)
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold cursor-pointer hover:underline" onClick={() => onOpenDistrictDossier(selectedDistrict)}>
                    View All 24 Districts
                  </span>
                </div>
                <div className="space-y-1.5">
                  {DISTRICT_STATS.slice(0, 5).map((dist) => {
                    const isSelected = selectedDistrict.name === dist.name;
                    return (
                      <div
                        key={dist.name}
                        onClick={() => setSelectedDistrict(dist)}
                        className={`flex items-center justify-between p-2.5 rounded-lg transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50 ring-1 ring-secondary/30'
                            : 'bg-surface-container-low hover:bg-surface-container'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] ${
                            dist.rank <= 2 ? 'bg-error text-white' : 'bg-surface-container-high text-primary'
                          }`}>
                            {dist.rank}
                          </span>
                          <span className="font-label-md text-label-md font-bold text-primary">
                            {dist.name} District
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-label-sm font-label-sm">
                          <span className="text-on-surface-variant hidden sm:inline">
                            {dist.activeClusters} Active Clusters
                          </span>
                          <span className="font-bold text-primary">
                            {dist.alerts.toLocaleString()} alerts
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            dist.status === 'Critical'
                              ? 'bg-error-container text-on-error-container'
                              : 'bg-amber-100 text-amber-900'
                          }`}>
                            {dist.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: AI Moderation & Validation Queue (Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs border border-surface-container-high/30 flex flex-col gap-space-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-headline-md">psychology</span>
                    <h3 className="font-headline-md text-headline-md text-primary font-bold">
                      AI Moderation & Validation Queue
                    </h3>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px] mt-0.5">
                    Real-time automated issue classification and capability routing awaiting departmental nod.
                  </p>
                </div>
                <span className="bg-surface-container-high text-primary font-label-sm text-label-sm px-2.5 py-1 rounded-full font-bold self-start sm:self-auto">
                  {queueItems.filter((q) => q.status === 'pending').length} Actionable
                </span>
              </div>

              {/* Filter Chips */}
              <div className="flex items-center gap-1.5 pt-1 border-t border-surface-container">
                <span className="font-label-sm text-label-sm text-on-surface-variant mr-1">Filter:</span>
                {(['All', 'Critical', 'High', 'Moderate'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setQueueFilter(filter)}
                    className={`px-2.5 py-0.5 rounded font-label-sm text-label-sm transition-colors cursor-pointer ${
                      queueFilter === filter
                        ? 'bg-primary text-on-primary font-bold'
                        : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Actionable Queue Worklist */}
              <div className="space-y-space-sm mt-1">
                {filteredQueue.map((item) => {
                  const isApproved = item.status === 'approved';
                  const isMerged = item.status === 'merged';

                  return (
                    <div
                      key={item.id}
                      onClick={() => onSelectQueueItem(item)}
                      className={`p-space-md rounded-xl transition-all border flex flex-col gap-3 cursor-pointer ${
                        isApproved
                          ? 'bg-emerald-50/70 border-emerald-200'
                          : isMerged
                          ? 'bg-surface-container-low border-surface-container-high opacity-70'
                          : 'bg-surface-container-lowest border-surface-container-high/40 hover:border-secondary/40 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-label-sm text-[11px] text-on-surface-variant font-mono">
                              {item.refCode}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.severity === 'Critical'
                                ? 'bg-error-container text-on-error-container'
                                : item.severity === 'High'
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-blue-100 text-blue-900'
                            }`}>
                              {item.severity}
                            </span>
                            <span className="bg-surface-container text-on-surface-variant px-1.5 py-0.5 rounded text-[10px] font-semibold">
                              {item.citizenReportsCount} Citiz. Reports
                            </span>
                          </div>
                          <h4 className="font-headline-sm text-headline-sm text-primary font-bold">
                            {item.title}
                          </h4>
                        </div>

                        {/* Status Tag */}
                        {isApproved ? (
                          <span className="bg-emerald-600 text-white font-label-sm text-[11px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">check</span> Approved
                          </span>
                        ) : isMerged ? (
                          <span className="bg-surface-container-highest text-primary font-label-sm text-[11px] px-2 py-0.5 rounded-full font-bold">
                            Merged
                          </span>
                        ) : (
                          <span className="bg-secondary-fixed text-primary font-label-sm text-[11px] px-2 py-0.5 rounded-full font-bold">
                            Pending Nod
                          </span>
                        )}
                      </div>

                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                        {item.summary}
                      </p>

                      {/* Matched Lab & Routing Prediction */}
                      <div className="bg-surface-container-low p-2.5 rounded-lg flex items-center justify-between text-label-sm font-label-sm">
                        <div className="space-y-0.5">
                          <span className="text-on-surface-variant block text-[11px]">Matched R&D Unit</span>
                          <span className="font-bold text-primary">{item.matchedInstitution}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-secondary font-bold text-[12px]">{item.aiFitScore}% Fit</span>
                          <span className="text-on-surface-variant block text-[10px]">{item.department}</span>
                        </div>
                      </div>

                      {/* Action Bar */}
                      {!isApproved && !isMerged && (
                        <div className="flex items-center justify-end gap-2 pt-1 border-t border-surface-container">
                          <button
                            onClick={(e) => handleMergeTicket(item.id, e)}
                            className="bg-surface-container hover:bg-surface-container-high text-primary px-3 py-1.5 rounded font-label-md text-label-md transition-colors cursor-pointer font-semibold"
                          >
                            Merge
                          </button>
                          <button
                            onClick={(e) => handleApproveAndRoute(item.id, e)}
                            className="bg-secondary hover:bg-secondary/90 text-on-secondary px-3.5 py-1.5 rounded font-label-md text-label-md transition-colors flex items-center gap-1 cursor-pointer font-bold shadow-xs"
                          >
                            <span className="material-symbols-outlined text-[16px]">check</span>
                            Approve & Route
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Analytics & Sector Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          {/* Civic Sector Breakdown (Span 7) */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-md shadow-xs border border-surface-container-high/30 flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                  Citizen Problem Ingestion by Civic Sector
                </h3>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Categorized via Multimodal Vector Embeddings across 12,480 total intake tickets
                </span>
              </div>
              <button
                onClick={onNavigateToProjects}
                className="text-secondary font-label-md text-label-md font-bold hover:underline cursor-pointer"
              >
                View Pipeline
              </button>
            </div>

            <div className="space-y-3 pt-2">
              {SECTOR_VOLUMES.map((sec) => (
                <div key={sec.sector} className="space-y-1">
                  <div className="flex items-center justify-between text-body-sm font-body-sm">
                    <span className="font-bold text-primary">{sec.sector}</span>
                    <span className="text-on-surface-variant font-medium">
                      {sec.reports.toLocaleString()} ({sec.percentage}%) • {sec.activeProjects} Active Projects
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${sec.colorClass}`}
                      style={{ width: `${sec.barWidthPercent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Institution SLA Speed (Span 5) */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-md shadow-xs border border-surface-container-high/30 flex flex-col gap-space-sm justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                    Academic Institution SLA Speed
                  </h3>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Average Days from Departmental Route to PI Technical Proposal
                  </span>
                </div>
                <span className="material-symbols-outlined text-secondary">speed</span>
              </div>

              <div className="space-y-2 pt-3">
                {INSTITUTIONS_SLA.map((inst) => (
                  <div
                    key={inst.code}
                    className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between text-label-sm font-label-sm"
                  >
                    <div className="space-y-0.5">
                      <span className="font-bold text-primary">{inst.name}</span>
                      <span className="text-on-surface-variant block text-[11px]">
                        {inst.grantsCount} Active Grants • {inst.deptsCount} Depts
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-primary text-[14px]">{inst.slaDays} Days</span>
                      <span className={`block px-2 py-0.5 rounded text-[10px] font-bold ${inst.badgeColor}`}>
                        {inst.quartileStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenCabinetBriefing}
              className="w-full mt-2 bg-surface-container hover:bg-surface-container-high text-primary py-2 rounded-lg font-label-md text-label-md transition-colors text-center cursor-pointer font-semibold flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-body-sm">file_download</span>
              Download Institutional Performance Matrix
            </button>
          </div>
        </div>

        {/* Executive Audit Floating Action Banner */}
        <section className="bg-primary text-on-primary rounded-xl p-space-md shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-tertiary-fixed text-headline-lg">verified</span>
            <div>
              <h4 className="font-headline-sm text-headline-sm font-bold text-on-primary">
                State Cabinet Innovation Quarterly Report Ready
              </h4>
              <p className="font-body-sm text-body-sm text-on-primary-container">
                All 24 District Innovation Cells and 42 university research facilities verified under Audit Act 2024.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onViewGeoAudit}
              className="bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 text-on-primary px-3.5 py-2 rounded-lg font-label-md text-label-md transition-colors cursor-pointer font-medium"
            >
              View Geo-Audit Logs
            </button>
            <button
              onClick={onAuthorizeGazette}
              className="bg-secondary hover:bg-secondary/90 text-on-secondary px-4 py-2 rounded-lg font-label-md text-label-md transition-colors cursor-pointer font-bold shadow-xs flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              Authorize State Gazette Release
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
