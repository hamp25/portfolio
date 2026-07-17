import { motion } from 'framer-motion';
import { skillCategories } from '../utils/data';
import { fadeUp, cardVariant, staggerContainer, viewportConfig } from '../utils/animations';

export default function Skills() {
  const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0);

  return (
    <section id="skills" className="relative py-32 px-4 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-center text-center mb-6"
        >
          <span className="section-label mb-4">Technical Expertise</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Skills
          </h2>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-5" />
          <p className="max-w-xl text-sm sm:text-base text-white/40 leading-relaxed">
            {skillCategories.length} disciplines, {totalSkills}+ tools mastered across the full
            stack — from writing production code to turning raw data into decisions.
          </p>
        </motion.div>

        {/* Category grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-16"
        >
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.name}
              variants={cardVariant}
              className="group relative rounded-2xl p-6 bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/8 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
              style={{
                boxShadow: `0 0 0 rgba(0,0,0,0)`,
              }}
              whileHover={{
                boxShadow: `0 20px 40px -15px ${cat.color}30`,
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-70"
                style={{ background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)` }}
              />

              {/* Corner glow on hover */}
              <div
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
                style={{ background: cat.color }}
              />

              {/* Header */}
              <div className="relative flex items-center gap-3.5 mb-7">
                <div
                  className="relative w-11 h-11 shrink-0 rounded-xl flex items-center justify-center text-lg font-bold border"
                  style={{
                    background: `linear-gradient(135deg, ${cat.color}25, ${cat.color}05)`,
                    borderColor: `${cat.color}35`,
                    color: cat.color,
                  }}
                >
                  {cat.icon}
                </div>
                <div>
                  <div className="text-white font-bold text-[15px] tracking-wide">{cat.name}</div>
                  <div className="text-white/30 text-[10px] font-semibold uppercase tracking-widest mt-0.5">
                    {cat.skills.length} Skills
                  </div>
                </div>
              </div>

              {/* Skill proficiency bars */}
              <div className="relative space-y-4">
                {cat.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-white/70 text-[13px] font-medium">{skill.name}</span>
                      <span
                        className="text-[10px] font-mono font-semibold tabular-nums"
                        style={{ color: `${cat.color}90` }}
                      >
                        {skill.level ?? 80}%
                      </span>
                    </div>
                    <div className="h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${cat.color}80, ${cat.color})` }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level ?? 80}%` }}
                        viewport={viewportConfig}
                        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
