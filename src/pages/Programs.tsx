import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import * as Icons from 'lucide-react';
import { loadAdminContent, resolveLucideIcon } from '@/lib/admin-content';

function ProgramCard({
  program,
  isOpen,
  onToggle,
  index,
}: {
  program: any;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  const Icon = resolveLucideIcon(Icons, program.icon);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className={`glass-card overflow-hidden border-2 transition-all duration-300 ${isOpen ? 'border-primary shadow-xl shadow-primary/20' : 'border-transparent hover:border-primary/30'
        }`}>
        {/* Header */}
        <button
          onClick={onToggle}
          className={`w-full p-6 sm:p-8 transition-all duration-300 ${program.bgGradient} hover:opacity-90`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
            <div className="flex items-start sm:items-center gap-4 flex-1">
              {/* Icon */}
              <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-100 blur-xl transition-opacity`} />
              </div>

              {/* Content */}
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">{program.subtitle}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{program.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base line-clamp-2">{program.objective}</p>
              </div>
            </div>

            {/* Stats Preview */}
            <div className="hidden lg:flex gap-4">
              {program.stats.slice(0, 2).map((stat: any, i: number) => (
                <div key={i} className="glass-card p-3 min-w-[100px] text-center">
                  <div className="text-xl font-serif font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Chevron */}
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="shrink-0"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                <ChevronDown className="w-5 h-5 text-primary" />
              </div>
            </motion.div>
          </div>

          {/* Mobile Stats */}
          <div className="lg:hidden grid grid-cols-3 gap-3 mt-4">
            {program.stats.map((stat: any, i: number) => (
              <div key={i} className="glass-card p-2 text-center">
                <div className="text-lg font-serif font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </button>

        {/* Expanded Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="p-6 sm:p-8 space-y-8 bg-background/50">
                {/* Objective */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass-card p-5 border-l-4 border-primary"
                >
                  <div className="flex items-center gap-3 text-primary font-semibold mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Target className="w-5 h-5" />
                    </div>
                    <span className="text-base sm:text-lg">Our Objective</span>
                  </div>
                  <p className="text-foreground/80 leading-relaxed">{program.objective}</p>
                </motion.div>

                {/* Three Columns */}
                <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                  {/* Challenges */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-5 border-l-4 border-amber-500"
                  >
                    <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400 font-semibold mb-4">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <span>Challenges</span>
                    </div>
                    <ul className="space-y-3">
                      {program.challenges.map((challenge: string, i: number) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          className="flex items-start gap-3 text-sm sm:text-base text-foreground/80"
                        >
                          <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                          <span>{challenge}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Solutions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-5 border-l-4 border-primary"
                  >
                    <div className="flex items-center gap-3 text-primary font-semibold mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Lightbulb className="w-5 h-5" />
                      </div>
                      <span>Our Solutions</span>
                    </div>
                    <ul className="space-y-3">
                      {program.solutions.map((solution: string, i: number) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + i * 0.05 }}
                          className="flex items-start gap-3 text-sm sm:text-base text-foreground/80"
                        >
                          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                          <span>{solution}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Outcomes */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card p-5 border-l-4 border-emerald-500"
                  >
                    <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-semibold mb-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <span>Expected Outcomes</span>
                    </div>
                    <ul className="space-y-3">
                      {program.outcomes.map((outcome: string, i: number) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.05 }}
                          className="flex items-start gap-3 text-sm sm:text-base text-foreground/80"
                        >
                          <TrendingUp className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{outcome}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Programs() {
  const [activeTab, setActiveTab] = useState('education');
  const [openProgram, setOpenProgram] = useState<string | null>('scholarship'); // Default open program
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const content = loadAdminContent();
  const programCategories = content.programCategories;
  const programsForActiveCategory = content.programs.filter((p) => p.categoryId === activeTab);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24" ref={containerRef}>
        {/* Hero Section */}
        <section className="relative section-padding overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

          <div className="container-wide relative px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">Our Comprehensive Programs</span>
              </motion.div>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-3 mb-6 leading-tight">
                Programs That{' '}
                <span className="gradient-text block sm:inline">Transform Lives</span>
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                Our comprehensive programs address the root causes of poverty and inequality,
                creating sustainable pathways for community development and individual empowerment across Nepal.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="section-padding relative">
          <div className="container-wide px-4 sm:px-6 lg:px-8">
            {/* Category Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16"
            >
              {programCategories.map((category) => {
                const Icon = resolveLucideIcon(Icons, category.icon);
                return (
                <motion.button
                  key={category.id}
                  onClick={() => {
                    setActiveTab(category.id);
                    setOpenProgram(null);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 flex items-center gap-2 ${activeTab === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-primary/30`
                      : 'glass-card hover:border-primary/50 border-2 border-transparent'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  {category.label}
                </motion.button>
              )})}
            </motion.div>

            {/* Programs List */}
            <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 sm:space-y-8"
                >
                  {programsForActiveCategory.map((program, index) => (
                    <ProgramCard
                      key={program.id}
                      program={program}
                      isOpen={openProgram === program.id}
                      onToggle={() => setOpenProgram(openProgram === program.id ? null : program.id)}
                      index={index}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative section-padding overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="container-wide relative px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4 sm:mb-6 leading-tight">
                Ready to Make an Impact?
              </h2>
              <p className="text-primary-foreground/90 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed">
                Your support can help us reach more communities and create lasting positive change.
                Join us in transforming lives across Nepal.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/get-involved">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto gap-2 bg-white text-primary hover:bg-white/90">
                    <Heart className="w-5 h-5" />
                    Donate Now
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/get-involved">
                  <Button variant="heroOutline" size="xl" className="w-full sm:w-auto gap-2 border-2 border-white/30 text-primary-foreground hover:bg-white/10">
                    <Icons.Users className="w-5 h-5" />
                    Become a Volunteer
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
