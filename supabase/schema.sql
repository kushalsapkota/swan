-- ============================================
-- SWAN FOUNDATION CMS - SUPABASE SCHEMA
-- ============================================
-- Version: 1.0
-- Purpose: Complete database schema for admin-controlled NGO website
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For better text search

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE user_role AS ENUM ('super_admin', 'content_editor', 'viewer');
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE section_visibility AS ENUM ('visible', 'hidden');

-- ============================================
-- 1. AUTHENTICATION & USER MANAGEMENT
-- ============================================

-- Admin users table (extends Supabase auth.users)
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role DEFAULT 'content_editor',
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES admin_users(id)
);

-- ============================================
-- 2. GLOBAL SITE SETTINGS
-- ============================================

CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'branding', 'contact', 'seo', 'colors', 'social'
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id)
);

-- Example site_settings rows:
-- {key: 'site_name', value: {"en": "SWAN FOUNDATION", "ne": "स्वान फाउन्डेशन"}}
-- {key: 'site_logo', value: {"url": "storage_url", "alt": "SWAN Foundation Logo"}}
-- {key: 'brand_colors', value: {"primary": "#2C6E6F", "secondary": "#F59E0B"}}
-- {key: 'contact_email', value: {"primary": "info@swanfoundation.org.np"}}
-- {key: 'tagline', value: {"text": "Making a Difference • Building Futures • Creating Hope"}}

-- ============================================
-- 3. NAVIGATION
-- ============================================

CREATE TABLE navigation_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  path TEXT NOT NULL,
  parent_id UUID REFERENCES navigation_items(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  icon TEXT, -- lucide icon name
  target TEXT DEFAULT '_self', -- '_self', '_blank'
  location TEXT DEFAULT 'header', -- 'header', 'footer', 'both'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. SOCIAL MEDIA LINKS
-- ============================================

CREATE TABLE social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL, -- 'facebook', 'instagram', 'linkedin', etc.
  url TEXT NOT NULL,
  icon TEXT NOT NULL, -- lucide icon name
  label TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. HOMEPAGE - HERO SECTION
-- ============================================

CREATE TABLE homepage_hero (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  badge_text TEXT NOT NULL,
  main_title TEXT NOT NULL,
  subtitle_nepali TEXT,
  tagline JSONB NOT NULL, -- Array of tagline parts
  description TEXT NOT NULL,
  background_image_url TEXT,
  background_overlay_opacity DECIMAL(3,2) DEFAULT 0.5,
  scroll_indicator_text TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id)
);

-- ============================================
-- 6. CTA BUTTONS (Reusable)
-- ============================================

CREATE TABLE cta_buttons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section TEXT NOT NULL, -- 'hero', 'cta_section', 'programs', etc.
  label TEXT NOT NULL,
  icon TEXT, -- lucide icon name
  link_url TEXT NOT NULL,
  variant TEXT DEFAULT 'primary', -- 'primary', 'secondary', 'outline', 'ghost'
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. IMPACT STATISTICS (Live Dashboard)
-- ============================================

CREATE TABLE impact_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  value TEXT NOT NULL, -- Can be number or text like "Oct 2025"
  suffix TEXT, -- '+', '%', etc.
  icon TEXT NOT NULL, -- lucide icon name
  description TEXT,
  stat_type TEXT, -- 'number', 'text', 'date'
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id)
);

-- ============================================
-- 8. IMPACT AREAS / FOCUS AREAS
-- ============================================

CREATE TABLE impact_areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL, -- lucide icon name
  icon_color TEXT, -- Tailwind color class or hex
  gradient_from TEXT, -- Tailwind color
  gradient_to TEXT, -- Tailwind color
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id)
);

-- ============================================
-- 9. ABOUT PAGE CONTENT
-- ============================================

CREATE TABLE about_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section TEXT UNIQUE NOT NULL, -- 'hero', 'vision', 'mission'
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  content JSONB, -- For structured content like bullet points
  icon TEXT,
  image_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id)
);

