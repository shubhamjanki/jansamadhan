import React, { useState } from 'react';
import { CHALLENGES_DATA } from '../data/mockData';
import { Challenge } from '../types';

interface ProjectsScreenProps {
  onSelectChallenge: (c: Challenge) => void;
  onOpenReportModal: () => void;
}

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({
  onSelectChallenge,
  onOpenReportModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const categories = ['All', 'Water Quality', 'Waste Management', 'Renewable Microgrid', 'AgTech & Livelihood', 'Healthcare Logistics'];

  const filteredChallenges = CHALLENGES_DATA.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.matchedLab.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="w-full flex flex-col gap-space-lg py-space-md px-4 sm:px-8 max-w-[1720px] mx-auto">
      {/* Header */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container-high/40 flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-headline-lg">science</span>
            <h1 className="font-headline-xl text-headline-xl text-primary font-bold">
              State Innovation Projects Registry
            </h1>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Tracking 164 active prototyping grants and field pilots across Jharkhand universities and incubators.
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="bg-secondary hover:bg-secondary/90 text-on-secondary px-4 py-2.5 rounded-lg font-headline-sm text-headline-sm font-bold shadow-xs flex items-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          Register New Challenge
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container-high/40 flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects, labs, districts..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface-container-low border border-surface-container-high font-body-md text-body-md outline-none"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          <span className="font-label-sm text-label-sm text-on-surface-variant mr-1">Sector:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded font-label-md text-label-md transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-secondary text-on-secondary font-bold shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
        {filteredChallenges.map((project) => (
          <div
            key={project.id}
            className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow border border-surface-container-high/40 flex flex-col justify-between overflow-hidden"
          >
            <div className="p-space-md flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="bg-blue-50 text-secondary font-label-sm text-label-sm font-bold px-2.5 py-0.5 rounded-full">
                  {project.category} • {project.district}
                </span>
                <span className={`px-2 py-0.5 rounded font-label-sm text-[11px] font-bold ${
                  project.status === 'Field Pilot'
                    ? 'bg-emerald-100 text-emerald-900'
                    : 'bg-blue-100 text-blue-900'
                }`}>
                  {project.status}
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md font-bold text-primary">
                {project.title}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3">
                {project.summary}
              </p>
              <div className="bg-surface-container-low rounded-lg p-3 space-y-1 text-label-sm font-label-sm">
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Matched Lab:</span>
                  <span className="font-bold text-primary">{project.matchedLab}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Sponsor:</span>
                  <span className="font-bold text-primary">{project.sponsoringBody}</span>
                </div>
              </div>
            </div>

            <div className="p-space-md bg-surface-container-low border-t border-surface-container-high flex items-center justify-between">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant block text-[11px]">
                  Grant Committed
                </span>
                <span className="font-headline-sm text-headline-sm font-bold text-primary">
                  {project.grantPool}
                </span>
              </div>
              <button
                onClick={() => onSelectChallenge(project)}
                className="bg-primary hover:bg-primary/90 text-on-primary px-3.5 py-1.5 rounded-lg font-label-md text-label-md transition-colors cursor-pointer font-semibold flex items-center gap-1"
              >
                <span>View Dossier</span>
                <span className="material-symbols-outlined text-[16px]">north_east</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
