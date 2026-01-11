import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  Heart, Target, Eye, Users, Shield, Lightbulb,
  Globe, Award, FileCheck, MapPin, Calendar, Handshake, Leaf, BookOpen
} from 'lucide-react';

const coreValues = [
  { icon: Shield, title: 'Integrity', description: 'Highest standards of honesty, transparency and accountability' },
  { icon: Heart, title: 'Compassion', description: 'Genuine care and empathy for the communities we serve' },
  { icon: Award, title: 'Excellence', description: 'Committed to quality and effectiveness in everything we do' },
  { icon: Handshake, title: 'Collaboration', description: 'Believing in the power of partnerships and collective action' },
  { icon: Leaf, title: 'Sustainability', description: 'Designing programs for long-term positive impact' },
  { icon: Users, title: 'Inclusivity', description: 'Ensuring equal opportunities for all' },
];

const boardMembers = [
  { name: 'Viresh Dahal', role: 'President/Chairman', location: 'Nawalparasi' },
  { name: 'Santosh Bhurtel', role: 'Secretary', location: 'Bhaktapur' },
  { name: 'Kalpana Pandit', role: 'Member', location: '' },
  { name: 'Lalita Upadhyay', role: 'Member', location: '' },
  { name: 'Ananya Mallik', role: 'Member', location: '' },
  { name: 'Suraj Bhurai', role: 'Member', location: '' },
];

const advisoryCommittee = [
  { name: 'Avinu Ojha', role: 'President/Advisor - Consultant' },
  { name: 'Gaya Sapkota', role: 'Deputy President' },
  { name: 'Samir Gautam', role: 'Secretary' },
];

const legalInfo = [
  { label: 'Legal Name', value: 'Swan Foundation (स्वान फाउन्डेशन)' },
  { label: 'Registration Number', value: '377033 / 82/83' },
  { label: 'Registration Date', value: 'October 19, 2025' },
  { label: 'Registration Authority', value: 'Office of Company Registrar' },
  { label: 'Legal Status', value: 'Non-Profit Company' },
  { label: 'PAN Number', value: '[Pending Registration]' },
];

const internationalNetwork = [
  'United States of America', 'United Kingdom', 'Canada', 'Italy',
  'Belgium', 'Japan', 'Spain', 'Malaysia', 'UAE', 'Qatar', 'Nepal'
];

