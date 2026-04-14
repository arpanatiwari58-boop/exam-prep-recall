import Link from "next/link";
import { notFound } from "next/navigation";
import TestAttemptClient from "@/components/TestAttemptClient";
import { getTestAttemptData } from "@/lib/test-data";
import { GraduationCap, ArrowLeft } from "lucide-react";

interface TestPageProps {
  params: Promise<{ subject: string; id: string }>;
}

export default async function TestPage({ params }: TestPageProps) {
  const resolvedParams = await params;
  const testId = Number.parseInt(resolvedParams.id, 10);

  if (Number.isNaN(testId)) {
    notFound();
  }

  const testData = await getTestAttemptData(resolvedParams.subject, testId);

  if (!testData) {
    notFound();
  }

  return (
    <>
       <TestAttemptClient
        subjectName={testData.subjectName}
        testTitle={testData.testTitle}
        questions={testData.questions}
      />
    </>
  );
}
