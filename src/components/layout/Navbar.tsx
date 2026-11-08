import React, { useState } from 'react';
import { PWAInstallButton } from '../pwa/PWAInstallButton';
import { Search, Menu, X, Leaf, Wrench, BookOpen, Compass, ChevronDown } from 'lucide-react';
import { TOOLS_DATA } from '../../data/tools';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLinkActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-[#FAF9F5]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => handleNav('/')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[#315B43] group-hover:bg-[#254A36] flex items-center justify-center text-white shadow-xs transition-colors">
              <Leaf className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <span className="text-lg font-bold font-editorial text-stone-900 tracking-tight block leading-tight">
                PlantCare <span className="text-[#315B43]">Lab</span>
              </span>
              <span className="text-[10px] font-medium tracking-wide uppercase text-stone-500 block">
                Tools & Guides
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-stone-700">
            {/* Tools Dropdown */}
            <div className="relative" onMouseLeave={() => setToolsDropdownOpen(false)}>
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                onMouseEnter={() => setToolsDropdownOpen(true)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  currentPath.startsWith('/tools') ? 'text-emerald-900 font-bold bg-emerald-50/80' : 'hover:text-stone-900 hover:bg-stone-100/60'
                }`}
              >
                <Wrench className="w-4 h-4 text-emerald-800" />
                <span>Calculators</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute left-0 mt-1 w-80 rounded-2xl border border-stone-200/80 bg-white p-2 shadow-xl animate-fade-in">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Scientific Tools & Calculators
                  </div>
                  <div className="space-y-1">
                    {TOOLS_DATA.map(t => (
                      <button
                        key={t.slug}
                        onClick={() => handleNav(`/tools/${t.slug}`)}
                        className="w-full text-left p-2 rounded-xl hover:bg-emerald-50/80 transition-colors cursor-pointer group"
                      >
                        <div className="text-xs font-semibold text-stone-900 group-hover:text-emerald-950">
                          {t.shortTitle}
                        </div>
                        <div className="text-[11px] text-stone-500 truncate">
                          {t.tagline}
                        </div>
                      </button>
                    ))}
                    <div className="pt-1.5 border-t border-stone-100">
                      <button
                        onClick={() => handleNav('/tools')}
                        className="w-full py-1.5 text-center text-xs font-bold text-emerald-800 hover:text-emerald-950 cursor-pointer"
                      >
                        Browse All 8 Tools →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Plants Catalog */}
            <button
              onClick={() => handleNav('/plants')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                isLinkActive('/plants') ? 'text-emerald-900 font-bold bg-emerald-50/80' : 'hover:text-stone-900 hover:bg-stone-100/60'
              }`}
            >
              <Leaf className="w-4 h-4 text-emerald-800" />
              <span>Plant Library</span>
            </button>

            {/* Care Guides */}
            <button
              onClick={() => handleNav('/guides')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                isLinkActive('/guides') ? 'text-emerald-900 font-bold bg-emerald-50/80' : 'hover:text-stone-900 hover:bg-stone-100/60'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-800" />
              <span>Care Guides</span>
            </button>
          </nav>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-xl border border-stone-200/80 bg-white px-3 py-1.5 text-xs text-stone-500 hover:border-emerald-600/50 hover:text-stone-900 shadow-2xs transition-all cursor-pointer"
            title="Search tools, plants and articles (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-stone-400" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden sm:inline-block rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-mono text-stone-400">
              ⌘K
            </kbd>
          </button>

          {/* PWA Install Button */}
          <PWAInstallButton variant="nav" />

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#FAF9F5] px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-400 px-2">
            Navigation
          </div>
          <div className="space-y-1">
            <button
              onClick={() => handleNav('/tools')}
              className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-stone-800 hover:bg-emerald-50 flex items-center gap-2.5"
            >
              <Wrench className="w-4 h-4 text-emerald-800" />
              <span>All 8 Calculators & Tools</span>
            </button>
            <button
              onClick={() => handleNav('/plants')}
              className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-stone-800 hover:bg-emerald-50 flex items-center gap-2.5"
            >
              <Leaf className="w-4 h-4 text-emerald-800" />
              <span>Plant Library (10 Core Species)</span>
            </button>
            <button
              onClick={() => handleNav('/guides')}
              className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-stone-800 hover:bg-emerald-50 flex items-center gap-2.5"
            >
              <BookOpen className="w-4 h-4 text-emerald-800" />
              <span>Horticulture Care Guides</span>
            </button>
          </div>

          <div className="pt-2 border-t border-stone-200">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-400 px-2 mb-2">
              Popular Calculators
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleNav('/tools/plant-watering-calculator')}
                className="p-2.5 text-left rounded-lg bg-white border border-stone-200/80 font-medium text-stone-900"
              >
                💧 Watering Calculator
              </button>
              <button
                onClick={() => handleNav('/tools/plant-light-finder')}
                className="p-2.5 text-left rounded-lg bg-white border border-stone-200/80 font-medium text-stone-900"
              >
                ☀️ Light Finder
              </button>
              <button
                onClick={() => handleNav('/tools/plant-problem-checker')}
                className="p-2.5 text-left rounded-lg bg-white border border-stone-200/80 font-medium text-stone-900"
              >
                🩺 Symptom Checker
              </button>
              <button
                onClick={() => handleNav('/tools/soil-mix-calculator')}
                className="p-2.5 text-left rounded-lg bg-white border border-stone-200/80 font-medium text-stone-900"
              >
                🪴 Soil Mix Calculator
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
