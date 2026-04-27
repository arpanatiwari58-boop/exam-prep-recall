import { db } from "@/firebase/config";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

// Core schema for our Spaced Repetition logic

// The intervals in days for our spaced repetition algorithm
// Step 0 -> Step 1: 1 day
// Step 1 -> Step 2: 3 days
// Step 2 -> Step 3: 7 days
// Step 3 -> Step 4: 21 days
// Step 4 -> Step 5: 45 days
export const SPACING_INTERVALS = [1, 3, 7, 21, 45];

export interface StudySession {
  id: string; // Unique document ID in Firebase
  userId: string; // Which user this belongs to

  // Subject Info
  subjectId: string; // e.g. "pom" or "dwdm"
  subjectName: string; // e.g. "Principles of Management"
  topicTitle: string; // e.g. "Unit 1: Planning"

  // Timestamps
  createdAt: number; // When they first read it (Unix timestamp)
  lastReviewedAt: number; // When they last completed a review
  nextReviewDate: number; // The exact date/time they need to review it next

  // Spaced Repetition State
  currentStep: number; // Starts at 0, goes up as they complete reviews
  status: "learning" | "reviewing" | "mastered"; // 'mastered' when they finish all steps

  // Optional: Keep a log of their reviews
  history: {
    reviewedAt: number;
    stepCompleted: number;
  }[];
}

export const TRACKED_SUBJECTS = [
  { id: "pom", name: "Principles of Management", color: "text-[#a072ff]", bg: "bg-[#a072ff]/10" },
  { id: "dwdm", name: "Data Mining and Data Warehousing", color: "text-[#ffb433]", bg: "bg-[#ffb433]/10" }
];

// ==========================================
// DUMMY STATIC DATA FOR UI DEVELOPMENT
// ==========================================
const NOW = Date.now();
const DAY_MS = 24 * 60 * 60 * 1000;

export const mockStudySessions: StudySession[] = [
  {
    id: "session_1",
    userId: "user_test",
    subjectId: "pom",
    subjectName: "Principles of Management",
    topicTitle: "Unit 1: Introduction to Management",
    createdAt: NOW - 2 * DAY_MS,
    lastReviewedAt: NOW - 2 * DAY_MS,
    nextReviewDate: NOW - 0.5 * DAY_MS, // Was due 12 hours ago -> OVERDUE/DUE
    currentStep: 0, // Needs their 1-day review
    status: "learning",
    history: []
  },
  {
    id: "session_2",
    userId: "user_test",
    subjectId: "dwdm",
    subjectName: "Data Mining and Data Warehousing",
    topicTitle: "Unit 2: Data Preprocessing",
    createdAt: NOW - 5 * DAY_MS,
    lastReviewedAt: NOW - 4 * DAY_MS,
    nextReviewDate: NOW - 0.1 * DAY_MS, // Due Today
    currentStep: 1, // Needs their 3-day review
    status: "reviewing",
    history: [{ reviewedAt: NOW - 4 * DAY_MS, stepCompleted: 0 }]
  },
  {
    id: "session_3",
    userId: "user_test",
    subjectId: "pom",
    subjectName: "Principles of Management",
    topicTitle: "Unit 2: Planning and Organizing",
    createdAt: NOW - 1 * DAY_MS,
    lastReviewedAt: NOW - 1 * DAY_MS,
    nextReviewDate: NOW + 1 * DAY_MS, // Due Tomorrow
    currentStep: 0,
    status: "learning",
    history: []
  },
  {
    id: "session_4",
    userId: "user_test",
    subjectId: "dwdm",
    subjectName: "Data Mining and Data Warehousing",
    topicTitle: "Unit 3: Classification",
    createdAt: NOW - 10 * DAY_MS,
    lastReviewedAt: NOW - 3 * DAY_MS,
    nextReviewDate: NOW + 4 * DAY_MS, // Due in 4 Days
    currentStep: 2, // Needs their 7-day review
    status: "reviewing",
    history: [
      { reviewedAt: NOW - 9 * DAY_MS, stepCompleted: 0 },
      { reviewedAt: NOW - 3 * DAY_MS, stepCompleted: 1 }
    ]
  }
];

// Helper functions for UI formatting
export function getReviewStatus(nextReviewDate: number): "due" | "upcoming" {
  return nextReviewDate <= Date.now() ? "due" : "upcoming";
}

export function formatNextReviewDate(nextReviewDate: number): string {
  const now = new Date();
  const next = new Date(nextReviewDate);

  // Normalize to start of day for accurate day differences
  now.setHours(0, 0, 0, 0);
  next.setHours(0, 0, 0, 0);

  const diffMs = next.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / DAY_MS);

  if (diffDays < 0) return "Overdue";
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  return `In ${diffDays} Days`;
}

export function getProgressStats(session: StudySession) {
  // Prevent out of bounds if they mastered everything
  const stepIndex = Math.min(session.currentStep, SPACING_INTERVALS.length - 1);
  const targetDays = SPACING_INTERVALS[stepIndex] || 1;
  const elapsedMs = Date.now() - session.lastReviewedAt;

  // Calculate which day of the interval we are currently on (minimum Day 1)
  const elapsedDays = Math.max(0, Math.floor(elapsedMs / DAY_MS));
  // Cap current day at the target days plus maybe 1 for overdue visual
  const currentDay = Math.min(elapsedDays + 1, targetDays);

  const percentage = Math.min(100, Math.round((currentDay / targetDays) * 100));

  return { currentDay, targetDays, percentage };
}

export function formatDetailedTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export async function addStudySession(
  userId: string,
  subjectId: string,
  subjectName: string,
  topicTitle: string
) {
  const twoDaysAgo = Date.now() - 2 * DAY_MS; // Backdate to 2 days ago
  const nextReviewDate = twoDaysAgo + SPACING_INTERVALS[0] * DAY_MS; // 2 days ago + 1 day = 1 day ago (immediately due)

  const newSession: Omit<StudySession, "id"> = {
    userId,
    subjectId,
    subjectName,
    topicTitle,
    createdAt: twoDaysAgo,      // Backdated: 2 days ago
    lastReviewedAt: twoDaysAgo, // Backdated: 2 days ago
    nextReviewDate,             // = 1 day ago → shows as Overdue immediately
    currentStep: 0,
    status: "learning",
    history: []
  };

  const docRef = await addDoc(collection(db, "studySessions"), newSession);
  return { id: docRef.id, ...newSession } as StudySession;
}

export async function completeReviewSession(session: StudySession) {
  const now = Date.now();
  const nextStep = session.currentStep + 1;
  const isMastered = nextStep >= SPACING_INTERVALS.length;

  // Calculate next interval. If mastered, stretch it far out or keep static.
  const intervalDays = isMastered
    ? 365 // Practically push it out a year once perfected
    : SPACING_INTERVALS[nextStep];

  const nextReviewDate = now + intervalDays * DAY_MS;

  const sessionRef = doc(db, "studySessions", session.id);
  await updateDoc(sessionRef, {
    currentStep: nextStep,
    status: isMastered ? "mastered" : "reviewing",
    lastReviewedAt: now,
    nextReviewDate,
    history: [
      ...(session.history || []),
      { reviewedAt: now, stepCompleted: session.currentStep }
    ]
  });
}