import React, { useState } from 'react';
import { CHALLENGES_DATA, DISTRICT_STATS } from '../data/mockData';
import { Challenge, DistrictStat } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChallenge: (challenge: Challenge) => void;
  onSelectDistrict: (district: DistrictStat) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectChallenge,
  onSelectDistrict,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const matchedChallenges = CHALLENGES_DATA.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase()) ||
      c.district.toLowerCase().includes(query.toLowerCase()) ||
      c.matchedLab.toLowerCase().includes(query.toLowerCase())
  );

  const matchedDistricts = DISTRICT_STATS.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-primary/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-2xl shadow-2xl border border-surface-container-high overflow-hidden flex flex-col max-h-[80vh]">
        {/* Input Bar */}
        <div className="p-4 border-b border-surface-container-high flex items-center gap-3 bg-surface-container-low">
          <span className="material-symbols-outlined text-secondary text-headline-md">search</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search challenges, districts, labs, water, mining, cold-chain..."
            className="w-full bg-transparent border-none outline-none font-body-lg text-body-lg text-primary placeholder:text-on-surface-variant"
            autoFocus
          />
          <kbd className="bg-surface-container-highest px-2 py-1 rounded font-mono text-[11px] font-bold text-on-surface-variant">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="p-4 overflow-y-auto space-y-4">
          {query.trim() === '' ? (
            <div className="space-y-3">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
                Recommended Queries:
              </span>
              <div className="flex flex-wrap gap-2">
                {['Arsenic Water Filtration', 'Coal Dust Jharia', 'DC Solar Cold Storage', 'Ranchi District', 'Dhanbad Mining', 'BIT Mesra Labs'].map(
                  (q) => (
                    <button
                      key={q}
                      onClick={() => setQuery(q)}
                      className="px-3 py-1 rounded-full bg-surface-container-high hover:bg-surface-container text-primary font-label-md text-label-md transition-colors cursor-pointer"
                    >
                      {q}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Challenges */}
              {matchedChallenges.length > 0 && (
                <div className="space-y-2">
                  <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider block">
                    Challenges ({matchedChallenges.length})
                  </span>
                  {matchedChallenges.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => {
                        onSelectChallenge(c);
                        onClose();
                      }}
                      className="p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <div className="space-y-0.5">
                        <span className="font-label-md text-label-md font-bold text-primary block">
                          {c.title}
                        </span>
                        <span className="text-on-surface-variant text-[12px]">
                          {c.category} • {c.district} District • Lab: {c.matchedLab}
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-secondary">arrow_forward</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Districts */}
              {matchedDistricts.length > 0 && (
                <div className="space-y-2">
                  <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider block">
                    Districts ({matchedDistricts.length})
                  </span>
                  {matchedDistricts.map((d) => (
                    <div
                      key={d.name}
                      onClick={() => {
                        onSelectDistrict(d);
                        onClose();
                      }}
                      className="p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <span className="font-label-md text-label-md font-bold text-primary block">
                          {d.name} District Innovation Cell
                        </span>
                        <span className="text-on-surface-variant text-[12px]">
                          {d.alerts} Alerts • SLA: {d.slaRate}% • {d.anchorLab}
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-secondary">arrow_forward</span>
                    </div>
                  ))}
                </div>
              )}

              {matchedChallenges.length === 0 && matchedDistricts.length === 0 && (
                <div className="py-8 text-center text-on-surface-variant font-body-md">
                  No records matching &quot;{query}&quot;. Try searching for &quot;water&quot;, &quot;mining&quot;, or &quot;Ranchi&quot;.
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant text-[11px]">
          <span>Use <strong>↑</strong> and <strong>↓</strong> to navigate</span>
          <button onClick={onClose} className="hover:text-on-surface cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
