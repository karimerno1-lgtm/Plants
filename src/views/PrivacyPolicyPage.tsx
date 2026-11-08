import React from 'react';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';
import { ADSENSE_CONFIG } from '../config/adsense';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-white p-6 sm:p-12 rounded-3xl border border-stone-200/80 shadow-xs text-stone-700 leading-relaxed text-sm sm:text-base">
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
          <ShieldCheck className="w-4 h-4" /> Compliance & Transparency
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-editorial text-stone-900">
          Privacy Policy
        </h1>
        <p className="text-xs text-stone-400">
          Effective Date: November 2026 • Website: https://plants.wdbloog.com
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold font-editorial text-stone-900">1. Introduction</h2>
        <p>
          PlantCare Lab ("we", "our", or "us") operates https://plants.wdbloog.com. We respect your privacy and are committed to protecting personal data. This privacy policy explains how we handle technical information, analytics, and advertising cookies when you interact with our calculators and care guides.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold font-editorial text-stone-900">2. Google AdSense & Advertising Cookies</h2>
        <p>
          We use Google AdSense (Publisher ID: {ADSENSE_CONFIG.PUBLISHER_ID}) to monetize our free botanical calculators. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites on the Internet:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
          <li>Google's use of advertising cookies enables it and its partners to serve ads to users based on their visits to our site and/or other sites on the Internet.</li>
          <li>Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-800 underline">Google Ads Settings</a>.</li>
          <li>Alternatively, you can opt out of third-party vendor cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-emerald-800 underline">aboutads.info</a>.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold font-editorial text-stone-900">3. Information We Collect</h2>
        <p>
          PlantCare Lab operates on a minimal data collection principle. We do not require account registration or collect sensitive personal identifiers:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
          <li><strong>Calculator Inputs:</strong> All measurements you enter into our watering, lighting, and soil calculators are processed client-side in your browser memory and are never uploaded or stored on our servers.</li>
          <li><strong>PWA Local Storage:</strong> Preferences such as cookie consent status are saved locally on your device via standard browser localStorage.</li>
          <li><strong>Server Logs:</strong> Standard web server logs collect non-identifiable technical data (browser type, referring URL, timestamp) for security and DDoS mitigation.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold font-editorial text-stone-900">4. GDPR and CCPA Privacy Rights</h2>
        <p>
          Residents of the European Economic Area (EEA), United Kingdom, and California enjoy statutory data rights, including the right to access, rectify, or request deletion of any personal communications submitted to our desk, and the right to reject non-essential marketing cookies at any time via our Cookie Preferences banner.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold font-editorial text-stone-900">5. Contact Information</h2>
        <p>
          For privacy inquiries or data rights requests, contact our privacy desk at support@plants.wdbloog.com.
        </p>
      </section>
    </div>
  );
};
