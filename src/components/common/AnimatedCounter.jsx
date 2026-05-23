import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * AnimatedCounter - Counts from 0 to target value with animation
 * Supports currency formatting and custom suffixes
 */
export default function AnimatedCounter({
  value,
  duration = 1.5,
  className = '',
  prefix = '',
  suffix = '',
  currency = false,
  decimals = 0,
  delay = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const delayMs = delay * 1000;

    const timeout = setTimeout(() => {
      const animate = () => {
        const elapsed = Date.now() - startTime - delayMs;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        // Ease out cubic for smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * value;
        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };
      animate();
    }, delayMs);

    return () => clearTimeout(timeout);
  }, [isInView, value, duration, delay]);

  const formatValue = (val) => {
    if (currency) {
      return new Intl.NumberFormat('vi-VN').format(Math.round(val)) + 'đ';
    }
    if (decimals > 0) {
      return val.toFixed(decimals);
    }
    return Math.round(val).toString();
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
    >
      {prefix}{formatValue(displayValue)}{suffix}
    </motion.span>
  );
}
