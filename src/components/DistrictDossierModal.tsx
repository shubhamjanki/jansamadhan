import React from 'react';
import { DistrictStat } from '../types';

interface DistrictDossierModalProps {
  district: DistrictStat | null;
  isOpen: boolean;
  onClose: () => void;
  onDeployRapidTeam: (districtName: string) => void;
}

export const DistrictDossierModal: React.FC<DistrictDossierModalProps> = ({
  district,
  isOpen,
  onClose,
  onDeployRapidTeam,
}) => {
  if (!isOpen || !district) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-primary/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl border border-surface-container-high flex flex-col">
        {/* Header */}
        <div className="bg-primary text-on-primary p-4 sm:p-5 flex items-start justify-between border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-secondary-fixed text-primary font-label-sm text-[11px] font-bold px-2 py-0.5 rounded">
                District Rank #{district.rank}
              </span>
              <span className={`font-label-sm text-[11px] font-bold px-2 py-0.5 rounded ${
                district.status === 'Critical'
                  ? 'bg-error-container text-on-error-container'
                  : 'bg-amber-100 text-amber-900'
              }`}>
                {district.status} Priority
              </span>
              <span className="text-tertiary-fixed font-mono text-[11px]">
                {district.lat}° N, {district.lng}° E
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-primary mt-1">
              {district.name} District Innovation Cell Dossier
            </h2>
            <p className="font-body-sm text-body-sm text-on-primary-container text-[12px]">
              Administrative Jurisdiction: {district.blocksCount} Community Development Blocks • Nodal DIC Officer Active
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-on-primary-container hover:text-on-primary hover:bg-white/10 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-headline-sm">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* 4 Metric Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-surface-container-low p-3 rounded-xl">
              <span className="font-label-sm text-label-sm text-on-surface-variant block text-[11px]">
                Reported Influx
              </span>
              <span className="font-numeric-metric text-numeric-metric font-bold text-primary block">
                {district.alerts.toLocaleString()}
              </span>
              <span className="font-body-sm text-secondary font-medium text-[11px]">
                {district.activeClusters} Active Clusters
              </span>
            </div>
            <div className="bg-surface-container-low p-3 rounded-xl">
              <span className="font-label-sm text-label-sm text-on-surface-variant block text-[11px]">
                SLA Resolution
              </span>
              <span className="font-numeric-metric text-numeric-metric font-bold text-primary block">
                {district.slaRate}%
              </span>
              <span className="font-body-sm text-emerald-600 font-medium text-[11px]">
                {district.turnaroundDays}d turnaround
              </span>
            </div>
            <div className="bg-surface-container-low p-3 rounded-xl">
              <span className="font-label-sm text-label-sm text-on-surface-variant block text-[11px]">
                Active Grants
              </span>
              <span className="font-numeric-metric text-numeric-metric font-bold text-secondary block">
                {district.activeGrants}
              </span>
              <span className="font-body-sm text-on-surface-variant text-[11px]">
                {district.solvedCount} Solved
              </span>
            </div>
            <div className="bg-surface-container-low p-3 rounded-xl">
              <span className="font-label-sm text-label-sm text-on-surface-variant block text-[11px]">
                Anchor R&D Lab
              </span>
              <span className="font-headline-sm text-headline-sm font-bold text-primary block truncate mt-1">
                {district.anchorLab}
              </span>
              <span className="font-body-sm text-on-surface-variant text-[11px]">
                Faculty PI Attached
              </span>
            </div>
          </div>

          {/* Block Level Allocation Grid */}
          <div>
            <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider block mb-2">
              Block-Level Problem Clusters & Sensors in {district.name}
            </span>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
                <div className="space-y-0.5">
                  <span className="font-bold text-primary text-body-md font-body-md block">
                    Urban Core / Sadar Block
                  </span>
                  <span className="text-on-surface-variant text-[12px]">
                    14 IoT Aquifer Probes • Main Contaminant: Industrial Heavy Metal Runoff
                  </span>
                </div>
                <span className="bg-error-container text-on-error-container px-2 py-0.5 rounded text-label-sm font-bold">
                  Level 4 Hotzone
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
                <div className="space-y-0.5">
                  <span className="font-bold text-primary text-body-md font-body-md block">
                    Eastern Industrial Peripheral Block
                  </span>
                  <span className="text-on-surface-variant text-[12px]">
                    22 Particulate PM 2.5 Air Analyzers • Influx from processing factories
                  </span>
                </div>
                <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-label-sm font-bold">
                  Level 3 Moderate
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
                <div className="space-y-0.5">
                  <span className="font-bold text-primary text-body-md font-body-md block">
                    Tribal Agro-Belt Sub-Division
                  </span>
                  <span className="text-on-surface-variant text-[12px]">
                    6 DC Micro-Cold Storage Units Active • Operated by Women SHG federations
                  </span>
                </div>
                <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded text-label-sm font-bold">
                  Level 1 Stable
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-surface-container-low border-t border-surface-container-high flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <span className="font-label-sm text-label-sm text-on-surface-variant text-center sm:text-left">
            Official GIS Census ID: <strong>JH-DIST-{district.rank.toString().padStart(2, '0')}</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer text-center"
            >
              Close
            </button>
            <button
              onClick={() => {
                onDeployRapidTeam(district.name);
                onClose();
              }}
              className="flex-1 sm:flex-initial bg-secondary hover:bg-secondary/90 text-on-secondary px-4 sm:px-5 py-2 rounded-lg font-label-md text-label-md transition-colors cursor-pointer font-bold shadow-xs text-center"
            >
              Dispatch Taskforce
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
