import { motion } from 'framer-motion';

const techs = [
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Python', icon: '🐍' },
  { name: 'Node.js', icon: '🟩' },
  { name: 'Laravel', icon: '🔴' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Power BI', icon: '📊' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Git', icon: '🔀' },
  { name: 'Figma', icon: '🖼️' },
  { name: 'Jira', icon: '📋' },
  { name: 'Tableau', icon: '📈' },
  { name: 'REST APIs', icon: '🔌' },
  { name: 'Framer Motion', icon: '✨' },
];

const Row = ({ items, reverse = false }: { items: typeof techs; reverse?: boolean }) => (
  <div className="flex overflow-hidden py-2">
    <motion.div
      className="flex gap-4 shrink-0"
      animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
    >
      {[...items, ...items].map((tech, i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl glass border border-white/6 whitespace-nowrap group hover:border-primary/30 transition-all duration-200 cursor-default"
        >
          <span className="text-lg">{tech.icon}</span>
          <span className="text-sm font-medium text-white/55 group-hover:text-white/80 transition-colors">
            {tech.name}
          </span>
        </div>
      ))}
    </motion.div>
  </div>
);

export default function TechMarquee() {
  const half = Math.ceil(techs.length / 2);
  const row1 = techs.slice(0, half);
  const row2 = techs.slice(half);

  return (
    <div className="relative py-8 overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-bg to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-bg to-transparent pointer-events-none" />

      <Row items={row1} />
      <Row items={row2} reverse />
    </div>
  );
}
