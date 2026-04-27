import type { TestQuestion } from "@/lib/test-data";

export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function isAnswerCorrect(question: TestQuestion, userAnswer: string): boolean {
  const expected = normalizeText(question.answer || "");
  const actual = normalizeText(userAnswer || "");
  if (!expected || !actual) return false;
  if (question.type === "short_answer") {
    return actual === expected || actual.includes(expected) || expected.includes(actual);
  }
  return actual === expected;
}