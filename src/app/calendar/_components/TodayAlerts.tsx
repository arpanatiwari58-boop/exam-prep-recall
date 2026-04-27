"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, Clock, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { getReviewStatus, formatNextReviewDate, StudySession } from "@/lib/spaced-repetition";
import Link from "next/link";
import { db } from "@/firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export function TodayAlerts() {
  const [dueSessions, setDueSessions] = useState<StudySession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // We get all sessions to filter the ones due. 
    // Usually you'd query where nextReviewDate <= Date.now(), but let's do it client-side for absolute sync with getReviewStatus
    const q = query(collection(db, "studySessions"), where("userId", "==", "user123"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedSessions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as StudySession[];
      
      const due = fetchedSessions.filter(
        (s) => getReviewStatus(s.nextReviewDate) === "due"
      ).sort((a, b) => a.nextReviewDate - b.nextReviewDate);

      setDueSessions(due);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-[#060b26] flex items-center gap-2">
          <AlertCircle className="text-rose-500" />
          Today's Reviews
        </h2>
        <span className="text-xs font-bold bg-rose-50 text-rose-600 px-3 py-1 rounded-full uppercase tracking-wider">
          Action Needed
        </span>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12 text-[#a072ff]">
          <Loader2 size={32} className="animate-spin" />
        </div>
      ) : dueSessions.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="text-emerald-500 w-8 h-8" />
          </div>
          <h3 className="text-[#060b26] font-bold text-lg">You're all caught up!</h3>
          <p className="text-[#060b26]/50 text-sm mt-1">No spaced repetition reviews due today.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {dueSessions.map((session) => {
            const formattedDate = formatNextReviewDate(session.nextReviewDate);

            return (
              <div
                key={session.id}
                className="flex items-start sm:items-center gap-4 p-4 border border-rose-100 bg-rose-50/30 rounded-xl hover:border-rose-200 transition-all group"
              >
                <div className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center border-2 bg-rose-50 border-rose-100 text-rose-500">
                  <Clock size={20} strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-bold text-[#060b26] truncate">
                    {session.topicTitle}
                  </h3>
                  <Link href={`/calendar/${session.subjectId}`} className="text-[13px] text-[#060b26]/50 hover:text-[#a072ff] font-medium truncate flex items-center gap-2 transition-colors w-max">
                    <BookOpen size={14} /> {session.subjectName}
                  </Link>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-2">
                  <span className="text-[12px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-600">
                    {formattedDate}
                  </span>
                  <button className="text-[12px] font-bold text-[#060b26] hover:text-[#a072ff] flex items-center gap-1 transition-colors">
                    Review Now <CheckCircle2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
