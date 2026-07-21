import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { fadeUp, cardVariant, staggerContainer, viewportConfig } from '../utils/animations';

const testimonials = [
  {
    name: 'Maria Santos',
    role: 'CEO, TechStartup PH',
    avatar: 'MS',
    color: '#3B82F6',
    stars: 5,
    text: "Humphrey delivered our web platform ahead of schedule with exceptional quality. His ability to combine technical expertise with business understanding is rare. The project exceeded our expectations in every way.",
  },
  {
    name: 'James Reyes',
    role: 'Operations Manager, Mabizza IT',
    avatar: 'JR',
    color: '#A855F7',
    stars: 5,
    text: "Working with Humphrey as our Project Manager transformed how our team delivers software. His Agile implementation cut our delivery time by 40% and improved team communication significantly.",
  },
  {
    name: 'Ana Cruz',
    role: 'Data Director, RetailCo',
    avatar: 'AC',
    color: '#22D3EE',
    stars: 5,
    text: "The Power BI dashboards Humphrey built gave us insights we never had before. Our executive team now makes data-driven decisions daily. Truly a game-changer for our business intelligence.",
  },
  {
    name: 'Carlo Dizon',
    role: 'Founder, DigitalEdge',
    avatar: 'CD',
    color: '#6366F1',
    stars: 5,
    text: "Humphrey's full-stack skills are impressive, but what sets him apart is his ownership mindset. He treats your project like his own business. Would work with him again without hesitation.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-center text-center mb-20"
        >
          <span className="section-label mb-4">Kind Words</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            What Clients Say
          </h2>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid sm:grid-cols-2 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariant}
              className="glass glass-hover rounded-2xl p-7 border border-card-border relative group"
              whileHover={{ borderColor: `${t.color}30` }}
            >
              {/* Quote icon */}
              <div
                className="absolute top-5 right-6 opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ color: t.color }}
              >
                <Quote size={48} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array(t.stars).fill(0).map((_, i) => (
                  <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/65 text-sm leading-relaxed mb-6 italic">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-white/35 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
