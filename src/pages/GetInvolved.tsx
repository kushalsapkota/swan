import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  Heart, Users, UserPlus, Handshake, ArrowRight,
  DollarSign, Clock, Briefcase, Gift
} from 'lucide-react';

const involvementOptions = [
  {
    icon: Heart,
    title: 'Donate',
    subtitle: 'Financial Support',
    description: 'Your financial contribution directly supports our programs in education, health, and community development. Every donation makes a difference.',
    benefits: [
      'Tax-deductible contributions',
      'Regular impact updates',
      'Recognition in annual reports',
      'Choose specific programs to support',
    ],
    cta: 'Donate Now',
    color: 'from-rose-500 to-rose-600',
  },
  {
    icon: Clock,
    title: 'Volunteer',
    subtitle: 'Give Your Time',
    description: 'Share your skills and time to create direct impact. Whether locally or remotely, your expertise can help transform communities.',
    benefits: [
      'Flexible time commitments',
      'Skill-based volunteering',
      'Field visit opportunities',
      'Volunteer certificate provided',
    ],
    cta: 'Join as Volunteer',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: UserPlus,
    title: 'Become a Member',
    subtitle: 'Join Our Community',
    description: 'Become part of our growing community of changemakers. Members enjoy exclusive access to events, updates, and governance participation.',
    benefits: [
      'Voting rights in AGM',
      'Exclusive event invitations',
      'Quarterly newsletters',
      'Networking opportunities',
    ],
    cta: 'Apply for Membership',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Handshake,
    title: 'Partner With Us',
    subtitle: 'Corporate & Institutional',
    description: 'Organizations and businesses can partner with us for CSR initiatives, joint programs, and sustainable development goals.',
    benefits: [
      'Customized partnership models',
      'Brand visibility & recognition',
      'Employee engagement programs',
      'Impact measurement & reporting',
    ],
    cta: 'Explore Partnership',
    color: 'from-amber-500 to-amber-600',
  },
];

const donationTiers = [
  { amount: 1000, label: 'Supporter', description: 'Provides school supplies for 1 child' },
  { amount: 5000, label: 'Champion', description: 'Sponsors a medical camp for 10 families' },
  { amount: 10000, label: 'Guardian', description: 'Funds a scholarship for 1 year' },
  { amount: 25000, label: 'Patron', description: 'Supports a complete community program' },
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

export default function GetInvolved() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container-wide">
            <AnimatedSection className="text-center max-w-4xl mx-auto">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Get Involved</span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-4 sm:mb-6 leading-tight px-4">
                Be the Change You <span className="gradient-text">Want to See</span>
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed px-4">
                There are many ways to contribute to our mission. Whether through donations, 
                volunteering, or partnerships, your support helps us create lasting impact.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Involvement Options */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
              {involvementOptions.map((option, index) => (
                <AnimatedSection key={option.title}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="glass-card h-full p-5 sm:p-6 lg:p-8 group"
                  >
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-4 sm:mb-6 text-white`}>
                      <option.icon className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    
                    <span className="text-xs sm:text-sm text-muted-foreground font-medium">{option.subtitle}</span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold mt-1 mb-2 sm:mb-3">{option.title}</h3>
                    <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">{option.description}</p>
                    
                    <ul className="space-y-2 mb-6 sm:mb-8">
                      {option.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs sm:text-sm">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${option.color} shrink-0`} />
                          <span className="text-foreground/80">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button variant="heroOutline" size="lg" className="w-full sm:w-auto group/btn">
                      {option.cta}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Donation Tiers */}
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <AnimatedSection className="text-center mb-12">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Make an Impact</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-4">Giving Levels</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Choose a giving level that works for you. Every contribution creates meaningful change.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto px-4 sm:px-0">
              {donationTiers.map((tier, index) => (
                <AnimatedSection key={tier.label}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="glass-card p-4 sm:p-6 text-center h-full flex flex-col"
                  >
                    <div className="text-3xl sm:text-4xl font-serif font-bold gradient-text mb-1">
                      NPR {tier.amount.toLocaleString()}
                    </div>
                    <div className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">{tier.label}</div>
                    <p className="text-muted-foreground text-xs sm:text-sm flex-1 mb-4">{tier.description}</p>
                    <Button variant="hero" size="sm" className="w-full mt-auto">
                      <Gift className="w-4 h-4" />
                      Give
                    </Button>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ or Additional Info */}
        <section className="section-padding">
          <div className="container-wide max-w-4xl">
            <AnimatedSection className="text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Have Questions?</h2>
              <p className="text-muted-foreground text-lg mb-8">
                We'd love to hear from you. Reach out to learn more about how you can make a difference.
              </p>
              <Button variant="hero" size="xl">
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Button>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
