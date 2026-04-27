import React from "react";

export function HowItWorksSidebar() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-sm font-bold text-[#060b26]/50 uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">
        How it works
      </h3>
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 font-bold">
            1
          </div>
          <p className="text-[13px] text-[#060b26]/70 font-medium leading-relaxed pt-1">
            Read a unit and mark it as completed on your subject page.
          </p>
        </div>
        <div className="w-0.5 h-6 bg-gray-100 ml-4"></div>
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-[#ffb433]/10 text-[#e69b19] flex items-center justify-center shrink-0 font-bold">
            2
          </div>
          <p className="text-[13px] text-[#060b26]/70 font-medium leading-relaxed pt-1">
            Our algorithm schedules recall sessions (1, 3, 7, 21 days).
          </p>
        </div>
        <div className="w-0.5 h-6 bg-gray-100 ml-4"></div>
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-[#a072ff]/10 text-[#a072ff] flex items-center justify-center shrink-0 font-bold">
            3
          </div>
          <p className="text-[13px] text-[#060b26]/70 font-medium leading-relaxed pt-1">
            Take quick tests here to lock concepts into long-term memory!
          </p>
        </div>
      </div>
    </div>
  );
}
