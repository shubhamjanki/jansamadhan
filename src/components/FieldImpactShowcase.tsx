import React, { useState } from 'react';
import { Language } from '../types';

interface FieldImpactShowcaseProps {
  language: Language;
  onOpenReportModal?: () => void;
}

interface ImpactCase {
  id: string;
  title: string;
  titleHi: string;
  district: string;
  block: string;
  university: string;
  leadScientist: string;
  category: string;
  beforeLabel: string;
  beforeLabelHi: string;
  beforeDesc: string;
  beforeImg: string;
  beforeMetric: string;
  afterLabel: string;
  afterLabelHi: string;
  afterDesc: string;
  afterImg: string;
  afterMetric: string;
  turnaroundDays: number;
  costPerUnit: string;
  beneficiariesCount: string;
  communityRating: number;
  quote: string;
  quoteAuthor: string;
}

const IMPACT_CASES: ImpactCase[] = [
  {
    id: 'case-namkum',
    title: 'Terracotta-Biochar Arsenic & Iron Filter Unit',
    titleHi: 'टेराकोटा-बायोचार आर्सेनिक एवं आयरन निस्यंदन संयंत्र',
    district: 'Ranchi',
    block: 'Namkum (Kalyanpur Tola)',
    university: 'BIT Mesra • Environmental Engineering Lab',
    leadScientist: 'Dr. Ananya Mukherjee, Head of Water Nanotech',
    category: 'Drinking Water & Heavy Metals',
    beforeLabel: 'Before Intervention (Ground Reality)',
    beforeLabelHi: 'समाधान से पूर्व (जमीनी स्थिति)',
    beforeDesc: 'Handpump water exhibited 4.8 mg/L Iron (permissible BIS limit: 0.3 mg/L) and high turbidity (28 NTU). Water was dark reddish-brown, causing severe skin dermatitis and gastrointestinal distress.',
    beforeImg: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
    beforeMetric: '28 NTU Turbidity • 4.8 mg/L Fe',
    afterLabel: 'Field-Tested Solution by BIT Mesra',
    afterLabelHi: 'बीआईटी मेसरा द्वारा विकसित व स्थापित समाधान',
    afterDesc: 'Localized gravity-fed filtration unit using clay-baked porous terracotta candles enriched with activated rice-husk biochar. 100% locally serviceable by village youth.',
    afterImg: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    afterMetric: '1.2 NTU Turbidity • 0.08 mg/L Fe (BIS Safe)',
    turnaroundDays: 38,
    costPerUnit: '₹420 / Household',
    beneficiariesCount: '160+ Tribal Households',
    communityRating: 4.9,
    quote: 'For 7 years we drank red water that stained our clothes and made children sick. BIT Mesra team lived with us for 5 days and set up filters that work without electricity.',
    quoteAuthor: 'Mangal Munda, Gram Pradhan, Kalyanpur Tola'
  },
  {
    id: 'case-torpa',
    title: 'Decentralized Phase-Change Solar Micro Cold Room',
    titleHi: 'सौर संचालित विकेंद्रीकृत मिनी कोल्ड स्टोरेज',
    district: 'Khunti',
    block: 'Torpa Block (Sundari Village)',
    university: 'IIT ISM Dhanbad • Thermal & Renewable Energy Lab',
    leadScientist: 'Prof. R. K. Soren, Dept. of Mechanical Engg',
    category: 'Agriculture & Post-Harvest Resilience',
    beforeLabel: 'Before Intervention (Crop Spoilage)',
    beforeLabelHi: 'समाधान से पूर्व (फसल बर्बादी)',
    beforeDesc: 'Smallholder organic tomato & green pea growers experienced 38% post-harvest spoilage within 48 hours of harvest due to lack of electricity and 45 km transit to commercial cold storages.',
    beforeImg: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    beforeMetric: '38% Harvest Lost • ₹8,400 Loss / Farmer',
    afterLabel: 'IIT ISM Dhanbad Solar Chilling Pod',
    afterLabelHi: 'आईआईटी धनबाद सौर ऊर्जा चालित कोल्ड पॉड',
    afterDesc: 'Thermal battery with PCM (Phase Change Material) eutectic plates maintaining 4°C for 22 continuous hours without grid power, constructed using locally sourced bamboo insulation.',
    afterImg: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    afterMetric: '96% Shelf Life Retention • 14-Day Storage',
    turnaroundDays: 42,
    costPerUnit: '₹1.85 Lakh (District Innovation Grant)',
    beneficiariesCount: '48 Smallholder Farmers',
    communityRating: 5.0,
    quote: 'Now we can store our harvest during market gluts and sell at fair prices when rates rise, increasing our household seasonal income by 40%.',
    quoteAuthor: 'Sunita Devi, Mahila Kisan Samiti, Torpa'
  },
  {
    id: 'case-tisra',
    title: 'Ultrasonic Electrostatic Fugitive Dust Suppressor',
    titleHi: 'अल्ट्रासोनिक इलेक्ट्रोस्टैटिक कोयला धूल शमन प्रणाली',
    district: 'Dhanbad',
    block: 'Jharia Coalfield (Tisra Settlement)',
    university: 'NIT Jamshedpur • Clean Air & Mining Sensors Lab',
    leadScientist: 'Dr. Vivek Sengupta, Aero-Environmental Engineering',
    category: 'Mining Pollution & Air Quality',
    beforeLabel: 'Before Intervention (Fugitive Coal Dust)',
    beforeLabelHi: 'समाधान से पूर्व (कोयला धूल प्रदूषण)',
    beforeDesc: 'Open-cast coal transport dumpers generated extreme PM2.5 levels (>380 µg/m³), choking primary school classrooms and residential settlements located along the unpaved transit haul corridor.',
    beforeImg: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80',
    beforeMetric: '382 µg/m³ PM2.5 • Severe Respiratory Risk',
    afterLabel: 'NIT Jamshedpur Ultrasonic Mist Battery',
    afterLabelHi: 'एनआईटी जमशेदपुर द्वारा स्थापित मिस्ट कैनन',
    afterDesc: 'Low-water high-frequency atomization cannons that charge micro-droplets electrostatically, agglomerating airborne sub-micron respirable coal particles at source with 85% less water consumption.',
    afterImg: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    afterMetric: '58 µg/m³ PM2.5 (84% Ambient Drop)',
    turnaroundDays: 34,
    costPerUnit: '₹3.20 Lakh (Coal Cess Innovation Fund)',
    beneficiariesCount: '3,200+ Residents & Students',
    communityRating: 4.8,
    quote: 'Our school windows used to be permanently covered in black soot. After NIT Jamshedpur installed the mist barriers, children can breathe freely without masks.',
    quoteAuthor: 'Birendra Hansda, Headmaster, Tisra Primary School'
  }
];

