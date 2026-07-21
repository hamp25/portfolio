import { motion } from 'framer-motion';

interface Props {
  flip?: boolean;
}

export default function SectionDivider({ flip = false }: Props) {
  return (
    <div className={`relative flex items-center justify-center py-2 ${flip ? 'scale-x-[-1]' : ''}`}>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-px w-1/3 bg-gradient-to-r from-transparent via-primary/40 to-transparent origin-left"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mx-4 flex items-center gap-2"
      >
        <div className="w-1 h-1 rounded-full bg-primary/60" />
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-1 h-1 rounded-full bg-primary/60" />
      </motion.div>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-px w-1/3 bg-gradient-to-r from-transparent via-purple/40 to-transparent origin-right"
      />
    </div>
  );
}
