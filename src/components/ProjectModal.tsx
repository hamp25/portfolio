import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Project } from '../types';

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  // Close on Escape key, lock body scroll while open
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

          {/* macOS-style window */}
          <motion.div
            className="relative w-full max-w-3xl h-[70vh] rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 bg-[#1e1e1e] flex flex-col"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Title bar */}
            <div className="relative flex items-center gap-2 px-4 py-2.5 bg-[#2b2b2b] border-b border-white/5 shrink-0">
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all"
              />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="absolute left-1/2 -translate-x-1/2 text-[11px] sm:text-xs text-white/40 font-mono select-none max-w-[45%] truncate">
                {project.liveUrl ? project.liveUrl.replace(/^https?:\/\//, '') : project.title}
              </span>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto flex items-center gap-1.5 text-[11px] text-white/40 hover:text-white/80 font-medium transition-colors shrink-0"
                >
                  Open in new tab
                  <ExternalLink size={11} />
                </a>
              )}
            </div>

            {/* Body */}
            <div className="relative flex-1 bg-[#0a0a0a]">
              {project.liveUrl ? (
                <iframe
                  src={project.liveUrl}
                  title={project.title}
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-center px-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold border"
                    style={{ background: `${project.color}18`, borderColor: `${project.color}35`, color: project.color }}
                  >
                    {project.title.charAt(0)}
                  </div>
                  <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                  <p className="text-white/40 text-sm max-w-sm">
                    Live demo coming soon. In the meantime, check out the tech stack and
                    description on the project card.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
