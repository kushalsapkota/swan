# SWAN Foundation - Content Structure Mapping

## 📋 Complete Website Structure Analysis

### 🎯 Pages Overview
1. **Home (Index)** - Main landing page with multiple sections
2. **About** - Organization story, vision, mission, team
3. **Programs** - Detailed program categories and implementations
4. **Get Involved** - Donation, volunteering, membership options
5. **Contact** - Contact form, location, social links

---

## 🗂️ SECTION-BY-SECTION BREAKDOWN

### 1. NAVBAR (Global Component)
**Location**: `src/components/layout/Navbar.tsx`

**Editable Content**:
- Logo image/icon
- Organization name: "SWAN FOUNDATION"
- Organization name (Nepali): "स्वान फाउन्डेशन"
- Navigation links (name, path):
  - Home → /
  - About Us → /about
  - Programs → /programs
  - Get Involved → /get-involved
  - Contact → /contact
- CTA button text: "Donate Now"
- Theme toggle (ON/OFF)

**Database Tables Needed**: `site_settings`, `navigation_items`

---

### 2. FOOTER (Global Component)
**Location**: `src/components/layout/Footer.tsx`

**Editable Content**:
- Logo & organization name
- Tagline: "Making a Difference • Building Futures • Creating Hope"
- Social media links (5):
  - Facebook, Instagram, LinkedIn, Twitter, YouTube (icon, URL, label)
- Quick Links section (5 items)
- Programs section (5 items)
- Get Involved section (5 items)
- Legal & Policies section (5 items)
- Contact information:
  - Address: "Ward No. 10, Kathmandu Metropolitan City..."
  - Email: "info@swanfoundation.org.np"
- Copyright text
- Registration info

**Database Tables Needed**: `site_settings`, `footer_links`, `social_links`

---

### 3. HERO SECTION (Homepage)
**Location**: `src/components/home/HeroSection.tsx`

**Editable Content**:
- Badge text: "Registered NGO • Est. Oct 2025"
- Main title: "SWAN FOUNDATION"
- Nepali subtitle: "स्वान फाउन्डेशन"
- Tagline (3 parts):
  - "Empowering Communities"
  - "Building Futures"
  - "Creating Hope"
- Description: "Making a difference through Education • Health • Environment • Empowerment"
- Background image
- CTA buttons (3):
  - "Donate Now" (icon, text, link)
  - "Get Involved" (icon, text, link)
  - "Learn More" (icon, text, link)
- Scroll indicator text

**Database Tables Needed**: `homepage_hero`, `cta_buttons`

---

### 4. IMPACT DASHBOARD (Homepage)
**Location**: `src/components/home/ImpactDashboard.tsx`

**Editable Content**:
- Section badge: "Our Impact"
- Section title: "Live Impact Dashboard"
- Section description
- Stats (5 cards):
  1. Established: "Oct 2025" (Calendar icon)
  2. Registration No: "377033" (FileCheck icon)
  3. Headquarters: "Kathmandu" (MapPin icon)
  4. Reach: "National & International" (Globe icon)
  5. Focus Areas: "5+" (Target icon)

**Database Tables Needed**: `impact_stats`

---

### 5. IMPACT AREAS GRID (Homepage)
**Location**: `src/components/home/ImpactAreasGrid.tsx`

**Editable Content**:
- Section badge: "What We Do"
- Section title: "Our Impact Areas"
- Section description
- Impact areas (5 cards):
  1. Education (icon, title, description, color)
  2. Health (icon, title, description, color)
  3. Environment (icon, title, description, color)
  4. Empowerment (icon, title, description, color)
  5. Community Development (icon, title, description, color)

**Database Tables Needed**: `impact_areas`

---

### 6. STORYTELLER SECTION (Homepage)
**Location**: `src/components/home/StorytellerSection.tsx`

**Editable Content**:
- Section badge: "About Us"
- Section title: "About Swan Foundation"
- Main description paragraph
- Timeline items (5 focus areas with descriptions)
- Featured image
- Floating stat card (Registration number)

