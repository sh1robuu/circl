import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Flame, Star, Trophy, Sparkles, Zap, Gift, TrendingUp } from 'lucide-react';
import useStore from '../store/useStore';
import GlassCard from '../components/common/GlassCard';
import ProgressRing from '../components/common/ProgressRing';
import AnimatedCounter from '../components/common/AnimatedCounter';
import CurriculumTimeline from '../components/child/CurriculumTimeline';
import MotivationalBanner from '../components/child/MotivationalBanner';

const CHILD_AVATARS = ['🧒', '👦', '👧', '🦸', '🧑‍🚀', '🦊', '🐱', '🐶', '🐼', '🦁', '🐰', '🐸'];

const LEVELS = [
  { level: 1, name: 'Người học mới', xpNeeded: 0, emoji: '🌱' },
  { level: 2, name: 'Nhà tiết kiệm nhí', xpNeeded: 100, emoji: '🌿' },
  { level: 3, name: 'Nhà tái chế thông minh', xpNeeded: 250, emoji: '♻️' },
  { level: 4, name: 'Siêu sao tài chính', xpNeeded: 500, emoji: '⭐' },
  { level: 5, name: 'Anh hùng xanh', xpNeeded: 800, emoji: '🦸' },
  { level: 6, name: 'Bậc thầy CIRCL', xpNeeded: 1200, emoji: '👑' },
];

function getLevel(xp) {
  let current = LEVELS[0];
  for (const l of LEVELS) { if (xp >= l.xpNeeded) current = l; else break; }
  const nextLevel = LEVELS.find((l) => l.xpNeeded > xp) || current;
  const prevXp = current.xpNeeded;
  const nextXp = nextLevel.xpNeeded;
  const progress = nextXp === prevXp ? 100 : ((xp - prevXp) / (nextXp - prevXp)) * 100;
  return { ...current, nextLevel, progress, xpToNext: nextXp - xp };
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return { text: 'Chào buổi sáng', emoji: '🌅' };
  if (h < 18) return { text: 'Chào buổi chiều', emoji: '☀️' };
  return { text: 'Chào buổi tối', emoji: '🌙' };
}

const DAILY_CHALLENGES = [
  { id: 1, text: 'Tìm 1 món đồ cũ không dùng nữa', xp: 10, emoji: '🔍' },
  { id: 2, text: 'Hỏi ba mẹ về 1 thứ mình muốn mua', xp: 15, emoji: '💬' },
  { id: 3, text: 'Nghĩ 3 lý do nên tiết kiệm', xp: 10, emoji: '💡' },
];

