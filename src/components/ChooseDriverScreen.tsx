import React from 'react';
import { Driver } from '../types';
import { DEMO_DRIVERS } from '../services/bookingStore';
import {
  ArrowLeft,
  Clock,
  ShieldCheck,
  Star,
  CheckCircle2,
  Car,
  Info,
  MapPin,
} from 'lucide-react';

interface ChooseDriverScreenProps {
  pickup: string;
  destination: string;
  onSelectDriver: (driver: Driver, quotedPrice: number, etaMins: number) => void;
  onBack: () => void;
}

interface DriverMarketplaceOption {
  driver: Driver;
  etaMins: number;
  price: number;
  specialtyTag: string;
  experienceTag: string;
}

export const ChooseDriverScreen: React.FC<ChooseDriverScreenProps> = ({
  pickup,
  destination,
  onSelectDriver,
  onBack,
}) => {
  // Configured sample marketplace options
  const driverOptions: DriverMarketplaceOption[] = [
    {
      driver: DEMO_DRIVERS[0],
      etaMins: 8,
      price: 8500,
      specialtyTag: 'Executive Sedan & SUV Specialist',
      experienceTag: '8 yrs luxury driving',
    },
    {
      driver: DEMO_DRIVERS[1],
      etaMins: 12,
      price: 8500,
      specialtyTag: 'Automatic & Hybrid Certified',
      experienceTag: 'Defensive driving accredited',
    },
    {
      driver: DEMO_DRIVERS[2],
      etaMins: 15,
      price: 8000,
      specialtyTag: 'Japanese & German Vehicle Expert',
      experienceTag: '9 yrs executive chauffeur',
    },
  ];

  return (
    <div className="max-w-xl mx-auto px-4 py-5 pb-24 space-y-5 animate-fade-in text-[#101B2D]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#101B2D] -ml-1 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Route</span>
        </button>

        <span className="text-xs font-extrabold text-[#101B2D]">
          Step 2 of 3 · Choose Driver
        </span>

        <div className="w-12" />
      </div>

      {/* Corridor Summary Pill */}
      <div className="bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl p-3 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 truncate">
          <MapPin className="w-4 h-4 text-[#19A974] shrink-0" />
          <span className="truncate font-medium text-slate-700">
            {pickup.split(',')[0]} → {destination.split(',')[0]}
          </span>
        </div>
        <span className="font-mono text-[11px] font-bold text-slate-500 whitespace-nowrap">
          ~11.6 km
        </span>
      </div>

      {/* Honest Demo Data Label */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3 flex items-start gap-2.5 text-xs text-blue-900">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Sample Drivers (Demo Data):</strong> In this prototype, drivers and ETAs are simulated. Real driver availability and live dispatch will activate during full commercial launch.
        </p>
      </div>

      {/* Drivers List (Familiar Glovo-like marketplace cards) */}
      <div className="space-y-3.5">
        {driverOptions.map(({ driver, etaMins, price, specialtyTag, experienceTag }) => (
          <div
            key={driver.id}
            className="bg-white border border-[#E2E8F0] hover:border-[#19A974] rounded-2xl p-4 sm:p-5 shadow-xs transition-all space-y-4"
          >
            {/* Top row: Avatar, Name, Price */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <img
                    src={driver.photo}
                    alt={driver.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-2xl object-cover border border-[#E2E8F0] shadow-xs"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-[#19A974] text-white p-0.5 rounded-full shadow">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-[#101B2D]">{driver.name}</h3>
                  </div>

                  <p className="text-xs font-medium text-slate-600 mt-0.5">
                    {specialtyTag}
                  </p>

                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                    <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      {driver.rating.toFixed(2)}
                    </span>
                    <span>·</span>
                    <span>{experienceTag}</span>
                  </div>
                </div>
              </div>

              {/* Price & ETA */}
              <div className="text-right">
                <span className="text-lg font-black text-[#19A974] font-mono block">
                  ₦{price.toLocaleString()}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 flex items-center justify-end gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-blue-500" />
                  ~{etaMins} mins away
                </span>
              </div>
            </div>

            {/* Bottom Row: Vehicle handling note & Choose button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#E2E8F0]">
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {driver.licenceCategory.split(' ')[0]} Verified
                </span>
                <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  Owner-Vehicle Safe
                </span>
              </div>

              <button
                type="button"
                onClick={() => onSelectDriver(driver, price, etaMins)}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#19A974] hover:bg-[#159364] active:scale-[0.98] text-white font-bold text-xs rounded-xl shadow-sm transition-all min-h-[42px] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Choose driver</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
