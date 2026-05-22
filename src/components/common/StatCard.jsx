import { motion } from 'framer-motion';

/**
 * StatCard - Dashboard statistics card
 */
export default function StatCard({ icon, label, value, subtitle, color = 'mint', delay = 0 }) {
  const colorMap = {
    mint: 'from-mint-400 to-mint-600',
    leaf: 'from-leaf-400 to-leaf-600',
    sun: 'from-sun-400 to-sun-500',
    coral: 'from-coral-400 to-coral-600',
  };

  return (
    <motion.div
      className="glass rounded-2xl p-5 hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center text-white text-lg`}
        >
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-800 font-[Quicksand]">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
      {subtitle && <div className="text-xs text-gray-400 mt-0.5">{subtitle}</div>}
    </motion.div>
  );
}
