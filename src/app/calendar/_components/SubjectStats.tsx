"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Loader2 } from "lucide-react";

export function SubjectStats({ subjectId, color }: { subjectId: string; color: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // We filter by user123 and subjectId
    const q = query(
      collection(db, "studySessions"), 
      where("userId", "==", "user123"), 
      where("subjectId", "==", subjectId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCount(snapshot.size);
    });

    return () => unsubscribe();
  }, [subjectId]);

  return (
    <div className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm shrink-0 min-w-[160px] justify-center">
      <div className="text-center px-4">
        {count === null ? (
          <div className="h-9 flex items-center justify-center text-white/50">
            <Loader2 size={24} className="animate-spin" />
          </div>
        ) : (
          <p className={`text-3xl font-black ${color}`}>
            {count}
          </p>
        )}
        <p className="text-xs uppercase tracking-widest text-white/50 font-bold mt-1">
          Units Tracked
        </p>
      </div>
    </div>
  );
}