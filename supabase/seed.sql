-- ============================================
-- SWAN FOUNDATION - SEED DATA
-- ============================================
-- This file contains initial data to populate the CMS
-- Run after schema.sql
-- ============================================

-- ============================================
-- 1. SITE SETTINGS
-- ============================================

INSERT INTO site_settings (key, value, description, category) VALUES
('site_name', '{"en": "SWAN FOUNDATION", "ne": "स्वान फाउन्डेशन"}', 'Organization name in English and Nepali', 'branding'),
('site_tagline', '{"text": "Making a Difference • Building Futures • Creating Hope"}', 'Site tagline/slogan', 'branding'),
('site_logo', '{"url": "/logo.svg", "alt": "SWAN Foundation Logo"}', 'Main logo', 'branding'),
('registration_number', '{"number": "377033 / 82/83", "date": "October 19, 2025"}', 'Official registration details', 'branding'),

-- Brand Colors
('brand_colors', '{"primary": "#2C6E6F", "primary_light": "#3D8A8C", "primary_dark": "#1F4F50", "secondary": "#F59E0B", "secondary_light": "#FBBF24", "accent": "#F97316"}', 'Brand color scheme', 'colors'),

-- Contact Information
('contact_email_primary', '{"email": "info@swanfoundation.org.np"}', 'Primary contact email', 'contact'),
('contact_email_secondary', '{"email": "admin@swanfoundation.org'}', 'Secondary contact email', 'contact'),
('contact_phone_primary', '{"phone": "+977-9840292723"}', 'Primary phone', 'contact'),
('contact_phone_secondary', '{"phone": "+977-9864228469"}', 'Secondary phone', 'contact'),
('contact_address', '{"line1": "Ward No. 10, Kathmandu Metropolitan City", "line2": "Sitapaila, Kathmandu", "line3": "Bagmati Province, Nepal", "full": "Ward No. 10, Kathmandu Metropolitan City, Bagmati Province, Nepal"}', 'Physical address', 'contact'),
('office_hours', '{"days": "Sunday - Friday", "hours": "10:00 AM - 5:00 PM"}', 'Office operating hours', 'contact'),

-- SEO
('meta_title', '{"text": "SWAN Foundation - Empowering Communities in Nepal"}', 'Default meta title', 'seo'),
('meta_description', '{"text": "SWAN Foundation is dedicated to creating sustainable positive change in Nepal through education, health, environmental conservation, and community empowerment."}', 'Default meta description', 'seo'),
('meta_keywords', '{"keywords": ["NGO Nepal", "SWAN Foundation", "Community Development", "Education Nepal", "Healthcare Nepal"]}', 'Default keywords', 'seo');

-- ============================================
-- 2. NAVIGATION ITEMS
-- ============================================

INSERT INTO navigation_items (name, path, sort_order, location) VALUES
('Home', '/', 1, 'both'),
('About Us', '/about', 2, 'both'),
('Programs', '/programs', 3, 'both'),
('Get Involved', '/get-involved', 4, 'both'),
('Contact', '/contact', 5, 'both');

-- ============================================
-- 3. SOCIAL MEDIA LINKS
-- ============================================

INSERT INTO social_links (platform, url, icon, label, sort_order) VALUES
('facebook', 'https://facebook.com/swanfoundation', 'Facebook', 'Facebook', 1),
('instagram', 'https://instagram.com/swanfoundation', 'Instagram', 'Instagram', 2),
('linkedin', 'https://linkedin.com/company/swan-foundation', 'Linkedin', 'LinkedIn', 3),
('twitter', 'https://twitter.com/swanfoundation', 'Twitter', 'Twitter', 4),
('youtube', 'https://youtube.com/@swanfoundation', 'Youtube', 'YouTube', 5);

-- ============================================
-- 4. HOMEPAGE HERO SECTION
-- ============================================

