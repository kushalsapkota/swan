# 🔗 Admin Panel → Frontend Mapping

## Complete Control Map: What Admins Control & Where It Shows

This document maps every admin control to its exact appearance on the frontend website.

---

## 🎯 GLOBAL CONTROLS (Affect Multiple Pages)

### 1. Site Settings → Entire Website

| Admin Control | Frontend Location | Components Affected |
|--------------|-------------------|---------------------|
| **Site Name** (EN & Nepali) | Navbar, Footer | `Navbar.tsx`, `Footer.tsx` |
| **Site Logo** | Navbar, Footer | `Navbar.tsx`, `Footer.tsx` |
| **Tagline** | Footer, Hero section | `Footer.tsx`, `HeroSection.tsx` |
| **Brand Colors** | All buttons, gradients, accents | Global CSS variables |
| **Contact Email** | Contact page, Footer | `Contact.tsx`, `Footer.tsx` |
| **Contact Phone** | Contact page, Footer | `Contact.tsx`, `Footer.tsx` |
| **Office Address** | Contact page, Footer | `Contact.tsx`, `Footer.tsx` |
| **Office Hours** | Contact page | `Contact.tsx` |

### 2. Navigation Items → Header & Footer

| Admin Control | Frontend Location |
|--------------|-------------------|
| Navigation link name | Navbar menu |
| Navigation link path | Click destination |
| Link visibility | Show/hide in menu |
| Link order | Menu position |
| Parent-child relations | Dropdown menus |

### 3. Social Links → Footer & Contact Page

| Admin Control | Frontend Location |
|--------------|-------------------|
| Platform URL | Social icon links |
| Platform icon | Icon display |
| Visibility toggle | Show/hide icon |
| Order | Icon position |

---

## 🏠 HOMEPAGE CONTROLS

### Hero Section → `HeroSection.tsx`

| Admin Field | Frontend Element |
|------------|------------------|
| Badge text | Orange badge at top: "Registered NGO • Est. Oct 2025" |
| Main title | Large text: "SWAN FOUNDATION" |
| Nepali subtitle | Text below title: "स्वान फाउन्डेशन" |
| Tagline (3 parts) | Three-line tagline: "Empowering..." |
| Description | Paragraph below tagline |
| Background image | Full-screen hero background |
| CTA Button 1 | "Donate Now" button |
| CTA Button 2 | "Get Involved" button |
| CTA Button 3 | "Learn More" button |
| Scroll indicator text | "Scroll to explore" at bottom |

**Screenshot Location**: Homepage top section

---

### Impact Dashboard → `ImpactDashboard.tsx`

| Admin Field | Frontend Element |
|------------|------------------|
| Section badge | "Our Impact" small text |
| Section title | "Live Impact Dashboard" heading |
| Section description | Paragraph below title |
| Stat 1: Label + Value + Icon | Card showing "Oct 2025" with Calendar icon |
| Stat 2: Label + Value + Icon | Card showing "377033" with FileCheck icon |
| Stat 3: Label + Value + Icon | Card showing "Kathmandu" with MapPin icon |
| Stat 4: Label + Value + Icon | Card showing reach with Globe icon |
| Stat 5: Label + Value + Icon | Card showing "5+" with Target icon |

**Admin Actions**:
- Add/remove stats
- Change values and icons
- Reorder cards
- Toggle visibility

**Screenshot Location**: Homepage, below hero

---

### Impact Areas Grid → `ImpactAreasGrid.tsx`

| Admin Field | Frontend Element |
|------------|------------------|
| Section badge | "What We Do" |
| Section title | "Our Impact Areas" |
| Section description | Paragraph text |
| Area 1: Title + Description + Icon | "Education" card with GraduationCap icon |
| Area 2: Title + Description + Icon | "Health" card with HeartPulse icon |
| Area 3: Title + Description + Icon | "Environment" card with Leaf icon |
| Area 4: Title + Description + Icon | "Empowerment" card with Users icon |
| Area 5: Title + Description + Icon | "Community Development" card |

**Admin Actions**:
- Add new impact areas
- Edit text and icons
- Change colors
- Reorder grid
- Hide/show areas

**Screenshot Location**: Homepage, middle section

---

### Storyteller Section → `StorytellerSection.tsx`

| Admin Field | Frontend Element |
|------------|------------------|
| Section badge | "About Us" |
| Section title | "About Swan Foundation" |
| Main description | Large paragraph about organization |
| Timeline item 1-5 | Vertical timeline with focus areas |
| Featured image | Large image on left/right |
| Floating stat | Registration number overlay |

**Screenshot Location**: Homepage, about preview

---

### Program Preview → `ProgramPreview.tsx`

