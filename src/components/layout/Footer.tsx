import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

const quickLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Our Programs', path: '/programs' },
  { name: 'Get Involved', path: '/get-involved' },
  { name: 'Governance', path: '/about#governance' },
  { name: 'Contact', path: '/contact' },
];

const programs = [
  { name: 'Education', path: '/programs#education' },
  { name: 'Health', path: '/programs#health' },
  { name: 'Environment', path: '/programs#environment' },
  { name: 'Empowerment', path: '/programs#empowerment' },
  { name: 'Community Development', path: '/programs#community' },
];

const getInvolved = [
  { name: 'Donate', path: '/get-involved#donate' },
  { name: 'Volunteer', path: '/get-involved#volunteer' },
  { name: 'Become a Member', path: '/get-involved#member' },
  { name: 'Partner', path: '/get-involved#partner' },
  { name: 'Careers', path: '/get-involved#careers' },
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
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-dark opacity-50" />

      {/* Content */}
      <div className="relative">
        {/* Main Footer */}
        <div className="container-wide py-12 md:py-16 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-4 sm:mb-6">
                <img src="/logo.png" alt="Swan Foundation Logo" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" />
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-lg sm:text-xl">SWAN FOUNDATION</span>
                  <span className="text-xs sm:text-sm opacity-80">स्वान फाउन्डेशन</span>
                </div>
              </Link>
              <p className="text-primary-foreground/80 mb-4 sm:mb-6 max-w-sm leading-relaxed text-sm sm:text-base font-semibold">
                Making a Difference • Building Futures • Creating Hope
              </p>
              <div className="flex gap-2 sm:gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif font-semibold text-base sm:text-lg mb-3 sm:mb-4">Quick Links</h4>
              <ul className="space-y-2 sm:space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm sm:text-base"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="font-serif font-semibold text-base sm:text-lg mb-3 sm:mb-4">Programs</h4>
              <ul className="space-y-2 sm:space-y-3">
                {programs.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm sm:text-base"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get Involved & Legal */}
            <div>
              <h4 className="font-serif font-semibold text-base sm:text-lg mb-3 sm:mb-4">Get Involved</h4>
              <ul className="space-y-2 sm:space-y-3 mb-6">
                {getInvolved.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm sm:text-base"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mt-8 md:mt-12 pt-8 border-t border-white/10">
            <div>
              <h4 className="font-serif font-semibold text-base sm:text-lg mb-3 sm:mb-4">Legal & Policies</h4>
              <ul className="space-y-2 sm:space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm sm:text-base"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h4 className="font-serif font-semibold text-base sm:text-lg mb-3 sm:mb-4">Contact</h4>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 shrink-0 opacity-70" />
                  <span className="text-primary-foreground/80 text-xs sm:text-sm leading-relaxed">
                    Ward No. 10, Kathmandu Metropolitan City, Bagmati Province, Nepal
                  </span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 opacity-70" />
                  <a href="mailto:info@swanfoundation.org.np" className="text-primary-foreground/80 hover:text-primary-foreground text-xs sm:text-sm transition-colors break-all">
                    info@swanfoundation.org.np
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container-wide py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="text-xs sm:text-sm text-primary-foreground/60 text-center md:text-left">
                <p>© 2025 Swan Foundation. All Rights Reserved.</p>
                <p className="mt-1">Registration Number: 377033 / 82/83 | Registered under Company Act, 2063</p>
                <p className="mt-1">Non-Profit Organization | Kathmandu, Nepal</p>
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-primary-foreground/60">
                Made with <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-accent mx-1" /> for Nepal
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
