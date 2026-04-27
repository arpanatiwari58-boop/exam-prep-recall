import type { TestQuestion } from "@/lib/test-data";

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
}

export function TestQuestions({ questions, answers, setAnswer }: TestQuestionsProps) {
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

          return (
            <div key={index} className="grid py-7 border-b border-slate-200" style={{ gridTemplateColumns: "50px 1fr" }}>
              <div className="text-sm text-slate-400 font-bold">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-indigo-500 font-bold mb-2">
                  {TYPE_LABEL[question.type ?? "unknown"] ?? question.type}
                </p>
                <p className="text-lg leading-relaxed mb-5 text-slate-800">{question.question}</p>
                
                {isChoice && (
                  <div className="grid grid-cols-2 gap-4">
                    {options.map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          checked={answers[index] === option}
                          onChange={() => setAnswer(index, option)}
                          className="w-4 h-4 accent-indigo-600"
                        />
                        <span className={`text-base transition-colors ${answers[index] === option ? "font-bold text-indigo-700" : "text-slate-600 group-hover:text-slate-900"}`}>
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === "fill_in_the_blank" && (
                  <input
                    type="text"
                    value={answers[index] || ""}
                    onChange={(e) => setAnswer(index, e.target.value)}
                    placeholder="Write your answer…"
                    className="w-full border-b border-slate-300 focus:border-indigo-500 outline-none text-base pb-2 bg-transparent transition-colors"
                  />
                )}

                {question.type === "short_answer" && (
                  <textarea
                    value={answers[index] || ""}
                    onChange={(e) => setAnswer(index, e.target.value)}
                    placeholder="Write your answer…"
                    rows={3}
                    className="w-full border-b border-slate-300 focus:border-indigo-500 outline-none resize-none text-base pb-2 bg-transparent transition-colors"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}