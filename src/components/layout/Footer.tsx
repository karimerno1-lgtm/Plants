import React from 'react';
import { PWAInstallButton } from '../pwa/PWAInstallButton';
import { Leaf, ShieldCheck, Heart, Sparkles, ExternalLink } from 'lucide-react';
import { TOOLS_DATA } from '../../data/tools';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-stone-200 bg-[#1B3527] text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-xs">
                <Leaf className="w-5 h-5 text-emerald-200" />
              </div>
              <span className="text-xl font-bold font-editorial text-white tracking-tight">
                PlantCare <span className="text-emerald-400">Lab</span>
              </span>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed max-w-md">
              PlantCare Lab is an independent botanical laboratory providing science-backed indoor plant watering calculators, lighting diagnostics, custom soil mix formulations, and comprehensive houseplant care guides.
            </p>

            <div className="pt-2">
              <PWAInstallButton variant="footer" />
            </div>

            <div className="pt-2 flex items-center gap-3 text-xs text-stone-400">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Peer-Reviewed Botany
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-emerald-400" /> Zero Guesswork
              </span>
            </div>
          </div>

          {/* Tools Col */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
              Calculators & Tools
            </h3>
            <ul className="space-y-2 text-xs">
              {TOOLS_DATA.slice(0, 5).map(t => (
                <li key={t.slug}>
                  <button
                    onClick={() => handleNav(`/tools/${t.slug}`)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.shortTitle}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNav('/tools')}
                  className="text-emerald-300 hover:text-white font-semibold cursor-pointer"
                >
                  All 8 Tools →
                </button>
              </li>
            </ul>
          </div>

          {/* Plants & Guides Col */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
              Species & Guides
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('/plants/monstera-deliciosa')} className="hover:text-white transition-colors cursor-pointer">
                  Monstera Deliciosa Care
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/plants/pothos')} className="hover:text-white transition-colors cursor-pointer">
                  Golden Pothos Guide
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/plants/snake-plant')} className="hover:text-white transition-colors cursor-pointer">
                  Snake Plant Profile
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/plants/fiddle-leaf-fig')} className="hover:text-white transition-colors cursor-pointer">
                  Fiddle Leaf Fig Care
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/guides')} className="text-emerald-300 hover:text-white font-semibold cursor-pointer">
                  All Care Guides →
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Legal Col */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
              Trust & Legal
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('/about')} className="hover:text-white transition-colors cursor-pointer">
                  About the Lab
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact & Inquiries
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/privacy-policy')} className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/terms')} className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/disclaimer')} className="hover:text-white transition-colors cursor-pointer">
                  Horticultural Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/cookie-policy')} className="hover:text-white transition-colors cursor-pointer">
                  Cookie Policy & Consent
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* AdSense and Publisher Disclosure */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 text-center text-xs text-stone-400 space-y-2">
          <p>
            PlantCare Lab (https://plants.wdbloog.com) is supported by non-intrusive Google AdSense advertising.
          </p>
          <p className="text-[11px] text-stone-500">
            © {new Date().getFullYear()} PlantCare Lab. All rights reserved. Botanical advice is provided for educational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};
