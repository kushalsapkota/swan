import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { ClipboardList, Trash2, Save, RefreshCw, Lock, Sparkles, Gift, LayoutTemplate } from 'lucide-react';
import {
  ADMIN_SESSION_KEY,
  defaultAdminContent,
  loadAdminContent,
  saveAdminContent,
  type AdminContent,
} from '@/lib/admin-content';

type Volunteer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  interestArea: string;
  availability: string;
  message?: string;
  createdAt: string;
};

type SiteDetails = {
  siteName: string;
  tagline: string;
  primaryContactEmail: string;
  secondaryContactEmail?: string;
  officeAddress: string;
  phonePrimary: string;
  phoneSecondary?: string;
};

const VOLUNTEER_STORAGE_KEY = 'swan_volunteers';
const SITE_DETAILS_STORAGE_KEY = 'swan_site_details';
const DONATION_STORAGE_KEY = 'swan_donations';

const defaultSiteDetails: SiteDetails = {
  siteName: 'SWAN Foundation',
  tagline: 'Storytelling for Social Change',
  primaryContactEmail: 'info.swanfoundation@gmail.com',
  secondaryContactEmail: 'admin@swanfoundation.org',
  officeAddress: 'Sitapaila, Kathmandu, Bagmati Province, Nepal',
  phonePrimary: '+977-9840292723',
  phoneSecondary: '+977-9864228469',
};

