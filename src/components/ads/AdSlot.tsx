import React, { useEffect, useRef, useState } from 'react';
import { ADSENSE_CONFIG, AdSlotType } from '../../config/adsense';

interface AdSlotProps {
  type?: AdSlotType;
  className?: string;
  slotId?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export const AdSlot: React.FC<AdSlotProps> = ({
  type = 'responsive',
  className = '',
  slotId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isPushed = useRef(false);
  const [isAdBlocked, setIsAdBlocked] = useState(false);

  const selectedSlotId = slotId || (type === 'multiplex' ? ADSENSE_CONFIG.SLOTS.MULTIPLEX : ADSENSE_CONFIG.SLOTS.RESPONSIVE_DISPLAY);

  useEffect(() => {
    // Avoid re-pushing in same mount
    if (isPushed.current) return;

    if (!ADSENSE_CONFIG.ENABLED) return;

    try {
      // Check if adsbygoogle is accessible or blocked by browser extensions
      const pushAd = () => {
        try {
          if (containerRef.current) {
            const insElement = containerRef.current.querySelector('ins.adsbygoogle');
            // If already processed by Google AdSense, do not push again
            if (insElement && !insElement.getAttribute('data-adsbygoogle-status')) {
              window.adsbygoogle = window.adsbygoogle || [];
              window.adsbygoogle.push({});
              isPushed.current = true;
            }
          }
        } catch (err) {
          // Gracefully handle AdBlocker errors
          console.debug('AdSense initialization handled:', err);
          setIsAdBlocked(true);
        }
      };

      // Wait a tick for DOM to settle
      const timeoutId = setTimeout(pushAd, 150);
      return () => clearTimeout(timeoutId);
    } catch {
      setIsAdBlocked(true);
    }
  }, [type, selectedSlotId]);

  return (
    <div
      ref={containerRef}
      className={`my-8 overflow-hidden rounded-xl border border-stone-200/80 bg-white/70 p-3 shadow-xs text-center transition-all ${className}`}
      aria-label="Advertisement"
    >
      <div className="mb-1.5 flex items-center justify-between px-2 text-[10px] font-semibold tracking-wider uppercase text-stone-400">
        <span>Advertisement</span>
        <span className="text-[9px] text-stone-300">Google AdSense</span>
      </div>

      <div className="flex min-h-[100px] w-full items-center justify-center overflow-hidden">
        {type === 'multiplex' ? (
          <ins
            className="adsbygoogle"
            style={{ display: 'block', minHeight: '250px', width: '100%' }}
            data-ad-format="autorelaxed"
            data-ad-client={ADSENSE_CONFIG.PUBLISHER_ID}
            data-ad-slot={ADSENSE_CONFIG.SLOTS.MULTIPLEX}
          />
        ) : (
          <ins
            className="adsbygoogle"
            style={{ display: 'block', minHeight: '100px', width: '100%' }}
            data-ad-client={ADSENSE_CONFIG.PUBLISHER_ID}
            data-ad-slot={selectedSlotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}
      </div>

      {isAdBlocked && (
        <div className="py-2 text-xs text-stone-400">
          PlantCare Lab is supported by non-intrusive sponsor ads.
        </div>
      )}
    </div>
  );
};
