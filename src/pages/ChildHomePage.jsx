import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Wallet, Bot, Package, Flame, Star, Trophy } from 'lucide-react';
import useStore from '../store/useStore';
import GlassCard from '../components/common/GlassCard';
import ProgressRing from '../components/common/ProgressRing';

export default function ChildHomePage() {
  const { currentUser, challenges } = useStore();
  const activeChallenge = challenges.find((c) => c.status === 'active');
  const completedCount = challenges.filter((c) => c.status === 'completed').length;
  const totalWeeks = challenges.length;
  const progressPercent = (completedCount / totalWeeks) * 100;

  const quickActions = [
    {
      to: '/child/challenge',
      icon: Target,
      emoji: '🎯',
      label: 'Làm nhiệm vụ tuần',
      desc: activeChallenge?.title || 'Đã hoàn thành!',
      color: 'from-mint-400 to-mint-600',
    },
    {
      to: '/child/jars',
      icon: Wallet,
      emoji: '🏦',
      label: 'Ví 3 Lọ',
      desc: 'Phân bổ & xem sổ',
      color: 'from-leaf-400 to-leaf-600',
    },
    {
      to: '/child/teach-ai',
      icon: Bot,
      emoji: '🤖',
      label: 'Bé dạy AI',
      desc: 'Dạy lại bài học',
      color: 'from-sun-400 to-sun-500',
    },
    {
      to: '/child/items',
      icon: Package,
      emoji: '📦',
      label: 'Món đồ của con',
      desc: `${5} món đồ`,
      color: 'from-coral-400 to-coral-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">{currentUser?.avatar}</span>
          <div>
            <h1 className="font-[Quicksand] text-2xl md:text-3xl font-bold text-gray-800">
              Chào {currentUser?.name}! 👋
            </h1>
            <p className="text-gray-500 text-sm">Hôm nay con muốn học gì nào?</p>
          </div>
        </div>
      </motion.div>

      {/* Streak & Progress Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <GlassCard padding="p-4" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coral-400 to-coral-500 flex items-center justify-center text-white">
            <Flame size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800 font-[Quicksand]">
              {currentUser?.streak || 5}
            </div>
            <div className="text-xs text-gray-500">🔥 Streak ngày</div>
          </div>
        </GlassCard>

        <GlassCard padding="p-4" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sun-400 to-sun-500 flex items-center justify-center text-white">
            <Star size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800 font-[Quicksand]">
              {currentUser?.xp || 340}
            </div>
            <div className="text-xs text-gray-500">⭐ Điểm XP</div>
          </div>
        </GlassCard>

        <GlassCard padding="p-4" className="col-span-2 md:col-span-1 flex items-center gap-4">
          <ProgressRing progress={progressPercent} size={56} strokeWidth={5}>
            <span className="text-xs font-bold text-gray-700">
              {completedCount}/{totalWeeks}
            </span>
          </ProgressRing>
          <div>
            <div className="text-sm font-semibold text-gray-800">Pilot 8 tuần</div>
            <div className="text-xs text-gray-500">Tuần {completedCount + 1} / {totalWeeks}</div>
          </div>
        </GlassCard>
      </div>

      {/* Current Challenge */}
      {activeChallenge && (
        <Link to="/child/challenge">
          <GlassCard className="border-2 border-mint-200 bg-gradient-to-r from-mint-50/80 to-leaf-50/80">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="inline-flex items-center gap-1.5 bg-mint-100 text-mint-700 text-xs px-2.5 py-1 rounded-full font-medium mb-3">
                  <Target size={12} />
                  Nhiệm vụ tuần {activeChallenge.week}
                </div>
                <h3 className="font-[Quicksand] text-lg font-bold text-gray-800 mb-1">
                  {activeChallenge.title}
                </h3>
                <p className="text-sm text-gray-500">{activeChallenge.subtitle}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-mint-600 text-sm font-semibold">
                  Bắt đầu làm →
                </div>
              </div>
              <div className="text-5xl ml-4 animate-float">🎯</div>
            </div>
          </GlassCard>
        </Link>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="font-[Quicksand] font-bold text-lg text-gray-800 mb-4">
          Hoạt động nhanh
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, idx) => (
            <Link key={idx} to={action.to}>
              <motion.div
                className="glass rounded-2xl p-4 hover:shadow-lg hover:bg-white/75 transition-all duration-300 h-full"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-xl mb-3 shadow-md`}
                >
                  {action.emoji}
                </div>
                <div className="font-semibold text-gray-800 text-sm mb-0.5">{action.label}</div>
                <div className="text-xs text-gray-500">{action.desc}</div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Badges */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="text-sun-500" size={18} />
          <h3 className="font-semibold text-gray-800">Huy hiệu của con</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {(currentUser?.badges || []).map((badge, idx) => (
            <motion.span
              key={idx}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-sun-50 to-sun-100 text-sun-700 text-xs px-3 py-1.5 rounded-full font-medium border border-sun-200"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              🏅 {badge}
            </motion.span>
          ))}
        </div>
      </GlassCard>

      {/* Toy Reset Week promo */}
      <GlassCard className="bg-gradient-to-r from-leaf-50/80 to-mint-50/80 border border-leaf-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">♻️</div>
          <div className="flex-1">
            <div className="font-[Quicksand] font-bold text-gray-800">Toy Reset Week</div>
            <p className="text-sm text-gray-500 mt-0.5">
              Tuần đặc biệt — dọn phòng, tìm đồ cũ, và cho chúng cuộc sống mới! 🌱
            </p>
          </div>
          <Link
            to="/child/items"
            className="bg-leaf-500 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-leaf-600 transition-colors whitespace-nowrap"
          >
            Khám phá
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
