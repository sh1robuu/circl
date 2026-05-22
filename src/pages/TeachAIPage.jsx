import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Bot, Sparkles, Eye } from 'lucide-react';
import useStore from '../store/useStore';
import GlassCard from '../components/common/GlassCard';
import { skillTagLabels } from '../data/mockChallenges';

const reflectionFlow = [
  {
    id: 'q1',
    question: 'Tuần này con đã học được gì từ nhiệm vụ?',
    placeholder: 'Ví dụ: Con học được cách phân biệt thứ mình cần và thứ mình muốn...',
    followUp: 'Hay quá! Vậy con có thể cho ví dụ cụ thể không?',
  },
  {
    id: 'q2',
    question: 'Con có thấy quyết định nào khó không? Tại sao?',
    placeholder: 'Ví dụ: Con thấy khó khi phải chọn không mua đồ chơi mới...',
    followUp: 'Con rất dũng cảm khi chia sẻ điều đó! Nếu gặp lại tình huống này, con sẽ làm gì?',
  },
  {
    id: 'q3',
    question: 'Nếu con dạy lại bài học này cho một bạn nhỏ, con sẽ nói gì?',
    placeholder: 'Ví dụ: Mình sẽ nói với bạn rằng trước khi mua gì, hãy nghĩ xem...',
    followUp: null,
  },
];

const mockSkillTags = [
  'delayed-gratification',
  'saving-goal',
  'responsible-consumption',
  'reuse-thinking',
];

const mockParentInsight =
  'Tuần này Minh đã thể hiện sự hiểu biết tốt về tiêu dùng có trách nhiệm. Bé có khả năng giải thích lại bài học một cách rõ ràng, cho thấy kỹ năng "delayed gratification" đang phát triển tích cực. Bé cũng bắt đầu suy nghĩ về việc tái sử dụng đồ cũ thay vì mua mới.';

export default function TeachAIPage() {
  const navigate = useNavigate();
  const { teachAIStep, setTeachAIStep, teachAIResponses, addTeachAIResponse, resetTeachAI } =
    useStore();
  const [currentInput, setCurrentInput] = useState('');
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentQ = reflectionFlow[teachAIStep];
  const isLastStep = teachAIStep >= reflectionFlow.length - 1;

  const handleSubmit = () => {
    if (!currentInput.trim()) return;
    addTeachAIResponse({ questionId: currentQ.id, answer: currentInput });
    setCurrentInput('');

    if (currentQ.followUp && !showFollowUp) {
      setShowFollowUp(true);
      return;
    }

    if (isLastStep) {
      setCompleted(true);
    } else {
      setShowFollowUp(false);
      setTeachAIStep(teachAIStep + 1);
    }
  };

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/child')}
          className="flex items-center gap-2 text-gray-500 hover:text-mint-700 text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Về trang chủ
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="text-6xl mb-4">🌟</div>
          <h2 className="font-[Quicksand] text-2xl font-bold text-gray-800 mb-2">
            Con dạy AI giỏi lắm!
          </h2>
          <p className="text-gray-500">
            AI đã học được nhiều từ con. Đây là những kỹ năng con thể hiện:
          </p>
        </motion.div>

        {/* Skill Tags */}
        <GlassCard className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-sun-500" size={18} />
            <h3 className="font-semibold text-gray-800">Kỹ năng con đã thể hiện</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {mockSkillTags.map((tag, idx) => (
              <motion.span
                key={tag}
                className="inline-flex items-center gap-1 bg-gradient-to-r from-mint-50 to-leaf-50 text-mint-700 text-sm px-4 py-2 rounded-full font-medium border border-mint-200"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                ⭐ {skillTagLabels[tag] || tag}
              </motion.span>
            ))}
          </div>
        </GlassCard>

        {/* Parent Insight */}
        <GlassCard className="bg-gradient-to-r from-leaf-50/80 to-mint-50/80 border border-leaf-200">
          <div className="flex items-center gap-2 mb-3">
            <Eye className="text-leaf-600" size={18} />
            <h3 className="font-semibold text-leaf-700 text-sm">
              Nhận xét cho phụ huynh
            </h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{mockParentInsight}</p>
          <div className="mt-3 text-xs text-gray-500 flex items-center gap-1">
            <Eye size={12} />
            Phụ huynh có thể xem nội dung này trong Dashboard
          </div>
        </GlassCard>

        <div className="flex gap-3 mt-6 justify-center">
          <button
            onClick={() => {
              resetTeachAI();
              setCompleted(false);
              setShowFollowUp(false);
              setCurrentInput('');
            }}
            className="bg-white/70 border border-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-semibold hover:bg-white transition-all"
          >
            Làm lại
          </button>
          <button
            onClick={() => navigate('/child')}
            className="bg-gradient-to-r from-mint-500 to-leaf-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/child')}
        className="flex items-center gap-2 text-gray-500 hover:text-mint-700 text-sm mb-4 transition-colors"
      >
        <ArrowLeft size={16} /> Về trang chủ
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sun-400 to-sun-500 flex items-center justify-center text-white text-2xl shadow-lg">
            🤖
          </div>
          <div>
            <h1 className="font-[Quicksand] text-2xl font-bold text-gray-800">Bé dạy AI</h1>
            <p className="text-sm text-gray-500">Dạy lại AI những gì con đã học tuần này</p>
          </div>
        </div>
      </motion.div>

      {/* Progress */}
      <div className="flex gap-2 mb-6">
        {reflectionFlow.map((_, idx) => (
          <div
            key={idx}
            className={`flex-1 h-1.5 rounded-full ${
              idx <= teachAIStep ? 'bg-gradient-to-r from-mint-400 to-leaf-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Chat-like UI */}
      <div className="space-y-4">
        {/* AI Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`q-${teachAIStep}-${showFollowUp}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <GlassCard className="border-l-4 border-l-sun-400">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sun-100 flex items-center justify-center text-sm flex-shrink-0">
                  🤖
                </div>
                <div>
                  <div className="text-xs text-sun-600 font-medium mb-1">AI CIRCL</div>
                  <p className="text-gray-800 leading-relaxed">
                    {showFollowUp ? currentQ.followUp : currentQ.question}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        {/* Previous responses */}
        {teachAIResponses.map((resp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end"
          >
            <div className="bg-gradient-to-r from-mint-500 to-leaf-500 text-white rounded-2xl rounded-br-md px-4 py-3 max-w-[80%] text-sm">
              {resp.answer}
            </div>
          </motion.div>
        ))}

        {/* Input */}
        <div className="flex gap-3">
          <textarea
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder={currentQ?.placeholder || 'Nhập câu trả lời...'}
            className="flex-1 bg-white/70 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-mint-300 resize-none"
            rows={3}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={!currentInput.trim()}
            className={`self-end w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
              currentInput.trim()
                ? 'bg-gradient-to-r from-mint-500 to-leaf-500 text-white hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 bg-mint-50 rounded-xl p-3 text-xs text-mint-700 flex items-start gap-2">
        <Bot size={14} className="flex-shrink-0 mt-0.5" />
        <span>
          Đây không phải chatbot mở. AI chỉ hỏi các câu hỏi phản ánh có kiểm soát. Phụ huynh có thể xem toàn bộ nội dung.
        </span>
      </div>
    </div>
  );
}
