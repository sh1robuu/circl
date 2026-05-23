import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Lock, CheckCircle2, Sparkles, Trophy, ChevronRight, Leaf, Zap } from 'lucide-react';
import { ecoLessons } from '../data/ecoLessons';

export default function EcoAcademyPage() {
  const navigate = useNavigate();
  const [lessons] = useState(ecoLessons);
  const completedCount = lessons.filter((l) => l.status === 'completed').length;
  const totalCount = lessons.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-6 pb-6">
      {/* Hero Banner */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-leaf-500 via-mint-500 to-leaf-600 p-6 text-white">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/5" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1 text-white/80 text-sm font-medium">
            <Leaf size={14} /> Học viện Xanh
          </div>
          <h1 className="font-[Quicksand] text-2xl font-bold mb-2">
            🐿️ Hôm nay con học cách giúp một món đồ có thêm vòng đời mới!
          </h1>
          <p className="text-white/80 text-sm leading-relaxed">
            Qua truyện ngắn, quiz và thử thách thực tế, con sẽ học về vòng đời đồ vật, tái sử dụng và tiêu dùng có trách nhiệm.
          </p>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-[Quicksand] font-bold text-gray-800 flex items-center gap-2">
            <Trophy size={18} className="text-sun-500" /> Tiến trình học tập
          </span>
          <span className="text-sm font-semibold text-leaf-600">{completedCount}/{totalCount} bài</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-leaf-400 to-mint-500 rounded-full"
            initial={{ width: 0 }} animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.8, delay: 0.3 }} />
        </div>
        <div className="flex justify-between mt-2">
          {lessons.map((l, i) => (
            <div key={l.id} className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                l.status === 'completed' ? 'bg-leaf-100 text-leaf-600' :
                l.status === 'active' ? 'bg-mint-100 text-mint-600 ring-2 ring-mint-300' :
                'bg-gray-100 text-gray-400'
              }`}>
                {l.status === 'completed' ? '✅' : l.emoji}
              </div>
              <span className="text-[10px] text-gray-400">Bài {i + 1}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Học bài hôm nay', emoji: '📖', color: 'from-leaf-400 to-leaf-500', action: () => { const active = lessons.find(l => l.status === 'active'); if (active) navigate(`/child/eco-lesson/${active.id}`); } },
          { label: 'Bách Khoa Đồ Vật', emoji: '🔍', color: 'from-mint-400 to-mint-500', action: () => navigate('/child/eco-encyclopedia') },
          { label: 'Thử Thách Xanh', emoji: '🌿', color: 'from-sun-400 to-sun-500', action: () => { const active = lessons.find(l => l.status === 'active'); if (active) navigate(`/child/green-challenge/${active.id}`); } },
        ].map((btn, i) => (
          <motion.button key={i} onClick={btn.action} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
            className={`bg-gradient-to-br ${btn.color} text-white rounded-2xl p-4 text-center shadow-lg`}>
            <div className="text-2xl mb-2">{btn.emoji}</div>
            <div className="text-xs font-bold leading-tight">{btn.label}</div>
          </motion.button>
        ))}
      </div>

      {/* Chapter List */}
      <div>
        <h2 className="font-[Quicksand] font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-leaf-500" /> Chương trình học
        </h2>
        <div className="space-y-3">
          {lessons.map((lesson, idx) => (
            <motion.div key={lesson.id}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.08 }}>
              <button
                onClick={() => {
                  if (lesson.status !== 'locked') navigate(`/child/eco-lesson/${lesson.id}`);
                }}
                disabled={lesson.status === 'locked'}
                className={`w-full text-left glass rounded-2xl p-4 flex items-center gap-4 transition-all ${
                  lesson.status === 'locked' ? 'opacity-50 cursor-not-allowed' :
                  lesson.status === 'active' ? 'ring-2 ring-leaf-300 shadow-lg shadow-leaf-100' :
                  'hover:shadow-md'
                }`}>
                {/* Chapter icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                  lesson.status === 'completed' ? 'bg-leaf-100' :
                  lesson.status === 'active' ? 'bg-gradient-to-br from-leaf-400 to-mint-500 text-white shadow-md' :
                  'bg-gray-100'
                }`}>
                  {lesson.status === 'locked' ? <Lock size={20} className="text-gray-400" /> :
                   lesson.status === 'completed' ? <CheckCircle2 size={24} className="text-leaf-500" /> :
                   lesson.emoji}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-leaf-600 bg-leaf-50 px-2 py-0.5 rounded-full">
                      Tuần {lesson.week}
                    </span>
                    {lesson.status === 'active' && (
                      <span className="text-[11px] font-bold text-mint-600 bg-mint-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles size={10} /> Đang học
                      </span>
                    )}
                    {lesson.status === 'completed' && (
                      <span className="text-[11px] font-bold text-leaf-600 bg-leaf-50 px-2 py-0.5 rounded-full">
                        ✅ Hoàn thành
                      </span>
                    )}
                  </div>
                  <h3 className="font-[Quicksand] font-bold text-gray-800 text-sm truncate">{lesson.title}</h3>
                  <p className="text-[12px] text-gray-500 truncate">{lesson.subtitle}</p>
                </div>

                {/* XP + Arrow */}
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-sun-600 mb-1">
                    <Zap size={12} /> +{lesson.xpReward} XP
                  </div>
                  {lesson.status !== 'locked' && <ChevronRight size={16} className="text-gray-300" />}
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="glass rounded-2xl p-5 text-center">
        <p className="text-sm text-gray-500 mb-1">🐿️ Sóc Xanh tin rằng</p>
        <p className="font-[Quicksand] font-bold text-gray-800 text-sm">
          "Mỗi món đồ đều xứng đáng được dùng tiếp, không bị bỏ phí."
        </p>
      </motion.div>
    </div>
  );
}
