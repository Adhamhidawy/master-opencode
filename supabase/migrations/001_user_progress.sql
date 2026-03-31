-- Phase 3: User progress tracking
-- Clerk user ID (text) is the foreign key, NOT Supabase Auth
-- Per DATA-03: clerk_user_id text field

CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_user_id TEXT NOT NULL,
  lesson_slug TEXT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  quiz_score INTEGER,
  challenge_results JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(clerk_user_id, lesson_slug)
);

-- Index for fast lookup by user
CREATE INDEX IF NOT EXISTS idx_user_progress_clerk_user_id ON user_progress(clerk_user_id);

-- Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Server-side operations use service role key (bypasses RLS)
-- Auth is validated via Clerk's auth() in Server Actions per D-05
-- These policies are a defense-in-depth layer

CREATE POLICY "Users can read own progress" ON user_progress
  FOR SELECT USING (clerk_user_id = current_setting('request.jwt.claims', true)::jsonb->>'sub');

CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (clerk_user_id = current_setting('request.jwt.claims', true)::jsonb->>'sub');

CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (clerk_user_id = current_setting('request.jwt.claims', true)::jsonb->>'sub');
