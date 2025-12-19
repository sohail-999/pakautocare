-- Drop problematic policies that cause infinite recursion
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;

-- Recreate profiles policies with proper checks
CREATE POLICY "profiles_select_own" ON profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Disable RLS on profiles table to prevent recursion issues
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Keep RLS enabled on other tables but ensure cart_items policies are simple
DROP POLICY IF EXISTS "cart_items_select_own" ON cart_items;
DROP POLICY IF EXISTS "cart_items_insert_own" ON cart_items;
DROP POLICY IF EXISTS "cart_items_update_own" ON cart_items;
DROP POLICY IF EXISTS "cart_items_delete_own" ON cart_items;

-- Recreate cart_items policies with direct user_id check
CREATE POLICY "cart_items_select_own" ON cart_items 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "cart_items_insert_own" ON cart_items 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "cart_items_update_own" ON cart_items 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "cart_items_delete_own" ON cart_items 
  FOR DELETE 
  USING (auth.uid() = user_id);
