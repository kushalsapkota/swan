import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  GraduationCap, HeartPulse, ChevronDown, Target,
  AlertTriangle, Lightbulb, TrendingUp, BookOpen,
  Stethoscope, Users, Baby, Brain, ArrowRight,
  Leaf, Building, Users2, CheckCircle2, Sparkles, Heart,
  TreeDeciduous, Recycle, Droplets, Coins, Hammer, Tent, Megaphone
} from 'lucide-react';

const programCategories = [
  {
    id: 'education',
    label: 'Education',
    icon: GraduationCap,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30'
  },
  {
    id: 'health',
    label: 'Health',
    icon: HeartPulse,
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30'
  },
  {
    id: 'environment',
    label: 'Environment',
    icon: Leaf,
    color: 'from-emerald-500 to-green-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30'
  },
  {
    id: 'empowerment',
    label: 'Empowerment',
    icon: Users2,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30'
  },
  {
    id: 'community',
    label: 'Community',
    icon: Building,
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/30'
  },
];

const educationPrograms = [
  {
    id: 'school-support',
    title: 'School Support Program',
    subtitle: 'Infrastructure & Resources',
    objective: 'To improve the physical and academic environment of government schools in rural areas.',
    challenges: ['Dilapidated school buildings', 'Lack of furniture and whiteboards', 'Insufficient library and lab facilities'],
    solutions: ['Renovation of classrooms', 'Supply of desks and benches', 'Setting up libraries and science labs', 'Providing teaching aids'],
    outcomes: ['Better learning environment', 'Increased student attendance', 'Improved quality of education'],
    icon: Building,
    color: 'from-blue-500 to-cyan-500',
    bgGradient: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
    stats: [{ label: 'Schools Supported', value: '15+', icon: Building }, { label: 'Students Benefited', value: '5000+', icon: Users }]
  },
  {
    id: 'scholarship',
    title: 'Scholarship Distribution',
    subtitle: 'Education for All',
    objective: 'To ensure financial constraints do not stop deserving students from pursuing education.',
    challenges: ['High dropout rate due to poverty', 'Inability to afford fees and materials', 'Gender disparity in education'],
    solutions: ['Merit-based scholarships', 'Need-based financial aid', 'Special focus on girl child education', 'Monitoring student progress'],
    outcomes: ['Higher retention rates', 'Reduced financial burden on families', 'Empowered future generation'],
    icon: GraduationCap,
    color: 'from-blue-500 to-cyan-500',
    bgGradient: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
    stats: [{ label: 'Scholarships', value: '500+', icon: checkCircle2 => <CheckCircle2 /> }]
  },
  {
    id: 'stationery',
    title: 'Stationery & Uniform Support',
    subtitle: 'Essential Supplies',
    objective: 'To provide basic educational materials to students who cannot afford them.',
    challenges: ['Lack of textbooks and notebooks', 'Inadequate winter/summer uniforms', 'Poor hygiene due to lack of proper clothing'],
    solutions: ['Annual distribution drives', 'Quality school bags and shoes', 'Winter cloth distribution', 'Hygiene kits'],
    outcomes: ['Improved student dignity', 'Regular school attendance', 'Basic needs met'],
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500',
    bgGradient: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
    stats: [{ label: 'Kits Distributed', value: '2000+', icon: BookOpen }]
  },
  {
    id: 'digital-literacy',
    title: 'Digital Literacy Program',
    subtitle: 'Bridging the Digital Divide',
    objective: 'To introduce rural students to computers and modern technology.',
    challenges: ['No access to computers', 'Lack of internet connectivity', 'Digital illiteracy'],
    solutions: ['Setting up computer labs', 'Basic coding and office software training', 'Internet safety workshops', 'Teacher IT training'],
    outcomes: ['Tech-savvy students', 'Better career prospects', 'Access to global information'],
    icon: Lightbulb,
    color: 'from-blue-500 to-cyan-500',
    bgGradient: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
    stats: [{ label: 'Computer Labs', value: '5', icon: Lightbulb }]
  },
  {
    id: 'teacher-training',
    title: 'Teacher Training',
    subtitle: 'Quality Instruction',
    objective: 'To enhance the pedagogical skills of rural teachers.',
    challenges: ['Outdated teaching methods', 'Lack of motivation', 'Limited professional development'],
    solutions: ['Modern pedagogy workshops', 'Child psychology training', 'Subject-specific refreshers', 'Leadership development'],
    outcomes: ['Engaging classroom sessions', 'Better student-teacher relationship', 'Improved academic results'],
    icon: Users,
    color: 'from-blue-500 to-cyan-500',
    bgGradient: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
    stats: [{ label: 'Teachers Trained', value: '100+', icon: Users }]
  }
];

