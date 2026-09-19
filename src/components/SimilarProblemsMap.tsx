import React, { useState } from 'react';

export interface SimilarProblemLocation {
  id: string;
  title: string;
  district: string;
  blockOrWard: string;
  similarity: number;
  coordinates: { x: number; y: number; lat: number; lng: number }; // SVG relative x (0-100), y (0-100)
  status: string;
  assignedLab: string;
  submittedAgo: string;
  reportsCount: number;
  category: string;
  keyFinding: string;
}

interface SimilarProblemsMapProps {
  currentProblem: {
    title: string;
    district: string;
    block: string;
    category: string;
    coordinates?: { x: number; y: number; lat: number; lng: number };
  };
  similarProblems: SimilarProblemLocation[];
  selectedProblemId?: string | null;
  onSelectProblem?: (problem: SimilarProblemLocation | null) => void;
}

export const SimilarProblemsMap: React.FC<SimilarProblemsMapProps> = ({
  currentProblem,
  similarProblems,
  selectedProblemId,
  onSelectProblem,
}) => {
  const [activeTab, setActiveTab] = useState<'network' | 'satellite'>('network');
  const [hoveredProblem, setHoveredProblem] = useState<SimilarProblemLocation | null>(null);

  // Approximate relative coordinates for Jharkhand map SVG (viewBox 0 0 1000 650)
  // Jharkhand bounding box ~ Lat 21.9 to 25.3°N, Lng 83.3 to 87.9°E
  const currentPos = currentProblem.coordinates || {
    x: 480,
    y: 350,
    lat: 23.3441,
    lng: 85.3096,
  };

  const activeSelected = similarProblems.find((p) => p.id === selectedProblemId) || hoveredProblem;

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-surface-container-high bg-surface-container-lowest shadow-md flex flex-col">
      {/* Map Control Bar */}
      <div className="bg-primary text-on-primary px-4 py-3 flex items-center justify-between flex-wrap gap-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">map</span>
          <div>
            <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
              Geospatial Semantic Cluster Map • Jharkhand State Grid
            </h4>
            <p className="text-[11px] text-cyan-200/90">
              Correlating current submission with historical citizen dockets across 24 districts
            </p>
          </div>
        </div>

        {/* View Toggle and Legend */}
        <div className="flex items-center gap-2">
          <div className="bg-surface-container-highest/20 rounded-lg p-0.5 flex items-center border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('network')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                activeTab === 'network'
                  ? 'bg-secondary text-white shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Cluster Network
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('satellite')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                activeTab === 'satellite'
                  ? 'bg-secondary text-white shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Satellite Topo
            </button>
          </div>
        </div>
      </div>

      {/* Map Graphic Canvas */}
      <div className="relative w-full h-[360px] sm:h-[420px] bg-[#071a2b] overflow-hidden select-none">
        {/* Background styling depending on mode */}
        {activeTab === 'satellite' ? (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
            style={{
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAoz1EKD4qf_f8OON_jVvvCjBMgYt8YkZsku7G85AWoCtmtmo1p_4gO6LY-WpSu-b8lMkhjXuwbDxX04pkmKuGnypQ377oUT9mPb14eHS_ko77nM_swwMGczVSkIsp5xAp6R8V1MmlUpMmEBrVefJ65utUAYI-3kcFpnXgw61HOv3PCtoMKlJo8lk6cbcX8hNhptpV45T0rR4AAFsl1LUsLCvhcG0tfI2fVFGXbP2zk32x9tmArQRy2gA')"
            }}
          />
        ) : (
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#5ad5f8_1px,transparent_1px)] [background-size:24px_24px]" />
        )}

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* SVG Topographic Outlines & Connection Vectors */}
        <svg viewBox="0 0 1000 650" className="w-full h-full absolute inset-0">
          <defs>
            {/* Gradients */}
            <linearGradient id="lineGradHigh" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="lineGradMid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
            </linearGradient>
            {/* Animated dashed line filter */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
          </defs>

          <rect width="1000" height="650" fill="url(#grid)" />

          {/* Jharkhand State Boundary Polygon Mock Silhouette */}
          <path
            d="M 220,180 L 320,120 L 480,90 L 620,110 L 750,130 L 840,190 L 890,260 L 850,340 L 890,440 L 820,530 L 710,580 L 590,560 L 480,610 L 360,570 L 260,540 L 170,450 L 150,330 L 170,230 Z"
            fill="rgba(15, 23, 42, 0.4)"
            stroke="rgba(90, 213, 248, 0.3)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Internal Region Divisions */}
          <path
            d="M 320,120 Q 420,320 480,610"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1.5"
            strokeDasharray="2 4"
          />
          <path
            d="M 620,110 Q 560,340 710,580"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1.5"
            strokeDasharray="2 4"
          />
          <path
            d="M 170,330 Q 500,320 850,340"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1.5"
            strokeDasharray="2 4"
          />

          {/* District Name Watermarks on Map */}
          <text x="470" y="320" fill="rgba(255,255,255,0.25)" fontSize="13" fontWeight="bold" textAnchor="middle">RANCHI</text>
          <text x="650" y="270" fill="rgba(255,255,255,0.25)" fontSize="13" fontWeight="bold" textAnchor="middle">DHANBAD</text>
          <text x="580" y="260" fill="rgba(255,255,255,0.25)" fontSize="13" fontWeight="bold" textAnchor="middle">BOKARO</text>
          <text x="440" y="220" fill="rgba(255,255,255,0.25)" fontSize="13" fontWeight="bold" textAnchor="middle">HAZARIBAGH</text>
          <text x="730" y="470" fill="rgba(255,255,255,0.25)" fontSize="13" fontWeight="bold" textAnchor="middle">EAST SINGHBHUM</text>
          <text x="440" y="430" fill="rgba(255,255,255,0.25)" fontSize="13" fontWeight="bold" textAnchor="middle">KHUNTI</text>
          <text x="260" y="240" fill="rgba(255,255,255,0.25)" fontSize="13" fontWeight="bold" textAnchor="middle">PALAMU</text>
          <text x="760" y="190" fill="rgba(255,255,255,0.25)" fontSize="13" fontWeight="bold" textAnchor="middle">DEOGHAR / SANTHAL</text>

          {/* Semantic Vector Connection Lines */}
          {similarProblems.map((prob) => {
            const isHigh = prob.similarity >= 85;
            return (
              <g key={`vector-${prob.id}`}>
                {/* Glowing under-line */}
                <line
                  x1={currentPos.x}
                  y1={currentPos.y}
                  x2={prob.coordinates.x}
                  y2={prob.coordinates.y}
                  stroke={isHigh ? '#ef4444' : '#f59e0b'}
                  strokeWidth={isHigh ? '3' : '2'}
                  strokeOpacity="0.25"
                />
                {/* Animated vector link */}
                <line
                  x1={currentPos.x}
                  y1={currentPos.y}
                  x2={prob.coordinates.x}
                  y2={prob.coordinates.y}
                  stroke={isHigh ? 'url(#lineGradHigh)' : 'url(#lineGradMid)'}
                  strokeWidth={isHigh ? '2' : '1.5'}
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
                {/* Midpoint Similarity Tag on Line */}
                <g transform={`translate(${(currentPos.x + prob.coordinates.x) / 2}, ${(currentPos.y + prob.coordinates.y) / 2})`}>
                  <rect
                    x="-20"
                    y="-9"
                    width="40"
                    height="18"
                    rx="9"
                    fill="#071a2b"
                    stroke={isHigh ? '#ef4444' : '#f59e0b'}
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="3"
                    fill="#ffffff"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {prob.similarity}%
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* HTML Interactive Marker Pins */}
        <div className="absolute inset-0 pointer-events-none">
          {/* 1. NEW SUBMITTED PROBLEM PIN (GOLDEN/CYAN STAR) */}
          <div
            style={{
              left: `${(currentPos.x / 1000) * 100}%`,
              top: `${(currentPos.y / 650) * 100}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-30 group cursor-pointer"
          >
            <div className="relative flex items-center justify-center">
              {/* Outer pulsing beacon ring */}
              <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-cyan-400 opacity-75" />
              <span className="animate-pulse absolute inline-flex h-8 w-8 rounded-full bg-emerald-400 opacity-60" />

              {/* Center Emblem Pin */}
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-400 border-2 border-white shadow-2xl flex items-center justify-center text-primary font-black scale-110">
                <span className="material-symbols-outlined text-[18px] text-[#071a2b]">star</span>
              </div>

              {/* Tag Label */}
              <div className="absolute top-full mt-1.5 whitespace-nowrap bg-primary/95 text-cyan-300 font-bold text-[11px] px-2.5 py-0.5 rounded-full border border-cyan-400/40 shadow-xl backdrop-blur-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>YOUR SUBMISSION ({currentProblem.district})</span>
              </div>
            </div>
          </div>

          {/* 2. SIMILAR PROBLEM PINS */}
          {similarProblems.map((prob) => {
            const leftPct = (prob.coordinates.x / 1000) * 100;
            const topPct = (prob.coordinates.y / 650) * 100;
            const isHigh = prob.similarity >= 85;
            const isSelected = selectedProblemId === prob.id;

            return (
              <div
                key={prob.id}
                style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-20 group cursor-pointer"
                onClick={() => onSelectProblem?.(prob)}
                onMouseEnter={() => setHoveredProblem(prob)}
                onMouseLeave={() => setHoveredProblem(null)}
              >
                <div className="relative flex items-center justify-center">
                  {/* Blinking ring for high similarity */}
                  {isHigh && (
                    <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-red-500 opacity-60" />
                  )}
                  {isSelected && (
                    <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-cyan-400 opacity-80" />
                  )}

                  {/* Marker Pin */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 transition-transform duration-200 group-hover:scale-125 shadow-lg ${
                      isSelected
                        ? 'bg-cyan-500 border-white ring-4 ring-cyan-400/50 scale-125'
                        : isHigh
                        ? 'bg-red-600 border-white/90'
                        : 'bg-amber-500 border-white/90'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">location_on</span>
                  </div>

                  {/* Pin Micro-Tag */}
                  <div className="absolute top-full mt-1 whitespace-nowrap bg-black/80 text-white font-semibold text-[10px] px-1.5 py-0.5 rounded backdrop-blur-xs shadow pointer-events-none">
                    {prob.district} ({prob.similarity}%)
                  </div>

                  {/* Hover Mini Tooltip Card */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#071a2b] text-white p-3 rounded-xl border border-white/20 shadow-2xl z-40 w-64 pointer-events-none">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                        {prob.district} • {prob.blockOrWard}
                      </span>
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                        isHigh ? 'bg-red-500 text-white' : 'bg-amber-500 text-black'
                      }`}>
                        {prob.similarity}% Match
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white line-clamp-2 mb-1">
                      {prob.title}
                    </div>
                    <div className="text-[11px] text-white/80 line-clamp-1 mb-1.5">
                      Lab: <span className="text-emerald-300 font-semibold">{prob.assignedLab}</span>
                    </div>
                    <div className="text-[10px] text-cyan-200 flex items-center justify-between border-t border-white/10 pt-1">
                      <span>Status: {prob.status}</span>
                      <span>{prob.reportsCount} reports</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Map Overlaid Detail Card (Bottom Right) */}
        {activeSelected && (
          <div className="absolute bottom-3 right-3 max-w-xs sm:max-w-sm bg-primary/95 text-on-primary p-3.5 rounded-xl border border-white/20 shadow-2xl backdrop-blur-md z-30 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-bold text-tertiary-fixed uppercase tracking-wider">
                  Matched District Cluster: {activeSelected.district}
                </span>
              </div>
              <span className="text-xs font-black bg-secondary text-on-secondary px-2 py-0.5 rounded-full shadow-xs">
                {activeSelected.similarity}% Similarity
              </span>
            </div>

            <h5 className="font-bold text-xs text-white leading-tight mb-1">
              {activeSelected.title}
            </h5>
            <p className="text-[11px] text-white/80 leading-relaxed mb-2">
              {activeSelected.keyFinding}
            </p>

            <div className="grid grid-cols-2 gap-2 text-[10px] bg-surface-container-highest/20 p-2 rounded-lg border border-white/10 mb-2">
              <div>
                <span className="text-white/60 block">Assigned Institution:</span>
                <span className="font-bold text-emerald-300 truncate block">
                  {activeSelected.assignedLab}
                </span>
              </div>
              <div>
                <span className="text-white/60 block">Cluster Status:</span>
                <span className="font-bold text-cyan-200 truncate block">
                  {activeSelected.status}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-white/70">
              <span>Location: {activeSelected.blockOrWard}, {activeSelected.district}</span>
              <span className="font-medium text-tertiary-fixed">Historical Docket</span>
            </div>
          </div>
        )}

        {/* Top Left Cluster Indicator */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 text-white text-[11px] flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-bold text-cyan-300">
              {similarProblems.length} Similar Hotspots Linked
            </span>
          </div>
          <span className="text-white/60 hidden sm:inline">|</span>
          <span className="text-white/80 hidden sm:inline">
            Cross-District Vector Radius: 180 km
          </span>
        </div>

        {/* Bottom Left Legend */}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 text-white text-[10px] flex items-center gap-2.5">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" /> New Docket
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500" /> &gt;85% High Match
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> 70-85% Match
          </span>
        </div>
      </div>
    </div>
  );
};
