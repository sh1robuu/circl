import { motion } from 'framer-motion';
import { Check, Lock, Play } from 'lucide-react';

/**
 * CurriculumTimeline - Visual 8-week curriculum roadmap
 * Shows completed, active, and locked weeks with animations
 */

const statusConfig = {
  completed: {
    bg: 'bg-gradient-to-br from-leaf-400 to-leaf-600',
    ring: 'ring-leaf-200',
    icon: Check,
    iconColor: 'text-white',
    lineColor: 'bg-leaf-400',
    label: 'text-leaf-700',
    glow: false,
  },
  active: {
    bg: 'bg-gradient-to-br from-mint-400 to-leaf-500',
    ring: 'ring-mint-200',
    icon: Play,
    iconColor: 'text-white',
    lineColor: 'bg-gray-200',
    label: 'text-mint-700',
    glow: true,
  },
  locked: {
    bg: 'bg-gray-200',
    ring: 'ring-gray-100',
    icon: Lock,
    iconColor: 'text-gray-400',
    lineColor: 'bg-gray-200',
    label: 'text-gray-400',
    glow: false,
  },
};

export default function CurriculumTimeline({ challenges, compact = false }) {
  if (!challenges?.length) return null;

  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        {challenges.map((c, i) => {
          const config = statusConfig[c.status];
          return (
            <motion.div
              key={c.id}
              className={`w-4 h-4 rounded-full ${config.bg} ${
                config.glow ? 'animate-glow' : ''
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 300 }}
              title={`Tuần ${c.week}: ${c.title}`}
            >
              {c.status === 'completed' && (
                <Check size={10} className="text-white m-auto mt-[3px]" />
              )}
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative">
      {challenges.map((challenge, index) => {
        const config = statusConfig[challenge.status];
        const Icon = config.icon;
        const isLast = index === challenges.length - 1;

        return (
          <motion.div
            key={challenge.id}
            className="flex items-start gap-4 relative"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
          >
            {/* Node + Line */}
            <div className="flex flex-col items-center">
              <motion.div
                className={`w-10 h-10 rounded-full ${config.bg} ring-4 ${config.ring} flex items-center justify-center ${
                  config.glow ? 'animate-glow' : ''
                }`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Icon size={16} className={config.iconColor} />
              </motion.div>
              {!isLast && (
                <div className={`w-0.5 h-10 ${config.lineColor} mt-1`} />
              )}
            </div>

            {/* Content */}
            <div className={`pb-6 flex-1 ${challenge.status === 'locked' ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${config.label}`}>
                  Tuần {challenge.week}
                </span>
                {challenge.status === 'active' && (
                  <span className="text-[10px] bg-mint-100 text-mint-700 px-2 py-0.5 rounded-full font-medium">
                    Đang học
                  </span>
                )}
                {challenge.xpReward && challenge.status !== 'locked' && (
                  <span className="text-[10px] text-sun-600 font-medium">
                    +{challenge.xpReward} XP
                  </span>
                )}
              </div>
              <div className={`text-sm font-semibold mt-0.5 ${
                challenge.status === 'locked' ? 'text-gray-400' : 'text-gray-800'
              }`}>
                {challenge.title}
              </div>
              {challenge.subtitle && challenge.status !== 'locked' && (
                <div className="text-xs text-gray-500 mt-0.5">{challenge.subtitle}</div>
              )}
              {challenge.skillTags?.length > 0 && challenge.status === 'completed' && (
                <div className="flex gap-1 mt-1.5 flex-wrap">
                  {challenge.skillTags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] bg-leaf-50 text-leaf-700 px-2 py-0.5 rounded-full"
                    >
                      ✓ {tag.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
