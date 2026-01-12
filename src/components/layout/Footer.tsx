import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube, Users } from 'lucide-react';

const quickLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Programs', path: '/programs' },
  { name: 'Get Involved', path: '/get-involved' },
  { name: 'Contact', path: '/contact' },
];

const programs = [
  { name: 'Education', path: '/programs#education' },
  { name: 'Health', path: '/programs#health' },
  { name: 'Environment', path: '/programs#environment' },
  { name: 'Empowerment', path: '/programs#empowerment' },
  { name: 'Community', path: '/programs#community' },
];

const getInvolved = [
  { name: 'Donate', path: '/donate' },
  { name: 'Volunteer', path: '/volunteer' },
  { name: 'Become a Member', path: '/get-involved' },
  { name: 'Partner', path: '/get-involved' },
  { name: 'Careers', path: '/get-involved' },
];

const legalLinks = [
  { name: 'Privacy Policy', path: '#' },
  { name: 'Terms of Service', path: '#' },
  { name: 'Code of Conduct', path: '#' },
  { name: 'Annual Reports', path: '#' },
  { name: 'Governance Docs', path: '#' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-dark opacity-60" />
      <div className="absolute -left-10 -top-10 w-56 h-56 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 w-64 h-64 rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative">
        {/* Top call-to-action strip */}
        <div className="border-b border-white/10">
          <div className="container-wide px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-xs sm:text-sm uppercase tracking-[0.15em] text-white/70">Support the mission</p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">Ready to make an impact?</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/donate">
                <Button variant="hero" size="lg" className="gap-2 bg-white text-primary hover:bg-white/90">
                  Donate Now
                  <Heart className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/volunteer">
                <Button variant="heroOutline" size="lg" className="gap-2 border-white/40 text-white hover:bg-white/10">
                  Volunteer
                  <Users className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="container-wide py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-3">
                <img src="/logo.png" alt="Swan Foundation Logo" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-lg shadow-black/20" />
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-xl sm:text-2xl">SWAN FOUNDATION</span>
                  <span className="text-xs sm:text-sm opacity-80">स्वान फाउन्डेशन</span>
                </div>
              </Link>
              <p className="text-white/80 leading-relaxed text-sm sm:text-base max-w-md">
                Making a Difference • Building Futures • Creating Hope
              </p>
              <div className="flex gap-2 sm:gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links columns */}
            <div>
              <h4 className="font-serif font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-semibold text-lg mb-4">Programs</h4>
              <ul className="space-y-2.5">
                {programs.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-serif font-semibold text-lg mb-3">Get Involved</h4>
                <ul className="space-y-2.5">
                  {getInvolved.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-white/70 hover:text-white transition-colors text-sm sm:text-base"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-serif font-semibold text-lg mb-3">Contact</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-white/80 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>Ward No. 10, Kathmandu Metropolitan City, Bagmati Province, Nepal</span>
                  </li>
                  <li className="flex items-center gap-3 text-white/80 text-sm">
                    <Mail className="w-4 h-4 shrink-0" />
                    <a href="mailto:info@swanfoundation.org.np" className="hover:text-white transition-colors break-all">
                      info@swanfoundation.org.np
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-white/80 text-sm">
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>+977-9840292723</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Legal & badges */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
            <div>
              <h4 className="font-serif font-semibold text-lg mb-3">Legal & Policies</h4>
              <ul className="flex flex-wrap gap-3 text-white/70 text-sm">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-1 lg:col-span-2 flex flex-wrap gap-3 items-center text-white/70 text-sm">
              <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Registered NGO</span>
              <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Reg. No. 377033 / 82/83</span>
              <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Company Act, 2063</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 bg-black/10">
          <div className="container-wide py-4 sm:py-6 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-xs sm:text-sm text-white/60 text-center md:text-left">
              © 2025 Swan Foundation. All rights reserved. | Non-Profit Organization | Kathmandu, Nepal
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm text-white/60">
              Made with <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-accent mx-1" /> for Nepal
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
