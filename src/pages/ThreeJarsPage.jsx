import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import GlassCard from '../components/common/GlassCard';
import JarCard from '../components/common/JarCard';
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

  const handleAllocate = () => {
    if (!isValid) return;
    allocateMoney(TOTAL_MONEY, {
      saving: savingAmount,
      spending: spendingAmount,
      sharing: sharingAmount,
    });
    setSubmitted(true);
  };

  const totalJars = jars.saving + jars.spending + jars.sharing;

  if (submitted) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-[60vh] text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-6xl mb-4">✅</div>
        <h2 className="font-[Quicksand] text-2xl font-bold text-gray-800 mb-2">
          Đã ghi nhận vào sổ!
        </h2>
        <p className="text-gray-500 mb-6 max-w-md">
          Con đã phân bổ {formatCurrency(TOTAL_MONEY)} vào Ví 3 Lọ. Phụ huynh sẽ xem và xác nhận.
        </p>
        <button
          onClick={() => navigate('/child')}
          className="bg-gradient-to-r from-mint-500 to-leaf-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Về trang chủ
        </button>
      </motion.div>
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-[Quicksand] text-2xl font-bold text-gray-800 mb-1">Ví 3 Lọ 🏦</h1>
        <p className="text-sm text-gray-500 mb-6">
          Phân bổ tiền vào 3 lọ: Tiết kiệm, Chi tiêu, và Chia sẻ/Xanh
        </p>
      </motion.div>

      {/* Current Jars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <JarCard
          type="saving"
          label="Tiết kiệm"
          emoji="🏦"
          amount={jars.saving}
          percentage={totalJars > 0 ? Math.round((jars.saving / totalJars) * 100) : 0}
          delay={0}
        />
        <JarCard
          type="spending"
          label="Chi tiêu"
          emoji="💳"
          amount={jars.spending}
          percentage={totalJars > 0 ? Math.round((jars.spending / totalJars) * 100) : 0}
          delay={0.1}
        />
        <JarCard
          type="sharing"
          label="Chia sẻ/Xanh"
          emoji="💚"
          amount={jars.sharing}
          percentage={totalJars > 0 ? Math.round((jars.sharing / totalJars) * 100) : 0}
          delay={0.2}
        />
      </div>

      {/* Donut Chart */}
      <GlassCard className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-2 text-center">Tỷ lệ phân bổ hiện tại</h3>
        <JarPieChart data={jars} />
      </GlassCard>

      {/* Allocation Form */}
      <GlassCard className="mb-6">
        <h3 className="font-[Quicksand] font-bold text-lg text-gray-800 mb-1">
          Phân bổ {formatCurrency(TOTAL_MONEY)} mới
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Dùng thanh trượt hoặc nhập số phần trăm. Tổng phải bằng 100%.
        </p>

        <div className="space-y-6">
          {/* Saving slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-mint-700">🏦 Tiết kiệm</span>
              <span className="text-sm font-bold text-gray-800">{saving}% = {formatCurrency(savingAmount)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={saving}
              onChange={(e) => setSaving(Number(e.target.value))}
              className="w-full h-2 bg-mint-100 rounded-lg appearance-none cursor-pointer accent-mint-500"
            />
          </div>

          {/* Spending slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-sun-700">💳 Chi tiêu</span>
              <span className="text-sm font-bold text-gray-800">{spending}% = {formatCurrency(spendingAmount)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={spending}
              onChange={(e) => setSpending(Number(e.target.value))}
              className="w-full h-2 bg-sun-100 rounded-lg appearance-none cursor-pointer accent-sun-500"
            />
          </div>

          {/* Sharing slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-leaf-700">💚 Chia sẻ/Xanh</span>
              <span className="text-sm font-bold text-gray-800">{sharing}% = {formatCurrency(sharingAmount)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sharing}
              onChange={(e) => setSharing(Number(e.target.value))}
              className="w-full h-2 bg-leaf-100 rounded-lg appearance-none cursor-pointer accent-leaf-500"
            />
          </div>

          {/* Total indicator */}
          <div
            className={`text-center py-3 rounded-xl font-bold ${
              isValid
                ? 'bg-leaf-50 text-leaf-700'
                : 'bg-coral-50 text-coral-600'
            }`}
          >
            Tổng: {total}% {isValid ? '✅' : `(cần bằng 100%)`}
          </div>
        </div>

        <button
          onClick={handleAllocate}
          disabled={!isValid}
          className={`w-full mt-4 py-3 rounded-xl font-bold text-white transition-all duration-300 ${
            isValid
              ? 'bg-gradient-to-r from-mint-500 to-leaf-500 hover:shadow-lg cursor-pointer'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Ghi vào sổ
        </button>
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
