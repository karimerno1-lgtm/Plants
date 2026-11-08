import React from 'react';
import { WifiOff, RefreshCw, Droplets, BookOpen } from 'lucide-react';

interface OfflinePageProps {
  onNavigate: (path: string) => void;
}

export const OfflinePage: React.FC<OfflinePageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-stone-200 text-stone-700 flex items-center justify-center mx-auto shadow-xs">
        <WifiOff className="w-8 h-8 text-amber-700" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-editorial text-stone-900">
          You Are Currently Offline
        </h1>
        <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
          No internet connection detected. Your calculators and previously loaded botanical data remain accessible while you wait to reconnect.
        </p>
      </div>

      <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 rounded-xl bg-[#315B43] hover:bg-[#254A36] text-white text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Check Connection Again
        </button>
        <button
          onClick={() => onNavigate('/tools/plant-watering-calculator')}
          className="px-5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <Droplets className="w-3.5 h-3.5 text-emerald-800" /> Open Watering Calculator
        </button>
      </div>
    </div>
  );
};
