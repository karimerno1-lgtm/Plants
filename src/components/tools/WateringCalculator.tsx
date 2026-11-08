import React, { useState, useMemo } from 'react';
import { AdSlot } from '../ads/AdSlot';
import { Droplets, Info, AlertCircle, Thermometer, Sun, CheckCircle2, RefreshCw } from 'lucide-react';

interface PlantTypeOption {
  id: string;
  name: string;
  baseDays: number;
  moistureThreshold: string;
  sensitivity: 'Low' | 'Medium' | 'High';
  soilDrynessGoal: string;
}

const PLANT_TYPES: PlantTypeOption[] = [
  { id: 'monstera', name: 'Monstera & Large Aroids', baseDays: 8, moistureThreshold: 'Top 50% dry', sensitivity: 'Medium', soilDrynessGoal: 'Allow top 2-3 inches to dry thoroughly before watering.' },
  { id: 'pothos', name: 'Pothos & Philodendron Vines', baseDays: 7, moistureThreshold: 'Top 50% dry', sensitivity: 'Low', soilDrynessGoal: 'Let top 2 inches dry; leaves droop slightly when thirsty.' },
  { id: 'snake', name: 'Snake Plant & Sansevieria', baseDays: 20, moistureThreshold: '100% bone dry', sensitivity: 'High', soilDrynessGoal: 'Entire pot must dry out completely to bottom before watering.' },
  { id: 'zz', name: 'ZZ Plant (Zamioculcas)', baseDays: 18, moistureThreshold: '100% bone dry', sensitivity: 'High', soilDrynessGoal: 'Underground rhizomes store water; wait for total soil dryout.' },
  { id: 'peace-lily', name: 'Peace Lily (Spathiphyllum)', baseDays: 5, moistureThreshold: 'Top 25% dry', sensitivity: 'Medium', soilDrynessGoal: 'Maintain light dampness; never let soil dry out entirely.' },
  { id: 'fiddle', name: 'Fiddle Leaf Fig & Ficus', baseDays: 9, moistureThreshold: 'Top 50% dry', sensitivity: 'High', soilDrynessGoal: 'Top 2-3 inches dry; very sensitive to soggy bottom roots.' },
  { id: 'calathea', name: 'Calathea & Prayer Plants', baseDays: 5, moistureThreshold: 'Top 20% dry', sensitivity: 'High', soilDrynessGoal: 'Evenly moist like a wrung-out sponge; sensitive to tap water salts.' },
  { id: 'spider', name: 'Spider Plant', baseDays: 7, moistureThreshold: 'Top 50% dry', sensitivity: 'Low', soilDrynessGoal: 'Tolerant; allow top 2 inches to dry between waterings.' }
];

const POT_MATERIALS = [
  { id: 'terracotta', name: 'Unfinished Terracotta / Clay', modifier: 0.72, note: 'Porous clay wicks moisture and evaporates 25-30% faster.' },
  { id: 'plastic', name: 'Plastic Nursery Pot with Holes', modifier: 1.0, note: 'Standard baseline evaporation.' },
  { id: 'ceramic', name: 'Glazed Ceramic (with drainage)', modifier: 1.15, note: 'Sealed glazed walls retain moisture longer.' },
  { id: 'hanging', name: 'Hanging Coconut Coir Basket', modifier: 0.65, note: 'High airflow causes extremely rapid dehydration.' }
];

const SOIL_TYPES = [
  { id: 'chunky', name: 'Chunky Aroid Mix (Bark + Perlite)', modifier: 0.8, note: 'High porosity drains quickly and aerates roots.' },
  { id: 'standard', name: 'Standard Peat Potting Soil', modifier: 1.0, note: 'Moderate moisture retention.' },
  { id: 'gritty', name: 'Gritty Succulent / Cactus Mix', modifier: 0.7, note: 'Ultra fast draining; dries rapidly.' },
  { id: 'dense', name: 'Dense Moisture-Retentive Peat', modifier: 1.3, note: 'Holds heavy moisture; elevated root rot risk.' }
];

const LIGHT_LEVELS = [
  { id: 'low', name: 'Low Indirect (50-100 FC)', modifier: 1.35, note: 'Slow photosynthesis reduces water consumption.' },
  { id: 'medium', name: 'Medium Indirect (100-250 FC)', modifier: 1.0, note: 'Balanced transpiration.' },
  { id: 'bright', name: 'Bright Indirect (250-600 FC)', modifier: 0.82, note: 'Active photosynthesis increases water draw.' },
  { id: 'direct', name: 'Direct Sunlight (800+ FC)', modifier: 0.68, note: 'Rapid evaporation and high transpiration.' }
];

