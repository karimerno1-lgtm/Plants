import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-white p-6 sm:p-12 rounded-3xl border border-stone-200/80 shadow-xs text-stone-700 leading-relaxed text-sm sm:text-base">
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black font-editorial text-stone-900">
          Terms of Service
        </h1>
        <p className="text-xs text-stone-400">
          Last Updated: November 2026 • Website: https://plants.wdbloog.com
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold font-editorial text-stone-900">1. Acceptance of Terms</h2>
        <p>
          By accessing or using the PlantCare Lab web application, progressive web app, calculators, or guides, you agree to be bound by these Terms of Service. If you do not agree, please do not use the application.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold font-editorial text-stone-900">2. Intellectual Property</h2>
        <p>
          All proprietary algorithms, calculator software, textual care guides, diagrams, and design elements are the intellectual property of PlantCare Lab. You may not scrape, republish, or commercialize our mathematical calculator engines without explicit written consent.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold font-editorial text-stone-900">3. Non-Commercial Personal Use</h2>
        <p>
          Users are granted a non-exclusive, revocable license to utilize the tools and guides for personal indoor horticultural management.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold font-editorial text-stone-900">4. Modifications to Service</h2>
        <p>
          We reserve the right to refine, enhance, or discontinue any calculator or dossier at our discretion without prior notice.
        </p>
      </section>
    </div>
  );
};
