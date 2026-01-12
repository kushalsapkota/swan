import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Users, UserPlus, Clock, HeartHandshake, Send } from 'lucide-react';

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

const VOLUNTEER_STORAGE_KEY = 'swan_volunteers';

const interestAreas = [
  'Education & Tutoring',
  'Health & Wellbeing',
  'Community Outreach',
  'Fundraising & Events',
  'Operations & Admin',
  'Wherever Needed Most',
];

const availabilityOptions = [
  'Weekdays (Daytime)',
  'Weekdays (Evening)',
  'Weekends',
  'Remote / Online',
  'Flexible',
];

export default function Volunteer() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    interestArea: '',
    availability: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.interestArea || !form.availability) {
      toast({
        title: 'Missing information',
        description: 'Please fill in your name, email, interest area and availability.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      const existingRaw = window.localStorage.getItem(VOLUNTEER_STORAGE_KEY);
      const existing: Volunteer[] = existingRaw ? JSON.parse(existingRaw) : [];

      const newVolunteer: Volunteer = {
        id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        interestArea: form.interestArea,
        availability: form.availability,
        message: form.message.trim() || undefined,
        createdAt: new Date().toISOString(),
      };

      window.localStorage.setItem(VOLUNTEER_STORAGE_KEY, JSON.stringify([newVolunteer, ...existing]));

      setForm({
        name: '',
        email: '',
        phone: '',
        interestArea: '',
        availability: '',
        message: '',
      });

      toast({
        title: 'Thank you for volunteering!',
        description: 'We have received your details and will reach out to you soon.',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Something went wrong',
        description: 'We could not save your volunteer details. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Be a Volunteer</span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-4 sm:mb-6 leading-tight px-4">
                Stand With Us, <span className="gradient-text">Serve With Heart</span>
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed px-4">
                Join our community of changemakers. Share your time, skills, and passion to uplift communities in
                Nepal.
              </p>
            </div>
          </div>
        </section>

        {/* Info + Form */}
        <section className="section-padding">
          <div className="container-wide grid lg:grid-cols-2 gap-6 sm:gap-10 px-4 sm:px-0">
            {/* Why volunteer */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 sm:p-8"
              >
                <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2 mb-4 text-primary">
                  <Users className="w-5 h-5" />
                  <span className="text-xs sm:text-sm font-medium uppercase tracking-wide">
                    Volunteer Opportunities
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-3">How you can contribute</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-4">
                  We welcome volunteers from diverse backgrounds – students, professionals, and anyone with a heart to
                  serve. You can support us on the ground in Kathmandu or remotely.
                </p>
                <ul className="space-y-3 text-sm sm:text-base">
                  <li className="flex gap-3">
                    <UserPlus className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Mentor children and youth through education and leadership programs.</span>
                  </li>
                  <li className="flex gap-3">
                    <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Support short-term events, health camps, and awareness campaigns.</span>
                  </li>
                  <li className="flex gap-3">
                    <HeartHandshake className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Contribute your professional skills in design, media, fundraising, or management.</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card p-6 sm:p-8 lg:p-10"
            >
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold mb-2">Volunteer Application</h2>
              <p className="text-muted-foreground text-sm sm:text-base mb-6">
                Fill in your details below and our team will connect with you to explore the best way to engage.
              </p>

              <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+977-98XXXXXXXX"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="interestArea" className="block text-sm font-medium mb-1.5">
                      Area of Interest *
                    </label>
                    <select
                      id="interestArea"
                      name="interestArea"
                      value={form.interestArea}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                    >
                      <option value="">Select an option</option>
                      {interestAreas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium mb-1.5">
                      Availability *
                    </label>
                    <select
                      id="availability"
                      name="availability"
                      value={form.availability}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                    >
                      <option value="">Select an option</option>
                      {availabilityOptions.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                    Tell us about yourself
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Share your background, skills, and why you’d like to volunteer with SWAN Foundation."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full sm:w-auto" disabled={submitting}>
                  <Send className="w-4 h-4" />
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

