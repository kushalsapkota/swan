import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Heart, Send } from 'lucide-react';

type Donation = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  amount: number;
  currency: string;
  earmark: string;
  message?: string;
  createdAt: string;
};

const DONATION_STORAGE_KEY = 'swan_donations';
const earmarkOptions = ['General', 'Education', 'Health', 'Environment', 'Empowerment', 'Community'];

export default function Donate() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    currency: 'NPR',
    earmark: 'Environment',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNumber = Number(form.amount);
    if (!form.name.trim() || !form.email.trim() || Number.isNaN(amountNumber) || amountNumber <= 0) {
      toast({
        title: 'Missing information',
        description: 'Name, email, and a valid donation amount are required.',
        variant: 'destructive',
      });
      return;
    }
    setSubmitting(true);
    try {
      const raw = window.localStorage.getItem(DONATION_STORAGE_KEY);
      const existing: Donation[] = raw ? JSON.parse(raw) : [];
      const donation: Donation = {
        id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        amount: amountNumber,
        currency: form.currency,
        earmark: form.earmark,
        message: form.message.trim() || undefined,
        createdAt: new Date().toISOString(),
      };
      window.localStorage.setItem(DONATION_STORAGE_KEY, JSON.stringify([donation, ...existing]));
      setForm({
        name: '',
        email: '',
        phone: '',
        amount: '',
        currency: 'NPR',
        earmark: 'Environment',
        message: '',
      });
      toast({
        title: 'Thank you for your donation!',
        description: 'We have received your pledge. Our team will reach out with next steps.',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Something went wrong',
        description: 'Could not save your donation. Please try again.',
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
        <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container-wide text-center max-w-3xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary text-xs font-semibold uppercase tracking-wide">
              <Heart className="w-4 h-4" />
              Donate to SWAN Foundation
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-4 mb-3">Fuel the Mission</h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              Your contribution empowers education, health, environment, empowerment, and community development. Choose
              an earmark or give to the area of greatest need.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide max-w-3xl mx-auto px-4">
            <div className="glass-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold mb-2">Donation Form</h2>
                <p className="text-muted-foreground text-sm">
                  Fill the pledge form below. We’ll follow up with payment details and receipts.
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Full Name *</label>
                    <Input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email *</label>
                    <Input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Phone / WhatsApp</label>
                    <Input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+977-98XXXXXXXX"
                    />
                  </div>
                  <div className="grid grid-cols-[1fr,auto] gap-2">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Amount *</label>
                      <Input
                        name="amount"
                        type="number"
                        min="1"
                        step="1"
                        value={form.amount}
                        onChange={handleChange}
                        placeholder="e.g. 1000"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Currency</label>
                      <select
                        name="currency"
                        value={form.currency}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="NPR">NPR</option>
                        <option value="USD">USD</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Earmark / Focus Area</label>
                    <select
                      name="earmark"
                      value={form.earmark}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {earmarkOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Message (optional)</label>
                    <Textarea
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us anything we should know."
                    />
                  </div>
                </div>

                <Button type="submit" variant="hero" size="lg" className="gap-2" disabled={submitting}>
                  <Send className="w-4 h-4" />
                  {submitting ? 'Submitting...' : 'Submit Pledge'}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

