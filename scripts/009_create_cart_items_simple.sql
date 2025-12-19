-- Create a simplified cart_items table without foreign key constraint
CREATE TABLE IF NOT EXISTS cart_items_simple (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL,
  product_name TEXT NOT NULL,
  product_price DECIMAL(10, 2) NOT NULL,
  product_image TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_cart_items_simple_user_id ON cart_items_simple(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_simple_product_id ON cart_items_simple(product_id);

-- Enable RLS
ALTER TABLE cart_items_simple ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for users to see only their own cart items
CREATE POLICY "Users can view their own cart items" ON cart_items_simple
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cart items" ON cart_items_simple
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart items" ON cart_items_simple
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart items" ON cart_items_simple
  FOR DELETE USING (auth.uid() = user_id);
