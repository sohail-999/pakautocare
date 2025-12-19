-- Insert categories
INSERT INTO categories (name, description, image_url) VALUES
('Car Shampoos', 'Premium pH-balanced car shampoos for safe and effective cleaning', '/placeholder.svg?height=300&width=300'),
('Waxes & Sealants', 'Long-lasting protective waxes and ceramic sealants', '/placeholder.svg?height=300&width=300'),
('Cleaners & Degreasers', 'Powerful cleaners for wheels, engines, and interior', '/placeholder.svg?height=300&width=300'),
('Microfiber Towels', 'Premium microfiber towels for safe drying and detailing', '/placeholder.svg?height=300&width=300'),
('Interior Care', 'Dashboard, leather, and fabric care products', '/placeholder.svg?height=300&width=300')
ON CONFLICT (name) DO NOTHING;

-- Insert products
INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count) VALUES
('Pak Auto Premium Shampoo', 'pH-balanced formula safe for all paint types. Removes dirt and grime without stripping wax. Perfect for harsh Pakistani climate.', 1299, (SELECT id FROM categories WHERE name = 'Car Shampoos'), '/placeholder.svg?height=400&width=400', 50, 4.8, 127),
('Ultra Foam Wash', 'Thick foam formula that clings to dirt. Biodegradable and environmentally friendly.', 899, (SELECT id FROM categories WHERE name = 'Car Shampoos'), '/placeholder.svg?height=400&width=400', 45, 4.6, 89),
('Ceramic Pro Wax', 'Advanced ceramic wax with 6-month protection. Hydrophobic and UV resistant.', 2499, (SELECT id FROM categories WHERE name = 'Waxes & Sealants'), '/placeholder.svg?height=400&width=400', 30, 4.9, 156),
('Liquid Sealant', 'Professional-grade liquid sealant for maximum shine and protection.', 1899, (SELECT id FROM categories WHERE name = 'Waxes & Sealants'), '/placeholder.svg?height=400&width=400', 35, 4.7, 98),
('Wheel Cleaner Pro', 'Powerful formula removes brake dust and grime from alloy wheels.', 799, (SELECT id FROM categories WHERE name = 'Cleaners & Degreasers'), '/placeholder.svg?height=400&width=400', 60, 4.5, 112),
('Engine Degreaser', 'Safe and effective engine bay cleaner. Biodegradable formula.', 1199, (SELECT id FROM categories WHERE name = 'Cleaners & Degreasers'), '/placeholder.svg?height=400&width=400', 40, 4.4, 76),
('Premium Microfiber Towel Set', 'Pack of 3 ultra-soft microfiber towels. 400gsm density for superior absorption.', 1499, (SELECT id FROM categories WHERE name = 'Microfiber Towels'), '/placeholder.svg?height=400&width=400', 100, 4.9, 203),
('Drying Towel XL', 'Extra-large microfiber drying towel. Perfect for quick drying after wash.', 899, (SELECT id FROM categories WHERE name = 'Microfiber Towels'), '/placeholder.svg?height=400&width=400', 80, 4.7, 145),
('Dashboard Shine', 'Non-greasy dashboard protectant with UV protection.', 599, (SELECT id FROM categories WHERE name = 'Interior Care'), '/placeholder.svg?height=400&width=400', 70, 4.3, 64),
('Leather Conditioner', 'Premium leather care product. Restores suppleness and protects from cracking.', 1399, (SELECT id FROM categories WHERE name = 'Interior Care'), '/placeholder.svg?height=400&width=400', 45, 4.6, 91)
ON CONFLICT DO NOTHING;
