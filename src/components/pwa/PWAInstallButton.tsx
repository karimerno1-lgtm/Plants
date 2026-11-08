import React, { useState } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { Download, Smartphone, Check, X, Share2, PlusSquare } from 'lucide-react';

interface Props {
  variant?: 'nav' | 'hero' | 'footer' | 'pill';
  className?: string;
}

export const PWAInstallButton: React.FC<Props> = ({ variant = 'nav', className = '' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  if (isInstalled) {
    if (variant === 'nav') return null;
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-100/80 rounded-full">
        <Check className="w-3.5 h-3.5 text-emerald-700" />
        PlantCare App Installed
      </span>
    );
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const ok = await install();
      if (ok) setJustInstalled(true);
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // General instructions modal for desktop/browsers where prompt is not directly callable
      setShowIOSModal(true);
    }
  };

  // If successfully installed in this session
  if (justInstalled) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-100 rounded-full animate-fade-in">
        <Check className="w-3.5 h-3.5" /> App Ready Offline!
      </span>
    );
  }

  const renderButton = () => {
    if (variant === 'hero') {
      return (
        <button
          onClick={handleInstallClick}
          className={`inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-emerald-950 bg-emerald-100/90 hover:bg-emerald-200/90 border border-emerald-300/60 rounded-xl shadow-xs transition-all cursor-pointer ${className}`}
        >
          <Smartphone className="w-4 h-4 text-emerald-800" />
          Install Offline PWA
        </button>
      );
    }

    if (variant === 'footer') {
      return (
        <button
          onClick={handleInstallClick}
          className={`inline-flex items-center gap-2 text-xs font-medium text-stone-300 hover:text-white transition-colors cursor-pointer ${className}`}
        >
          <Download className="w-3.5 h-3.5" />
          Install Mobile & Desktop App
        </button>
      );
    }

    // Default nav variant
    return (
      <button
        onClick={handleInstallClick}
        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white bg-[#315B43] hover:bg-[#254A36] active:scale-98 rounded-lg shadow-xs transition-all cursor-pointer ${className}`}
        title="Install PlantCare Lab on your device"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Install App</span>
      </button>
    );
  };

  return (
    <>
      {renderButton()}

      {/* iOS & Browser Installation Guide Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-stone-100">
            <button
              onClick={() => setShowIOSModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-full hover:bg-stone-100"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#315B43] flex items-center justify-center text-white font-serif text-xl shadow-xs">
                🌿
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">Install PlantCare Lab</h3>
                <p className="text-xs text-stone-500">Fast, standalone access & offline calculators</p>
              </div>
            </div>

            <div className="space-y-3.5 py-2 text-sm text-stone-700">
              <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200/60">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-semibold text-stone-900 flex items-center gap-1.5">
                    Tap the Share button <Share2 className="w-4 h-4 text-blue-600 inline" />
                  </p>
                  <p className="text-xs text-stone-600 mt-0.5">
                    In Safari (iOS) or Chrome/Edge toolbar on your device.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200/60">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-semibold text-stone-900 flex items-center gap-1.5">
                    Select "Add to Home Screen" <PlusSquare className="w-4 h-4 text-emerald-700 inline" />
                  </p>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Scroll down in the action sheet and tap Add to Home Screen.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200/60">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-semibold text-stone-900">Tap "Add" in the top corner</p>
                  <p className="text-xs text-stone-600 mt-0.5">
                    PlantCare Lab will open instantly like a native mobile app!
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-5 w-full py-2.5 px-4 bg-[#315B43] hover:bg-[#254A36] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
};
