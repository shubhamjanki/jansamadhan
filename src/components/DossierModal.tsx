import React from 'react';
import { Challenge } from '../types';

interface DossierModalProps {
  challenge: Challenge | null;
  isOpen: boolean;
  onClose: () => void;
  onApplyForGrant?: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({
  challenge,
  isOpen,
  onClose,
  onApplyForGrant,
}) => {
  if (!isOpen || !challenge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-surface-container-high flex flex-col">
        {/* Masthead */}
        <div className="bg-primary text-on-primary p-5 flex items-start justify-between border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-secondary-fixed text-primary font-label-sm text-[11px] font-bold px-2 py-0.5 rounded">
                ID: {challenge.id}
              </span>
              <span className="bg-surface-container-highest text-primary font-label-sm text-[11px] font-bold px-2 py-0.5 rounded">
                {challenge.category}
              </span>
              <span className="text-tertiary-fixed font-label-sm text-[11px] font-mono">
                {challenge.coordinates || '23.3441° N, 85.3096° E'}
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-primary mt-1">
              {challenge.title}
            </h2>
            <div className="flex items-center gap-2 text-on-primary-container text-body-sm font-body-sm text-[12px]">
              <span>District: <strong>{challenge.district}</strong></span>
              <span>•</span>
              <span>Aggregated from <strong>{challenge.reportsCount} citizen reports</strong></span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-on-primary-container hover:text-on-primary hover:bg-white/10 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-headline-sm">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Executive Summary */}
          <div>
            <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider block mb-1">
              Statutory Problem Statement & Scope
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {challenge.fullDescription || challenge.summary}
            </p>
          </div>

          {/* Key Allocation Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-surface-container-low p-3.5 rounded-xl border border-surface-container-high/60">
              <span className="font-label-sm text-label-sm text-on-surface-variant block text-[11px]">
                Committed Grant Pool
              </span>
              <span className="font-headline-md text-headline-md font-bold text-primary block mt-0.5">
                {challenge.grantPool}
              </span>
              <span className="font-body-sm text-on-surface-variant text-[11px]">
                Under PFMS Direct Benefit
              </span>
            </div>
            <div className="bg-surface-container-low p-3.5 rounded-xl border border-surface-container-high/60">
              <span className="font-label-sm text-label-sm text-on-surface-variant block text-[11px]">
                Matched University Lab
              </span>
              <span className="font-headline-sm text-headline-sm font-bold text-secondary block mt-0.5 truncate">
                {challenge.matchedLab}
              </span>
              <span className="font-body-sm text-on-surface-variant text-[11px]">
                AI Match Score: <strong>{challenge.aiMatchScore}%</strong>
              </span>
            </div>
            <div className="bg-surface-container-low p-3.5 rounded-xl border border-surface-container-high/60">
              <span className="font-label-sm text-label-sm text-on-surface-variant block text-[11px]">
                Sponsoring Body / CSR
              </span>
              <span className="font-headline-sm text-headline-sm font-bold text-primary block mt-0.5 truncate">
                {challenge.sponsoringBody}
              </span>
              <span className="font-body-sm text-emerald-600 font-semibold text-[11px]">
                Funds Cleared & Escrowed
              </span>
            </div>
          </div>

          {/* Technical Milestones */}
          <div>
            <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider block mb-2">
              Milestone Deliverables & Field Test Protocol
            </span>
            <div className="space-y-2 font-body-sm text-body-sm text-on-surface">
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-surface-container-low">
                <span className="material-symbols-outlined text-emerald-600 text-body-lg shrink-0 mt-0.5">
                  check_circle
                </span>
                <div>
                  <strong>Milestone 1: Baseline Water Sampling & Spectral Audit (Day 15)</strong>
                  <p className="text-on-surface-variant text-[12px]">Laboratory chemical analysis of 45 aquifer borehole samples across Namkum block.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-surface-container-low">
                <span className="material-symbols-outlined text-secondary text-body-lg shrink-0 mt-0.5">
                  pending
                </span>
                <div>
                  <strong>Milestone 2: Modular Canister Prototyping & Bench Testing (Day 45)</strong>
                  <p className="text-on-surface-variant text-[12px]">Fabrication of 3 portable pilot units with automated backwash and IoT pressure gauges.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-surface-container-low">
                <span className="material-symbols-outlined text-outline text-body-lg shrink-0 mt-0.5">
                  radio_button_unchecked
                </span>
                <div>
                  <strong>Milestone 3: Ground Pilot Handover to District Innovation Cell (Day 90)</strong>
                  <p className="text-on-surface-variant text-[12px]">Deployment at community tap stands with local women SHG maintenance training.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            State Innovation Portal Ref: <strong>JHAR-DOC-{challenge.id}</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
            >
              Close Dossier
            </button>
            <button
              onClick={() => {
                onApplyForGrant?.();
                onClose();
              }}
              className="bg-secondary hover:bg-secondary/90 text-on-secondary px-5 py-2 rounded-lg font-label-md text-label-md transition-colors cursor-pointer font-bold shadow-xs flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">file_open</span>
              <span>Download Signed Dossier PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
