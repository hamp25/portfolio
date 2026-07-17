import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2 } from 'lucide-react';
import { experiences } from '../utils/data';
import { fadeUp, fadeLeft, staggerContainer, viewportConfig } from '../utils/animations';

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 px-4">
      {/* Section ambient glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-center text-center mb-20"
        >
          <span className="section-label mb-4">Career Path</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Experience
          </h2>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-primary/40 via-purple/30 to-transparent hidden sm:block" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="space-y-8"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={fadeLeft}
                className="relative sm:pl-20"
              >
                {/* Timeline node */}
                <div
                  className="hidden sm:flex absolute left-0 top-6 w-12 h-12 rounded-full border-2 items-center justify-center glass"
                  style={{ borderColor: exp.color + '50' }}
                >
                  <Briefcase size={18} style={{ color: exp.color }} />
                </div>

                {/* Card */}
                <motion.div
                  className="glass glass-hover rounded-2xl p-6 sm:p-8 border border-card-border group cursor-default"
                  whileHover={{ borderColor: `${exp.color}30` }}
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                        <span
                          className="px-2 py-0.5 rounded-md text-xs font-semibold"
                          style={{ background: exp.color + '15', color: exp.color }}
                        >
                          {exp.type}
                        </span>
                      </div>
                      <div className="text-white/50 font-medium">{exp.company}</div>
                    </div>
                    <div
                      className="px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap self-start sm:self-auto"
                      style={{ background: exp.color + '12', color: exp.color }}
                    >
                      {exp.period}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/50 text-sm leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  {/* Responsibilities */}
                  <div className="grid sm:grid-cols-2 gap-2">
                    {exp.responsibilities.map((resp, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm text-white/45">
                        <CheckCircle2 size={13} style={{ color: exp.color, flexShrink: 0 }} />
                        {resp}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
