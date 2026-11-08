import React, { useState, useMemo } from 'react';
import { AdSlot } from '../ads/AdSlot';
import { Gauge, Droplets, Thermometer, AlertCircle, Wind, CheckCircle2 } from 'lucide-react';

export const HumidityCalculator: React.FC = () => {
  const [humidity, setHumidity] = useState<number>(38); // 38% default dry indoor room
  const [tempF, setTempF] = useState<number>(72);
  const [plantProfile, setPlantProfile] = useState<'high' | 'moderate' | 'low'>('high');

  const vpdCalculation = useMemo(() => {
    // Temp in Celsius
    const tempC = (tempF - 32) * (5 / 9);

    // Saturation Vapor Pressure (VP_sat) in kPa using Tetens equation:
    // VP_sat = 0.61078 * exp((17.27 * T) / (T + 237.3))
    const vpSat = 0.61078 * Math.exp((17.27 * tempC) / (tempC + 237.3));

    // Actual Vapor Pressure (VP_air)
    const vpAir = vpSat * (humidity / 100);

    // VPD in kPa
    const vpd = Math.max(0.1, vpSat - vpAir);

    let status = 'Optimal Comfort';
    let statusColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
    let advisory = 'Plants transpire at a healthy, steady metabolic rate.';

    if (vpd > 1.4) {
      status = 'Severe Transpiration Stress (Too Dry)';
      statusColor = 'text-rose-800 bg-rose-50 border-rose-300';
      advisory = 'The dry air is pulling moisture out of leaf stomata faster than roots can draw water, causing brown crispy margins.';
    } else if (vpd > 1.0) {
      status = 'Moderate Moisture Deficit';
      statusColor = 'text-amber-800 bg-amber-50 border-amber-300';
      advisory = 'Acceptable for hardy plants, but sensitive foliage (Calatheas, Ferns) will show tip burn.';
    } else if (vpd < 0.4) {
      status = 'Stagnant High Humidity (Mold Risk)';
      statusColor = 'text-blue-800 bg-blue-50 border-blue-300';
      advisory = 'Transpiration is stalled. Ensure adequate oscillating air movement to prevent powdery mildew.';
    }

    return {
      tempC: tempC.toFixed(1),
      vpd: vpd.toFixed(2),
      status,
      statusColor,
      advisory
    };
  }, [humidity, tempF]);

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="rounded-2xl border border-stone-200/80 bg-white p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-3 text-emerald-800 mb-2">
          <Gauge className="w-6 h-6 text-emerald-700" />
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-800">Atmospheric Thermodynamics</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold font-editorial text-stone-900">
          Plant Humidity & Vapor Pressure Deficit (VPD) Calculator
        </h1>
        <p className="mt-2 text-stone-600 text-sm md:text-base leading-relaxed">
          Relative humidity alone only tells half the story. Vapor Pressure Deficit (VPD) measures the drying power of ambient air on leaf tissue. Calculate your room's VPD to prevent crispy edges and curled leaves.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls (6 Cols) */}
        <div className="lg:col-span-6 space-y-6 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs">
          <h2 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
            Room Climate Measurements
          </h2>

          {/* Humidity Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              <span className="flex items-center gap-1.5"><Droplets className="w-4 h-4 text-sky-600" /> Relative Humidity</span>
              <span className="text-emerald-800 font-bold">{humidity}% RH</span>
            </div>
            <input
              type="range"
              min="15"
              max="90"
              value={humidity}
              onChange={(e) => setHumidity(Number(e.target.value))}
              className="w-full accent-[#315B43] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>15% (Dry Winter Heater)</span>
              <span>45% (Typical Indoor)</span>
              <span>80% (Greenhouse)</span>
            </div>
          </div>

          {/* Temperature Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              <span className="flex items-center gap-1.5"><Thermometer className="w-4 h-4 text-amber-600" /> Ambient Temperature</span>
              <span className="text-emerald-800 font-bold">{tempF}°F ({vpdCalculation.tempC}°C)</span>
            </div>
            <input
              type="range"
              min="58"
              max="92"
              value={tempF}
              onChange={(e) => setTempF(Number(e.target.value))}
              className="w-full accent-[#315B43] cursor-pointer"
            />
          </div>

          {/* Plant Sensitivity Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Plant Group Sensitivity
            </label>
            <div className="space-y-2">
              {[
                { id: 'high', title: 'High Humidity Specialists (Calathea, Ferns, Maranta, Alocasia)', target: '60% – 80% RH' },
                { id: 'moderate', title: 'Standard Tropical Foliage (Monstera, Pothos, Philodendron, Ficus)', target: '45% – 60% RH' },
                { id: 'low', title: 'Drought & Arid Foliage (Snake Plant, ZZ Plant, Cacti)', target: '30% – 45% RH' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPlantProfile(item.id as 'high' | 'moderate' | 'low')}
                  className={`w-full text-left p-3 rounded-xl border text-xs cursor-pointer ${
                    plantProfile === item.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-600'
                      : 'border-stone-200 text-stone-700 bg-stone-50/40'
                  }`}
                >
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-[11px] text-emerald-800 mt-0.5 font-medium">Optimal: {item.target}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-2xl border-2 border-emerald-800/20 bg-white p-6 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-800">
                Calculated Vapor Pressure Deficit
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${vpdCalculation.statusColor}`}>
                {vpdCalculation.vpd} kPa
              </span>
            </div>

            <div className="my-6 text-center">
              <div className="text-2xl md:text-3xl font-bold font-editorial text-stone-900">
                {vpdCalculation.status}
              </div>
              <p className="text-xs text-stone-600 mt-2 max-w-sm mx-auto leading-relaxed">
                {vpdCalculation.advisory}
              </p>
            </div>

            {/* Tactical Interventions */}
            <div className="space-y-3 pt-3 border-t border-stone-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Proven Humidity Elevation Methods
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="font-bold text-stone-900">1. Ultrasonic Humidifier</div>
                  <div className="text-[11px] text-stone-600 mt-0.5">+15% to 35% RH. The gold standard for indoor tropical gardens.</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="font-bold text-stone-900">2. Plant Grouping Canopy</div>
                  <div className="text-[11px] text-stone-600 mt-0.5">+5% to 10% RH. Grouping creates a shared communal microclimate.</div>
                </div>
              </div>
            </div>

            {/* The Misting Myth Buster */}
            <div className="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <strong>Why Misting Is Ineffective:</strong> Hand spray bottles only elevate relative humidity for 5 to 10 minutes before dissipating, while standing water droplets encourage leaf spot pathogens. Use continuous evaporative or ultrasonic humidification instead.
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdSlot type="responsive" />
    </div>
  );
};
