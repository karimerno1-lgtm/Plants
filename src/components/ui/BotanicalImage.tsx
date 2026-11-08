import React, { useState } from 'react';
import { Leaf } from 'lucide-react';

interface BotanicalImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export const BotanicalImage: React.FC<BotanicalImageProps> = ({
  src,
  alt,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-linear-to-br from-[#EAF1EC] to-[#D6E3D9] text-[#315B43] ${className}`}
        aria-label={alt}
      >
        <div className="flex flex-col items-center gap-1.5 p-4 text-center">
          <Leaf className="w-8 h-8 text-[#315B43]/70 animate-pulse" />
          <span className="text-[11px] font-medium text-emerald-950/80 line-clamp-1">{alt}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-stone-100 ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-100 text-stone-300">
          <Leaf className="w-6 h-6 animate-pulse text-stone-300" />
        </div>
      )}
    </div>
  );
};
