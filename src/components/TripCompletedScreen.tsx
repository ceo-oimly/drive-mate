import React, { useState } from 'react';
import { Booking, Driver } from '../types';
import {
  CheckCircle2,
  Key,
  Star,
  Car,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Send,
} from 'lucide-react';

interface TripCompletedScreenProps {
  booking: Booking;
  driver: Driver;
  onFinishAndHome: () => void;
}

export const TripCompletedScreen: React.FC<TripCompletedScreenProps> = ({
  booking,
  driver,
  onFinishAndHome,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [feedback, setFeedback] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedFeedback(true);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-24 space-y-6 animate-fade-in text-[#101B2D]">
      {/* Top Arrival Banner */}
      <div className="text-center space-y-2 pt-2">
        <div className="w-16 h-16 rounded-full bg-[#19A974]/15 border-2 border-[#19A974] flex items-center justify-center text-[#19A974] mx-auto shadow-md shadow-[#19A974]/15">
          <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101B2D] tracking-tight">
          You have arrived safely!
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Trip completed to <strong>{booking.destinationAddress}</strong>
        </p>
      </div>

      {/* Key Return Reminder */}
      <div className="bg-white border-2 border-[#19A974]/30 rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#19A974]/10 flex items-center justify-center text-[#19A974] shrink-0 mt-0.5">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#101B2D]">
              Vehicle Parked & Keys Returned
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {driver.name} has safely parked your {booking.vehicle.color} {booking.vehicle.make} ({booking.vehicle.registrationNumber}) and returned your vehicle keys directly into your hands.
            </p>
          </div>
        </div>
      </div>

      {/* Agreed Fare & Payment Details */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Agreed Total Fare
          </span>
          <span className="text-xl font-black text-[#19A974] font-mono">
            ₦{booking.pricing.totalEstimatedFare.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-600">
          <span>Payment Status:</span>
          <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Demo Pilot · Settled (No charge)
          </span>
        </div>

        <p className="text-[11px] text-slate-400">
          Commercial payment gateways and cash-on-arrival options will be active upon full launch.
        </p>
      </div>

      {/* Optional Feedback */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Rate Your Chauffeur ({driver.name})
        </h3>

        {submittedFeedback ? (
          <div className="p-3 bg-[#19A974]/10 rounded-xl text-center text-xs text-[#19A974] font-bold">
            Thank you! Your feedback has been recorded.
          </div>
        ) : (
          <form onSubmit={handleSubmitFeedback} className="space-y-3">
            {/* Stars */}
            <div className="flex items-center justify-center gap-2 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1.5 focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-7 h-7 ${
                      rating >= star
                        ? 'fill-amber-400 text-amber-500'
                        : 'text-slate-200'
                    }`}
                  />
                </button>
              ))}
            </div>

            <input
              type="text"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Leave optional feedback (e.g. Smooth driving, very punctual)..."
              className="w-full bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-xs text-[#101B2D] focus:outline-none focus:border-[#19A974]"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-[#F7F8FA] hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-[#E2E8F0] min-h-[36px]"
              >
                Submit Rating
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Dominant Action: "Done & Book again" */}
      <div className="pt-2">
        <button
          onClick={onFinishAndHome}
          className="w-full py-4 px-6 bg-[#19A974] hover:bg-[#159364] active:scale-[0.99] text-white font-extrabold text-base rounded-2xl shadow-lg shadow-[#19A974]/25 flex items-center justify-center gap-2 transition-all min-h-[56px] cursor-pointer"
        >
          <span>Done & Return Home</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
