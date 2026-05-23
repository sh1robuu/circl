import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, ChevronRight, Sparkles, RotateCcw } from 'lucide-react';
import { ecoLessons } from '../data/ecoLessons';

export default function EcoQuizPage() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const lesson = ecoLessons.find((l) => l.id === chapterId);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [phase, setPhase] = useState('intro'); // intro | quiz | explanation | result

  if (!lesson) return <div className="p-6 text-center text-gray-500">Quiz không tồn tại</div>;

  const quiz = lesson.quiz;
  const q = quiz[qIdx];
  const passed = correctCount >= 2;

  const handleStart = () => setPhase('quiz');

  const handleSelect = (idx) => {
    if (showExplanation) return;
    setSelected(idx);
    setShowExplanation(true);
    if (idx === q.correct) setCorrectCount((c) => c + 1);
  };

  const handleNext = () => {
    if (qIdx === quiz.length - 1) {
      setPhase('result');
      return;
    }
    setQIdx((i) => i + 1);
    setSelected(null);
    setShowExplanation(false);
  };

  const handleRetry = () => {
    setQIdx(0);
    setSelected(null);
    setShowExplanation(false);
    setCorrectCount(0);
    setPhase('intro');
  };

  // ===== INTRO =====
  if (phase === 'intro') {
    return (
      <div className="max-w-lg mx-auto space-y-6 pb-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-8 text-center">
          <motion.div className="text-6xl mb-4" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            🐿️
          </motion.div>
          <h1 className="font-[Quicksand] text-2xl font-bold text-gray-800 mb-3">
            Mini Quiz: {lesson.title}
          </h1>
          <p className="text-gray-500 mb-6">
            Con đã sẵn sàng giúp Sóc Xanh trả lời {quiz.length} câu hỏi chưa?
          </p>
          <div className="flex justify-center gap-4 mb-6">
            {quiz.map((_, i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-leaf-100 flex items-center justify-center text-leaf-600 font-bold text-sm">
                {i + 1}
              </div>
            ))}
          </div>
          <motion.button onClick={handleStart} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-leaf-400 to-mint-500 text-white rounded-xl font-bold shadow-lg shadow-leaf-200 flex items-center gap-2 mx-auto">
            <Sparkles size={16} /> Bắt đầu Quiz
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // ===== RESULT =====
  if (phase === 'result') {
    return (
      <div className="max-w-lg mx-auto space-y-6 pb-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className={`glass rounded-3xl p-8 text-center ${passed ? 'ring-2 ring-leaf-300' : 'ring-2 ring-sun-300'}`}>
          <motion.div className="text-6xl mb-4" animate={{ rotate: passed ? [0, 10, -10, 0] : [0, -5, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}>
            {passed ? '🎉' : '🐿️'}
          </motion.div>
          <h1 className="font-[Quicksand] text-2xl font-bold text-gray-800 mb-2">
            {passed ? 'Tuyệt vời!' : 'Gần được rồi!'}
          </h1>
          <p className="text-gray-500 mb-4">
            Con trả lời đúng <span className="font-bold text-leaf-600">{correctCount}/{quiz.length}</span> câu.
          </p>

          {passed ? (
            <>
              <div className="bg-leaf-50 border border-leaf-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-leaf-700 font-medium">
                  🌿 Con đã hoàn thành bài học hôm nay. Bây giờ hãy thử làm một việc xanh thật ngoài đời nhé!
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/child/green-challenge/${chapterId}`)}
                  className="px-6 py-3 bg-gradient-to-r from-leaf-400 to-mint-500 text-white rounded-xl font-bold shadow-lg flex items-center gap-2">
                  🌿 Nhận Thử Thách Xanh <ChevronRight size={14} />
                </motion.button>
              </div>
            </>
          ) : (
            <>
              <div className="bg-sun-50 border border-sun-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-sun-700 font-medium">
                  🐿️ Chưa đúng lắm, nhưng không sao! Sóc Xanh tin con có thể làm tốt hơn. Hãy xem lại bài học nhé!
                </p>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/child/eco-lesson/${chapterId}`)}
                  className="px-5 py-3 bg-white border-2 border-leaf-300 text-leaf-600 rounded-xl font-bold flex items-center gap-2">
                  📖 Xem lại bài học
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={handleRetry}
                  className="px-5 py-3 bg-gradient-to-r from-sun-400 to-sun-500 text-white rounded-xl font-bold flex items-center gap-2">
                  <RotateCcw size={14} /> Làm lại quiz
                </motion.button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    );
  }

  // ===== QUIZ =====
  return (
    <div className="max-w-lg mx-auto space-y-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-gray-600">🐿️ Quiz: {lesson.title}</span>
        <span className="text-xs font-bold text-leaf-600 bg-leaf-50 px-3 py-1 rounded-full">
          {qIdx + 1}/{quiz.length}
        </span>
      </div>

      {/* Progress */}
      <div className="flex gap-2">
        {quiz.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${
            i < qIdx ? 'bg-leaf-400' : i === qIdx ? 'bg-mint-400' : 'bg-gray-200'
          }`} />
        ))}
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div key={qIdx}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>

          <div className="glass rounded-3xl p-6 space-y-5">
            <motion.p className="text-gray-800 text-lg font-bold leading-relaxed text-center"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              {q.question}
            </motion.p>

            {/* Options */}
            <div className="space-y-3">
              {q.options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = i === q.correct;
                return (
                  <motion.button key={i} onClick={() => handleSelect(i)}
                    disabled={showExplanation}
                    whileHover={showExplanation ? {} : { scale: 1.02 }}
                    whileTap={showExplanation ? {} : { scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className={`w-full text-left px-4 py-3.5 rounded-2xl border-2 text-sm font-medium flex items-center gap-3 transition-all ${
                      showExplanation && isSelected && isCorrect ? 'border-leaf-400 bg-leaf-50 text-leaf-700 shadow-md' :
                      showExplanation && isSelected && !isCorrect ? 'border-coral-300 bg-coral-50 text-coral-700' :
                      showExplanation && isCorrect ? 'border-leaf-300 bg-leaf-50/60 text-leaf-600' :
                      showExplanation ? 'border-gray-100 bg-gray-50 text-gray-400' :
                      'border-gray-200 bg-white/80 hover:border-mint-300 hover:bg-mint-50/30 text-gray-700'
                    }`}>
                    <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
                      showExplanation && isSelected && isCorrect ? 'border-leaf-400 bg-leaf-400 text-white' :
                      showExplanation && isSelected ? 'border-coral-300 bg-coral-300 text-white' :
                      'border-current'
                    }">
                      {showExplanation && isSelected && isCorrect ? <CheckCircle2 size={16} /> :
                       showExplanation && isSelected ? <XCircle size={16} /> :
                       String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  className={`rounded-xl p-4 border ${
                    selected === q.correct ? 'bg-leaf-50 border-leaf-200' : 'bg-sun-50 border-sun-200'
                  }`}>
                  <div className="flex items-start gap-2">
                    <span className="text-lg shrink-0">{selected === q.correct ? '🐿️' : '🐿️'}</span>
                    <div>
                      <p className={`text-xs font-bold mb-1 ${selected === q.correct ? 'text-leaf-600' : 'text-sun-600'}`}>
                        {selected === q.correct ? 'Đúng rồi! 🎉' : 'Chưa đúng lắm, nhưng không sao!'}
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed">{q.explanation}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Next button */}
          {showExplanation && (
            <motion.div className="mt-4 flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.button onClick={handleNext} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-gradient-to-r from-leaf-400 to-mint-500 text-white rounded-xl font-bold shadow-md flex items-center gap-2">
                {qIdx === quiz.length - 1 ? 'Xem kết quả' : 'Câu tiếp'} <ChevronRight size={14} />
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
