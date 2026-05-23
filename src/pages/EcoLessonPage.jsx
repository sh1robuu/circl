import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, BookOpen, MessageCircle, Lightbulb, HelpCircle } from 'lucide-react';
import { ecoLessons } from '../data/ecoLessons';

const cardTypeStyles = {
  narration: { bg: 'bg-gradient-to-br from-leaf-50 to-mint-50', border: 'border-leaf-200', icon: '🐿️' },
  lesson: { bg: 'bg-gradient-to-br from-white to-mint-50', border: 'border-mint-200', icon: '💡' },
  interaction: { bg: 'bg-gradient-to-br from-sun-50 to-leaf-50', border: 'border-sun-200', icon: '🤔' },
};

export default function EcoLessonPage() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const lesson = ecoLessons.find((l) => l.id === chapterId);
  const [cardIdx, setCardIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  if (!lesson) return <div className="p-6 text-center text-gray-500">Bài học không tồn tại</div>;

  const card = lesson.storyCards[cardIdx];
  const isLast = cardIdx === lesson.storyCards.length - 1;
  const style = cardTypeStyles[card.type] || cardTypeStyles.narration;

  const handleNext = () => {
    if (card.type === 'interaction' && selectedChoice === null) return;
    if (isLast) {
      navigate(`/child/eco-quiz/${chapterId}`);
      return;
    }
    setCardIdx((i) => i + 1);
    setSelectedChoice(null);
    setShowFeedback(false);
  };

  const handlePrev = () => {
    if (cardIdx > 0) {
      setCardIdx((i) => i - 1);
      setSelectedChoice(null);
      setShowFeedback(false);
    }
  };

  const handleChoice = (idx) => {
    setSelectedChoice(idx);
    setShowFeedback(true);
  };

  return (
    <div className="max-w-lg mx-auto space-y-4 pb-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between">
        <button onClick={() => navigate('/child/eco-academy')}
          className="text-gray-400 hover:text-gray-600 text-sm flex items-center gap-1">
          <ChevronLeft size={16} /> Học viện Xanh
        </button>
        <span className="text-xs font-bold text-leaf-600 bg-leaf-50 px-3 py-1 rounded-full">
          {lesson.emoji} {lesson.title}
        </span>
      </motion.div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5">
        {lesson.storyCards.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${
            i === cardIdx ? 'bg-leaf-500 w-6' : i < cardIdx ? 'bg-leaf-300 w-3' : 'bg-gray-200 w-3'
          }`} />
        ))}
      </div>

      {/* Story Card */}
      <AnimatePresence mode="wait">
        <motion.div key={cardIdx}
          initial={{ opacity: 0, x: 40, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -40, scale: 0.95 }} transition={{ duration: 0.3 }}
          className={`${style.bg} border ${style.border} rounded-3xl p-6 min-h-[340px] flex flex-col shadow-lg`}>

          {/* Speaker badge */}
          {card.speaker === 'soc' && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}
              className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-leaf-100 flex items-center justify-center text-lg border-2 border-leaf-300 shadow-sm">
                🐿️
              </div>
              <div>
                <span className="text-xs font-bold text-leaf-700">Sóc Xanh</span>
                <span className="text-[10px] text-gray-400 ml-2">đang kể chuyện...</span>
              </div>
            </motion.div>
          )}

          {/* Card content */}
          <div className="flex-1 flex flex-col justify-center">
            {card.type === 'lesson' && (
              <div className="text-center mb-4">
                <motion.span className="text-4xl" initial={{ rotate: -10 }} animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}>{card.emoji}</motion.span>
              </div>
            )}

            <motion.p className="text-gray-800 text-base leading-relaxed font-medium text-center"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              {card.text}
            </motion.p>

            {/* Interaction choices */}
            {card.type === 'interaction' && card.choices && (
              <motion.div className="mt-6 space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                {card.choices.map((choice, i) => {
                  const isSelected = selectedChoice === i;
                  const isCorrect = i === card.correctIdx;
                  return (
                    <motion.button key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={() => handleChoice(i)}
                      disabled={showFeedback}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        showFeedback && isSelected && isCorrect ? 'border-leaf-400 bg-leaf-50 text-leaf-700' :
                        showFeedback && isSelected && !isCorrect ? 'border-coral-300 bg-coral-50 text-coral-700' :
                        showFeedback && isCorrect ? 'border-leaf-300 bg-leaf-50/50 text-leaf-600' :
                        isSelected ? 'border-mint-400 bg-mint-50' :
                        'border-gray-200 bg-white/80 hover:border-mint-300'
                      }`}>
                      <span className="mr-2">{showFeedback && isSelected && isCorrect ? '✅' : showFeedback && isSelected && !isCorrect ? '❌' : ['🅰️', '🅱️', '🅲️'][i]}</span>
                      {choice}
                    </motion.button>
                  );
                })}

                {/* Feedback */}
                <AnimatePresence>
                  {showFeedback && selectedChoice !== null && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0 }} className="mt-3 p-3 rounded-xl bg-white/80 border border-gray-100">
                      <div className="flex items-start gap-2">
                        <span className="text-lg">🐿️</span>
                        <p className="text-sm text-gray-700 leading-relaxed">{card.feedback[selectedChoice]}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button onClick={handlePrev} disabled={cardIdx === 0}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            cardIdx === 0 ? 'opacity-0 pointer-events-none' : 'bg-white/80 border border-gray-200 text-gray-500 hover:bg-white'
          }`}>
          <ChevronLeft size={18} />
        </button>

        <span className="text-xs text-gray-400 font-medium">{cardIdx + 1} / {lesson.storyCards.length}</span>

        <motion.button onClick={handleNext} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          disabled={card.type === 'interaction' && selectedChoice === null}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
            card.type === 'interaction' && selectedChoice === null
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : isLast
              ? 'bg-gradient-to-r from-leaf-400 to-mint-500 text-white shadow-lg shadow-leaf-200'
              : 'bg-gradient-to-r from-leaf-400 to-leaf-500 text-white shadow-md'
          }`}>
          {isLast ? '📝 Làm Quiz' : 'Tiếp'} <ChevronRight size={14} />
        </motion.button>
      </div>
    </div>
  );
}
