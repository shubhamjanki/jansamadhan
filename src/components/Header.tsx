import React, { useState } from 'react';
import { ScreenTab, UserRole, Language } from '../types';
import { RuralOfflineQueueBanner } from './RuralOfflineQueueBanner';
import logoImg from '../assets/images/jan_samadhan_logo_1789843668705.jpg';

interface HeaderProps {
  activeTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  onOpenSearch: () => void;
  onShowLoadingScreen?: () => void;
  onShowToast?: (msg: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  userRole,
  onRoleChange,
  language,
  onLanguageChange,
  unreadNotificationsCount,
  onOpenNotifications,
  onOpenSearch,
  onShowLoadingScreen,
  onShowToast,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { key: ScreenTab; labelEn: string; labelHi: string }[] = [
    { key: 'home',                    labelEn: 'Home',              labelHi: 'होम' },
    { key: 'process-flow',            labelEn: 'Process Flow',      labelHi: 'प्रक्रिया प्रवाह' },
    { key: 'challenges',              labelEn: 'Challenges',        labelHi: 'चुनौतियां' },
    { key: 'submit-problem',          labelEn: 'Submit Problem',    labelHi: 'समस्या दर्ज करें' },
    { key: 'state-heatmap',           labelEn: 'State Heatmap',     labelHi: 'राज्य हीटमैप' },
    { key: 'innovation-impact-graph', labelEn: 'Impact Graph',      labelHi: 'इम्पैक्ट ग्राफ़' },
    { key: 'projects',                labelEn: 'Projects',          labelHi: 'परियोजनाएं' },
    ...(activeTab === 'problem-dossier'
      ? [{ key: 'problem-dossier' as ScreenTab, labelEn: 'Problem Dossier', labelHi: 'समस्या डोज़ियर' }]
      : []),
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-paper border-b border-ink-faint">
      {/* Indian National Tricolor Ribbon */}
      <div className="tricolor-ribbon" aria-hidden="true" />

      {/* Government Attribution Bar */}
      <div
        className="bg-primary text-on-primary px-4 sm:px-8 py-1.5"
        role="banner"
        aria-label="Government of Jharkhand official portal"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap type-label text-[10px]"
               style={{ color: '#A8C8E4', letterSpacing: '0.08em' }}>
            <span className="font-semibold" style={{ color: '#FDDDC8' }}>सत्यमेव जयते</span>
            <span className="opacity-30" aria-hidden="true">—</span>
            <span>{language === 'hi' ? 'झारखण्ड सरकार' : 'Government of Jharkhand'}</span>
            <span className="opacity-30 hidden sm:inline" aria-hidden="true">—</span>
            <span className="hidden sm:inline opacity-80">
              {language === 'hi' ? 'उच्च एवं तकनीकी शिक्षा विभाग' : 'Dept. of Higher & Technical Education'}
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0 type-label text-[10px]" style={{ color: '#A8C8E4' }}>
            <span className="flex items-center gap-1" style={{ color: '#7ED8A0' }}>
              <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <span className="hidden sm:inline">
                {language === 'hi' ? 'आधिकारिक पोर्टल' : 'Official Portal'}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Offline Queue Banner */}
      <RuralOfflineQueueBanner onShowToast={onShowToast} />

      {/* Main Navigation Bar */}
      <nav
        className="h-16 px-4 sm:px-8 flex items-center justify-between gap-4 bg-paper"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <button
          onClick={() => onTabChange('home')}
          id="brand-logo-button"
          className="flex items-center gap-3 shrink-0 cursor-pointer group"
          aria-label="Jan Samadhan — Home"
        >
          <div className="relative">
            <img
              alt="Jan Samadhan emblem"
              className="h-9 w-9 rounded-full object-cover border border-ink-faint"
              src={logoImg}
            />
            <span
              className="absolute -bottom-0.5 -right-0.5 text-[9px] leading-none"
              aria-hidden="true"
            >🇮🇳</span>
          </div>
          <div className="flex flex-col items-start gap-0">
            <span
              className="font-semibold text-primary leading-none tracking-tight text-sm"
              style={{ fontFamily: "'Noto Sans', sans-serif" }}
            >
              JAN SAMADHAN
            </span>
            <span
              className="type-label text-[9px]"
              style={{ color: '#8C7C62' }}
            >
              {language === 'hi' ? 'नागरिक समस्या निवारण मंच' : 'Citizen Grievance Portal · Jharkhand'}
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-0.5" role="navigation">
          {navItems.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onTabChange(item.key)}
                id={`nav-link-${item.key}`}
                aria-current={isActive ? 'page' : undefined}
                className="px-3 py-1.5 text-sm transition-colors relative"
                style={{
                  fontFamily: "'Noto Sans', sans-serif",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#0A1F35' : '#5C5042',
                  borderBottom: isActive ? '2px solid #E8590A' : '2px solid transparent',
                  borderRadius: 0,
                  background: 'transparent',
                }}
              >
                {language === 'hi' ? item.labelHi : item.labelEn}
              </button>
            );
          })}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Primary CTA — full on sm+, icon-only on mobile */}
          <button
            onClick={() => onTabChange('submit-problem')}
            id="header-register-problem-cta"
            className="btn-primary py-2 px-3 sm:px-4 text-sm inline-flex"
          >
            <span className="material-symbols-outlined text-[16px]">campaign</span>
            <span className="hidden sm:inline">{language === 'hi' ? 'समस्या दर्ज करें' : 'Register Problem'}</span>
          </button>

          {/* Search */}
          <button
            onClick={onOpenSearch}
            id="global-search-trigger"
            className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-ink-faint text-sm cursor-pointer"
            style={{
              borderRadius: '4px',
              background: '#EDE4D3',
              color: '#5C5042',
              fontFamily: "'Noto Sans', sans-serif",
            }}
            aria-label="Search"
          >
            <span className="material-symbols-outlined text-[16px]">search</span>
            <span className="text-[13px] pr-2">{language === 'hi' ? 'खोजें...' : 'Search...'}</span>
            <kbd
              className="text-[10px] font-mono px-1.5 py-0.5 border border-ink-faint"
              style={{ borderRadius: '2px', background: '#F5EFE3' }}
            >⌘K</kbd>
          </button>

          {/* Language Toggle */}
          <div
            className="flex items-center border border-ink-faint"
            style={{ borderRadius: '4px', background: '#F5EFE3' }}
            role="group"
            aria-label="Language selector"
          >
            <button
              onClick={() => onLanguageChange('en')}
              className="px-2.5 py-1.5 text-xs transition-colors"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: language === 'en' ? 500 : 400,
                color: language === 'en' ? '#E8590A' : '#8C7C62',
                background: 'transparent',
                borderRight: '1px solid #D4C4A8',
              }}
              aria-pressed={language === 'en'}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className="px-2.5 py-1.5 text-xs transition-colors"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: language === 'hi' ? 500 : 400,
                color: language === 'hi' ? '#E8590A' : '#8C7C62',
                background: 'transparent',
              }}
              aria-pressed={language === 'hi'}
            >
              हि
            </button>
          </div>

          {/* Notifications */}
          <button
            onClick={onOpenNotifications}
            id="notifications-bell-button"
            className="relative p-2 cursor-pointer transition-colors"
            style={{ color: '#5C5042', borderRadius: '4px' }}
            aria-label={`Notifications${unreadNotificationsCount > 0 ? ` (${unreadNotificationsCount} unread)` : ''}`}
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span
                className="absolute top-1 right-1 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold"
                style={{ background: '#B91C1C', fontFamily: "'DM Mono', monospace" }}
                aria-hidden="true"
              >
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Loading screen trigger */}
          {onShowLoadingScreen && (
            <button
              onClick={onShowLoadingScreen}
              id="relaunch-loading-screen-button"
              className="p-2 cursor-pointer transition-colors"
              style={{ color: '#5C5042', borderRadius: '4px' }}
              aria-label={language === 'hi' ? 'लोडिंग स्क्रीन देखें' : 'View Loading Screen'}
            >
              <span className="material-symbols-outlined text-[18px]">cached</span>
            </button>
          )}

          {/* Role Switcher */}
          <div
            className="hidden lg:flex items-center border border-ink-faint"
            style={{ borderRadius: '4px', background: '#EDE4D3' }}
            id="role-switcher"
            role="group"
            aria-label="Role selector"
          >
            {(['Citizen', 'Dept. Officer', 'Institution PI'] as UserRole[]).map((role, i) => (
              <button
                key={role}
                onClick={() => onRoleChange(role)}
                aria-pressed={userRole === role}
                className="px-2.5 py-1.5 text-[11px] transition-colors"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: userRole === role ? 500 : 400,
                  color: userRole === role ? '#0A1F35' : '#8C7C62',
                  background: userRole === role ? '#F5EFE3' : 'transparent',
                  borderRight: i < 2 ? '1px solid #D4C4A8' : 'none',
                  borderRadius: 0,
                }}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 cursor-pointer"
            style={{ color: '#5C5042', borderRadius: '4px' }}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="xl:hidden border-t border-ink-faint px-4 py-4 flex flex-col gap-3"
          style={{ background: '#F5EFE3' }}
        >
          {/* Mobile CTA: Register Problem */}
          <button
            onClick={() => { onTabChange('submit-problem'); setMobileMenuOpen(false); }}
            className="w-full btn-primary py-3 px-4 text-sm justify-center"
          >
            <span className="material-symbols-outlined text-[16px]">campaign</span>
            {language === 'hi' ? 'समस्या दर्ज करें' : 'Register Problem'}
          </button>

          {/* Search trigger for mobile */}
          <button
            onClick={() => { onOpenSearch(); setMobileMenuOpen(false); }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 border border-ink-faint text-sm cursor-pointer"
            style={{
              borderRadius: '4px',
              background: '#EDE4D3',
              color: '#5C5042',
              fontFamily: "'Noto Sans', sans-serif",
            }}
          >
            <span className="material-symbols-outlined text-[16px]">search</span>
            <span className="text-[13px]">{language === 'hi' ? 'खोजें...' : 'Search Jan Samadhan...'}</span>
          </button>

          {/* Role switcher mobile */}
          <div className="flex items-center gap-1 pb-3 border-b border-ink-faint overflow-x-auto">
            <span className="type-label mr-2 shrink-0" style={{ color: '#8C7C62' }}>Role:</span>
            {(['Citizen', 'Dept. Officer', 'Institution PI'] as UserRole[]).map((role) => (
              <button
                key={role}
                onClick={() => onRoleChange(role)}
                aria-pressed={userRole === role}
                className="text-[11px] px-2 py-1 cursor-pointer shrink-0"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  background: userRole === role ? '#0A1F35' : '#EDE4D3',
                  color: userRole === role ? '#FFFFFF' : '#5C5042',
                  borderRadius: '4px',
                  border: '1px solid #D4C4A8',
                }}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Nav links mobile */}
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => { onTabChange(item.key); setMobileMenuOpen(false); }}
                aria-current={activeTab === item.key ? 'page' : undefined}
                className="text-left px-3 py-2.5 text-sm cursor-pointer"
                style={{
                  fontFamily: "'Noto Sans', sans-serif",
                  fontWeight: activeTab === item.key ? 600 : 400,
                  background: activeTab === item.key ? '#0A1F35' : '#EDE4D3',
                  color: activeTab === item.key ? '#FFFFFF' : '#2C2218',
                  borderRadius: '4px',
                  border: '1px solid #D4C4A8',
                }}
              >
                {language === 'hi' ? item.labelHi : item.labelEn}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
