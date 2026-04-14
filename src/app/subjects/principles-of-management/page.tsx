import Link from "next/link";
import { getSubjectWithTestSummaries } from "@/lib/test-data";

const subjectSlug = "principles-of-management";

export default async function ManagementPage() {
  const subjectData = await getSubjectWithTestSummaries(subjectSlug);

  const subjectName = "Principles of Management";
  const tests = subjectData?.tests || [];

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          {subjectName}
        </h1>
        <p className="text-center text-lg text-gray-600 mb-12">Select a test to begin.</p>

        {tests.length > 0 ? (
          <div className="space-y-4">
            {tests.map((test) => (
              <Link href={`/test/${subjectSlug}/${test.id}`} key={test.id}>
                <div className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200 hover:border-indigo-500">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold text-gray-900">{test.title}</h2>
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {test.totalQuestions} questions
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{test.filePath}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {Object.entries(test.typeCounts).map(([type, count]) => (
                      <span
                        key={`${test.id}-${type}`}
                        className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-700"
                      >
                        {type}: {count}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-16 px-8 bg-white rounded-lg shadow-md border">
            <h3 className="text-2xl font-semibold mb-4">No Tests Yet</h3>
            <p className="mb-6">There are no tests available for this subject right now.</p>
            <Link href="/create-test">
              <button className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Create One Now
              </button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
