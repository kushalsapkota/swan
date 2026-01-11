# 🏗️ SWAN Foundation CMS - Complete Architecture

## 📖 Table of Contents
1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Database Design](#database-design)
4. [Admin Panel Modules](#admin-panel-modules)
5. [Implementation Plan](#implementation-plan)
6. [API Integration](#api-integration)
7. [Security & Permissions](#security--permissions)
8. [Deployment Guide](#deployment-guide)

---

## 🎯 Overview

### Purpose
Transform the hardcoded SWAN Foundation website into a fully dynamic CMS-powered platform where non-technical admins can manage all content through an intuitive admin panel.

### Technology Stack
- **Frontend**: React + TypeScript + Vite
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **UI**: Tailwind CSS + shadcn/ui
- **State**: React Query for data fetching
- **Auth**: Supabase Auth (Email/Password)

### Key Principles
✅ No frontend redesign - keep existing UI
✅ All content becomes database-driven
✅ Non-technical admin-friendly interface
✅ Modular and extensible architecture
✅ Real-time updates or on-refresh
✅ Comprehensive audit trail

---

## 🏛️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PUBLIC WEBSITE                            │
│  (React Frontend - Existing Design, Dynamic Content)        │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Home    │  │  About   │  │ Programs │  │ Contact  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        │ Fetch Content (Read-Only)
                        │
┌───────────────────────▼──────────────────────────────────────┐
│                    SUPABASE BACKEND                          │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  PostgreSQL Database (15+ Tables)                     │  │
│  │  • Site Settings  • Programs  • Team  • Content       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Supabase Storage                                      │  │
│  │  • Images  • Documents  • Media Assets                │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Row Level Security (RLS)                              │  │
│  │  • Public: Read published content                      │  │
│  │  • Admins: Full CRUD access                            │  │
│  └───────────────────────────────────────────────────────┘  │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        │ Authenticated API Calls
                        │
┌───────────────────────▼──────────────────────────────────────┐
│                    ADMIN PANEL                               │
│         (Separate React App - /admin route)                  │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Login      │  │  Dashboard   │  │   Settings   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Programs   │  │  Content     │  │    Media     │      │
│  │   Manager    │  │  Editor      │  │   Library    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└──────────────────────────────────────────────────────────────┘
```

---

## 💾 Database Design

### Table Categories

#### 1. **Core System Tables**
- `admin_users` - Admin accounts and roles
- `activity_log` - Audit trail for all changes
- `media_library` - Track uploaded files

#### 2. **Global Settings Tables**
- `site_settings` - Brand, colors, logos, contact
- `navigation_items` - Header/footer navigation
- `social_links` - Social media profiles

#### 3. **Homepage Tables**
- `homepage_hero` - Hero section content
- `cta_buttons` - Call-to-action buttons
- `impact_stats` - Live impact dashboard
- `impact_areas` - Focus areas grid

#### 4. **Content Tables**
- `programs` - Main programs (25+ items)
- `program_categories` - Program groupings
- `program_challenges` - Related to programs
- `program_solutions` - Related to programs
- `program_outcomes` - Related to programs
- `program_stats` - Program metrics

#### 5. **About Page Tables**
- `about_content` - Vision, mission, story
- `core_values` - Values cards
- `legal_info` - Registration details
- `board_members` - Team members
- `network_countries` - International presence

#### 6. **Get Involved Tables**
- `involvement_options` - Ways to contribute
- `donation_tiers` - Donation levels

#### 7. **Contact Tables**
- `contact_info` - Contact details
- `contact_form_settings` - Form configuration
- `form_submissions` - Submitted forms

### Key Relationships

```
program_categories (1) ──→ (N) programs
programs (1) ──→ (N) program_challenges
programs (1) ──→ (N) program_solutions
programs (1) ──→ (N) program_outcomes
programs (1) ──→ (N) program_stats

admin_users (1) ──→ (N) activity_log
admin_users (1) ──→ (N) media_library
```

---

## 🎛️ Admin Panel Modules

### Module 1: Dashboard (Overview)
**Path**: `/admin`

**Features**:
- Welcome message & quick stats
- Recent activity feed
- Quick actions (Add Program, Edit Hero, etc.)
- Pending form submissions count
- System health indicators

**Widgets**:
```typescript
- Total Programs (published vs draft)
- Form Submissions (unread)
- Recent Edits (last 10 activities)
- Storage Usage
- Quick Links (to main modules)
```

---

### Module 2: Global Site Settings
**Path**: `/admin/settings`

**Tabs**:
1. **Branding**
   - Logo upload
   - Site name (EN & Nepali)
   - Tagline
   - Favicon
   
2. **Colors**
   - Primary color picker
   - Secondary color picker
   - Accent color picker
   - Live preview
   
3. **Contact Info**
   - Email addresses
   - Phone numbers
   - Physical address
   - Office hours
   
4. **Social Media**
   - Platform links (FB, IG, LinkedIn, Twitter, YouTube)
   - Toggle visibility per platform
   
5. **SEO**
   - Default meta title
   - Default meta description
   - Keywords

**UI Components**:
- Color pickers with hex input
- Image upload with preview
- Real-time validation
- "Save Changes" button with loading state

---

### Module 3: Homepage Content Manager
**Path**: `/admin/homepage`

**Sections** (Each editable independently):

1. **Hero Section**
   ```typescript
   Fields:
   - Badge text (input)
   - Main title (input)
   - Nepali subtitle (input)
   - Tagline parts (array of inputs)
   - Description (textarea)
   - Background image (upload)
   - CTAs (sortable list with add/remove)
   ```

2. **Impact Dashboard**
   ```typescript
   - Section title/description
   - Stats cards (add/edit/delete/reorder)
     - Label
     - Value
     - Icon selector
     - Visibility toggle
   ```

3. **Impact Areas**
   ```typescript
   - Section title/description
   - Areas grid (add/edit/delete/reorder)
     - Title
     - Description
     - Icon selector
     - Color scheme
   ```

4. **About Preview**
   ```typescript
   - Section content
   - Featured image
   - Timeline items
   ```

5. **Featured Programs**
   ```typescript
   - Select programs to feature (dropdown)
   - Reorder featured programs
   ```

6. **CTA Section**
   ```typescript
   - Main title/description
   - CTA actions (add/edit/delete)
   - Trust indicators (edit)
   ```

---

### Module 4: Programs Management (Full CMS)
**Path**: `/admin/programs`

**List View**:
```typescript
Table Columns:
- Thumbnail
- Title
- Category
- Status (Draft/Published)
- Last Modified
- Actions (Edit/Delete/Duplicate)

Filters:
- By Category
- By Status
- Search by title

Actions:
- "Add New Program" button
- Bulk actions (Publish/Archive)
```

**Edit/Create Program Form**:
```typescript
Sections:
1. Basic Info
   - Title
   - Subtitle
   - Slug (auto-generate from title)
   - Category (dropdown)
   - Featured image (upload)
   - Icon selector

2. Content
   - Objective (textarea)
   - Challenges (repeatable list)
   - Solutions (repeatable list)
   - Outcomes (repeatable list)

3. Statistics
   - Add stat (label + value + icon)
   - Multiple stats per program

4. Styling
   - Color scheme selector
   - Gradient options

5. SEO & Settings
   - Meta title
   - Meta description
   - Status (Draft/Published)
   - Visibility toggle
   - Sort order

Actions:
- Save as Draft
- Publish
- Preview (opens frontend in new tab)
- Delete (with confirmation)
```

---

### Module 5: About Page Manager
**Path**: `/admin/about`

**Sections**:
1. Hero Content
2. Vision Card
3. Mission Card
4. Core Values (add/edit/reorder)
5. Legal Information (table editor)
6. Team Management
   - Board Members
   - Advisory Committee
7. International Network (country list)

**Team Member Form**:
```typescript
- Name
- Role
- Location (optional)
- Bio (optional)
- Photo upload
- Member type (Board/Advisory)
- Sort order
- Visibility
```

---

### Module 6: Get Involved Manager
**Path**: `/admin/get-involved`

**Sections**:
1. Hero Content
2. Involvement Options
   - Donate, Volunteer, Member, Partner
   - Each with full details
3. Donation Tiers
   - Amount, Label, Description
   - Add/Edit/Delete tiers

---

### Module 7: Contact Manager
**Path**: `/admin/contact`

**Features**:
1. **Contact Information Cards**
   - Edit address, emails, phones, hours
   
2. **Form Settings**
   - Enable/Disable form
   - Recipient email
   - Success message
   - Field configuration (future)

3. **Form Submissions**
   ```typescript
   Table View:
   - Name, Email, Subject, Date
   - Read/Unread status
   - Quick reply action
   - Mark as spam
   - Delete
   
   Detail View:
   - Full message
   - IP address
   - User agent
   - Reply functionality
   ```

---

### Module 8: Media Library
**Path**: `/admin/media`

**Features**:
- Upload images/documents
- Grid view with thumbnails
- Search/filter by type
- View details (dimensions, size, type)
- Edit alt text and caption
- Delete files
- Copy URL to clipboard

**Upload Options**:
- Drag & drop
- Multiple file selection
- Progress indicators
- Auto-generate thumbnails

---

### Module 9: Navigation Manager
**Path**: `/admin/navigation`

**Features**:
- Visual tree of navigation items
- Drag-and-drop reordering
- Add new items
- Edit existing items
  - Name
  - Path
  - Parent (for dropdowns)
  - Icon
  - Visibility
  - Location (Header/Footer/Both)

---

### Module 10: Activity Log & Audit
**Path**: `/admin/activity`

**Features**:
- Filterable activity feed
  - By user
  - By action type (Create/Update/Delete)
  - By entity type (Program/Settings/etc.)
  - By date range
- View change details (before/after)
- Export log as CSV

---

## 🔐 Security & Permissions

### User Roles

**1. Super Admin**
- Full access to everything
- Can manage other admin users
- Can delete programs and content
- Access to activity log

**2. Content Editor**
- Can create/edit content
- Can upload media
- Cannot delete programs
- Cannot access user management
- Cannot change site settings (branding/colors)

**3. Viewer (Future)**
- Read-only access
- Can view activity log
- Cannot make changes

### Row Level Security (RLS)

**Public Users** (Website Visitors):
```sql
✅ READ: Published programs, visible content
❌ WRITE: None
```

**Authenticated Admins**:
```sql
✅ READ: Everything
✅ WRITE: Based on role
✅ DELETE: Super admin only (for sensitive data)
```

### Implementation with Supabase

```typescript
// Check if user is admin
const { data, error } = await supabase.rpc('is_admin');

// Check if user is super admin
const { data, error } = await supabase.rpc('is_super_admin');
```

---

## 🔌 API Integration Strategy

### Frontend Data Fetching

**Option 1: React Query** (Recommended)
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

// Fetch programs
export function usePrograms() {
  return useQuery({
    queryKey: ['programs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('programs')
        .select('*, program_category(*), program_stats(*)')
        .eq('status', 'published')
        .eq('is_visible', true)
        .order('sort_order');
      
      if (error) throw error;
      return data;
    },
  });
}

// Update program
export function useUpdateProgram() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }) => {
      const { data, error } = await supabase
        .from('programs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
    },
  });
}
```

**Option 2: Direct Supabase Client**
```typescript
// In component
useEffect(() => {
  fetchHeroContent();
}, []);

async function fetchHeroContent() {
  const { data, error } = await supabase
    .from('homepage_hero')
    .select('*')
    .eq('is_active', true)
    .single();
  
  if (data) setHeroContent(data);
}
```

### Real-time Updates (Optional)

```typescript
// Subscribe to changes
useEffect(() => {
  const channel = supabase
    .channel('programs_changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'programs' },
      (payload) => {
        console.log('Change received!', payload);
        queryClient.invalidateQueries({ queryKey: ['programs'] });
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

---

## 📂 File Structure

```
ngo/
├── src/
│   ├── pages/
│   │   ├── Index.tsx                 # Homepage (fetch from DB)
│   │   ├── About.tsx                 # About page (fetch from DB)
│   │   ├── Programs.tsx              # Programs page (fetch from DB)
│   │   ├── GetInvolved.tsx          # Get Involved (fetch from DB)
│   │   ├── Contact.tsx               # Contact page (fetch from DB)
│   │   └── admin/                    # 👉 NEW: Admin Panel
│   │       ├── AdminLayout.tsx
│   │       ├── Dashboard.tsx
│   │       ├── Login.tsx
│   │       ├── settings/
│   │       │   ├── GlobalSettings.tsx
│   │       │   ├── BrandingTab.tsx
│   │       │   ├── ColorsTab.tsx
│   │       │   └── ContactTab.tsx
│   │       ├── homepage/
│   │       │   ├── HomepageEditor.tsx
│   │       │   ├── HeroEditor.tsx
│   │       │   └── ImpactStatsEditor.tsx
│   │       ├── programs/
│   │       │   ├── ProgramsList.tsx
│   │       │   ├── ProgramEditor.tsx
│   │       │   └── CategoryManager.tsx
│   │       ├── about/
│   │       │   ├── AboutEditor.tsx
│   │       │   ├── TeamManager.tsx
│   │       │   └── CoreValuesEditor.tsx
│   │       ├── media/
│   │       │   └── MediaLibrary.tsx
│   │       └── activity/
│   │           └── ActivityLog.tsx
│   ├── components/
│   │   ├── home/                     # Updated to fetch from DB
│   │   ├── layout/                   # Updated to fetch from DB
│   │   └── admin/                    # 👉 NEW: Admin Components
│   │       ├── Sidebar.tsx
│   │       ├── TopBar.tsx
│   │       ├── forms/
│   │       │   ├── RichTextEditor.tsx
│   │       │   ├── ImageUpload.tsx
│   │       │   ├── IconPicker.tsx
│   │       │   └── ColorPicker.tsx
│   │       └── tables/
│   │           ├── DataTable.tsx
│   │           └── SortableList.tsx
│   ├── lib/
│   │   ├── supabase.ts               # 👉 NEW: Supabase client
│   │   ├── hooks/                    # 👉 NEW: Custom hooks
│   │   │   ├── usePrograms.ts
│   │   │   ├── useSiteSettings.ts
│   │   │   └── useAuth.ts
│   │   └── utils.ts
│   └── types/
│       └── database.ts               # 👉 NEW: TypeScript types
├── supabase/
│   ├── schema.sql                    # ✅ Created
│   ├── seed.sql                      # ✅ Created
│   ├── migrations/
│   └── config.toml
└── docs/
    ├── CONTENT_MAPPING.md            # ✅ Created
    └── ADMIN_ARCHITECTURE.md         # ✅ This file
```

---

## 🚀 Implementation Plan (Step-by-Step)

### Phase 1: Supabase Setup (Week 1)
1. Create Supabase project
2. Run schema.sql
3. Run seed.sql
4. Create storage buckets
5. Test RLS policies
6. Create first admin user

### Phase 2: Frontend Integration (Week 2-3)
1. Install Supabase client
2. Create data fetching hooks
3. Update homepage components to fetch from DB
4. Update other pages
5. Test all pages with database content

### Phase 3: Admin Panel Structure (Week 4)
1. Create admin routing (/admin)
2. Build login page
3. Build admin layout (sidebar, topbar)
4. Create dashboard page
5. Implement auth middleware

### Phase 4: Admin Modules (Week 5-7)
1. Global Settings module
2. Homepage Editor
3. Programs Manager
4. About Page Editor
5. Media Library
6. Activity Log

### Phase 5: Testing & Polish (Week 8)
1. Test all CRUD operations
2. Test permissions
3. Test image uploads
4. Performance optimization
5. Bug fixes
6. Documentation

### Phase 6: Deployment (Week 9)
1. Deploy to production
2. Train admins
3. Monitor and support

---

## 📝 Next Steps for Implementation

### Immediate Actions:

1. **Set up Supabase Project**
   ```bash
   # Create project on supabase.com
   # Get API keys and URL
   # Install Supabase CLI (optional)
   ```

2. **Install Dependencies**
   ```bash
   npm install @supabase/supabase-js
   npm install @tanstack/react-query
   ```

3. **Create Supabase Client**
   ```typescript
   // src/lib/supabase.ts
   import { createClient } from '@supabase/supabase-js';
   
   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
   const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
   
   export const supabase = createClient(supabaseUrl, supabaseAnonKey);
   ```

4. **Run Database Scripts**
   - Execute schema.sql in Supabase SQL Editor
   - Execute seed.sql to populate initial data

5. **Start Building Admin Pages**
   - Create AdminLayout component
   - Build login page
   - Implement protected routes

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**End of Architecture Document**
