const STORAGE_KEY = "oc_progress";

interface LocalProgress {
  completedLessons: string[];
  quizScore: number | null;
  completedChallenges: string[];
}

function getProgress(): LocalProgress {
  if (typeof window === "undefined") {
    return { completedLessons: [], quizScore: null, completedChallenges: [] };
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { completedLessons: [], quizScore: null, completedChallenges: [] };
}

function saveProgress(progress: LocalProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {}
}

export function getCompletedLessons(): string[] {
  return getProgress().completedLessons;
}

export function markLessonComplete(slug: string): void {
  const progress = getProgress();
  if (!progress.completedLessons.includes(slug)) {
    progress.completedLessons.push(slug);
    saveProgress(progress);
  }
}

export function isLessonComplete(slug: string): boolean {
  return getProgress().completedLessons.includes(slug);
}

export function getQuizScore(): number | null {
  return getProgress().quizScore;
}

export function saveQuizScore(score: number): void {
  const progress = getProgress();
  progress.quizScore = score;
  saveProgress(progress);
}

export function getCompletedChallenges(): string[] {
  return getProgress().completedChallenges;
}

export function saveChallengeResult(challengeId: string): void {
  const progress = getProgress();
  if (!progress.completedChallenges.includes(challengeId)) {
    progress.completedChallenges.push(challengeId);
    saveProgress(progress);
  }
}
