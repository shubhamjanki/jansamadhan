import React, { useState } from 'react';
import { DISTRICT_STATS } from '../data/mockData';
import { DistrictStat } from '../types';

interface HeatmapScreenProps {
  onSelectDistrict: (district: DistrictStat) => void;
}

export const HeatmapScreen: React.FC<HeatmapScreenProps> = ({ onSelectDistrict }) => {
  const [activeDivision, setActiveDivision] = useState<string>('All');
  const [metricMode, setMetricMode] = useState<'All' | 'Water' | 'Mining' | 'Agri'>('All');

  const divisions = ['All', 'South Chotanagpur', 'North Chotanagpur', 'Santhal Pargana', 'Kolhan', 'Palamu'];

  return (
    <div className="w-full flex flex-col gap-space-lg py-space-md px-4 sm:px-8 max-w-[1720px] mx-auto">
      {/* Title Bar */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container-high/40 flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-headline-lg">map</span>
            <h1 className="font-headline-xl text-headline-xl text-primary font-bold">
              Jharkhand 24-District GIS Telemetry Heatmap
            </h1>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Real-time geospatial analytics connecting citizen problem clusters with satellite ground truth indicators.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg">
            {(['All', 'Water', 'Mining', 'Agri'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMetricMode(m)}
                className={`px-3 py-1 rounded font-label-md text-label-md transition-all cursor-pointer ${
                  metricMode === m
                    ? 'bg-secondary text-on-secondary font-bold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
        {/* Map Canvas (Span 8) */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container-high/40 flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">
              Satellite GIS Layer • Jharkhand Space Applications Center (JSAC)
            </span>
            <div className="flex items-center gap-3 text-label-sm font-label-sm">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-error"></span> Level 4 (Critical)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Level 3 (High)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Level 2 (Moderate)
              </span>
            </div>
          </div>

          <div
            className="w-full h-[450px] lg:h-[550px] rounded-xl bg-cover bg-center relative overflow-hidden flex items-end p-4 border border-surface-container-high/40 shadow-inner"
            style={{
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAoz1EKD4qf_f8OON_jVvvCjBMgYt8YkZsku7G85AWoCtmtmo1p_4gO6LY-WpSu-b8lMkhjXuwbDxX04pkmKuGnypQ377oUT9mPb14eHS_ko77nM_swwMGczVSkIsp5xAp6R8V1MmlUpMmEBrVefJ65utUAYI-3kcFpnXgw61HOv3PCtoMKlJo8lk6cbcX8hNhptpV45T0rR4AAFsl1LUsLCvhcG0tfI2fVFGXbP2zk32x9tmArQRy2gA')"
            }}
          >
            <div className="absolute inset-0 bg-primary/20 backdrop-brightness-95 pointer-events-none"></div>

            {/* Dynamic District Hotspots */}
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

                return (
                  <div
                    key={d.name}
                    onClick={() => onSelectDistrict(d)}
                    style={{ top: pos.top, left: pos.left }}
                    className="absolute pointer-events-auto cursor-pointer group -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="relative flex items-center justify-center">
                      {d.status === 'Critical' && (
                        <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-error opacity-75"></span>
                      )}
                      <span className={`relative inline-flex rounded-full h-5 w-5 text-white text-[10px] font-bold items-center justify-center ring-2 ring-white ${
                        d.status === 'Critical' ? 'bg-error' : d.status === 'High' ? 'bg-amber-500' : 'bg-blue-600'
                      }`}>
                        {d.rank}
                      </span>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[11px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-30 font-medium">
                      {d.name} District ({d.alerts} issues)
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom floating legend & live pulse */}
            <div className="relative z-10 w-full bg-surface-container-lowest/90 backdrop-blur-md p-3.5 rounded-lg flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-label-sm text-label-sm font-bold text-primary">
                  Active Radar Sweep: 24/24 Districts Reporting
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                Click any hotspot pin to inspect District Innovation Cell
              </span>
            </div>
          </div>
        </div>

        {/* District Roster (Span 4) */}
        <div className="lg:col-span-4 bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container-high/40 flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              District Innovation Index
            </h3>
            <span className="font-label-sm text-label-sm text-secondary font-bold">
              {DISTRICT_STATS.length} Districts Listed
            </span>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {DISTRICT_STATS.map((district) => (
              <div
                key={district.name}
                onClick={() => onSelectDistrict(district)}
                className="p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer flex flex-col gap-1 border border-surface-container-high/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary font-label-md text-label-md">
                      #{district.rank} {district.name}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      district.status === 'Critical'
                        ? 'bg-error-container text-on-error-container'
                        : district.status === 'High'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-blue-100 text-blue-900'
                    }`}>
                      {district.status}
                    </span>
                  </div>
                  <span className="font-bold text-primary text-[13px]">
                    {district.alerts.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-body-sm text-[11px] text-on-surface-variant">
                  <span>Anchor: {district.anchorLab}</span>
                  <span className="text-emerald-700 font-semibold">{district.slaRate}% SLA</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
