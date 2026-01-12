import type { LucideIcon } from 'lucide-react';

export const ADMIN_CONTENT_STORAGE_KEY = 'swan_admin_content';
export const ADMIN_SESSION_KEY = 'swan_admin_session';

export type ImpactStat = {
  id: string;
  icon: string; // Lucide icon name
  value: string | number;
  label: string;
  suffix?: string;
};

export type ImpactArea = {
  id: string;
  icon: string; // Lucide icon name
  title: string;
  description: string;
  color: string;
  iconColor: string;
};

export type ProgramCategory = {
  id: string;
  label: string;
  icon: string; // Lucide icon name
  color: string;
  bgColor: string;
  borderColor: string;
};

export type ProgramStat = {
  label: string;
  value: string;
};

export type Program = {
  id: string;
  categoryId: string;
  title: string;
  subtitle: string;
  objective: string;
  challenges: string[];
  solutions: string[];
  outcomes: string[];
  icon: string; // Lucide icon name
  color: string;
  bgGradient: string;
  stats: ProgramStat[];
};

export type AdminContent = {
  impactDashboard: {
    sectionBadge: string;
    sectionTitle: string;
    sectionDescription: string;
    stats: ImpactStat[];
  };
  impactAreasSection: {
    badge: string;
    title: string;
    description: string;
    areas: ImpactArea[];
  };
  programCategories: ProgramCategory[];
  programs: Program[];
};