**Database Tables Needed**: `about_content`, `timeline_items`

---

### 7. PROGRAM PREVIEW (Homepage)
**Location**: `src/components/home/ProgramPreview.tsx`

**Editable Content**:
- Section badge: "Our Work"
- Section title: "Featured Programs"
- Section description
- Featured programs (2):
  - Education Programs (icon, title, subtitle, description, image, stats)
  - Health Programs (icon, title, subtitle, description, image, stats)

**Database Tables Needed**: `programs`, `program_stats`

---

### 8. CTA SECTION (Homepage)
**Location**: `src/components/home/CTASection.tsx`

**Editable Content**:
- Main title: "Make a Difference Today"
- Description
- CTA actions (4 cards):
  - Donate Now
  - Volunteer
  - Become a Member
  - Partner With Us
- Trust indicators (3):
  - Registered NGO
  - 100% Transparency
  - Tax Deductible

**Database Tables Needed**: `cta_actions`, `trust_indicators`

---

### 9. ABOUT PAGE
**Location**: `src/pages/About.tsx`

**Editable Content**:
- Hero section:
  - Badge: "About Us"
  - Title: "Our Story"
  - Description (2 paragraphs)
- Vision card (icon, title, description, bullet points)
- Mission card (icon, title, description, bullet points)
- Core values (6 cards with icon, title, description)
- Legal information table (6 rows)
- Compliance info list (5 items)
- Governing documents (5 tags)
- Board members (6 people: name, role, location)
- Advisory committee (3 people)
- International network (11 countries)

**Database Tables Needed**: `about_content`, `core_values`, `legal_info`, `board_members`, `advisory_committee`, `network_countries`

---

### 10. PROGRAMS PAGE
**Location**: `src/pages/Programs.tsx`

**Editable Content**:
- Hero section
- Program categories (5):
  - Education (5 programs)
  - Health (5 programs)
  - Environment (5 programs)
  - Empowerment (5 programs)
  - Community (5 programs)
- Each program contains:
  - Icon, title, subtitle, objective
  - Challenges list (3-5 items)
  - Solutions list (3-5 items)
  - Outcomes list (3-5 items)
  - Stats (1-2 metrics)
  - Color scheme, background gradient
- CTA section at bottom

**Database Tables Needed**: `program_categories`, `programs`, `program_challenges`, `program_solutions`, `program_outcomes`, `program_stats`

---

### 11. GET INVOLVED PAGE
**Location**: `src/pages/GetInvolved.tsx`

**Editable Content**:
- Hero section
- Involvement options (4 cards):
  - Donate, Volunteer, Become a Member, Partner
  - Each with: icon, title, subtitle, description, benefits list, CTA, color
- Donation tiers (4):
  - Amount, label, description, icon
- FAQ section

**Database Tables Needed**: `involvement_options`, `donation_tiers`

---

### 12. CONTACT PAGE
**Location**: `src/pages/Contact.tsx`

**Editable Content**:
- Hero section
- Contact info cards (4):
  - Visit Us (address)
  - Email Us (emails)
  - Call Us (phone numbers)
  - Office Hours (schedule)
- Contact form (enable/disable, recipient email)
- Map placeholder
- Social links (5)

**Database Tables Needed**: `contact_info`, `social_links`, `contact_form_settings`

---

## 📊 SUMMARY STATISTICS

**Total Editable Sections**: 12 major sections
**Total Content Items**: ~200+ individual content pieces
**Image Assets**: ~15+ (hero backgrounds, program images, etc.)
**Repeatable Components**: 
- Programs (25 total)
- Team members (9)
- Impact areas (5)
- CTA actions (4+)
- Navigation links (variable)

---

## 🎨 DYNAMIC STYLING NEEDS

**Brand Colors** (must be admin-editable):
- Primary color (Deep Teal)
- Secondary color (Warm Gold)
- Accent color (Soft Coral)

**Typography**:
- Font families (Playfair Display, Inter)

**Logo/Branding**:
- Logo image
- Favicon
- Organization name
