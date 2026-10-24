import React from 'react';
import { Booking } from '../types';
import {
  Car,
  Key,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Phone,
} from 'lucide-react';

interface CustomerHomeProps {
  onStartBooking: () => void;
  onTrackBooking: (booking: Booking) => void;
  activeBooking?: Booking;
}

export const CustomerHome: React.FC<CustomerHomeProps> = ({
  onStartBooking,
  onTrackBooking,
  activeBooking,
}) => {
  const hasActiveBooking =
    activeBooking &&
    activeBooking.status !== 'trip_completed' &&
    activeBooking.status !== 'cancelled';

  return (
    <div className="min-h-[80vh] flex flex-col justify-between max-w-xl mx-auto px-4 py-8 sm:py-12 animate-fade-in text-[#101B2D]">
      {/* Active Trip Resume Banner if trip is in progress */}
      {hasActiveBooking ? (
        <div
          onClick={() => onTrackBooking(activeBooking)}
          className="bg-white border-2 border-[#19A974] rounded-2xl p-4 flex items-center justify-between gap-3 shadow-md shadow-[#19A974]/10 cursor-pointer hover:border-[#159364] transition-all mb-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#19A974]/10 flex items-center justify-center text-[#19A974] shrink-0">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#19A974] animate-pulse" />
                <span className="text-xs font-mono font-bold text-[#19A974]">
                  {activeBooking.id}
                </span>
                <span className="text-xs font-bold text-[#101B2D]">Trip in Progress</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeBooking.vehicle.color} {activeBooking.vehicle.make} · Tap to track chauffeur
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
        </div>
      ) : (
        <div />
      )}

      {/* Main Focus: Clean headline and dominant primary CTA */}
      <div className="my-auto py-6 sm:py-10 space-y-8 text-center sm:text-left">
        {/* Brand Chip */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#19A974]/10 border border-[#19A974]/20 text-[#19A974] text-xs font-bold">
          <Key className="w-3.5 h-3.5" />
          <span>DriveMate · You Own The Car</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#101B2D] tracking-tight leading-[1.12]">
            Let's get you and your car home.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-md leading-relaxed">
            Attended an event, tired, or had drinks? Request a vetted driver to drive your vehicle safely to your door.
          </p>
        </div>

        {/* Dominant Primary Button: "Get me a driver" */}
        <div className="pt-2">
          <button
            onClick={onStartBooking}
            className="w-full py-5 px-6 bg-[#19A974] hover:bg-[#159364] active:scale-[0.99] text-white rounded-2xl shadow-xl shadow-[#19A974]/25 flex items-center justify-between gap-4 transition-all min-h-[64px] group cursor-pointer"
          >
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold block tracking-tight">
                  Get me a driver
                </span>
                <span className="text-xs text-white/85 font-medium">
                  Fast & intuitive · Under 30 seconds
                </span>
              </div>
            </div>

            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1.5 transition-transform shrink-0">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </button>
        </div>

        {/* Subtle Assisted Booking Call */}
        <div className="text-center sm:text-left pt-2">
          <a
            href="tel:08003748362"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#19A974] font-medium transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#19A974]" />
            <span>Need phone assistance? Call <strong>0800-DRIVEMATE</strong></span>
          </a>
        </div>
      </div>

      {/* Trust Highlights */}
      <div className="pt-6 border-t border-[#E2E8F0] grid grid-cols-3 gap-2 text-center text-xs">
        <div>
          <p className="font-bold text-[#101B2D]">Your Car Stays</p>
          <p className="text-[11px] text-slate-500">Ride home in your vehicle</p>
        </div>
        <div className="border-x border-[#E2E8F0]">
          <p className="font-bold text-[#101B2D]">Vetted Chauffeurs</p>
          <p className="text-[11px] text-slate-500">Defensive driving cert</p>
        </div>
        <div>
          <p className="font-bold text-[#101B2D]">Handover PIN</p>
          <p className="text-[11px] text-slate-500">4-digit security code</p>
        </div>
      </div>
    </div>
  );
};
