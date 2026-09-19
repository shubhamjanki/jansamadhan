import React from 'react';
import logoImg from '../assets/images/jan_samadhan_logo_1789843668705.jpg';

interface FooterProps {
  onNavigateTab?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="w-full bg-surface-container-low mt-space-xl border-t border-surface-container-high/40">
      <div className="w-full px-4 sm:px-8 py-space-xl max-w-[1720px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-lg mb-space-lg">
          {/* Col 1 */}
          <div className="space-y-space-xs">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="Jan Samadhan Logo"
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-full object-cover border border-secondary/20 shadow-xs"
              />
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-headline-sm text-primary font-bold">
                  JAN SAMADHAN
                </span>
                <span className="bg-secondary text-on-secondary px-1.5 py-0.5 rounded text-[10px] font-bold">
                  जन समाधान
                </span>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              State-level Citizen Grievance & Technical Innovation System connecting public grassroots problems with premier universities, labs, and rapid field execution.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="material-symbols-outlined text-label-md text-secondary">
                support_agent
              </span>
              <span className="font-label-md text-label-md font-bold text-on-surface">
                Citizen Toll-Free Helpline: 1800-JAN-SAMADHAN (1800-526-7262)
              </span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <div className="font-label-md text-label-md text-primary font-bold mb-space-xs uppercase tracking-wider">
              Governance & Transparency
            </div>
            <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <a className="hover:text-on-surface transition-colors cursor-pointer" onClick={() => onNavigateTab?.('challenges')}>
                  Department Allocation Matrix
                </a>
              </li>
              <li>
                <a className="hover:text-on-surface transition-colors cursor-pointer" onClick={() => onNavigateTab?.('projects')}>
                  Public Expenditure Audits
                </a>
              </li>
              <li>
                <a className="hover:text-on-surface transition-colors cursor-pointer">
                  RTI Statutory Disclosures
                </a>
              </li>
              <li>
                <a className="hover:text-on-surface transition-colors cursor-pointer">
                  Independent Pilot Review Board
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <div className="font-label-md text-label-md text-primary font-bold mb-space-xs uppercase tracking-wider">
              Institutional Framework
            </div>
            <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <a className="hover:text-on-surface transition-colors cursor-pointer" onClick={() => onNavigateTab?.('challenges')}>
                  Participating Universities & Labs
                </a>
              </li>
              <li>
                <a className="hover:text-on-surface transition-colors cursor-pointer" onClick={() => onNavigateTab?.('state-heatmap')}>
                  District Innovation Cells (DIC)
                </a>
              </li>
              <li>
                <a className="hover:text-on-surface transition-colors cursor-pointer">
                  Incubator Accreditations
                </a>
              </li>
              <li>
                <a className="hover:text-on-surface transition-colors cursor-pointer">
                  IPR & Patent Support Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <div className="font-label-md text-label-md text-primary font-bold mb-space-xs uppercase tracking-wider">
              Compliance & Infrastructure
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-xs leading-relaxed">
              Designed and developed under guidelines of National Informatics Centre (NIC) and Jharkhand Directorate of Information Technology.
            </p>
            <div className="bg-surface-container-high p-3 rounded-lg flex items-start gap-2 shadow-xs">
              <span className="material-symbols-outlined text-label-md text-primary mt-0.5">policy</span>
              <div className="font-label-sm text-label-sm text-on-surface font-medium">
                ISO 27001 Certified • MeitY GIGW 3.0 Compliant • STQC Audited
              </div>
            </div>
          </div>
        </div>

        {/* Sub-bar */}
        <div className="pt-space-md border-t border-surface-container-high/60 flex flex-col md:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-label-sm text-label-sm">
          <div>
            © 2025 Government of Jharkhand. All Rights Reserved. Smart Innovation Cell.
          </div>
          <div className="flex items-center gap-space-md flex-wrap">
            <a className="hover:text-on-surface transition-colors" href="#">Terms of Public Service</a>
            <a className="hover:text-on-surface transition-colors" href="#">Hyperlinking Policy</a>
            <a className="hover:text-on-surface transition-colors" href="#">Privacy Statement</a>
            <a className="hover:text-on-surface transition-colors" href="#">National Portal of India</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
