import { ArrowLeft, Clock, PlayCircle, PauseCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

interface TestHeaderProps {
  subjectSlug: string;
  testTitle: string;
  hasStarted: boolean;
  setHasStarted: (val: boolean) => void;
  submitted: boolean;
  setSubmitted: (val: boolean) => void;
  isPaused: boolean;
  setIsPaused: (val: boolean) => void;
  timeLeft: number;
  answeredCount: number;
  total: number;
  passed: boolean;
  score: number;
  percentage: number;
  setShowWarning: (val: boolean) => void;
  onRetest: () => void;
}

export function TestHeader({
  subjectSlug,
  testTitle,
  hasStarted,
  setHasStarted,
  submitted,
  setSubmitted,
  isPaused,
  setIsPaused,
  timeLeft,
  answeredCount,
  total,
  passed,
  score,
  percentage,
  setShowWarning,
  onRetest,
}: TestHeaderProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="px-6 pt-4">
        <Link
          href={`/subjects/${subjectSlug}`}
          onClick={(e) => {
            if (hasStarted && !submitted) {
              e.preventDefault();
              setShowWarning(true);
            }
          }}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-semibold text-[14px] transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-colors">
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          </div>
          Back
        </Link>
      </div>

      <div className="px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-base md:text-lg font-bold text-slate-800">{testTitle}</h1>
        </div>

        <div className="flex items-center gap-6">
          {!hasStarted ? (
            <button
              onClick={() => setHasStarted(true)}
              className="px-6 py-2 bg-indigo-600 text-white text-sm font-bold rounded-full hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg shadow-indigo-100"
            >
              <PlayCircle size={18} />
              Start Test
            </button>
          ) : !submitted ? (
            <>
              <div className={`flex items-center gap-2 font-mono text-lg font-bold ${timeLeft < 60 ? "text-rose-600 animate-pulse" : "text-slate-600"}`}>
                <Clock size={20} />
                {formatTime(timeLeft)}
              </div>

              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition"
              >
                {isPaused ? <PlayCircle size={22} /> : <PauseCircle size={22} />}
              </button>

              <div className="text-right border-l pl-6 border-slate-200 hidden md:block">
                <p className="text-xs text-slate-400 uppercase font-bold">Answered</p>
                <p className="text-sm font-bold text-slate-700">
                  {answeredCount} / {total}
                </p>
              </div>

              <button
                onClick={() => setSubmitted(true)}
                className="px-5 py-2 bg-slate-900 text-white text-sm font-bold rounded hover:bg-slate-800 transition"
              >
                Submit
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className={`text-xs px-3 py-1 rounded-full font-bold ${passed ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                {passed ? "Passed" : "Failed"}
              </span>
              <span className="text-sm font-bold text-slate-700">
                {score}/{total} ({percentage}%)
              </span>
              <button
                onClick={onRetest}
                className="ml-2 px-4 py-2 bg-indigo-50 text-indigo-600 text-sm font-bold rounded-full hover:bg-indigo-100 transition flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Retest
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}