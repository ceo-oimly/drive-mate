import React from 'react';
import { MapPin, Navigation, Compass, Shield } from 'lucide-react';

interface RoutePreviewMapProps {
  origin: string;
  destination: string;
  distanceKm: number;
  durationMins: number;
  statusText?: string;
  className?: string;
}

export const RoutePreviewMap: React.FC<RoutePreviewMapProps> = ({
  origin,
  destination,
  distanceKm,
  durationMins,
  statusText = 'Route Corridor Active',
  className = '',
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#0B1320] border border-[#1E2D4A] p-4 ${className}`}
    >
      {/* Background SVG Grid and Schematic Roads */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid-pattern"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 28 0 L 0 0 0 28"
                fill="none"
                stroke="#1E2D4A"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          {/* Schematic Corridor Roads */}
          <path
            d="M -20 80 Q 120 40 260 90 T 540 60"
            fill="none"
            stroke="#19A974"
            strokeWidth="3"
            strokeDasharray="6 4"
            strokeOpacity="0.8"
          />
          <path
            d="M 40 160 L 400 30"
            fill="none"
            stroke="#223759"
            strokeWidth="2"
          />
          <path
            d="M 0 120 L 500 120"
            fill="none"
            stroke="#1E2D4A"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Top Header Tag */}
      <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#19A974] animate-pulse" />
          <span className="text-[11px] font-mono font-semibold tracking-wider text-[#19A974] uppercase">
            Corridor Route Simulation
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400 bg-[#101B2D] px-2 py-0.5 rounded border border-[#1E2D4A]">
            {distanceKm} km · ~{durationMins} min
          </span>
        </div>
      </div>

      {/* Visual Route Points */}
      <div className="relative z-10 space-y-3 py-1">
        {/* Origin */}
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 w-6 h-6 rounded-full bg-[#19A974]/20 border border-[#19A974] flex items-center justify-center shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#19A974]" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">
              Pickup Point (Valet / Gate)
            </span>
            <p className="text-xs font-semibold text-white truncate">{origin}</p>
          </div>
        </div>

        {/* Route In-Between Indicator */}
        <div className="ml-3 pl-3 border-l-2 border-dashed border-[#19A974]/40 py-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#101B2D]/90 border border-[#1E2D4A] text-[10px] text-slate-300">
            <Navigation className="w-3 h-3 text-[#19A974]" />
            <span>Dedicated customer-vehicle corridor</span>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center shrink-0">
            <MapPin className="w-3 h-3 text-blue-400" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">
              Destination Home / Compound
            </span>
            <p className="text-xs font-semibold text-white truncate">{destination}</p>
          </div>
        </div>
      </div>

      {/* Bottom Subtext */}
      <div className="relative z-10 mt-3 pt-2.5 border-t border-[#1E2D4A] flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <Shield className="w-3 h-3 text-[#19A974]" />
          <span>Vehicle driven home safely</span>
        </span>
        <span className="text-slate-500 text-[10px] font-mono">
          Simulated Route Track
        </span>
      </div>
    </div>
  );
};