export default function ChildHomePage() {
  const { currentUser, challenges, updateAvatar } = useStore();
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [dailyDone, setDailyDone] = useState([]);

  const activeChallenge = challenges.find((c) => c.status === 'active');
  const completedCount = challenges.filter((c) => c.status === 'completed').length;
  const totalWeeks = challenges.length;
  const xp = currentUser?.xp || 0;
  const level = getLevel(xp);
  const greeting = getGreeting();
  const avatarIdx = currentUser?.selectedAvatar ?? 0;
  const avatar = CHILD_AVATARS[avatarIdx] || '🧒';

  const handleDailyCheck = (id) => {
    if (dailyDone.includes(id)) return;
    setDailyDone((p) => [...p, id]);
  };

  const quickActions = [
    { to: '/child/challenge', emoji: '🎯', label: 'Nhiệm vụ tuần', desc: activeChallenge?.title || 'Hoàn thành!', color: 'from-mint-400 to-mint-600', hot: true },
    { to: '/child/jars', emoji: '🏦', label: 'Ví 3 Lọ', desc: 'Chia tiền thông minh', color: 'from-leaf-400 to-leaf-600' },
    { to: '/child/teach-ai', emoji: '🤖', label: 'Bé dạy AI', desc: 'Dạy lại bài học', color: 'from-sun-400 to-sun-500' },
    { to: '/child/items', emoji: '📦', label: 'Kho đồ của con', desc: `${useStore.getState().items.length} món đồ`, color: 'from-coral-400 to-coral-500' },
  ];

  return (
    <div className="space-y-5">
      {/* ===== HERO GREETING ===== */}
      <motion.div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-mint-400 via-leaf-400 to-leaf-500 p-5 md:p-6 text-white shadow-xl"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10" />

        <div className="relative flex items-center gap-4">
          {/* Avatar */}
          <motion.button onClick={() => setShowAvatarPicker(!showAvatarPicker)}
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/20 flex items-center justify-center text-4xl md:text-5xl border-2 border-white/30 hover:bg-white/30 transition-all cursor-pointer relative"
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }} whileTap={{ scale: 0.9 }}>
            {avatar}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-sun-400 flex items-center justify-center text-[10px] border-2 border-white">✏️</div>
          </motion.button>

          <div className="flex-1">
            <div className="text-white/70 text-xs font-medium">{greeting.emoji} {greeting.text}</div>
            <h1 className="font-[Quicksand] text-xl md:text-2xl font-bold">
              {currentUser?.name || 'Bạn nhỏ'}! <motion.span inline="true"
                animate={{ rotate: [0, 20, -10, 20, 0] }} transition={{ duration: 1.5, delay: 0.3 }}>👋</motion.span>
            </h1>

            {/* Level & XP bar */}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-lg">{level.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between text-[10px] text-white/80 mb-0.5">
                  <span className="font-semibold">Lv.{level.level} {level.name}</span>
                  <span>{xp} / {level.nextLevel.xpNeeded} XP</span>
                </div>
                <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-sun-300 to-sun-400 rounded-full"
                    initial={{ width: 0 }} animate={{ width: `${level.progress}%` }}
                    transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="relative grid grid-cols-3 gap-3 mt-4">
          {[
            { icon: <Flame size={16} />, value: currentUser?.streak || 5, label: 'Streak', suffix: '🔥' },
            { icon: <Star size={16} />, value: xp, label: 'XP', suffix: '⭐' },
            { icon: <Trophy size={16} />, value: completedCount, label: 'Tuần', suffix: '✅' },
          ].map((s, i) => (
            <div key={i} className="bg-white/15 rounded-xl px-3 py-2 text-center backdrop-blur-sm">
              <div className="text-lg font-bold font-[Quicksand]">
                <AnimatedCounter value={s.value} className="text-white" delay={i * 0.2} />
              </div>
              <div className="text-[10px] text-white/70">{s.suffix} {s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ===== AVATAR PICKER ===== */}
      <AnimatePresence>
        {showAvatarPicker && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <GlassCard className="border-2 border-sun-200 bg-sun-50/30">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="text-sun-500" size={16} />
                <h3 className="font-semibold text-gray-800 text-sm">Chọn nhân vật của con</h3>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {CHILD_AVATARS.map((av, idx) => (
                  <motion.button key={idx} onClick={() => { updateAvatar(idx); setShowAvatarPicker(false); }}
                    className={`w-full aspect-square rounded-xl flex items-center justify-center text-2xl transition-all ${
                      avatarIdx === idx ? 'bg-gradient-to-br from-mint-400 to-leaf-400 shadow-md ring-2 ring-mint-300' : 'bg-white/60 hover:bg-white/80'
                    }`}
                    whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                    {av}
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== MOTIVATIONAL BANNER ===== */}
      <MotivationalBanner completedWeeks={completedCount} />

      {/* ===== HỌC VIỆN XANH CTA ===== */}
      <Link to="/child/eco-academy">
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-leaf-500 via-leaf-600 to-mint-600 p-5 text-white shadow-lg">
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/5" />
            <div className="relative flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-white/20 text-white/90 text-[11px] px-2.5 py-1 rounded-full font-medium mb-2 backdrop-blur-sm">
                  🐿️ Sóc Xanh mời con học
                </div>
                <h3 className="font-[Quicksand] font-bold text-lg">Học viện Xanh</h3>
                <p className="text-white/80 text-xs mt-0.5">Học bảo vệ môi trường từ chính đồ trong nhà!</p>
              </div>
              <div className="text-4xl">🌿</div>
            </div>
          </div>
        </motion.div>
      </Link>

      {/* ===== ECO QUICK ACTIONS ===== */}
      <div className="grid grid-cols-2 gap-3">
        <Link to="/child/eco-encyclopedia">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="glass rounded-2xl p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-mint-100 flex items-center justify-center text-xl">🔍</div>
            <div>
              <h4 className="font-bold text-gray-800 text-xs">Bách Khoa Đồ Vật</h4>
              <p className="text-[10px] text-gray-500">8 nhóm đồ vật</p>
            </div>
          </motion.div>
        </Link>
        <Link to="/child/eco-academy">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="glass rounded-2xl p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-leaf-100 flex items-center justify-center text-xl">📝</div>
            <div>
              <h4 className="font-bold text-gray-800 text-xs">Thử Thách Xanh</h4>
              <p className="text-[10px] text-gray-500">Thử thách tuần này</p>
            </div>
          </motion.div>
        </Link>
      </div>

      {/* ===== CURRENT CHALLENGE (Big CTA) ===== */}
      {activeChallenge && (
        <Link to="/child/challenge">
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-mint-500 via-leaf-500 to-mint-600 p-5 text-white shadow-lg">
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/10" />
              <div className="relative flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-white/20 text-white/90 text-[11px] px-2.5 py-1 rounded-full font-medium mb-2 backdrop-blur-sm">
                    <Zap size={12} /> Nhiệm vụ tuần {activeChallenge.week}
                  </div>
                  <h3 className="font-[Quicksand] text-lg font-bold mb-0.5">{activeChallenge.title}</h3>
                  <p className="text-white/75 text-sm">{activeChallenge.subtitle}</p>
                  <div className="mt-2 inline-flex items-center gap-1.5 bg-white/20 text-white text-sm font-semibold px-3 py-1 rounded-lg backdrop-blur-sm">
                    <Sparkles size={14} /> Làm ngay! +{activeChallenge.xpReward} XP
                  </div>
                </div>
                <motion.div className="text-5xl ml-4" animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>🎯</motion.div>
              </div>
            </div>
          </motion.div>
        </Link>
      )}

      {/* ===== DAILY MINI QUESTS ===== */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-3">
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>⚡</motion.div>
          <h3 className="font-semibold text-gray-800 text-sm">Thử thách nhỏ hôm nay</h3>
          <span className="ml-auto text-xs text-mint-600 font-medium">{dailyDone.length}/{DAILY_CHALLENGES.length}</span>
        </div>
        <div className="space-y-2">
          {DAILY_CHALLENGES.map((dc) => {
            const done = dailyDone.includes(dc.id);
            return (
              <motion.button key={dc.id} onClick={() => handleDailyCheck(dc.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                  done ? 'bg-leaf-50 border border-leaf-200' : 'bg-white/50 hover:bg-white/70 border border-gray-100'
                }`} whileTap={{ scale: 0.98 }}>
                <motion.div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${
                  done ? 'bg-leaf-100' : 'bg-gray-100'
                }`} animate={done ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}>
                  {done ? '✅' : dc.emoji}
                </motion.div>
                <div className="flex-1">
                  <div className={`text-sm font-medium ${done ? 'text-leaf-700 line-through' : 'text-gray-800'}`}>{dc.text}</div>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  done ? 'bg-leaf-100 text-leaf-600' : 'bg-sun-50 text-sun-600'
                }`}>+{dc.xp} XP</span>
              </motion.button>
            );
          })}
        </div>
      </GlassCard>

      {/* ===== QUICK ACTIONS ===== */}
      <div>
        <h2 className="font-[Quicksand] font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
          <Gift size={18} className="text-mint-500" /> Hoạt động
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, idx) => (
            <Link key={idx} to={action.to}>
              <motion.div className={`rounded-2xl p-4 h-full transition-all duration-300 relative overflow-hidden ${
                action.hot ? 'bg-gradient-to-br from-mint-50 to-leaf-50 border-2 border-mint-200 shadow-md' : 'glass hover:shadow-lg hover:bg-white/75'
              }`}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }} whileHover={{ scale: 1.03, y: -3 }}>
                {action.hot && (
                  <motion.div className="absolute top-2 right-2 text-[10px] bg-coral-500 text-white px-2 py-0.5 rounded-full font-bold"
                    animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>HOT</motion.div>
                )}
                <motion.div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-2xl mb-3 shadow-md`}
                  whileHover={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 0.4 }}>
                  {action.emoji}
                </motion.div>
                <div className="font-semibold text-gray-800 text-sm mb-0.5">{action.label}</div>
                <div className="text-xs text-gray-500">{action.desc}</div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* ===== BADGES & ACHIEVEMENTS ===== */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="text-sun-500" size={18} />
          <h3 className="font-semibold text-gray-800">Huy hiệu & Thành tích</h3>
          <span className="ml-auto text-xs text-gray-400">{(currentUser?.badges || []).length} / 10</span>
        </div>
        <div className="grid grid-cols-5 gap-2 mb-3">
          {(currentUser?.badges || []).map((badge, idx) => (
            <motion.div key={idx} className="bg-gradient-to-br from-sun-50 to-sun-100 rounded-xl p-2.5 text-center border border-sun-200"
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, type: 'spring', stiffness: 300 }}>
              <div className="text-2xl mb-0.5">🏅</div>
              <div className="text-[9px] text-sun-700 font-medium leading-tight">{badge}</div>
            </motion.div>
          ))}
          {/* Locked badges */}
          {Array.from({ length: Math.max(0, 5 - (currentUser?.badges?.length || 0)) }).map((_, idx) => (
            <div key={`locked-${idx}`} className="bg-gray-100 rounded-xl p-2.5 text-center border border-gray-200 opacity-40">
              <div className="text-2xl mb-0.5">🔒</div>
              <div className="text-[9px] text-gray-400 font-medium">???</div>
            </div>
          ))}
        </div>
        {/* Level progress */}
        <div className="bg-gradient-to-r from-mint-50 to-leaf-50 rounded-xl p-3 flex items-center gap-3 border border-mint-100">
          <div className="text-2xl">{level.emoji}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-gray-800">Lv.{level.level} → Lv.{level.nextLevel.level}</span>
              <span className="text-mint-600 font-medium">{level.xpToNext} XP nữa</span>
            </div>
            <div className="w-full h-2 bg-white rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-mint-400 to-leaf-500 rounded-full"
                initial={{ width: 0 }} animate={{ width: `${level.progress}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }} />
            </div>
          </div>
          <div className="text-2xl">{level.nextLevel.emoji}</div>
        </div>
      </GlassCard>

      {/* ===== CURRICULUM TIMELINE ===== */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-mint-600" size={18} />
          <h3 className="font-semibold text-gray-800">Hành trình 8 tuần</h3>
        </div>
        <CurriculumTimeline challenges={challenges} />
      </GlassCard>

      {/* ===== TOY RESET ===== */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-leaf-400 to-mint-500 p-5 text-white shadow-lg">
          <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/10" />
          <div className="flex items-center gap-4">
            <motion.div className="text-4xl" animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>♻️</motion.div>
            <div className="flex-1">
              <div className="font-[Quicksand] font-bold text-lg">Toy Reset Week</div>
              <p className="text-white/80 text-sm mt-0.5">Dọn phòng, tìm đồ cũ, cho chúng cuộc sống mới! 🌱</p>
            </div>
            <Link to="/child/items"
              className="bg-white text-leaf-700 text-xs font-bold px-4 py-2 rounded-xl hover:shadow-lg transition-all whitespace-nowrap">
              Khám phá
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
