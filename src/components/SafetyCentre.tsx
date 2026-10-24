import React, { useState } from 'react';
import { IncidentReport } from '../types';
import {
  loadIncidents,
  saveIncidents,
} from '../services/bookingStore';
import {
  ShieldCheck,
  Key,
  Car,
  AlertTriangle,
  UserCheck,
  Share2,
  PhoneCall,
  Send,
  FileCheck2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HeartPulse,
  Lock,
} from 'lucide-react';

export const SafetyCentre: React.FC = () => {
  const [incidents, setIncidents] = useState<IncidentReport[]>(() => loadIncidents());
  const [reportCategory, setReportCategory] = useState<IncidentReport['category']>('safety_handover');
  const [reportSeverity, setReportSeverity] = useState<IncidentReport['severity']>('medium');
  const [reportBookingId, setReportBookingId] = useState('');
  const [reportContact, setReportContact] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Accordion for protocol reading
  const [expandedSection, setExpandedSection] = useState<'unwell' | 'handover' | 'identity' | 'sharing'>('unwell');

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportDescription.trim() || !reportContact.trim()) return;

    const newReport: IncidentReport = {
      id: `INC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleString(),
      bookingId: reportBookingId.trim() || undefined,
      category: reportCategory,
      severity: reportSeverity,
      description: reportDescription.trim(),
      contactEmailOrPhone: reportContact.trim(),
      status: 'received',
    };

    const updated = [newReport, ...incidents];
    setIncidents(updated);
    saveIncidents(updated);
    setSubmittedMessage(true);
    setReportDescription('');
    setReportBookingId('');
    setTimeout(() => setSubmittedMessage(false), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-24 space-y-8 animate-fade-in text-[#101B2D]">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-[#19A974]/10 border border-[#19A974]/30 text-[#19A974] flex items-center justify-center mx-auto shadow-sm">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101B2D] tracking-tight">
          DriveMate Safety & Safeguards Centre
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Because our vetted chauffeurs operate your personal vehicle, our trust, identity, and vehicle handover standards are strictly uncompromising.
        </p>
      </div>

      {/* Critical Core Safeguard Banner: Customer Impairment / Unwell Protocol */}
      <div className="bg-white border-2 border-amber-400/60 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-600">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 font-mono">
              Crucial Safety Directive
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-[#101B2D]">
              Protocol for Unwell, Impaired, or Intoxicated Passengers
            </h3>
          </div>
        </div>

        <div className="bg-amber-50/60 p-4.5 rounded-xl border border-amber-200/70 space-y-2.5 text-xs text-amber-950 leading-relaxed">
          <p className="text-sm font-bold text-amber-900">
            Rule 1: Intoxication or illness is NEVER a justification to skip identity verification or vehicle condition safeguards.
          </p>
          <p>
            • <strong className="text-amber-900">Designated Sober Companion Requirement:</strong> If an attending guest is visibly incapacitated or unable to coherently verify their vehicle, a designated sober companion, family member, or verified event host/security supervisor must co-sign the vehicle handover and accompany the journey.
          </p>
          <p>
            • <strong className="text-amber-900">Medical Priority over Transport:</strong> If an event attendee exhibits symptoms of acute poisoning, physical trauma, or medical distress, DriveMate chauffeurs are instructed to immediately summon venue medical personnel or ambulance services. Driving an acutely unwell passenger in a private vehicle without medical supervision is strictly prohibited.
          </p>
          <p>
            • <strong className="text-amber-900">Safe Vehicle Custody:</strong> If a customer cannot safely complete handover and has no sober companion present, the vehicle is safely parked in the venue valet/parking area and keys are entrusted to venue security/hotel management with an official physical custody receipt.
          </p>
          <p>
            • <strong className="text-amber-900">Zero Abandonment:</strong> Under no circumstance does a DriveMate driver abandon a customer at an unsafe or isolated roadside.
          </p>
        </div>
      </div>

      {/* Accordion Safeguards Guide */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Core Safety Pillars & Verification Procedures
        </h3>

        {/* Pillar 1: Two-Way Identity Verification */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
          <button
            onClick={() => setExpandedSection(expandedSection === 'identity' ? 'unwell' : 'identity')}
            className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors min-h-[52px]"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#19A974]/10 text-[#19A974] border border-[#19A974]/20">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#101B2D]">1. Two-Way Identity & Secret PIN Handshake</h4>
                <p className="text-xs text-slate-500">How you confirm the driver is legitimate before handing over keys</p>
              </div>
            </div>
            {expandedSection === 'identity' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>

          {expandedSection === 'identity' && (
            <div className="px-5 pb-5 pt-2 text-xs text-slate-600 space-y-2 border-t border-[#E2E8F0] bg-[#F7F8FA]">
              <p>
                Every booking generates a unique 4-digit secret Handover PIN. When the chauffeur arrives at your event:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Compare the physical driver’s face and official DriveMate lanyard badge against the photo in your app.</li>
                <li>Ask the driver to state your vehicle registration and provide your secret 4-digit PIN.</li>
                <li>Never give keys to any individual who cannot produce the exact PIN and matching badge.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Pillar 2: Vehicle Condition & Key Handover Checklist */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
          <button
            onClick={() => setExpandedSection(expandedSection === 'handover' ? 'unwell' : 'handover')}
            className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors min-h-[52px]"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#19A974]/10 text-[#19A974] border border-[#19A974]/20">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#101B2D]">2. Mutual 360° Vehicle Condition Checklist</h4>
                <p className="text-xs text-slate-500">Documenting pre-trip vehicle state, fuel levels, and rims</p>
              </div>
            </div>
            {expandedSection === 'handover' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>

          {expandedSection === 'handover' && (
            <div className="px-5 pb-5 pt-2 text-xs text-slate-600 space-y-2 border-t border-[#E2E8F0] bg-[#F7F8FA]">
              <p>
                Both you (or your sober companion) and the chauffeur conduct a 90-second walkaround inspection before turning the ignition:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Inspect front and rear bumpers, wing mirrors, and wheel rims for pre-existing scratches or dents.</li>
                <li>Confirm fuel gauge is sufficient to reach the destination.</li>
                <li>Verify the vehicle is placed in Park before the key is passed.</li>
                <li>Upon reaching your driveway or compound, the driver returns the keys directly into your hands and confirms the parking brake is engaged.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Pillar 3: Live Trip Sharing Guidance */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
          <button
            onClick={() => setExpandedSection(expandedSection === 'sharing' ? 'unwell' : 'sharing')}
            className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors min-h-[52px]"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#19A974]/10 text-[#19A974] border border-[#19A974]/20">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#101B2D]">3. Live Journey Sharing for Friends & Family</h4>
                <p className="text-xs text-slate-500">Keeping your loved ones updated throughout your transit home</p>
              </div>
            </div>
            {expandedSection === 'sharing' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>

          {expandedSection === 'sharing' && (
            <div className="px-5 pb-5 pt-2 text-xs text-slate-600 space-y-2 border-t border-[#E2E8F0] bg-[#F7F8FA]">
              <p>
                With one tap on the "Share Trip" button in your tracking screen, you can send a trip link to your spouse, parents, or friends via WhatsApp or SMS.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Displays your chauffeur’s verified name, photo, and badge number.</li>
                <li>Shows vehicle make, color, and plate number.</li>
                <li>Provides real-time milestone updates from departure to safe doorstep arrival.</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Support & Incident Reporting Interface */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-2.5">
            <PhoneCall className="w-5 h-5 text-[#19A974]" />
            <div>
              <h3 className="text-base font-bold text-[#101B2D]">Incident & Support Reporting</h3>
              <p className="text-xs text-slate-500">
                Direct conduit to DriveMate Safety Operations & Incident Response
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-[#19A974] bg-[#19A974]/10 border border-[#19A974]/20 px-2.5 py-1 rounded-lg font-bold">
            24/7 Operations Desk
          </span>
        </div>

        {submittedMessage && (
          <div className="bg-[#19A974]/10 border border-[#19A974]/30 p-4 rounded-xl flex items-center gap-3 text-xs text-[#19A974]">
            <CheckCircle2 className="w-5 h-5 text-[#19A974] shrink-0" />
            <span className="font-semibold">
              Your safety incident report has been logged. Our dispatch supervisor has been notified.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmitReport} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Category
              </label>
              <select
                value={reportCategory}
                onChange={(e) => setReportCategory(e.target.value as any)}
                className="w-full bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs text-[#101B2D] focus:outline-none focus:border-[#19A974]"
              >
                <option value="safety_handover">Safety & Key Handover</option>
                <option value="driver_conduct">Chauffeur Conduct & Etiquette</option>
                <option value="vehicle_condition">Vehicle Condition / Handling Concern</option>
                <option value="lost_item">Lost Item in Customer Vehicle</option>
                <option value="other">General Operational Support</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Severity Level
              </label>
              <select
                value={reportSeverity}
                onChange={(e) => setReportSeverity(e.target.value as any)}
                className="w-full bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs text-[#101B2D] focus:outline-none focus:border-[#19A974]"
              >
                <option value="low">Low (Feedback / Non-urgent)</option>
                <option value="medium">Medium (Investigation requested)</option>
                <option value="high">High (Prompt action required)</option>
                <option value="urgent">Urgent (Immediate escort priority)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Booking Reference (Optional)
              </label>
              <input
                type="text"
                value={reportBookingId}
                onChange={(e) => setReportBookingId(e.target.value)}
                placeholder="e.g. DM-PHC-8921"
                className="w-full bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs text-[#101B2D] placeholder-slate-400 font-mono focus:outline-none focus:border-[#19A974]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Contact Phone or Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={reportContact}
              onChange={(e) => setReportContact(e.target.value)}
              placeholder="e.g. +234 803 123 4567 or email@domain.com"
              className="w-full bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs text-[#101B2D] focus:outline-none focus:border-[#19A974]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Detailed Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
              placeholder="Please describe what happened, including venue, driver details, or key condition..."
              className="w-full bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl p-3 text-xs text-[#101B2D] focus:outline-none focus:border-[#19A974]"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[#19A974] hover:bg-[#159364] text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors min-h-[44px] shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Safety Report</span>
            </button>
          </div>
        </form>

        {/* Recent Submitted Reports */}
        {incidents.length > 0 && (
          <div className="pt-4 border-t border-[#E2E8F0] space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Recorded Incident Logs ({incidents.length})
            </span>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {incidents.map((inc) => (
                <div
                  key={inc.id}
                  className="bg-[#F7F8FA] p-3 rounded-xl border border-[#E2E8F0] text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[#19A974] font-bold">{inc.id}</span>
                    <span className="text-[11px] text-slate-500">{inc.createdAt}</span>
                  </div>
                  <p className="text-slate-700">{inc.description}</p>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span>Category: {inc.category.replace('_', ' ')}</span>
                    <span>·</span>
                    <span className="uppercase text-amber-600 font-semibold">{inc.severity} priority</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
