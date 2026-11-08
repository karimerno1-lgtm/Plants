import React, { useState, useMemo } from 'react';
import { AdSlot } from '../ads/AdSlot';
import { Activity, AlertCircle, CheckCircle2, ChevronRight, Stethoscope } from 'lucide-react';

interface DiagnosticResult {
  title: string;
  probability: number;
  urgency: 'Critical' | 'Moderate' | 'Mild';
  explanation: string;
  immediateActions: string[];
  prevention: string;
}

export const ProblemChecker: React.FC = () => {
  const [symptom, setSymptom] = useState<string>('yellow');
  const [location, setLocation] = useState<string>('lower');
  const [soilFeel, setSoilFeel] = useState<string>('wet');
  const [lightLevel, setLightLevel] = useState<string>('low');

  const diagnostics = useMemo((): DiagnosticResult[] => {
    const list: DiagnosticResult[] = [];

    // Yellow leaves logic
    if (symptom === 'yellow') {
      if (soilFeel === 'wet') {
        list.push({
          title: 'Overwatering & Early Root Hypoxia / Rot',
          probability: 88,
          urgency: 'Critical',
          explanation: 'When soil remains saturated, roots are starved of oxygen. Cells collapse and opportunistic pathogens attack root tissue, causing lower leaves to turn chlorotic yellow and drop.',
          immediateActions: [
            'Slide plant out of pot and inspect roots for brown/mushy sections.',
            'Trim damaged roots with shears sanitized in rubbing alcohol.',
            'Let root ball aerate on newspaper for 4 hours, then repot into chunky airy mix.'
          ],
          prevention: 'Ensure pot has functional drainage holes and let top 50% of soil dry before watering.'
        });
      }
      if (soilFeel === 'dry') {
        list.push({
          title: 'Chronic Underwatering / Moisture Stress',
          probability: 72,
          urgency: 'Moderate',
          explanation: 'The plant is abandoning older lower leaves to conserve scarce water for newer growth nodes.',
          immediateActions: [
            'Give a thorough bottom-soak in a sink basin for 30 minutes until soil rehydrates.',
            'Discard drained water after 20 minutes.'
          ],
          prevention: 'Establish a routine of checking the top 2 inches of soil weekly.'
        });
      }
      if (location === 'lower' && soilFeel === 'balanced' && lightLevel !== 'low') {
        list.push({
          title: 'Natural Leaf Senescence (Normal Aging)',
          probability: 65,
          urgency: 'Mild',
          explanation: 'Older, lowermost leaves naturally reach the end of their lifecycle as the canopy grows taller and shades them.',
          immediateActions: [
            'Wait until the leaf turns completely yellow/dry, then gently pull or snip off at stem base.'
          ],
          prevention: 'No treatment needed; normal healthy physiological cycle.'
        });
      }
    }

    // Brown tips logic
    if (symptom === 'brown_tips') {
      if (soilFeel === 'wet') {
        list.push({
          title: 'Edema & Root Saturation Shock',
          probability: 75,
          urgency: 'Moderate',
          explanation: 'Roots absorb more water than leaves can transpire, causing cellular walls in leaf tips to rupture and die.',
          immediateActions: [
            'Extend interval between waterings and improve room air circulation.'
          ],
          prevention: 'Water only when required by species moisture thresholds.'
        });
      } else {
        list.push({
          title: 'Low Ambient Humidity or Tap Water Fluoride',
          probability: 85,
          urgency: 'Moderate',
          explanation: 'Indoor heating/AC drops relative humidity below 40%, drying delicate leaf tips. Fluoride and chlorine in municipal tap water also accumulate at leaf extremities.',
          immediateActions: [
            'Switch to filtered, distilled, or rainwater for sensitive species (Calathea, Spider Plant, Peace Lily).',
            'Place plant on a pebble tray or run an evaporative humidifier.'
          ],
          prevention: 'Maintain 50%+ relative humidity.'
        });
      }
    }

    // Drooping logic
    if (symptom === 'drooping') {
      if (soilFeel === 'dry') {
        list.push({
          title: 'Severe Dehydration & Turgor Pressure Loss',
          probability: 95,
          urgency: 'Moderate',
          explanation: 'Plant cell vacuoles have depleted their water reserves, causing foliage to go limp.',
          immediateActions: [
            'Deeply water the plant; leaves usually perk up within 2–6 hours.'
          ],
          prevention: 'Water as soon as the top few inches dry out.'
        });
      } else if (soilFeel === 'wet') {
        list.push({
          title: 'Advanced Root Rot (Counter-Intuitive Wilting)',
          probability: 89,
          urgency: 'Critical',
          explanation: 'Even though soil is soaked, rotten dead roots can no longer take up water to foliage, so the plant wilts as if bone dry.',
          immediateActions: [
            'Unpot immediately; prune all black mushy roots; dip in 3% diluted hydrogen peroxide and repot dry.'
          ],
          prevention: 'Always use fast-draining chunky aroid soil and nursery pots with drainage.'
        });
      }
    }

    // Leaf spots logic
    if (symptom === 'spots') {
      if (lightLevel === 'direct') {
        list.push({
          title: 'Solar Scorch / Sunburn',
          probability: 82,
          urgency: 'Mild',
          explanation: 'Intense direct magnification from window glass has scorched chlorophyll in leaf tissue.',
          immediateActions: [
            'Move plant 2-3 feet back from window or hang sheer linen curtains.'
          ],
          prevention: 'Gradually acclimate indoor plants to brighter spots over 2 weeks.'
        });
      } else {
        list.push({
          title: 'Fungal or Bacterial Leaf Spot (Cercospora / Pseudomonas)',
          probability: 78,
          urgency: 'Moderate',
          explanation: 'Misting leaves indoors leaves water droplets standing on foliage, allowing fungal spores to germinate into brown spots with yellow halos.',
          immediateActions: [
            'Stop all overhead leaf misting immediately.',
            'Prune heavily infected leaves with sterilized shears.',
            'Improve room airflow with an oscillating fan.'
          ],
          prevention: 'Never wet leaves when ambient air is stagnant.'
        });
      }
    }

    // Slow growth logic
    if (symptom === 'slow_growth') {
      list.push({
        title: 'Insufficient Photosynthetic Light Energy',
        probability: 84,
        urgency: 'Mild',
        explanation: 'The human eye perceives rooms as bright, but light meters reveal less than 50 FC—insufficient photons to synthesize new vegetative tissue.',
        immediateActions: [
          'Move closer to an East or South-facing window, or install a full-spectrum LED grow bulb.'
        ],
        prevention: 'Use the PlantCare Lab Light Finder to measure foot-candles.'
      });
      list.push({
        title: 'Severely Rootbound Container',
        probability: 68,
        urgency: 'Mild',
        explanation: 'Roots have filled all available soil space, leaving zero room for root expansion or nutrient uptake.',
        immediateActions: [
          'Repot into a container 1 to 2 inches larger in diameter.'
        ],
        prevention: 'Repot every 18–24 months during spring.'
      });
    }

    return list.sort((a, b) => b.probability - a.probability);
  }, [symptom, location, soilFeel, lightLevel]);

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="rounded-2xl border border-stone-200/80 bg-white p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-3 text-emerald-800 mb-2">
          <Stethoscope className="w-6 h-6 text-emerald-700" />
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-800">Clinical Symptom Triage</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold font-editorial text-stone-900">
          Plant Problem Checker & Diagnostic Engine
        </h1>
        <p className="mt-2 text-stone-600 text-sm md:text-base leading-relaxed">
          Plants communicate stress through distinct physical patterns. Input your plant's symptoms and microclimate factors to uncover probable horticultural causes and emergency rescue protocols.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Diagnostic Form (6 Cols) */}
        <div className="lg:col-span-6 space-y-6 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs">
          <h2 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-700" />
            Triage Question Checklist
          </h2>

          {/* Symptom */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              1. Primary Observable Symptom
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'yellow', label: '🟡 Yellowing Leaves' },
                { id: 'brown_tips', label: '🟤 Brown Crispy Tips' },
                { id: 'drooping', label: '🥀 Limp / Drooping Leaves' },
                { id: 'spots', label: '🍂 Leaf Spots / Rings' },
                { id: 'slow_growth', label: '⏳ Stunted / Slow Growth' }
              ].map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSymptom(s.id)}
                  className={`p-3 text-left rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    symptom === s.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600 shadow-xs'
                      : 'border-stone-200 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location on Plant */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              2. Where is it occurring?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'lower', label: 'Bottom / Old Leaves' },
                { id: 'new', label: 'Brand New Growth' },
                { id: 'all', label: 'All Over Plant' }
              ].map(loc => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setLocation(loc.id)}
                  className={`p-2.5 text-center rounded-xl border text-xs cursor-pointer ${
                    location === loc.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-600'
                      : 'border-stone-200 text-stone-700'
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Soil Moisture Feel Right Now */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              3. Current Soil State (Checked 2" deep)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'wet', label: '💧 Soggy / Dark Wet' },
                { id: 'balanced', label: '🌱 Lightly Damp' },
                { id: 'dry', label: '🏜️ Bone Dry / Powdery' }
              ].map(feel => (
                <button
                  key={feel.id}
                  type="button"
                  onClick={() => setSoilFeel(feel.id)}
                  className={`p-2.5 text-center rounded-xl border text-xs cursor-pointer ${
                    soilFeel === feel.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-600'
                      : 'border-stone-200 text-stone-700'
                  }`}
                >
                  {feel.label}
                </button>
              ))}
            </div>
          </div>

          {/* Light Exposure */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              4. Light Exposure Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'low', label: 'Dim / Deep Shade' },
                { id: 'bright', label: 'Bright Indirect' },
                { id: 'direct', label: 'Hot Direct Sun' }
              ].map(lt => (
                <button
                  key={lt.id}
                  type="button"
                  onClick={() => setLightLevel(lt.id)}
                  className={`p-2.5 text-center rounded-xl border text-xs cursor-pointer ${
                    lightLevel === lt.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-600'
                      : 'border-stone-200 text-stone-700'
                  }`}
                >
                  {lt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Diagnostic Results (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-800">
              Ranked Potential Diagnoses ({diagnostics.length})
            </span>
            <span className="text-[11px] text-stone-400">Based on clinical botanical patterns</span>
          </div>

          {diagnostics.map((diag, index) => (
            <div
              key={index}
              className={`rounded-2xl border p-5 bg-white shadow-xs transition-all ${
                index === 0 ? 'border-2 border-emerald-600 ring-2 ring-emerald-600/10' : 'border-stone-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-stone-900">{diag.title}</span>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    diag.urgency === 'Critical' ? 'bg-rose-100 text-rose-800' : diag.urgency === 'Moderate' ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 text-stone-700'
                  }`}>
                    {diag.urgency}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-900">
                    {diag.probability}% Match
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                {diag.explanation}
              </p>

              <div className="rounded-xl bg-stone-50 p-3 border border-stone-200/60 space-y-2 text-xs">
                <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Immediate Rescue Actions:
                </div>
                <ul className="space-y-1 text-stone-600 pl-5 list-disc text-[11px]">
                  {diag.immediateActions.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-2.5 text-[11px] text-emerald-900 font-medium">
                <strong>Prevention:</strong> {diag.prevention}
              </div>
            </div>
          ))}

          {/* Plant Pathology Disclaimer */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 text-[11px] text-stone-500 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
            <span>
              Disclaimer: Symptoms can occasionally overlap between pest infestations (spider mites, thrips) and fungal disease. Always check the undersides of leaves with a magnifying glass for tiny webs or insects.
            </span>
          </div>
        </div>
      </div>

      <AdSlot type="responsive" />
    </div>
  );
};
