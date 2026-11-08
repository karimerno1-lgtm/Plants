import React, { useState } from 'react';
import { AdSlot } from '../components/ads/AdSlot';
import { Search, Droplets, Sun, Box, Layers, Activity, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, BookOpen, Compass, Mail, Leaf, Stethoscope } from 'lucide-react';
import { TOOLS_DATA } from '../data/tools';
import { PLANTS_DATA } from '../data/plants';
import { GUIDES_DATA } from '../data/guides';
import { BotanicalImage } from '../components/ui/BotanicalImage';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenSearch }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-b from-[#EAF1EC]/90 via-[#F7F7F0] to-[#F7F7F0] border border-stone-200/80 p-6 sm:p-12 lg:p-16">
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/60 text-emerald-900 text-xs font-semibold tracking-wide shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Science-Backed Indoor Botanical Laboratory</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-editorial text-stone-900 tracking-tight leading-tight sm:leading-none">
            Precision Tools for Thriving Houseplants.
          </h1>

          <p className="text-sm sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Stop guessing with rigid calendar schedules. Calculate accurate soil drying intervals, measure window foot-candles, formulate chunky aroid mixes, and diagnose symptoms instantly.
          </p>

          {/* Search Bar Callout */}
          <div className="pt-2 max-w-xl mx-auto">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white border border-stone-300 shadow-md hover:border-emerald-600/70 hover:shadow-lg transition-all text-left text-sm text-stone-400 cursor-pointer group"
            >
              <span className="flex items-center gap-3">
                <Search className="w-5 h-5 text-emerald-800" />
                <span className="text-stone-700 font-medium group-hover:text-stone-900">
                  Search plants, calculators, or problems (e.g. "Monstera watering")...
                </span>
              </span>
              <kbd className="hidden sm:inline-block rounded-md bg-stone-100 px-2 py-1 text-xs font-mono text-stone-500">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Hero CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('/tools/plant-watering-calculator')}
              className="px-6 py-3.5 rounded-xl bg-[#315B43] hover:bg-[#254A36] text-white text-sm font-bold shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Droplets className="w-4 h-4 text-emerald-300" />
              Watering Calculator
            </button>
            <button
              onClick={() => onNavigate('/tools/plant-problem-checker')}
              className="px-6 py-3.5 rounded-xl bg-amber-50 hover:bg-amber-100/90 border border-amber-300/80 text-amber-950 text-sm font-bold shadow-xs active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Stethoscope className="w-4 h-4 text-amber-700" />
              Symptom Checker
            </button>
            <button
              onClick={() => onNavigate('/plants')}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-sm font-semibold shadow-xs active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Leaf className="w-4 h-4 text-emerald-800" />
              Plant Library
            </button>
          </div>

          {/* Botanical Trust Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-stone-500">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              100% Free Tools
            </span>
            <span className="hidden sm:inline text-stone-300">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              Inverse-Square Light Physics
            </span>
            <span className="hidden sm:inline text-stone-300">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              ASPCA Pet Toxicity Standards
            </span>
          </div>
        </div>
      </section>

      {/* AdSense Placement 1: Responsive Display after Hero */}
      <AdSlot type="responsive" />

      {/* 2. Popular Plant Care Calculators Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800">
              <Sparkles className="w-4 h-4" /> Interactive Suite
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 mt-1">
              Popular Botanical Calculators
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/tools')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            View All 8 Tools <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOOLS_DATA.slice(0, 4).map(tool => (
            <div
              key={tool.slug}
              onClick={() => onNavigate(`/tools/${tool.slug}`)}
              className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs hover:shadow-md hover:border-emerald-600/50 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-[#315B43] group-hover:text-white transition-colors">
                    {tool.slug.includes('watering') && <Droplets className="w-5 h-5" />}
                    {tool.slug.includes('light') && <Sun className="w-5 h-5" />}
                    {tool.slug.includes('pot') && <Box className="w-5 h-5" />}
                    {tool.slug.includes('soil') && <Layers className="w-5 h-5" />}
                  </div>
                  {tool.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-700">
                      {tool.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-950 mb-1.5">
                  {tool.shortTitle}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800 group-hover:text-emerald-950">
                <span>Launch Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Indoor Plants Database */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800">
              <Leaf className="w-4 h-4" /> Botanical Encyclopedia
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 mt-1">
              Featured Indoor Plant Profiles
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/plants')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            Browse All 10 Plants <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANTS_DATA.slice(0, 4).map(plant => (
            <div
              key={plant.slug}
              onClick={() => onNavigate(`/plants/${plant.slug}`)}
              className="rounded-2xl border border-stone-200/80 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <BotanicalImage
                  src={plant.imageUrl}
                  alt={plant.imageAlt}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-xs text-stone-900 shadow-2xs">
                  {plant.difficulty}
                </span>
                {plant.petToxicity.toxicToCats && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100/90 text-amber-900 backdrop-blur-xs">
                    Toxic to Pets
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-950">
                    {plant.name}
                  </h3>
                  <p className="text-xs font-serif italic text-stone-400 mb-2">
                    {plant.botanicalName}
                  </p>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {plant.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 grid grid-cols-2 gap-2 text-[11px] text-stone-500">
                  <div>☀️ {plant.light.ideal.split(';')[0]}</div>
                  <div>💧 {plant.watering.frequency.split(';')[0]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Educational Botany Section */}
      <section className="rounded-3xl border border-stone-200 bg-linear-to-br from-[#FAF9F5] via-white to-[#EAF1EC]/40 p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-800">
            Horticultural Science
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 mt-1">
            The 4 Biological Pillars of Houseplant Longevity
          </h2>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">
            Indoor plants do not fail from a lack of "green thumb." They fail when physical environmental conditions fall out of biological equilibrium.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-stone-200/70 shadow-xs space-y-2">
            <div className="text-xl">💧</div>
            <h3 className="font-bold text-sm text-stone-900">1. Transpiration Equilibrium</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Roots only absorb water in response to water vapor evaporating from foliage stomata. Low light drastically stalls transpiration.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-stone-200/70 shadow-xs space-y-2">
            <div className="text-xl">🪴</div>
            <h3 className="font-bold text-sm text-stone-900">2. Substrate Porosity</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Epiphytic roots breathe oxygen. Chunky bark and pumice preserve oxygen channels even after drenching, preventing Pythium rot.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-stone-200/70 shadow-xs space-y-2">
            <div className="text-xl">☀️</div>
            <h3 className="font-bold text-sm text-stone-900">3. Photon Flux Density</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Light is plant food. Moving a plant 3 feet back from window glass cuts usable foot-candles by over 50% under the Inverse-Square Law.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-stone-200/70 shadow-xs space-y-2">
            <div className="text-xl">🧪</div>
            <h3 className="font-bold text-sm text-stone-900">4. Osmotic Pressure</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Over-concentrated synthetic fertilizer salts pull water backward out of roots via osmosis, producing irreversible root burn.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Popular Plant Care Guides */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800">
              <BookOpen className="w-4 h-4" /> Evidence-Based Guides
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 mt-1">
              Horticulture Care Articles
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/guides')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            All 7 Care Guides <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GUIDES_DATA.slice(0, 3).map(guide => (
            <div
              key={guide.slug}
              onClick={() => onNavigate(`/guides/${guide.slug}`)}
              className="rounded-2xl border border-stone-200/80 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="aspect-16/9 overflow-hidden bg-stone-100">
                  <BotanicalImage
                    src={guide.heroImage}
                    alt={guide.heroAlt}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-800 mb-2">
                    <span>{guide.category}</span>
                    <span className="text-stone-400 font-normal">{guide.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-950 leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {guide.quickAnswer}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 flex items-center gap-2.5 text-xs text-stone-500">
                <img src={guide.author.avatar} alt={guide.author.name} className="w-6 h-6 rounded-full object-cover" />
                <span className="truncate">{guide.author.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Newsletter Subscription */}
      <section className="rounded-3xl bg-[#1B3527] text-white p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5" /> Bi-Weekly Botanical Dispatch
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-editorial">
            Join 45,000+ Indoor Plant Gardeners
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Receive seasonal watering adjustments, pest defense bulletins, and newly released interactive plant tools straight to your inbox. No spam. Unsubscribe anytime.
          </p>

          {newsletterSubscribed ? (
            <div className="p-4 rounded-xl bg-emerald-800/80 border border-emerald-600 text-emerald-100 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
              <span>Thank you for subscribing! Your confirmation dispatch is on its way.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="pt-2 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                Subscribe Free
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
