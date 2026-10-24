/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Booking,
  BookingStatus,
  Driver,
  ActivityLogItem,
  Vehicle,
} from './types';
import {
  loadBookings,
  saveBookings,
  loadLogs,
  saveLogs,
  DEMO_DRIVERS,
  STATUS_CONFIG,
  loadSavedVehicle,
  loadSavedUser,
} from './services/bookingStore';

import { DemoDisclaimerBanner } from './components/DemoDisclaimerBanner';
import { CustomerHome } from './components/CustomerHome';
import { EnterDestinationScreen } from './components/EnterDestinationScreen';
import { ChooseDriverScreen } from './components/ChooseDriverScreen';
import { ConfirmBookingScreen } from './components/ConfirmBookingScreen';
import { HandoverScreen } from './components/HandoverScreen';
import { TripTrackingScreen } from './components/TripTrackingScreen';
import { TripCompletedScreen } from './components/TripCompletedScreen';
import { SafetyCentre } from './components/SafetyCentre';
import { DriverProfileModal } from './components/DriverProfileModal';

import {
  ShieldCheck,
  Car,
  Home,
  PlusCircle,
  Clock,
  Phone,
  CheckCircle2,
  Key,
} from 'lucide-react';

type ScreenView =
  | 'home'
  | 'enter_destination'
  | 'choose_driver'
  | 'confirm_booking'
  | 'handover'
  | 'trip_tracking'
  | 'trip_completed'
  | 'safety';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenView>('home');
  const [bookings, setBookings] = useState<Booking[]>(() => loadBookings());
  const [logs, setLogs] = useState<ActivityLogItem[]>(() => loadLogs());

  // Active / Selected booking id
  const [selectedBookingId, setSelectedBookingId] = useState<string>(() => {
    const initial = loadBookings();
    return initial[0]?.id || '';
  });

  // Draft state for in-progress customer booking
  const [bookingDraft, setBookingDraft] = useState<{
    pickup: string;
    destination: string;
    vehicle: Vehicle;
    driver?: Driver;
    quotedPrice: number;
    etaMins: number;
  }>({
    pickup: 'Genesis Sky Bar, GRA Phase 2',
    destination: '14 Peter Odili Road, Port Harcourt',
    vehicle: loadSavedVehicle(),
    driver: DEMO_DRIVERS[0],
    quotedPrice: 8500,
    etaMins: 8,
  });

  // Modal inspection state
  const [inspectingDriver, setInspectingDriver] = useState<Driver | null>(null);

  // Toast message state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync to local storage
  useEffect(() => {
    saveBookings(bookings);
  }, [bookings]);

  useEffect(() => {
    saveLogs(logs);
  }, [logs]);

  // Active selected booking lookup
  const currentBooking =
    bookings.find((b) => b.id === selectedBookingId) || bookings[0];

  const activeBookingsCount = bookings.filter(
    (b) => b.status !== 'trip_completed' && b.status !== 'cancelled'
  ).length;

  const appendLog = (action: string, bookingId: string, detail: string, actor: 'Customer' | 'Chauffeur' | 'Operations Desk') => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const newLog: ActivityLogItem = {
      id: `log-${Date.now()}`,
      timestamp: timeStr,
      action,
      bookingId,
      detail,
      actor,
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  // Step 1 -> Step 2: Customer taps "Get me a driver"
  const handleStartBooking = () => {
    setCurrentScreen('enter_destination');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2 -> Step 3: Customer enters destination & taps "Find drivers"
  const handleProceedToDrivers = (params: {
    pickup: string;
    destination: string;
    vehicle: Vehicle;
  }) => {
    setBookingDraft((prev) => ({
      ...prev,
      pickup: params.pickup,
      destination: params.destination,
      vehicle: params.vehicle,
    }));
    setCurrentScreen('choose_driver');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3 -> Step 4: Customer chooses a driver
  const handleSelectDriver = (driver: Driver, quotedPrice: number, etaMins: number) => {
    setBookingDraft((prev) => ({
      ...prev,
      driver,
      quotedPrice,
      etaMins,
    }));
    setCurrentScreen('confirm_booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 4 -> Step 5: Customer confirms booking
  const handleConfirmBooking = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    setSelectedBookingId(newBooking.id);
    appendLog(
      'Booking Request Created',
      newBooking.id,
      `${newBooking.customerName} requested designated chauffeur ${newBooking.assignedDriverId ? 'driver' : ''} for ${newBooking.vehicle.make} ${newBooking.vehicle.model}.`,
      'Customer'
    );
    showToast(`Booking ${newBooking.id} secured! Driver assigned.`);
    setCurrentScreen('handover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 5 -> Step 6: Customer completes key handover & starts trip
  const handleStartTrip = () => {
    if (!currentBooking) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const updated = bookings.map((b) => {
      if (b.id === currentBooking.id) {
        return {
          ...b,
          status: 'trip_started' as BookingStatus,
          handoverChecklist: {
            ...b.handoverChecklist,
            keyHandedOver: true,
            driverIdentityVerified: true,
            securityPinConfirmed: true,
            verifiedAt: timeStr,
          },
          timeline: [
            ...b.timeline,
            {
              status: 'trip_started' as BookingStatus,
              label: 'Trip Started & Keys Handed Over',
              timestamp: timeStr,
              note: 'Keys transferred safely to chauffeur. Trip in transit.',
            },
          ],
        };
      }
      return b;
    });

    setBookings(updated);
    appendLog(
      'Trip Started',
      currentBooking.id,
      'Keys safely transferred to chauffeur. Trip in transit.',
      'Customer'
    );
    showToast('Keys transferred safely! Trip in progress.');
    setCurrentScreen('trip_tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 6 -> Step 7: Chauffeur arrives at destination
  const handleArriveDestination = () => {
    if (!currentBooking) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const updated = bookings.map((b) => {
      if (b.id === currentBooking.id) {
        return {
          ...b,
          status: 'trip_completed' as BookingStatus,
          timeline: [
            ...b.timeline,
            {
              status: 'trip_completed' as BookingStatus,
              label: 'Trip Completed & Keys Returned',
              timestamp: timeStr,
              note: 'Vehicle parked safely and keys returned directly to owner.',
            },
          ],
        };
      }
      return b;
    });

    setBookings(updated);
    appendLog(
      'Trip Completed',
      currentBooking.id,
      'Vehicle parked safely and keys returned to owner.',
      'Chauffeur'
    );
    showToast('Arrived safely! Keys returned to owner.');
    setCurrentScreen('trip_completed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 7 -> Home: Customer finishes
  const handleFinishAndHome = () => {
    setCurrentScreen('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel booking handler
  const handleCancelBooking = (reason: string) => {
    if (!currentBooking) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const updated = bookings.map((b) => {
      if (b.id === currentBooking.id) {
        return {
          ...b,
          status: 'cancelled' as BookingStatus,
          cancellationReason: reason,
          cancelledAt: timeStr,
          timeline: [
            ...b.timeline,
            {
              status: 'cancelled' as BookingStatus,
              label: 'Booking Cancelled',
              timestamp: timeStr,
              note: `Reason: ${reason}`,
            },
          ],
        };
      }
      return b;
    });

    setBookings(updated);
    appendLog(
      'Booking Cancelled',
      currentBooking.id,
      `Cancelled: ${reason}`,
      'Customer'
    );
    showToast('Booking cancelled.');
    setCurrentScreen('home');
  };

  // Route back to active trip screen based on current booking status
  const handleTrackActiveTrip = (booking: Booking) => {
    setSelectedBookingId(booking.id);
    if (booking.status === 'trip_completed') {
      setCurrentScreen('trip_completed');
    } else if (booking.status === 'trip_started') {
      setCurrentScreen('trip_tracking');
    } else {
      setCurrentScreen('handover');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Active driver lookup for handover/tracking
  const activeDriver =
    (currentBooking?.assignedDriverId &&
      DEMO_DRIVERS.find((d) => d.id === currentBooking.assignedDriverId)) ||
    bookingDraft.driver ||
    DEMO_DRIVERS[0];

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#101B2D] flex flex-col selection:bg-[#19A974] selection:text-white">
      {/* Honesty & Safeguards Banner */}
      <DemoDisclaimerBanner />

      {/* Customer-Only Top Bar Navigation (Clean, No Admin/Ops Panels) */}
      <header className="sticky top-0 z-40 bg-[#101B2D] border-b border-[#1E2D4A] shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Wordmark */}
          <button
            onClick={() => setCurrentScreen('home')}
            className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 group min-h-[44px]"
          >
            <div className="w-8 h-8 rounded-xl bg-[#19A974] flex items-center justify-center text-white shadow-md shadow-[#19A974]/20">
              <Key className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-[#19A974] transition-colors">
              DriveMate
            </span>
          </button>

          {/* Customer Navigation Links */}
          <nav className="hidden sm:flex items-center gap-6 text-xs font-bold text-slate-300">
            <button
              onClick={() => setCurrentScreen('home')}
              className={`hover:text-white transition-colors whitespace-nowrap py-2 min-h-[44px] flex items-center ${
                currentScreen === 'home' ? 'text-[#19A974]' : ''
              }`}
            >
              Home
            </button>

            <button
              onClick={handleStartBooking}
              className={`hover:text-white transition-colors whitespace-nowrap py-2 min-h-[44px] flex items-center ${
                currentScreen === 'enter_destination' ||
                currentScreen === 'choose_driver' ||
                currentScreen === 'confirm_booking'
                  ? 'text-[#19A974]'
                  : ''
              }`}
            >
              Book a Driver
            </button>

            {activeBookingsCount > 0 && (
              <button
                onClick={() => handleTrackActiveTrip(currentBooking)}
                className={`hover:text-white transition-colors whitespace-nowrap py-2 min-h-[44px] flex items-center gap-1.5 ${
                  currentScreen === 'handover' ||
                  currentScreen === 'trip_tracking' ||
                  currentScreen === 'trip_completed'
                    ? 'text-[#19A974]'
                    : ''
                }`}
              >
                <span>Active Trip</span>
                <span className="w-2 h-2 rounded-full bg-[#19A974] animate-pulse" />
              </button>
            )}

            <button
              onClick={() => setCurrentScreen('safety')}
              className={`hover:text-white transition-colors whitespace-nowrap py-2 min-h-[44px] flex items-center ${
                currentScreen === 'safety' ? 'text-[#19A974]' : ''
              }`}
            >
              Safety Guide
            </button>
          </nav>

          {/* Quick Support Call Hotline */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="tel:08003748362"
              className="px-3 py-1.5 bg-[#0B1320] hover:bg-[#182842] border border-[#1E2D4A] text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors min-h-[38px]"
            >
              <Phone className="w-3.5 h-3.5 text-[#19A974]" />
              <span className="hidden sm:inline">0800-DRIVEMATE</span>
              <span className="sm:hidden">Call</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Customer Screens */}
      <main className="flex-1 pb-20 sm:pb-10">
        {/* Screen 1: Home */}
        {currentScreen === 'home' && (
          <CustomerHome
            onStartBooking={handleStartBooking}
            onTrackBooking={handleTrackActiveTrip}
            activeBooking={
              activeBookingsCount > 0 && currentBooking?.status !== 'trip_completed'
                ? currentBooking
                : undefined
            }
          />
        )}

        {/* Screen 2: Enter Destination */}
        {currentScreen === 'enter_destination' && (
          <EnterDestinationScreen
            initialPickup={bookingDraft.pickup}
            initialDestination={bookingDraft.destination}
            onProceedToDrivers={handleProceedToDrivers}
            onBack={() => setCurrentScreen('home')}
          />
        )}

        {/* Screen 3: Choose a Driver (Glovo-like Marketplace) */}
        {currentScreen === 'choose_driver' && (
          <ChooseDriverScreen
            pickup={bookingDraft.pickup}
            destination={bookingDraft.destination}
            onSelectDriver={handleSelectDriver}
            onBack={() => setCurrentScreen('enter_destination')}
          />
        )}

        {/* Screen 4: Confirm Booking */}
        {currentScreen === 'confirm_booking' && bookingDraft.driver && (
          <ConfirmBookingScreen
            pickup={bookingDraft.pickup}
            destination={bookingDraft.destination}
            driver={bookingDraft.driver}
            quotedPrice={bookingDraft.quotedPrice}
            etaMins={bookingDraft.etaMins}
            vehicle={bookingDraft.vehicle}
            onConfirmSuccess={handleConfirmBooking}
            onBack={() => setCurrentScreen('choose_driver')}
          />
        )}

        {/* Screen 5: Driver Arrival & Handover PIN */}
        {currentScreen === 'handover' && currentBooking && (
          <HandoverScreen
            booking={currentBooking}
            driver={activeDriver}
            onStartTrip={handleStartTrip}
            onCancelBooking={handleCancelBooking}
          />
        )}

        {/* Screen 6: Track the Trip */}
        {currentScreen === 'trip_tracking' && currentBooking && (
          <TripTrackingScreen
            booking={currentBooking}
            driver={activeDriver}
            onArriveDestination={handleArriveDestination}
          />
        )}

        {/* Screen 7: Arrival & Completion */}
        {currentScreen === 'trip_completed' && currentBooking && (
          <TripCompletedScreen
            booking={currentBooking}
            driver={activeDriver}
            onFinishAndHome={handleFinishAndHome}
          />
        )}

        {/* Safety & Safeguards Guide */}
        {currentScreen === 'safety' && <SafetyCentre />}
      </main>

      {/* Driver Profile Modal (if inspected) */}
      {inspectingDriver && (
        <DriverProfileModal
          driver={inspectingDriver}
          isOpen={!!inspectingDriver}
          onClose={() => setInspectingDriver(null)}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#101B2D] border border-[#19A974] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#19A974] shrink-0" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Fixed Mobile Bottom Tab Bar (Customer-Only) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] grid grid-cols-4 items-center h-16 px-1 shadow-md">
        <button
          onClick={() => {
            setCurrentScreen('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
            currentScreen === 'home' ? 'text-[#19A974] font-bold' : 'text-slate-500'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] tracking-tight mt-1">Home</span>
        </button>

        <button
          onClick={handleStartBooking}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
            currentScreen === 'enter_destination' ||
            currentScreen === 'choose_driver' ||
            currentScreen === 'confirm_booking'
              ? 'text-[#19A974] font-bold'
              : 'text-slate-500'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span className="text-[10px] tracking-tight mt-1">Book</span>
        </button>

        <button
          onClick={() => {
            if (currentBooking) {
              handleTrackActiveTrip(currentBooking);
            } else {
              handleStartBooking();
            }
          }}
          className={`relative flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
            currentScreen === 'handover' ||
            currentScreen === 'trip_tracking' ||
            currentScreen === 'trip_completed'
              ? 'text-[#19A974] font-bold'
              : 'text-slate-500'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span className="text-[10px] tracking-tight mt-1">Active Trip</span>
          {activeBookingsCount > 0 && (
            <span className="absolute top-2 right-4 w-2 h-2 rounded-full bg-[#19A974] animate-pulse" />
          )}
        </button>

        <button
          onClick={() => {
            setCurrentScreen('safety');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
            currentScreen === 'safety' ? 'text-[#19A974] font-bold' : 'text-slate-500'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[10px] tracking-tight mt-1">Safety</span>
        </button>
      </nav>
    </div>
  );
}
