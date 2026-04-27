"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, ChevronRight, Loader2 } from "lucide-react";
import { TRACKED_SUBJECTS } from "@/lib/spaced-repetition";
import { db } from "@/firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export function SubjectList() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Assuming 'user123' for now
    const q = query(collection(db, "studySessions"), where("userId", "==", "user123"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newCounts = TRACKED_SUBJECTS.reduce((acc, curr) => ({ ...acc, [curr.id]: 0 }), {} as Record<string, number>);

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (newCounts[data.subjectId] !== undefined) {
          newCounts[data.subjectId]++;
        }
      });
      
      setCounts(newCounts);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-[#060b26] flex items-center gap-2">
          <BookOpen className="text-[#060b26]/50" />
          Tracked Subjects
        </h2>
        <span className="text-xs font-bold bg-[#060b26]/5 text-[#060b26]/60 px-3 py-1 rounded-full uppercase tracking-wider">
          Timelines
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TRACKED_SUBJECTS.map((subject) => {
          const subjectUnits = counts[subject.id] || 0;

          return (
            <Link
              key={subject.id}
              href={`/calendar/${subject.id}`}
              className="flex flex-col gap-4 p-5 border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-md transition-all group bg-gray-50/30"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${subject.bg} ${subject.color}`}
                >
                  <BookOpen size={18} strokeWidth={2.5} />
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-100 group-hover:border-[#a072ff]/30 text-gray-400 group-hover:text-[#a072ff] group-hover:translate-x-1 transition-all">
                  <ChevronRight size={16} strokeWidth={2.5} />
                </div>
              </div>

              <div>
                <h3 className="text-[15px] font-bold text-[#060b26] leading-tight mb-2">
                  {subject.name}
                </h3>
                <span className="text-[12px] font-bold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 uppercase tracking-widest">
                  {subjectUnits} Units Tracked
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
