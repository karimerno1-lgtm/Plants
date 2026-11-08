import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-white p-6 sm:p-12 rounded-3xl border border-stone-200/80 shadow-xs text-stone-700 leading-relaxed text-sm sm:text-base">
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
          <AlertCircle className="w-4 h-4 text-amber-700" /> Botanical Advisory
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-editorial text-stone-900">
          Horticultural & Veterinary Disclaimer
        </h1>
        <p className="text-xs text-stone-400">
          Official Notice for PlantCare Lab (https://plants.wdbloog.com)
        </p>
      </div>

      <section className="space-y-3 p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950">
        <h2 className="text-base font-bold flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
          No Universal Dosage or Watering Guarantee
        </h2>
        <p className="text-xs sm:text-sm leading-relaxed">
          Plants are dynamic living biological organisms. Microclimate factors including localized heating drafts, altitude, pot depth, root health, and seasonal sunlight vary between households. Our calculators provide evidence-based estimates, but they cannot substitute for physical observation of soil moisture and plant foliage turgidity.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold font-editorial text-stone-900">1. Soil Moisture Checks Over Calendar Schedules</h2>
        <p>
          Always verify that the soil is physically dry at the recommended depth (using the finger or wooden skewer test) before watering. Never pour water into a pot that feels wet, cold, or heavy, regardless of whether a calculator schedule indicates it is time.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold font-editorial text-stone-900">2. Pet Toxicity and Ingestion Warnings</h2>
        <p>
          Pet toxicity assessments provided on PlantCare Lab are sourced from veterinary literature and the ASPCA Animal Poison Control Center. However, individual animals may react differently depending on body weight and pre-existing medical conditions. If you suspect your cat or dog has ingested a toxic plant, immediately contact your local veterinarian or the ASPCA Poison Control Hotline (888-426-4435 in the US).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold font-editorial text-stone-900">3. Fertilizer Formulation Precautions</h2>
        <p>
          Always adhere to the specific concentration guidelines listed on your manufacturer's label. Our fertilizer calculator provides mathematical dilutions, but excessive fertilization of already-stressed or dehydrated roots can cause chemical root scorch.
        </p>
      </section>
    </div>
  );
};
