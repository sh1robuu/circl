import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/helpers';

/**
 * JarCard - Three Jars display card
 */
export default function JarCard({ type, label, emoji, amount, percentage, color, delay = 0 }) {
  const colorMap = {
    saving: {
      bg: 'bg-mint-50',
      bar: 'bg-gradient-to-r from-mint-400 to-mint-500',
      text: 'text-mint-700',
      border: 'border-mint-200',
    },
    spending: {
      bg: 'bg-sun-50',
      bar: 'bg-gradient-to-r from-sun-400 to-sun-500',
      text: 'text-sun-700',
      border: 'border-sun-200',
    },
    sharing: {
      bg: 'bg-leaf-50',
      bar: 'bg-gradient-to-r from-leaf-400 to-leaf-500',
      text: 'text-leaf-700',
      border: 'border-leaf-200',
    },
  };

  const c = colorMap[type] || colorMap.saving;

  return (
    <motion.div
      className={`${c.bg} border ${c.border} rounded-2xl p-5`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{emoji}</span>
        <div>
          <div className={`font-semibold ${c.text}`}>{label}</div>
          <div className="text-xl font-bold text-gray-800 font-[Quicksand]">
            {formatCurrency(amount)}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-3 bg-white/60 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${c.bar}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: 'easeOut' }}
        />
      </div>
      <div className={`text-xs mt-1.5 ${c.text} font-medium`}>{percentage}%</div>
    </motion.div>
  );
}
