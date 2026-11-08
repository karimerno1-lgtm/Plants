import React from 'react';
import { Cookie, CheckCircle2 } from 'lucide-react';
import { ADSENSE_CONFIG } from '../config/adsense';

export const CookiePolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-white p-6 sm:p-12 rounded-3xl border border-stone-200/80 shadow-xs text-stone-700 leading-relaxed text-sm sm:text-base">
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
          <Cookie className="w-4 h-4" /> Transparency
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-editorial text-stone-900">
          Cookie Policy & Ad Choices
        </h1>
        <p className="text-xs text-stone-400">
          PlantCare Lab • Publisher ID: {ADSENSE_CONFIG.PUBLISHER_ID}
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold font-editorial text-stone-900">What Are Cookies?</h2>
        <p>
          Cookies are small text fragments stored in your browser by websites you visit. They help retain preferences, preserve session states, and measure web traffic.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-editorial text-stone-900">Cookies Deployed on PlantCare Lab</h2>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm">
            <h3 className="font-bold text-stone-900">1. Essential Technical Cookies & LocalStorage</h3>
            <p className="text-stone-600 mt-1">
              Required for the progressive web app (PWA) offline cache, service worker registration, and recording whether you have acknowledged our cookie consent modal. These cannot be disabled.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm">
            <h3 className="font-bold text-stone-900">2. Google AdSense Advertising Cookies</h3>
            <p className="text-stone-600 mt-1">
              Google uses cookies to serve ads across our content. Google's advertising cookies allow it to serve relevant advertisements based on a user's browsing history across the web. You can manage and disable personalized ads at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-800 underline font-semibold">Google Ads Settings</a>.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold font-editorial text-stone-900">Managing Your Cookie Preferences</h2>
        <p>
          You can modify or reset your cookie preferences at any time by clearing your browser's local cache or clicking the button below:
        </p>
        <button
          onClick={() => {
            localStorage.removeItem('plantcare_cookie_consent');
            window.location.reload();
          }}
          className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-xs"
        >
          Reset Cookie Consent Modal
        </button>
      </section>
    </div>
  );
};
