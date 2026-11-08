import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';

interface CookieBannerProps {
  onNavigate: (path: string) => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onNavigate }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('plantcare_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('plantcare_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDeclineOptional = () => {
    localStorage.setItem('plantcare_cookie_consent', 'essential_only');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-50 rounded-2xl bg-white p-5 shadow-2xl border border-stone-200 animate-fade-in"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 flex-1">
          <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
            Privacy & Cookie Preferences
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            PlantCare Lab uses essential cookies to save your calculator preferences, preserve session performance, and deliver non-intrusive Google AdSense sponsor ads.
          </p>
          <div className="pt-1 flex items-center gap-3 text-[11px] text-stone-500">
            <button
              onClick={() => onNavigate('/cookie-policy')}
              className="text-emerald-800 underline hover:text-emerald-950 cursor-pointer"
            >
              Cookie Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('/privacy-policy')}
              className="text-emerald-800 underline hover:text-emerald-950 cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={handleAcceptAll}
          className="flex-1 py-2 px-3 bg-[#315B43] hover:bg-[#254A36] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          Accept All
        </button>
        <button
          onClick={handleDeclineOptional}
          className="py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
        >
          Essential Only
        </button>
      </div>
    </div>
  );
};
