import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/helpers';

/**
 * AnimatedJar - SVG jar that fills with animated liquid
 * Color-coded: mint (saving), sun (spending), leaf (sharing)
 */

const JAR_COLORS = {
  saving: {
    liquid: ['#14b89c', '#0d9480'],
    glow: 'rgba(20, 184, 156, 0.3)',
    label: 'text-mint-700',
    bg: 'from-mint-100 to-mint-50',
    bubble: '#9af5df',
  },
  spending: {
    liquid: ['#facc15', '#eab308'],
    glow: 'rgba(250, 204, 21, 0.3)',
    label: 'text-sun-700',
    bg: 'from-sun-100 to-sun-50',
    bubble: '#fef08a',
  },
  sharing: {
    liquid: ['#22c55e', '#16a34a'],
    glow: 'rgba(34, 197, 94, 0.3)',
    label: 'text-leaf-700',
    bg: 'from-leaf-100 to-leaf-50',
    bubble: '#bbf7d0',
  },
};

export default function AnimatedJar({
  type = 'saving',
  label,
  emoji,
  amount = 0,
  percentage = 0,
  delay = 0,
  size = 'md',
}) {
  const colors = JAR_COLORS[type];
  const fillPercent = Math.min(Math.max(percentage, 5), 95);
  const isSmall = size === 'sm';
  const jarHeight = isSmall ? 100 : 140;
  const jarWidth = isSmall ? 80 : 100;

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Jar SVG */}
      <div className="relative" style={{ width: jarWidth, height: jarHeight }}>
        <svg
          viewBox="0 0 100 140"
          width={jarWidth}
          height={jarHeight}
          className="drop-shadow-lg"
        >
          {/* Jar body */}
          <defs>
            <linearGradient id={`liquid-${type}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.liquid[0]} stopOpacity="0.85" />
              <stop offset="100%" stopColor={colors.liquid[1]} stopOpacity="0.95" />
            </linearGradient>
            <clipPath id={`jar-clip-${type}`}>
              <path d="M20 35 Q20 30 25 28 L35 22 Q38 20 38 17 L38 12 Q38 8 42 8 L58 8 Q62 8 62 12 L62 17 Q62 20 65 22 L75 28 Q80 30 80 35 L80 120 Q80 130 70 130 L30 130 Q20 130 20 120 Z" />
            </clipPath>
          </defs>

          {/* Jar outline */}
          <path
            d="M20 35 Q20 30 25 28 L35 22 Q38 20 38 17 L38 12 Q38 8 42 8 L58 8 Q62 8 62 12 L62 17 Q62 20 65 22 L75 28 Q80 30 80 35 L80 120 Q80 130 70 130 L30 130 Q20 130 20 120 Z"
            fill="rgba(255,255,255,0.5)"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="2"
          />

          {/* Liquid fill */}
          <g clipPath={`url(#jar-clip-${type})`}>
            <motion.rect
              x="18"
              width="64"
              fill={`url(#liquid-${type})`}
              rx="2"
              initial={{ y: 132, height: 0 }}
              animate={{
                y: 132 - (fillPercent / 100) * 122,
                height: (fillPercent / 100) * 122,
              }}
              transition={{
                duration: 1.2,
                delay: delay + 0.3,
                ease: 'easeOut',
              }}
            />

            {/* Liquid surface wave */}
            <motion.ellipse
              cx="50"
              rx="30"
              ry="4"
              fill={colors.liquid[0]}
              opacity="0.4"
              initial={{ cy: 132 }}
              animate={{
                cy: 132 - (fillPercent / 100) * 122,
              }}
              transition={{
                duration: 1.2,
                delay: delay + 0.3,
                ease: 'easeOut',
              }}
            />

            {/* Bubbles */}
            {[25, 45, 65].map((cx, i) => (
              <motion.circle
                key={i}
                cx={cx + 10}
                r={2 + i}
                fill={colors.bubble}
                opacity="0.5"
                initial={{ cy: 128 }}
                animate={{
                  cy: [128, 128 - (fillPercent / 100) * 100, 128 - (fillPercent / 100) * 60],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 2,
                  delay: delay + 0.8 + i * 0.4,
                  repeat: Infinity,
                  repeatDelay: 3 + i,
                }}
              />
            ))}
          </g>

          {/* Jar glass shine */}
          <path
            d="M28 40 Q28 35 32 35 L36 35 Q32 40 32 50 L28 50 Z"
            fill="rgba(255,255,255,0.4)"
          />

          {/* Jar lid */}
          <rect x="34" y="5" width="32" height="5" rx="2" fill="rgba(150,150,150,0.3)" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
        </svg>

        {/* Emoji overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl pointer-events-none select-none opacity-80">
          {emoji}
        </div>
      </div>

      {/* Label */}
      <div className="text-center mt-2">
        <div className={`text-sm font-semibold ${colors.label}`}>{label}</div>
        <div className="text-lg font-bold text-gray-800 font-[Quicksand]">
          {formatCurrency(amount)}
        </div>
        <div className={`text-xs ${colors.label} font-medium opacity-70`}>{percentage}%</div>
      </div>
    </motion.div>
  );
}
