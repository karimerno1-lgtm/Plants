import React from 'react';
import { PLANTS_DATA, PlantDetail } from '../data/plants';
import { TOOLS_DATA } from '../data/tools';
import { AdSlot } from '../components/ads/AdSlot';
import { ChevronRight, Sun, Droplets, Gauge, Thermometer, Layers, FlaskConical, AlertTriangle, ShieldCheck, Scissors, HelpCircle, ArrowRight, Wrench } from 'lucide-react';
import { BotanicalImage } from '../components/ui/BotanicalImage';

interface PlantDetailPageProps {
  plantSlug: string;
  onNavigate: (path: string) => void;
}

export const PlantDetailPage: React.FC<PlantDetailPageProps> = ({ plantSlug, onNavigate }) => {
  const plant = PLANTS_DATA.find(p => p.slug === plantSlug) || PLANTS_DATA[0];

  const relatedTools = TOOLS_DATA.filter(t => plant.relatedToolSlugs?.includes(t.slug) || false);
  const relatedPlants = PLANTS_DATA.filter(p => p.slug !== plant.slug && (p.category === plant.category || p.difficulty === plant.difficulty)).slice(0, 3);

  return (
    <div className="space-y-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-stone-500">
        <button onClick={() => onNavigate('/')} className="hover:text-emerald-800 cursor-pointer">Home</button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <button onClick={() => onNavigate('/plants')} className="hover:text-emerald-800 cursor-pointer">Plants</button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="font-semibold text-stone-900">{plant.name}</span>
      </nav>

      {/* Hero Banner Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-stone-200/80 bg-white p-6 sm:p-10 shadow-xs">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-950">
              {plant.difficulty} Care
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700">
              {plant.category} Family ({plant.family})
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-editorial text-stone-900 leading-tight">
            {plant.name}
          </h1>
          <p className="text-base font-serif italic text-emerald-800">
            {plant.botanicalName}
          </p>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {plant.summary} Native to {plant.origin}.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 text-xs">
              <span className="text-stone-400 block mb-0.5">Light</span>
              <span className="font-bold text-stone-900">{plant.light.footCandles}</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 text-xs">
              <span className="text-stone-400 block mb-0.5">Watering</span>
              <span className="font-bold text-stone-900">{plant.watering.frequency.split(';')[0]}</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 text-xs">
              <span className="text-stone-400 block mb-0.5">Humidity</span>
              <span className="font-bold text-stone-900">{plant.humidity.recommended}</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 text-xs">
              <span className="text-stone-400 block mb-0.5">Temp</span>
              <span className="font-bold text-stone-900">{plant.temperature.rangeF}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 aspect-4/3 lg:aspect-square rounded-2xl overflow-hidden bg-stone-100 shadow-md">
          <BotanicalImage
            src={plant.imageUrl}
            alt={plant.imageAlt}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Core Horticulture Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Light */}
        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-amber-700 font-bold text-base">
            <Sun className="w-5 h-5" />
            <span>Light Requirements</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed font-semibold">
            {plant.light.ideal} ({plant.light.footCandles})
          </p>
          <p className="text-xs text-stone-500 leading-relaxed">
            {plant.light.exposure}
          </p>
          <div className="p-3 rounded-xl bg-amber-50 text-[11px] text-amber-900">
            <strong>Placement note:</strong> {plant.light.placement}
          </div>
        </div>

        {/* Watering */}
        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-sky-700 font-bold text-base">
            <Droplets className="w-5 h-5" />
            <span>Watering & Soil Moisture</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed font-semibold">
            {plant.watering.frequency}
          </p>
          <p className="text-xs text-stone-500 leading-relaxed">
            <strong>Moisture test:</strong> {plant.watering.soilCheck}
          </p>
          <div className="p-3 rounded-xl bg-sky-50 text-[11px] text-sky-950">
            <strong>Winter regimen:</strong> {plant.watering.winterAdjustment}
          </div>
        </div>

        {/* Humidity & Temp */}
        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-base">
            <Gauge className="w-5 h-5" />
            <span>Humidity & Temperature</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            <strong>Target Humidity:</strong> {plant.humidity.recommended} (Minimum baseline: {plant.humidity.minimum}).
          </p>
          <p className="text-xs text-stone-500 leading-relaxed">
            <strong>Comfort Range:</strong> {plant.temperature.rangeF} ({plant.temperature.rangeC}). Do not expose to sustained chills below {plant.temperature.hardinessMinF}°F.
          </p>
        </div>

        {/* Soil & Fertilizer */}
        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-stone-800 font-bold text-base">
            <Layers className="w-5 h-5" />
            <span>Soil Mix & Nutrition</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            <strong>Recommended Substrate:</strong> {plant.soil.mixType} — {plant.soil.recipe}
          </p>
          <p className="text-xs text-stone-500 leading-relaxed">
            <strong>Fertilizer:</strong> {plant.fertilizer.npkRatio}. {plant.fertilizer.schedule}
          </p>
        </div>
      </div>

      {/* AdSense Placement: Responsive display inside plant dossier */}
      <AdSlot type="responsive" />

      {/* Pet Toxicity Assessment (ASPCA) */}
      <div className={`rounded-2xl border p-6 shadow-xs ${
        !plant.petToxicity.toxicToCats && !plant.petToxicity.toxicToDogs
          ? 'bg-emerald-50/70 border-emerald-300'
          : 'bg-amber-50/70 border-amber-300'
      }`}>
        <div className="flex items-center gap-2.5 mb-2 font-bold text-base text-stone-900">
          {!plant.petToxicity.toxicToCats && !plant.petToxicity.toxicToDogs ? (
            <>
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span>Pet Toxicity: Certified Non-Toxic (Pet-Safe)</span>
            </>
          ) : (
            <>
              <AlertTriangle className="w-5 h-5 text-amber-700" />
              <span>Pet Toxicity Notice: Toxic to Cats & Dogs</span>
            </>
          )}
        </div>
        <p className="text-xs text-stone-700 leading-relaxed">
          <strong>Horticultural Toxins:</strong> {plant.petToxicity.toxicPrinciple}
        </p>
        <p className="text-xs text-stone-600 mt-1 leading-relaxed">
          {plant.petToxicity.aspcaNotes}
        </p>
      </div>

      {/* Propagation & Common Problems */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Propagation */}
        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
            <Scissors className="w-4 h-4 text-emerald-700" />
            <span>Propagation Protocol</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            <strong>Method:</strong> {plant.propagation.method}
          </p>
          <p className="text-xs text-stone-500 leading-relaxed">
            <strong>Rooting Duration:</strong> {plant.propagation.timeline} in {plant.propagation.medium}.
          </p>
        </div>

        {/* Common Problems */}
        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Common Problem Diagnostic</span>
          </div>
          <div className="space-y-2 text-xs">
            {plant.commonProblems.map((prob, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                <span className="font-bold text-stone-900 block">{prob.symptom}</span>
                <span className="text-[11px] text-stone-500 block mt-0.5">Cause: {prob.cause}</span>
                <span className="text-[11px] text-emerald-900 font-medium block mt-0.5">Fix: {prob.solution}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Direct Interactive Tool Links */}
      {relatedTools.length > 0 && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-emerald-800" />
            Calculators Configured for {plant.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedTools.map(t => (
              <button
                key={t.slug}
                onClick={() => onNavigate(`/tools/${t.slug}`)}
                className="text-left p-3.5 rounded-xl bg-white border border-emerald-200 hover:border-emerald-600 shadow-2xs transition-all cursor-pointer group"
              >
                <div className="text-xs font-bold text-stone-900 group-hover:text-emerald-950">
                  {t.shortTitle}
                </div>
                <div className="text-[11px] text-stone-500 truncate mt-0.5">
                  Calculate specs for {plant.name} →
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FAQs */}
      {plant.faqs.length > 0 && (
        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 space-y-4">
          <h3 className="text-lg font-bold font-editorial text-stone-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-700" />
            Frequently Asked Questions: {plant.name}
          </h3>
          <div className="space-y-3">
            {plant.faqs.map((faq, i) => (
              <div key={i} className="p-4 rounded-xl bg-stone-50 border border-stone-200/60">
                <h4 className="text-xs font-bold text-stone-900">{faq.q}</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AdSense Placement 2: Multiplex unit near related species / end of guide */}
      <AdSlot type="multiplex" />
    </div>
  );
};
