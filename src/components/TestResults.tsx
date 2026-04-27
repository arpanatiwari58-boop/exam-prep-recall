import type { TestQuestion } from "@/lib/test-data";
import { isAnswerCorrect } from "@/lib/test-utils";

interface TestResultsProps {
  questions: TestQuestion[];
  answers: Record<number, string>;
  percentage: number;
  score: number;
  total: number;
}

export function TestResults({ questions, answers, percentage, score, total }: TestResultsProps) {
  return (
    <div className="pt-8">
      <div className="py-12 border-b border-slate-800">
        <p className="text-5xl font-bold text-slate-900">
          {percentage}
          <span className="text-xl text-slate-400">%</span>
        </p>
        <p className="text-base text-slate-500 mt-3 font-medium">
          {score} correct out of {total} questions
        </p>
      </div>
      {/* Review content exactly as original UI */}
      {questions.map((question, index) => {
        const userAnswer = answers[index] || "";
        const correct = isAnswerCorrect(question, userAnswer);
        return (
          <div key={index} className="grid py-6 border-b border-slate-200" style={{ gridTemplateColumns: "50px 1fr 80px" }}>
            <div className="text-sm text-slate-400">{String(index + 1).padStart(2, "0")}</div>
            <div>
              <p className="text-base mb-3 font-medium text-slate-800">{question.question}</p>
              <p className="text-sm">
                <span className="text-slate-400 font-medium">Your answer: </span>
                <span className={correct ? "text-emerald-600 font-bold" : "text-rose-500 font-bold"}>{userAnswer || "—"}</span>
              </p>
              {!correct && (
                <p className="text-sm">
                  <span className="text-slate-400 font-medium">Correct: </span>
                  <span className="text-emerald-600 font-bold">{question.answer}</span>
                </p>
              )}
            </div>
            <div className={`text-sm font-bold ${correct ? "text-emerald-600" : "text-rose-500"}`}>
              {correct ? "Correct" : "Wrong"}
            </div>
          </div>
        );
      })}
    </div>
  );
}