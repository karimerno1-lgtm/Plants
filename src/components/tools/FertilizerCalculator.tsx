import React, { useState, useMemo } from 'react';
import { AdSlot } from '../ads/AdSlot';
import { FlaskConical, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

const COMMON_FORMULATIONS = [
  { id: 'foliage', name: 'High-Nitrogen Foliage (3-1-2 / 9-3-6)', desc: 'Ideal for Monstera, Ficus, Philodendron, and big leaf growth.' },
  { id: 'balanced', name: 'General Balanced (20-20-20 / 10-10-10)', desc: 'Versatile all-around maintenance for indoor houseplants.' },
  { id: 'gentle', name: 'Gentle Seaweed / Fish Emulsion (2-3-1)', desc: 'Organic cold-pressed micronutrients; extremely low burn risk.' },
  { id: 'bloom', name: 'Bloom Booster (10-15-10)', desc: 'Phosphorus-focused for Peace Lilies and Anthuriums in bud.' }
];

export const FertilizerCalculator: React.FC = () => {
  const [formulation, setFormulation] = useState<string>('foliage');
  const [canVolumeLiters, setCanVolumeLiters] = useState<number>(2); // 2 Liters default can
  const [baseManufacturerDose, setBaseManufacturerDose] = useState<number>(5); // ml per Gallon (approx 1 tsp)
  const [feedingStrategy, setFeedingStrategy] = useState<'quarter' | 'half' | 'full'>('quarter');
  const [season, setSeason] = useState<'active' | 'dormant'>('active');

  const result = useMemo(() => {
    // 1 Gallon = 3.78541 Liters
    const gallons = canVolumeLiters / 3.78541;

    let strengthRatio = 0.25; // default quarter strength
    let strategyLabel = 'Weakly Weekly (1/4 Strength) – Safest';
    if (feedingStrategy === 'half') {
      strengthRatio = 0.5;
      strategyLabel = 'Bi-Weekly (1/2 Strength)';
    } else if (feedingStrategy === 'full') {
      strengthRatio = 1.0;
      strategyLabel = 'Monthly (Full Strength)';
    }

    const calculatedMl = gallons * baseManufacturerDose * strengthRatio;
    // 1 tsp = 4.92892 ml
    const tsp = calculatedMl / 4.92892;
    // 1 ml ≈ 20 drops
    const drops = Math.round(calculatedMl * 20);

    return {
      calculatedMl: Math.max(0.1, calculatedMl).toFixed(1),
      tsp: tsp < 0.2 ? '≈ 1/8 tsp' : tsp < 0.35 ? '≈ 1/4 tsp' : tsp < 0.7 ? '≈ 1/2 tsp' : `${tsp.toFixed(1)} tsp`,
      drops,
      gallons: gallons.toFixed(2),
      strategyLabel,
      isDormantPause: season === 'dormant'
    };
  }, [canVolumeLiters, baseManufacturerDose, feedingStrategy, season]);

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="rounded-2xl border border-stone-200/80 bg-white p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-3 text-emerald-800 mb-2">
          <FlaskConical className="w-6 h-6 text-emerald-700" />
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-800">Precision Dilution</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold font-editorial text-stone-900">
          Fertilizer Dilution & Routine Calculator
        </h1>
        <p className="mt-2 text-stone-600 text-sm md:text-base leading-relaxed">
          Fertilizer salt burn kills more root tips than under-fertilization. Calculate exact dilutions for any watering can volume based on the horticulturist "weakly weekly" protocol.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-6 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs">
          <h2 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
            Fertilizer Formulation & Can Metrics
          </h2>

          {/* Formulation Type */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              1. Concentrate Formula
            </label>
            <div className="space-y-2">
              {COMMON_FORMULATIONS.map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFormulation(f.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                    formulation === f.id
                      ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-semibold ring-1 ring-emerald-600'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-stone-50/30'
                  }`}
                >
                  <p className="font-semibold text-stone-900">{f.name}</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">{f.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Watering Can Size */}
          <div>
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              <span>2. Watering Can Size</span>
              <span className="text-emerald-800 font-bold">{canVolumeLiters} Liters ({result.gallons} Gallons)</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={canVolumeLiters}
              onChange={(e) => setCanVolumeLiters(Number(e.target.value))}
              className="w-full accent-[#315B43] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>0.5 L (Mug/Small)</span>
              <span>2 L (Standard Indoor Can)</span>
              <span>5 L (Large)</span>
              <span>10 L (Gallon Bucket)</span>
            </div>
          </div>

          {/* Manufacturer Base Dose */}
          <div>
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              <span>3. Manufacturer Bottle Recommendation (Full Dose per Gallon)</span>
              <span className="text-emerald-800 font-bold">{baseManufacturerDose} ml / Gallon</span>
            </div>
            <div className="flex gap-2">
              {[
                { label: '1/2 tsp (~2.5ml)', val: 2.5 },
                { label: '1 tsp (~5ml)', val: 5 },
                { label: '1 tbsp (~15ml)', val: 15 }
              ].map(item => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setBaseManufacturerDose(item.val)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border cursor-pointer ${
                    baseManufacturerDose === item.val
                      ? 'bg-emerald-800 text-white border-emerald-800'
                      : 'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Feeding Routine / Strength */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              4. Dilution Strategy (Weakly Weekly Method Recommended)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFeedingStrategy('quarter')}
                className={`p-2.5 text-left rounded-xl border text-xs cursor-pointer ${
                  feedingStrategy === 'quarter'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-600'
                    : 'border-stone-200 text-stone-700'
                }`}
              >
                <div className="font-bold">1/4 Strength</div>
                <div className="text-[10px] text-stone-500">Every watering</div>
              </button>
              <button
                type="button"
                onClick={() => setFeedingStrategy('half')}
                className={`p-2.5 text-left rounded-xl border text-xs cursor-pointer ${
                  feedingStrategy === 'half'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-600'
                    : 'border-stone-200 text-stone-700'
                }`}
              >
                <div className="font-bold">1/2 Strength</div>
                <div className="text-[10px] text-stone-500">Every 2 weeks</div>
              </button>
              <button
                type="button"
                onClick={() => setFeedingStrategy('full')}
                className={`p-2.5 text-left rounded-xl border text-xs cursor-pointer ${
                  feedingStrategy === 'full'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-600'
                    : 'border-stone-200 text-stone-700'
                }`}
              >
                <div className="font-bold">Full Strength</div>
                <div className="text-[10px] text-stone-500">Monthly only</div>
              </button>
            </div>
          </div>

          {/* Active vs Dormant */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              5. Seasonal Light & Growth Status
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSeason('active')}
                className={`p-2.5 text-xs font-semibold rounded-xl border cursor-pointer ${
                  season === 'active'
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-600 ring-1 ring-emerald-600'
                    : 'bg-stone-50 text-stone-600 border-stone-200'
                }`}
              >
                🌿 Active Growth (Spring/Summer)
              </button>
              <button
                type="button"
                onClick={() => setSeason('dormant')}
                className={`p-2.5 text-xs font-semibold rounded-xl border cursor-pointer ${
                  season === 'dormant'
                    ? 'bg-amber-50 text-amber-950 border-amber-600 ring-1 ring-amber-600'
                    : 'bg-stone-50 text-stone-600 border-stone-200'
                }`}
              >
                ❄️ Winter Dormancy
              </button>
            </div>
          </div>
        </div>

        {/* Results Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border-2 border-emerald-800/20 bg-emerald-50/60 p-6 shadow-md">
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-800">
              Precise Fertilizer Dose
            </span>

            {result.isDormantPause ? (
              <div className="my-6 p-4 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5 text-amber-800" />
                  Pause Fertilizer During Winter
                </div>
                <p className="text-xs leading-relaxed text-amber-900">
                  During winter dormancy, houseplants receive less light and halt cellular division. Adding fertilizer salts to resting roots causes fertilizer burn and leaf tip crisping. Resume feeding in March/April.
                </p>
              </div>
            ) : (
              <div className="my-6 text-center">
                <div className="text-4xl md:text-5xl font-black font-editorial text-emerald-950">
                  {result.calculatedMl} mL
                </div>
                <div className="text-sm font-semibold text-emerald-800 mt-1">
                  {result.tsp} ({result.drops} Drops)
                </div>
                <p className="text-xs text-stone-500 mt-2">
                  Mix into your {canVolumeLiters}L can ({result.strategyLabel})
                </p>
              </div>
            )}

            {/* Safety Rules */}
            <div className="rounded-xl bg-white p-4 border border-emerald-200/80 space-y-2.5 text-xs text-stone-700">
              <div className="flex items-center gap-1.5 font-bold text-stone-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Root Safety Commandments
              </div>
              <ul className="space-y-1.5 text-[11px] text-stone-600">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Never fertilize dry soil:</strong> Always pre-moisten root ball slightly with plain water 15 minutes before adding fertilizer.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Quarterly flush:</strong> Once every 3–4 months, flush the pot with pure water until it drains copiously to dissolve accumulated mineral crust.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <AdSlot type="responsive" />
    </div>
  );
};
