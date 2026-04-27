"use client";

import { useMemo, useState, useEffect } from "react";
import type { TestQuestion } from "@/lib/test-data";
import { Lock } from "lucide-react";
import { isAnswerCorrect } from "@/lib/test-utils";
import { TestWarningDialog } from "./TestWarningDialog";
import { TestHeader } from "./TestHeader";
import { TestQuestions } from "./TestQuestions";
import { TestResults } from "./TestResults";

interface TestAttemptClientProps {
  subjectSlug: string;
  subjectName: string;
  testTitle: string;
  questions: TestQuestion[];
  timeLimitInMinutes?: number;
}

export default function TestAttemptClient({
  subjectName,
  testTitle,
  questions,
  subjectSlug,
  timeLimitInMinutes = 60,
}: TestAttemptClientProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimitInMinutes * 60);
  const [showWarning, setShowWarning] = useState(false);

  const STORAGE_KEY = `test-progress-${subjectSlug}-${testTitle.replace(/\s+/g, '_')}`;

  // Load saved progress on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { answers: savedAnswers, timeLeft: savedTime, hasStarted: savedStarted } = JSON.parse(saved);
        if (savedStarted) {
          setAnswers(savedAnswers || {});
          if (savedTime !== undefined) setTimeLeft(savedTime);
          setHasStarted(savedStarted);
        }
      } catch (e) {
        console.error("Failed to parse test progress", e);
      }
    }
  }, [STORAGE_KEY]);

  // Save progress on changes
  useEffect(() => {
    if (hasStarted && !submitted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, timeLeft, hasStarted }));
    } else if (submitted) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [answers, timeLeft, hasStarted, submitted, STORAGE_KEY]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasStarted && !submitted) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasStarted, submitted]);

  useEffect(() => {
    if (!hasStarted || isPaused || submitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [hasStarted, isPaused, submitted, timeLeft]);

  const answeredCount = Object.keys(answers).filter(
    (k) => (answers[Number(k)] || "").trim() !== ""
  ).length;

  const score = useMemo(() => {
    return questions.reduce((acc, question, index) => {
      return isAnswerCorrect(question, answers[index] || "") ? acc + 1 : acc;
    }, 0);
  }, [answers, questions]);

  const total = questions.length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = percentage >= 50;

  const setAnswer = (index: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  return (
    <div
      className="h-screen bg-slate-50 text-slate-900 overflow-y-auto"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      {/* ───────────────── HEADER ───────────────── */}

      <TestWarningDialog showWarning={showWarning} setShowWarning={setShowWarning} subjectSlug={subjectSlug} />

      <TestHeader
        subjectSlug={subjectSlug}
        testTitle={testTitle}
        hasStarted={hasStarted}
        setHasStarted={setHasStarted}
        submitted={submitted}
        setSubmitted={setSubmitted}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        timeLeft={timeLeft}
        answeredCount={answeredCount}
        total={total}
        passed={passed}
        score={score}
        percentage={percentage}
        setShowWarning={setShowWarning}
        onRetest={() => {
          localStorage.removeItem(STORAGE_KEY);
          setAnswers({});
          setSubmitted(false);
          setHasStarted(false);
          setIsPaused(false);
          setTimeLeft(timeLimitInMinutes * 60);
        }}
      />

      {/* ───────────────── BODY ───────────────── */}
      <main className="mx-auto px-20 pb-20 relative">
        {/* LOCK OVERLAY IF NOT STARTED OR PAUSED */}
        {(!hasStarted || isPaused) && !submitted && (
          <div className="absolute inset-0 z-40 bg-slate-white/90 flex flex-col items-center justify-center pt-40">
            <div className="bg-white p-10 rounded-2xl shadow-xl border border-slate-200 text-center">
              <Lock size={48} className="mx-auto text-indigo-200 mb-4" />
              <p className="text-slate-500 font-medium">
                {isPaused ? "Test is currently paused." : "Please click 'Start Test' in the header."}
              </p>
            </div>
          </div>
        )}

        {!submitted ? (
          <TestQuestions questions={questions} answers={answers} setAnswer={setAnswer} />
        ) : (
          <TestResults questions={questions} answers={answers} percentage={percentage} score={score} total={total} />
        )}
      </main>
    </div>
  );
}