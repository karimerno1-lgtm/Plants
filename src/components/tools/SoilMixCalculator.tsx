import React, { useState, useMemo } from 'react';
import { AdSlot } from '../ads/AdSlot';
import { Layers, Sparkles, Check, Info } from 'lucide-react';

interface SoilRecipe {
  id: string;
  name: string;
  tagline: string;
  ingredients: Array<{
    name: string;
    percentage: number;
    color: string;
    role: string;
  }>;
  tips: string;
}

const RECIPES: SoilRecipe[] = [
  {
    id: 'aroid',
    name: 'Chunky Aroid Master Mix (Monstera, Philodendron, Pothos)',
    tagline: 'High porosity, non-compacting airy blend for epiphytic root systems.',
    ingredients: [
      { name: 'Chunky Coco Coir / Peat Chunks', percentage: 40, color: 'bg-amber-800', role: 'Sustainable organic base that holds moisture without turning to mud.' },
      { name: 'Fir / Pine Orchid Bark (Medium)', percentage: 30, color: 'bg-amber-950', role: 'Creates macro-air pockets preventing anaerobic fungus.' },
      { name: 'Coarse Pumice or Perlite', percentage: 20, color: 'bg-stone-300', role: 'Non-compacting aeration and rapid excess water drainage.' },
      { name: 'Organic Earthworm Castings', percentage: 10, color: 'bg-stone-800', role: 'Bio-active microbial nutrients with slow non-burning release.' }
    ],
    tips: 'Optional: Toss in a half-cup of horticultural charcoal to adsorb salts and prevent stagnant root odor.'
  },
  {
    id: 'succulent',
    name: 'Gritty Desert Mix (Snake Plant, ZZ Plant, Cacti)',
    tagline: 'Ultra-fast draining mineral mix to prevent rot in moisture-sensitive roots.',
    ingredients: [
      { name: 'Organic Potting Soil', percentage: 35, color: 'bg-amber-800', role: 'Base moisture buffer.' },
      { name: 'Coarse Pumice / Scoria', percentage: 35, color: 'bg-stone-400', role: 'Heavy mineral drainage that anchors top-heavy succulents.' },
      { name: 'Coarse Horticultural Sharp Sand', percentage: 20, color: 'bg-amber-200', role: 'Gritty texture mimicking arid desert washes.' },
      { name: 'Perlite', percentage: 10, color: 'bg-stone-200', role: 'Surface aeration.' }
    ],
    tips: 'Avoid fine beach sand or play sand which compacts like concrete when wet.'
  },
  {
    id: 'tropical',
    name: 'Standard Tropical Houseplant Blend (Spider Plant, Ficus)',
    tagline: 'Balanced, general-purpose indoor foliage potting medium.',
    ingredients: [
      { name: 'Fine Coco Coir or Peat Moss', percentage: 55, color: 'bg-amber-800', role: 'Primary root holding medium.' },
      { name: 'Horticultural Perlite', percentage: 25, color: 'bg-stone-300', role: 'Essential aeration preventing water stagnation.' },
      { name: 'Worm Castings / Organic Compost', percentage: 10, color: 'bg-stone-800', role: 'Beneficial bacteria and micronutrients.' },
      { name: 'Fine Bark Fines', percentage: 10, color: 'bg-amber-950', role: 'Texture and structural integrity.' }
    ],
    tips: 'Universally suitable for 80% of common indoor nursery plants.'
  },
  {
    id: 'calathea',
    name: 'Moisture-Retentive Prayer Plant Mix (Calathea, Ferns, Maranta)',
    tagline: 'Even hydration without compaction; protects fine delicate root hairs.',
    ingredients: [
      { name: 'Coco Coir & Sphagnum Peat', percentage: 50, color: 'bg-amber-800', role: 'High water retention while maintaining fluffy texture.' },
      { name: 'Perlite', percentage: 25, color: 'bg-stone-300', role: 'Prevents compaction from frequent watering.' },
      { name: 'Fine Grade Orchid Bark', percentage: 15, color: 'bg-amber-950', role: 'Allows capillary water movement through root zones.' },
      { name: 'Horticultural Charcoal & Castings', percentage: 10, color: 'bg-stone-900', role: 'Binds fluoride and mineral impurities from tap water.' }
    ],
    tips: 'Never let this blend dry to bone-dry crispness, as rehydrating dried peat can be difficult.'
  }
];