CREATE TABLE core_values (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE legal_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  category TEXT DEFAULT 'registration', -- 'registration', 'compliance', 'documents'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE board_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  location TEXT,
  bio TEXT,
  photo_url TEXT,
  member_type TEXT DEFAULT 'board', -- 'board', 'advisory'
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE network_countries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  country_name TEXT NOT NULL,
  flag_emoji TEXT,
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 10. PROGRAMS (Main CMS Feature)
-- ============================================

CREATE TABLE program_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT NOT NULL,
  color_from TEXT, -- Gradient start
  color_to TEXT, -- Gradient end
  bg_color TEXT, -- Background color
  border_color TEXT,
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES program_categories(id) ON DELETE SET NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  objective TEXT NOT NULL,
  icon TEXT NOT NULL,
  color_from TEXT,
  color_to TEXT,
  bg_gradient TEXT,
  image_url TEXT,
  status content_status DEFAULT 'draft',
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id)
);

CREATE TABLE program_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  challenge_text TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE program_solutions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  solution_text TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE program_outcomes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  outcome_text TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE program_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 11. GET INVOLVED - INVOLVEMENT OPTIONS
-- ============================================

CREATE TABLE involvement_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color_from TEXT, -- Gradient colors
  color_to TEXT,
  benefits JSONB, -- Array of benefit texts
  cta_text TEXT NOT NULL,
  cta_link TEXT,
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE donation_tiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'NPR',
  label TEXT NOT NULL, -- 'Supporter', 'Champion', etc.
  description TEXT NOT NULL,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 12. CONTACT INFORMATION
-- ============================================

CREATE TABLE contact_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  info_type TEXT NOT NULL, -- 'address', 'email', 'phone', 'hours'
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  details JSONB NOT NULL, -- Array of detail lines
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE contact_form_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  is_enabled BOOLEAN DEFAULT true,
  recipient_email TEXT NOT NULL,
  success_message TEXT,
  fields JSONB, -- Form field configuration
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id)
);

-- ============================================
-- 13. FORM SUBMISSIONS (Contact Forms)
-- ============================================

CREATE TABLE form_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_type TEXT NOT NULL, -- 'contact', 'volunteer', 'membership'
  data JSONB NOT NULL, -- Form data
  ip_address INET,
  user_agent TEXT,
  is_read BOOLEAN DEFAULT false,
  is_spam BOOLEAN DEFAULT false,
  replied_at TIMESTAMPTZ,
  replied_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 14. MEDIA LIBRARY (Track Uploaded Assets)
-- ============================================

CREATE TABLE media_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'image', 'document', 'video'
  mime_type TEXT,
  file_size INTEGER, -- in bytes
  width INTEGER, -- for images
  height INTEGER, -- for images
  alt_text TEXT,
  caption TEXT,
  uploaded_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 15. ACTIVITY LOG (Audit Trail)
-- ============================================

CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES admin_users(id),
  action TEXT NOT NULL, -- 'created', 'updated', 'deleted'
  entity_type TEXT NOT NULL, -- 'program', 'site_settings', etc.
  entity_id UUID,
  changes JSONB, -- Store old and new values
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES for Performance
-- ============================================

CREATE INDEX idx_navigation_items_sort ON navigation_items(sort_order);
CREATE INDEX idx_programs_category ON programs(category_id);
CREATE INDEX idx_programs_status ON programs(status);
CREATE INDEX idx_programs_slug ON programs(slug);
CREATE INDEX idx_impact_areas_sort ON impact_areas(sort_order);
CREATE INDEX idx_board_members_type ON board_members(member_type);
CREATE INDEX idx_form_submissions_created ON form_submissions(created_at DESC);
CREATE INDEX idx_activity_log_user ON activity_log(user_id, created_at DESC);