const healthPrograms = [
  {
    id: 'health-camps',
    title: 'Free Health Camps',
    subtitle: 'Healthcare at Doorstep',
    objective: 'To provide basic medical services to remote populations.',
    challenges: ['No doctors in rural posts', 'High cost of travel to cities', 'Neglected chronic conditions'],
    solutions: ['General checkup camps', 'Specialized eye and dental camps', 'Pathology services', 'Referral support'],
    outcomes: ['Early diagnosis', 'Treatment of common ailments', 'Restored vision/dental health'],
    icon: Stethoscope,
    color: 'from-rose-500 to-pink-500',
    bgGradient: 'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30',
    stats: [{ label: 'Camps Conducted', value: '20+', icon: HeartPulse }, { label: 'Patients', value: '5000+', icon: Users }]
  },
  {
    id: 'medicine',
    title: 'Medicine Assistance',
    subtitle: 'Essential Drugs',
    objective: 'To ensure no one suffers due to lack of basic medicines.',
    challenges: ['Shortage in health posts', 'Unavailability of specific drugs', 'Cost barriers'],
    solutions: ['Supply to health posts', 'Free distribution during camps', 'Chronic disease medication support'],
    outcomes: ['Adherence to treatment', 'Improved quality of life', 'Reduced morbidity'],
    icon: HeartPulse,
    color: 'from-rose-500 to-pink-500',
    bgGradient: 'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30',
    stats: [{ label: 'Medicines Provided', value: 'Waitlist', icon: CheckCircle2 }]
  },
  {
    id: 'awareness',
    title: 'Health Awareness',
    subtitle: 'Prevention is Better',
    objective: 'To educate communities about hygiene, nutrition, and disease prevention.',
    challenges: ['Superstitions and myths', 'Lack of knowledge', 'Poor lifestyle choices'],
    solutions: ['Community workshops', 'School health programs', 'Pamphlet and radio campaigns'],
    outcomes: ['Informed community', 'Behavioral change', 'Reduced communicable diseases'],
    icon: Megaphone,
    color: 'from-rose-500 to-pink-500',
    bgGradient: 'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30',
    stats: [{ label: 'Sessions', value: '50+', icon: Users }]
  },
  {
    id: 'maternal',
    title: 'Maternal & Child Health',
    subtitle: 'Safe Motherhood',
    objective: 'To support pregnant women and newborns.',
    challenges: ['Home births', 'Malnutrition', 'Lack of antenatal care'],
    solutions: ['Nutritional support', 'Safe delivery incentives', 'Newborn care kits', 'Counseling'],
    outcomes: ['Reduced mortality', 'Healthy babies', 'Confident mothers'],
    icon: Baby,
    color: 'from-rose-500 to-pink-500',
    bgGradient: 'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30',
    stats: [{ label: 'Mothers Helped', value: '300+', icon: Baby }]
  },
  {
    id: 'wash',
    title: 'Sanitation & Hygiene (WASH)',
    subtitle: 'Clean Living',
    objective: 'To improve sanitation facilities and habits.',
    challenges: ['Open defecation', 'Unsafe drinking water', 'Poor hand hygiene'],
    solutions: ['Toilets construction', 'Water filters', 'Handwashing stations', 'Menstrual hygiene management'],
    outcomes: ['Disease free environment', 'Dignity for women', 'Clean villages'],
    icon: Droplets,
    color: 'from-rose-500 to-pink-500',
    bgGradient: 'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30',
    stats: [{ label: 'Toilets Built', value: '50+', icon: Hammer }]
  }
];

