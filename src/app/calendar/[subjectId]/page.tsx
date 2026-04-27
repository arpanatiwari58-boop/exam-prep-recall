import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import { TRACKED_SUBJECTS } from "@/lib/spaced-repetition";
import { ReviewQueue } from "../_components/ReviewQueue";
import { SubjectStats } from "../_components/SubjectStats";

interface PageProps {
  params: Promise<{ subjectId: string }>;
}

export default async function SubjectCalendarPage({ params }: PageProps) {
  const { subjectId } = await params;
  const subject = TRACKED_SUBJECTS.find((s) => s.id === subjectId);

  if (!subject) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f4f5f9] font-sans pb-20">
      {/* Subject Detailed Header */}
      <div className="bg-[#060b26] text-white py-16 px-6 relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-96 h-96 blur-[100px] rounded-full pointer-events-none ${subject.bg}`}></div>
        <div className={`absolute bottom-0 left-0 w-96 h-96 blur-[100px] rounded-full pointer-events-none ${subject.bg}`}></div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <Link
              href="/calendar"
              className="flex items-center gap-2 text-white/50 hover:text-white mb-6 text-sm font-bold uppercase tracking-widest transition-colors w-max"
            >
              <ArrowLeft size={16} /> Back to Overview
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <BookOpen className={`${subject.color} w-8 h-8`} />
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {subject.name}
              </h1>
            </div>
            <p className="text-[#f4f5f9]/70 text-lg max-w-2xl font-medium">
              Detailed tracking & algorithm timeline for {subjectId.toUpperCase()}.
            </p>
          </div>

          <SubjectStats subjectId={subjectId} color={subject.color} />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-220px)] lg:min-h-[600px]">
          
          {/* Detailed Timeline Area - Deadlines */}
          <div className="h-full">
            <ReviewQueue subjectIdFilter={subjectId} dueOnly={true} />
          </div>

          {/* All Chapters */}
          <div className="h-full">
            <ReviewQueue subjectIdFilter={subjectId} />
          </div>

        </div>
      </div>
    </div>
  );
}
