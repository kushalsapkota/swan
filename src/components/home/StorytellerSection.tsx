import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Quote } from 'lucide-react';
import storytellerImage from '@/assets/storyteller-portrait.jpg';

const impactAreas = [
  { title: 'Education', desc: 'Supporting schools, providing scholarships and creating learning opportunities for all' },
  { title: 'Health', desc: 'Community health camps, medical assistance and health awareness programs' },
  { title: 'Environment', desc: 'Tree plantation drives, conservation programs and climate action initiatives' },
  { title: 'Empowerment', desc: 'Women and youth capacity building, skill development and leadership training' },
  { title: 'Community Development', desc: 'Infrastructure support, livelihood programs and disaster preparedness' },
];

export default function StorytellerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container-wide relative px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <motion.div
              style={{ y: imageY }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={storytellerImage}
                  alt="Community education in action"
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 glass-card p-4 sm:p-6 shadow-xl"
              >
                <div className="text-3xl sm:text-4xl font-serif font-bold gradient-text">377033</div>
                <div className="text-muted-foreground text-xs sm:text-sm">Regd. No.</div>
              </motion.div>

              {/* Decorative Frame */}
              <div className="hidden sm:block absolute -top-4 -left-4 w-16 h-16 sm:w-24 sm:h-24 border-t-4 border-l-4 border-primary/30 rounded-tl-3xl" />
              <div className="hidden sm:block absolute -bottom-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 border-b-4 border-r-4 border-secondary/50 rounded-br-3xl" />
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">About Us</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-6 sm:mb-8 leading-tight">
              About <span className="gradient-text">Swan Foundation</span>
            </h2>

            <p className="text-lg text-foreground/80 leading-relaxed mb-8">
              Swan Foundation is a registered non-profit organization (Reg. No. 377033) dedicated to creating sustainable positive change in Nepal through comprehensive social development initiatives. We work in education, health, environmental conservation, women and youth empowerment and community development.
            </p>

            {/* Impact Areas List */}
            <div className="relative pl-2 sm:pl-0">
              <div className="absolute left-[15px] sm:left-[7px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-muted" />
              <div className="space-y-4 sm:space-y-6">
                {impactAreas.map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3 sm:gap-4 pl-4 sm:pl-0"
                  >
                    <div className="timeline-dot shrink-0 mt-1.5 bg-primary" />
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-wide">{area.title}</span>
                      <div className="font-medium text-foreground text-sm sm:text-base leading-snug">{area.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
