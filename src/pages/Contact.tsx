import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  MapPin, Mail, Phone, Clock, Send,
  Facebook, Twitter, Linkedin, Instagram, Youtube
} from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['Sitapaila, Kathmandu', 'Bagmati Province, Nepal'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['info.swanfoundation@gmail.com', 'admin@swanfoundation.org'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+977-9840292723', '+977-9864228469'],
  },
  {
    icon: Clock,
    title: 'Office Hours',
    details: ['Sunday - Friday', '10:00 AM - 5:00 PM'],
  },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Contact() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please fill in your name, email, and message.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      toast({
        title: 'Message sent',
        description: 'Thank you for reaching out. Our team will get back to you soon.',
      });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container-wide">
            <AnimatedSection className="text-center max-w-4xl mx-auto">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Contact Us</span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-4 sm:mb-6 leading-tight px-4">
                Let's Start a <span className="gradient-text">Conversation</span>
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed px-4">
                Have questions about our work or want to get involved? We'd love to hear from you.
                Reach out to us through any of the channels below.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 px-4 sm:px-0">
              {contactInfo.map((info, index) => (
                <AnimatedSection key={info.title}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="glass-card p-4 sm:p-6 text-center h-full"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-3 sm:mb-4">
                      <info.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                    </div>
                    <h3 className="font-serif text-base sm:text-lg font-semibold mb-2">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-muted-foreground text-xs sm:text-sm">{detail}</p>
                    ))}
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>

            {/* Contact Form & Map */}
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-0">
              {/* Contact Form */}
              <AnimatedSection>
                <div className="glass-card p-4 sm:p-6 lg:p-8 xl:p-10">
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Send Us a Message</h2>
                  <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <Input
                          type="text"
                          id="name"
                          placeholder="Your name"
                          value={form.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          id="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <Input
                        type="text"
                        id="subject"
                        placeholder="How can we help?"
                        value={form.subject}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        rows={5}
                        placeholder="Tell us more about your inquiry..."
                        value={form.message}
                        onChange={handleChange}
                        className="resize-none"
                      />
                    </div>
                    <Button type="submit" variant="hero" size="lg" className="w-full sm:w-auto" disabled={submitting}>
                      <Send className="w-4 h-4" />
                      {submitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </div>
              </AnimatedSection>

              {/* Map & Social */}
              <AnimatedSection>
                <div className="space-y-6 sm:space-y-8">
                  {/* Map Placeholder */}
                  <div className="glass-card overflow-hidden h-[250px] sm:h-[300px] lg:h-[350px] relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h3 className="font-serif text-xl font-semibold mb-2">Kathmandu, Nepal</h3>
                        <p className="text-muted-foreground">Interactive map coming soon</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="glass-card p-4 sm:p-6 lg:p-8">
                    <h3 className="font-serif text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Follow Us</h3>
                    <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">
                      Stay connected and follow our journey on social media.
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {socialLinks.map((social) => (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 flex items-center justify-center transition-colors"
                          aria-label={social.label}
                        >
                          <social.icon className="w-5 h-5 text-primary" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