export default function AdminDashboard() {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [search, setSearch] = useState('');
  const [siteDetailsJson, setSiteDetailsJson] = useState('');
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<AdminContent | null>(null);
  const [activeProgramCategory, setActiveProgramCategory] = useState<string | null>(null);
  const [donations, setDonations] = useState<any[]>([]);

  const ADMIN_USERNAME = 'swanadmin';
  const ADMIN_PASSWORD = 'swan@2025';

  useEffect(() => {
    try {
      // Auth check
      if (typeof window !== 'undefined') {
        const session = window.localStorage.getItem(ADMIN_SESSION_KEY);
        if (session === 'true') {
          setIsAuthenticated(true);
        }
      }

      const volunteerRaw = window.localStorage.getItem(VOLUNTEER_STORAGE_KEY);
      const parsedVolunteers: Volunteer[] = volunteerRaw ? JSON.parse(volunteerRaw) : [];
      setVolunteers(parsedVolunteers);

      const siteDetailsRaw = window.localStorage.getItem(SITE_DETAILS_STORAGE_KEY);
      const parsedSiteDetails: SiteDetails = siteDetailsRaw ? JSON.parse(siteDetailsRaw) : defaultSiteDetails;
      if (!siteDetailsRaw) {
        window.localStorage.setItem(SITE_DETAILS_STORAGE_KEY, JSON.stringify(parsedSiteDetails));
      }
      setSiteDetailsJson(JSON.stringify(parsedSiteDetails, null, 2));

      const loadedContent = loadAdminContent();
      setContent(loadedContent);
      if (loadedContent.programCategories.length > 0) {
        setActiveProgramCategory(loadedContent.programCategories[0].id);
      }

      const donationsRaw = window.localStorage.getItem(DONATION_STORAGE_KEY);
      const parsedDonations = donationsRaw ? JSON.parse(donationsRaw) : [];
      setDonations(parsedDonations);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error loading admin data',
        description: 'Please check your local storage or try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      window.localStorage.setItem(ADMIN_SESSION_KEY, 'true');
      setIsAuthenticated(true);
      toast({
        title: 'Welcome back',
        description: 'You are now logged in to the admin panel.',
      });
    } else {
      toast({
        title: 'Invalid credentials',
        description: 'The admin ID or password you entered is incorrect.',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const updateContent = (updater: (prev: AdminContent) => AdminContent) => {
    setContent((prev) => {
      const base = prev ?? defaultAdminContent;
      const next = updater(base);
      saveAdminContent(next);
      return { ...next };
    });
  };

  const handleDeleteVolunteer = (id: string) => {
    const next = volunteers.filter((v) => v.id !== id);
    setVolunteers(next);
    window.localStorage.setItem(VOLUNTEER_STORAGE_KEY, JSON.stringify(next));
    toast({
      title: 'Volunteer removed',
      description: 'The volunteer entry has been deleted.',
    });
  };

  const handleClearAllVolunteers = () => {
    if (!window.confirm('Are you sure you want to remove all volunteer records?')) return;
    setVolunteers([]);
    window.localStorage.removeItem(VOLUNTEER_STORAGE_KEY);
    toast({
      title: 'All volunteer records cleared',
      description: 'You can still receive new submissions via the volunteer form.',
    });
  };

  const handleSaveSiteDetails = () => {
    try {
      const parsed = JSON.parse(siteDetailsJson) as SiteDetails;
      window.localStorage.setItem(SITE_DETAILS_STORAGE_KEY, JSON.stringify(parsed));
      toast({
        title: 'Site details updated',
        description: 'Changes have been saved in JSON format.',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Invalid JSON',
        description: 'Please check that your site details JSON is valid.',
        variant: 'destructive',
      });
    }
  };

  const handleResetSiteDetails = () => {
    window.localStorage.setItem(SITE_DETAILS_STORAGE_KEY, JSON.stringify(defaultSiteDetails));
    setSiteDetailsJson(JSON.stringify(defaultSiteDetails, null, 2));
    toast({
      title: 'Site details reset',
      description: 'Default site details have been restored.',
    });
  };

  const filteredVolunteers = volunteers.filter((v) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      v.name.toLowerCase().includes(q) ||
      v.email.toLowerCase().includes(q) ||
      (v.interestArea && v.interestArea.toLowerCase().includes(q)) ||
      (v.availability && v.availability.toLowerCase().includes(q))
    );
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 section-padding">
          <div className="container-wide flex items-center justify-center px-4">
            <Card className="max-w-md w-full glass-card border-border/60">
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-2 text-primary text-sm font-medium uppercase tracking-wide">
                  <Lock className="w-4 h-4" />
                  <span>Admin Access</span>
                </div>
                <CardTitle className="font-serif text-2xl">Sign in to Admin Panel</CardTitle>
                <CardDescription>
                  Enter your admin ID and password to manage volunteer data, focus areas, and programs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleLogin}>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" htmlFor="admin-id">
                      Admin ID
                    </label>
                    <Input
                      id="admin-id"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                      placeholder="Enter admin ID"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" htmlFor="admin-password">
                      Password
                    </label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      placeholder="Enter password"
                    />
                  </div>
                  <Button type="submit" variant="hero" className="w-full mt-2">
                    Sign In
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 section-padding pb-16">
        <div className="container-wide space-y-8 px-4 sm:px-0">
          <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-1">Admin Dashboard</h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Manage donations, volunteers, and site content for homepage, impact areas, and programs.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    const volunteerRaw = window.localStorage.getItem(VOLUNTEER_STORAGE_KEY);
                    const parsedVolunteers: Volunteer[] = volunteerRaw ? JSON.parse(volunteerRaw) : [];
                    setVolunteers(parsedVolunteers);
                    setContent(loadAdminContent());
                    const donationsRaw = window.localStorage.getItem(DONATION_STORAGE_KEY);
                    setDonations(donationsRaw ? JSON.parse(donationsRaw) : []);
                    setLoading(false);
                    toast({
                      title: 'Data refreshed',
                      description: 'Latest volunteer and site details have been loaded.',
                    });
                  }, 150);
                }}
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Data
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleLogout}
              >
                <Lock className="w-4 h-4" />
                Log Out
              </Button>
            </div>
          </header>

          {/* Donations */}
          <Card className="glass-card border-border/50">
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                  <Gift className="w-5 h-5 text-primary" />
                  Donations
                </CardTitle>
                <CardDescription>
                  Pledge submissions collected from the Donate form (stored locally under &quot;{DONATION_STORAGE_KEY}&quot;).
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {donations.length === 0 ? (
                <p className="text-sm text-muted-foreground">No donations recorded yet.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Earmark</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donations.map((d) => (
                      <TableRow key={d.id}>
                        <TableCell className="font-medium">
                          <div>{d.name}</div>
                          {d.phone && <div className="text-xs text-muted-foreground mt-0.5">{d.phone}</div>}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm break-all">{d.email}</TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          {d.currency} {Number(d.amount).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">{d.earmark}</TableCell>
                        <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                          {new Date(d.createdAt).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Volunteers card */}
          <Card className="glass-card border-border/50">
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                  <ClipboardList className="w-5 h-5 text-primary" />
                  Volunteer Submissions
                </CardTitle>
                <CardDescription>
                  Data is stored locally in your browser as JSON under the key &quot;{VOLUNTEER_STORAGE_KEY}&quot;.
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Input
                  placeholder="Search by name, email, interest..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-64"
                />
                {volunteers.length > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-2 text-destructive border-destructive/40"
                    onClick={handleClearAllVolunteers}
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-sm text-muted-foreground">Loading data...</p>
              ) : filteredVolunteers.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No volunteer submissions found yet. Once someone fills the &quot;Be a Volunteer&quot; form, entries
                  will appear here.
                </p>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Interest Area</TableHead>
                        <TableHead>Availability</TableHead>
                        <TableHead className="hidden lg:table-cell">Submitted</TableHead>
                        <TableHead className="w-[70px] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVolunteers.map((v) => (
                        <TableRow key={v.id}>
                          <TableCell className="font-medium">
                            <div>{v.name}</div>
                            {v.phone && <div className="text-xs text-muted-foreground mt-0.5">{v.phone}</div>}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm break-all">{v.email}</TableCell>
                          <TableCell className="text-xs sm:text-sm">{v.interestArea}</TableCell>
                          <TableCell className="text-xs sm:text-sm">{v.availability}</TableCell>
                          <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                            {new Date(v.createdAt).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteVolunteer(v.id)}
                              aria-label="Delete volunteer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableCaption className="text-xs">
                      Showing {filteredVolunteers.length} of {volunteers.length} volunteer records.
                    </TableCaption>
                  </Table>

                  <div className="mt-4 rounded-lg bg-muted/40 p-4 text-xs sm:text-sm text-muted-foreground">
                    <p className="font-medium mb-1">Tip</p>
                    <p>
                      To inspect or export raw JSON data, open your browser developer tools and look for the keys
                      &quot;{VOLUNTEER_STORAGE_KEY}&quot; and &quot;{SITE_DETAILS_STORAGE_KEY}&quot; under Local
                      Storage.
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Impact areas & stats editor */}
          {content && (
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Focus & Impact Configuration
                </CardTitle>
                <CardDescription>
                  Update homepage focus areas and impact stats with a graphical editor. Changes are saved instantly to
                  your browser.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Impact stats */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-base sm:text-lg">Impact Stats</h3>
                  <div className="grid gap-3">
                    {content.impactDashboard.stats.map((stat, index) => (
                      <div
                        key={stat.id}
                        className="grid grid-cols-1 md:grid-cols-[1.5fr,1.5fr,1fr,0.7fr] gap-2 items-center"
                      >
                        <Input
                          value={stat.label}
                          onChange={(e) =>
                            updateContent((prev) => {
                              const next = structuredClone(prev);
                              next.impactDashboard.stats[index].label = e.target.value;
                              return next;
                            })
                          }
                          placeholder="Label"
                        />
                        <Input
                          value={String(stat.value)}
                          onChange={(e) =>
                            updateContent((prev) => {
                              const next = structuredClone(prev);
                              next.impactDashboard.stats[index].value = e.target.value;
                              return next;
                            })
                          }
                          placeholder="Value"
                        />
                        <Input
                          value={stat.icon}
                          onChange={(e) =>
                            updateContent((prev) => {
                              const next = structuredClone(prev);
                              next.impactDashboard.stats[index].icon = e.target.value;
                              return next;
                            })
                          }
                          placeholder="Icon name (e.g. Calendar)"
                        />
                        <div className="flex gap-2">
                          <Input
                            value={stat.suffix ?? ''}
                            onChange={(e) =>
                              updateContent((prev) => {
                                const next = structuredClone(prev);
                                next.impactDashboard.stats[index].suffix = e.target.value || undefined;
                                return next;
                              })
                            }
                            placeholder="Suffix (+, %, etc.)"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            className="shrink-0 text-destructive border-destructive/40"
                            onClick={() =>
                              updateContent((prev) => {
                                const next = structuredClone(prev);
                                next.impactDashboard.stats.splice(index, 1);
                                return next;
                              })
                            }
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() =>
                      updateContent((prev) => {
                        const next = structuredClone(prev);
                        next.impactDashboard.stats.push({
                          id: `stat-${Date.now()}`,
                          icon: 'Target',
                          label: 'New Stat',
                          value: '0',
                        });
                        return next;
                      })
                    }
                  >
                    Add Stat
                  </Button>
                </div>

                {/* Impact areas */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-base sm:text-lg">Impact Areas</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {content.impactAreasSection.areas.map((area, index) => (
                      <div key={area.id} className="glass-card p-4 space-y-2">
                        <div className="flex justify-between items-center gap-2">
                          <Input
                            value={area.title}
                            onChange={(e) =>
                              updateContent((prev) => {
                                const next = structuredClone(prev);
                                next.impactAreasSection.areas[index].title = e.target.value;
                                return next;
                              })
                            }
                            placeholder="Title"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            className="shrink-0 text-destructive border-destructive/40"
                            onClick={() =>
                              updateContent((prev) => {
                                const next = structuredClone(prev);
                                next.impactAreasSection.areas.splice(index, 1);
                                return next;
                              })
                            }
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <Textarea
                          value={area.description}
                          onChange={(e) =>
                            updateContent((prev) => {
                              const next = structuredClone(prev);
                              next.impactAreasSection.areas[index].description = e.target.value;
                              return next;
                            })
                          }
                          rows={3}
                          placeholder="Description"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <Input
                            value={area.icon}
                            onChange={(e) =>
                              updateContent((prev) => {
                                const next = structuredClone(prev);
                                next.impactAreasSection.areas[index].icon = e.target.value;
                                return next;
                              })
                            }
                            placeholder="Icon name"
                          />
                          <Input
                            value={area.color}
                            onChange={(e) =>
                              updateContent((prev) => {
                                const next = structuredClone(prev);
                                next.impactAreasSection.areas[index].color = e.target.value;
                                return next;
                              })
                            }
                            placeholder="BG gradient class"
                          />
                          <Input
                            value={area.iconColor}
                            onChange={(e) =>
                              updateContent((prev) => {
                                const next = structuredClone(prev);
                                next.impactAreasSection.areas[index].iconColor = e.target.value;
                                return next;
                              })
                            }
                            placeholder="Icon color class"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() =>
                      updateContent((prev) => {
                        const next = structuredClone(prev);
                        next.impactAreasSection.areas.push({
                          id: `area-${Date.now()}`,
                          icon: 'Sparkles',
                          title: 'New Area',
                          description: 'Describe this impact area.',
                          color: 'from-primary/20 to-primary/10',
                          iconColor: 'text-primary',
                        });
                        return next;
                      })
                    }
                  >
                    Add Impact Area
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Program categories & programs editor (simplified) */}
          {content && (
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Programs Configuration
                </CardTitle>
                <CardDescription>
                  Edit program categories and add or remove programs under each category.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Categories */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-base sm:text-lg">Categories</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {content.programCategories.map((cat, index) => (
                      <div key={cat.id} className="glass-card p-3 space-y-2">
                        <div className="flex gap-2 items-center">
                          <Input
                            value={cat.label}
                            onChange={(e) =>
                              updateContent((prev) => {
                                const next = structuredClone(prev);
                                next.programCategories[index].label = e.target.value;
                                return next;
                              })
                            }
                            placeholder="Label"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            className="shrink-0 text-destructive border-destructive/40"
                            onClick={() =>
                              updateContent((prev) => {
                                const next = structuredClone(prev);
                                next.programCategories.splice(index, 1);
                                next.programs = next.programs.filter((p) => p.categoryId !== cat.id);
                                return next;
                              })
                            }
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <Input
                            value={cat.id}
                            onChange={(e) =>
                              updateContent((prev) => {
                                const next = structuredClone(prev);
                                next.programCategories[index].id = e.target.value;
                                next.programs = next.programs.map((p) =>
                                  p.categoryId === cat.id ? { ...p, categoryId: e.target.value } : p,
                                );
                                return next;
                              })
                            }
                            placeholder="ID"
                          />
                          <Input
                            value={cat.icon}
                            onChange={(e) =>
                              updateContent((prev) => {
                                const next = structuredClone(prev);
                                next.programCategories[index].icon = e.target.value;
                                return next;
                              })
                            }
                            placeholder="Icon name"
                          />
                          <Input
                            value={cat.color}
                            onChange={(e) =>
                              updateContent((prev) => {
                                const next = structuredClone(prev);
                                next.programCategories[index].color = e.target.value;
                                return next;
                              })
                            }
                            placeholder="Gradient class"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateContent((prev) => {
                        const next = structuredClone(prev);
                        const id = `category-${Date.now()}`;
                        next.programCategories.push({
                          id,
                          label: 'New Category',
                          icon: 'Sparkles',
                          color: 'from-primary to-secondary',
                          bgColor: 'bg-primary/10',
                          borderColor: 'border-primary/30',
                        });
                        return next;
                      })
                    }
                  >
                    Add Category
                  </Button>
                </div>

                {/* Programs */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h3 className="font-semibold text-base sm:text-lg">Programs</h3>
                    <div className="flex gap-2 items-center">
                      <span className="text-sm text-muted-foreground">Category:</span>
                      <select
                        className="border border-border rounded-md px-3 py-1.5 text-sm bg-background"
                        value={activeProgramCategory ?? ''}
                        onChange={(e) => setActiveProgramCategory(e.target.value || null)}
                      >
                        {content.programCategories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {activeProgramCategory && (
                    <div className="space-y-3">
                      {content.programs
                        .filter((p) => p.categoryId === activeProgramCategory)
                        .map((program, index) => {
                          const programIndex = content.programs.findIndex((p) => p.id === program.id);
                          return (
                            <div key={program.id} className="glass-card p-4 space-y-2">
                              <div className="flex gap-2 items-center">
                                <Input
                                  value={program.title}
                                  onChange={(e) =>
                                    updateContent((prev) => {
                                      const next = structuredClone(prev);
                                      next.programs[programIndex].title = e.target.value;
                                      return next;
                                    })
                                  }
                                  placeholder="Title"
                                />
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="outline"
                                  className="shrink-0 text-destructive border-destructive/40"
                                  onClick={() =>
                                    updateContent((prev) => {
                                      const next = structuredClone(prev);
                                      next.programs.splice(programIndex, 1);
                                      return next;
                                    })
                                  }
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                              <Input
                                value={program.subtitle}
                                onChange={(e) =>
                                  updateContent((prev) => {
                                    const next = structuredClone(prev);
                                    next.programs[programIndex].subtitle = e.target.value;
                                    return next;
                                  })
                                }
                                placeholder="Subtitle"
                              />
                              <Textarea
                                value={program.objective}
                                onChange={(e) =>
                                  updateContent((prev) => {
                                    const next = structuredClone(prev);
                                    next.programs[programIndex].objective = e.target.value;
                                    return next;
                                  })
                                }
                                rows={3}
                                placeholder="Objective"
                              />
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs sm:text-sm">
                                <Textarea
                                  value={program.challenges.join('\n')}
                                  onChange={(e) =>
                                    updateContent((prev) => {
                                      const next = structuredClone(prev);
                                      next.programs[programIndex].challenges = e.target.value
                                        .split('\n')
                                        .map((s) => s.trim())
                                        .filter(Boolean);
                                      return next;
                                    })
                                  }
                                  rows={3}
                                  placeholder="Challenges (one per line)"
                                />
                                <Textarea
                                  value={program.solutions.join('\n')}
                                  onChange={(e) =>
                                    updateContent((prev) => {
                                      const next = structuredClone(prev);
                                      next.programs[programIndex].solutions = e.target.value
                                        .split('\n')
                                        .map((s) => s.trim())
                                        .filter(Boolean);
                                      return next;
                                    })
                                  }
                                  rows={3}
                                  placeholder="Solutions (one per line)"
                                />
                                <Textarea
                                  value={program.outcomes.join('\n')}
                                  onChange={(e) =>
                                    updateContent((prev) => {
                                      const next = structuredClone(prev);
                                      next.programs[programIndex].outcomes = e.target.value
                                        .split('\n')
                                        .map((s) => s.trim())
                                        .filter(Boolean);
                                      return next;
                                    })
                                  }
                                  rows={3}
                                  placeholder="Outcomes (one per line)"
                                />
                              </div>
                            </div>
                          );
                        })}

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateContent((prev) => {
                            const next = structuredClone(prev);
                            const id = `program-${Date.now()}`;
                            next.programs.push({
                              id,
                              categoryId: activeProgramCategory,
                              title: 'New Program',
                              subtitle: 'Subtitle',
                              objective: 'Describe the objective of this program.',
                              challenges: [],
                              solutions: [],
                              outcomes: [],
                              icon: 'Sparkles',
                              color: 'from-primary to-secondary',
                              bgGradient:
                                'bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/20 dark:to-secondary/20',
                              stats: [],
                            });
                            return next;
                          })
                        }
                      >
                        Add Program
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Site details JSON editor */}
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                <Save className="w-5 h-5 text-primary" />
                Site Details (JSON)
              </CardTitle>
              <CardDescription>
                Edit key site information as JSON. These details are stored locally under
                &quot;{SITE_DETAILS_STORAGE_KEY}&quot; and can be wired into the public site.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={siteDetailsJson}
                onChange={(e) => setSiteDetailsJson(e.target.value)}
                rows={12}
                spellCheck={false}
                className="font-mono text-xs sm:text-sm"
              />
              <div className="flex flex-wrap gap-2 justify-end">
                <Button type="button" variant="outline" size="sm" className="gap-2" onClick={handleResetSiteDetails}>
                  <RefreshCw className="w-4 h-4" />
                  Reset to Default
                </Button>
                <Button type="button" variant="hero" size="sm" className="gap-2" onClick={handleSaveSiteDetails}>
                  <Save className="w-4 h-4" />
                  Save JSON
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

