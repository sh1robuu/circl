import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock, Shield, CheckCircle2, Leaf, Sparkles } from 'lucide-react';
import { ecoLessons } from '../data/ecoLessons';
import ImpactCard from '../components/child/ImpactCard';

const reflectionChoices = [
  'Món đồ này còn dùng tốt, bạn khác có thể dùng tiếp',
  'Con muốn giúp món đồ có thêm một vòng đời mới',
  'Không nên bỏ phí những gì vẫn còn giá trị',
];

const actionChoices = [
  { id: 'sell', emoji: '💰', label: 'Bán lại', desc: 'Món đồ còn tốt, có thể bán cho bạn khác' },
  { id: 'gift', emoji: '🎁', label: 'Tặng', desc: 'Chia sẻ món đồ cho bạn cần hơn' },
  { id: 'swap', emoji: '🔄', label: 'Đổi/Swap', desc: 'Đổi món này lấy món khác' },
  { id: 'fix', emoji: '🔧', label: 'Sửa & giữ', desc: 'Sửa nhẹ rồi tiếp tục dùng' },
  { id: 'keep', emoji: '📦', label: 'Giữ lại', desc: 'Con vẫn cần món đồ này' },
];

export default function GreenChallengePage() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const lesson = ecoLessons.find((l) => l.id === chapterId);
  const [step, setStep] = useState(0); // 0: intro, 1: tasks, 2: reflection, 3: action, 4: complete
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedReflection, setSelectedReflection] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [showImpact, setShowImpact] = useState(false);

  if (!lesson) return <div className="p-6 text-center text-gray-500">Thử thách không tồn tại</div>;

  const challenge = lesson.greenChallenge;

  const toggleTask = (idx) => {
    setCompletedTasks((prev) => prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]);
  };

  // ===== IMPACT CARD =====
  if (showImpact) {
    return (
      <div className="max-w-lg mx-auto pb-6">
        <ImpactCard
          action={selectedAction}
          chapterTitle={lesson.title}
          onDone={() => navigate('/child/eco-academy')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-5 pb-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between">
        <button onClick={() => navigate('/child/eco-academy')}
          className="text-gray-400 hover:text-gray-600 text-sm flex items-center gap-1">
          <ChevronLeft size={16} /> Học viện Xanh
        </button>
        <span className="text-xs font-bold text-leaf-600 bg-leaf-50 px-3 py-1 rounded-full flex items-center gap-1">
          <Leaf size={12} /> Thử Thách Xanh
        </span>
      </motion.div>

      {/* Progress */}
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4].map((s) => (
          <div key={s} className={`h-1.5 flex-1 rounded-full transition-all ${
            s < step ? 'bg-leaf-400' : s === step ? 'bg-mint-400' : 'bg-gray-200'
          }`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ===== INTRO ===== */}
        {step === 0 && (
          <motion.div key="intro" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }} className="glass rounded-3xl p-6 text-center space-y-4">
            <motion.div className="text-5xl" animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}>🐿️</motion.div>
            <h1 className="font-[Quicksand] text-xl font-bold text-gray-800">{challenge.title}</h1>
            <p className="text-sm text-gray-600 leading-relaxed">{challenge.description}</p>

            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Clock size={12} /> {challenge.timeEstimate}</span>
              {challenge.needsParent && <span className="flex items-center gap-1"><Shield size={12} /> Cần phụ huynh duyệt</span>}
            </div>

            <motion.button onClick={() => setStep(1)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-leaf-400 to-mint-500 text-white rounded-xl font-bold shadow-lg flex items-center gap-2 mx-auto">
              <Sparkles size={16} /> Bắt đầu thử thách
            </motion.button>
          </motion.div>
        )}

        {/* ===== TASKS ===== */}
        {step === 1 && (
          <motion.div key="tasks" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }} className="space-y-4">
            <div className="glass rounded-2xl p-5">
              <h2 className="font-[Quicksand] font-bold text-gray-800 mb-4 flex items-center gap-2">
                📋 Nhiệm vụ của con
              </h2>
              <div className="space-y-3">
                {challenge.tasks.map((task, i) => (
                  <motion.button key={i} onClick={() => toggleTask(i)}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                      completedTasks.includes(i) ? 'border-leaf-400 bg-leaf-50' : 'border-gray-200 bg-white/80 hover:border-mint-300'
                    }`}>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      completedTasks.includes(i) ? 'border-leaf-400 bg-leaf-400' : 'border-gray-300'
                    }`}>
                      {completedTasks.includes(i) && <CheckCircle2 size={14} className="text-white" />}
                    </div>
                    <span className={`text-sm font-medium ${completedTasks.includes(i) ? 'text-leaf-700 line-through' : 'text-gray-700'}`}>
                      {task}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <motion.button onClick={() => setStep(2)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                disabled={completedTasks.length < challenge.tasks.length}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 ${
                  completedTasks.length >= challenge.tasks.length
                    ? 'bg-gradient-to-r from-leaf-400 to-mint-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}>
                Tiếp <ChevronRight size={14} />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ===== REFLECTION ===== */}
        {step === 2 && (
          <motion.div key="reflection" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }} className="space-y-4">
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🐿️</span>
                <h2 className="font-[Quicksand] font-bold text-gray-800">Vì sao con làm điều này?</h2>
              </div>
              <div className="space-y-2">
                {reflectionChoices.map((choice, i) => (
                  <motion.button key={i} onClick={() => setSelectedReflection(i)}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      selectedReflection === i ? 'border-leaf-400 bg-leaf-50 text-leaf-700' : 'border-gray-200 bg-white/80 hover:border-mint-300'
                    }`}>
                    {choice}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="px-4 py-2 text-gray-500 text-sm hover:text-gray-700">
                <ChevronLeft size={14} className="inline" /> Quay lại
              </button>
              <motion.button onClick={() => setStep(3)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                disabled={selectedReflection === null}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 ${
                  selectedReflection !== null ? 'bg-gradient-to-r from-leaf-400 to-mint-500 text-white shadow-md' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}>
                Tiếp <ChevronRight size={14} />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ===== ACTION CHOICE ===== */}
        {step === 3 && (
          <motion.div key="action" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }} className="space-y-4">
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🐿️</span>
                <h2 className="font-[Quicksand] font-bold text-gray-800">Con chọn làm gì với món đồ?</h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {actionChoices.map((action, i) => (
                  <motion.button key={action.id} onClick={() => setSelectedAction(action.id)}
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      selectedAction === action.id ? 'border-leaf-400 bg-leaf-50 shadow-md' : 'border-gray-200 bg-white/80 hover:border-mint-300'
                    }`}>
                    <div className="text-2xl mb-1">{action.emoji}</div>
                    <div className="text-xs font-bold text-gray-800">{action.label}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5 leading-tight">{action.desc}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(2)} className="px-4 py-2 text-gray-500 text-sm hover:text-gray-700">
                <ChevronLeft size={14} className="inline" /> Quay lại
              </button>
              <motion.button onClick={() => setStep(4)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                disabled={!selectedAction}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 ${
                  selectedAction ? 'bg-gradient-to-r from-leaf-400 to-mint-500 text-white shadow-md' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}>
                Hoàn thành <ChevronRight size={14} />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ===== COMPLETION ===== */}
        {step === 4 && (
          <motion.div key="complete" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl p-8 text-center space-y-4">
            <motion.div className="text-5xl" animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: 2 }}>🎉</motion.div>
            <h1 className="font-[Quicksand] text-2xl font-bold text-gray-800">Tuyệt vời!</h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              Con đã hoàn thành thử thách xanh tuần này! Sóc Xanh thấy con biết suy nghĩ trước khi bỏ phí một món đồ. 🐿️💚
            </p>
            <div className="bg-leaf-50 border border-leaf-200 rounded-xl p-4">
              <p className="text-sm text-leaf-700 font-medium">
                +{lesson.xpReward} XP đã được cộng vào hành trình của con!
              </p>
            </div>

            <div className="flex gap-3 justify-center flex-wrap">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setShowImpact(true)}
                className="px-5 py-3 bg-gradient-to-r from-leaf-400 to-mint-500 text-white rounded-xl font-bold shadow-lg flex items-center gap-2">
                🌿 Xem tác động của con
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/child/eco-academy')}
                className="px-5 py-3 bg-white border-2 border-leaf-300 text-leaf-600 rounded-xl font-bold flex items-center gap-2">
                📚 Về Học viện Xanh
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
