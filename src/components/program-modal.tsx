'use client';

import { useEffect } from 'react';
import { X, MapPin, Sparkles, Rocket, Calendar, Users } from 'lucide-react';

interface ProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProgramModal({ isOpen, onClose }: ProgramModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="relative w-full max-w-md bg-gradient-to-br from-white/95 via-slate-50/80 to-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-md transition-all backdrop-blur-sm"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-slate-600" />
        </button>

        <div className="p-5">
          {/* Badge */}
          <div className="text-center mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#ff5c5c] text-white rounded-full shadow-md">
              <Sparkles className="w-3 h-3" />
              <span className="text-xs font-bold">Limited Spots</span>
            </div>
          </div>
          
          {/* Heading */}
          <h2 className="text-xl font-black text-center text-slate-900 mb-3 leading-tight">
            Turn Your <span className="text-[#ff5c5c]">Research</span> Into Reality
          </h2>
          
          {/* Key Message */}
          <div className="text-center mb-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-red-100 shadow-sm">
            <p className="text-xs text-slate-700 mb-2">
              If your <span className="font-semibold text-[#ff5c5c]">research</span> solves a real problem, <span className="font-bold text-[#ff5c5c]">it should not end in your project file</span>
            </p>
            
            {/* Process Flow */}
            <div className="flex items-center justify-center gap-2 mt-2 pt-2 border-t border-red-100">
              <span className="text-[10px] font-bold text-slate-600">Idea</span>
              <span className="text-[#ff5c5c]">→</span>
              <span className="text-[10px] font-bold text-slate-600">Prototype</span>
              <span className="text-[#ff5c5c]">→</span>
              <span className="text-[10px] font-bold text-slate-600">Testing</span>
              <span className="text-[#ff5c5c]">→</span>
              <span className="text-[10px] font-bold text-[#ff5c5c]">Income</span>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2.5 p-2.5 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm">
              <div className="w-9 h-9 bg-[#ff5c5c] rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs uppercase">Seed-Stage Funding</h4>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm">
              <div className="w-9 h-9 bg-teal-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs uppercase">6-Week Incubation</h4>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm">
              <div className="w-9 h-9 bg-[#ff5c5c] rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs uppercase">Program Mentorship</h4>
            </div>
          </div>

          {/* Location - Distinct but subtle */}
          <div className="mb-3 p-3.5 bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-50 rounded-2xl border-2 border-teal-200 shadow-md">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-teal-700 uppercase tracking-wide mb-1">📍 Program Location</p>
                <p className="text-sm font-bold text-slate-900 leading-snug">Technology Park Incubation Center, FUTA, Akure</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <a
            href="https://forms.gle/csiQtdiiguFzsdVY9"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 bg-[#ff5c5c] hover:bg-[#ff4545] text-white font-bold text-center rounded-xl shadow-lg hover:shadow-xl active:scale-98 transition-all"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
}