// Default content seeded from the current site
export const defaultAdminContent: AdminContent = {
  impactDashboard: {
    sectionBadge: 'Our Impact',
    sectionTitle: 'Live Impact Dashboard',
    sectionDescription:
      "Real-time overview of our foundation's reach and commitment to creating lasting change in communities.",
    stats: [
      { id: 'established', icon: 'Calendar', value: 'Oct 2025', label: 'Established' },
      { id: 'registration', icon: 'FileCheck', value: '377033', label: 'Registration No.' },
      { id: 'hq', icon: 'MapPin', value: 'Kathmandu', label: 'Headquarters' },
      { id: 'reach', icon: 'Globe', value: 'National & International', label: 'Reach' },
      { id: 'focus-areas', icon: 'Target', value: 5, label: 'Focus Areas', suffix: '+' },
    ],
  },
  impactAreasSection: {
    badge: 'What We Do',
    title: 'Our Impact Areas',
    description:
      'Five pillars of change driving sustainable development and transforming lives across communities.',
    areas: [
      {
        id: 'education',
        icon: 'GraduationCap',
        title: 'Education',
        description: 'Supporting schools, providing scholarships and creating learning opportunities for all',
        color: 'from-blue-500/20 to-blue-600/10',
        iconColor: 'text-blue-600 dark:text-blue-400',
      },
      {
        id: 'health',
        icon: 'HeartPulse',
        title: 'Health',
        description: 'Community health camps, medical assistance and health awareness programs',
        color: 'from-rose-500/20 to-rose-600/10',
        iconColor: 'text-rose-600 dark:text-rose-400',
      },
      {
        id: 'environment',
        icon: 'Leaf',
        title: 'Environment',
        description: 'Tree plantation drives, conservation programs and climate action initiatives',
        color: 'from-emerald-500/20 to-emerald-600/10',
        iconColor: 'text-emerald-600 dark:text-emerald-400',
      },
      {
        id: 'empowerment',
        icon: 'Users',
        title: 'Empowerment',
        description: 'Women and youth capacity building, skill development and leadership training',
        color: 'from-amber-500/20 to-amber-600/10',
        iconColor: 'text-amber-600 dark:text-amber-400',
      },
      {
        id: 'community',
        icon: 'Building',
        title: 'Community Development',
        description: 'Infrastructure support, livelihood programs and disaster preparedness',
        color: 'from-violet-500/20 to-violet-600/10',
        iconColor: 'text-violet-600 dark:text-violet-400',
      },
    ],
  },
  programCategories: [
    {
      id: 'education',
      label: 'Education',
      icon: 'GraduationCap',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
    },
    {
      id: 'health',
      label: 'Health',
      icon: 'HeartPulse',
      color: 'from-rose-500 to-pink-500',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30',
    },
    {
      id: 'environment',
      label: 'Environment',
      icon: 'Leaf',
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
    },
    {
      id: 'empowerment',
      label: 'Empowerment',
      icon: 'Users2',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
    },
    {
      id: 'community',
      label: 'Community',
      icon: 'Building',
      color: 'from-violet-500 to-purple-500',
      bgColor: 'bg-violet-500/10',
      borderColor: 'border-violet-500/30',
    },
  ],
  programs: [
    // Education programs
    {
      id: 'school-support',
      categoryId: 'education',
      title: 'School Support Program',
      subtitle: 'Infrastructure & Resources',
      objective: 'To improve the physical and academic environment of government schools in rural areas.',
      challenges: [
        'Dilapidated school buildings',
        'Lack of furniture and whiteboards',
        'Insufficient library and lab facilities',
      ],
      solutions: [
        'Renovation of classrooms',
        'Supply of desks and benches',
        'Setting up libraries and science labs',
        'Providing teaching aids',
      ],
      outcomes: ['Better learning environment', 'Increased student attendance', 'Improved quality of education'],
      icon: 'Building',
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
      stats: [
        { label: 'Schools Supported', value: '15+' },
        { label: 'Students Benefited', value: '5000+' },
      ],
    },
    {
      id: 'scholarship',
      categoryId: 'education',
      title: 'Scholarship Distribution',
      subtitle: 'Education for All',
      objective: 'To ensure financial constraints do not stop deserving students from pursuing education.',
      challenges: ['High dropout rate due to poverty', 'Inability to afford fees and materials', 'Gender disparity in education'],
      solutions: [
        'Merit-based scholarships',
        'Need-based financial aid',
        'Special focus on girl child education',
        'Monitoring student progress',
      ],
      outcomes: ['Higher retention rates', 'Reduced financial burden on families', 'Empowered future generation'],
      icon: 'GraduationCap',
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
      stats: [{ label: 'Scholarships', value: '500+' }],
    },
    {
      id: 'stationery',
      categoryId: 'education',
      title: 'Stationery & Uniform Support',
      subtitle: 'Essential Supplies',
      objective: 'To provide basic educational materials to students who cannot afford them.',
      challenges: [
        'Lack of textbooks and notebooks',
        'Inadequate winter/summer uniforms',
        'Poor hygiene due to lack of proper clothing',
      ],
      solutions: ['Annual distribution drives', 'Quality school bags and shoes', 'Winter cloth distribution', 'Hygiene kits'],
      outcomes: ['Improved student dignity', 'Regular school attendance', 'Basic needs met'],
      icon: 'BookOpen',
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
      stats: [{ label: 'Kits Distributed', value: '2000+' }],
    },
    {
      id: 'digital-literacy',
      categoryId: 'education',
      title: 'Digital Literacy Program',
      subtitle: 'Bridging the Digital Divide',
      objective: 'To introduce rural students to computers and modern technology.',
      challenges: ['No access to computers', 'Lack of internet connectivity', 'Digital illiteracy'],
      solutions: [
        'Setting up computer labs',
        'Basic coding and office software training',
        'Internet safety workshops',
        'Teacher IT training',
      ],
      outcomes: ['Tech-savvy students', 'Better career prospects', 'Access to global information'],
      icon: 'Lightbulb',
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
      stats: [{ label: 'Computer Labs', value: '5' }],
    },
    {
      id: 'teacher-training',
      categoryId: 'education',
      title: 'Teacher Training',
      subtitle: 'Quality Instruction',
      objective: 'To enhance the pedagogical skills of rural teachers.',
      challenges: ['Outdated teaching methods', 'Lack of motivation', 'Limited professional development'],
      solutions: [
        'Modern pedagogy workshops',
        'Child psychology training',
        'Subject-specific refreshers',
        'Leadership development',
      ],
      outcomes: ['Engaging classroom sessions', 'Better student-teacher relationship', 'Improved academic results'],
      icon: 'Users',
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
      stats: [{ label: 'Teachers Trained', value: '100+' }],
    },

    // Health programs
    {
      id: 'health-camps',
      categoryId: 'health',
      title: 'Free Health Camps',
      subtitle: 'Healthcare at Doorstep',
      objective: 'To provide basic medical services to remote populations.',
      challenges: ['No doctors in rural posts', 'High cost of travel to cities', 'Neglected chronic conditions'],
      solutions: ['General checkup camps', 'Specialized eye and dental camps', 'Pathology services', 'Referral support'],
      outcomes: ['Early diagnosis', 'Treatment of common ailments', 'Restored vision/dental health'],
      icon: 'Stethoscope',
      color: 'from-rose-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30',
      stats: [
        { label: 'Camps Conducted', value: '20+' },
        { label: 'Patients', value: '5000+' },
      ],
    },
    {
      id: 'medicine',
      categoryId: 'health',
      title: 'Medicine Assistance',
      subtitle: 'Essential Drugs',
      objective: 'To ensure no one suffers due to lack of basic medicines.',
      challenges: ['Shortage in health posts', 'Unavailability of specific drugs', 'Cost barriers'],
      solutions: ['Supply to health posts', 'Free distribution during camps', 'Chronic disease medication support'],
      outcomes: ['Adherence to treatment', 'Improved quality of life', 'Reduced morbidity'],
      icon: 'HeartPulse',
      color: 'from-rose-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30',
      stats: [{ label: 'Medicines Provided', value: 'Waitlist' }],
    },
    {
      id: 'health-awareness',
      categoryId: 'health',
      title: 'Health Awareness',
      subtitle: 'Prevention is Better',
      objective: 'To educate communities about hygiene, nutrition, and disease prevention.',
      challenges: ['Superstitions and myths', 'Lack of knowledge', 'Poor lifestyle choices'],
      solutions: ['Community workshops', 'School health programs', 'Pamphlet and radio campaigns'],
      outcomes: ['Informed community', 'Behavioral change', 'Reduced communicable diseases'],
      icon: 'Megaphone',
      color: 'from-rose-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30',
      stats: [{ label: 'Sessions', value: '50+' }],
    },
    {
      id: 'maternal',
      categoryId: 'health',
      title: 'Maternal & Child Health',
      subtitle: 'Safe Motherhood',
      objective: 'To support pregnant women and newborns.',
      challenges: ['Home births', 'Malnutrition', 'Lack of antenatal care'],
      solutions: ['Nutritional support', 'Safe delivery incentives', 'Newborn care kits', 'Counseling'],
      outcomes: ['Reduced mortality', 'Healthy babies', 'Confident mothers'],
      icon: 'Baby',
      color: 'from-rose-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30',
      stats: [{ label: 'Mothers Helped', value: '300+' }],
    },
    {
      id: 'wash',
      categoryId: 'health',
      title: 'Sanitation & Hygiene (WASH)',
      subtitle: 'Clean Living',
      objective: 'To improve sanitation facilities and habits.',
      challenges: ['Open defecation', 'Unsafe drinking water', 'Poor hand hygiene'],
      solutions: ['Toilets construction', 'Water filters', 'Handwashing stations', 'Menstrual hygiene management'],
      outcomes: ['Disease free environment', 'Dignity for women', 'Clean villages'],
      icon: 'Droplets',
      color: 'from-rose-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30',
      stats: [{ label: 'Toilets Built', value: '50+' }],
    },

    // Environment programs
    {
      id: 'plantation',
      categoryId: 'environment',
      title: 'Tree Plantation',
      subtitle: 'Greener Tomorrow',
      objective: 'To increase green cover and combat deforestation.',
      challenges: ['Deforestation', 'Soil erosion', 'Loss of biodiversity'],
      solutions: ['Community plantation drives', 'School green zones', 'Fruit tree distribution'],
      outcomes: ['Restored ecosystem', 'Carbon sequestration', 'Awareness'],
      icon: 'TreeDeciduous',
      color: 'from-emerald-500 to-green-500',
      bgGradient: 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30',
      stats: [{ label: 'Trees Planted', value: '10000+' }],
    },
    {
      id: 'waste',
      categoryId: 'environment',
      title: 'Waste Management',
      subtitle: 'Clean Communities',
      objective: 'To manage solid waste effectively.',
      challenges: ['Haphazard dumping', 'Burning of plastic', 'Polluted rivers'],
      solutions: ['Segregation training', 'Dustbin distribution', 'Composting workshops', 'Recycling links'],
      outcomes: ['Cleaner surroundings', 'Resource recovery', 'Healthier living'],
      icon: 'Recycle',
      color: 'from-emerald-500 to-green-500',
      bgGradient: 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30',
      stats: [{ label: 'Cleanups', value: '25+' }],
    },
    {
      id: 'climate',
      categoryId: 'environment',
      title: 'Climate Advocacy',
      subtitle: 'Act Now',
      objective: 'To raise awareness about climate change impacts.',
      challenges: ['Ignorance about climate change', 'Unpredictable weather patterns'],
      solutions: ['Advocacy campaigns', 'Youth climate groups', 'Sustainable practices promotion'],
      outcomes: ['Climate conscious citizens', 'Local adaptation strategies'],
      icon: 'Megaphone',
      color: 'from-emerald-500 to-green-500',
      bgGradient: 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30',
      stats: [{ label: 'Advocates', value: '100+' }],
    },
    {
      id: 'clean-water',
      categoryId: 'environment',
      title: 'Clean Water Initiatives',
      subtitle: 'Safe Water',
      objective: 'To provide access to safe drinking water.',
      challenges: ['Contaminated water sources', 'Waterborne diseases'],
      solutions: ['Water source protection', 'Filter distribution', 'Testing kits'],
      outcomes: ['Safe drinking water', 'Reduced illness'],
      icon: 'Droplets',
      color: 'from-emerald-500 to-green-500',
      bgGradient: 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30',
      stats: [{ label: 'Filters', value: '200+' }],
    },
    {
      id: 'eco-clubs',
      categoryId: 'environment',
      title: 'Eco-Club Formation',
      subtitle: 'Young Guardians',
      objective: 'To mobilize students for environmental protection.',
      challenges: ['Lack of youth engagement', 'Passive attitude'],
      solutions: ['Forming clubs in schools', 'Green activities', 'Competitions'],
      outcomes: ['Active youth participation', 'Future environmental leaders'],
      icon: 'Users2',
      color: 'from-emerald-500 to-green-500',
      bgGradient: 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30',
      stats: [{ label: 'Clubs', value: '10+' }],
    },

    // Empowerment programs
    {
      id: 'women-skill',
      categoryId: 'empowerment',
      title: 'Women Skill Development',
      subtitle: 'Financial Independence',
      objective: 'To train women in income-generating skills.',
      challenges: ['Specific gender roles', 'Financial dependency', 'Lack of skills'],
      solutions: ['Tailoring & Knitting', 'Handicraft & Pickle making', 'Basic bookkeeping'],
      outcomes: ['Self-reliant women', 'Support to family income', 'Confidence building'],
      icon: 'Users',
      color: 'from-amber-500 to-orange-500',
      bgGradient: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30',
      stats: [{ label: 'Women Trained', value: '200+' }],
    },
    {
      id: 'youth-leadership',
      categoryId: 'empowerment',
      title: 'Youth Leadership',
      subtitle: 'Leading the Future',
      objective: 'To develop leadership qualities in youth.',
      challenges: ['Lack of direction', 'Unemployment frustration'],
      solutions: ['Leadership bootcamps', 'Public speaking', 'Project management'],
      outcomes: ['Capable leaders', 'Social change agents'],
      icon: 'Target',
      color: 'from-amber-500 to-orange-500',
      bgGradient: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30',
      stats: [{ label: 'Leaders', value: '50+' }],
    },
    {
      id: 'micro-enterprise',
      categoryId: 'empowerment',
      title: 'Micro-Enterprise Support',
      subtitle: 'Small Business',
      objective: 'To support small scale startups.',
      challenges: ['Lack of capital', 'No market linkage'],
      solutions: ['Seed money', 'Business planning', 'Market connection'],
      outcomes: ['Job creation', 'Local economic growth'],
      icon: 'Coins',
      color: 'from-amber-500 to-orange-500',
      bgGradient: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30',
      stats: [{ label: 'Startups', value: '10+' }],
    },
    {
      id: 'financial',
      categoryId: 'empowerment',
      title: 'Financial Literacy',
      subtitle: 'Smart Money',
      objective: 'To teach money management.',
      challenges: ['Debt traps', 'Lack of savings'],
      solutions: ['Banking basics', 'Saving groups', 'Loan management'],
      outcomes: ['Financial security', 'Wise investment'],
      icon: 'TrendingUp',
      color: 'from-amber-500 to-orange-500',
      bgGradient: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30',
      stats: [{ label: 'Literate', value: '500+' }],
    },
    {
      id: 'vocational',
      categoryId: 'empowerment',
      title: 'Vocational Training',
      subtitle: 'Technical Skills',
      objective: 'To provide technical skills for employment.',
      challenges: ['Unskilled labor', 'Low wages'],
      solutions: ['Plumbing', 'Electrician', 'Carpentry', 'Mobile repair'],
      outcomes: ['Skilled workforce', 'Higher income'],
      icon: 'Hammer',
      color: 'from-amber-500 to-orange-500',
      bgGradient: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30',
      stats: [{ label: 'Certified', value: '100+' }],
    },

    // Community programs
    {
      id: 'infrastructure',
      categoryId: 'community',
      title: 'Rural Infrastructure',
      subtitle: 'Building Foundations',
      objective: 'To improving community infrastructure.',
      challenges: ['Poor roads/trails', 'Dilapidated community buildings'],
      solutions: ['Trail repair', 'Community hall construction', 'Irrigation canals'],
      outcomes: ['Better connectivity', 'Social space'],
      icon: 'Building',
      color: 'from-violet-500 to-purple-500',
      bgGradient: 'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
      stats: [{ label: 'Projects', value: '5' }],
    },
    {
      id: 'disaster',
      categoryId: 'community',
      title: 'Disaster Relief',
      subtitle: 'Emergency Support',
      objective: 'To provide immediate relief during disasters.',
      challenges: ['Frequent landslides/floods', 'Slow response'],
      solutions: ['Food/Clothes distribution', 'Temporary shelter', 'First aid'],
      outcomes: ['Lives saved', 'Immediate comfort'],
      icon: 'Tent',
      color: 'from-violet-500 to-purple-500',
      bgGradient: 'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
      stats: [{ label: 'Families', value: '100+' }],
    },
    {
      id: 'livelihood',
      categoryId: 'community',
      title: 'Livelihood Support',
      subtitle: 'Sustainable Income',
      objective: 'To enhance agricultural livelihood.',
      challenges: ['Subsistence farming', 'New pests'],
      solutions: ['Modern farming seeds', 'Goat/Poultry farming', 'Organic manure'],
      outcomes: ['Increased production', 'Food security'],
      icon: 'Leaf',
      color: 'from-violet-500 to-purple-500',
      bgGradient: 'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
      stats: [{ label: 'Farmers', value: '200+' }],
    },
    {
      id: 'social-awareness',
      categoryId: 'community',
      title: 'Social Awareness',
      subtitle: 'Justice & Rights',
      objective: 'To fight social evils.',
      challenges: ['Domestic violence', 'Human trafficking', 'Discrimination'],
      solutions: ['Rallies', 'Street dramas', 'Legal counseling'],
      outcomes: ['Aware society', 'Reduced crime'],
      icon: 'Megaphone',
      color: 'from-violet-500 to-purple-500',
      bgGradient: 'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
      stats: [{ label: 'Events', value: '10+' }],
    },
    {
      id: 'capacity',
      categoryId: 'community',
      title: 'Capacity Building',
      subtitle: 'Strengthening Institutions',
      objective: 'To strengthen local groups.',
      challenges: ['Weak management in CBOs', 'Lack of documentation'],
      solutions: ['Account keeping training', 'Proposal writing', 'Governance workshop'],
      outcomes: ['Strong local institutions', 'Sustainability'],
      icon: 'Users2',
      color: 'from-violet-500 to-purple-500',
      bgGradient: 'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
      stats: [{ label: 'Groups', value: '20+' }],
    },
  ],
};

