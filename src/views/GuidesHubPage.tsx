import React, { useState, useMemo } from 'react';
import { GUIDES_DATA, CareGuide } from '../data/guides';
import { AdSlot } from '../components/ads/AdSlot';
import { BookOpen, Search, Clock, ArrowRight, User } from 'lucide-react';
import { BotanicalImage } from '../components/ui/BotanicalImage';

interface GuidesHubPageProps {
  onNavigate: (path: string) => void;
}

export const GuidesHubPage: React.FC<GuidesHubPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [query, setQuery] = useState('');

  const categories = ['All', 'Watering', 'Lighting', 'Soil & Fertilizer', 'Plant Problems', 'Repotting', 'Propagation', 'Beginner Care'];

  const filteredGuides = useMemo(() => {
    return GUIDES_DATA.filter(guide => {
      const matchCat = selectedCategory === 'All' || guide.category === selectedCategory;
      const matchQuery = !query ||
        guide.title.toLowerCase().includes(query.toLowerCase()) ||
        guide.quickAnswer.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, query]);

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="rounded-3xl border border-stone-200/80 bg-white p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 mb-2">
          <BookOpen className="w-4 h-4" /> Editorial Knowledgebase
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-editorial text-stone-900">
          Indoor Horticulture Care Guides
        </h1>
        <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed">
          Peer-reviewed articles, direct answers, and laboratory diagnostic guides covering watering physics, light measurement, potting soil formulation, and disease management.
        </p>

        {/* Filter Toolbar */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#315B43] text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[200px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search guides..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-emerald-600"
            />
          </div>
        </div>
      </div>

      {/* Guide Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map(guide => (
          <div
            key={guide.slug}
            onClick={() => onNavigate(`/guides/${guide.slug}`)}
            className="rounded-2xl border border-stone-200/80 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="aspect-16/9 overflow-hidden bg-stone-100">
                <BotanicalImage
                  src={guide.heroImage}
                  alt={guide.heroAlt}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-800 mb-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-50">{guide.category}</span>
                  <span className="text-stone-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {guide.readTime}
                  </span>
                </div>

                <h2 className="text-base font-bold text-stone-900 group-hover:text-emerald-950 leading-snug">
                  {guide.title}
                </h2>
                <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                  {guide.quickAnswer}
                </p>
              </div>
            </div>

            <div className="px-5 pb-5 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <img src={guide.author.avatar} alt={guide.author.name} className="w-6 h-6 rounded-full object-cover" />
                <span className="truncate">{guide.author.name}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-800 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      <AdSlot type="responsive" />
    </div>
  );
};
