import { motion } from 'framer-motion';
import { Calendar, Layers, Users, Globe, MapPin, Briefcase, Rocket, BarChart3, LucideIcon } from 'lucide-react';
import { fadeUp, fadeRight, blurFadeUp, staggerContainer, viewportConfig } from '../utils/animations';
import { stats } from '../utils/data';
import AnimatedCounter from '../components/AnimatedCounter';

const statIcons: Record<string, LucideIcon> = {
  calendar: Calendar,
  layers: Layers,
  users: Users,
  globe: Globe,
};

const quickFacts = [
  { icon: MapPin, label: 'Philippines', color: '#22D3EE' },
  { icon: Briefcase, label: '3+ Roles', color: '#3B82F6' },
  { icon: Rocket, label: 'Founder & CEO', color: '#A855F7' },
  { icon: BarChart3, label: 'Data-Driven', color: '#F59E0B' },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 px-4 overflow-hidden">
      {/* Ambient glow — static, no per-frame cost */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-purple/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-center text-center mb-20"
        >
          <span className="section-label mb-4">Who I Am</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            About Me
          </h2>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="space-y-7"
          >
            {/* Lead statement — Apple-style pull quote */}
            <motion.p
              variants={blurFadeUp}
              className="text-2xl sm:text-3xl font-bold text-white leading-snug tracking-tight"
            >
              <span className="gradient-text">3+ years</span> turning business problems into
              shipped software — as a developer, PM, and founder.
            </motion.p>

            {/* Supporting copy with accent rail */}
            <motion.div variants={blurFadeUp} className="relative pl-6 space-y-5">
              <div className="absolute left-0 top-1 bottom-1 w-px bg-gradient-to-b from-primary via-purple/50 to-transparent" />

              <p className="text-white/55 text-[15px] leading-relaxed">
                I am a technology professional with over <span className="text-white/80 font-medium">three years of experience</span> spanning software development, project management, customer support, and data analytics.
              </p>
              <p className="text-white/55 text-[15px] leading-relaxed">
                Throughout my career, I have worked closely with clients, managed software projects, analyzed business requirements, and developed modern web applications that solve practical business problems.
              </p>
              <p className="text-white/55 text-[15px] leading-relaxed">
                As the <span className="text-white/80 font-medium">Founder and CEO of CoreTek Digital Solutions</span>, I lead projects from planning to deployment while collaborating with clients and developers to deliver scalable digital products.
              </p>
              <p className="text-white/55 text-[15px] leading-relaxed">
                I continuously improve my skills in software engineering, data analytics, cloud technologies, automation, and artificial intelligence to stay ahead in the ever-evolving technology industry.
              </p>
            </motion.div>

            {/* Quick facts */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
              {quickFacts.map((fact) => (
                <span
                  key={fact.label}
                  className="flex items-center gap-2 pl-2.5 pr-4 py-2 rounded-xl glass border border-white/8 text-sm text-white/70 font-medium transition-colors duration-200 hover:border-white/20"
                >
                  <span
                    className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${fact.color}1A`, color: fact.color }}
                  >
                    <fact.icon size={13} />
                  </span>
                  {fact.label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => {
              const Icon = statIcons[stat.icon] ?? Calendar;
              return (
                <motion.div
                  key={stat.label}
                  variants={fadeRight}
                  className="group relative rounded-2xl p-6 bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/8 overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-70"
                    style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
                  />

                  {/* Glow on hover — opacity only, no layout/paint cost when idle */}
                  <div
                    className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
                    style={{ background: stat.color }}
                  />

                  <div
                    className="relative w-9 h-9 rounded-lg flex items-center justify-center mb-4 border"
                    style={{
                      background: `linear-gradient(135deg, ${stat.color}25, ${stat.color}05)`,
                      borderColor: `${stat.color}35`,
                      color: stat.color,
                    }}
                  >
                    <Icon size={16} />
                  </div>

                  <div
                    className="relative text-4xl font-extrabold mb-1 bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${stat.color}, #fff)` }}
                  >
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="relative text-white font-semibold text-sm mb-1">{stat.label}</div>
                  <div className="relative text-white/35 text-xs">{stat.description}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
