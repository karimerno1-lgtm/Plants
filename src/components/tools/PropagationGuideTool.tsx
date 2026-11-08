import React, { useState, useMemo } from 'react';
import { AdSlot } from '../ads/AdSlot';
import { Scissors, Calendar, Droplets, CheckCircle2, Clock, Sparkles } from 'lucide-react';

interface PropagationProfile {
  id: string;
  name: string;
  method: 'Water Stem Cutting' | 'Division' | 'Leaf Cutting' | 'Air Layering';
  baseDays: number;
  difficulty: 'Very Easy' | 'Easy' | 'Moderate' | 'Slow';
  cuttingGuide: string;
  transplantCriteria: string;
  successRate: string;
}

const PROPAGATION_PROFILES: PropagationProfile[] = [
  {
    id: 'pothos',
    name: 'Pothos (Golden, Marble Queen, Neon)',
    method: 'Water Stem Cutting',
    baseDays: 14,
    difficulty: 'Very Easy',
    cuttingGuide: 'Snip 1/4 inch below a brown aerial root bump (node). Remove bottom leaf so node is fully submerged.',
    transplantCriteria: 'Roots reach 2–3 inches long with white secondary root branching (approx 25–30 days).',
    successRate: '98%+'
  },
  {
    id: 'monstera',
    name: 'Monstera Deliciosa',
    method: 'Water Stem Cutting',
    baseDays: 21,
    difficulty: 'Easy',
    cuttingGuide: 'Select a stem cutting with at least one mature leaf, a distinct petiole sheath, and an active node/aerial root.',
    transplantCriteria: 'Primary root has reached 3–4 inches with visible secondary lateral roots.',
    successRate: '92%'
  },
  {
    id: 'snake',
    name: 'Snake Plant (Sansevieria)',
    method: 'Leaf Cutting',
    baseDays: 45,
    difficulty: 'Slow',
    cuttingGuide: 'Cut healthy leaf into 3-inch horizontal sections. Let cut ends callus dry for 3 days. Insert bottom end into perlite or water with notched chevron cut.',
    transplantCriteria: 'Underground miniature rhizome tuber and pups emerge from cut base.',
    successRate: '85%'
  },
  {
    id: 'peace-lily',
    name: 'Peace Lily (Spathiphyllum)',
    method: 'Division',
    baseDays: 7,
    difficulty: 'Easy',
    cuttingGuide: 'Peace lilies cannot be propagated by leaf or stem cuttings. During repotting, tease apart individual crowns that have separate root systems.',
    transplantCriteria: 'Immediately plant divided crowns into individual small pots with damp potting soil.',
    successRate: '95%'
  },
  {
    id: 'spider',
    name: 'Spider Plant (Chlorophytum)',
    method: 'Water Stem Cutting',
    baseDays: 10,
    difficulty: 'Very Easy',
    cuttingGuide: 'Snip off dangling "spiderettes" from stolon runners once they display tiny root nubs at the base.',
    transplantCriteria: 'Roots reach 1.5 inches in clean water (typically within 10–14 days).',
    successRate: '99%'
  },
  {
    id: 'fiddle',
    name: 'Fiddle Leaf Fig (Ficus Lyrata)',
    method: 'Water Stem Cutting',
    baseDays: 35,
    difficulty: 'Moderate',
    cuttingGuide: 'Take a 6-inch semi-woody stem tip cutting with 2 leaves. Cut leaves in half horizontally to reduce transpiration water loss.',
    transplantCriteria: 'Substantial cluster of white roots extending at least 2.5 inches.',
    successRate: '78%'
  }
];

