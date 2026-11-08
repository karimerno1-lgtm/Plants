import React from 'react';
import { Leaf, Award, ShieldCheck, Microscope, Heart, Sparkles } from 'lucide-react';
import { AdSlot } from '../components/ads/AdSlot';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Title */}
      <div className="rounded-3xl border border-stone-200/80 bg-white p-6 sm:p-12 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800">
          <Leaf className="w-4 h-4" /> About PlantCare Lab
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-editorial text-stone-900 leading-tight">
          Translating Botanical Science into Practical Indoor Care.
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Founded by horticulturists, indoor agronomists, and botanical researchers, PlantCare Lab (https://plants.wdbloog.com) exists to dismantle rigid calendar myths and replace guesswork with environmental thermodynamics.
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Microscope className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-stone-900">1. Evidence-Based Botany</h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Every calculator in our suite utilizes established thermodynamic equations—such as Tetens vapor pressure deficit and the Inverse-Square Law of photon illumination.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-stone-900">2. Zero Pill-Slop & Editorial Rigor</h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            We never fabricate universal dosage schedules or make unverified claims. Our pet toxicity ratings reference established ASPCA and veterinary toxicology data.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Heart className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-stone-900">3. Accessible Worldwide</h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Serving indoor plant parents across the USA, UK, Canada, Australia, and Europe with metric and imperial unit conversions and lightning-fast web calculator technology.
          </p>
        </div>
      </div>

      <AdSlot type="responsive" />
    </div>
  );
};
