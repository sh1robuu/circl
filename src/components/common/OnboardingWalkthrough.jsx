import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';

const CHILD_STEPS = [
  { emoji: '👋', title: 'Chào mừng đến CIRCL!', desc: 'Đây là nơi con học cách tiêu tiền thông minh, tiết kiệm giỏi, và giúp đỡ mọi người!', bg: 'from-mint-400 to-leaf-500', mascots: ['🌿', '💰', '🌍'] },
  { emoji: '🎯', title: 'Nhiệm vụ tuần', desc: 'Mỗi tuần con sẽ có một nhiệm vụ mới. Hoàn thành để nhận XP và lên level nha!', bg: 'from-leaf-400 to-mint-500', mascots: ['📋', '⭐', '🏆'] },
  { emoji: '🏦', title: 'Ví 3 Lọ', desc: 'Con sẽ học chia tiền vào 3 lọ: Tiết kiệm 💰, Chi tiêu 💳, và Chia sẻ 💚. Giống như siêu anh hùng tài chính!', bg: 'from-sun-400 to-sun-500', mascots: ['💰', '💳', '💚'] },
  { emoji: '🤖', title: 'Bé dạy AI', desc: 'Sau khi học xong, con sẽ dạy lại cho AI robot. Nếu con dạy được AI, tức là con đã hiểu bài rất giỏi!', bg: 'from-coral-400 to-coral-500', mascots: ['🤖', '🧠', '💡'] },
  { emoji: '📦', title: 'Kho đồ của con', desc: 'Tìm đồ cũ trong phòng, rồi quyết định: giữ lại, bán, tặng hay tái sử dụng? Đồ cũ cũng có giá trị!', bg: 'from-leaf-500 to-mint-600', mascots: ['📦', '♻️', '🌱'] },
  { emoji: '🚀', title: 'Sẵn sàng chưa?', desc: 'Cuộc phiêu lưu bắt đầu rồi! Hãy hoàn thành nhiệm vụ đầu tiên nha! 🎉', bg: 'from-mint-500 to-leaf-600', mascots: ['🚀', '🎯', '🌟'] },
];

const PARENT_STEPS = [
  { emoji: '👋', title: 'Chào mừng đến CIRCL', desc: 'CIRCL giúp con bạn học quản lý tài chính và tiêu dùng có trách nhiệm qua chương trình 8 tuần.', bg: 'from-gray-800 to-gray-900', accent: 'mint' },
  { emoji: '📊', title: 'Dashboard theo dõi', desc: 'Theo dõi tiến trình học tập, phân bổ tài chính, và kỹ năng của con qua biểu đồ trực quan.', bg: 'from-gray-800 to-gray-900', accent: 'mint' },
  { emoji: '✅', title: 'Duyệt hoạt động', desc: 'Con không thể tự giao dịch. Mọi hành động (bán, tặng, phân bổ tiền) đều cần phụ huynh duyệt.', bg: 'from-gray-800 to-gray-900', accent: 'leaf' },
  { emoji: '🛡️', title: 'An toàn tuyệt đối', desc: 'Không chat giữa trẻ, không thanh toán trong app, không ảnh mặt trẻ. An toàn là nguyên tắc thiết kế.', bg: 'from-gray-800 to-gray-900', accent: 'coral' },
  { emoji: '🤖', title: 'AI minh bạch', desc: 'AI chỉ hỏi câu hỏi phản ánh. Phụ huynh xem được toàn bộ cuộc trò chuyện và nhận insight tự động.', bg: 'from-gray-800 to-gray-900', accent: 'sun' },
  { emoji: '🚀', title: 'Bắt đầu thôi!', desc: 'Dashboard đã sẵn sàng. Hãy vào xem tổng quan và duyệt hoạt động đầu tiên.', bg: 'from-gray-800 to-gray-900', accent: 'mint' },
];

export default function OnboardingWalkthrough({ role, onComplete }) {
  const [step, setStep] = useState(0);
  const steps = role === 'child' ? CHILD_STEPS : PARENT_STEPS;
  const current = steps[step];
  const isLast = step === steps.length - 1;
  const isChild = role === 'child';

  const next = () => { if (isLast) onComplete(); else setStep((s) => s + 1); };
  const prev = () => { if (step > 0) setStep((s) => s - 1); };

  return (
    <motion.div className="fixed inset-0 z-[90] flex items-center justify-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className={`absolute inset-0 bg-gradient-to-br ${current.bg}`} />

      {/* Decorative */}
      {isChild && (
        <>
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/5" />
        </>
      )}
      {!isChild && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(20,184,156,0.08),transparent_60%)]" />
          <motion.div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-mint-500/20 to-transparent"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1 }} />
        </>
      )}

      {/* Skip */}
      <motion.button onClick={onComplete}
        className={`absolute top-6 right-6 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
          isChild ? 'bg-white/20 text-white/70 hover:bg-white/30' : 'bg-white/10 text-gray-500 hover:text-gray-300'
        }`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <X size={16} />
      </motion.button>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, idx) => (
            <motion.div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === step ? (isChild ? 'bg-white w-8' : 'bg-mint-400 w-8') : (isChild ? 'bg-white/30 w-3' : 'bg-gray-600 w-3')
            }`} layout />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }} className="text-center">
            {/* Emoji */}
            <motion.div className={`w-24 h-24 mx-auto rounded-3xl flex items-center justify-center text-5xl mb-6 shadow-2xl ${
              isChild ? 'bg-white/20 backdrop-blur-sm border-2 border-white/30' : 'bg-white/5 border border-white/10'
            }`}
              initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}>
              {current.emoji}
            </motion.div>

            {/* Mascots (child only) */}
            {isChild && current.mascots && (
              <div className="flex justify-center gap-3 mb-4">
                {current.mascots.map((m, i) => (
                  <motion.span key={i} className="text-2xl"
                    initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 300 }}>
                    {m}
                  </motion.span>
                ))}
              </div>
            )}

            <motion.h2 className={`font-[Quicksand] text-2xl md:text-3xl font-bold mb-3 ${isChild ? 'text-white' : 'text-white'}`}
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              {current.title}
            </motion.h2>

            {!isChild && (
              <motion.div className={`w-16 h-0.5 bg-${current.accent}-400 mx-auto mb-4 rounded-full`}
                initial={{ width: 0 }} animate={{ width: 64 }} transition={{ delay: 0.4, duration: 0.4 }} />
            )}

            <motion.p className={`text-lg leading-relaxed max-w-sm mx-auto ${isChild ? 'text-white/90' : 'text-gray-400'}`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              {current.desc}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div className="flex items-center justify-between mt-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <button onClick={prev} disabled={step === 0}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              step === 0 ? 'opacity-0 pointer-events-none' : isChild ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-white/10 text-gray-400 hover:text-white'
            }`}>
            <ChevronLeft size={20} />
          </button>

          <span className={`text-sm font-medium ${isChild ? 'text-white/60' : 'text-gray-600'}`}>
            {step + 1} / {steps.length}
          </span>

          <motion.button onClick={next} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
              isLast
                ? 'bg-gradient-to-r from-mint-400 to-leaf-500 text-white shadow-lg shadow-mint-500/30'
                : isChild ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-white/10 text-gray-300 hover:bg-white/15'
            }`}>
            {isLast ? 'Bắt đầu!' : 'Tiếp'} <ChevronRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
