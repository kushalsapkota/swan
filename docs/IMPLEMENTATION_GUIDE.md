# 🚀 SWAN Foundation CMS - Implementation Guide

## Quick Start Checklist

- [ ] Create Supabase project
- [ ] Run database schema
- [ ] Install dependencies
- [ ] Configure environment variables
- [ ] Create Supabase client
- [ ] Build admin login
- [ ] Update frontend to fetch from database
- [ ] Test all features

---

## Step 1: Create Supabase Project

### 1.1 Sign Up & Create Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create new organization
4. Create new project:
   - **Name**: swan-foundation
   - **Database Password**: (save this securely!)
   - **Region**: Southeast Asia (Singapore) - closest to Nepal
5. Wait for project to provision (~2 minutes)

### 1.2 Get API Keys

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhb...` (safe to use in frontend)
   - **service_role key**: `eyJhb...` (SECRET - never expose!)

---

## Step 2: Set Up Database

### 2.1 Run Schema

1. Go to **SQL Editor** in Supabase dashboard
2. Create new query
3. Copy entire contents of `supabase/schema.sql`
4. Click **RUN**
5. Verify no errors

### 2.2 Run Seed Data

1. Create another new query
2. Copy entire contents of `supabase/seed.sql`
3. Click **RUN**
4. Verify tables are populated:
   - Go to **Table Editor**
   - Check `site_settings`, `programs`, etc.

### 2.3 Create Storage Buckets

1. Go to **Storage**
2. Create buckets:
   - **`images`** - Public bucket
     - Allowed file types: image/png, image/jpeg, image/webp
     - Max file size: 5MB
   - **`documents`** - Public bucket
     - Allowed file types: application/pdf
     - Max file size: 10MB
3. Set policies to allow public READ, authenticated WRITE

---

## Step 3: Install Dependencies

```bash
# Install Supabase client
npm install @supabase/supabase-js

# Install React Query for data fetching
npm install @tanstack/react-query

# Install React Query Devtools (optional, for debugging)
npm install @tanstack/react-query-devtools

# Install React Hook Form (for admin forms)
npm install react-hook-form

# Install Zod (for form validation)
npm install zod @hookform/resolvers

# Install additional UI components if needed
npm install react-dropzone # for file uploads
npm install date-fns # for date formatting
```

---

## Step 4: Configure Environment

### 4.1 Create Environment File

Create `.env.local` in project root:

```env
# Supabase
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...your-anon-key

# Optional: For server-side operations (if needed)
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...your-service-role-key
```

### 4.2 Add to .gitignore

Ensure `.env.local` is in `.gitignore`:

```gitignore
# Environment variables
.env.local
.env.production.local
.env.development.local
```

---

## Step 5: Create Supabase Client

### 5.1 Create Client File

**File**: `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Helper function to check if user is authenticated
export async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

// Helper function to sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
```

### 5.2 Generate TypeScript Types (Optional but Recommended)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref xxxxx

# Generate types
supabase gen types typescript --linked > src/types/database.ts
```

This creates TypeScript definitions for all your database tables!

---

## Step 6: Set Up React Query

### 6.1 Configure Query Client

**File**: `src/App.tsx`

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app */}
      <BrowserRouter>
        <Routes>
          {/* ... routes */}
        </Routes>
      </BrowserRouter>
      
      {/* Dev tools - only in development */}
      {import.meta.env.DEV && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}

