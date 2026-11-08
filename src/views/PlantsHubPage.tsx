import React, { useState, useMemo } from 'react';
import { PLANTS_DATA, PlantDetail } from '../data/plants';
import { AdSlot } from '../components/ads/AdSlot';
import { Leaf, Search, ShieldCheck, Sun, Droplets, ArrowRight } from 'lucide-react';
import { BotanicalImage } from '../components/ui/BotanicalImage';

interface PlantsHubPageProps {
  onNavigate: (path: string) => void;
}

export const PlantsHubPage: React.FC<PlantsHubPageProps> = ({ onNavigate }) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [petSafeOnly, setPetSafeOnly] = useState(false);

  const filteredPlants = useMemo(() => {
    return PLANTS_DATA.filter(p => {
      const matchQuery = !filterQuery ||
        p.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        p.botanicalName.toLowerCase().includes(filterQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(filterQuery.toLowerCase());
      const matchDifficulty = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
      const matchPetSafe = !petSafeOnly || (!p.petToxicity.toxicToCats && !p.petToxicity.toxicToDogs);
      return matchQuery && matchDifficulty && matchPetSafe;
    });
  }, [filterQuery, selectedDifficulty, petSafeOnly]);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="rounded-3xl border border-stone-200/80 bg-white p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 mb-2">
          <Leaf className="w-4 h-4" /> Indoor Species Encyclopedia
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-editorial text-stone-900">
          Indoor Houseplant Care Library
        </h1>
        <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed">
          Comprehensive botanical dossiers on popular indoor foliage species. Every guide features validated horticultural parameters, pet toxicity assessments, and interactive tool integrations.
        </p>

        {/* Filter Toolbar */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-stone-500 mr-1">Difficulty:</span>
            {['All', 'Beginner', 'Easy', 'Moderate', 'Advanced'].map(diff => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedDifficulty === diff
                    ? 'bg-[#315B43] text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPetSafeOnly(!petSafeOnly)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                petSafeOnly
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600'
                  : 'border-stone-300 text-stone-700 bg-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Pet-Safe Only (ASPCA)</span>
            </button>

            <div className="relative min-w-[200px]">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Search plants..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-emerald-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Plant Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlants.map(plant => (
          <div
            key={plant.slug}
            onClick={() => onNavigate(`/plants/${plant.slug}`)}
            className="rounded-2xl border border-stone-200/80 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <BotanicalImage
                  src={plant.imageUrl}
                  alt={plant.imageAlt}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-xs text-stone-900 shadow-2xs">
                  {plant.difficulty}
                </span>
                {!plant.petToxicity.toxicToCats && !plant.petToxicity.toxicToDogs ? (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100/90 text-emerald-900 backdrop-blur-xs">
                    Non-Toxic (Pet-Safe)
                  </span>
                ) : (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100/90 text-amber-900 backdrop-blur-xs">
                    Toxic to Pets
                  </span>
                )}
              </div>

              <div className="p-5">
                <h2 className="text-lg font-bold text-stone-900 group-hover:text-emerald-950">
                  {plant.name}
                </h2>
                <p className="text-xs font-serif italic text-stone-400 mb-2">
                  {plant.botanicalName} ({plant.family})
                </p>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {plant.summary}
                </p>

                <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                  <div className="flex items-center gap-1.5 truncate">
                    <Sun className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{plant.light.ideal}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Droplets className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span className="truncate">{plant.watering.frequency}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 pb-5 pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-800 group-hover:text-emerald-950">
              <span>View Horticultural Profile</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      <AdSlot type="responsive" />
    </div>
  );
};
