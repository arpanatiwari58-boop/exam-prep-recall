"use client";

import { useState } from "react";

const subjects = [
  {
    name: "Data Mining and Data Warehousing",
    slug: "data-mining-and-data-warehousing",
  },
  {
    name: "Principles of Management",
    slug: "principles-of-management",
  },
];


export default function CreateTestPage() {
  const [subjectSlug, setSubjectSlug] = useState(subjects[0].slug);

  const [jsonArray1, setJsonArray1] = useState("");
  const [jsonArray2, setJsonArray2] = useState("");

  const [finalJson, setFinalJson] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

const handleCombine = () => {
  setError(null);
  setSuccess(null);

  try {
    const parsed1 = JSON.parse(jsonArray1);
    const parsed2 = JSON.parse(jsonArray2);

    if (!Array.isArray(parsed1) || !Array.isArray(parsed2)) {
      setError("Both inputs must be JSON arrays.");
      return;
    }

    const combined = [...parsed1, ...parsed2];

    const typeOrder = {
      mcq: 1,
      fill_in_the_blanks: 2,
      short_answer: 3,
    };

    combined.sort((a, b) => {
      return (
        (typeOrder[a.type as keyof typeof typeOrder] || 99) -
        (typeOrder[b.type as keyof typeof typeOrder] || 99)
      );
    });

    setFinalJson(JSON.stringify(combined, null, 2));
    setSuccess("Arrays combined and arranged successfully.");
  } catch {
    setError("Invalid JSON format in one of the arrays.");
  }
};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    if (!finalJson) {
      setError("Please combine arrays first.");
      return;
    }

    let parsedJson;

    try {
      parsedJson = JSON.parse(finalJson);
    } catch {
      setError("Final JSON is invalid.");
      return;
    }

    const selectedSubject = subjects.find(
      (subject) => subject.slug === subjectSlug
    );

    try {
      setLoading(true);

      const response = await fetch("/api/create-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: selectedSubject,
          jsonContent: parsedJson,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create test");
      }

      const result = await response.json();

      setSuccess(
        `Test "${result.test.title}" for subject "${result.subject}" created successfully!`
      );

      setJsonArray1("");
      setJsonArray2("");
      setFinalJson("");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "An error occurred while creating the test.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Combine JSON Arrays & Create Test
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Subject
            </label>

            <select
              value={subjectSlug}
              onChange={(e) => setSubjectSlug(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            >
              {subjects.map((subject) => (
                <option key={subject.slug} value={subject.slug}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          {/* Array 1 */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              JSON Array 1
            </label>

            <textarea
              value={jsonArray1}
              onChange={(e) => setJsonArray1(e.target.value)}
              className="min-h-[220px] w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
              placeholder="Paste first array here..."
            />
          </div>

          {/* Array 2 */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              JSON Array 2
            </label>

            <textarea
              value={jsonArray2}
              onChange={(e) => setJsonArray2(e.target.value)}
              className="min-h-[220px] w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
              placeholder="Paste second array here..."
            />
          </div>

          {/* Combine */}
          <button
            type="button"
            onClick={handleCombine}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Combine Arrays
          </button>

          {/* Final Output */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Final Combined JSON
            </label>

            <textarea
              value={finalJson}
              readOnly
              className="min-h-[260px] w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 font-mono text-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Creating Test..." : "Create Test"}
          </button>
        </form>

        {error && (
          <div className="mt-4 rounded-md border border-red-400 bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 rounded-md border border-green-400 bg-green-100 p-3 text-green-700">
            {success}
          </div>
        )}
      </div>
    </main>
  );
}