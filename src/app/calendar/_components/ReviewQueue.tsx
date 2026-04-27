"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, Clock, BrainCircuit, CheckCircle2, CalendarDays, Loader2 } from "lucide-react";
import { getReviewStatus, formatNextReviewDate, formatDetailedTime, SPACING_INTERVALS, StudySession, completeReviewSession } from "@/lib/spaced-repetition";
import { db } from "@/firebase/config";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";

export function ReviewQueue({ subjectIdFilter, dueOnly }: { subjectIdFilter?: string; dueOnly?: boolean }) {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleReviewComplete = async (session: StudySession) => {
    if (updatingId) return; // prevent multiple clicks
    setUpdatingId(session.id);
    try {
      await completeReviewSession(session);
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    // Assuming 'user123' for now
    let q = query(collection(db, "studySessions"), where("userId", "==", "user123"));
    
    if (subjectIdFilter) {
      q = query(q, where("subjectId", "==", subjectIdFilter));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedSessions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as StudySession[];
      
      setSessions(fetchedSessions);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching sessions:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [subjectIdFilter]);

  // Sort reviews: Due first, then by date closest to today
  const sortedSessions = [...sessions]
    .filter(s => {
      if (!dueOnly) return true;
      return getReviewStatus(s.nextReviewDate) === "due";
    })
    .sort((a, b) => {
    return a.nextReviewDate - b.nextReviewDate;
  });

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8 shrink-0">
        <h2 className="text-xl font-bold text-[#060b26] flex items-center gap-2">
          <BrainCircuit className="text-[#a072ff]" />
          {dueOnly ? "Due Today" : (subjectIdFilter ? "All Tracked Chapters" : "Spaced Repetition Queue")}
        </h2>
        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${dueOnly ? 'bg-rose-50 text-rose-500' : 'bg-[#a072ff]/10 text-[#a072ff]'}`}>
          {dueOnly ? 'Urgent' : 'Algorithm Optimal'}
        </span>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2 -mr-2">
        {isLoading ? (
          <div className="flex items-center justify-center h-48 text-[#a072ff]">
            <Loader2 size={32} className="animate-spin" />
          </div>
        ) : sortedSessions.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
              <CheckCircle2 size={24} />
            </div>
            <p className="text-[#060b26]/50 font-medium text-sm">No chapters found for this criteria.</p>
          </div>
        ) : (
          sortedSessions.map((session) => {
          const status = getReviewStatus(session.nextReviewDate);
          const isDue = status === "due";
          const formattedDate = formatNextReviewDate(session.nextReviewDate);

          return (
            <div
              key={session.id}
              className="flex flex-col sm:flex-row items-start gap-4 p-4 border border-gray-100 rounded-xl hover:border-[#a072ff]/30 hover:bg-gray-50 transition-all group"
            >
              <div
                className={`w-10 h-10 mt-1 sm:mt-0 shrink-0 rounded-full flex items-center justify-center border-2 ${
                  isDue
                    ? "bg-rose-50 border-rose-100 text-rose-500"
                    : "bg-gray-50 border-gray-100 text-gray-400"
                }`}
              >
                <Clock size={18} strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0 w-full">
                <div className="flex items-center justify-between xl:mb-0.5">
                  <h3 className="text-[15px] font-bold text-[#060b26] truncate pr-4">
                    {session.topicTitle}
                  </h3>
                  <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded uppercase tracking-wider shrink-0 flex items-center gap-1">
                    <CalendarDays size={12}/> Step {session.currentStep + 1}
                  </span>
                </div>
                
                <p className="text-[13px] text-[#060b26]/50 font-medium truncate flex items-center gap-2 mb-3 mt-0.5">
                  <BookOpen size={14} /> {session.subjectName}
                </p>
                
                {/* Visual Dash/Node Repetition Tracker */}
                <div className="bg-white/50 border border-gray-100 rounded-[10px] p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <span className="text-[#060b26]/40 uppercase tracking-widest text-[9px] font-bold block mb-1">First Logged</span>
                      <span className="text-[12px] font-bold text-[#060b26] bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-[6px] inline-block">
                        {formatDetailedTime(session.createdAt)}
                      </span>
                    </div>
                    <div className="sm:text-right">
                      <span className="text-[#060b26]/40 uppercase tracking-widest text-[9px] font-bold block mb-1">Target Review Date</span>
                      <span className={`text-[12px] font-bold px-2.5 py-1 rounded-[6px] border inline-block ${
                        isDue ? 'text-rose-600 bg-rose-50 border-rose-100' : 'text-[#a072ff] bg-[#a072ff]/5 border-[#a072ff]/20'
                      }`}>
                        {formatDetailedTime(session.nextReviewDate)} <span className="opacity-70 font-medium">({formattedDate})</span>
                      </span>
                    </div>
                  </div>

                  {/* Nodes & Dashes */}
                  <div className="flex items-center w-full mt-2">
                    {SPACING_INTERVALS.map((days, index) => {
                      const isCompleted = index < session.currentStep;
                      const isCurrent = index === session.currentStep;
                      
                      return (
                        <React.Fragment key={index}>
                          {/* Node */}
                          <div className="flex flex-col items-center relative z-10">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold border-2 transition-all ${
                              isCompleted 
                                ? 'border-emerald-400 bg-emerald-50 text-emerald-500' 
                              : isCurrent 
                                ? (isDue ? 'border-rose-400 bg-rose-50 text-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.3)] ring-[3px] ring-rose-50' : 'border-[#a072ff] bg-[#a072ff]/5 text-[#a072ff] shadow-[0_0_8px_rgba(160,114,255,0.3)] ring-[3px] ring-[#a072ff]/10') 
                              : 'border-gray-200 bg-white text-gray-300'
                            }`}>
                              {isCompleted ? <CheckCircle2 size={12} strokeWidth={3.5} /> : index + 1}
                            </div>
                            {/* Review Interval below */}
                            <span className={`text-[9.5px] font-bold mt-1.5 uppercase tracking-wide ${
                              isCompleted ? 'text-emerald-500' :
                              isCurrent ? (isDue ? 'text-rose-500' : 'text-[#a072ff]') :
                              'text-gray-400'
                            }`}>
                              {days}d
                            </span>
                          </div>
                          
                          {/* Dashed connector line */}
                          {index < SPACING_INTERVALS.length - 1 && (
                            <div className="flex-1 h-[2px] mx-1 md:mx-2 -mt-4 flex items-center overflow-hidden">
                              <div className={`w-full h-full border-t-[1.5px] ${
                                isCompleted ? 'border-emerald-400 border-solid' : 'border-gray-200 border-dashed'
                              }`}></div>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="shrink-0 flex sm:flex-col items-end gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                {isDue && (
                  <button 
                    onClick={() => handleReviewComplete(session)}
                    disabled={updatingId === session.id}
                    className="w-full sm:w-auto px-4 py-2 bg-[#060b26] hover:bg-[#11183c] text-white text-[12px] font-bold rounded-[8px] flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updatingId === session.id ? (
                      <>Updating... <Loader2 size={14} className="animate-spin" /></>
                    ) : (
                      <>Review Now <CheckCircle2 size={14} /></>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        }))}
      </div>
    </div>
  );
}
