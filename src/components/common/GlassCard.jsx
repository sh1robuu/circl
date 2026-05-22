import { motion } from 'framer-motion';

/**
 * GlassCard - Glassmorphism card component
 * Core design element for CIRCL's visual system
 */
export default function GlassCard({
  children,
  className = '',
  hover = true,
  padding = 'p-6',
  onClick,
  animate = true,
}) {
  const baseClasses = `glass rounded-2xl ${padding} ${className}`;
  const hoverClasses = hover
    ? 'hover:shadow-lg hover:bg-white/75 transition-all duration-300 cursor-pointer'
    : '';

  if (!animate) {
    return (
      <div className={`${baseClasses} ${hoverClasses}`} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={hover ? { scale: 1.01 } : {}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
