import React, { useState } from 'react';
import { Language } from '../types';
import logoImg from '../assets/images/jan_samadhan_logo_1789843668705.jpg';

interface CitizenDigitalPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  ticket: {
    id: string;
    title: string;
    district: string;
    block?: string;
    category?: string;
    matchedLab?: string;
    date?: string;
    slaDays?: number;
  };
  onShowToast?: (msg: string) => void;
}

export const CitizenDigitalPassModal: React.FC<CitizenDigitalPassModalProps> = ({
  isOpen,
  onClose,
  language,
  ticket,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'pass' | 'whatsapp'>('pass');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(`https://jansamadhan.jharkhand.gov.in/track?docket=${ticket.id}`);
    setCopied(true);
    onShowToast?.('✓ Official verification tracking link copied to clipboard.');
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-surface rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl border border-surface-container-highest overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-5 py-3.5 sm:py-4 bg-primary text-on-primary flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-primary-container">
          <div className="flex items-center justify-between sm:justify-start gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={logoImg}
                alt="Jan Samadhan Seal"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover bg-white p-0.5 shadow-sm shrink-0"
              />
              <div className="min-w-0">
                <h3 className="font-bold text-xs sm:text-sm tracking-tight truncate">
                  {language === 'hi' ? 'नागरिक डिजिटल पावती एवं व्हाट्सएप अलर्ट' : 'Citizen Digital Pass & WhatsApp Alert'}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-on-primary-container font-mono truncate">
                  Docket: {ticket.id} • Verified by DHTE Jharkhand
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="sm:hidden p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer shrink-0"
              title="Close Pass"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2">
            {/* Tab switch */}
            <div className="bg-black/20 p-1 rounded-xl flex items-center text-xs flex-1 sm:flex-initial justify-center">
              <button
                type="button"
                onClick={() => setActiveTab('pass')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer text-xs ${
                  activeTab === 'pass' ? 'bg-white text-primary shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                Digital Pass
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('whatsapp')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 text-xs ${
                  activeTab === 'whatsapp' ? 'bg-emerald-500 text-white shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-white" />
                WhatsApp
              </button>
            </div>

            <button
              onClick={onClose}
              className="hidden sm:inline-flex p-1.5 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
              title="Close Pass"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 bg-surface-container-lowest">
          {activeTab === 'pass' ? (
            /* ================= DIGITAL PASS VIEW ================= */
            <div className="space-y-4">
              {/* The Official Pass Card (Printable) */}
              <div className="bg-white rounded-2xl border-2 border-emerald-600/30 p-5 sm:p-6 shadow-md relative overflow-hidden text-slate-900">
                {/* Official Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                  <img src={logoImg} alt="" className="w-80 h-80 object-contain" />
                </div>

                {/* Top Pass Banner */}
                <div className="flex flex-col xs:flex-row items-start justify-between border-b-2 border-slate-100 pb-3 gap-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={logoImg}
                      alt="Government of Jharkhand"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-contain border border-slate-200 bg-white p-1"
                    />
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-bold text-emerald-800 uppercase tracking-widest block">
                        GOVERNMENT OF JHARKHAND
                      </span>
                      <h4 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                        JAN SAMADHAN CITIZEN PASS
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                        Dept of Higher &amp; Technical Education • Innovation Fund
                      </p>
                    </div>
                  </div>

                  <div className="self-start xs:self-auto text-left xs:text-right">
                    <span className="inline-block bg-emerald-100 text-emerald-800 text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                      VALID SLA DOCKET
                    </span>
                    <span className="block font-mono text-xs font-black text-slate-700 mt-0.5">
                      {ticket.id}
                    </span>
                  </div>
                </div>

                {/* Grievance Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Grievance Subject</span>
                    <span className="font-bold text-slate-900 block mt-0.5 line-clamp-2">{ticket.title}</span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Assigned Technical Institution</span>
                    <span className="font-bold text-emerald-700 block mt-0.5">
                      {ticket.matchedLab || 'BIT Mesra (Environmental Engineering Lab)'}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Location / Jurisdiction</span>
                    <span className="font-bold text-slate-900 block mt-0.5">
                      {ticket.block || 'Namkum Ward 14'}, {ticket.district} District
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Statutory SLA Commitment</span>
                    <span className="font-bold text-red-600 block mt-0.5">
                      45 Days Maximum Resolution (Mandatory Field Pilot)
                    </span>
                  </div>
                </div>

                {/* QR Code & Digital Signature Stamp */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 bg-slate-50/70 -mx-5 -mb-5 p-4 rounded-b-2xl">
                  <div className="flex items-center gap-3.5">
                    {/* Simulated SVG QR Code */}
                    <div className="w-16 h-16 bg-white p-1.5 rounded-xl border border-slate-300 shadow-xs flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                        <rect x="0" y="0" width="30" height="30" fill="currentColor" />
                        <rect x="5" y="5" width="20" height="20" fill="white" />
                        <rect x="10" y="10" width="10" height="10" fill="currentColor" />
                        <rect x="70" y="0" width="30" height="30" fill="currentColor" />
                        <rect x="75" y="5" width="20" height="20" fill="white" />
                        <rect x="80" y="10" width="10" height="10" fill="currentColor" />
                        <rect x="0" y="70" width="30" height="30" fill="currentColor" />
                        <rect x="5" y="75" width="20" height="20" fill="white" />
                        <rect x="10" y="80" width="10" height="10" fill="currentColor" />
                        <rect x="40" y="10" width="10" height="20" fill="currentColor" />
                        <rect x="55" y="15" width="10" height="10" fill="currentColor" />
                        <rect x="40" y="40" width="20" height="20" fill="currentColor" />
                        <rect x="45" y="45" width="10" height="10" fill="white" />
                        <rect x="70" y="40" width="15" height="15" fill="currentColor" />
                        <rect x="15" y="40" width="15" height="15" fill="currentColor" />
                        <rect x="40" y="70" width="20" height="10" fill="currentColor" />
                        <rect x="70" y="70" width="10" height="20" fill="currentColor" />
                        <rect x="85" y="75" width="10" height="15" fill="currentColor" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">
                        Scan at Panchayat or BDO Office
                      </span>
                      <p className="text-xs font-semibold text-slate-700">
                        Instant cryptographic verification of live lab status
                      </p>
                      <span className="text-[10px] font-mono text-emerald-700 font-bold">
                        SHA-256: e9c1a4...7b23
                      </span>
                    </div>
                  </div>

                  {/* Digital Signature Badge */}
                  <div className="text-right shrink-0 border border-emerald-300 bg-emerald-50/90 px-3 py-1.5 rounded-xl">
                    <span className="text-[9px] font-mono text-emerald-800 uppercase block font-bold">
                      DIGITALLY CERTIFIED
                    </span>
                    <span className="text-xs font-black text-slate-900 block">
                      Jharkhand Innovation Council
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      Date: {ticket.date || '2025-09-19'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Instructions for Citizen */}
              <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-xl text-blue-950 text-xs flex items-start gap-2.5">
                <span className="material-symbols-outlined text-blue-700 text-lg shrink-0 mt-0.5">info</span>
                <div>
                  <span className="font-bold block mb-0.5">Citizen Instruction:</span>
                  <p className="leading-relaxed text-blue-900 text-[11px]">
                    Keep this Digital Pass saved on your mobile. You can show this QR code to your local Panchayat Secretary or Block Development Officer (BDO) to verify that university testing has been sanctioned under state funding.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* ================= WHATSAPP SIMULATION VIEW ================= */
            <div className="space-y-4">
              <div className="max-w-md mx-auto bg-[#0b141a] rounded-3xl p-4 shadow-2xl border-4 border-[#202c33] text-white">
                {/* Phone Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-[#202c33]">
                  <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold shrink-0">
                    <img src={logoImg} alt="" className="w-full h-full rounded-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-sm text-white truncate">
                        Jan Samadhan • Govt of Jharkhand
                      </span>
                      <span className="material-symbols-outlined text-[14px] text-emerald-400">verified</span>
                    </div>
                    <span className="text-[11px] text-emerald-400 block">Official Service Account</span>
                  </div>
                </div>

                {/* WhatsApp Chat Bubble */}
                <div className="mt-4 space-y-3">
                  <div className="bg-[#202c33] p-3.5 rounded-2xl rounded-tl-none text-xs text-[#e9edef] space-y-2 relative shadow-md">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                      <span className="material-symbols-outlined text-[14px]">task_alt</span>
                      <span>GRIEVANCE REGISTERED SUCCESSFULLY</span>
                    </div>

                    <p className="text-[12px] leading-relaxed">
                      Johar! Your problem has been successfully ingested into the Jan Samadhan State Registry.
                    </p>

                    <div className="bg-[#111b21] p-2.5 rounded-xl space-y-1 font-mono text-[11px] text-[#aebac1]">
                      <div>📌 <span className="text-white font-bold">Docket ID:</span> {ticket.id}</div>
                      <div>📍 <span className="text-white font-bold">Area:</span> {ticket.block || 'Namkum'}, {ticket.district}</div>
                      <div>🔬 <span className="text-white font-bold">Matched Lab:</span> {ticket.matchedLab || 'BIT Mesra Water Lab'}</div>
                      <div>⏱️ <span className="text-white font-bold">SLA Limit:</span> 45 Days Pilot Testing</div>
                    </div>

                    <p className="text-[11px] text-[#aebac1] leading-relaxed">
                      University research scholars have been assigned. An on-site sample collection team will visit your locality within 7 working days.
                    </p>

                    {/* WhatsApp Action Buttons */}
                    <div className="pt-2 border-t border-[#374248] space-y-1.5">
                      <a
                        href={`https://jansamadhan.jharkhand.gov.in/track?docket=${ticket.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-[#111b21] hover:bg-[#182229] py-2 px-3 rounded-lg text-emerald-400 text-center font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[15px]">travel_explore</span>
                        <span>Track Live Research Milestones</span>
                      </a>
                    </div>

                    <div className="text-right text-[10px] text-[#8696a0] mt-1">
                      Just now • Read ✓✓
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center text-xs text-on-surface-variant">
                📱 Simulated live message transmitted to registered citizen mobile number via Jharkhand State SMS Gateway.
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-4 sm:px-5 py-3.5 bg-surface-container border-t border-surface-container-high flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={handleCopyLink}
            className="text-xs bg-surface-container-low hover:bg-surface-container-high text-primary px-3.5 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 border border-surface-container-high cursor-pointer w-full sm:w-auto"
          >
            <span className="material-symbols-outlined text-[16px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied Link!' : 'Copy Tracking Link'}</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 sm:flex-initial text-xs bg-surface-container-low hover:bg-surface-container-high text-primary px-4 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 border border-surface-container-high cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Print Pass</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial text-xs bg-primary text-on-primary px-5 py-2 rounded-xl font-bold hover:bg-primary/90 transition-all cursor-pointer text-center"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