export const WateringCalculator: React.FC = () => {
  const [selectedPlant, setSelectedPlant] = useState<string>('monstera');
  const [potSize, setPotSize] = useState<number>(8); // inches
  const [potMaterial, setPotMaterial] = useState<string>('plastic');
  const [soilType, setSoilType] = useState<string>('chunky');
  const [temperature, setTemperature] = useState<number>(72); // Fahrenheit
  const [humidity, setHumidity] = useState<number>(45); // percentage
  const [lightExposure, setLightExposure] = useState<string>('bright');
  const [season, setSeason] = useState<'summer' | 'winter'>('summer');

  const calculation = useMemo(() => {
    const plant = PLANT_TYPES.find(p => p.id === selectedPlant) || PLANT_TYPES[0];
    const material = POT_MATERIALS.find(m => m.id === potMaterial) || POT_MATERIALS[1];
    const soil = SOIL_TYPES.find(s => s.id === soilType) || SOIL_TYPES[0];
    const light = LIGHT_LEVELS.find(l => l.id === lightExposure) || LIGHT_LEVELS[2];

    // Pot size scaling (larger pots take exponentially longer to dry out)
    const potFactor = Math.pow(potSize / 6, 0.45);

    // Temperature factor (warmer = faster drying)
    const tempFactor = 1.0 - ((temperature - 70) * 0.015);

    // Humidity factor (higher humidity = slower evaporation)
    const humidityFactor = 1.0 + ((humidity - 40) * 0.008);

    // Season factor (winter dormancy drastically reduces water absorption)
    const seasonFactor = season === 'winter' ? 1.45 : 1.0;

    const rawDays = plant.baseDays * material.modifier * soil.modifier * light.modifier * potFactor * tempFactor * humidityFactor * seasonFactor;

    const minDays = Math.max(2, Math.round(rawDays * 0.85));
    const maxDays = Math.max(minDays + 2, Math.round(rawDays * 1.15));

    return {
      plant,
      material,
      soil,
      light,
      minDays,
      maxDays,
      potFactor,
      seasonFactor
    };
  }, [selectedPlant, potSize, potMaterial, soilType, temperature, humidity, lightExposure, season]);

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="rounded-2xl border border-stone-200/80 bg-white p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-3 text-emerald-800 mb-2">
          <Droplets className="w-6 h-6" />
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-800">Precision Hydration Engine</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold font-editorial text-stone-900">
          Plant Watering Calculator
        </h1>
        <p className="mt-2 text-stone-600 text-sm md:text-base leading-relaxed">
          Plants do not follow strict calendars. This calculator computes dynamic soil evaporation rates based on species physiology, container thermodynamics, light intensity, and room microclimate.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-6 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs">
          <h2 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center justify-between">
            <span>Plant & Environmental Parameters</span>
            <button
              onClick={() => {
                setSelectedPlant('monstera');
                setPotSize(8);
                setPotMaterial('plastic');
                setSoilType('chunky');
                setTemperature(72);
                setHumidity(45);
                setLightExposure('bright');
                setSeason('summer');
              }}
              className="text-xs text-stone-400 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </h2>

          {/* Plant Type */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              1. Select Plant Variety
            </label>
            <select
              value={selectedPlant}
              onChange={(e) => setSelectedPlant(e.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-stone-50/50 px-4 py-2.5 text-sm font-medium text-stone-900 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            >
              {PLANT_TYPES.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.sensitivity} Sensitivity)</option>
              ))}
            </select>
          </div>

          {/* Pot Size Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              <span>2. Pot Diameter</span>
              <span className="text-emerald-800 font-bold">{potSize} inches ({Math.round(potSize * 2.54)} cm)</span>
            </div>
            <input
              type="range"
              min="3"
              max="16"
              step="1"
              value={potSize}
              onChange={(e) => setPotSize(Number(e.target.value))}
              className="w-full accent-[#315B43] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>3" (Small cutting)</span>
              <span>8" (Standard medium)</span>
              <span>16" (Large tree pot)</span>
            </div>
          </div>

          {/* Pot Material */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              3. Pot Material & Porosity
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {POT_MATERIALS.map(mat => (
                <button
                  key={mat.id}
                  type="button"
                  onClick={() => setPotMaterial(mat.id)}
                  className={`text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                    potMaterial === mat.id
                      ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-semibold ring-1 ring-emerald-600'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-stone-50/30'
                  }`}
                >
                  <p className="font-medium text-stone-900">{mat.name}</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">{mat.note}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Soil Type */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              4. Potting Substrate Mix
            </label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-stone-50/50 px-4 py-2.5 text-sm font-medium text-stone-900 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            >
              {SOIL_TYPES.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Temperature & Humidity Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                <span className="flex items-center gap-1"><Thermometer className="w-3.5 h-3.5" /> Room Temp</span>
                <span className="text-emerald-800 font-bold">{temperature}°F ({Math.round((temperature - 32) * 5 / 9)}°C)</span>
              </div>
              <input
                type="range"
                min="55"
                max="90"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full accent-[#315B43] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                <span>Room Humidity</span>
                <span className="text-emerald-800 font-bold">{humidity}% RH</span>
              </div>
              <input
                type="range"
                min="20"
                max="85"
                value={humidity}
                onChange={(e) => setHumidity(Number(e.target.value))}
                className="w-full accent-[#315B43] cursor-pointer"
              />
            </div>
          </div>

          {/* Light Exposure & Season */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2 flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-600" /> Light Exposure
              </label>
              <select
                value={lightExposure}
                onChange={(e) => setLightExposure(e.target.value)}
                className="w-full rounded-xl border border-stone-300 bg-stone-50/50 px-3.5 py-2 text-xs font-medium text-stone-900 focus:border-emerald-600"
              >
                {LIGHT_LEVELS.map(l => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Active Season
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSeason('summer')}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                    season === 'summer'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600'
                      : 'border-stone-200 text-stone-600'
                  }`}
                >
                  ☀️ Spring/Summer
                </button>
                <button
                  type="button"
                  onClick={() => setSeason('winter')}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                    season === 'winter'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600'
                      : 'border-stone-200 text-stone-600'
                  }`}
                >
                  ❄️ Fall/Winter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border-2 border-emerald-800/30 bg-emerald-50/60 p-6 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-800">
                Recommended Check Cycle
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-200/80 text-emerald-950">
                Dynamic Metric
              </span>
            </div>

            <div className="my-5 text-center">
              <div className="text-4xl md:text-5xl font-extrabold font-editorial text-emerald-950">
                Every {calculation.minDays} – {calculation.maxDays} Days
              </div>
              <p className="text-xs font-medium text-emerald-800 mt-2">
                Check moisture around Day {calculation.minDays}. Water only when criteria met.
              </p>
            </div>

            {/* Species Rule */}
            <div className="rounded-xl bg-white/90 p-4 border border-emerald-200/80 space-y-2 text-xs text-stone-700 shadow-xs">
              <div className="flex items-center gap-2 font-semibold text-stone-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Dryness Target for {calculation.plant.name}:</span>
              </div>
              <p className="text-stone-600 pl-6 leading-relaxed">
                {calculation.plant.soilDrynessGoal}
              </p>
              <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>Moisture goal: <strong>{calculation.plant.moistureThreshold}</strong></span>
                <span>Pot volume factor: <strong>{calculation.potFactor.toFixed(2)}x</strong></span>
              </div>
            </div>

            {/* Environmental Modifiers Breakdown */}
            <div className="mt-5 space-y-2 text-xs">
              <h3 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                Active Microclimate Influence
              </h3>
              <ul className="space-y-1.5 text-stone-600 text-[11px]">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span><strong>{calculation.material.name}:</strong> {calculation.material.note}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span><strong>{calculation.soil.name}:</strong> {calculation.soil.note}</span>
                </li>
                {season === 'winter' && (
                  <li className="flex items-start gap-1.5 text-amber-900">
                    <span className="font-bold">•</span>
                    <span><strong>Winter Dormancy:</strong> Transpiration slowed ~35-45% due to reduced daylight.</span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Scientific Botanical Disclaimer */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Scientific Botanical Disclaimer</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              No calculator can replace the tactile feel of soil. Always verify physical soil dampness with your finger or a wooden skewer before pouring water. Never water if the root ball remains cool and soggy.
            </p>
          </div>
        </div>
      </div>

      {/* AdSense Placement safely below calculator results */}
      <AdSlot type="responsive" />

      {/* Educational Technique Section */}
      <div className="rounded-2xl border border-stone-200/80 bg-white p-6 md:p-8 space-y-4">
        <h3 className="text-xl font-bold font-editorial text-stone-900 flex items-center gap-2">
          <Info className="w-5 h-5 text-emerald-700" />
          The Science of Soil Moisture: How to Test Accurately
        </h3>
        <p className="text-sm text-stone-600 leading-relaxed">
          Indoor plant roots absorb water in conjunction with cellular photosynthesis. If light is low or the pot is large, water molecules remain trapped in the pore spaces between soil particles, displacing oxygen.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="rounded-xl bg-stone-50 p-4 border border-stone-200/60">
            <h4 className="font-bold text-sm text-stone-900 mb-1">1. The 2-Inch Finger Test</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Insert your index finger past the second knuckle. If the soil clings to your skin like damp coffee grounds, wait. If it feels crumbly, powdery, and warm, it is ready.
            </p>
          </div>
          <div className="rounded-xl bg-stone-50 p-4 border border-stone-200/60">
            <h4 className="font-bold text-sm text-stone-900 mb-1">2. Wooden Skewer Dip</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Slide a 10-inch bamboo skewer to the bottom of the pot. Leave 2 minutes. Pull out: damp soil will discolor the bamboo deep down, showing if the lower root zone is still saturated.
            </p>
          </div>
          <div className="rounded-xl bg-stone-50 p-4 border border-stone-200/60">
            <h4 className="font-bold text-sm text-stone-900 mb-1">3. The Heft Test</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Pick up the pot immediately after thorough watering to feel its maximum weight. Pick it up before watering: a dry plant feels featherlight by comparison.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
