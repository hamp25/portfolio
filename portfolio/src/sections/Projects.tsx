import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Clock } from 'lucide-react';
import { projects } from '../utils/data';
import { fadeUp, cardVariant, staggerContainer, viewportConfig } from '../utils/animations';
import { Project } from '../types';
import CodeThumbnail from '../components/CodeThumbnail';
import ProjectModal from '../components/ProjectModal';

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-32 px-4">
      {/* Ambient */}
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-center text-center mb-20"
        >
          <span className="section-label mb-4">Selected Work</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Featured Projects
          </h2>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>

        {/* Projects grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariant}
              className="glass rounded-2xl border border-card-border overflow-hidden group cursor-default"
              whileHover={{
                y: -6,
                borderColor: `${project.color}30`,
                boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${project.color}12`,
                transition: { duration: 0.25 },
              }}
            >
              {/* Thumbnail — mini code window */}
              {project.codeSnippet ? (
                <CodeThumbnail
                  filename={project.codeSnippet.filename}
                  lines={project.codeSnippet.lines}
                  accentColor={project.color}
                />
              ) : (
                <div className={`relative h-44 bg-gradient-to-br ${project.gradient}`} />
              )}

              {/* Content */}
              <div className="p-6">
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary-light transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md text-xs font-medium border"
                      style={{
                        background: project.color + '10',
                        borderColor: project.color + '25',
                        color: project.color + 'BB',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Live Demo / Coming Soon */}
                <button
                  onClick={() => setActiveProject(project)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: project.color, boxShadow: `0 4px 12px ${project.color}30` }}
                >
                  {project.liveUrl ? (
                    <>
                      <ExternalLink size={12} />
                      Live Demo
                    </>
                  ) : (
                    <>
                      <Clock size={12} />
                      Coming Soon
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Live Demo modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
