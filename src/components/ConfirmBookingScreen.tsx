import React, { useState } from 'react';
import { Booking, Driver, Vehicle } from '../types';
import { RoutePreviewMap } from './RoutePreviewMap';
import {
  ArrowLeft,
  MapPin,
  Car,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Info,
} from 'lucide-react';

interface ConfirmBookingScreenProps {
  pickup: string;
  destination: string;
  driver: Driver;
  quotedPrice: number;
  etaMins: number;
  vehicle: Vehicle;
  onConfirmSuccess: (booking: Booking) => void;
  onBack: () => void;
}

export const ConfirmBookingScreen: React.FC<ConfirmBookingScreenProps> = ({
  pickup,
  destination,
  driver,
  quotedPrice,
  etaMins,
  vehicle,
  onConfirmSuccess,
  onBack,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = () => {
    setIsSubmitting(true);

    const randomPin = String(Math.floor(1000 + Math.random() * 9000));
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `DM-PHC-${randomSuffix}`;

    const now = new Date();
    const timeFormatted = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newBooking: Booking = {
      id: bookingId,
      createdAt: now.toISOString(),
      customerName: 'Emeka Okonkwo',
      customerPhone: '+234 803 123 4567',
      eventVenue: pickup.includes(',') ? pickup.split(',')[0].trim() : 'Event Venue',
      pickupAddress: pickup,
      destinationAddress: destination,
      bookingTime: 'Immediate (~15-20 mins)',
      isImmediate: true,
      passengerCount: 2,
      vehicle: {
        make: vehicle.make,
        model: vehicle.model,
        color: vehicle.color,
        registrationNumber: vehicle.registrationNumber,
        transmission: vehicle.transmission,
        keyType: vehicle.keyType,
      },
      distanceKm: 11.6,
      durationMins: 22,
      pricing: {
        baseBookingFee: 3500,
        distanceFare: 3000,
        lateNightSafetyAllowance: 2000,
        totalEstimatedFare: quotedPrice,
        currency: '₦',
      },
      status: 'driver_assigned',
      assignedDriverId: driver.id,
      handoverChecklist: {
        driverIdentityVerified: false,
        securityPinConfirmed: false,
        walkaroundCompleted: false,
        fuelAndOdometerRecorded: false,
        keyHandedOver: false,
        handoverPin: randomPin,
      },
      timeline: [
        {
          status: 'request_submitted',
          label: 'Booking Request Submitted',
          timestamp: `${timeFormatted} PM`,
          note: `Selected designated driver ${driver.name}.`,
        },
        {
          status: 'driver_assigned',
          label: 'Driver Assigned (Prototype Simulation)',
          timestamp: `${timeFormatted} PM`,
          note: `${driver.name} accepted request and is dispatched.`,
        },
      ],
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onConfirmSuccess(newBooking);
    }, 400);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-5 pb-24 space-y-5 animate-fade-in text-[#101B2D]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#101B2D] -ml-1 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Drivers</span>
        </button>

        <span className="text-xs font-extrabold text-[#101B2D]">
          Step 3 of 3 · Confirm Booking
        </span>

        <div className="w-12" />
      </div>

      {/* Essential Trip Information Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm space-y-4">
        {/* Route Details */}
        <div className="space-y-2 border-b border-[#E2E8F0] pb-3.5">
          <div className="flex items-start gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#19A974] mt-1.5 shrink-0" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pickup</span>
              <p className="text-sm font-bold text-[#101B2D]">{pickup}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Destination</span>
              <p className="text-sm font-bold text-[#101B2D]">{destination}</p>
            </div>
          </div>
        </div>

        {/* Selected Driver Summary */}
        <div className="flex items-center justify-between gap-3 border-b border-[#E2E8F0] pb-3.5">
          <div className="flex items-center gap-3">
            <img
              src={driver.photo}
              alt={driver.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-xl object-cover border border-[#E2E8F0]"
            />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Selected Driver</span>
              <h4 className="text-sm font-bold text-[#101B2D]">{driver.name}</h4>
              <p className="text-xs text-slate-500">{driver.licenceCategory.split(' ')[0]} · ~{etaMins} mins away</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 block">Total Quoted</span>
            <span className="text-lg font-black text-[#19A974] font-mono">
              ₦{quotedPrice.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Vehicle to be Driven */}
        <div className="flex items-center justify-between text-xs bg-[#F7F8FA] p-3 rounded-xl border border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-[#19A974]" />
            <span className="font-bold text-[#101B2D]">
              {vehicle.color} {vehicle.make} {vehicle.model}
            </span>
          </div>
          <span className="font-mono font-semibold text-slate-600">
            {vehicle.registrationNumber} ({vehicle.transmission})
          </span>
        </div>

        {/* Simulation Honest Disclosure */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 flex items-start gap-2 text-xs text-amber-900">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Prototype Notice:</strong> This prototype simulates driver assignment and trip tracking. No real payment or live driver dispatch occurs in this demonstration.
          </p>
        </div>

        {/* Dominant Primary Button: "Confirm booking" */}
        <button
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-[#19A974] hover:bg-[#159364] active:scale-[0.99] text-white font-extrabold text-base rounded-2xl shadow-lg shadow-[#19A974]/25 flex items-center justify-center gap-2 transition-all min-h-[56px] disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? (
            <span>Securing Chauffeur...</span>
          ) : (
            <>
              <span>Confirm booking</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </>
          )}
        </button>
      </div>

      {/* Corridor Map Preview */}
      <RoutePreviewMap
        origin={pickup}
        destination={destination}
        distanceKm={11.6}
        durationMins={22}
      />
    </div>
  );
};
