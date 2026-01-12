import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import * as Icons from 'lucide-react';
import { loadAdminContent, resolveLucideIcon } from '@/lib/admin-content';

export default function ImpactAreasGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const content = loadAdminContent();
  const section = content.impactAreasSection;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-wide" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16 px-4"
        >
          <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">
            {section.badge}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2 sm:mt-3 mb-3 sm:mb-4 leading-tight px-2">
            {section.title}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {section.description}
          </p>
        </motion.div>

        {/* Impact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 px-4 sm:px-0">
          {section.areas.map((area, index) => {
            const Icon = resolveLucideIcon(Icons, area.icon);
            return (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group cursor-pointer h-full"
            >
              <div className="glass-card h-full p-4 sm:p-5 md:p-6 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-primary/10 flex flex-col">
                {/* Icon Container */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${area.color} flex items-center justify-center mb-3 sm:mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${area.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="font-serif text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                  {area.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 flex-1">
                  {area.description}
                </p>

                {/* Hover Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="mt-auto flex items-center text-primary font-medium text-sm"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
}
