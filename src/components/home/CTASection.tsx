import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Users, UserPlus, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ctaActions = [
  {
    icon: Heart,
    label: 'Donate Now',
    description: 'Every contribution matters',
    variant: 'hero' as const,
  },
  {
    icon: Users,
    label: 'Volunteer',
    description: 'Share your time and skills',
    variant: 'heroOutline' as const,
  },
  {
    icon: UserPlus,
    label: 'Become a Member',
    description: 'Join our community',
    variant: 'heroOutline' as const,
  },
  {
    icon: Handshake,
    label: 'Partner With Us',
    description: 'Corporate collaboration opportunities',
    variant: 'heroOutline' as const,
  },
];

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />

      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-wide section-padding relative px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground mb-3 sm:mb-4 leading-tight px-2">
            Make a Difference Today
          </h2>
          <p className="text-primary-foreground/80 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            Your support can transform lives and communities. Join us in creating lasting positive change.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto"
        >
          {ctaActions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 min-w-[140px] sm:min-w-[160px] max-w-[200px] sm:max-w-none"
            >
              <Button
                variant={action.variant === 'hero' ? 'hero' : 'heroOutline'}
                size="lg"
                className={`w-full h-auto py-4 sm:py-5 md:py-6 px-4 sm:px-6 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                  action.variant === 'heroOutline'
                    ? 'border-2 border-white/40 bg-white/5 backdrop-blur-sm text-white hover:bg-white/15 hover:border-white/60 hover:shadow-lg hover:shadow-white/20'
                    : 'bg-white text-primary hover:bg-white/95 hover:shadow-xl hover:shadow-white/30'
                }`}
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center ${
                  action.variant === 'hero'
                    ? 'bg-primary/10'
                    : 'bg-white/10'
                }`}>
                  <action.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${
                    action.variant === 'hero' ? 'text-primary' : 'text-white'
                  }`} />
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <span className={`font-bold text-sm sm:text-base md:text-lg ${
                    action.variant === 'hero' ? 'text-primary' : 'text-white'
                  }`}>
                    {action.label}
                  </span>
                  <span className={`text-[10px] sm:text-xs opacity-80 font-normal text-center leading-tight ${
                    action.variant === 'hero' ? 'text-primary/80' : 'text-white/80'
                  }`}>
                    {action.description}
                  </span>
                </div>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 sm:mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-primary-foreground/60 text-xs sm:text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span>Registered NGO</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span>100% Transparency</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span>Tax Deductible</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
