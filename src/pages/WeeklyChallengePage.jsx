import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Send, PartyPopper, CheckCircle2 } from 'lucide-react';
import useStore from '../store/useStore';
import GlassCard from '../components/common/GlassCard';
import ChallengeStepper from '../components/common/ChallengeStepper';

const STEPS = ['Đọc nhiệm vụ', 'Trả lời', 'Quyết định', 'Gửi duyệt'];

export default function WeeklyChallengePage() {
  const navigate = useNavigate();
  const {
    challenges,
    currentChallengeStep,
    setChallengeStep,
    challengeAnswers,
    setChallengeAnswer,
    challengeDecision,
    setChallengeDecision,
    submitChallenge,
    challengeSubmitted,
    resetChallengeFlow,
  } = useStore();

  const challenge = challenges.find((c) => c.status === 'active');
  const [openInput, setOpenInput] = useState('');
  const step = currentChallengeStep;

  if (!challenge) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="font-[Quicksand] text-2xl font-bold text-gray-800 mb-2">
          Chưa có nhiệm vụ mới!
        </h2>
        <p className="text-gray-500 mb-6">Hãy quay lại khi nhiệm vụ tuần mới bắt đầu nhé.</p>
        <button
          onClick={() => navigate('/child')}
          className="bg-gradient-to-r from-mint-500 to-leaf-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Về trang chủ
        </button>
      </div>
    );
  }

  // Success screen after submission
  if (challengeSubmitted) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-[60vh] text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-7xl mb-6"
          animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          🎉
        </motion.div>
        <h2 className="font-[Quicksand] text-3xl font-bold text-gray-800 mb-3">
          Tuyệt vời, con giỏi lắm!
        </h2>
        <p className="text-gray-500 mb-2 max-w-md">
          Nhiệm vụ "{challenge.title}" đã được gửi cho phụ huynh xem xét.
        </p>
        <div className="flex items-center gap-2 text-leaf-600 text-sm font-medium mb-6">
          <CheckCircle2 size={16} />
          +{challenge.xpReward} XP
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              resetChallengeFlow();
              navigate('/child');
            }}
            className="bg-gradient-to-r from-mint-500 to-leaf-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Về trang chủ
          </button>
          <button
            onClick={() => {
              resetChallengeFlow();
              navigate('/child/jars');
            }}
            className="bg-white/70 border border-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-semibold hover:bg-white transition-all"
          >
            Chia tiền vào lọ
          </button>
        </div>
      </motion.div>
    );
  }

  const nextStep = () => {
    if (step < STEPS.length - 1) {
      setChallengeStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setChallengeStep(step - 1);
    }
  };

  const handleSubmit = () => {
    submitChallenge();
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/child')}
          className="flex items-center gap-2 text-gray-500 hover:text-mint-700 text-sm mb-4 transition-colors"
        >
          <ArrowLeft size={16} /> Về trang chủ
        </button>
        <div className="inline-flex items-center gap-1.5 bg-mint-100 text-mint-700 text-xs px-2.5 py-1 rounded-full font-medium mb-2">
          Tuần {challenge.week}
        </div>
        <h1 className="font-[Quicksand] text-2xl font-bold text-gray-800">{challenge.title}</h1>
        <p className="text-sm text-gray-500 mt-1">{challenge.subtitle}</p>
      </div>

      {/* Stepper */}
      <ChallengeStepper steps={STEPS} currentStep={step} />

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Step 0: Read mission */}
          {step === 0 && (
            <GlassCard className="mb-6">
              <div className="text-4xl mb-4 text-center">📖</div>
              <h3 className="font-semibold text-gray-800 text-lg mb-3 text-center">
                {challenge.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-center mb-6">
                {challenge.description}
              </p>
              <div className="bg-mint-50 rounded-xl p-4 text-sm text-mint-700">
                <div className="font-semibold mb-1">💡 Mẹo nhỏ:</div>
                Hãy suy nghĩ thật kỹ trước khi trả lời. Không có câu trả lời sai — quan trọng là con hiểu lý do tại sao!
              </div>
            </GlassCard>
          )}

          {/* Step 1: Answer questions */}
          {step === 1 && (
            <div className="space-y-4">
              {challenge.questions.map((q, idx) => (
                <GlassCard key={q.id}>
                  <div className="text-sm font-medium text-gray-700 mb-3">
                    <span className="text-mint-600 font-bold mr-1">Câu {idx + 1}.</span>
                    {q.text}
                  </div>

                  {q.type === 'choice' && (
                    <div className="space-y-2">
                      {q.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setChallengeAnswer(q.id, opt)}
                          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                            challengeAnswers[q.id] === opt
                              ? 'bg-gradient-to-r from-mint-500 to-leaf-500 text-white shadow-md'
                              : 'bg-white/60 text-gray-700 hover:bg-white/80 border border-gray-100'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                      {challengeAnswers[q.id] && q.explanation && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="bg-leaf-50 rounded-xl p-3 text-xs text-leaf-700 mt-2"
                        >
                          ✨ {q.explanation}
                        </motion.div>
                      )}
                    </div>
                  )}

                  {q.type === 'open' && (
                    <textarea
                      value={challengeAnswers[q.id] || ''}
                      onChange={(e) => setChallengeAnswer(q.id, e.target.value)}
                      placeholder="Con viết câu trả lời ở đây..."
                      className="w-full bg-white/60 border border-gray-200 rounded-xl p-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-mint-300 focus:border-transparent resize-none"
                      rows={3}
                    />
                  )}
                </GlassCard>
              ))}
            </div>
          )}

          {/* Step 2: Make decision */}
          {step === 2 && (
            <GlassCard>
              <h3 className="font-semibold text-gray-800 text-lg mb-2 text-center">
                Con quyết định thế nào?
              </h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                Dựa trên những gì con đã học, hãy chọn hành động:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {challenge.decisions.map((d) => {
                  const colorMap = {
                    coral: 'bg-coral-50 border-coral-200 hover:bg-coral-100',
                    sun: 'bg-sun-50 border-sun-200 hover:bg-sun-100',
                    leaf: 'bg-leaf-50 border-leaf-200 hover:bg-leaf-100',
                    mint: 'bg-mint-50 border-mint-200 hover:bg-mint-100',
                  };
                  const selectedMap = {
                    coral: 'bg-coral-500 border-coral-500 text-white',
                    sun: 'bg-sun-500 border-sun-500 text-white',
                    leaf: 'bg-leaf-500 border-leaf-500 text-white',
                    mint: 'bg-mint-500 border-mint-500 text-white',
                  };
                  const isSelected = challengeDecision === d.id;

                  return (
                    <motion.button
                      key={d.id}
                      onClick={() => setChallengeDecision(d.id)}
                      className={`border-2 rounded-2xl p-4 text-center transition-all duration-200 ${
                        isSelected ? selectedMap[d.color] : colorMap[d.color]
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-3xl mb-2">{d.emoji}</div>
                      <div className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                        {d.label}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </GlassCard>
          )}

          {/* Step 3: Submit for approval */}
          {step === 3 && (
            <GlassCard>
              <div className="text-center">
                <div className="text-5xl mb-4">📨</div>
                <h3 className="font-[Quicksand] text-xl font-bold text-gray-800 mb-2">
                  Gửi cho phụ huynh xem nhé!
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Phụ huynh sẽ xem câu trả lời và quyết định của con. Sau khi duyệt, con sẽ nhận được{' '}
                  <span className="font-bold text-mint-600">+{challenge.xpReward} XP</span>!
                </p>

                {/* Summary */}
                <div className="bg-white/50 rounded-xl p-4 mb-6 text-left">
                  <div className="text-xs text-gray-500 mb-2 font-medium">Tóm tắt bài làm:</div>
                  {Object.entries(challengeAnswers).length > 0 && (
                    <div className="space-y-2 mb-3">
                      {Object.entries(challengeAnswers).map(([qId, answer]) => {
                        const question = challenge.questions.find((q) => q.id === qId);
                        return (
                          <div key={qId} className="text-sm">
                            <span className="text-gray-500">{question?.text}</span>
                            <div className="font-medium text-gray-800">{answer}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {challengeDecision && (
                    <div className="pt-2 border-t border-gray-100">
                      <span className="text-xs text-gray-500">Quyết định: </span>
                      <span className="font-semibold text-gray-800">
                        {challenge.decisions.find((d) => d.id === challengeDecision)?.emoji}{' '}
                        {challenge.decisions.find((d) => d.id === challengeDecision)?.label}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-mint-500 to-leaf-500 text-white py-3.5 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-mint-200 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Gửi bài làm
                </button>
              </div>
            </GlassCard>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      {!challengeSubmitted && (
        <div className="flex justify-between mt-6">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              step === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-white/60'
            }`}
          >
            <ArrowLeft size={16} /> Quay lại
          </button>
          {step < STEPS.length - 1 && (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 bg-gradient-to-r from-mint-500 to-leaf-500 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg transition-all"
            >
              Tiếp theo <ArrowRight size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
