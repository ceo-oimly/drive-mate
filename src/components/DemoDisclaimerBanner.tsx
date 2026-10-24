import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export const DemoDisclaimerBanner: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[#0B1320] border-b border-[#1E2D4A] text-slate-300 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#19A974]/15 text-[#19A974] font-bold text-[11px] shrink-0 border border-[#19A974]/30">
            !
          </span>
          <p className="font-semibold text-slate-200">
            <strong className="text-[#19A974] font-bold">DriveMate Prototype MVP:</strong> Simulated designated driver booking service for customer-owned vehicles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[#19A974] hover:text-white font-semibold inline-flex items-center gap-1 transition-colors min-h-[32px] px-2 py-1 rounded"
          >
            <span>{expanded ? 'Hide Safety Notice' : 'Read Honesty & Safeguards Notice'}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-[#1E2D4A] text-[11px] text-slate-400 space-y-1.5 leading-relaxed">
          <p>
            • <strong className="text-slate-200">Simulated Chauffeur Data:</strong> All driver profiles, vehicle handovers, ratings, and tracking positions are simulated demo records created for evaluation.
          </p>
          <p>
            • <strong className="text-slate-200">Customer Vehicle Safeguard:</strong> DriveMate is strictly for customer-owned cars. In production, formal rollout requires comprehensive commercial designated-driver liability insurance, verified biometric FRSC licensing, and sober handover protocols.
          </p>
          <p>
            • <strong className="text-slate-200">No Real Dispatch or Payments:</strong> No actual drivers are dispatched and no live financial transactions or personal identity documents are processed in this prototype.
          </p>
        </div>
      )}
    </div>
  );
};