| Admin Field | Frontend Element |
|------------|------------------|
| Section badge | "Our Work" |
| Section title | "Featured Programs" |
| Featured program 1 | Education Programs card with image |
| Featured program 2 | Health Programs card with image |
| Program title | Card heading |
| Program subtitle | Small text above title |
| Program description | Card paragraph |
| Program image | Large background image |
| Program stats | Two stat boxes per card |

**Admin Actions**:
- Select which programs to feature
- Change program content
- Update images
- Modify stats

**Screenshot Location**: Homepage, programs section

---

### CTA Section → `CTASection.tsx`

| Admin Field | Frontend Element |
|------------|------------------|
| Main title | "Make a Difference Today" |
| Description | Paragraph below title |
| CTA Action 1 | "Donate Now" card (white bg) |
| CTA Action 2 | "Volunteer" card (outline) |
| CTA Action 3 | "Become a Member" card (outline) |
| CTA Action 4 | "Partner With Us" card (outline) |
| Trust indicator 1 | "Registered NGO" with green dot |
| Trust indicator 2 | "100% Transparency" with green dot |
| Trust indicator 3 | "Tax Deductible" with green dot |

**Screenshot Location**: Homepage, bottom CTA section

---

## 📄 ABOUT PAGE CONTROLS → `About.tsx`

### Hero Section

| Admin Field | Frontend Element |
|------------|------------------|
| Badge | "About Us" |
| Title | "Our Story" |
| Description | Two paragraphs about foundation |

### Vision Card

| Admin Field | Frontend Element |
|------------|------------------|
| Icon | Eye icon in gradient circle |
| Title | "Vision" |
| Description | Italic paragraph |
| Bullet point 1-3 | Three vision points with checkmarks |

### Mission Card

| Admin Field | Frontend Element |
|------------|------------------|
| Icon | Target icon in gradient circle |
| Title | "Mission" |
| Description | Paragraph |
| Mission areas | 5 areas with dots (Education, Health, etc.) |

### Core Values (6 Cards)

| Admin Field | Frontend Element |
|------------|------------------|
| Value 1-6 | Individual cards with icon, title, description |
| Order number | Large number (1-6) |
| Icon | Colored icon in circle |

### Legal Information Table

| Admin Field | Frontend Element |
|------------|------------------|
| Registration details | Table with 6 rows (Legal Name, Reg. No., Date, etc.) |

### Board Members

| Admin Field | Frontend Element |
|------------|------------------|
| Member 1-6 | Cards with name, role, location |
| Photo | Member photo (optional) |
| Sort order | Card position |

### Advisory Committee

| Admin Field | Frontend Element |
|------------|------------------|
| Member 1-3 | Cards with name, role |

### International Network

| Admin Field | Frontend Element |
|------------|------------------|
| Country 1-11 | Pill-shaped country badges with globe icon |

---

## 📚 PROGRAMS PAGE CONTROLS → `Programs.tsx`

### Program Categories (5)

| Admin Category | Frontend Tab |
|---------------|-------------|
| Education | Blue tab with 5 programs |
| Health | Rose tab with 5 programs |
| Environment | Green tab with 5 programs |
| Empowerment | Amber tab with 5 programs |
| Community | Violet tab with 5 programs |

### Each Program (25 Total)

| Admin Field | Frontend Element |
|------------|------------------|
| Title | Large heading on card |
| Subtitle | Small badge text |
| Icon | Icon in colored circle |
| Objective | Blue box with Target icon |
| Challenges (list) | Amber box with AlertTriangle icon |
| Solutions (list) | Blue box with Lightbulb icon + checkmarks |
| Outcomes (list) | Green box with TrendingUp icon |
| Stats (1-2) | Small stat boxes on collapsed view |
| Color scheme | Card gradient background |
| Status | Draft vs Published visibility |

**Admin Actions**:
- Expand/collapse to show details
- Click tab to change category
- Add new programs
- Edit existing
- Reorder within category
- Change status (Draft/Published)

**Screenshot Location**: `/programs` page

---

## 💝 GET INVOLVED PAGE CONTROLS → `GetInvolved.tsx`

### Involvement Options (4 Cards)

| Admin Field | Frontend Element |
|------------|------------------|
| Option 1: Donate | Rose gradient card |
| Option 2: Volunteer | Blue gradient card |
| Option 3: Become a Member | Green gradient card |
| Option 4: Partner With Us | Amber gradient card |
| Icon | Large icon in colored circle |
| Title | Card heading |
| Subtitle | Small text |
| Description | Paragraph |
| Benefits (list) | 4 bullet points |
| CTA button | Action button |

### Donation Tiers (4)

| Admin Field | Frontend Element |
|------------|------------------|
| Tier 1: NPR 1000 "Supporter" | Card with amount + label + description |
| Tier 2: NPR 5000 "Champion" | Card with amount + label + description |
| Tier 3: NPR 10000 "Guardian" | Card with amount + label + description |
| Tier 4: NPR 25000 "Patron" | Card with amount + label + description |

