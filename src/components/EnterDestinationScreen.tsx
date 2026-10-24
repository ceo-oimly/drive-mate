import React, { useState } from 'react';
import { Vehicle } from '../types';
import { loadSavedVehicle, saveSavedVehicle } from '../services/bookingStore';
import {
  MapPin,
  Crosshair,
  ArrowRight,
  ArrowLeft,
  Car,
  Clock,
  Sparkles,
} from 'lucide-react';

interface EnterDestinationScreenProps {
  initialPickup?: string;
  initialDestination?: string;
  onProceedToDrivers: (params: {
    pickup: string;
    destination: string;
    vehicle: Vehicle;
  }) => void;
  onBack: () => void;
}

export const EnterDestinationScreen: React.FC<EnterDestinationScreenProps> = ({
  initialPickup = 'Genesis Sky Bar, GRA Phase 2',
  initialDestination = '14 Peter Odili Road, Port Harcourt',
  onProceedToDrivers,
  onBack,
}) => {
  const [pickup, setPickup] = useState(initialPickup);
  const [destination, setDestination] = useState(initialDestination);
  const [vehicle, setVehicle] = useState<Vehicle>(() => loadSavedVehicle());
  const [showVehicleEdit, setShowVehicleEdit] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    setLocationSuccess(false);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setIsLocating(false);
          setLocationSuccess(true);
          setPickup('Genesis Centre, Tombia St, GRA Phase 2 (Current Location)');
        },
        () => {
          setIsLocating(false);
          setLocationSuccess(true);
          setPickup('Genesis Centre, Tombia St, GRA Phase 2');
        },
        { timeout: 4000 }
      );
    } else {
      setIsLocating(false);
      setPickup('Genesis Centre, Tombia St, GRA Phase 2');
      setLocationSuccess(true);
    }
  };

  const handleFindDrivers = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup.trim()) {
      setError('Please provide a pickup location.');
      return;
    }
    if (!destination.trim()) {
      setError('Please enter where you are heading.');
      return;
    }
    setError('');
    saveSavedVehicle(vehicle);
    onProceedToDrivers({ pickup: pickup.trim(), destination: destination.trim(), vehicle });
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-5 pb-24 space-y-6 animate-fade-in text-[#101B2D]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#101B2D] -ml-1 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <span className="text-xs font-extrabold text-[#101B2D]">
          Step 1 of 3 · Enter Route
        </span>

        <div className="w-12" />
      </div>

      <form onSubmit={handleFindDrivers} className="space-y-5">
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs">
            {error}
          </div>
        )}

        {/* 1. Pickup Location */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#19A974]" />
              <span>Pickup Location</span>
            </label>

            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={isLocating}
              className="text-[11px] font-bold text-[#19A974] hover:underline flex items-center gap-1"
            >
              <Crosshair className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? 'Locating...' : locationSuccess ? 'Location Set' : 'Use Current Location'}</span>
            </button>
          </div>

          <input
            type="text"
            required
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="e.g. Genesis Sky Bar, GRA Phase 2"
            className="w-full bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl px-3.5 py-3 text-sm text-[#101B2D] font-medium placeholder-slate-400 focus:outline-none focus:border-[#19A974] focus:bg-white transition-all"
          />

          {/* Quick Saved/Popular Venues */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {[
              'Genesis Sky Bar, GRA',
              'Hotel Presidential',
              'Polo Club, Old GRA',
              'The Glass House',
            ].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setPickup(v)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-colors min-h-[32px] ${
                  pickup.includes(v.split(',')[0])
                    ? 'bg-[#19A974] text-white border-[#19A974]'
                    : 'bg-[#F7F8FA] hover:bg-slate-100 text-slate-700 border-[#E2E8F0]'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Destination (Prominent) */}
        <div className="bg-white border-2 border-[#19A974]/30 rounded-2xl p-4 sm:p-5 shadow-xs space-y-2.5">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span>Where are we driving you? (Destination)</span>
          </label>

          <input
            type="text"
            required
            autoFocus
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter home address or destination..."
            className="w-full bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl px-3.5 py-3.5 text-base text-[#101B2D] font-bold placeholder-slate-400 focus:outline-none focus:border-[#19A974] focus:bg-white transition-all shadow-inner"
          />

          {/* Quick Saved Places */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Saved / Frequent Places:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                '14 Peter Odili Road',
                'Woji Estate Gate',
                'Old GRA Strip',
                'Trans-Amadi Gardens',
              ].map((place) => (
                <button
                  key={place}
                  type="button"
                  onClick={() => setDestination(place)}
                  className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg border transition-colors min-h-[34px] ${
                    destination.includes(place)
                      ? 'bg-[#19A974] text-white border-[#19A974]'
                      : 'bg-[#F7F8FA] hover:bg-slate-100 text-slate-700 border-[#E2E8F0]'
                  }`}
                >
                  {place}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Your Car (Reused with 1-tap toggle) */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Car className="w-4 h-4 text-[#19A974]" />
              <span>Your Vehicle</span>
            </span>

            <button
              type="button"
              onClick={() => setShowVehicleEdit(!showVehicleEdit)}
              className="text-[11px] font-bold text-[#19A974] hover:underline"
            >
              {showVehicleEdit ? 'Done' : 'Change Car'}
            </button>
          </div>

          <div className="bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl p-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#101B2D]">
                {vehicle.color} {vehicle.make} {vehicle.model}
              </p>
              <p className="text-[11px] font-mono text-[#19A974] font-semibold">
                {vehicle.registrationNumber} · {vehicle.transmission}
              </p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
              Customer's Car
            </span>
          </div>

          {showVehicleEdit && (
            <div className="pt-2 border-t border-[#E2E8F0] grid grid-cols-2 gap-2 text-xs animate-fade-in">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Make & Model</label>
                <input
                  type="text"
                  value={`${vehicle.make} ${vehicle.model}`}
                  onChange={(e) => {
                    const parts = e.target.value.split(' ');
                    setVehicle({
                      ...vehicle,
                      make: parts[0] || '',
                      model: parts.slice(1).join(' ') || '',
                    });
                  }}
                  className="w-full bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Plate Number</label>
                <input
                  type="text"
                  value={vehicle.registrationNumber}
                  onChange={(e) => setVehicle({ ...vehicle, registrationNumber: e.target.value })}
                  className="w-full bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-mono uppercase"
                />
              </div>
            </div>
          )}
        </div>

        {/* Clear Primary Action Button: "Find drivers" */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 px-6 bg-[#19A974] hover:bg-[#159364] active:scale-[0.99] text-white font-extrabold text-base rounded-2xl shadow-lg shadow-[#19A974]/25 flex items-center justify-center gap-2 transition-all min-h-[56px] cursor-pointer"
          >
            <span>Find drivers</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </form>
    </div>
  );
};
