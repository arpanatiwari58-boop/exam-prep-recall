"use client";

import { useMemo, useState } from "react";
import type { TestQuestion } from "@/lib/test-data";
import { AlertCircle } from "lucide-react";

interface TestAttemptClientProps {
  subjectName: string;
  testTitle: string;
  questions: TestQuestion[];
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isAnswerCorrect(question: TestQuestion, userAnswer: string): boolean {
  const expected = normalizeText(question.answer || "");
  const actual = normalizeText(userAnswer || "");
  if (!expected || !actual) return false;

  if (question.type === "short_answer") {
    return (
      actual === expected ||
      actual.includes(expected) ||
      expected.includes(actual)
    );
  }

  return actual === expected;
}

const TYPE_LABEL: Record<string, string> = {
  mcq: "Multiple choice",
  true_false: "True / False",
  fill_in_the_blanks: "Fill in the blank",
  short_answer: "Short answer",
};

export default function TestAttemptClient({
  subjectName,
  testTitle,
  questions,
}: TestAttemptClientProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).filter(
    (k) => (answers[Number(k)] || "").trim() !== ""
  ).length;

  const score = useMemo(() => {
    return questions.reduce((acc, question, index) => {
      return isAnswerCorrect(question, answers[index] || "")
        ? acc + 1
        : acc;
    }, 0);
  }, [answers, questions]);

  const total = questions.length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = percentage >= 50;

  const setAnswer = (index: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  // ───────────────────────── EMPTY STATE ─────────────────────────
  if (questions.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center px-6">
        <AlertCircle size={40} className="text-gray-300" />
        <p className="text-lg text-gray-500 font-medium">
          No questions available in this test.
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white text-[#1a1a1a]"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      {/* ───────────────── HEADER ───────────────── */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-black/10 px-6 py-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
              {subjectName}
            </p>
            <h1 className="text-xl font-semibold">{testTitle}</h1>
          </div>

          {!submitted ? (
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase">Answered</p>
                <p className="text-base font-semibold">
                  {answeredCount}
                  <span className="text-gray-400"> / {total}</span>
                </p>
              </div>

              <button
                onClick={() => setSubmitted(true)}
                className="px-6 py-2.5 bg-black text-white text-sm font-semibold rounded hover:bg-gray-900"
              >
                Submit
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  passed
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {passed ? "Passed" : "Failed"}
              </span>

              <span className="text-base font-semibold">
                {score}/{total} ({percentage}%)
              </span>
            </div>
          )}
        </div>
      </header>

      {/* ───────────────── BODY ───────────────── */}
      <main className="max-w-3xl mx-auto px-6 pb-20">
        {!submitted ? (
          <>
            {/* Intro */}
            <div className="py-10 border-b border-black">
              <div className="text-sm text-gray-500 flex gap-4">
                <span>{total} questions</span>
                <span>•</span>
                <span>Attempt all</span>
              </div>
            </div>

            {/* Questions */}
            <div>
              {questions.map((question, index) => {
                const options =
                  question.type === "true_false"
                    ? ["True", "False"]
                    : question.options || [];

                const isChoice =
                  question.type === "mcq" ||
                  question.type === "true_false";

                const isText =
                  question.type === "fill_in_the_blanks" ||
                  question.type === "short_answer";

                return (
                  <div
                    key={index}
                    className="grid py-7 border-b border-black/10"
                    style={{ gridTemplateColumns: "50px 1fr" }}
                  >
                    {/* Number */}
                    <div className="text-sm text-gray-400">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Content */}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">
                        {TYPE_LABEL[question.type] ?? question.type}
                      </p>

                      <p className="text-lg leading-relaxed mb-5">
                        {question.question}
                      </p>

                      {/* MCQ */}
                      {isChoice && (
                        <div className="flex flex-col gap-2">
                          {options.map((option) => {
                            const selected =
                              answers[index] === option;

                            return (
                              <label
                                key={option}
                                className="flex items-center gap-3 cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  checked={selected}
                                  onChange={() =>
                                    setAnswer(index, option)
                                  }
                                  className="w-4 h-4"
                                />
                                <span
                                  className={`text-base ${
                                    selected
                                      ? "font-medium text-black"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {option}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      )}

                      {/* Text Answer */}
                      {isText && (
                        <textarea
                          value={answers[index] || ""}
                          onChange={(e) =>
                            setAnswer(index, e.target.value)
                          }
                          placeholder="Write your answer…"
                          rows={
                            question.type === "short_answer"
                              ? 3
                              : 1
                          }
                          className="w-full border-b border-black/20 focus:border-black outline-none resize-none text-base pb-2"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submit */}
            <div className="pt-10 flex justify-end">
              <button
                onClick={() => setSubmitted(true)}
                className="px-7 py-3 bg-black text-white text-sm font-semibold rounded hover:bg-gray-900"
              >
                Submit final answers
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Result */}
            <div className="py-12 border-b border-black">
              <p className="text-5xl font-semibold">
                {percentage}
                <span className="text-xl text-gray-400">%</span>
              </p>
              <p className="text-base text-gray-500 mt-3">
                {score} correct out of {total} questions
              </p>
            </div>

            {/* Review */}
            <div className="pt-8">
              <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">
                Detailed Review
              </p>

              {questions.map((question, index) => {
                const userAnswer = answers[index] || "";
                const correct = isAnswerCorrect(
                  question,
                  userAnswer
                );

                return (
                  <div
                    key={index}
                    className="grid py-6 border-b border-black/10"
                    style={{
                      gridTemplateColumns: "50px 1fr 80px",
                    }}
                  >
                    <div className="text-sm text-gray-400">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div>
                      <p className="text-base mb-3">
                        {question.question}
                      </p>

                      <p className="text-sm">
                        <span className="text-gray-400">
                          Your answer:{" "}
                        </span>
                        <span
                          className={
                            correct
                              ? "text-green-600"
                              : "text-red-500"
                          }
                        >
                          {userAnswer || "—"}
                        </span>
                      </p>

                      {!correct && (
                        <p className="text-sm">
                          <span className="text-gray-400">
                            Correct:{" "}
                          </span>
                          <span className="text-green-600">
                            {question.answer}
                          </span>
                        </p>
                      )}

                      {question.explanation && (
                        <p className="text-sm text-gray-500 mt-2 border-l-2 pl-3">
                          {question.explanation}
                        </p>
                      )}
                    </div>

                    <div
                      className={`text-sm font-semibold ${
                        correct
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {correct ? "Correct" : "Wrong"}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}