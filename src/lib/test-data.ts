import fs from "fs/promises";
import path from "path";

export interface ManifestTest {
  id: number;
  title: string;
  path: string;
}

interface ManifestSubject {
  name: string;
  tests: ManifestTest[];
}

interface TestManifest {
  subjects: Record<string, ManifestSubject>;
}

export interface TestSummary {
  id: number;
  title: string;
  filePath: string;
  totalQuestions: number;
  typeCounts: Record<string, number>;
}

export interface SubjectWithSummaries {
  name: string;
  slug: string;
  tests: TestSummary[];
}

export interface TestQuestion {
  type?: string;
  question?: string;
  options?: string[];
  answer?: string;
  explanation?: string;
}

export interface TestAttemptData {
  subjectName: string;
  subjectSlug: string;
  testId: number;
  testTitle: string;
  questions: TestQuestion[];
}

function toQuestionsArray(raw: unknown): TestQuestion[] {
  if (Array.isArray(raw)) {
    return raw as TestQuestion[];
  }

  if (
    raw &&
    typeof raw === "object" &&
    "questions" in raw &&
    Array.isArray((raw as { questions: unknown[] }).questions)
  ) {
    return (raw as { questions: TestQuestion[] }).questions;
  }

  return [];
}

function normalizeStoredPath(storedPath: string): string {
  return storedPath.replace(/\\/g, "/");
}

export async function getSubjectWithTestSummaries(
  subjectSlug: string
): Promise<SubjectWithSummaries | null> {
  const manifestPath = path.join(process.cwd(), "data", "test-manifest.json");

  let manifest: TestManifest;
  try {
    const manifestRaw = await fs.readFile(manifestPath, "utf-8");
    manifest = JSON.parse(manifestRaw) as TestManifest;
  } catch {
    return null;
  }

  const manifestSubject = manifest.subjects?.[subjectSlug];
  if (!manifestSubject) {
    return null;
  }

  const summaries = await Promise.all(
    (manifestSubject.tests || []).map(async (test): Promise<TestSummary> => {
      const relativePath = normalizeStoredPath(test.path);
      const absolutePath = path.join(process.cwd(), "data", "tests", relativePath);

      try {
        const raw = await fs.readFile(absolutePath, "utf-8");
        const parsed = JSON.parse(raw) as unknown;
        const questions = toQuestionsArray(parsed);

        const typeCounts = questions.reduce<Record<string, number>>((acc, question) => {
          const type = (question?.type || "unknown").toLowerCase();
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {});

        return {
          id: test.id,
          title: test.title,
          filePath: relativePath,
          totalQuestions: questions.length,
          typeCounts,
        };
      } catch {
        return {
          id: test.id,
          title: test.title,
          filePath: relativePath,
          totalQuestions: 0,
          typeCounts: { invalid: 1 },
        };
      }
    })
  );

  return {
    name: manifestSubject.name,
    slug: subjectSlug,
    tests: summaries.sort((a, b) => b.id - a.id),
  };
}

export async function getTestAttemptData(
  subjectSlug: string,
  testId: number
): Promise<TestAttemptData | null> {
  const manifestPath = path.join(process.cwd(), "data", "test-manifest.json");

  let manifest: TestManifest;
  try {
    const manifestRaw = await fs.readFile(manifestPath, "utf-8");
    manifest = JSON.parse(manifestRaw) as TestManifest;
  } catch {
    return null;
  }

  const subject = manifest.subjects?.[subjectSlug];
  if (!subject) {
    return null;
  }

  const testMeta = (subject.tests || []).find((test) => test.id === testId);
  if (!testMeta) {
    return null;
  }

  const relativePath = normalizeStoredPath(testMeta.path);
  const absolutePath = path.join(process.cwd(), "data", "tests", relativePath);

  try {
    const raw = await fs.readFile(absolutePath, "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    const questions = toQuestionsArray(parsed);

    return {
      subjectName: subject.name,
      subjectSlug,
      testId,
      testTitle: testMeta.title,
      questions,
    };
  } catch {
    return null;
  }
}
