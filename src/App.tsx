import React, { useState, useEffect } from 'react';
import { Challenge, DistrictStat, Language, NotificationItem, QueueItem, ScreenTab, UserRole } from './types';
import { NOTIFICATIONS_DATA, CHALLENGES_DATA, DISTRICT_STATS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { CommandCenterScreen } from './components/CommandCenterScreen';
import { HeatmapScreen } from './components/HeatmapScreen';
import { ProjectsScreen } from './components/ProjectsScreen';
import { ImpactGraphScreen } from './components/ImpactGraphScreen';
import { ProblemDossierScreen, ProblemDossierData } from './components/ProblemDossierScreen';
import { SubmitProblemModal } from './components/SubmitProblemModal';
import { DossierModal } from './components/DossierModal';
import { DistrictDossierModal } from './components/DistrictDossierModal';
import { SearchModal } from './components/SearchModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { LoadingScreen } from './components/LoadingScreen';

import { ProcessFlowScreen } from './components/ProcessFlowScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ScreenTab>('home');
  const [userRole, setUserRole] = useState<UserRole>('Citizen');
  const [language, setLanguage] = useState<Language>('en');

  // Structured Problem Statement Dossier Page State
  const [activeDossier, setActiveDossier] = useState<ProblemDossierData>({
    docketId: 'JAN-RAN-2025-8355',
    title: 'Deep Aquifer Arsenic Infiltration & Iron Precipitation in Namkum Block',
    district: 'Ranchi',
    block: 'Namkum (Kalyanpur Tola)',
    category: 'Drinking Water & Heavy Metals',
    dialect: 'Nagpuri',
    description: 'Handpump water exhibited 4.8 mg/L Iron (permissible BIS limit: 0.3 mg/L) and high turbidity (28 NTU). Water was dark reddish-brown, causing severe skin dermatitis and gastrointestinal distress.',
    timestamp: '20 Sep 2025',
  });

  // Modals & Drawers
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictStat | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitModalInitialData, setSubmitModalInitialData] = useState<{
    title?: string;
    category?: string;
    district?: string;
    block?: string;
    description?: string;
    photoUrl?: string;
    autoStartProcessing?: boolean;
  } | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS_DATA);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Keyboard shortcut for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenDossierPage = (dossierData: Partial<ProblemDossierData>) => {
    setActiveDossier((prev) => ({
      ...prev,
      ...dossierData,
      docketId: dossierData.docketId || 'JAN-RAN-2025-8355',
      title: dossierData.title || prev.title,
      district: dossierData.district || prev.district,
      block: dossierData.block || prev.block,
      category: dossierData.category || prev.category,
      dialect: dossierData.dialect || prev.dialect,
      description: dossierData.description || prev.description,
      photoUrl: dossierData.photoUrl || prev.photoUrl,
    }));
    setActiveTab('problem-dossier');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`✓ Opened Structured Problem Statement Dossier for Docket #${dossierData.docketId || 'JAN-RAN-2025-8355'}`);
  };

  const handleTabChange = (tab: ScreenTab) => {
    if (tab === 'submit-problem') {
      setSubmitModalInitialData(null);
      setIsSubmitModalOpen(true);
    } else {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleProblemSubmitSuccess = (ticket: { id: string; title: string; district: string }) => {
    showToast(`✓ Ticket ${ticket.id} successfully queued for AI validation in ${ticket.district}!`);
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `New Grievance Transmitted: ${ticket.id}`,
      description: ticket.title,
      timeAgo: 'Just now',
      severity: 'info',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleSelectQueueItem = (item: QueueItem) => {
    const matchedChallenge: Challenge = {
      id: item.refCode,
      title: item.title,
      category: 'Water & Environment',
      district: item.refCode.includes('RNC') ? 'Ranchi' : item.refCode.includes('DHN') ? 'Dhanbad' : 'Dumka',
      summary: item.summary,
      matchedLab: item.matchedInstitution,
      sponsoringBody: 'District Innovation Fund (DIC)',
      grantPool: '₹22,00,000',
      reportsCount: item.citizenReportsCount,
      status: 'Dept Validated',
      severity: item.severity,
      aiMatchScore: item.aiFitScore,
      fullDescription: item.summary + ' High priority validation assigned under statutory SLA protocols.'
    };
    setSelectedChallenge(matchedChallenge);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        userRole={userRole}
        onRoleChange={(role) => {
          setUserRole(role);
          showToast(`Switched perspective to: ${role}`);
        }}
        language={language}
        onLanguageChange={(lang) => {
          setLanguage(lang);
          showToast(lang === 'hi' ? 'भाषा बदलकर हिन्दी की गई' : 'Language set to English');
        }}
        unreadNotificationsCount={unreadCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onShowLoadingScreen={() => setIsLoading(true)}
        onShowToast={showToast}
      />

      {/* Website Loading Screen with Logo */}
      <LoadingScreen
        isLoading={isLoading}
        onFinished={() => setIsLoading(false)}
        language={language}
      />

      {/* Main Screen Content with Padding for fixed header */}
      <div className="pt-36 sm:pt-34 flex-1 flex flex-col">
        {/* Toast alert message */}
        {toastMessage && (
          <div className="fixed top-32 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3 border border-tertiary-fixed/30 animate-in fade-in slide-in-from-top-3 duration-300">
            <span className="material-symbols-outlined text-emerald-400 text-headline-sm">check_circle</span>
            <span className="font-label-md text-label-md font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* Home Screen (Citizen Portal - Jan Samadhan) */}
        {activeTab === 'home' && (
          <HomeScreen
            language={language}
            onOpenReportModal={(initData) => {
              setSubmitModalInitialData(initData || null);
              setIsSubmitModalOpen(true);
            }}
            onNavigateToChallenges={() => setActiveTab('challenges')}
            onSelectChallenge={(c) => setSelectedChallenge(c)}
            onNavigateToHeatmap={() => setActiveTab('state-heatmap')}
            onSelectDistrict={(d) => setSelectedDistrict(d)}
            onShowToast={showToast}
            onOpenTechnicalAudit={() => {
              showToast('Official 45-Day Turnaround Technical Audit PDF downloaded.');
            }}
            onRegisterLab={() => {
              showToast('University Lab Accreditation Portal opened for submission.');
            }}
            onPartnerCSR={() => {
              showToast('CSR Matching Grant Protocol opened for review.');
            }}
          />
        )}

        {/* Challenges / Command Center Screen (Image 1 / HTML 1) */}
        {activeTab === 'challenges' && (
          <CommandCenterScreen
            language={language}
            onOpenDistrictDossier={(d) => setSelectedDistrict(d)}
            onOpenCabinetBriefing={() => {
              showToast('State Cabinet Innovation Briefing (Q1 2025) PDF downloaded.');
            }}
            onViewGeoAudit={() => {
              showToast('Opening 24-District Geo-Audit telemetry cryptographic logs...');
            }}
            onAuthorizeGazette={() => {
              showToast('✓ State Gazette Release approved & signed by Special Secretary, Science & Tech.');
            }}
            onSelectQueueItem={handleSelectQueueItem}
            onNavigateToProjects={() => setActiveTab('projects')}
          />
        )}

        {/* State Heatmap Screen */}
        {activeTab === 'state-heatmap' && (
          <HeatmapScreen onSelectDistrict={(d) => setSelectedDistrict(d)} />
        )}

        {/* Projects Registry Screen */}
        {activeTab === 'projects' && (
          <ProjectsScreen
            onSelectChallenge={(c) => setSelectedChallenge(c)}
            onOpenReportModal={() => setIsSubmitModalOpen(true)}
          />
        )}

        {/* Innovation Impact Graph Screen */}
        {activeTab === 'innovation-impact-graph' && (
          <ImpactGraphScreen onNavigateToProjects={() => setActiveTab('projects')} />
        )}

        {/* Process Flow & Internal Workings (CPGRAMS Interactive Engine) */}
        {activeTab === 'process-flow' && (
          <ProcessFlowScreen
            language={language}
            onNavigateTab={handleTabChange}
            onOpenReportModal={() => {
              setSubmitModalInitialData(null);
              setIsSubmitModalOpen(true);
            }}
          />
        )}

        {/* Structured Problem Statement & Cluster Dossier Full Page */}
        {activeTab === 'problem-dossier' && (
          <ProblemDossierScreen
            language={language}
            dossier={activeDossier}
            onBackToHome={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToCommandCenter={() => {
              setActiveTab('challenges');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenSubmitProblem={() => {
              setSubmitModalInitialData(null);
              setIsSubmitModalOpen(true);
            }}
            onShowToast={showToast}
          />
        )}
      </div>

      {/* Global Modals & Drawers */}
      <SubmitProblemModal
        isOpen={isSubmitModalOpen}
        onClose={() => {
          setIsSubmitModalOpen(false);
          setSubmitModalInitialData(null);
        }}
        onSubmitSuccess={handleProblemSubmitSuccess}
        initialData={submitModalInitialData}
        onNavigateToCommandCenter={() => handleTabChange('challenges')}
        onOpenDossierPage={handleOpenDossierPage}
      />

      <DossierModal
        challenge={selectedChallenge}
        isOpen={!!selectedChallenge}
        onClose={() => setSelectedChallenge(null)}
        onApplyForGrant={() => {
          showToast(`Grant application package initiated for ${selectedChallenge?.id}.`);
        }}
      />

      <DistrictDossierModal
        district={selectedDistrict}
        isOpen={!!selectedDistrict}
        onClose={() => setSelectedDistrict(null)}
        onDeployRapidTeam={(distName) => {
          showToast(`Emergency Rapid Technical Team dispatched to ${distName} District Innovation Cell.`);
        }}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectChallenge={(c) => setSelectedChallenge(c)}
        onSelectDistrict={(d) => setSelectedDistrict(d)}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
          showToast('All notifications marked as read.');
        }}
        onClearNotification={(id) => {
          setNotifications((prev) => prev.filter((n) => n.id !== id));
        }}
      />

      {/* Global Gov Footer */}
      <Footer onNavigateTab={(tab) => handleTabChange(tab as ScreenTab)} />
    </div>
  );
}
