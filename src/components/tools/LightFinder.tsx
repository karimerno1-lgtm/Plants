import React, { useState, useMemo } from 'react';
import { AdSlot } from '../ads/AdSlot';
import { Sun, Compass, Ruler, Shield, Check, AlertTriangle } from 'lucide-react';
import { PLANTS_DATA } from '../../data/plants';

const WINDOW_DIRECTIONS = [
  { id: 'north', name: 'North-Facing Window', baseFC: 180, description: 'Soft, consistent indirect light all day with zero harsh direct rays.' },
  { id: 'east', name: 'East-Facing Window', baseFC: 500, description: 'Gentle, cool morning direct sun for 2–3 hours followed by bright indirect light.' },
  { id: 'south', name: 'South-Facing Window', baseFC: 1200, description: 'Intense, warm, high-energy light throughout midday and afternoon.' },
  { id: 'west', name: 'West-Facing Window', baseFC: 900, description: 'Hot, high-intensity afternoon rays that can scorch thin tropical leaves.' },
  { id: 'skylight', name: 'Overhead Skylight', baseFC: 1100, description: 'Unobstructed overhead natural zenith daylight.' },
  { id: 'grow-light', name: 'Full-Spectrum LED Grow Light', baseFC: 400, description: 'Controlled artificial PPFD lighting for windowless rooms.' }
];

const OBSTRUCTIONS = [
  { id: 'clear', name: 'Unobstructed Clear Glass', factor: 1.0 },
  { id: 'sheer', name: 'Sheer Curtains / Blinds', factor: 0.55 },
  { id: 'trees', name: 'Outdoor Trees or Porch Overhang', factor: 0.4 },
  { id: 'tinted', name: 'Double-Paned Tinted / Low-E Glass', factor: 0.7 }
];