export default App;
```

---

## Step 7: Create Data Fetching Hooks

### 7.1 Site Settings Hook

**File**: `src/lib/hooks/useSiteSettings.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useSiteSettings(key?: string) {
  return useQuery({
    queryKey: key ? ['site_settings', key] : ['site_settings'],
    queryFn: async () => {
      let query = supabase.from('site_settings').select('*');
      
      if (key) {
        query = query.eq('key', key).single();
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });
}

// Usage in component:
// const { data: siteName } = useSiteSettings('site_name');
// const { data: allSettings } = useSiteSettings();
```

### 7.2 Programs Hook

**File**: `src/lib/hooks/usePrograms.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

// Fetch all published programs
export function usePrograms(categorySlug?: string) {
  return useQuery({
    queryKey: categorySlug ? ['programs', categorySlug] : ['programs'],
    queryFn: async () => {
      let query = supabase
        .from('programs')
        .select(`
          *,
          category:program_categories(*),
          challenges:program_challenges(*),
          solutions:program_solutions(*),
          outcomes:program_outcomes(*),
          stats:program_stats(*)
        `)
        .eq('status', 'published')
        .eq('is_visible', true)
        .order('sort_order');
      
      if (categorySlug) {
        query = query.eq('program_categories.slug', categorySlug);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });
}

// Fetch single program by slug
export function useProgram(slug: string) {
  return useQuery({
    queryKey: ['program', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('programs')
        .select(`
          *,
          category:program_categories(*),
          challenges:program_challenges(*),
          solutions:program_solutions(*),
          outcomes:program_outcomes(*),
          stats:program_stats(*)
        `)
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
}

// Create new program (admin only)
export function useCreateProgram() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (program: any) => {
      const { data, error } = await supabase
        .from('programs')
        .insert(program)
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

// Update program (admin only)
export function useUpdateProgram() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const { data, error } = await supabase
        .from('programs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      queryClient.invalidateQueries({ queryKey: ['program', data.slug] });
    },
  });
}

// Delete program (admin only)
export function useDeleteProgram() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
    },
  });
}
```

### 7.3 Impact Stats Hook

**File**: `src/lib/hooks/useImpactStats.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useImpactStats() {
  return useQuery({
    queryKey: ['impact_stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('impact_stats')
        .select('*')
        .eq('is_visible', true)
        .order('sort_order');
      
      if (error) throw error;
      return data;
    },
  });
}
```

### 7.4 Homepage Hero Hook

**File**: `src/lib/hooks/useHomepageHero.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useHomepageHero() {
  return useQuery({
    queryKey: ['homepage_hero'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('homepage_hero')
        .select('*')
        .eq('is_active', true)
        .single();
      
      if (error) throw error;
      return data;
    },
  });
}
```

---

## Step 8: Update Frontend Components

### 8.1 Update HeroSection.tsx

**Before** (Hardcoded):
```typescript
<h1 className="font-serif text-3xl">
  <span className="text-foreground">SWAN </span>
  <span className="gradient-text">FOUNDATION</span>
</h1>
```

**After** (Database-driven):
```typescript
import { useHomepageHero } from '@/lib/hooks/useHomepageHero';

export default function HeroSection() {
  const { data: hero, isLoading } = useHomepageHero();
  
  if (isLoading) return <HeroSkeleton />;
  if (!hero) return null;
  
  return (
    <section className="relative min-h-screen">
      <motion.div className="absolute inset-0">
        <img
          src={hero.background_image_url || heroBg}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      <div className="relative z-10 container-wide">
        <motion.div className="inline-flex items-center">
          <span className="font-medium">{hero.badge_text}</span>
        </motion.div>
        
        <motion.h1 className="font-serif text-3xl">
          {hero.main_title}
        </motion.h1>
        
        <motion.p className="text-lg">
          {hero.subtitle_nepali}
        </motion.p>
        
        {/* Parse tagline array */}
        {hero.tagline && JSON.parse(hero.tagline as any).map((line: string, i: number) => (
          <span key={i}>{line}</span>
        ))}
        
        <motion.p>{hero.description}</motion.p>
        
        {/* CTAs fetched separately */}
        <CTAButtons section="hero" />
      </div>
    </section>
  );
}
```

### 8.2 Update ImpactDashboard.tsx

**Before** (Hardcoded array):
```typescript
const stats = [
  { icon: Calendar, value: 'Oct 2025', label: 'Established' },
  // ...
];
```

**After** (Database-driven):
```typescript
import { useImpactStats } from '@/lib/hooks/useImpactStats';
import * as Icons from 'lucide-react';

export default function ImpactDashboard() {
  const { data: stats, isLoading } = useImpactStats();
  
  if (isLoading) return <Skeleton />;
  
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="grid grid-cols-5 gap-6">
          {stats?.map((stat) => {
            const Icon = Icons[stat.icon as keyof typeof Icons] as any;
            
            return (
              <StatCard
                key={stat.id}
                icon={Icon}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

### 8.3 Update Programs.tsx

**Before** (Hardcoded programs array):
```typescript
const educationPrograms = [
  { id: 'school-support', title: '...', ... },
  // ...
];
```

**After** (Database-driven):
```typescript
import { usePrograms } from '@/lib/hooks/usePrograms';

export default function Programs() {
  const [activeCategory, setActiveCategory] = useState('education');
  const { data: programs, isLoading } = usePrograms(activeCategory);
  
  if (isLoading) return <ProgramsSkeleton />;
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24">
        {/* Category tabs */}
        <div className="flex gap-4">
          {categories.map(cat => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={activeCategory === cat.slug ? 'active' : ''}
            >
              {cat.name}
            </button>
          ))}
        </div>
        
        {/* Programs list */}
        <div className="space-y-8">
          {programs?.map(program => (
            <ProgramCard
              key={program.id}
              program={program}
              challenges={program.challenges}
              solutions={program.solutions}
              outcomes={program.outcomes}
              stats={program.stats}
            />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
```

---

## Step 9: Create Admin Authentication

### 9.1 Create Auth Context

**File**: `src/contexts/AuthContext.tsx`

```typescript
import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  adminUser: any | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchAdminUser(session.user.id);
      }
      setIsLoading(false);
    });
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchAdminUser(session.user.id);
        } else {
          setAdminUser(null);
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, []);
  
  async function fetchAdminUser(userId: string) {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .single();
    
    if (!error && data) {
      setAdminUser(data);
    }
  }
  
  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
  }
  
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
  
  return (
    <AuthContext.Provider value={{ user, adminUser, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

### 9.2 Wrap App with AuthProvider

**File**: `src/App.tsx`

```typescript
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
```

### 9.3 Create Protected Route Component

**File**: `src/components/admin/ProtectedRoute.tsx`

```typescript
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, adminUser, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (!user || !adminUser) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  if (!adminUser.is_active) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1>Account Inactive</h1>
          <p>Your admin account has been deactivated. Please contact support.</p>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
}
```

### 9.4 Create Admin Login Page

**File**: `src/pages/admin/Login.tsx`

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await signIn(email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md">
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold">SWAN Foundation</h1>
            <p className="text-muted-foreground">Admin Panel</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@swanfoundation.org"
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}
            
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
```

---

## Step 10: Build Admin Layout

### 10.1 Create Admin Layout Component

**File**: `src/pages/admin/AdminLayout.tsx`

```typescript
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { AdminTopBar } from '@/components/admin/TopBar';

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <AdminTopBar />
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

### 10.2 Create Sidebar Component

**File**: `src/components/admin/Sidebar.tsx`

```typescript
import { Link, useLocation } from 'react-router-dom';
import {
  Home, Settings, FileText, Image, Activity, Users,
  LayoutDashboard, Mail, Globe
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Settings, label: 'Site Settings', path: '/admin/settings' },
  { icon: Home, label: 'Homepage', path: '/admin/homepage' },
  { icon: FileText, label: 'Programs', path: '/admin/programs' },
  { icon: Users, label: 'About', path: '/admin/about' },
  { icon: Globe, label: 'Get Involved', path: '/admin/get-involved' },
  { icon: Mail, label: 'Contact', path: '/admin/contact' },
  { icon: Image, label: 'Media Library', path: '/admin/media' },
  { icon: Activity, label: 'Activity Log', path: '/admin/activity' },
];

export function AdminSidebar() {
  const location = useLocation();
  
  return (
    <aside className="w-64 bg-card border-r border-border">
      <div className="p-6">
        <h1 className="text-2xl font-serif font-bold">SWAN CMS</h1>
      </div>
      
      <nav className="px-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg mb-1
                transition-colors
                ${isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
```

### 10.3 Create Top Bar Component

**File**: `src/components/admin/TopBar.tsx`

```typescript
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

export function AdminTopBar() {
  const { adminUser, signOut } = useAuth();
  
  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold">Welcome back, {adminUser?.full_name}</h2>
        <p className="text-sm text-muted-foreground">{adminUser?.role}</p>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm">
          <User className="w-4 h-4 mr-2" />
          Profile
        </Button>
        <Button variant="ghost" size="sm" onClick={signOut}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </header>
  );
}
```

---

## Step 11: Create Admin Dashboard

**File**: `src/pages/admin/Dashboard.tsx`

```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { FileText, Mail, Activity, Image } from 'lucide-react';

export default function AdminDashboard() {
  // Fetch stats
  const { data: programsCount } = useQuery({
    queryKey: ['programs_count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('programs')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    },
  });
  
  const { data: submissionsCount } = useQuery({
    queryKey: ['submissions_count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('form_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false);
      return count || 0;
    },
  });
  
  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-8">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={FileText}
          label="Total Programs"
          value={programsCount}
          color="bg-blue-500"
        />
        <StatCard
          icon={Mail}
          label="Unread Submissions"
          value={submissionsCount}
          color="bg-green-500"
        />
        <StatCard
          icon={Image}
          label="Media Files"
          value={0}
          color="bg-purple-500"
        />
        <StatCard
          icon={Activity}
          label="Recent Activities"
          value={0}
          color="bg-orange-500"
        />
      </div>
      
      {/* Recent Activity */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        {/* Activity feed */}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="glass-card p-6">
      <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
```

---

## Step 12: Test Everything

### 12.1 Create First Admin User

In Supabase dashboard:

1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Create user with email/password
4. Note the user's UUID

Then in **SQL Editor**:

```sql
-- Insert admin user record
INSERT INTO admin_users (user_id, role, full_name, email)
VALUES (
  'uuid-from-auth-users', 
  'super_admin', 
  'Admin Name', 
  'admin@swanfoundation.org.np'
);
```

### 12.2 Test Login

1. Run dev server: `npm run dev`
2. Navigate to `http://localhost:5173/admin/login`
3. Sign in with admin credentials
4. Should redirect to `/admin` dashboard

### 12.3 Test Data Fetching

1. Visit homepage: `http://localhost:5173`
2. Open browser DevTools → Network tab
3. Refresh page
4. Should see Supabase API calls fetching data
5. Verify content appears from database

### 12.4 Test Admin CRUD

1. Go to `/admin/programs`
2. Try creating a new program
3. Verify it saves to database
4. Check if it appears on public `/programs` page
5. Try editing and deleting

---

## Step 13: Deploy to Production

### 13.1 Environment Variables

Set production environment variables:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

### 13.2 Build & Deploy

```bash
# Build for production
npm run build

# Deploy to your hosting (Vercel, Netlify, etc.)
vercel --prod
# or
netlify deploy --prod
```

### 13.3 Post-Deployment Checks

- [ ] Test all public pages load correctly
- [ ] Test admin login works
- [ ] Test image uploads to Supabase Storage
- [ ] Test creating/editing content
- [ ] Verify changes appear on public site
- [ ] Check mobile responsiveness
- [ ] Test all forms
- [ ] Verify analytics tracking (if implemented)

---

## 🎉 Congratulations!

You now have a fully functional CMS for the SWAN Foundation website!

### What you've built:
✅ Database-driven content management
✅ Secure admin panel with authentication
✅ Role-based access control
✅ Media library
✅ Real-time or on-refresh updates
✅ Audit trail
✅ Mobile-responsive design

### Next steps:
- Train admins on how to use the CMS
- Set up regular database backups
- Monitor performance
- Add more features as needed
- Consider implementing real-time subscriptions
- Add email notifications for form submissions

---

**Need Help?**
- Supabase Discord: https://discord.supabase.com
- React Query Docs: https://tanstack.com/query/latest
- Project GitHub: [Your repo]

**Happy Building! 🚀**
