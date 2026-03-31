"use server";

import { auth } from "@clerk/nextjs/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Mark a lesson as complete for the authenticated user.
 * Per D-04: Clerk user ID is the foreign key, never store email/name.
 */
export async function markLessonComplete(lessonSlug: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const supabase = await createClient();

  const { error } = await supabase
    .from("user_progress")
    .upsert(
      {
        clerk_user_id: userId,
        lesson_slug: lessonSlug,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "clerk_user_id,lesson_slug" }
    );

  if (error) throw new Error(`Failed to save progress: ${error.message}`);
}

/**
 * Get all progress for the authenticated user.
 * Returns completed lesson slugs, quiz score, and challenge results.
 */
export async function getUserProgress() {
  const { userId } = await auth();
  if (!userId)
    return {
      completedLessons: [] as string[],
      quizScore: null as number | null,
      challengeResults: [] as string[],
    };

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_progress")
    .select("lesson_slug, quiz_score, challenge_results")
    .eq("clerk_user_id", userId);

  if (error) throw new Error(`Failed to fetch progress: ${error.message}`);

  // All lesson slugs from progress rows (any row means lesson was completed)
  const allCompletedSlugs = (data || []).map((row) => row.lesson_slug);

  // Quiz score: stored on a special "__quiz__" row
  const quizRow = (data || []).find((row) => row.lesson_slug === "__quiz__");
  const quizScore = quizRow?.quiz_score ?? null;

  // Challenge results: stored on a special "__challenges__" row
  const challengeRow = (data || []).find(
    (row) => row.lesson_slug === "__challenges__"
  );
  const challengeResults: string[] = Array.isArray(
    challengeRow?.challenge_results
  )
    ? challengeRow.challenge_results
    : [];

  return { completedLessons: allCompletedSlugs, quizScore, challengeResults };
}

/**
 * Save quiz score for the authenticated user.
 * Uses a special lesson_slug "__quiz__" to store the overall quiz score.
 */
export async function saveQuizScore(score: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const supabase = await createClient();

  const { error } = await supabase
    .from("user_progress")
    .upsert(
      {
        clerk_user_id: userId,
        lesson_slug: "__quiz__",
        quiz_score: score,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "clerk_user_id,lesson_slug" }
    );

  if (error) throw new Error(`Failed to save quiz score: ${error.message}`);
}

/**
 * Save challenge completion results for the authenticated user.
 * Uses a special lesson_slug "__challenges__" to store challenge IDs.
 * challengeIds: array of completed challenge ID strings.
 */
export async function saveChallengeResults(challengeIds: string[]) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const supabase = await createClient();

  const { error } = await supabase
    .from("user_progress")
    .upsert(
      {
        clerk_user_id: userId,
        lesson_slug: "__challenges__",
        challenge_results: challengeIds,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "clerk_user_id,lesson_slug" }
    );

  if (error)
    throw new Error(`Failed to save challenge results: ${error.message}`);
}