const environmentPrograms = [
  {
    id: 'plantation',
    title: 'Tree Plantation',
    subtitle: 'Greener Tomorrow',
    objective: 'To increase green cover and combat deforestation.',
    challenges: ['Deforestation', 'Soil erosion', 'Loss of biodiversity'],
    solutions: ['Community plantation drives', 'School green zones', 'Fruit tree distribution'],
    outcomes: ['Restored ecosystem', 'Carbon sequestration', 'Awareness'],
    icon: TreeDeciduous,
    color: 'from-emerald-500 to-green-500',
    bgGradient: 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30',
    stats: [{ label: 'Trees Planted', value: '10000+', icon: Leaf }]
  },
  {
    id: 'waste',
    title: 'Waste Management',
    subtitle: 'Clean Communities',
    objective: 'To manage solid waste effectively.',
    challenges: ['Haphazard dumping', 'Burning of plastic', 'Polluted rivers'],
    solutions: ['Segregation training', 'Dustbin distribution', 'Composting workshops', 'Recycling links'],
    outcomes: ['Cleaner surroundings', 'Resource recovery', 'Healthier living'],
    icon: Recycle,
    color: 'from-emerald-500 to-green-500',
    bgGradient: 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30',
    stats: [{ label: 'Cleanups', value: '25+', icon: Recycle }]
  },
  {
    id: 'climate',
    title: 'Climate Advocacy',
    subtitle: 'Act Now',
    objective: 'To raise awareness about climate change impacts.',
    challenges: ['Ignorance about climate change', 'Unpredictable weather patterns'],
    solutions: ['Advocacy campaigns', 'Youth climate groups', 'Sustainable practices promotion'],
    outcomes: ['Climate conscious citizens', 'Local adaptation strategies'],
    icon: Megaphone,
    color: 'from-emerald-500 to-green-500',
    bgGradient: 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30',
    stats: [{ label: 'Advocates', value: '100+', icon: Users }]
  },
  {
    id: 'clean-water',
    title: 'Clean Water Initiatives',
    subtitle: 'Safe Water',
    objective: 'To provide access to safe drinking water.',
    challenges: ['Contaminated water sources', 'Waterborne diseases'],
    solutions: ['Water source protection', 'Filter distribution', 'Testing kits'],
    outcomes: ['Safe drinking water', 'Reduced illness'],
    icon: Droplets,
    color: 'from-emerald-500 to-green-500',
    bgGradient: 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30',
    stats: [{ label: 'Filters', value: '200+', icon: Droplets }]
  },
  {
    id: 'eco-clubs',
    title: 'Eco-Club Formation',
    subtitle: 'Young Guardians',
    objective: 'To mobilize students for environmental protection.',
    challenges: ['Lack of youth engagement', 'Passive attitude'],
    solutions: ['Forming clubs in schools', 'Green activities', 'Competitions'],
    outcomes: ['Active youth participation', 'Future environmental leaders'],
    icon: Users2,
    color: 'from-emerald-500 to-green-500',
    bgGradient: 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30',
    stats: [{ label: 'Clubs', value: '10+', icon: Users }]
  }
];

const empowermentPrograms = [
  {
    id: 'women-skill',
    title: 'Women Skill Development',
    subtitle: 'Financial Independence',
    objective: 'To train women in income-generating skills.',
    challenges: ['Specific gender roles', 'Financial dependency', 'Lack of skills'],
    solutions: ['Tailoring & Knitting', 'Handicraft & Pickle making', 'Basic bookkeeping'],
    outcomes: ['Self-reliant women', 'Support to family income', 'Confidence building'],
    icon: Users,
    color: 'from-amber-500 to-orange-500',
    bgGradient: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30',
    stats: [{ label: 'Women Trained', value: '200+', icon: Users }]
  },
  {
    id: 'youth-leadership',
    title: 'Youth Leadership',
    subtitle: 'Leading the Future',
    objective: 'To develop leadership qualities in youth.',
    challenges: ['Lack of direction', 'Unemployment frustration'],
    solutions: ['Leadership bootcamps', 'Public speaking', 'Project management'],
    outcomes: ['Capable leaders', 'Social change agents'],
    icon: Target,
    color: 'from-amber-500 to-orange-500',
    bgGradient: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30',
    stats: [{ label: 'Leaders', value: '50+', icon: Target }]
  },
  {
    id: 'micro-enterprise',
    title: 'Micro-Enterprise Support',
    subtitle: 'Small Business',
    objective: 'To support small scale startups.',
    challenges: ['Lack of capital', 'No market linkage'],
    solutions: ['Seed money', 'Business planning', 'Market connection'],
    outcomes: ['Job creation', 'Local economic growth'],
    icon: Coins,
    color: 'from-amber-500 to-orange-500',
    bgGradient: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30',
    stats: [{ label: 'Startups', value: '10+', icon: Building }]
  },
  {
    id: 'financial',
    title: 'Financial Literacy',
    subtitle: 'Smart Money',
    objective: 'To teach money management.',
    challenges: ['Debt traps', 'Lack of savings'],
    solutions: ['Banking basics', 'Saving groups', 'Loan management'],
    outcomes: ['Financial security', 'Wise investment'],
    icon: TrendingUp,
    color: 'from-amber-500 to-orange-500',
    bgGradient: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30',
    stats: [{ label: 'Literate', value: '500+', icon: Users }]
  },
  {
    id: 'vocational',
    title: 'Vocational Training',
    subtitle: 'Technical Skills',
    objective: 'To provide technical skills for employment.',
    challenges: ['Unskilled labor', 'Low wages'],
    solutions: ['Plumbing', 'Electrician', 'Carpentry', 'Mobile repair'],
    outcomes: ['Skilled workforce', 'Higher income'],
    icon: Hammer,
    color: 'from-amber-500 to-orange-500',
    bgGradient: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30',
    stats: [{ label: 'Certified', value: '100+', icon: CheckCircle2 }]
  }
];

