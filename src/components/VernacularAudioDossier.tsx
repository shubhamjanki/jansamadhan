import React, { useState, useEffect, useRef } from 'react';

interface VernacularAudioDossierProps {
  docketId: string;
  title: string;
  district: string;
  block?: string;
  category?: string;
  initialDialect?: string;
}

export const VernacularAudioDossier: React.FC<VernacularAudioDossierProps> = ({
  docketId,
  title,
  district,
  block,
  category,
  initialDialect = 'Santali',
}) => {
  const [selectedDialect, setSelectedDialect] = useState<string>(initialDialect);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0); // 0 to 100
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const animationFrameRef = useRef<number | null>(null);

  const dialectTexts: Record<string, { label: string; script: string; englishMeaning: string }> = {
    Santali: {
      label: 'ᱥᱟᱱᱛᱟᱲᱤ (Santali)',
      script: 'ᱡᱚᱦᱟᱨ! ᱟᱢᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱨᱮᱡᱤᱥᱴᱟᱨ ᱮᱱᱟ Docket #' + docketId + ' ᱨᱮ᱾ ᱵᱤᱴ ᱢᱮᱥᱨᱟ ᱨᱤᱱ ᱥᱟᱬᱮᱥᱤᱭᱟᱹ ᱠᱚ ' + (block || 'ᱱᱟᱢᱠᱩᱢ') + ' ᱦᱤᱡᱩᱜ ᱠᱟᱱᱟ ᱫᱟᱜ ᱯᱟᱨᱠᱷᱟᱣ ᱞᱟᱹᱜᱤᱫ᱾ ᱔᱕ ᱢᱟᱦᱟᱸ ᱨᱮ ᱱᱟᱣᱟ ᱯᱷᱤᱞᱴᱟᱨ ᱞᱟᱜᱟᱣᱜ-ᱟ᱾',
      englishMeaning: 'Johar! Your problem has been registered under Docket #' + docketId + '. BIT Mesra scientists are coming to ' + (block || 'Namkum') + ' for water testing. Resolution typically takes around 41 days.',
    },
    Ho: {
      label: 'ᱦᱳ (Ho)',
      script: 'ᱡᱚᱦᱟᱨ! ᱟᱯᱮᱭᱟᱜ ᱫᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱨᱮᱡᱤᱥᱴᱟᱨ ᱟᱠᱟᱱᱟ Docket #' + docketId + ' ᱨᱮ᱾ ' + district + ' ᱨᱮ ᱵᱤᱴ ᱢᱮᱥᱨᱟ ᱴᱤᱢ ᱥᱮᱱ ᱠᱟᱛᱮ ᱪᱟᱯᱟᱠᱚᱞ ᱥᱩᱫᱷᱟᱹᱨᱟ᱾',
      englishMeaning: 'Johar! Your water problem is registered under Docket #' + docketId + '. BIT Mesra team is coming to ' + district + ' to remediate the tubewell.',
    },
    Nagpuri: {
      label: 'नागपुरी (Nagpuri)',
      script: 'जोहार! रउरे कर समस्या डॉकेट नंबर ' + docketId + ' में दर्ज हो गेलक हे। ' + (block || 'नामकुम') + ' में लाल पानी कर जांच करे खातिर बीआईटी मेसरा कर प्रोफेसर मन आईत। औसतन ४१ दिन में नया फिल्टर तैयार होई।',
      englishMeaning: 'Johar! Your problem is registered under docket ' + docketId + '. BIT Mesra professors are visiting ' + (block || 'Namkum') + ' to inspect red water. New filter ready in ~41 days on average.',
    },
    Khortha: {
      label: 'खोरठा (Khortha)',
      script: 'जोहार! तोहर समस्या सरकारी खाता में लिखल गेलौ Docket #' + docketId + '। ' + district + ' जिला के पानी जांचे खातिर इंजीनियर लोग आवैत हाथ। औसतन ४१ दिन में समाधान मिली।',
      englishMeaning: 'Johar! Your grievance has been recorded in the state ledger Docket #' + docketId + '. Engineers are visiting ' + district + ' for testing. Resolution in ~41 days on average.',
    },
    Mundari: {
      label: 'मुंडारी (Mundari)',
      script: 'जोहार! आमाः दुखड़ा Docket #' + docketId + ' रे दर्ज एना। बीआईटी मेसरा ' + (block || 'नामकुम') + ' रे सेतेर केते नया टेक्नोलॉजी फिल्टर बईतेया।',
      englishMeaning: 'Johar! Your complaint is registered in Docket #' + docketId + '. BIT Mesra will arrive in ' + (block || 'Namkum') + ' to set up new technology filters.',
    },
    Hindi: {
      label: 'हिंदी (Hindi)',
      script: 'जोहार! आपकी शिकायत डॉकेट संख्या ' + docketId + ' के तहत दर्ज कर ली गई है। ' + district + ' के ' + (block || 'नामकुम') + ' क्षेत्र में जल प्रदूषण की जांच हेतु बीआईटी मेसरा की प्रयोगशाला को जिम्मेदारी दी गई है। औसतन ४१ दिनों के भीतर समाधान स्थापित होगा।',
      englishMeaning: 'Johar! Your grievance is logged under Docket ' + docketId + '. BIT Mesra laboratory is tasked with testing water contamination in ' + district + '. Resolution in ~41 days on average.',
    },
  };

  const currentDialect = dialectTexts[selectedDialect] || dialectTexts['Hindi'];

  const togglePlayback = () => {
    if (isPlaying) {
      window.speechSynthesis?.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);

      // Try browser speech synthesis for Hindi/Indian English or simulated loop
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(currentDialect.script);
        utterance.rate = playbackRate;
        utterance.lang = selectedDialect === 'Hindi' || selectedDialect === 'Nagpuri' ? 'hi-IN' : 'en-IN';
        utterance.onend = () => {
          setIsPlaying(false);
          setPlaybackProgress(0);
        };
        window.speechSynthesis.speak(utterance);
      }

      // Progress animation loop
      const startTime = Date.now();
      const duration = 14000 / playbackRate; // 14 seconds

      const tick = () => {
        const elapsed = Date.now() - startTime;
        const p = Math.min(100, (elapsed / duration) * 100);
        setPlaybackProgress(p);

        if (p < 100) {
          animationFrameRef.current = requestAnimationFrame(tick);
        } else {
          setIsPlaying(false);
          setPlaybackProgress(0);
        }
      };
      animationFrameRef.current = requestAnimationFrame(tick);
    }
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div className="bg-surface-container-low p-4 sm:p-5 rounded-2xl border border-surface-container-high space-y-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-container-high pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">volume_up</span>
          </div>
          <div>
            <h5 className="font-bold text-sm text-primary flex items-center gap-1.5">
              <span>Vernacular Audio Dossier (मातृभाषा ऑडियो विवरण)</span>
              <span className="text-[10px] font-bold bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">
                AI Voice Readout
              </span>
            </h5>
            <p className="text-[11px] text-on-surface-variant">
              Listen to the official complaint summary in native tribal and regional dialects
            </p>
          </div>
        </div>

        {/* Dialect Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {Object.keys(dialectTexts).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                if (isPlaying) {
                  window.speechSynthesis?.cancel();
                  setIsPlaying(false);
                }
                setSelectedDialect(key);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedDialect === key
                  ? 'bg-secondary text-on-secondary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Script Quote Box with Soundwaves */}
      <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">
              {currentDialect.label}:
            </span>
            <p className="text-sm font-medium text-primary leading-relaxed">
              "{currentDialect.script}"
            </p>
            <p className="text-[11px] text-on-surface-variant mt-1.5 italic">
              Meaning: {currentDialect.englishMeaning}
            </p>
          </div>

          {/* Equalizer Waveform Bars */}
          <div className="flex items-end gap-1 h-8 shrink-0 px-2 py-1 bg-surface-container rounded-lg">
            {[40, 75, 100, 60, 90, 45, 80, 65, 95, 50, 85].map((height, i) => (
              <span
                key={i}
                className="w-1 bg-secondary rounded-full transition-all duration-150"
                style={{
                  height: isPlaying ? `${Math.max(15, Math.round(height * Math.random()))}%` : '20%',
                }}
              />
            ))}
          </div>
        </div>

        {/* Audio Player Controls */}
        <div className="flex items-center gap-3 pt-2 border-t border-surface-container-high/60">
          <button
            type="button"
            onClick={togglePlayback}
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-white transition-all shadow-md cursor-pointer ${
              isPlaying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-secondary hover:bg-secondary/90'
            }`}
            title={isPlaying ? 'Pause Audio' : 'Play Vernacular Voice'}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          {/* Progress Bar */}
          <div className="flex-1">
            <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
              <div
                className="bg-secondary h-full rounded-full transition-all duration-100"
                style={{ width: `${playbackProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-on-surface-variant mt-1">
              <span>{isPlaying ? 'Speaking ' + selectedDialect + '...' : '0:00'}</span>
              <span>0:14</span>
            </div>
          </div>

          {/* Speed Toggle */}
          <button
            type="button"
            onClick={() => setPlaybackRate((prev) => (prev === 1.0 ? 1.25 : prev === 1.25 ? 0.8 : 1.0))}
            className="text-[11px] font-mono font-bold text-on-surface-variant bg-surface-container px-2 py-1 rounded-lg hover:text-on-surface cursor-pointer"
            title="Toggle playback speed"
          >
            {playbackRate}x
          </button>
        </div>
      </div>
    </div>
  );
};
