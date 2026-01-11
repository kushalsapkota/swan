import { motion } from 'framer-motion';
import { ArrowRight, Heart, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden w-full">
      {/* Background Image with Parallax Effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <img
          src={heroBg}
          alt="Nepal Himalayan community"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container-wide pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 w-full">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 glass-card px-2.5 sm:px-3 py-1.5 sm:py-2 mb-4 sm:mb-6 md:mb-8 text-[10px] sm:text-xs md:text-sm"
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-secondary animate-pulse shrink-0" />
            <span className="font-medium">Registered NGO • Est. Oct 2025</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 sm:mb-3 md:mb-4 text-balance leading-[1.1] sm:leading-tight"
          >
            <span className="text-foreground">SWAN </span>
            <span className="gradient-text">FOUNDATION</span>
          </motion.h1>

          {/* Nepali Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-muted-foreground mb-3 sm:mb-4 md:mb-6"
          >
            स्वान फाउन्डेशन
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium text-foreground/90 mb-3 sm:mb-4 leading-snug sm:leading-relaxed"
          >
            <span className="block sm:inline">Empowering Communities</span>
            <span className="hidden sm:inline"> | </span>
            <span className="block sm:inline">Building Futures</span>
            <span className="hidden sm:inline"> | </span>
            <span className="block sm:inline">Creating Hope</span>
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 md:mb-10 max-w-2xl leading-relaxed"
          >
            Making a difference through{' '}
            <span className="text-primary font-medium">Education</span> •{' '}
            <span className="text-primary font-medium">Health</span> •{' '}
            <span className="text-primary font-medium">Environment</span> •{' '}
            <span className="text-primary font-medium">Empowerment</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 md:gap-4"
          >
            <Button variant="hero" size="lg" className="group w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-6 sm:py-4">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              Donate Now
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="heroOutline" size="lg" className="group w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-6 sm:py-4">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              Get Involved
            </Button>
            <Button variant="glass" size="lg" className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-6 sm:py-4">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs sm:text-sm text-muted-foreground">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
