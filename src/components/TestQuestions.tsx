import type { TestQuestion } from "@/lib/test-data";
import { isAnswerCorrect } from "@/lib/test-utils";
import { CheckCircle2, Check, X, AlertCircle } from "lucide-react";

const TYPE_LABEL: Record<string, string> = {
  mcq: "Multiple choice",
  true_false: "True / False",
  fill_in_the_blanks: "Fill in the blank",
  short_answer: "Short answer",
};

interface TestQuestionsProps {
  questions: TestQuestion[];
  answers: Record<number, string>;
  setAnswer: (index: number, value: string) => void;
  checkedAnswers: Record<number, boolean>;
  onCheckAnswer: (index: number) => void;
}

export function TestQuestions({ questions, answers, setAnswer, checkedAnswers, onCheckAnswer }: TestQuestionsProps) {
  const total = questions.length;

  return (
    <>
      <div className="py-10 border-b border-slate-300">
        <div className="text-sm text-slate-500 font-medium flex gap-4">
          <span>{total} questions</span>
          <span>•</span>
          <span>Attempt all</span>
        </div>
      </div>

      <div>
        {questions.map((question, index) => {
          const options = question.type === "true_false" ? ["True", "False"] : question.options || [];
          const isChoice = question.type === "mcq" || question.type === "true_false";

          const hasAnswer = (answers[index] || "").trim() !== "";
          const isChecked = checkedAnswers[index];
          const isCorrect = isChecked ? isAnswerCorrect(question, answers[index] || "") : false;

          return (
            <div key={index} className="grid py-7 border-b border-slate-200" style={{ gridTemplateColumns: "50px 1fr 100px" }}>
              <div className="text-sm text-slate-400 font-bold">{String(index + 1).padStart(2, "0")}</div>
              
              <div className="pr-8 border-r border-slate-100">
                <p className="text-[10px] uppercase tracking-widest text-indigo-500 font-bold mb-2">
                  {TYPE_LABEL[question.type ?? "unknown"] ?? question.type}
                </p>
                <p className="text-lg leading-relaxed mb-5 text-slate-800">{question.question}</p>
                
                {isChoice && (
                  <div className="grid grid-cols-2 gap-4">
                    {options.map((option) => (
                      <label key={option} className={`flex items-center gap-3 group ${isChecked ? "cursor-default" : "cursor-pointer"}`}>
                        <input
                          type="radio"
                          disabled={isChecked}
                          checked={answers[index] === option}
                          onChange={() => setAnswer(index, option)}
                          className="w-4 h-4 accent-indigo-600 disabled:opacity-50"
                        />
                        <span className={`text-base transition-colors ${answers[index] === option ? "font-bold text-indigo-700" : "text-slate-600 group-hover:text-slate-900"} ${isChecked ? "opacity-70" : ""}`}>
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === "fill_in_the_blank" && (
                  <input
                    type="text"
                    disabled={isChecked}
                    value={answers[index] || ""}
                    onChange={(e) => setAnswer(index, e.target.value)}
                    placeholder="Write your answer…"
                    className="w-full border-b border-slate-300 focus:border-indigo-500 outline-none text-base pb-2 bg-transparent transition-colors disabled:opacity-50 text-slate-900"
                  />
                )}

                {question.type === "short_answer" && (
                  <textarea
                    disabled={isChecked}
                    value={answers[index] || ""}
                    onChange={(e) => setAnswer(index, e.target.value)}
                    placeholder="Write your answer…"
                    rows={3}
                    className="w-full border-b border-slate-300 focus:border-indigo-500 outline-none resize-none text-base pb-2 bg-transparent transition-colors disabled:opacity-50 text-slate-900"
                  />
                )}

                {isChecked && (
                  <div className={`mt-5 p-4 rounded-lg flex gap-3 items-start ${isCorrect ? "bg-emerald-50 border border-emerald-100" : "bg-rose-50 border border-rose-100"}`}>
                    {isCorrect ? (
                      <Check className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                    ) : (
                      <AlertCircle className="text-rose-600 shrink-0 mt-0.5" size={20} />
                    )}
                    <div>
                      <p className={`font-bold text-sm ${isCorrect ? "text-emerald-800" : "text-rose-800"}`}>
                        {isCorrect ? "Correct!" : "Incorrect"}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm mt-1 text-rose-700">
                          <span className="font-semibold">Correct Answer:</span> {question.answer}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="pl-6 flex items-start justify-end mt-7">
                {!isChecked ? (
                  <button
                    disabled={!hasAnswer}
                    onClick={() => onCheckAnswer(index)}
                    className="flex flex-col items-center justify-center gap-2 p-3 w-full rounded-xl bg-slate-50 text-slate-400 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all disabled:opacity-50 disabled:pointer-events-none group"
                  >
                    <CheckCircle2 size={24} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] uppercase font-bold tracking-wider">Check</span>
                  </button>
                ) : (
                  <div className={`flex flex-col items-center justify-center gap-2 p-3 w-full rounded-xl border ${isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                    {isCorrect ? (
                      <Check className="text-emerald-500" size={24} />
                    ) : (
                      <X className="text-rose-500" size={24} />
                    )}
                    <span className={`text-[10px] uppercase font-bold tracking-wider ${isCorrect ? "text-emerald-600" : "text-rose-600"}`}>
                      {isCorrect ? "Right" : "Wrong"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}