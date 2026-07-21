import { motion } from 'framer-motion';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { fadeUp, cardVariant, staggerContainer, viewportConfig } from '../utils/animations';

const posts = [
  {
    title: 'Building Scalable SaaS Applications with React and Laravel',
    excerpt: 'How I architect multi-tenant SaaS platforms that handle thousands of users without breaking a sweat — from database design to API structure.',
    date: 'July 2025',
    readTime: '8 min read',
    tag: 'Engineering',
    tagColor: '#3B82F6',
    gradient: 'from-blue-600/15 to-indigo-600/5',
  },
  {
    title: 'From Raw Data to Executive Insights: My Power BI Workflow',
    excerpt: 'A step-by-step breakdown of how I transform messy business data into clean, interactive dashboards that executives actually use every day.',
    date: 'June 2025',
    readTime: '6 min read',
    tag: 'Data Analytics',
    tagColor: '#F59E0B',
    gradient: 'from-amber-600/15 to-orange-600/5',
  },
  {
    title: 'Running Agile as a Solo Project Manager: Lessons Learned',
    excerpt: 'What I discovered managing software sprints across remote teams — tools, rituals, and mindset shifts that actually move the needle.',
    date: 'May 2025',
    readTime: '5 min read',
    tag: 'Project Management',
    tagColor: '#A855F7',
    gradient: 'from-purple-600/15 to-pink-600/5',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-center text-center mb-20"
        >
          <span className="section-label mb-4">Thoughts & Writing</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Blog
          </h2>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <p className="mt-4 text-white/40 text-sm max-w-md">
            I write about software engineering, data analytics, and building products — coming soon.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid md:grid-cols-3 gap-6"
        >
          {posts.map((post) => (
            <motion.div
              key={post.title}
              variants={cardVariant}
              className="glass glass-hover rounded-2xl overflow-hidden border border-card-border group cursor-pointer"
              whileHover={{ y: -4 }}
            >
              {/* Top gradient bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${post.gradient.replace('/15', '').replace('/5', '/40')}`} />

              <div className="p-6">
                {/* Tag + read time */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
                    style={{ background: post.tagColor + '15', color: post.tagColor }}
                  >
                    <Tag size={10} />
                    {post.tag}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-white/30">
                    <Clock size={10} />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-base leading-snug mb-3 group-hover:text-primary-light transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/6">
                  <span className="text-xs text-white/25">{post.date}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Coming soon <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
