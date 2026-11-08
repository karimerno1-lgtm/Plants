import React, { useState, useMemo } from 'react';
import { TOOLS_DATA, ToolMeta } from '../data/tools';
import { AdSlot } from '../components/ads/AdSlot';
import { Wrench, Droplets, Sun, Box, Layers, FlaskConical, Activity, Gauge, Scissors, ArrowRight, Search } from 'lucide-react';

interface ToolsHubPageProps {
  onNavigate: (path: string) => void;
}

export const ToolsHubPage: React.FC<ToolsHubPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterQuery, setFilterQuery] = useState('');

  const categories = ['All', 'Hydration', 'Environment', 'Repotting & Soil', 'Nutrition', 'Diagnostics', 'Propagation'];

  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter(tool => {
      const matchCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchQuery = !filterQuery ||
        tool.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(filterQuery.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [selectedCategory, filterQuery]);

  const getToolIcon = (slug: string) => {
    if (slug.includes('watering')) return <Droplets className="w-5 h-5" />;
    if (slug.includes('light')) return <Sun className="w-5 h-5" />;
    if (slug.includes('pot')) return <Box className="w-5 h-5" />;
    if (slug.includes('soil')) return <Layers className="w-5 h-5" />;
    if (slug.includes('fertilizer')) return <FlaskConical className="w-5 h-5" />;
    if (slug.includes('problem')) return <Activity className="w-5 h-5" />;
    if (slug.includes('humidity')) return <Gauge className="w-5 h-5" />;
    return <Scissors className="w-5 h-5" />;
  };

  return (
    <div className="space-y-10">
      {/* Page Title */}
      <div className="rounded-3xl border border-stone-200/80 bg-white p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 mb-2">
          <Wrench className="w-4 h-4" /> Comprehensive Calculator Suite
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-editorial text-stone-900">
          Plant Care Calculators & Scientific Tools
        </h1>
        <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed">
          Explore our suite of 8 interactive indoor gardening calculators. Formulated using biological principles, fluid dynamics, and environmental physics to keep houseplants thriving.
        </p>

        {/* Search & Category Filter Bar */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#315B43] text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter calculators..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-emerald-600"
            />
          </div>
        </div>
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map(tool => (
          <div
            key={tool.slug}
            onClick={() => onNavigate(`/tools/${tool.slug}`)}
            className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs hover:shadow-md hover:border-emerald-600/50 transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-[#315B43] group-hover:text-white transition-colors">
                  {getToolIcon(tool.slug)}
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-600">
                  {tool.category}
                </span>
              </div>

              <h2 className="text-lg font-bold text-stone-900 group-hover:text-emerald-950 mb-1">
                {tool.name}
              </h2>
              <p className="text-xs font-semibold text-emerald-800 mb-2.5">
                {tool.tagline}
              </p>
              <p className="text-xs text-stone-500 leading-relaxed">
                {tool.description}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-800 group-hover:text-emerald-950">
              <span>Open Calculator</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      <AdSlot type="responsive" />
    </div>
  );
};
