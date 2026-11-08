import React from 'react';
import { TOOLS_DATA } from '../data/tools';
import { WateringCalculator } from '../components/tools/WateringCalculator';
import { LightFinder } from '../components/tools/LightFinder';
import { PotSizeCalculator } from '../components/tools/PotSizeCalculator';
import { SoilMixCalculator } from '../components/tools/SoilMixCalculator';
import { FertilizerCalculator } from '../components/tools/FertilizerCalculator';
import { ProblemChecker } from '../components/tools/ProblemChecker';
import { HumidityCalculator } from '../components/tools/HumidityCalculator';
import { PropagationGuideTool } from '../components/tools/PropagationGuideTool';
import { ChevronRight, ArrowLeft, HelpCircle } from 'lucide-react';

interface ToolDetailPageProps {
  toolSlug: string;
  onNavigate: (path: string) => void;
}

export const ToolDetailPage: React.FC<ToolDetailPageProps> = ({ toolSlug, onNavigate }) => {
  const tool = TOOLS_DATA.find(t => t.slug === toolSlug) || TOOLS_DATA[0];

  const renderActiveTool = () => {
    switch (tool.slug) {
      case 'plant-watering-calculator':
        return <WateringCalculator />;
      case 'plant-light-finder':
        return <LightFinder />;
      case 'pot-size-calculator':
        return <PotSizeCalculator />;
      case 'soil-mix-calculator':
        return <SoilMixCalculator />;
      case 'fertilizer-calculator':
        return <FertilizerCalculator />;
      case 'plant-problem-checker':
        return <ProblemChecker />;
      case 'plant-humidity-calculator':
        return <HumidityCalculator />;
      case 'plant-propagation-guide':
        return <PropagationGuideTool />;
      default:
        return <WateringCalculator />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-stone-500">
        <button onClick={() => onNavigate('/')} className="hover:text-emerald-800 cursor-pointer">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <button onClick={() => onNavigate('/tools')} className="hover:text-emerald-800 cursor-pointer">
          Tools
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="font-semibold text-stone-900 truncate">
          {tool.name}
        </span>
      </nav>

      {/* Render Active Scientific Tool Component */}
      <div>
        {renderActiveTool()}
      </div>

      {/* Related Tools Recommendation */}
      <div className="mt-12 pt-8 border-t border-stone-200">
        <h3 className="text-lg font-bold font-editorial text-stone-900 mb-4">
          Complementary Botanical Tools
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TOOLS_DATA.filter(t => t.slug !== tool.slug).slice(0, 3).map(related => (
            <button
              key={related.slug}
              onClick={() => {
                onNavigate(`/tools/${related.slug}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left p-4 rounded-xl border border-stone-200 bg-white hover:border-emerald-600/50 hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="text-xs font-bold text-stone-900 group-hover:text-emerald-950 mb-1">
                {related.shortTitle}
              </div>
              <p className="text-[11px] text-stone-500 line-clamp-2">
                {related.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