export function loadAdminContent(): AdminContent {
  if (typeof window === 'undefined') {
    return defaultAdminContent;
  }

  try {
    const raw = window.localStorage.getItem(ADMIN_CONTENT_STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(ADMIN_CONTENT_STORAGE_KEY, JSON.stringify(defaultAdminContent));
      return defaultAdminContent;
    }

    const parsed = JSON.parse(raw) as Partial<AdminContent>;
    return {
      ...defaultAdminContent,
      ...parsed,
      impactDashboard: {
        ...defaultAdminContent.impactDashboard,
        ...(parsed.impactDashboard ?? {}),
      },
      impactAreasSection: {
        ...defaultAdminContent.impactAreasSection,
        ...(parsed.impactAreasSection ?? {}),
      },
      programCategories: parsed.programCategories ?? defaultAdminContent.programCategories,
      programs: parsed.programs ?? defaultAdminContent.programs,
    };
  } catch (error) {
    console.error('Failed to load admin content from localStorage', error);
    return defaultAdminContent;
  }
}

export function resolveLucideIcon(icons: Record<string, LucideIcon>, name: string): LucideIcon {
  return (icons[name] as LucideIcon) || icons.Sparkles;
}

export function saveAdminContent(content: AdminContent) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ADMIN_CONTENT_STORAGE_KEY, JSON.stringify(content));
}
