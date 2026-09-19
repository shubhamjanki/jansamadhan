import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import logoImg from '../assets/images/jan_samadhan_logo_1789843668705.jpg';

interface LoadingScreenProps {
  isLoading: boolean;
  onFinished?: () => void;
  language?: Language;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading,
  onFinished,
  language = 'en',
}) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const statusMessagesEn = [
    'Initializing Jan Samadhan State Telemetry Grid...',
    'Connecting 24 District Innovation Cells & GIS Sensors...',
    'Linking 42 Technical University Labs (BIT Mesra, IIT ISM, NIT)...',
    'Calibrating Vernacular Voice Models (Santali, Ho, Mundari, Khortha)...',
    'Calibrating Avg. 41-Day Resolution Tracking Protocol...',
    'Portal Ready. Welcoming Citizen...'
  ];

  const statusMessagesHi = [
    'जन समाधान राज्य टेलीमेट्री ग्रिड प्रारंभ हो रहा है...',
    '24 जिला नवाचार केंद्र एवं जीआईएस सैटेलाइट लिंक सक्रिय...',
    '42 तकनीकी विश्वविद्यालय प्रयोगशालाएं (बीआईटी मेसरा, आईआईटी धनबाद, एनआईटी) संयोजित...',
    'मातृभाषा वॉयस इंजन (संथाली, हो, मुंडारी, खोरठा, नागपुरी) तैयार...',
    'औसत 41-दिवसीय समाधान प्रोटोकॉल सत्यापित...',
    'जन समाधान पोर्टल तैयार। स्वागत है...'
  ];

  const statusMessages = language === 'hi' ? statusMessagesHi : statusMessagesEn;

  useEffect(() => {
    if (!isLoading) return;

    setProgress(0);
    setStatusIndex(0);
    setIsFadingOut(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatusIndex(5);
          // Allow the citizen to see 100% loaded before fading out smoothly
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              onFinished?.();
            }, 700);
          }, 650);
          return 100;
        }

        // Smooth and steady progress increments (~3.5 to 4.2 seconds total duration)
        const increment =
          prev < 30
            ? Math.floor(Math.random() * 4) + 3
            : prev < 75
            ? Math.floor(Math.random() * 5) + 2
            : prev < 95
            ? Math.floor(Math.random() * 4) + 2
            : 1;

        const next = Math.min(100, prev + increment);

        // Update status text milestone across all 6 milestones
        if (next >= 98) setStatusIndex(5);
        else if (next >= 78) setStatusIndex(4);
        else if (next >= 58) setStatusIndex(3);
        else if (next >= 38) setStatusIndex(2);
        else if (next >= 18) setStatusIndex(1);
        else setStatusIndex(0);

        return next;
      });
    }, 130);

    return () => clearInterval(interval);
  }, [isLoading, onFinished]);

  if (!isLoading && !isFadingOut) return null;

  return (
    <div
      id="jan-samadhan-loading-screen"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#071A2B] text-white transition-opacity duration-600 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient background particles & grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#fed7aa_1px,transparent_1px)] [background-size:28px_28px]"></div>
      
      {/* Saffron & Green Patriotic Glow Orbs */}
      <div className="absolute w-96 h-96 rounded-full bg-[#FF9933]/25 blur-3xl pointer-events-none -top-12 -left-12 animate-pulse"></div>
      <div className="absolute w-96 h-96 rounded-full bg-[#138808]/20 blur-3xl pointer-events-none -bottom-12 -right-12 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        {/* Animated Emblem Logo Container */}
        <div className="relative mb-6">
          {/* Outer Pulsing Indian Tricolor Rotating Ring */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-[#FF9933] via-white to-[#138808] opacity-80 blur-md animate-spin" style={{ animationDuration: '7s' }}></div>
          
          {/* Secondary pulsating ring */}
          <div className="absolute -inset-1.5 rounded-full border border-amber-300/50 animate-ping opacity-30"></div>

          {/* Logo Card */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1.5 bg-[#0b243b] border-2 border-amber-400/40 shadow-2xl overflow-hidden flex items-center justify-center">
            <img
              src={logoImg}
              alt="Jan Samadhan Official Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full transition-transform hover:scale-105"
            />
          </div>

          {/* Indian Flag Badge */}
          <div className="absolute bottom-0 right-0 bg-[#07192f] text-white p-1 rounded-full border-2 border-amber-400 shadow-md flex items-center justify-center text-xs">
            🇮🇳
          </div>
        </div>

        {/* Portal Titles */}
        <div className="flex items-center gap-2 mb-1.5 flex-wrap justify-center">
          <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
            सत्यमेव जयते
          </span>
          <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full bg-white/10 text-white border border-white/15">
            {language === 'hi' ? 'झारखण्ड सरकार' : 'Govt. of Jharkhand'}
          </span>
        </div>

        <h1 className="font-display-lg text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
          JAN SAMADHAN
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-amber-100 tracking-wide mt-1">
          {language === 'hi' 
            ? 'जन सेवा ही देश सेवा • राष्ट्र निर्माण में नागरिक भागीदारी' 
            : 'Citizen Service is National Service • Nation Building Through Innovation'
          }
        </p>

        {/* Indian Tricolor Dynamic Progress Bar */}
        <div className="w-full mt-8 flex flex-col gap-2">
          <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden p-0.5 border border-white/20 backdrop-blur-xs">
            <div
              className="bg-gradient-to-r from-[#FF9933] via-white to-[#138808] h-full rounded-full transition-all duration-150 shadow-[0_0_12px_rgba(255,153,51,0.7)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-amber-200/90 px-1">
            <span>{progress}% Initializing Civic Registry</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Secure NIC Cloud
            </span>
          </div>
        </div>

        {/* Rotating Telemetry Subtitle */}
        <div className="h-10 mt-3 flex items-center justify-center">
          <p className="text-xs text-white/80 font-medium italic transition-all duration-300 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-cyan-400 animate-spin" style={{ animationDuration: '2s' }}>
              sync
            </span>
            <span>{statusMessages[statusIndex]}</span>
          </p>
        </div>

        {/* Skip Button for seamless user flow */}
        <button
          type="button"
          onClick={() => {
            setIsFadingOut(true);
            setTimeout(() => {
              onFinished?.();
            }, 300);
          }}
          className="mt-6 text-[11px] text-white/60 hover:text-white uppercase tracking-wider px-3 py-1 rounded border border-white/10 hover:border-white/30 transition-all cursor-pointer"
        >
          {language === 'hi' ? 'सीधे पोर्टल पर जाएं (Skip)' : 'Enter Portal Now (Skip)'}
        </button>
      </div>
    </div>
  );
};
