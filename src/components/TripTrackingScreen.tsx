import React from 'react';
import { Booking, Driver } from '../types';
import { RoutePreviewMap } from './RoutePreviewMap';
import {
  Car,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Info,
  Navigation,
} from 'lucide-react';

interface TripTrackingScreenProps {
  booking: Booking;
  driver: Driver;
  onArriveDestination: () => void;
}

export const TripTrackingScreen: React.FC<TripTrackingScreenProps> = ({
  booking,
  driver,
  onArriveDestination,
}) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-5 pb-24 space-y-5 animate-fade-in text-[#101B2D]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-xs text-[#19A974] bg-[#19A974]/10 px-2.5 py-1 rounded border border-[#19A974]/20">
            {booking.id}
          </span>
          <span className="text-xs font-bold text-[#101B2D]">· Live Trip In Transit</span>
        </div>

        <a
          href="tel:08003748362"
          className="text-xs font-bold text-[#19A974] bg-[#19A974]/10 hover:bg-[#19A974]/20 border border-[#19A974]/20 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
        >
          <Phone className="w-3 h-3" />
          <span>Support Desk</span>
        </a>
      </div>

      {/* Live Trip Status Banner */}
      <div className="bg-white border-2 border-[#19A974] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-[#19A974] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#19A974] font-mono">
              In Transit
            </span>
          </div>

          <span className="text-xs font-bold text-slate-500 font-mono">
            ~8 mins remaining
          </span>
        </div>

        <h3 className="text-lg font-extrabold text-[#101B2D]">
          Chauffeur driving your car to destination
        </h3>

        {/* Simulated Progress bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div className="bg-[#19A974] h-full rounded-full w-2/3 animate-pulse" />
        </div>

        <p className="text-xs text-slate-600">
          Heading towards <strong>{booking.destinationAddress}</strong>. Relax in the passenger seat while {driver.name} handles navigation and traffic.
        </p>
      </div>

      {/* Driver & Vehicle Quick Summary */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={driver.photo}
            alt={driver.name}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-xl object-cover border border-[#E2E8F0]"
          />
          <div>
            <h4 className="text-sm font-bold text-[#101B2D]">{driver.name}</h4>
            <p className="text-xs text-slate-500 font-mono">{driver.badgeNumber}</p>
            <p className="text-xs text-[#19A974] font-medium">
              Driving your {booking.vehicle.color} {booking.vehicle.make}
            </p>
          </div>
        </div>

        <a
          href={`tel:${driver.phone}`}
          className="p-2.5 bg-[#F7F8FA] hover:bg-slate-100 text-slate-700 border border-[#E2E8F0] rounded-xl flex items-center justify-center transition-colors shadow-xs"
          title="Call Chauffeur"
        >
          <Phone className="w-4 h-4 text-[#19A974]" />
        </a>
      </div>

      {/* Route Corridor Map */}
      <RoutePreviewMap
        origin={booking.eventVenue || booking.pickupAddress}
        destination={booking.destinationAddress}
        distanceKm={booking.distanceKm}
        durationMins={booking.durationMins}
        statusText="Active Corridor — Trans-Amadi / Peter Odili Expressway"
      />

      {/* Simulated Arrival Action */}
      <div className="pt-2">
        <button
          onClick={onArriveDestination}
          className="w-full py-4 px-6 bg-[#19A974] hover:bg-[#159364] active:scale-[0.99] text-white font-extrabold text-base rounded-2xl shadow-lg shadow-[#19A974]/25 flex items-center justify-center gap-2 transition-all min-h-[56px] cursor-pointer"
        >
          <span>Simulate Arrival at Destination</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Clear Prototype Notice */}
      <div className="text-center">
        <span className="text-[11px] text-slate-400">
          Simulated Trip Progress · Tap the button above to test safe arrival & key return
        </span>
      </div>
    </div>
  );
};
