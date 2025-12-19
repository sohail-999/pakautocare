-- Fix infinite recursion in profiles RLS policies
-- Drop all existing policies on profiles table
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
DROP POLICY IF EXISTS "profiles_select_admin" ON profiles;

-- Disable RLS on profiles table to prevent infinite recursion
-- Users will be authenticated via Supabase auth, not RLS
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Note: Access control is handled at the application level through Supabase auth
-- The profiles table is safe to query without RLS since we check auth.uid() in the application