const communityPrograms = [
  {
    id: 'infrastructure',
    title: 'Rural Infrastructure',
    subtitle: 'Building Foundations',
    objective: 'To improving community infrastructure.',
    challenges: ['Poor roads/trails', 'Dilapidated community buildings'],
    solutions: ['Trail repair', 'Community hall construction', 'Irrigation canals'],
    outcomes: ['Better connectivity', 'Social space'],
    icon: Building,
    color: 'from-violet-500 to-purple-500',
    bgGradient: 'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
    stats: [{ label: 'Projects', value: '5', icon: Building }]
  },
  {
    id: 'disaster',
    title: 'Disaster Relief',
    subtitle: 'Emergency Support',
    objective: 'To provide immediate relief during disasters.',
    challenges: ['Frequent landslides/floods', 'Slow response'],
    solutions: ['Food/Clothes distribution', 'Temporary shelter', 'First aid'],
    outcomes: ['Lives saved', 'Immediate comfort'],
    icon: Tent,
    color: 'from-violet-500 to-purple-500',
    bgGradient: 'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
    stats: [{ label: 'Families', value: '100+', icon: Users }]
  },
  {
    id: 'livelihood',
    title: 'Livelihood Support',
    subtitle: 'Sustainable Income',
    objective: 'To enhance agricultural livelihood.',
    challenges: ['Subsistence farming', 'New pests'],
    solutions: ['Modern farming seeds', 'Goat/Poultry farming', 'Organic manure'],
    outcomes: ['Increased production', 'Food security'],
    icon: Leaf,
    color: 'from-violet-500 to-purple-500',
    bgGradient: 'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
    stats: [{ label: 'Farmers', value: '200+', icon: Users }]
  },
  {
    id: 'social-awareness',
    title: 'Social Awareness',
    subtitle: 'Justice & Rights',
    objective: 'To fight social evils.',
    challenges: ['Domestic violence', 'Human trafficking', 'Discrimination'],
    solutions: ['Rallies', 'Street dramas', 'Legal counseling'],
    outcomes: ['Aware society', 'Reduced crime'],
    icon: Megaphone,
    color: 'from-violet-500 to-purple-500',
    bgGradient: 'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
    stats: [{ label: 'Events', value: '10+', icon: Megaphone }]
  },
  {
    id: 'capacity',
    title: 'Capacity Building',
    subtitle: 'Strengthening Institutions',
    objective: 'To strengthen local groups.',
    challenges: ['Weak management in CBOs', 'Lack of documentation'],
    solutions: ['Account keeping training', 'Proposal writing', 'Governance workshop'],
    outcomes: ['Strong local institutions', 'Sustainability'],
    icon: Users2,
    color: 'from-violet-500 to-purple-500',
    bgGradient: 'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
    stats: [{ label: 'Groups', value: '20+', icon: Users }]
  }
];

function ProgramCard({ program, isOpen, onToggle, index }: {
  program: any;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

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
                <program.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
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

  const getPrograms = () => {
    switch (activeTab) {
      case 'education': return educationPrograms;
      case 'health': return healthPrograms;
      case 'environment': return environmentPrograms;
      case 'empowerment': return empowermentPrograms;
      case 'community': return communityPrograms;
      default: return educationPrograms;
    }
  };

  const programs = getPrograms();

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
              {programCategories.map((category) => (
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
                  <category.icon className="w-5 h-5" />
                  {category.label}
                </motion.button>
              ))}
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
                  {programs.map((program, index) => (
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
                    <Users className="w-5 h-5" />
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
