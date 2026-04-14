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
  const [jsonContent, setJsonContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    let parsedJson;
    try {
      parsedJson = JSON.parse(jsonContent);
    } catch {
      setError("Invalid JSON format. Please check your input.");
      return;
    }

    const selectedSubject = subjects.find(s => s.slug === subjectSlug);

    try {
      const response = await fetch("/api/create-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject: selectedSubject, jsonContent: parsedJson }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create test");
      }

      const result = await response.json();
      setSuccess(`Test "${result.test.title}" for subject "${result.subject}" created successfully!`);
      setJsonContent("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An error occurred while creating the test.";
      setError(message);
    }
  };

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Create a New Test</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select
              id="subject"
              value={subjectSlug}
              onChange={(e) => setSubjectSlug(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              {subjects.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="jsonContent" className="block text-sm font-medium text-gray-700 mb-1">
              MCQ JSON Content
            </label>
            <textarea
              id="jsonContent"
              value={jsonContent}
              onChange={(e) => setJsonContent(e.target.value)}
              placeholder="Paste your JSON here..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 min-h-[200px] font-mono text-sm"
              required
            />
            <p className="mt-2 text-sm text-gray-500">Paste the array of question objects from your AI tool.</p>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Test
            </button>
          </div>
        </form>
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
            <p>{success}</p>
          </div>
        )}
      </div>
    </main>
  );
}
