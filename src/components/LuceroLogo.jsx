import React from 'react';

/**
 * LuceroLogo Component
 * 
 * Rules:
 * - 'horizontal' (Horizontal proportions): Uses LOGOTIPO.svg (or ISOTIPO + LOGOTIPO side-by-side)
 * - '1:1' / 'square' / 'isologo' (1:1 proportions): Uses ISOLOGO.svg
 * - 'reduced' / 'isotipo' (Compact / reduced zones): Uses ISOTIPO.svg
 */
export default function LuceroLogo({ 
  variant = 'dark', 
  size = 'medium', 
  type = 'horizontal' 
}) {
  const isLight = variant === 'light'; // Light text/logo for dark background contexts

  // Height sizing
  const hClass = size === 'large' ? 'h-10 sm:h-12' : size === 'small' ? 'h-6 sm:h-7' : 'h-8 sm:h-9';
  const isotipoHClass = size === 'large' ? 'h-11 sm:h-13' : size === 'small' ? 'h-7 sm:h-8' : 'h-9 sm:h-10';

  // 1. Reduced / Icon symbol only (for compact spaces, circular watermarks, badges)
  if (type === 'reduced' || type === 'isotipo') {
    return (
      <div className="inline-flex items-center justify-center flex-shrink-0">
        <img 
          src="/SVG/ISOTIPO.svg" 
          alt="Lucero Express Isotipo" 
          className={`${isotipoHClass} w-auto object-contain drop-shadow-sm`}
        />
      </div>
    );
  }

  // 2. 1:1 Square Isologo (for 1:1 containers, square cards, centered banners)
  if (type === '1:1' || type === 'isologo' || type === 'square') {
    const isologoH = size === 'large' ? 'h-24 sm:h-28' : size === 'small' ? 'h-12 sm:h-14' : 'h-16 sm:h-20';
    return (
      <div className="inline-flex items-center justify-center flex-shrink-0">
        <img 
          src="/SVG/ISOLOGO.svg" 
          alt="Lucero Express Isologo" 
          className={`${isologoH} w-auto object-contain ${isLight ? 'brightness-0 invert' : ''}`}
        />
      </div>
    );
  }

  // 3. Logotipo only
  if (type === 'logotipo') {
    return (
      <div className="inline-flex items-center flex-shrink-0">
        <img 
          src="/SVG/LOGOTIPO.svg" 
          alt="Lucero Express Logotipo" 
          className={`${hClass} w-auto object-contain ${isLight ? 'brightness-0 invert' : ''}`}
        />
      </div>
    );
  }

  // 4. Default: Horizontal Proportion (ISOTIPO + LOGOTIPO side-by-side)
  return (
    <div className="flex items-center gap-2.5 flex-shrink-0 group cursor-pointer">
      <img 
        src="/SVG/ISOTIPO.svg" 
        alt="Lucero Express Symbol" 
        className={`${isotipoHClass} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
      />
      <img 
        src="/SVG/LOGOTIPO.svg" 
        alt="Lucero Express Logotipo" 
        className={`${hClass} w-auto object-contain ${isLight ? 'brightness-0 invert' : ''}`}
      />
    </div>
  );
}