export const SoilMixCalculator: React.FC = () => {
  const [recipeId, setRecipeId] = useState<string>('aroid');
  const [volumeUnit, setVolumeUnit] = useState<'liters' | 'gallons' | 'pots'>('liters');
  const [targetVolume, setTargetVolume] = useState<number>(5); // e.g. 5 Liters

  const selectedRecipe = useMemo(() => {
    return RECIPES.find(r => r.id === recipeId) || RECIPES[0];
  }, [recipeId]);

  const convertedLiters = useMemo(() => {
    if (volumeUnit === 'gallons') return targetVolume * 3.78541;
    if (volumeUnit === 'pots') return targetVolume * 2.2; // roughly 2.2L per 7-inch pot
    return targetVolume;
  }, [volumeUnit, targetVolume]);

  const ingredientBreakdown = useMemo(() => {
    return selectedRecipe.ingredients.map(ing => {
      const liters = (convertedLiters * (ing.percentage / 100));
      // 1 liter ≈ 4.22675 US cups
      const cups = liters * 4.22675;
      return {
        ...ing,
        liters: liters.toFixed(1),
        cups: Math.round(cups * 10) / 10
      };
    });
  }, [selectedRecipe, convertedLiters]);

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="rounded-2xl border border-stone-200/80 bg-white p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-3 text-emerald-800 mb-2">
          <Layers className="w-6 h-6 text-emerald-700" />
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-800">Substrate Chemistry</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold font-editorial text-stone-900">
          Chunky Soil Mix Recipe Calculator
        </h1>
        <p className="mt-2 text-stone-600 text-sm md:text-base leading-relaxed">
          Say goodbye to suffocating, dense nursery soil. Calculate exact volumetric batches in kitchen cups and liters with scientifically balanced aeration and water retention.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls (6 Cols) */}
        <div className="lg:col-span-6 space-y-6 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs">
          <h2 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
            Select Plant Family Recipe
          </h2>

          <div className="space-y-2.5">
            {RECIPES.map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRecipeId(r.id)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                  recipeId === r.id
                    ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-semibold ring-1 ring-emerald-600 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-stone-50/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900">{r.name}</span>
                  {recipeId === r.id && <Check className="w-4 h-4 text-emerald-700" />}
                </div>
                <p className="text-[11px] text-stone-500 mt-1">{r.tagline}</p>
              </button>
            ))}
          </div>

          {/* Desired Batch Size */}
          <div className="pt-2 border-t border-stone-100">
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              <span>Target Batch Size:</span>
              <span className="text-emerald-800 font-bold">
                {targetVolume} {volumeUnit === 'liters' ? 'Liters' : volumeUnit === 'gallons' ? 'Gallons' : 'Standard Pots (~7")'}
              </span>
            </div>

            <div className="flex gap-2 mb-3">
              {(['liters', 'gallons', 'pots'] as const).map(unit => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => setVolumeUnit(unit)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize border cursor-pointer ${
                    volumeUnit === unit
                      ? 'bg-emerald-800 text-white border-emerald-800'
                      : 'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>

            <input
              type="range"
              min="1"
              max={volumeUnit === 'gallons' ? 10 : volumeUnit === 'pots' ? 12 : 25}
              value={targetVolume}
              onChange={(e) => setTargetVolume(Number(e.target.value))}
              className="w-full accent-[#315B43] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>Small Batch (1)</span>
              <span>Medium (5-10)</span>
              <span>Large Repotting Day ({volumeUnit === 'gallons' ? '10 Gal' : '25 L'})</span>
            </div>
          </div>
        </div>

        {/* Recipe Results (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-2xl border-2 border-emerald-800/20 bg-white p-6 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-800">
                Ingredients For {convertedLiters.toFixed(1)}L ({Math.round(convertedLiters * 4.226)} Cups) Total
              </span>
              <span className="text-[11px] font-semibold text-stone-500">Measure by Volume</span>
            </div>

            {/* Visual Ratio Bar */}
            <div className="my-4 flex h-3.5 w-full rounded-full overflow-hidden shadow-inner">
              {selectedRecipe.ingredients.map(ing => (
                <div
                  key={ing.name}
                  style={{ width: `${ing.percentage}%` }}
                  className={`${ing.color} h-full`}
                  title={`${ing.name}: ${ing.percentage}%`}
                />
              ))}
            </div>

            {/* Ingredients Table */}
            <div className="space-y-3">
              {ingredientBreakdown.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 text-xs">
                  <div className="flex items-center justify-between font-bold text-stone-900 mb-1">
                    <span className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${item.color} shrink-0`}></span>
                      {item.name}
                    </span>
                    <span className="font-mono text-emerald-900">
                      {item.cups} Cups <span className="text-stone-400 font-normal">({item.liters} L)</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 pl-5 leading-normal">{item.role}</p>
                </div>
              ))}
            </div>

            {/* Expert Tip Callout */}
            <div className="mt-5 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                <strong>Pro Blending Tip:</strong> {selectedRecipe.tips}
              </p>
            </div>
          </div>
        </div>
      </div>

      <AdSlot type="responsive" />
    </div>
  );
};
