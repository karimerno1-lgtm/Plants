import React, { useState, useMemo } from 'react';
import { AdSlot } from '../ads/AdSlot';
import { Box, ArrowRight, AlertCircle, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

const ROOT_CONDITIONS = [
  { id: 'mild', name: 'Slightly Rootbound', desc: 'Roots reach the edge but have loose soil between them.', sizeStep: 1 },
  { id: 'dense', name: 'Densely Rootbound / Circling', desc: 'Thick mat of roots circling the container perimeter.', sizeStep: 2 },
  { id: 'drainage', name: 'Roots Poking Out Drainage Holes', desc: 'Roots actively escaping bottom of nursery pot.', sizeStep: 2 },
  { id: 'loose', name: 'Soil Still Loose / Root Rot Recovery', desc: 'Roots have not filled the pot, or rotten roots were recently excised.', sizeStep: 0 }
];

export const PotSizeCalculator: React.FC = () => {
  const [currentDiameter, setCurrentDiameter] = useState<number>(6); // inches
  const [currentDepthRatio, setCurrentDepthRatio] = useState<number>(1.0); // standard 1:1, shallow 0.7, deep 1.3
  const [rootCondition, setRootCondition] = useState<string>('dense');
  const [plantVigor, setPlantVigor] = useState<'moderate' | 'vigorous' | 'slow'>('moderate');

  const result = useMemo(() => {
    const condition = ROOT_CONDITIONS.find(r => r.id === rootCondition) || ROOT_CONDITIONS[1];

    let upgradeInches = condition.sizeStep;
    if (plantVigor === 'slow' && upgradeInches > 1) {
      upgradeInches = 1; // slow growers like ZZ or Snake plants should never jump 2 inches
    }
    if (plantVigor === 'vigorous' && currentDiameter >= 10 && condition.sizeStep === 2) {
      upgradeInches = 2.5; // large floor monsteras can take a 2.5 inch step
    }

    const newDiameter = currentDiameter + upgradeInches;
    const newDiameterCm = Math.round(newDiameter * 2.54);

    // Calculate volume in Liters: Cylinder V = pi * r^2 * h
    // r = (d / 2) * 2.54 cm, h = d * ratio * 2.54 cm
    const rCm = (newDiameter / 2) * 2.54;
    const hCm = newDiameter * currentDepthRatio * 2.54;
    const volumeLiters = (Math.PI * Math.pow(rCm, 2) * hCm) / 1000;
    const volumeQuarts = volumeLiters * 1.05669;

    // Additional fresh soil needed (volume difference)
    const oldRCm = (currentDiameter / 2) * 2.54;
    const oldHCm = currentDiameter * currentDepthRatio * 2.54;
    const oldVolumeLiters = (Math.PI * Math.pow(oldRCm, 2) * oldHCm) / 1000;
    const additionalSoilLiters = Math.max(0.3, volumeLiters - oldVolumeLiters);
    const additionalSoilQuarts = additionalSoilLiters * 1.05669;

    return {
      upgradeInches,
      newDiameter,
      newDiameterCm,
      volumeLiters: volumeLiters.toFixed(1),
      volumeQuarts: volumeQuarts.toFixed(1),
      additionalSoilLiters: additionalSoilLiters.toFixed(1),
      additionalSoilQuarts: additionalSoilQuarts.toFixed(1),
      isDownsizeOrKeep: upgradeInches === 0
    };
  }, [currentDiameter, currentDepthRatio, rootCondition, plantVigor]);

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="rounded-2xl border border-stone-200/80 bg-white p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-3 text-emerald-800 mb-2">
          <Box className="w-6 h-6 text-emerald-700" />
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-800">Container Dynamics</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold font-editorial text-stone-900">
          Pot Size & Soil Volume Calculator
        </h1>
        <p className="mt-2 text-stone-600 text-sm md:text-base leading-relaxed">
          Potting up too large is a primary trigger of root rot, as excess surrounding soil stays soggy for weeks. Calculate the exact safe container upgrade and potting substrate volume.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-6 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs">
          <h2 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
            Current Container & Root Metrics
          </h2>

          {/* Current Diameter */}
          <div>
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              <span>1. Current Pot Diameter</span>
              <span className="text-emerald-800 font-bold">{currentDiameter} inches ({Math.round(currentDiameter * 2.54)} cm)</span>
            </div>
            <input
              type="range"
              min="3"
              max="16"
              value={currentDiameter}
              onChange={(e) => setCurrentDiameter(Number(e.target.value))}
              className="w-full accent-[#315B43] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>3" (Starter)</span>
              <span>6" (Tabletop)</span>
              <span>10" (Floor)</span>
              <span>16" (Specimen)</span>
            </div>
          </div>

          {/* Root Condition */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              2. Root Ball Condition
            </label>
            <div className="space-y-2">
              {ROOT_CONDITIONS.map(cond => (
                <button
                  key={cond.id}
                  type="button"
                  onClick={() => setRootCondition(cond.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                    rootCondition === cond.id
                      ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-semibold ring-1 ring-emerald-600'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-stone-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-900">{cond.name}</span>
                    <span className="text-[11px] font-mono font-medium text-emerald-800">
                      {cond.sizeStep === 0 ? 'Maintain Size' : `+${cond.sizeStep}"`}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">{cond.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Growth Vigor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                3. Plant Growth Speed
              </label>
              <select
                value={plantVigor}
                onChange={(e) => setPlantVigor(e.target.value as 'moderate' | 'vigorous' | 'slow')}
                className="w-full rounded-xl border border-stone-300 bg-stone-50/50 px-3 py-2 text-xs font-medium text-stone-900 focus:border-emerald-600"
              >
                <option value="slow">Slow Growing (ZZ, Snake Plant, Cacti)</option>
                <option value="moderate">Moderate (Pothos, Rubber Tree)</option>
                <option value="vigorous">Vigorous Rooter (Monstera, Spider Plant)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                4. Container Shape
              </label>
              <select
                value={currentDepthRatio}
                onChange={(e) => setCurrentDepthRatio(Number(e.target.value))}
                className="w-full rounded-xl border border-stone-300 bg-stone-50/50 px-3 py-2 text-xs font-medium text-stone-900 focus:border-emerald-600"
              >
                <option value={1.0}>Standard Depth (Height = Diameter)</option>
                <option value={0.7}>Shallow Bowl / Azalea Pot</option>
                <option value={1.3}>Extra Deep / Citrus Tree Pot</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border-2 border-emerald-800/20 bg-emerald-50/60 p-6 shadow-md">
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-800">
              Recommended Container Sizing
            </span>

            {result.isDownsizeOrKeep ? (
              <div className="my-5 p-4 rounded-xl bg-amber-100/80 border border-amber-300 text-amber-950">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <ShieldAlert className="w-5 h-5 text-amber-700" />
                  Do Not Increase Pot Size
                </div>
                <p className="text-xs mt-1.5 leading-relaxed text-amber-900">
                  The roots have not colonized the existing soil volume. Upgrading now causes root rot. Refresh existing soil or downsize into a smaller container if roots were pruned.
                </p>
              </div>
            ) : (
              <div className="my-6 text-center">
                <div className="inline-flex items-center gap-3 text-stone-500 font-mono text-sm mb-2">
                  <span>{currentDiameter}" Pot</span>
                  <ArrowRight className="w-4 h-4 text-emerald-700" />
                  <span className="font-bold text-emerald-950">{result.newDiameter}" Target</span>
                </div>
                <div className="text-4xl md:text-5xl font-black font-editorial text-emerald-950">
                  {result.newDiameter} Inches
                </div>
                <p className="text-xs font-medium text-emerald-800 mt-1">
                  ({result.newDiameterCm} cm diameter)
                </p>
              </div>
            )}

            {/* Substrate Volume Requirements */}
            <div className="rounded-xl bg-white p-4 border border-emerald-200/80 space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                <span className="text-stone-600">Total Pot Volume:</span>
                <span className="font-bold text-stone-900">{result.volumeLiters} Liters ({result.volumeQuarts} Quarts)</span>
              </div>
              <div className="flex justify-between items-center text-emerald-900 font-semibold">
                <span>Fresh Soil Needed to Add:</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 font-bold">{result.additionalSoilLiters} L ({result.additionalSoilQuarts} Qts)</span>
              </div>
            </div>

            {/* Repotting Best Practice */}
            <div className="mt-5 space-y-2 text-xs text-stone-600">
              <h3 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Repotting Golden Rules
              </h3>
              <ul className="space-y-1.5 text-[11px]">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Tease outer 15% of circling roots gently with your fingertips to break root-ball spiral memory.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Always ensure new container has open drainage holes. Never place decorative rocks at bottom!</span>
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
