import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, FileCheck, MapPin, Globe, Target } from 'lucide-react';


function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

interface StatCardProps {
  icon: React.ElementType;
  value: string | number;
  label: string;
  suffix?: string;
  delay?: number;
  isDate?: boolean;
  isNumber?: boolean;
  isText?: boolean;
}

function StatCard({ icon: Icon, value, label, suffix = '', delay = 0, isText = false }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="impact-card text-center group h-full flex flex-col relative"
      whileHover={{ y: -3, scale: 1.01 }}
    >
      {/* Animated gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

      <div className="relative z-10 flex flex-col h-full min-h-full">
        {/* Icon */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md shadow-primary/20 shrink-0">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary dark:text-primary-light" />
        </div>

        {/* Value */}
        <div className="mb-2 sm:mb-3 md:mb-4 flex-1 flex flex-col justify-center px-0.5 sm:px-1 md:px-2 overflow-visible w-full">
          {typeof value === 'number' ? (
            <div className="stat-value gradient-text break-words overflow-visible leading-tight">
              <AnimatedCounter end={value} />
              {suffix}
            </div>
          ) : (
            <div className={`font-serif font-bold gradient-text leading-tight break-words overflow-visible whitespace-normal w-full ${(value as string).length > 20
              ? 'text-[10px] sm:text-xs md:text-sm lg:text-base'
              : (value as string).length > 10
                ? 'text-xs sm:text-sm md:text-base lg:text-lg'
                : (value as string).length > 7
                  ? 'text-sm sm:text-base md:text-lg lg:text-xl'
                  : 'text-base sm:text-lg md:text-xl lg:text-2xl'
              }`}>
              <span className="inline-block break-words px-0.5">{value}</span>
            </div>
          )}
        </div>

        {/* Label */}
        <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-semibold mt-auto uppercase tracking-wide px-1 sm:px-2 shrink-0 leading-tight">
          {label}
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent blur-xl" />
      </div>
    </motion.div>
  );
}

const stats: {
  icon: React.ElementType;
  value: string | number;
  label: string;
  suffix?: string;
  isDate?: boolean;
  isNumber?: boolean;
  isText?: boolean;
}[] = [
    { icon: Calendar, value: 'Oct 2025', label: 'Established', isDate: false },
    { icon: FileCheck, value: '377033', label: 'Registration No.', isNumber: false },
    { icon: MapPin, value: 'Kathmandu', label: 'Headquarters', isText: true },
    { icon: Globe, value: 'National & International', label: 'Reach', isText: true },
    { icon: Target, value: 5, label: 'Focus Areas', suffix: '+' },
  ];

export default function ImpactDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-gradient-to-b from-background to-muted/30 relative overflow-visible">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container-wide relative" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16 px-4"
        >
          <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">Our Impact</span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mt-2 sm:mt-3 mb-3 sm:mb-4 leading-tight px-2">
            Live Impact Dashboard
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Real-time overview of our foundation's reach and commitment to creating lasting change in communities.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 px-2 sm:px-4 md:px-0">
          {stats.map((stat, index) => (
            <div key={stat.label} className="overflow-visible min-w-0">
              <StatCard
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                delay={index * 0.1}
                isDate={stat.isDate}
                isNumber={stat.isNumber}
                isText={stat.isText}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
