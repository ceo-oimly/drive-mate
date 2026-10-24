import React, { useState } from 'react';
import { Driver, Booking } from '../types';
import {
  X,
  ShieldCheck,
  Star,
  Award,
  Phone,
  Clock,
  Car,
  MapPin,
  CheckCircle2,
  FileCheck2,
} from 'lucide-react';

interface DriverProfileModalProps {
  driver: Driver;
  booking?: Booking;
  isOpen: boolean;
  onClose: () => void;
  onConfirmAssignment?: (driverId: string) => void;
  mode?: 'view' | 'assign';
}

export const DriverProfileModal: React.FC<DriverProfileModalProps> = ({
  driver,
  booking,
  isOpen,
  onClose,
  onConfirmAssignment,
  mode = 'view',
}) => {
  const [confirmedSafeguards, setConfirmedSafeguards] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl overflow-hidden my-8 text-[#101B2D]">
        {/* Top Header Banner */}
        <div className="bg-[#F7F8FA] p-6 border-b border-[#E2E8F0] relative">
          <button
            onClick={onClose}
            aria-label="Close driver profile"
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white hover:bg-slate-100 text-slate-500 hover:text-[#101B2D] border border-[#E2E8F0] transition-colors min-h-[44px] min-w-[44px] shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="relative">
              <img
                src={driver.photo}
                alt={`Portrait of demo chauffeur ${driver.name}`}
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-2xl object-cover border-2 border-[#19A974]/40 shadow-sm"
              />
              <span className="absolute -bottom-2 -right-2 bg-[#19A974] text-white p-1 rounded-full text-xs shadow">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            <div className="text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <h3 className="text-xl font-bold text-[#101B2D] tracking-tight">{driver.name}</h3>
                <span className="text-xs bg-[#19A974]/10 border border-[#19A974]/20 text-[#19A974] px-2.5 py-0.5 rounded-full font-bold">
                  Accredited Chauffeur
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-mono">{driver.badgeNumber}</p>

              {/* Rating Supported by Authentic Demo Reviews */}
              <div className="flex items-center justify-center sm:justify-start gap-3 mt-2.5 text-xs">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span className="tabular-nums">{driver.rating.toFixed(2)}</span>
                </div>
                <span className="text-slate-300">·</span>
                <span className="text-slate-600">
                  <strong className="font-semibold text-[#101B2D]">{driver.tripsCount}</strong> pilot trips
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-600">{driver.yearsExperience} yrs exp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Licence & Certification */}
          <div className="bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-[#19A974]" />
              Licence Verification & Credentials
            </h4>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500">Licence Class:</span>
                <span className="font-semibold text-[#101B2D] text-right">{driver.licenceCategory}</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500">Accreditation:</span>
                <span className="text-[#19A974] font-semibold">Defensive Driving Certified</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500">Assigned Zone:</span>
                <span className="text-[#101B2D]">{driver.currentZone}</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500">Spoken Languages:</span>
                <span className="text-[#101B2D]">{driver.languages.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Chauffeur Bio */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Professional Chauffeur Profile
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-[#F7F8FA] p-3.5 rounded-xl border border-[#E2E8F0]">
              {driver.bio}
            </p>
          </div>

          {/* Verified Customer Reviews */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Verified Customer Reviews ({driver.reviews.length})
              </h4>
              <span className="text-[11px] text-slate-500 font-medium">Post-event designated drives</span>
            </div>

            <div className="space-y-3">
              {driver.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl p-3.5 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#101B2D]">{rev.author}</span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{rev.rating}.0</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 italic">"{rev.text}"</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Event: {rev.eventType}</span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Context if Opened during Assignment */}
          {mode === 'assign' && booking && (
            <div className="bg-[#19A974]/10 border border-[#19A974]/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-[#19A974]" />
                <h4 className="text-xs font-bold text-[#101B2D]">
                  Assign to Booking: {booking.id}
                </h4>
              </div>
              <p className="text-xs text-slate-600">
                Customer vehicle: {booking.vehicle.color} {booking.vehicle.make} {booking.vehicle.model} ({booking.vehicle.registrationNumber}).
              </p>

              <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={confirmedSafeguards}
                  onChange={(e) => setConfirmedSafeguards(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-[#19A974] focus:ring-[#19A974]"
                />
                <span>
                  I confirm that {driver.name} is available in {driver.currentZone} and certified for {booking.vehicle.transmission} transmissions.
                </span>
              </label>

              <button
                onClick={() => onConfirmAssignment && onConfirmAssignment(driver.id)}
                disabled={!confirmedSafeguards}
                className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all min-h-[44px] ${
                  confirmedSafeguards
                    ? 'bg-[#19A974] hover:bg-[#159364] text-white shadow-md shadow-[#19A974]/20'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Chauffeur Assignment</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#F7F8FA] border-t border-[#E2E8F0] flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Demo Driver ID: {driver.badgeNumber}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-[#E2E8F0] text-slate-700 text-xs font-semibold rounded-lg transition-colors min-h-[40px] shadow-xs"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
