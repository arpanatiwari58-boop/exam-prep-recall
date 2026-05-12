"use client";

import React, { useEffect, useState } from "react";
import { Clock, Loader2 } from "lucide-react";
import { formatNextReviewDate, StudySession, getReviewStatus } from "@/lib/spaced-repetition";
import { db } from "@/firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export function UpcomingAlerts() {
  const [upcomingSessions, setUpcomingSessions] = useState<StudySession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Assuming 'user123' for now
    const q = query(collection(db, "studySessions"), where("userId", "==", "user123"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedSessions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as StudySession[];
      
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      const upcoming = fetchedSessions.filter(s => {
        // Exclude units that are already 'due' (today or prior)
        if (getReviewStatus(s.nextReviewDate) === "due") return false;

        const next = new Date(s.nextReviewDate);
        next.setHours(0, 0, 0, 0);
        
        const diffMs = next.getTime() - now.getTime();
        const diffDays = Math.round(diffMs / (24 * 60 * 60 * 1000));
        
        // Show units that are coming up within the next 4 days
        return diffDays > 0 && diffDays <= 4;
      }).sort((a, b) => a.nextReviewDate - b.nextReviewDate);

      setUpcomingSessions(upcoming);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-sm font-bold text-[#060b26]/50 uppercase tracking-widest mb-6 border-b border-gray-100 pb-4 flex items-center gap-2">
        <Clock size={16} />
        Coming Up (Next 4 Days)
      </h3>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-8 text-[#a072ff]">
          <Loader2 size={24} className="animate-spin" />
        </div>
      ) : upcomingSessions.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-[#060b26]/50 text-[13px] font-medium">No reviews scheduled in the next 4 days.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {upcomingSessions.map((session) => (
            <div key={session.id} className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ffb433] mt-1.5 shrink-0 shadow-[0_0_8px_rgba(255,180,51,0.8)]"></div>
              <div className="flex-1">
                <p className="text-[13px] text-[#060b26] font-bold leading-tight line-clamp-1">
                  {session.subjectName}
                </p>
                <p className="text-[12px] text-[#060b26]/70 leading-relaxed mb-1.5 line-clamp-1">
                  {session.topicTitle}
                </p>
                <span className="text-[11px] font-bold text-[#ffb433] bg-[#ffb433]/10 px-2 py-0.5 rounded uppercase tracking-wider">
                  {formatNextReviewDate(session.nextReviewDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}