INSERT INTO homepage_hero (badge_text, main_title, subtitle_nepali, tagline, description, scroll_indicator_text) VALUES
('Registered NGO • Est. Oct 2025', 
 'SWAN FOUNDATION', 
 'स्वान फाउन्डेशन',
 '["Empowering Communities", "Building Futures", "Creating Hope"]',
 'Making a difference through Education • Health • Environment • Empowerment',
 'Scroll to explore');

-- ============================================
-- 5. CTA BUTTONS
-- ============================================

INSERT INTO cta_buttons (section, label, icon, link_url, variant, sort_order) VALUES
('hero', 'Donate Now', 'Heart', '/get-involved#donate', 'primary', 1),
('hero', 'Get Involved', 'Users', '/get-involved', 'outline', 2),
('hero', 'Learn More', 'BookOpen', '/about', 'ghost', 3),
('cta_section', 'Donate Now', 'Heart', '/get-involved#donate', 'primary', 1),
('cta_section', 'Volunteer', 'Users', '/get-involved#volunteer', 'outline', 2),
('cta_section', 'Become a Member', 'UserPlus', '/get-involved#member', 'outline', 3),
('cta_section', 'Partner With Us', 'Handshake', '/get-involved#partner', 'outline', 4);

-- ============================================
-- 6. IMPACT STATS (Live Dashboard)
-- ============================================

INSERT INTO impact_stats (label, value, icon, stat_type, sort_order) VALUES
('Established', 'Oct 2025', 'Calendar', 'date', 1),
('Registration No.', '377033', 'FileCheck', 'text', 2),
('Headquarters', 'Kathmandu', 'MapPin', 'text', 3),
('Reach', 'National & International', 'Globe', 'text', 4),
('Focus Areas', '5', 'Target', 'number', 5);

-- ============================================
-- 7. IMPACT AREAS
-- ============================================

INSERT INTO impact_areas (title, description, icon, icon_color, gradient_from, gradient_to, sort_order) VALUES
('Education', 'Supporting schools, providing scholarships and creating learning opportunities for all', 'GraduationCap', 'text-blue-600', 'from-blue-500/20', 'to-blue-600/10', 1),
('Health', 'Community health camps, medical assistance and health awareness programs', 'HeartPulse', 'text-rose-600', 'from-rose-500/20', 'to-rose-600/10', 2),
('Environment', 'Tree plantation drives, conservation programs and climate action initiatives', 'Leaf', 'text-emerald-600', 'from-emerald-500/20', 'to-emerald-600/10', 3),
('Empowerment', 'Women and youth capacity building, skill development and leadership training', 'Users', 'text-amber-600', 'from-amber-500/20', 'to-amber-600/10', 4),
('Community Development', 'Infrastructure support, livelihood programs and disaster preparedness', 'Building', 'text-violet-600', 'from-violet-500/20', 'to-violet-600/10', 5);

-- ============================================
-- 8. PROGRAM CATEGORIES
-- ============================================

INSERT INTO program_categories (name, slug, description, icon, color_from, color_to, bg_color, border_color, sort_order) VALUES
('Education', 'education', 'Building futures through knowledge', 'GraduationCap', 'from-blue-500', 'to-cyan-500', 'bg-blue-500/10', 'border-blue-500/30', 1),
('Health', 'health', 'Wellness for all communities', 'HeartPulse', 'from-rose-500', 'to-pink-500', 'bg-rose-500/10', 'border-rose-500/30', 2),
('Environment', 'environment', 'Protecting our planet', 'Leaf', 'from-emerald-500', 'to-green-500', 'bg-emerald-500/10', 'border-emerald-500/30', 3),
('Empowerment', 'empowerment', 'Empowering communities', 'Users2', 'from-amber-500', 'to-orange-500', 'bg-amber-500/10', 'border-amber-500/30', 4),
('Community', 'community', 'Building together', 'Building', 'from-violet-500', 'to-purple-500', 'bg-violet-500/10', 'border-violet-500/30', 5);

-- Note: Add actual program data manually or import from existing data
-- This seed file includes structure and some sample data
-- Full program details (25+ programs) should be added through admin panel

COMMENT ON SCHEMA public IS 'SWAN Foundation CMS - Seed Data Loaded'