-- Create contact_info table
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT,
  business_hours TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- RLS Policies for contact_info (public read, admin write)
CREATE POLICY "contact_info_select_all" ON contact_info FOR SELECT USING (true);
CREATE POLICY "contact_info_update_admin" ON contact_info FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true));

-- Insert default contact info
INSERT INTO contact_info (phone, email, address, city, postal_code, business_hours)
VALUES (
  '+92 (300) 123-4567',
  'info@pakautocarecom',
  'Lahore, Pakistan',
  'Lahore',
  '54000',
  'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM'
)
ON CONFLICT DO NOTHING;
