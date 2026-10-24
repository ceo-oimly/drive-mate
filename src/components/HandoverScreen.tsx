import React, { useState } from 'react';
import { Booking, Driver } from '../types';
import {
  ShieldCheck,
  Key,
  Car,
  Lock,
  Phone,
  ArrowRight,
  Camera,
  CheckCircle2,
  Clock,
  AlertTriangle,
  X,
  FileCheck2,
} from 'lucide-react';

interface HandoverScreenProps {
  booking: Booking;
  driver: Driver;
  onStartTrip: () => void;
  onCancelBooking: (reason: string) => void;
}

export const HandoverScreen: React.FC<HandoverScreenProps> = ({
  booking,
  driver,
  onStartTrip,
  onCancelBooking,
}) => {
  const [driverArrived, setDriverArrived] = useState(true);
  const [conditionRecordStatus, setConditionRecordStatus] = useState<
    'unselected' | 'created' | 'skipped'
  >('unselected');
  const [showConditionModal, setShowConditionModal] = useState(false);
  const [conditionNotes, setConditionNotes] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [callAlert, setCallAlert] = useState(false);

  const pinDigits = booking.handoverChecklist.handoverPin.split('');

  const handleSaveConditionRecord = () => {
    setConditionRecordStatus('created');
    setShowConditionModal(false);
  };

  const handleSkipConditionRecord = () => {
    setConditionRecordStatus('skipped');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-5 pb-24 space-y-5 animate-fade-in text-[#101B2D]">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-xs text-[#19A974] bg-[#19A974]/10 px-2.5 py-1 rounded border border-[#19A974]/20">
            {booking.id}
          </span>
          <span className="text-xs text-slate-500 font-medium">· Arrival & Handover</span>
        </div>

        <button
          onClick={() => setShowCancelModal(true)}
          className="text-xs text-rose-600 hover:underline font-semibold"
        >
          Cancel Request
        </button>
      </div>

      {/* Arrival Status Banner */}
      <div className="bg-white border-2 border-[#19A974]/40 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#19A974] shrink-0 animate-pulse" />
          <div>
            <h3 className="text-sm font-extrabold text-[#101B2D]">
              {driverArrived ? 'Driver Arrived at Your Pickup' : 'Driver Arriving (~8 mins)'}
            </h3>
            <p className="text-xs text-slate-500">
              Meet at your {booking.vehicle.color} {booking.vehicle.make} ({booking.vehicle.registrationNumber})
            </p>
          </div>
        </div>

        {/* Prototype toggle for testing ease */}
        <button
          onClick={() => setDriverArrived(!driverArrived)}
          className="text-[10px] text-slate-500 hover:text-[#101B2D] border border-slate-200 px-2 py-1 rounded bg-[#F7F8FA]"
          title="Toggle arrived status in prototype"
        >
          {driverArrived ? 'Simulate En Route' : 'Simulate Arrived'}
        </button>
      </div>

      {/* Selected Driver Profile Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={driver.photo}
                alt={driver.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-2xl object-cover border border-[#E2E8F0]"
              />
              <span className="absolute -bottom-1 -right-1 bg-[#19A974] text-white p-0.5 rounded-full shadow">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-[#101B2D]">{driver.name}</h4>
                <span className="text-[10px] font-bold text-[#19A974] bg-[#19A974]/10 px-2 py-0.5 rounded">
                  Assigned
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{driver.badgeNumber}</p>
              <p className="text-xs text-slate-600 mt-0.5">{driver.licenceCategory.split(' ')[0]} Commercial Chauffeur</p>
            </div>
          </div>

          <button
            onClick={() => {
              setCallAlert(true);
              setTimeout(() => setCallAlert(false), 3000);
            }}
            className="px-3 py-2 bg-[#F7F8FA] hover:bg-slate-100 border border-[#E2E8F0] text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs min-h-[40px]"
          >
            <Phone className="w-3.5 h-3.5 text-[#19A974]" />
            <span>Call</span>
          </button>
        </div>

        {callAlert && (
          <p className="text-xs text-[#19A974] bg-[#19A974]/10 p-2.5 rounded-xl border border-[#19A974]/20 text-center animate-fade-in font-medium">
            Connecting demo phone call to driver {driver.name} at {driver.phone}...
          </p>
        )}
      </div>

      {/* UNIQUE PICKUP CODE (PIN) CARD */}
      <div className="bg-white border-2 border-[#19A974] rounded-2xl p-5 shadow-sm space-y-3 text-center">
        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">
          Your Unique Pickup Code
        </span>

        {/* 4-Digit PIN segmented display */}
        <div className="flex justify-center items-center gap-3 py-1">
          {pinDigits.map((digit, i) => (
            <div
              key={i}
              className="w-12 h-14 rounded-xl bg-[#F7F8FA] border-2 border-[#19A974] text-[#19A974] font-mono font-extrabold text-2xl flex items-center justify-center shadow-xs"
            >
              {digit}
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
          Share this 4-digit code with your arriving driver. This confirms the correct booking before key handover.
        </p>
      </div>

      {/* OPTIONAL VEHICLE CONDITION RECORD CARD */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-slate-600" />
            <span>Optional Vehicle Condition Record</span>
          </span>

          {conditionRecordStatus === 'created' ? (
            <span className="text-[11px] font-bold text-[#19A974] bg-[#19A974]/10 px-2 py-0.5 rounded flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Recorded
            </span>
          ) : conditionRecordStatus === 'skipped' ? (
            <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Skipped
            </span>
          ) : (
            <span className="text-[10px] text-slate-400">Optional</span>
          )}
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Take a quick exterior record with your driver to point out any pre-existing scratches, or skip if you prefer a fast departure.
        </p>

        {conditionRecordStatus === 'unselected' ? (
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => setShowConditionModal(true)}
              className="py-2.5 px-3 bg-[#19A974]/10 hover:bg-[#19A974]/20 border border-[#19A974]/30 text-[#19A974] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors min-h-[44px]"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Create condition record</span>
            </button>

            <button
              onClick={handleSkipConditionRecord}
              className="py-2.5 px-3 bg-[#F7F8FA] hover:bg-slate-100 border border-[#E2E8F0] text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center transition-colors min-h-[44px]"
            >
              <span>Skip for now</span>
            </button>
          </div>
        ) : (
          <div className="pt-1 flex items-center justify-between text-xs text-slate-500">
            <span>
              {conditionRecordStatus === 'created'
                ? `Condition noted: ${conditionNotes || 'Exterior walkaround noted OK.'}`
                : 'Condition record skipped for fast departure.'}
            </span>
            <button
              onClick={() => setShowConditionModal(true)}
              className="text-[#19A974] font-semibold hover:underline"
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Primary CTA: "Hand over keys & Start trip" */}
      <div className="pt-2">
        <button
          onClick={onStartTrip}
          className="w-full py-4 px-6 bg-[#19A974] hover:bg-[#159364] active:scale-[0.99] text-white font-extrabold text-base rounded-2xl shadow-lg shadow-[#19A974]/25 flex items-center justify-center gap-2 transition-all min-h-[56px] cursor-pointer"
        >
          <Key className="w-5 h-5" />
          <span>Hand over keys & Start trip</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Brief Condition Record Modal */}
      {showConditionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#101B2D]">
                Quick Vehicle Walkaround
              </h3>
              <button
                onClick={() => setShowConditionModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Point out any pre-existing scratches or rim scuffs on your {booking.vehicle.make} {booking.vehicle.model}. The driver will note this down.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Condition Notes (Scratches / Dents / Fuel)
              </label>
              <textarea
                rows={3}
                value={conditionNotes}
                onChange={(e) => setConditionNotes(e.target.value)}
                placeholder="e.g. Minor scratch on rear right bumper; fuel tank at 70%"
                className="w-full bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl p-3 text-xs text-[#101B2D] focus:outline-none focus:border-[#19A974]"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSaveConditionRecord}
                className="flex-1 py-3 bg-[#19A974] hover:bg-[#159364] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Condition Record</span>
              </button>

              <button
                onClick={() => {
                  setShowConditionModal(false);
                  handleSkipConditionRecord();
                }}
                className="px-4 py-3 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl min-h-[44px]"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-[#101B2D]">Cancel Booking?</h3>
            <p className="text-xs text-slate-600">
              Are you sure you want to cancel this driver request for your {booking.vehicle.make}? Free cancellation applies.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl min-h-[40px]"
              >
                Keep Booking
              </button>
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  onCancelBooking('Customer cancelled prior to trip departure');
                }}
                className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl min-h-[40px]"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
