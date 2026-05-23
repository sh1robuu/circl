import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import GlassCard from '../components/common/GlassCard';
import AnimatedJar from '../components/child/AnimatedJar';
import Confetti from '../components/common/Confetti';
import { JarPieChart } from '../components/dashboard/DashboardChart';
import { formatCurrency } from '../utils/helpers';

const TOTAL_MONEY = 100000;

export default function ThreeJarsPage() {
  const navigate = useNavigate();
  const { jars, allocateMoney } = useStore();
  const [saving, setSaving] = useState(40);
  const [spending, setSpending] = useState(35);
  const [sharing, setSharing] = useState(25);
  const [submitted, setSubmitted] = useState(false);

  const total = saving + spending + sharing;
  const isValid = total === 100;
  const savingAmount = (TOTAL_MONEY * saving) / 100;
  const spendingAmount = (TOTAL_MONEY * spending) / 100;
  const sharingAmount = (TOTAL_MONEY * sharing) / 100;
  const totalJars = jars.saving + jars.spending + jars.sharing;

  const handleAllocate = () => {
    if (!isValid) return;
    allocateMoney(TOTAL_MONEY, { saving: savingAmount, spending: spendingAmount, sharing: sharingAmount });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <Confetti active={true} pieces={30} duration={3000} />
        <motion.div className="flex flex-col items-center justify-center min-h-[60vh] text-center"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <motion.div className="text-6xl mb-4" animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6 }}>✅</motion.div>
          <h2 className="font-[Quicksand] text-2xl font-bold text-gray-800 mb-2">Đã ghi nhận vào sổ!</h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Con đã phân bổ {formatCurrency(TOTAL_MONEY)} vào Ví 3 Lọ. Phụ huynh sẽ xem và xác nhận.
          </p>
          <button onClick={() => navigate('/child')}
            className="bg-gradient-to-r from-mint-500 to-leaf-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all">
            Về trang chủ
          </button>
        </motion.div>
      </>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => navigate('/child')}
        className="flex items-center gap-2 text-gray-500 hover:text-mint-700 text-sm mb-4 transition-colors">
        <ArrowLeft size={16} /> Về trang chủ
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-[Quicksand] text-2xl font-bold text-gray-800 mb-1">Ví 3 Lọ 🏦</h1>
        <p className="text-sm text-gray-500 mb-6">Phân bổ tiền vào 3 lọ: Tiết kiệm, Chi tiêu, và Chia sẻ/Xanh</p>
      </motion.div>

      {/* Animated Jars */}
      <div className="flex justify-center gap-6 sm:gap-10 mb-8">
        <AnimatedJar type="saving" label="Tiết kiệm" emoji="🏦" amount={jars.saving}
          percentage={totalJars > 0 ? Math.round((jars.saving / totalJars) * 100) : 0} delay={0} />
        <AnimatedJar type="spending" label="Chi tiêu" emoji="💳" amount={jars.spending}
          percentage={totalJars > 0 ? Math.round((jars.spending / totalJars) * 100) : 0} delay={0.15} />
        <AnimatedJar type="sharing" label="Chia sẻ" emoji="💚" amount={jars.sharing}
          percentage={totalJars > 0 ? Math.round((jars.sharing / totalJars) * 100) : 0} delay={0.3} />
      </div>

      {/* Chart */}
      <GlassCard className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-2 text-center">Tỷ lệ phân bổ hiện tại</h3>
        <JarPieChart data={jars} />
      </GlassCard>

      {/* Allocation Form */}
      <GlassCard className="mb-6">
        <h3 className="font-[Quicksand] font-bold text-lg text-gray-800 mb-1">
          Phân bổ {formatCurrency(TOTAL_MONEY)} mới
        </h3>
        <p className="text-sm text-gray-500 mb-6">Dùng thanh trượt để chia tiền. Tổng phải bằng 100%.</p>

        <div className="space-y-6">
          {/* Saving */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-mint-700">🏦 Tiết kiệm</span>
              <motion.span className="text-sm font-bold text-gray-800" key={saving}
                initial={{ scale: 1.3 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                {saving}% = {formatCurrency(savingAmount)}
              </motion.span>
            </div>
            <input type="range" min="0" max="100" value={saving}
              onChange={(e) => setSaving(Number(e.target.value))}
              className="w-full h-2 bg-mint-100 rounded-lg cursor-pointer slider-mint" />
          </div>

          {/* Spending */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-sun-700">💳 Chi tiêu</span>
              <motion.span className="text-sm font-bold text-gray-800" key={spending}
                initial={{ scale: 1.3 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                {spending}% = {formatCurrency(spendingAmount)}
              </motion.span>
            </div>
            <input type="range" min="0" max="100" value={spending}
              onChange={(e) => setSpending(Number(e.target.value))}
              className="w-full h-2 bg-sun-100 rounded-lg cursor-pointer slider-sun" />
          </div>

          {/* Sharing */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-leaf-700">💚 Chia sẻ/Xanh</span>
              <motion.span className="text-sm font-bold text-gray-800" key={sharing}
                initial={{ scale: 1.3 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                {sharing}% = {formatCurrency(sharingAmount)}
              </motion.span>
            </div>
            <input type="range" min="0" max="100" value={sharing}
              onChange={(e) => setSharing(Number(e.target.value))}
              className="w-full h-2 bg-leaf-100 rounded-lg cursor-pointer slider-leaf" />
          </div>

          {/* Recommended hint */}
          <div className="bg-mint-50/50 rounded-xl p-3 text-xs text-mint-700 border border-mint-100">
            💡 <strong>Gợi ý:</strong> Nhiều chuyên gia khuyên chia 50% tiết kiệm, 30% chi tiêu, 20% chia sẻ. Nhưng con tự quyết định nhé!
          </div>

          {/* Total */}
          <motion.div className={`text-center py-3 rounded-xl font-bold ${isValid ? 'bg-leaf-50 text-leaf-700' : 'bg-coral-50 text-coral-600'}`}
            animate={!isValid ? { x: [0, -3, 3, -3, 0] } : {}} transition={{ duration: 0.3 }}>
            Tổng: {total}% {isValid ? '✅' : '(cần bằng 100%)'}
          </motion.div>
        </div>

        <motion.button onClick={handleAllocate} disabled={!isValid}
          whileHover={isValid ? { scale: 1.02 } : {}} whileTap={isValid ? { scale: 0.98 } : {}}
          className={`w-full mt-4 py-3 rounded-xl font-bold text-white transition-all duration-300 ${
            isValid ? 'bg-gradient-to-r from-mint-500 to-leaf-500 hover:shadow-lg cursor-pointer' : 'bg-gray-300 cursor-not-allowed'
          }`}>
          Ghi vào sổ
        </motion.button>
      </GlassCard>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 bg-sun-50 rounded-2xl p-4 border border-sun-200">
        <Info className="text-sun-600 flex-shrink-0 mt-0.5" size={18} />
        <p className="text-sm text-sun-700">
          <strong>Lưu ý:</strong> Đây là sổ học tập. CIRCL không giữ tiền thật. Tiền thật luôn ở tài khoản phụ huynh.
        </p>
      </div>
    </div>
  );
}
