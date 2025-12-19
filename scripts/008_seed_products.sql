-- Insert mock products into the products table to fix foreign key constraint
INSERT INTO products (id, name, description, price, image_url, rating, reviews_count, stock, category_id, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'Premium Car Wash Shampoo', 'Professional-grade car wash shampoo for Pakistani climate', 1500, '/car-wash-shampoo-bottle.jpg', 4.8, 245, 50, '550e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440011', 'UV Protection Wax', 'Advanced UV protection wax for harsh weather conditions', 2500, '/car-wax.png', 4.9, 189, 35, '550e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440012', 'Interior Leather Conditioner', 'Gentle yet effective leather conditioning formula', 1800, '/leather-conditioner-bottle.jpg', 4.7, 156, 42, '550e8400-e29b-41d4-a716-446655440002', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440013', 'Glass Protective Coating', 'Water-repellent coating for windshields and windows', 3000, '/glass-coating-spray.jpg', 4.6, 128, 28, '550e8400-e29b-41d4-a716-446655440003', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440014', 'Paint Protection Film', 'Durable protection against scratches and UV damage', 5000, '/paint-protection-film.jpg', 4.9, 203, 15, '550e8400-e29b-41d4-a716-446655440003', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440015', 'Tire Shine Gel', 'Long-lasting tire shine with UV protection', 800, '/tire-shine-gel-bottle.jpg', 4.5, 98, 60, '550e8400-e29b-41d4-a716-446655440001', NOW(), NOW());

-- Insert categories if they don't exist
INSERT INTO categories (id, name, description, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Exterior Care', 'Products for exterior car care', NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'Interior Care', 'Products for interior car care', NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'Protection', 'Protective products for your vehicle', NOW())
ON CONFLICT (id) DO NOTHING;