export const FieldImpactShowcase: React.FC<FieldImpactShowcaseProps> = ({
  language,
  onOpenReportModal,
}) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [viewMode, setViewMode] = useState<'slider' | 'sideBySide'>('slider');

  const currentCase = IMPACT_CASES[activeCaseIndex];

  return (
    <section id="impact-showcase" className="w-full py-12 px-4 sm:px-8 bg-surface-container-lowest border-b border-surface-container-high/60">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-500/15 text-emerald-800 uppercase tracking-wider">
                Proven Field Impact • Before & After
              </span>
              <span className="text-xs text-on-surface-variant font-medium">Avg. 41-Day Resolution Track Record</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-primary font-black tracking-tight text-2xl sm:text-3xl">
              {language === 'hi'
                ? 'जमीनी बदलाव: विश्वविद्यालय लैब द्वारा हल की गई वास्तविक समस्याएं'
                : 'Grassroots Transformations: University-Engineered Solutions in Action'}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-2xl">
              {language === 'hi'
                ? 'देखें कैसे BIT मेसरा, IIT धनबाद और NIT जमशेदपुर ने झारखंड के गांवों में औसतन 41 दिनों के भीतर पेयजल, सौर ऊर्जा और खनन प्रदूषण की समस्याओं का सफल वैज्ञानिक समाधान तैयार किया।'
                : 'Interactive before-and-after proof showing how premier research laboratories turned real community grievances into field-deployed, low-cost prototypes across Jharkhand.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            {/* View Mode Toggle */}
            <div className="bg-surface-container p-1 rounded-xl flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('slider')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  viewMode === 'slider'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Interactive Slider
              </button>
              <button
                type="button"
                onClick={() => setViewMode('sideBySide')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  viewMode === 'sideBySide'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Side-by-Side
              </button>
            </div>

            {onOpenReportModal && (
              <button
                type="button"
                onClick={onOpenReportModal}
                className="text-xs bg-secondary hover:bg-[#c2410c] text-white px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer border border-amber-400/30"
              >
                <span className="material-symbols-outlined text-[16px]">campaign</span>
                <span>{language === 'hi' ? 'अपनी समस्या भेजें' : 'Submit Problem for Lab'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Case Studies Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {IMPACT_CASES.map((item, idx) => {
            const isSelected = activeCaseIndex === idx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveCaseIndex(idx);
                  setSliderPosition(50);
                }}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-surface-container-lowest border-secondary shadow-md ring-2 ring-secondary/20'
                    : 'bg-surface border-surface-container-high hover:bg-surface-container-low hover:border-outline'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono font-bold text-secondary uppercase tracking-wider">
                    {item.district} • {item.block}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {item.turnaroundDays} Days Deployed
                  </span>
                </div>
                <h4 className="font-bold text-sm text-primary line-clamp-1">
                  {language === 'hi' ? item.titleHi : item.title}
                </h4>
                <p className="text-xs text-on-surface-variant mt-1 line-clamp-1 font-medium">
                  {item.university}
                </p>
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-surface-container-high text-[11px]">
                  <span className="text-on-surface-variant font-semibold">
                    {item.beneficiariesCount}
                  </span>
                  <span className="text-amber-700 font-bold flex items-center gap-0.5">
                    ★ {item.communityRating} / 5.0
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Showcase Stage */}
        <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-container-high shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Showcase (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {viewMode === 'slider' ? (
              /* Interactive Before/After Split Slider */
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-black select-none shadow-xl border border-surface-container-high">
                {/* After Image (Full Background) */}
                <img
                  src={currentCase.afterImg}
                  alt={currentCase.afterLabel}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Before Image (Clipped by sliderPosition) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={currentCase.beforeImg}
                    alt={currentCase.beforeLabel}
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%', height: '100%' }}
                  />
                  {/* Subtle Dark Vignette for contrast */}
                  <div className="absolute inset-0 bg-red-950/25" />
                </div>

                {/* Divider Line & Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 flex items-center justify-center"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-9 h-9 rounded-full bg-white text-primary shadow-xl border-2 border-primary flex items-center justify-center text-xs font-black">
                    <span className="material-symbols-outlined text-[18px]">drag_indicator</span>
                  </div>
                </div>

                {/* Range Input Overlay for Dragging */}
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                  aria-label="Drag to compare before and after"
                />

                {/* Floating Tags */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-red-950/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-xl border border-red-500/40 shadow-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    {language === 'hi' ? 'समस्या से पहले' : 'BEFORE: Unsafe Ground Reality'}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-emerald-950/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-xl border border-emerald-500/40 shadow-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    {language === 'hi' ? 'विश्वविद्यालय समाधान' : 'AFTER: University Prototype'}
                  </span>
                </div>

                {/* Bottom Metric Badges */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                  <div className="bg-black/70 backdrop-blur-md text-red-200 text-xs font-mono font-bold px-3 py-1.5 rounded-xl border border-white/10">
                    {currentCase.beforeMetric}
                  </div>
                  <div className="bg-emerald-900/90 backdrop-blur-md text-emerald-200 text-xs font-mono font-bold px-3 py-1.5 rounded-xl border border-emerald-400/30">
                    {currentCase.afterMetric}
                  </div>
                </div>
              </div>
            ) : (
              /* Side-by-Side Mode */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-black shadow-md border border-red-300">
                  <img
                    src={currentCase.beforeImg}
                    alt={currentCase.beforeLabel}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-between">
                    <span className="bg-red-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-md self-start">
                      BEFORE
                    </span>
                    <span className="font-mono text-xs text-red-200 font-bold">
                      {currentCase.beforeMetric}
                    </span>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden aspect-video bg-black shadow-md border border-emerald-300">
                  <img
                    src={currentCase.afterImg}
                    alt={currentCase.afterLabel}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-between">
                    <span className="bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-md self-start">
                      AFTER
                    </span>
                    <span className="font-mono text-xs text-emerald-200 font-bold">
                      {currentCase.afterMetric}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Slider Hint */}
            <div className="flex items-center justify-between text-xs text-on-surface-variant px-1">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-secondary">swipe</span>
                Drag the center slider left or right to inspect the field transformation
              </span>
              <span className="font-mono text-[11px] font-bold text-primary">
                Turnaround: {currentCase.turnaroundDays} Days
              </span>
            </div>
          </div>

          {/* Technical Narrative & Field Metrics (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-primary/10 text-primary uppercase tracking-wider">
                  {currentCase.category}
                </span>
                <span className="text-xs font-bold text-secondary">
                  {currentCase.block}, {currentCase.district}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-primary tracking-tight">
                {language === 'hi' ? currentCase.titleHi : currentCase.title}
              </h3>
            </div>

            {/* Academic Lab Specs */}
            <div className="bg-surface-container-low p-4 rounded-2xl border border-surface-container-high space-y-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">school</span>
                <span className="font-bold text-xs text-primary">{currentCase.university}</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Lead Investigator: <span className="font-semibold text-on-surface">{currentCase.leadScientist}</span>
              </p>
            </div>

            {/* Before vs After Text Comparison */}
            <div className="space-y-3 text-xs">
              <div className="bg-red-50/60 p-3 rounded-xl border border-red-200 text-red-950">
                <span className="font-bold block mb-1 uppercase tracking-wider text-[10px] text-red-800">
                  ⚠️ Citizen Challenge (Reported Ground Reality):
                </span>
                <p className="leading-relaxed">{currentCase.beforeDesc}</p>
              </div>

              <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200 text-emerald-950">
                <span className="font-bold block mb-1 uppercase tracking-wider text-[10px] text-emerald-800">
                  ✓ Scientific Solution Deployed:
                </span>
                <p className="leading-relaxed">{currentCase.afterDesc}</p>
              </div>
            </div>

            {/* Hard Metrics Row */}
            <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-surface-container-high text-center">
              <div className="bg-surface-container-lowest p-2.5 rounded-xl border border-surface-container-high">
                <span className="text-[10px] text-on-surface-variant font-bold block uppercase">Cost / Unit</span>
                <span className="text-xs font-black text-primary mt-0.5 block">{currentCase.costPerUnit}</span>
              </div>
              <div className="bg-surface-container-lowest p-2.5 rounded-xl border border-surface-container-high">
                <span className="text-[10px] text-on-surface-variant font-bold block uppercase">Turnaround</span>
                <span className="text-xs font-black text-secondary mt-0.5 block">{currentCase.turnaroundDays} Days</span>
              </div>
              <div className="bg-surface-container-lowest p-2.5 rounded-xl border border-surface-container-high">
                <span className="text-[10px] text-on-surface-variant font-bold block uppercase">Community</span>
                <span className="text-xs font-black text-emerald-700 mt-0.5 block">★ {currentCase.communityRating} / 5</span>
              </div>
            </div>

            {/* Field Testimonial Quote */}
            <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-surface-container-high/80 relative">
              <span className="material-symbols-outlined text-secondary/30 text-3xl absolute top-2 right-2 select-none">format_quote</span>
              <p className="text-xs text-on-surface italic leading-relaxed pr-6">
                "{currentCase.quote}"
              </p>
              <div className="mt-2 text-[11px] font-bold text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-emerald-600">verified</span>
                <span>{currentCase.quoteAuthor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
