import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CHILD_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i, emoji: ['⭐', '🌟', '✨', '🎉', '🦋', '🌈', '💫', '🎈', '🍭', '🌸'][i % 10],
  x: Math.random() * 100, y: Math.random() * 100, size: 16 + Math.random() * 20,
  delay: Math.random() * 1.5, duration: 2 + Math.random() * 2,
}));

const PARENT_PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 100,
  size: 3 + Math.random() * 4, delay: Math.random() * 2, duration: 3 + Math.random() * 2,
}));

export default function WelcomeScreen({ user, role, onComplete }) {
  const [phase, setPhase] = useState(0); // 0: entrance, 1: content, 2: exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 3800);
    const t3 = setTimeout(() => onComplete(), 4600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  if (role === 'child') return <ChildWelcome user={user} phase={phase} onSkip={onComplete} />;
  return <ParentWelcome user={user} phase={phase} onSkip={onComplete} />;
}

// ===== CHILD WELCOME — Cute & Playful =====
function ChildWelcome({ user, phase, onSkip }) {
  return (
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Animated gradient BG */}
      <motion.div className="absolute inset-0 bg-gradient-to-br from-mint-300 via-leaf-400 to-sun-300"
        animate={{ background: ['linear-gradient(135deg, #6ee7b7, #34d399, #fbbf24)', 'linear-gradient(135deg, #34d399, #6ee7b7, #f472b6)', 'linear-gradient(135deg, #fbbf24, #34d399, #6ee7b7)'] }}
        transition={{ duration: 4, repeat: Infinity }} />

      {/* Floating emojis */}
      {CHILD_PARTICLES.map((p) => (
        <motion.div key={p.id} className="absolute pointer-events-none select-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size }}
          initial={{ opacity: 0, scale: 0, rotate: -30 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.2, 1, 0.5], rotate: [0, 20, -10, 0], y: [0, -60, -120, -180] }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}>
          {p.emoji}
        </motion.div>
      ))}

      {/* Central content */}
      <div className="relative z-10 text-center px-6">
        <AnimatePresence mode="wait">
          {phase >= 0 && phase < 2 && (
            <motion.div key="content" initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }} exit={{ scale: 1.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
              {/* Avatar burst */}
              <motion.div className="relative inline-block mb-6"
                animate={{ y: [0, -15, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <motion.div className="w-28 h-28 rounded-3xl bg-white/30 backdrop-blur-md flex items-center justify-center text-7xl shadow-2xl border-4 border-white/40"
                  animate={{ rotate: [0, -5, 5, -5, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}>
                  {user?.avatar || '🧒'}
                </motion.div>
                {/* Sparkle ring */}
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <motion.div key={i} className="absolute w-4 h-4 text-lg"
                    style={{ top: '50%', left: '50%' }}
                    animate={{ x: [0, Math.cos(deg * Math.PI / 180) * 70], y: [0, Math.sin(deg * Math.PI / 180) * 70], opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                    transition={{ duration: 1.2, delay: 0.8 + i * 0.1, ease: 'easeOut' }}>✨</motion.div>
                ))}
              </motion.div>

              {/* Text */}
              <motion.h1 className="font-[Quicksand] text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                Chào mừng{user?.name ? ` ${user.name}` : ''}! 🎉
              </motion.h1>
              <motion.p className="text-white/90 text-lg md:text-xl font-medium drop-shadow"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                Sẵn sàng cho cuộc phiêu lưu tài chính nào! 🚀
              </motion.p>

              {/* Bouncing mascots */}
              <motion.div className="flex justify-center gap-4 mt-8"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                {['🌿', '🏦', '🎯', '🤖', '♻️'].map((e, i) => (
                  <motion.span key={i} className="text-3xl drop-shadow-lg"
                    animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.8, delay: 1.2 + i * 0.15, repeat: 2 }}>
                    {e}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip button */}
      <motion.button onClick={onSkip}
        className="absolute bottom-8 right-8 text-white/50 text-xs hover:text-white/80 transition-colors z-20"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        Bỏ qua →
      </motion.button>
    </motion.div>
  );
}

// ===== PARENT WELCOME — Premium & Professional =====
function ParentWelcome({ user, phase, onSkip }) {
  return (
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Dark premium BG */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(20,184,156,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(16,185,129,0.1),transparent_50%)]" />

      {/* Floating dots */}
      {PARENT_PARTICLES.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full bg-mint-400/30"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.5, 0.5], y: [0, -40, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }} />
      ))}

      {/* Horizontal lines sweep */}
      <motion.div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-mint-400/40 to-transparent"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, delay: 0.3 }} />
      <motion.div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-leaf-400/30 to-transparent"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, delay: 0.5 }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <AnimatePresence mode="wait">
          {phase >= 0 && phase < 2 && (
            <motion.div key="content" initial={{ opacity: 0 }}
              animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              {/* Logo mark */}
              <motion.div className="mb-8" initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 150, damping: 20 }}>
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-mint-400 to-leaf-500 flex items-center justify-center text-4xl shadow-2xl shadow-mint-500/30">
                  🌿
                </div>
              </motion.div>

              {/* Animated heading */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}>
                <h1 className="font-[Quicksand] text-3xl md:text-4xl font-bold text-white mb-2">
                  Xin chào, {user?.name || 'Phụ huynh'}
                </h1>
                <motion.div className="w-24 h-1 bg-gradient-to-r from-mint-400 to-leaf-500 mx-auto rounded-full mb-4"
                  initial={{ width: 0 }} animate={{ width: 96 }} transition={{ delay: 0.8, duration: 0.6 }} />
              </motion.div>

              <motion.p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                Dashboard phụ huynh đã sẵn sàng.<br />
                <span className="text-mint-400 font-medium">Theo dõi hành trình học tập của con.</span>
              </motion.p>

              {/* Metrics preview */}
              <motion.div className="flex justify-center gap-6 mt-8"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
                {[{ value: '8', label: 'Tuần', icon: '📅' }, { value: '100%', label: 'An toàn', icon: '🛡️' }, { value: '24/7', label: 'Giám sát', icon: '📊' }].map((m, i) => (
                  <motion.div key={i} className="text-center"
                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + i * 0.15 }}>
                    <div className="text-2xl mb-1">{m.icon}</div>
                    <div className="text-white font-bold text-lg font-[Quicksand]">{m.value}</div>
                    <div className="text-gray-500 text-xs">{m.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button onClick={onSkip}
        className="absolute bottom-8 right-8 text-gray-600 text-xs hover:text-gray-400 transition-colors z-20"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        Bỏ qua →
      </motion.button>
    </motion.div>
  );
}
