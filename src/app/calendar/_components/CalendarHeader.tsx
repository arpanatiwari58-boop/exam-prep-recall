import React from "react";
import { Calendar } from "lucide-react";
import { mockStudySessions, getReviewStatus } from "@/lib/spaced-repetition";

export function CalendarHeader() {
  const unitsRead = mockStudySessions.length;
  const reviewsDue = mockStudySessions.filter(
    (s) => getReviewStatus(s.nextReviewDate) === "due"
  ).length;

  return (
    <div className="bg-[#060b26] text-white py-16 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#a072ff]/20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ffb433]/20 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="text-[#a072ff] w-8 h-8" />
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Study Calendar</h1>
          </div>
          <p className="text-[#f4f5f9]/70 text-lg max-w-2xl font-medium">
            Track your spaced repetition intervals and never forget what you've learned.
          </p>
        </div>
        
        <div className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
          <div className="text-center px-4 border-r border-white/10">
            <p className="text-3xl font-black text-[#a072ff]">{unitsRead}</p>
            <p className="text-xs uppercase tracking-widest text-white/50 font-bold mt-1">Units Read</p>
          </div>
          <div className="text-center px-4">
            <p className="text-3xl font-black text-[#ffb433]">{reviewsDue}</p>
            <p className="text-xs uppercase tracking-widest text-white/50 font-bold mt-1">Reviews Due</p>
          </div>
        </div>
      </div>
    </div>
  );
}
