import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, Wrench, Leaf, BookOpen, ArrowRight } from 'lucide-react';
import { TOOLS_DATA } from '../../data/tools';
import { PLANTS_DATA } from '../../data/plants';
import { GUIDES_DATA } from '../../data/guides';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle open if pressed
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      return {
        tools: TOOLS_DATA.slice(0, 4),
        plants: PLANTS_DATA.slice(0, 4),
        guides: GUIDES_DATA.slice(0, 3)
      };
    }

    const q = query.toLowerCase();

    const tools = TOOLS_DATA.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.tagline.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
    );

    const plants = PLANTS_DATA.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.botanicalName.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q)
    );

    const guides = GUIDES_DATA.filter(g =>
      g.title.toLowerCase().includes(q) ||
      g.quickAnswer.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q)
    );

    return { tools, plants, guides };
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (path: string) => {
    onNavigate(path);
    onClose();
    setQuery('');
  };

  const totalCount = filteredResults.tools.length + filteredResults.plants.length + filteredResults.guides.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-stone-900/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-stone-200">
          <Search className="w-5 h-5 text-emerald-800 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search plant watering, lighting, Monstera, yellow leaves..."
            className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block rounded bg-stone-100 px-2 py-0.5 text-[10px] font-mono text-stone-500">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-6">
          {totalCount === 0 && (
            <div className="py-12 text-center text-sm text-stone-500">
              No botanical tools, plants, or guides match "{query}". Try searching "water", "light", or "pothos".
            </div>
          )}

          {/* Tools */}
          {filteredResults.tools.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5 px-2">
                <Wrench className="w-3.5 h-3.5 text-emerald-700" /> Calculators & Tools ({filteredResults.tools.length})
              </div>
              <div className="space-y-1">
                {filteredResults.tools.map(tool => (
                  <button
                    key={tool.slug}
                    onClick={() => handleSelect(`/tools/${tool.slug}`)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-50 transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-stone-900 group-hover:text-emerald-950">
                        {tool.name}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {tool.tagline}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-emerald-700 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Plants */}
          {filteredResults.plants.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5 px-2">
                <Leaf className="w-3.5 h-3.5 text-emerald-700" /> Plant Database ({filteredResults.plants.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredResults.plants.map(plant => (
                  <button
                    key={plant.slug}
                    onClick={() => handleSelect(`/plants/${plant.slug}`)}
                    className="text-left p-2 rounded-xl hover:bg-emerald-50 border border-stone-100 transition-colors flex items-center gap-3 cursor-pointer group"
                  >
                    <img src={plant.imageUrl} alt={plant.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-stone-900 truncate group-hover:text-emerald-950">
                        {plant.name}
                      </div>
                      <div className="text-[10px] text-stone-400 italic truncate">
                        {plant.botanicalName}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Guides */}
          {filteredResults.guides.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5 px-2">
                <BookOpen className="w-3.5 h-3.5 text-emerald-700" /> Care Guides & Diagnosis ({filteredResults.guides.length})
              </div>
              <div className="space-y-1">
                {filteredResults.guides.map(guide => (
                  <button
                    key={guide.slug}
                    onClick={() => handleSelect(`/guides/${guide.slug}`)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-50 transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div className="overflow-hidden pr-3">
                      <div className="text-xs font-bold text-stone-900 group-hover:text-emerald-950 truncate">
                        {guide.title}
                      </div>
                      <div className="text-[11px] text-stone-500 truncate">
                        {guide.category} • {guide.readTime}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-emerald-700 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
