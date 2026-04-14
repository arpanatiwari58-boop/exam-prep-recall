import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface TestManifest {
  subjects: {
    [slug: string]: {
      name: string;
      tests: {
        id: number;
        title: string;
        path: string;
      }[];
    };
  };
}

const manifestPath = path.join(process.cwd(), "data", "test-manifest.json");
const testsBasePath = path.join(process.cwd(), "data", "tests");

async function readManifest(): Promise<TestManifest> {
  try {
    const data = await fs.readFile(manifestPath, "utf-8");
    return JSON.parse(data);
  } catch {
    // If the file doesn't exist or is empty, return a default structure
    return { subjects: {} };
  }
}

async function writeManifest(data: TestManifest): Promise<void> {
  await fs.writeFile(manifestPath, JSON.stringify(data, null, 2), "utf-8");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subject, jsonContent } = body;

    if (!subject || !jsonContent) {
      return NextResponse.json(
        { message: "Subject and JSON content are required." },
        { status: 400 }
      );
    }

    const manifest = await readManifest();

    // Ensure the subject directory exists
    const subjectSlug = subject.slug;
    const subjectDirPath = path.join(testsBasePath, subjectSlug);
    await fs.mkdir(subjectDirPath, { recursive: true });

    // Initialize subject in manifest if it doesn't exist
    if (!manifest.subjects[subjectSlug]) {
      manifest.subjects[subjectSlug] = {
        name: subject.name,
        tests: [],
      };
    }

    // Determine the next test ID
    const nextTestId = (manifest.subjects[subjectSlug].tests.length || 0) + 1;
    const testTitle = `Test ${nextTestId}`;
    const testFileName = `test-${nextTestId}.json`;
    const testFilePath = path.join(subjectSlug, testFileName); // Relative path for manifest

    // Write the new test file
    const absoluteTestFilePath = path.join(subjectDirPath, testFileName);
    await fs.writeFile(absoluteTestFilePath, JSON.stringify(jsonContent, null, 2), "utf-8");

    // Add the new test to the manifest
    manifest.subjects[subjectSlug].tests.push({
      id: nextTestId,
      title: testTitle,
      path: testFilePath,
    });

    // Write the updated manifest back
    await writeManifest(manifest);

    return NextResponse.json({
      message: "Test created successfully!",
      subject: subject.name,
      test: { id: nextTestId, title: testTitle },
    });
  } catch (error) {
    console.error("Failed to create test:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