export const PropagationGuideTool: React.FC = () => {
  const [selectedPlantId, setSelectedPlantId] = useState<string>('pothos');
  const [tempF, setTempF] = useState<number>(74); // 74F is ideal warm rooting temperature
  const [medium, setMedium] = useState<'water' | 'perlite' | 'sphagnum'>('water');

  const profile = useMemo(() => {
    return PROPAGATION_PROFILES.find(p => p.id === selectedPlantId) || PROPAGATION_PROFILES[0];
  }, [selectedPlantId]);

  const timeline = useMemo(() => {
    // Temperature factor (warmer 72-80F speeds cell division, colder slows)
    const tempFactor = tempF >= 75 ? 0.85 : tempF <= 65 ? 1.4 : 1.0;
    const mediumFactor = medium === 'sphagnum' ? 0.9 : medium === 'perlite' ? 0.95 : 1.0;

    const firstRootsDays = Math.round(profile.baseDays * tempFactor * mediumFactor);
    const pottingReadyDays = Math.round(firstRootsDays * 1.8);
    const waterChangeDays = 4; // every 4-5 days

    return {
      firstRootsDays,
      pottingReadyDays,
      waterChangeDays
    };
  }, [profile, tempF, medium]);

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="rounded-2xl border border-stone-200/80 bg-white p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-3 text-emerald-800 mb-2">
          <Scissors className="w-6 h-6 text-emerald-700" />
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-800">Meristematic Multiplication</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold font-editorial text-stone-900">
          Plant Propagation Timeline & Cutting Guide
        </h1>
        <p className="mt-2 text-stone-600 text-sm md:text-base leading-relaxed">
          Propagate your collection with confidence. Learn exact node identification techniques, expected root emergence timelines, water renewal cycles, and soil transition criteria.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls (6 Cols) */}
        <div className="lg:col-span-6 space-y-6 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs">
          <h2 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
            Select Plant & Rooting Environment
          </h2>

          {/* Plant Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              1. Choose Plant Species
            </label>
            <div className="space-y-2">
              {PROPAGATION_PROFILES.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPlantId(p.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedPlantId === p.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-600 shadow-xs'
                      : 'border-stone-200 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{p.name}</span>
                    <span className="text-[11px] font-mono text-emerald-800 font-semibold">{p.method}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Ambient Temperature */}
          <div>
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              <span>2. Ambient Room Temperature</span>
              <span className="text-emerald-800 font-bold">{tempF}°F ({Math.round((tempF - 32) * 5 / 9)}°C)</span>
            </div>
            <input
              type="range"
              min="60"
              max="85"
              value={tempF}
              onChange={(e) => setTempF(Number(e.target.value))}
              className="w-full accent-[#315B43] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>60°F (Slow rooting)</span>
              <span>75°F (Ideal sweet spot)</span>
              <span>85°F (Fastest cell division)</span>
            </div>
          </div>

          {/* Rooting Medium */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              3. Rooting Medium
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'water', label: '💧 Filtered Water' },
                { id: 'perlite', label: '⚪ Damp Perlite' },
                { id: 'sphagnum', label: '🌿 Sphagnum Moss' }
              ].map(med => (
                <button
                  key={med.id}
                  type="button"
                  onClick={() => setMedium(med.id as 'water' | 'perlite' | 'sphagnum')}
                  className={`p-2.5 text-center rounded-xl border text-xs cursor-pointer ${
                    medium === med.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-600'
                      : 'border-stone-200 text-stone-700'
                  }`}
                >
                  {med.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Card (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-2xl border-2 border-emerald-800/20 bg-white p-6 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-800">
                Calculated Propagation Milestones
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900">
                {profile.successRate} Success Rate
              </span>
            </div>

            {/* Milestones Timeline */}
            <div className="my-5 grid grid-cols-2 gap-3 text-center">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="text-xs font-semibold text-stone-500 mb-1 flex items-center justify-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" /> First Root Primordia
                </div>
                <div className="text-2xl font-bold font-editorial text-stone-900">
                  {timeline.firstRootsDays} Days
                </div>
                <div className="text-[11px] text-stone-500 mt-1">Tiny white bumps appear</div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <div className="text-xs font-semibold text-emerald-800 mb-1 flex items-center justify-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-700" /> Soil Transplant Ready
                </div>
                <div className="text-2xl font-bold font-editorial text-emerald-950">
                  ≈ {timeline.pottingReadyDays} Days
                </div>
                <div className="text-[11px] text-emerald-800 mt-1">Roots reach 2-3 inches</div>
              </div>
            </div>

            {/* Step-by-Step Cutting Protocol */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs space-y-1.5">
                <div className="font-bold text-stone-900 flex items-center gap-1.5">
                  <Scissors className="w-4 h-4 text-emerald-700" /> Where to Make the Cut:
                </div>
                <p className="text-stone-600 leading-relaxed text-[11px]">
                  {profile.cuttingGuide}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs space-y-1.5">
                <div className="font-bold text-stone-900 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-sky-600" /> Water Change Schedule:
                </div>
                <p className="text-stone-600 leading-relaxed text-[11px]">
                  Change water completely every <strong>{timeline.waterChangeDays} to 5 days</strong> to replenish dissolved oxygen and prevent bacterial film buildup around cut nodes.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-1.5">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Soil Transition Criterion:
                </div>
                <p className="text-stone-700 leading-relaxed text-[11px]">
                  {profile.transplantCriteria} Keep potting mix damp for the first 10 days after transplanting to ease root transition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdSlot type="responsive" />
    </div>
  );
};