**Screenshot Location**: `/get-involved` page

---

## 📞 CONTACT PAGE CONTROLS → `Contact.tsx`

### Contact Info Cards (4)

| Admin Field | Frontend Element |
|------------|------------------|
| Visit Us | Card with MapPin icon + address |
| Email Us | Card with Mail icon + 2 emails |
| Call Us | Card with Phone icon + 2 phone numbers |
| Office Hours | Card with Clock icon + schedule |

### Contact Form

| Admin Field | Frontend Element |
|------------|------------------|
| Form enabled/disabled | Show/hide entire form |
| Recipient email | Where submissions go (hidden) |
| Success message | Thank you message after submit |

### Form Submissions (Admin-only view)

| Admin View | Data Captured |
|-----------|---------------|
| Submissions list | Name, Email, Subject, Message, Date, IP |
| Read/Unread status | Visual indicator |
| Reply action | Email composer |

**Screenshot Location**: `/contact` page

---

## 🎨 DYNAMIC STYLING CONTROLS

### Brand Colors → Entire Website

| Admin Control | Frontend Effect | CSS Variable |
|--------------|----------------|--------------|
| Primary color | All teal elements | `--primary` |
| Secondary color | All gold/amber elements | `--secondary` |
| Accent color | Highlight colors | `--accent` |

**Where colors appear**:
- Buttons
- Icons
- Gradients
- Text highlights
- Borders
- Hover states

---

## 📊 VISIBILITY CONTROLS

### What Admins Can Hide/Show

| Content Type | Visibility Control | Frontend Effect |
|--------------|-------------------|-----------------|
| Navigation items | Toggle | Remove from menu |
| Social links | Toggle | Hide icon |
| Impact stats | Toggle | Hide stat card |
| Impact areas | Toggle | Hide area card |
| Programs | Toggle | Hide program |
| Core values | Toggle | Hide value card |
| Board members | Toggle | Hide member card |
| Countries | Toggle | Hide country badge |
| Involvement options | Toggle | Hide option card |
| Donation tiers | Toggle | Hide tier card |
| Contact info | Toggle | Hide info card |

---

## 🔄 REAL-TIME UPDATE BEHAVIOR

### How Frontend Receives Changes

**Option A: On Page Refresh**
```
Admin saves → Database updates → User refreshes page → New content loads
```

**Option B: Real-time (Optional)**
```
Admin saves → Database updates → WebSocket notifies → Frontend updates immediately
```

**Recommended**: Start with Option A (simpler), add Option B later if needed.

---

## 🎯 ADMIN WORKFLOW EXAMPLES

### Example 1: Change Hero Background Image

1. Admin logs into `/admin`
2. Navigates to **Homepage Editor** → **Hero Section**
3. Clicks "Change Background Image"
4. Uploads new image (stored in Supabase Storage)
5. Clicks "Save Changes"
6. Database updates `homepage_hero` table
7. Public visits homepage → New image loads from Storage URL

**Frontend Flow**:
```typescript
// HeroSection.tsx fetches from database
const { data: hero } = useQuery(['homepage_hero'], fetchHeroContent);

return (
  <img src={hero.background_image_url} alt="Hero" />
);
```

---

### Example 2: Add New Program

1. Admin navigates to **Programs** → **Add New**
2. Fills form:
   - Title: "Digital Literacy Program"
   - Category: Education
   - Objective: "Teach rural students computer skills"
   - Challenges: [3 items]
   - Solutions: [4 items]
   - Outcomes: [3 items]
   - Stats: "5 Computer Labs"
3. Uploads program image
4. Sets status to "Published"
5. Clicks "Save"
6. Program appears in Education tab on `/programs` page

**Frontend Flow**:
```typescript
// Programs.tsx fetches from database
const { data: programs } = useQuery(['programs', 'education'], 
  () => fetchProgramsByCategory('education')
);

programs.map(program => <ProgramCard key={program.id} program={program} />)
```

---

### Example 3: Update Contact Email

1. Admin navigates to **Settings** → **Contact Info**
2. Changes primary email from `info@...` to `contact@...`
3. Clicks "Save"
4. Database updates `site_settings` table
5. Contact page and footer now show new email

**Frontend Flow**:
```typescript
// Footer.tsx and Contact.tsx fetch from database
const { data: settings } = useQuery(['site_settings', 'contact_email']);

return (
  <a href={`mailto:${settings.value.email}`}>
    {settings.value.email}
  </a>
);
```

---

## 🚨 IMPORTANT NOTES

1. **All changes are immediate** (after page refresh)
2. **No code deployment** required for content changes
3. **Drafts don't appear** on public website
4. **Hidden items** are removed from frontend
5. **Deleted items** cannot be recovered (use Archive instead)

---

**End of Mapping Document**
