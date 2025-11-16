/*
  # Create Pomodoro Sessions Table

  1. New Tables
    - `pomodoro_sessions`
      - `id` (uuid, primary key) - Unique identifier for each session
      - `user_id` (text) - Anonymous user identifier stored in browser
      - `duration` (integer) - Session duration in seconds
      - `type` (text) - Session type: 'focus', 'short_break', or 'long_break'
      - `completed` (boolean) - Whether the session was completed
      - `completed_at` (timestamptz) - When the session was completed
      - `created_at` (timestamptz) - When the session was created
  
  2. Security
    - Enable RLS on `pomodoro_sessions` table
    - Add policy for users to read their own sessions
    - Add policy for users to insert their own sessions
    
  3. Indexes
    - Index on user_id for fast queries
    - Index on completed_at for statistics queries
*/

CREATE TABLE IF NOT EXISTS pomodoro_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  duration integer NOT NULL,
  type text NOT NULL CHECK (type IN ('focus', 'short_break', 'long_break')),
  completed boolean DEFAULT false,
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS pomodoro_sessions_user_id_idx ON pomodoro_sessions(user_id);
CREATE INDEX IF NOT EXISTS pomodoro_sessions_completed_at_idx ON pomodoro_sessions(completed_at);

ALTER TABLE pomodoro_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own sessions"
  ON pomodoro_sessions FOR SELECT
  USING (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "Users can insert own sessions"
  ON pomodoro_sessions FOR INSERT
  WITH CHECK (user_id = current_setting('app.current_user_id', true));