-- ============================================
-- TRIGGERS for updated_at timestamps
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables with updated_at
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_navigation_items_updated_at BEFORE UPDATE ON navigation_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_impact_areas_updated_at BEFORE UPDATE ON impact_areas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE cta_buttons ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE core_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE board_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE network_countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE involvement_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_form_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PUBLIC READ ACCESS (for frontend website)
-- ============================================

-- Public can read published content
CREATE POLICY "Public can read site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public can read navigation" ON navigation_items FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can read social links" ON social_links FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read homepage hero" ON homepage_hero FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read CTA buttons" ON cta_buttons FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can read impact stats" ON impact_stats FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can read impact areas" ON impact_areas FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can read about content" ON about_content FOR SELECT USING (true);
CREATE POLICY "Public can read core values" ON core_values FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can read legal info" ON legal_info FOR SELECT USING (true);
CREATE POLICY "Public can read board members" ON board_members FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can read network countries" ON network_countries FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can read program categories" ON program_categories FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can read published programs" ON programs FOR SELECT USING (status = 'published' AND is_visible = true);
CREATE POLICY "Public can read program challenges" ON program_challenges FOR SELECT USING (true);
CREATE POLICY "Public can read program solutions" ON program_solutions FOR SELECT USING (true);
CREATE POLICY "Public can read program outcomes" ON program_outcomes FOR SELECT USING (true);
CREATE POLICY "Public can read program stats" ON program_stats FOR SELECT USING (true);
CREATE POLICY "Public can read involvement options" ON involvement_options FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can read donation tiers" ON donation_tiers FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can read contact info" ON contact_info FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can read contact form settings" ON contact_form_settings FOR SELECT USING (is_enabled = true);
CREATE POLICY "Public can insert form submissions" ON form_submissions FOR INSERT WITH CHECK (true);

-- ============================================
-- ADMIN ACCESS POLICIES
-- ============================================

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() 
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() 
    AND role = 'super_admin' 
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin policies: full CRUD for admins
CREATE POLICY "Admins can manage site settings" ON site_settings FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage navigation" ON navigation_items FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage social links" ON social_links FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage homepage hero" ON homepage_hero FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage CTA buttons" ON cta_buttons FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage impact stats" ON impact_stats FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage impact areas" ON impact_areas FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage about content" ON about_content FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage core values" ON core_values FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage legal info" ON legal_info FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage board members" ON board_members FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage network countries" ON network_countries FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage program categories" ON program_categories FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage programs" ON programs FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage program challenges" ON program_challenges FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage program solutions" ON program_solutions FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage program outcomes" ON program_outcomes FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage program stats" ON program_stats FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage involvement options" ON involvement_options FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage donation tiers" ON donation_tiers FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage contact info" ON contact_info FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage contact form settings" ON contact_form_settings FOR ALL USING (is_admin());
CREATE POLICY "Admins can read form submissions" ON form_submissions FOR SELECT USING (is_admin());
CREATE POLICY "Admins can manage media library" ON media_library FOR ALL USING (is_admin());
CREATE POLICY "Admins can read activity log" ON activity_log FOR SELECT USING (is_admin());

-- Super admin only policies
CREATE POLICY "Super admins can manage admin users" ON admin_users FOR ALL USING (is_super_admin());
CREATE POLICY "Admins can read all admin users" ON admin_users FOR SELECT USING (is_admin());

-- ============================================
-- INITIAL SEED DATA (Optional)
-- ============================================

-- Insert default super admin (you'll need to create this user in Supabase Auth first)
-- Replace 'your-auth-user-id' with actual user ID from auth.users
-- INSERT INTO admin_users (user_id, role, full_name, email) VALUES
-- ('your-auth-user-id', 'super_admin', 'Admin Name', 'admin@swanfoundation.org.np');

COMMENT ON SCHEMA public IS 'SWAN Foundation CMS Schema - Version 1.0';
