import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = {
  early: [
    { text: 'Hành trình ngàn dặm bắt đầu từ một bước chân! 🌱', emoji: '🌱' },
    { text: 'Con đang làm rất tốt! Tiếp tục nhé! 💪', emoji: '💪' },
    { text: 'Mỗi ngày tiết kiệm một chút, tương lai rạng rỡ! ✨', emoji: '✨' },
  ],
  mid: [
    { text: 'Wow, con đã đi được nửa chặng đường rồi! 🎯', emoji: '🎯' },
    { text: 'Tư duy tiêu dùng thông minh đang hình thành! 🧠', emoji: '🧠' },
    { text: 'Streak đang lên, đừng dừng lại nhé! 🔥', emoji: '🔥' },
  ],
  late: [
    { text: 'Sắp hoàn thành rồi! Con thật kiên trì! 🏆', emoji: '🏆' },
    { text: 'Con đã học được rất nhiều kỹ năng quý giá! ⭐', emoji: '⭐' },
    { text: 'Tương lai tài chính của con sáng lắm! 🌟', emoji: '🌟' },
  ],
};

export default function MotivationalBanner({ completedWeeks = 0, className = '' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const stage = completedWeeks < 3 ? 'early' : completedWeeks < 6 ? 'mid' : 'late';
  const stageMessages = messages[stage];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stageMessages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [stageMessages.length]);

  const msg = stageMessages[currentIndex];

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-mint-50/80 via-leaf-50/60 to-sun-50/40 border border-mint-200/50 px-5 py-3.5 ${className}`}>
      <div className="absolute inset-0 animate-shimmer opacity-30" />
      <AnimatePresence mode="wait">
        <motion.div key={currentIndex} className="relative flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
          <motion.span className="text-2xl" animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, delay: 0.2 }}>{msg.emoji}</motion.span>
          <p className="text-sm font-medium text-gray-700">{msg.text}</p>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-1 justify-center mt-2">
        {stageMessages.map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-mint-500 w-4' : 'bg-mint-200'}`} />
        ))}
      </div>
    </div>
  );
}