const complianceInfo = [
  'Registered under Company Act, 2063 (2006)',
  'Compliant with Association Mobilization and Operation Act',
  'Registered with Office of Company Registrar',
  'Tax-compliant organization',
  'Regular audit and reporting'
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

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24">
        {/* Hero Section - Our Story */}
        <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container-wide">
            <AnimatedSection className="max-w-4xl mx-auto text-center">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">About Us</span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-4 sm:mb-6 leading-tight px-4">
                Our Story
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed text-left sm:text-center px-4">
                Swan Foundation was born from a vision to create meaningful, sustainable change in Nepali communities. Established in October 2025, we are a group of dedicated individuals from diverse backgrounds—within Nepal and around the world—united by a common purpose: to empower communities and build a better future for all.
                <br /><br className="hidden sm:block" />
                <span className="hidden sm:inline">Our journey began with a simple question: How can we make a lasting difference? The answer was clear—through holistic development that addresses the root causes of poverty, inequality and environmental degradation while empowering individuals and communities to create their own solutions.</span>
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="section-padding">
          <div className="container-wide px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              <AnimatedSection>
                <div className="glass-card h-full p-5 sm:p-6 lg:p-8 xl:p-10 flex flex-col">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 sm:mb-6">
                    <Eye className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Vision</h2>
                  <p className="text-muted-foreground leading-relaxed text-base sm:text-lg italic mb-4 sm:mb-6">
                    "To create a sustainable and equitable society through comprehensive social development, quality education, accessible healthcare, environmental conservation and community empowerment initiatives that enable every individual to reach their full potential."
                  </p>
                  <ul className="space-y-2 mt-auto">
                    <li className="flex items-start gap-2 text-sm text-foreground/80">
                      <Target className="w-4 h-4 mt-1 text-primary shrink-0" />
                      <span>Every child has access to quality education</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-foreground/80">
                      <Target className="w-4 h-4 mt-1 text-primary shrink-0" />
                      <span>Communities have adequate healthcare facilities</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-foreground/80">
                      <Target className="w-4 h-4 mt-1 text-primary shrink-0" />
                      <span>Environmental resources are protected</span>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="glass-card h-full p-5 sm:p-6 lg:p-8 xl:p-10 flex flex-col">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 flex items-center justify-center mb-4 sm:mb-6">
                    <Target className="w-7 h-7 sm:w-8 sm:h-8 text-secondary" />
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Mission</h2>
                  <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-4 sm:mb-6">
                    Swan Foundation is committed to creating positive change through:
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                      <span className="font-semibold text-foreground">Education</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                      <span className="font-semibold text-foreground">Health</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                      <span className="font-semibold text-foreground">Environment</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                      <span className="font-semibold text-foreground">Empowerment</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                      <span className="font-semibold text-foreground">Community Development</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <AnimatedSection className="text-center mb-8 sm:mb-12 lg:mb-16 px-4">
              <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">Who We Are</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mt-3 leading-tight">Core Values</h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
              {coreValues.map((value, index) => (
                <AnimatedSection key={value.title}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="glass-card p-4 sm:p-6 h-full flex flex-col"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-3 sm:mb-4">
                      <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl sm:text-4xl font-serif text-primary/10 font-bold">{index + 1}</span>
                      <h3 className="font-serif text-lg sm:text-xl font-semibold">{value.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm sm:text-base">{value.description}</p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Information & Governance */}
        <section id="governance" className="section-padding">
          <div className="container-wide">
            <AnimatedSection className="text-center mb-8 sm:mb-12 lg:mb-16 px-4">
              <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">Transparency</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mt-3 leading-tight">Registration & Governance</h2>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 px-4 sm:px-0">
              {/* Registration Details */}
              <AnimatedSection>
                <div className="glass-card overflow-hidden">
                  <h3 className="font-serif text-lg sm:text-xl font-bold p-4 sm:p-6 border-b border-border bg-muted/20">Official Registration</h3>
                  <table className="w-full">
                    <tbody>
                      {legalInfo.map((item, index) => (
                        <tr key={item.label} className={index !== legalInfo.length - 1 ? 'border-b border-border' : ''}>
                          <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-muted-foreground font-medium text-xs sm:text-sm">{item.label}</td>
                          <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-foreground font-semibold text-right text-xs sm:text-sm">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AnimatedSection>

              {/* Governance Info */}
              <AnimatedSection>
                <div className="glass-card p-5 sm:p-6 lg:p-8 h-full">
                  <h3 className="font-serif text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-primary" />
                    Compliance & Governance
                  </h3>
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {complianceInfo.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 sm:gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="text-foreground/80 text-sm sm:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="font-serif text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Governing Documents
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {['Articles of Association', 'Bylaws', 'Financial Policy', 'HR Policy', 'Code of Conduct'].map((doc) => (
                      <span key={doc} className="px-3 py-1 rounded-full bg-secondary/10 text-secondary-foreground text-xs font-medium border border-secondary/20">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <AnimatedSection className="text-center mb-8 sm:mb-12 lg:mb-16 px-4">
              <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">Our Team</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mt-3 leading-tight">Leadership</h2>
            </AnimatedSection>

            {/* Board */}
            <div className="mb-12 sm:mb-16 px-4 sm:px-0">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Board of Directors</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
                {boardMembers.map((member, index) => (
                  <AnimatedSection key={index}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="glass-card text-center p-4 sm:p-6 h-full flex flex-col items-center justify-center border-t-4 border-t-primary"
                    >
                      <h3 className="font-serif text-base sm:text-lg font-bold">{member.name}</h3>
                      <p className="text-primary font-medium text-xs sm:text-sm mb-1">{member.role}</p>
                      {member.location && <p className="text-muted-foreground text-xs">{member.location}</p>}
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            {/* Advisors */}
            <div className="px-4 sm:px-0">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Advisory Committee</h3>
              <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
                {advisoryCommittee.map((member, index) => (
                  <AnimatedSection key={index}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="glass-card text-center p-4 sm:p-6 h-full border-t-4 border-t-secondary"
                    >
                      <h3 className="font-serif text-base sm:text-lg font-bold">{member.name}</h3>
                      <p className="text-secondary-foreground font-medium text-xs sm:text-sm">{member.role}</p>
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* International Network */}
        <section className="section-padding">
          <div className="container-wide">
            <AnimatedSection className="text-center mb-8 sm:mb-12 px-4">
              <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">Global Support</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mt-3 leading-tight">International Network</h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg mt-4 max-w-2xl mx-auto">
                Swan Foundation benefits from a diverse network of supporters and members from around the world.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto px-4 sm:px-0">
                {internationalNetwork.map((country) => (
                  <motion.div
                    key={country}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-3 glass-card text-xs sm:text-sm font-semibold cursor-default shadow-sm hover:shadow-md transition-all"
                  >
                    <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-primary opacity-70 shrink-0" />
                    {country}
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
