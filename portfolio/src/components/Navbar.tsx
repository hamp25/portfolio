import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useActiveSection } from '../hooks/useActiveSection';
import { navItems } from '../utils/data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionIds = navItems.map((n) => n.href.replace('#', ''));
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4"
      >
        <div
          className={`flex items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-500 ${
            scrolled
              ? 'glass shadow-2xl shadow-black/40'
              : 'bg-transparent'
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => handleNav('#home')}
            className="mr-3 px-2 py-1.5 flex items-center gap-2 group"
          >
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-primary/30">
              H
            </div>
            <span className="text-sm font-semibold text-white/80 hidden sm:block group-hover:text-white transition-colors">
              Humphrey
            </span>
          </button>

          {/* Divider */}
          <div className="w-px h-4 bg-white/10 mr-2 hidden sm:block" />

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.href.replace('#', '');
              return (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className="relative px-3.5 py-1.5 text-sm font-medium transition-all duration-200 rounded-xl"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-xl bg-white/8 border border-white/10"
                      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <button
            onClick={() => handleNav('#contact')}
            className="ml-2 hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-all duration-200 shadow-lg shadow-primary/20"
          >
            Hire Me
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="ml-2 md:hidden w-8 h-8 flex items-center justify-center rounded-xl text-white/60 hover:text-white hover:bg-white/8 transition-all"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 glass rounded-2xl p-4 shadow-2xl shadow-black/60"
          >
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/6 transition-all"
              >
                {item.label}
              </button>
            ))}
            <div className="mt-2 pt-2 border-t border-white/8">
              <button
                onClick={() => handleNav('#contact')}
                className="block w-full text-center px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
