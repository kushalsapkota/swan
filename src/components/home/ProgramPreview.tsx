import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, GraduationCap, HeartPulse } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import educationImg from '@/assets/education-program.jpg';
import healthImg from '@/assets/health-program.jpg';

const programs = [
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Education Programs',
    subtitle: 'Building futures through knowledge',
    description:
      'Our education initiatives focus on providing quality learning opportunities to underprivileged children, scholarships for deserving students, and skill development programs for youth.',
    image: educationImg,
    stats: [
      { value: '500+', label: 'Students Supported' },
      { value: '10', label: 'Partner Schools' },
    ],
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'health',
    icon: HeartPulse,
    title: 'Health Programs',
    subtitle: 'Wellness for all communities',
    description:
      'We organize medical camps, health awareness sessions, and provide access to essential healthcare services for rural communities across Nepal.',
    image: healthImg,
    stats: [
      { value: '2000+', label: 'People Reached' },
      { value: '15', label: 'Medical Camps' },
    ],
    color: 'from-rose-500 to-rose-600',
  },
];

export default function ProgramPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-wide px-4 sm:px-6 lg:px-8" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">Our Work</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4 leading-tight">
            Featured Programs
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Discover how we're making a tangible difference in communities through our flagship initiatives.
          </p>
        </motion.div>

        {/* Program Cards */}
        <div className="space-y-8 sm:space-y-12 md:space-y-16">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className={`grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative group ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl"
                >
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-20`} />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 glass-card p-2 sm:p-3">
                    <program.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                </motion.div>

                {/* Stats Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                  className="absolute -bottom-3 sm:-bottom-4 left-4 right-4 sm:left-6 sm:right-6 lg:left-auto lg:right-6 lg:w-auto glass-card-strong p-3 sm:p-4 flex gap-4 sm:gap-8"
                >
                  {program.stats.map((stat) => (
                    <div key={stat.label} className="text-center flex-1 sm:flex-none">
                      <div className="text-xl sm:text-2xl font-serif font-bold gradient-text">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${program.color} text-white mb-3 sm:mb-4`}>
                  {program.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
                  {program.title}
                </h3>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-5 sm:mb-6">
                  {program.description}
                </p>
                <Link to="/programs">
                  <Button variant="heroOutline" size="lg" className="group w-full sm:w-auto">
                    View Program
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
