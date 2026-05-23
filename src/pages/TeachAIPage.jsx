import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Bot, Sparkles, Eye, AlertCircle } from 'lucide-react';
import useStore from '../store/useStore';
import GlassCard from '../components/common/GlassCard';
import Confetti from '../components/common/Confetti';
import { skillTagLabels } from '../data/mockChallenges';
import { sendChatMessage, generateConversationSummary, REFLECTION_STARTERS } from '../utils/ai';

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 px-1">
      <div className="w-8 h-8 rounded-lg bg-sun-100 flex items-center justify-center text-sm flex-shrink-0">🤖</div>
      <div className="glass rounded-2xl rounded-tl-md px-4 py-3">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div key={i} className="w-2 h-2 rounded-full bg-sun-400"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
              transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }} />
          ))}
          <span className="text-xs text-gray-400 ml-1">AI đang suy nghĩ...</span>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ role, content, delay = 0 }) {
  const isAI = role === 'assistant';
  return (
    <motion.div className={`flex items-start gap-3 ${isAI ? '' : 'flex-row-reverse'}`}
      initial={{ opacity: 0, y: 12, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, delay }}>
      {isAI && <div className="w-8 h-8 rounded-lg bg-sun-100 flex items-center justify-center text-sm flex-shrink-0">🤖</div>}
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
        isAI ? 'glass rounded-tl-md text-gray-800' : 'bg-gradient-to-r from-mint-500 to-leaf-500 text-white rounded-tr-md'
      }`}>
        {content}
      </div>
    </motion.div>
  );
}

export default function TeachAIPage() {
  const navigate = useNavigate();
  const { currentUser, challenges } = useStore();
  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [phase, setPhase] = useState('chat'); // 'chat' | 'summary'
  const [summary, setSummary] = useState(null);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [error, setError] = useState('');
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const activeChallenge = challenges.find((c) => c.status === 'active' || c.status === 'completed');
  const currentStarter = REFLECTION_STARTERS[questionIdx];
  const userMessageCount = messages.filter((m) => m.role === 'user').length;

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Send initial question
  useEffect(() => {
    if (messages.length === 0) {
      const intro = `Chào ${currentUser?.name || 'bạn nhỏ'}! 👋 Hôm nay mình cùng nhau ôn lại bài học tuần này nhé.\n\n${REFLECTION_STARTERS[0].question}`;
      setMessages([{ role: 'assistant', content: intro }]);
    }
  }, []);

  const handleSend = async () => {
    if (!currentInput.trim() || isTyping) return;
    const userMsg = currentInput.trim();
    setCurrentInput('');
    setError('');

    // Add user message
    const updatedMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(updatedMessages);
    setIsTyping(true);

    // Check if we should finish (after ~6-8 user messages or 3 reflection topics covered)
    const newUserCount = userMessageCount + 1;
    const shouldFinish = newUserCount >= 6 || (questionIdx >= REFLECTION_STARTERS.length - 1 && newUserCount >= 4);

    try {
      // Build context for the AI
      const contextMessages = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // If approaching end, hint to AI
      if (shouldFinish) {
        contextMessages.push({
          role: 'system',
          content: 'Đây là câu trả lời cuối cùng. Hãy khen ngợi trẻ, tóm tắt những điều trẻ đã làm tốt trong 1-2 câu, và nói lời tạm biệt vui vẻ. KHÔNG hỏi thêm câu hỏi.',
        });
      } else if (newUserCount % 2 === 0 && questionIdx < REFLECTION_STARTERS.length - 1) {
        // Transition to next topic naturally
        const nextQ = REFLECTION_STARTERS[questionIdx + 1];
        contextMessages.push({
          role: 'system',
          content: `Sau khi phản hồi câu trả lời của trẻ, hãy chuyển sang chủ đề mới: "${nextQ.question}"`,
        });
        setQuestionIdx((prev) => prev + 1);
      }

      const aiReply = await sendChatMessage(contextMessages);
      setMessages((prev) => [...prev, { role: 'assistant', content: aiReply }]);

      if (shouldFinish) {
        // Generate summary after a short delay
        setTimeout(async () => {
          setIsTyping(true);
          try {
            const result = await generateConversationSummary(updatedMessages);
            setSummary(result);
            setPhase('summary');
          } catch (e) {
            setSummary({
              skillTags: ['responsible-consumption', 'saving-goal'],
              parentInsight: 'Bé đã tham gia phản ánh tích cực trong tuần.',
            });
            setPhase('summary');
          } finally {
            setIsTyping(false);
          }
        }, 2000);
      }
    } catch (err) {
      setError('Không kết nối được AI. Thử lại nhé!');
    } finally {
      if (!shouldFinish) setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  const handleReset = () => {
    setMessages([]);
    setPhase('chat');
    setSummary(null);
    setQuestionIdx(0);
    setError('');
  };

  // ===== SUMMARY SCREEN =====
  if (phase === 'summary' && summary) {
    return (
      <div className="max-w-2xl mx-auto">
        <Confetti active={true} pieces={35} duration={3000} />
        <button onClick={() => navigate('/child')}
          className="flex items-center gap-2 text-gray-500 hover:text-mint-700 text-sm mb-6 transition-colors">
          <ArrowLeft size={16} /> Về trang chủ
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <motion.div className="text-6xl mb-4" animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 0.8 }}>🌟</motion.div>
          <h2 className="font-[Quicksand] text-2xl font-bold text-gray-800 mb-2">Con dạy AI giỏi lắm!</h2>
          <p className="text-gray-500">AI đã học được nhiều từ con. Đây là kết quả:</p>
        </motion.div>

        <GlassCard className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-sun-500" size={18} />
            <h3 className="font-semibold text-gray-800">Kỹ năng con đã thể hiện</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {(summary.skillTags || []).map((tag, idx) => (
              <motion.span key={tag}
                className="inline-flex items-center gap-1 bg-gradient-to-r from-mint-50 to-leaf-50 text-mint-700 text-sm px-4 py-2 rounded-full font-medium border border-mint-200"
                initial={{ opacity: 0, scale: 0, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: idx * 0.15, type: 'spring', stiffness: 200 }}>
                ⭐ {skillTagLabels[tag] || tag.replace(/-/g, ' ')}
              </motion.span>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="mb-6 bg-gradient-to-r from-leaf-50/80 to-mint-50/80 border border-leaf-200">
          <div className="flex items-center gap-2 mb-3">
            <Eye className="text-leaf-600" size={18} />
            <h3 className="font-semibold text-leaf-700 text-sm">Nhận xét cho phụ huynh</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{summary.parentInsight}</p>
          <div className="mt-3 text-xs text-gray-500 flex items-center gap-1">
            <Eye size={12} /> Phụ huynh có thể xem nội dung này trong Dashboard
          </div>
        </GlassCard>

        {/* Conversation Log */}
        <GlassCard className="mb-6">
          <details>
            <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-800">
              📝 Xem lại cuộc trò chuyện ({messages.length} tin nhắn)
            </summary>
            <div className="mt-3 space-y-3 max-h-60 overflow-y-auto pr-2">
              {messages.map((msg, idx) => (
                <div key={idx} className={`text-sm ${msg.role === 'assistant' ? 'text-gray-600' : 'text-mint-700 font-medium'}`}>
                  <span className="text-xs text-gray-400">{msg.role === 'assistant' ? '🤖 AI:' : '🧒 Con:'}</span>
                  <p className="mt-0.5">{msg.content}</p>
                </div>
              ))}
            </div>
          </details>
        </GlassCard>

        <div className="flex gap-3 justify-center">
          <button onClick={handleReset}
            className="bg-white/70 border border-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-semibold hover:bg-white transition-all">
            Làm lại
          </button>
          <button onClick={() => navigate('/child')}
            className="bg-gradient-to-r from-mint-500 to-leaf-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all">
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  // ===== CHAT SCREEN =====
  return (
    <div className="max-w-2xl mx-auto flex flex-col" style={{ minHeight: 'calc(100vh - 8rem)' }}>
      {/* Header */}
      <div className="mb-4">
        <button onClick={() => navigate('/child')}
          className="flex items-center gap-2 text-gray-500 hover:text-mint-700 text-sm mb-4 transition-colors">
          <ArrowLeft size={16} /> Về trang chủ
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3">
          <motion.div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sun-400 to-sun-500 flex items-center justify-center text-2xl shadow-lg"
            animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>🤖</motion.div>
          <div className="flex-1">
            <h1 className="font-[Quicksand] text-xl font-bold text-gray-800">Bé dạy AI</h1>
            <p className="text-xs text-gray-500">Dạy lại AI những gì con đã học tuần này</p>
          </div>
          {activeChallenge && (
            <span className="text-xs bg-mint-100 text-mint-700 px-2.5 py-1 rounded-full font-medium">
              Tuần {activeChallenge.week}
            </span>
          )}
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1.5 mb-4">
        {REFLECTION_STARTERS.map((_, idx) => (
          <div key={idx} className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${
            idx <= questionIdx ? 'bg-gradient-to-r from-sun-400 to-sun-500' : 'bg-gray-200'
          }`} />
        ))}
      </div>

      {/* Chat area */}
      <div className="flex-1 space-y-4 overflow-y-auto mb-4 pr-1" style={{ maxHeight: 'calc(100vh - 22rem)' }}>
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} role={msg.role} content={msg.content} />
        ))}

        {isTyping && <TypingIndicator />}

        {error && (
          <motion.div className="flex items-center gap-2 bg-coral-50 text-coral-600 text-xs px-3 py-2 rounded-xl mx-auto max-w-xs"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AlertCircle size={14} /> {error}
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 pt-2 pb-1 bg-gradient-to-t from-[#f0fdf9] via-[#f0fdf9] to-transparent">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <textarea ref={inputRef} value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder={currentStarter?.placeholder || 'Nhập câu trả lời của con...'}
              className="w-full bg-white/80 border border-gray-200 rounded-2xl px-4 py-3 pr-12 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-mint-300 resize-none shadow-sm"
              rows={2} disabled={isTyping || phase === 'summary'}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }} />
            <motion.button onClick={handleSend}
              disabled={!currentInput.trim() || isTyping}
              whileTap={{ scale: 0.85 }}
              className={`absolute right-2 bottom-2 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                currentInput.trim() && !isTyping
                  ? 'bg-gradient-to-r from-mint-500 to-leaf-500 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}>
              <Send size={14} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Safety notice */}
      <div className="mt-2 bg-mint-50/80 rounded-xl p-2.5 text-[11px] text-mint-700 flex items-start gap-2">
        <Bot size={12} className="flex-shrink-0 mt-0.5" />
        <span>AI phản ánh có kiểm soát. Phụ huynh xem được toàn bộ nội dung. Không phải chatbot mở.</span>
      </div>
    </div>
  );
}