export const LightFinder: React.FC = () => {
  const [direction, setDirection] = useState('east');
  const [distanceFeet, setDistanceFeet] = useState(2);
  const [obstruction, setObstruction] = useState('clear');

  const lightMetrics = useMemo(() => {
    const dirObj = WINDOW_DIRECTIONS.find(w => w.id === direction) || WINDOW_DIRECTIONS[1];
    const obsObj = OBSTRUCTIONS.find(o => o.id === obstruction) || OBSTRUCTIONS[0];

    // Distance decay using the Inverse Square Law of light
    // At 1 ft = ~100%, 2 ft = ~65%, 4 ft = ~30%, 8 ft = ~12%
    const distanceFactor = 1 / Math.pow(1 + (distanceFeet * 0.45), 1.6);
    const calculatedFC = Math.round(dirObj.baseFC * obsObj.factor * distanceFactor);
    const calculatedLux = Math.round(calculatedFC * 10.764);

    let category = 'Low Light (Tolerant Only)';
    let badgeColor = 'bg-stone-200 text-stone-800';
    let summary = 'Sufficient only for very shade-tolerant plants with slow growth.';

    if (calculatedFC >= 600) {
      category = 'Direct Sunlight';
      badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
      summary = 'High solar energy. Suitable for cacti, succulents, and ficus trees.';
    } else if (calculatedFC >= 250) {
      category = 'Bright Indirect Light';
      badgeColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
      summary = 'The golden standard for almost all tropical house foliage!';
    } else if (calculatedFC >= 100) {
      category = 'Medium Indirect Light';
      badgeColor = 'bg-teal-100 text-teal-900 border-teal-300';
      summary = 'Gentle filtered light. Great for pothos, philodendron, and peace lilies.';
    }

    // Match plants
    const recommended = PLANTS_DATA.filter(p => {
      if (calculatedFC < 100) return p.slug === 'zz-plant' || p.slug === 'snake-plant';
      if (calculatedFC < 250) return ['pothos', 'peace-lily', 'philodendron', 'zz-plant', 'snake-plant'].includes(p.slug);
      if (calculatedFC < 600) return ['monstera-deliciosa', 'pothos', 'philodendron', 'spider-plant', 'rubber-plant', 'calathea'].includes(p.slug);
      return ['fiddle-leaf-fig', 'rubber-plant', 'snake-plant'].includes(p.slug);
    });

    const notRecommended = PLANTS_DATA.filter(p => !recommended.some(r => r.slug === p.slug));

    return {
      dirObj,
      calculatedFC,
      calculatedLux,
      category,
      badgeColor,
      summary,
      recommended,
      notRecommended
    };
  }, [direction, distanceFeet, obstruction]);

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="rounded-2xl border border-stone-200/80 bg-white p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-3 text-emerald-800 mb-2">
          <Sun className="w-6 h-6 text-amber-500" />
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-800">Photon Physics Engine</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold font-editorial text-stone-900">
          Plant Light Finder & Foot-Candle Calculator
        </h1>
        <p className="mt-2 text-stone-600 text-sm md:text-base leading-relaxed">
          Human eyes automatically adjust to darkness, making humans poor judges of usable photosynthetic photons. Calculate exact foot-candles and lux from your window to find the perfect plant match.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-6 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs">
          <h2 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-700" />
            Window Geometry & Exposure
          </h2>

          {/* Window Direction */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              1. Window Direction (Use phone compass)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {WINDOW_DIRECTIONS.map(w => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setDirection(w.id)}
                  className={`text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                    direction === w.id
                      ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-semibold ring-1 ring-emerald-600'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-stone-50/30'
                  }`}
                >
                  <p className="font-semibold text-stone-900">{w.name}</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">{w.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Distance from Window */}
          <div>
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              <span className="flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5" /> 2. Distance from Glass</span>
              <span className="text-emerald-800 font-bold">{distanceFeet} Feet ({Math.round(distanceFeet * 30.48)} cm)</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="1"
              value={distanceFeet}
              onChange={(e) => setDistanceFeet(Number(e.target.value))}
              className="w-full accent-[#315B43] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>0 ft (Directly on sill)</span>
              <span>3 ft (Adjacent table)</span>
              <span>8 ft (Room center)</span>
              <span>15 ft (Back wall)</span>
            </div>
          </div>

          {/* Obstructions */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> 3. Window Obstructions & Curtains
            </label>
            <select
              value={obstruction}
              onChange={(e) => setObstruction(e.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-stone-50/50 px-4 py-2.5 text-sm font-medium text-stone-900 focus:border-emerald-600"
            >
              {OBSTRUCTIONS.map(o => (
                <option key={o.id} value={o.id}>{o.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border-2 border-emerald-800/20 bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-800">
                Calculated Light Intensity
              </span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${lightMetrics.badgeColor}`}>
                {lightMetrics.category}
              </span>
            </div>

            <div className="my-6 text-center">
              <div className="text-4xl md:text-5xl font-black font-editorial text-stone-900">
                {lightMetrics.calculatedFC} <span className="text-xl font-sans font-medium text-stone-500">FC</span>
              </div>
              <div className="text-sm font-semibold text-emerald-800 mt-1">
                ≈ {lightMetrics.calculatedLux.toLocaleString()} Lux
              </div>
              <p className="text-xs text-stone-600 mt-3 max-w-sm mx-auto leading-relaxed">
                {lightMetrics.summary}
              </p>
            </div>

            {/* Plants That Flourish Here */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <h3 className="text-xs font-bold tracking-wider uppercase text-emerald-900 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-700" />
                Plants Suited to This Exact Spot ({lightMetrics.recommended.length})
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {lightMetrics.recommended.slice(0, 6).map(plant => (
                  <a
                    key={plant.slug}
                    href={`/plants/${plant.slug}`}
                    className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 hover:bg-emerald-50 border border-stone-200/70 transition-colors text-xs font-medium text-stone-800 hover:text-emerald-900"
                  >
                    <img src={plant.imageUrl} alt={plant.name} className="w-7 h-7 rounded-md object-cover" />
                    <span className="truncate">{plant.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Plants to Avoid */}
            {lightMetrics.notRecommended.length > 0 && (
              <div className="mt-4 pt-4 border-t border-stone-100">
                <h4 className="text-xs font-semibold text-stone-500 flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Not recommended for this specific spot:
                </h4>
                <p className="text-xs text-stone-500">
                  {lightMetrics.notRecommended.map(p => p.name).slice(0, 4).join(', ')}
                  {lightMetrics.notRecommended.length > 4 ? ` and ${lightMetrics.notRecommended.length - 4} others` : ''}.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AdSlot type="responsive" />
    </div>
  );
};
